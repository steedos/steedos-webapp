import * as React from 'react';
import Grid from '../../components/grid'
import OrganizationsTree from '../../components/organizations'
import PropTypes from 'prop-types';
import { createAction } from '../../actions/views/grid';
import styled from 'styled-components'

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
    &>.slds-grid{
        position: absolute;
    }
`
let userObject = {
    name: 'space_users',
    label: '用户',
    enable_search: true,
    fields: {
        name:{
            label: '姓名'
        },
        email: {
            label: '邮箱'
        },
        mobile: {
            label: '手机号'
        },
        user: {
            label: 'userId',
            hidden: true
        }
    }
}

let gridObjectName = "space_users";
let gridColumns = [
    {
        field: 'name',
        label: '姓名'
    },
    {
        field: 'email',
        label: '邮箱'
    },
    {
        field: 'mobile',
        label: '手机号'
    },
    {
        field: 'user',
        label: 'userId',
        hidden: true
    }
]

class SelectUsers extends React.Component {

    static defaultProps = {
        valueField: '_id',
        selectionLabel: 'name',
        rootNodes: []
    }

    static propTypes = {
        rootNodes: PropTypes.array,
        multiple: PropTypes.bool,
        valueField: PropTypes.string, //指定控件返回的值来自记录的那个属性，比如：user 字段，或者 email字段
        selectionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        searchMode: PropTypes.oneOf(['omitFilters'])
    }

    render() {
        // let getRowId = (row: any) => row[(this.props as any).valueField]

        let onClick = function(event: any, data: any){
            return function(dispatch: any, getState: any){
                dispatch(createAction("filters", [{ columnName: "organizations", value: data.node.id, operation: "equals" }], {objectName: gridObjectName}))
                dispatch({
                    type: 'TREE_STATE_CHANGE',
                    payload: {
                        partialStateName: 'click',
                        partialStateValue: data,
                        objectName: 'organizations'
                    }
                })
            }
        }
        //Tree props
        let { rootNodes, selectionLabel, searchMode, multiple } = this.props as any
        let selectRows = 'radio';
        if(multiple){
            selectRows = 'checkbox';
        }

        return (
            <Counter className="select-users">
                <OrgsCounter className="organizations"><OrganizationsTree rootNodes={rootNodes} onClick={onClick}/></OrgsCounter>
                <UsersCounter className="users"><Grid objectName={gridObjectName} enableSearch={true} columns={gridColumns} searchMode={searchMode} pageSize={200} selectionLabel={selectionLabel} selectRows={selectRows}/></UsersCounter>
            </Counter>
        )
    }
}
export default SelectUsers