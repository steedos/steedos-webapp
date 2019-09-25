import * as React from 'react';
import Grid from '../../components/grid'
import OrganizationsTree from '../../components/organizations'
import PropTypes from 'prop-types';
import { createAction } from '../../actions/views/grid';
import { loadEntitiesData } from '../../actions/views/tree'
import styled from 'styled-components'
import _ from 'underscore'

let Counter = styled.div`
    display: flex;
`
let OrgsCounter = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    display: flex;
    width: 24rem;
    overflow: hidden;
    overflow-y: auto;
`

let UsersCounter = styled.div`
    margin-left: 24rem;
`


class SelectUsers extends React.Component {

    constructor(props) {
        super(props)
        if(_.isEmpty(props.rootNodes)){
            props.dispatch(loadEntitiesData({objectName: 'organizations', filters: [{columnName: 'parent', operation: 'equals', value: null}]}))
        }
		
    }

    static defaultProps = {
        valueField: '_id',
        selectionLabel: 'name',
        userListColumns: [
            { name: 'name', title: 'name' },
            { name: 'username', title: 'username' },
            { name: 'email', title: 'email' },
            { name: 'mobile', title: 'mobile' },
            { name: 'position', title: 'position' }
        ],
        $select: ['user'],
        rootNodes: []
    }

    static propTypes = {
        rootNodes: PropTypes.array,
        multiple: PropTypes.bool,
        valueField: PropTypes.string, //指定控件返回的值来自记录的那个属性，比如：user 字段，或者 email字段
        selectionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        userListColumns: PropTypes.array,
        searchMode: PropTypes.oneOf(['omitFilters'])
    }

    render() {
        // let getRowId = (row: any) => row[(this.props as any).valueField]

        let onClick = function(event: any, data: any){
            return function(dispatch: any, getState: any){
                dispatch(createAction("filters", [{ columnName: "organizations", value: data.node.id, operation: "equals" }], "space_users"))
                dispatch({
                    type: 'TREE_STATE_CHANGE',
                    partialStateName: 'onClick',
                    partialStateValue: data,
                    objectName: 'organizations'
                })
            }
        }
        //Tree props
        let { rootNodes, selectionLabel, userListColumns, $select, searchMode } = this.props as any
        return (
            <Counter className="select-users">
                <OrgsCounter className="organizations"><OrganizationsTree rootNodes={rootNodes} onClickFunc={onClick}/></OrgsCounter>
                <UsersCounter className="users"><Grid searchMode={searchMode} pageSize={200} objectName='space_users' columns={userListColumns} selectionLabel={selectionLabel} $select={$select}/></UsersCounter>
            </Counter>
        )
    }
}
export default SelectUsers