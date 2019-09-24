import * as React from 'react';
import DXGrid from '../../components/dx_grid'
import OrganizationsTree from '../../components/organizations'
import PropTypes from 'prop-types';
import { createGridAction } from '../../actions/views/dx_grid';

class SelectUsers extends React.Component {
    static defaultProps = {
        valueField: '_id'
    }

    static propTypes = {
        rootNodes: PropTypes.array.isRequired,
        multiple: PropTypes.bool,
        valueField: PropTypes.string //指定控件返回的值来自记录的那个属性，比如：user 字段，或者 email字段
    }

    render() {
        //Grid props
        let userListColumns = [
            { name: 'user', title: 'userId' },
            { name: 'name', title: 'name' },
            { name: 'username', title: 'username' },
            { name: 'email', title: 'email' },
            { name: 'mobile', title: 'mobile' },
            { name: 'position', title: 'position' }
        ]
        let getRowId = (row: any) => row[(this.props as any).valueField]

        let onClick = function(event: any, data: any){
            return function(dispatch: any, getState: any){
                dispatch(createGridAction("filters", [{ columnName: "organizations", value: data.node.id, operation: "equals" }], "space_users"))
                dispatch({
                    type: 'TREE_STATE_CHANGE',
                    partialStateName: 'onClick',
                    partialStateValue: data,
                    objectName: 'organizations'
                })
            }
        }
        //Tree props
        let { rootNodes } = this.props as any
        return (
            <div className="select-users">
                <div className="left"><OrganizationsTree rootNodes={rootNodes} onClickFunc={onClick}/></div>
                <div className="right"><DXGrid objectName='space_users' columns={userListColumns} getRowId={getRowId} /></div>
            </div>
        )
    }
}
export default SelectUsers