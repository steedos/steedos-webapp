import * as React from 'react';
import SteedosTree from '../../components/tree'
import { loadEntitiesData } from '../../actions/views/organizations'
import PropTypes from 'prop-types';
import _ from 'underscore'

class OrganizationsTree extends React.Component {
    static defaultProps = {
        valueField: '_id',
        width: '300px',
        object: {
            name: 'organizations',
            label: '组织机构',
            fields: {
                name: {
                    label: '部门名称'
                },
                fullname: {
                    label: '部门全称'
                },
                children: {
                    label: '子部门'
                }
            }
        }
    }

    constructor(props) {
        super(props)
        if(_.isEmpty(props.rootNodes)){
            props.dispatch(loadEntitiesData({object: props.object, filters: [{columnName: 'parent', operation: 'equals', value: null}]}))
        }
		
    }

    static propTypes = {
        rootNodes: PropTypes.array.isRequired,
        multiple: PropTypes.bool,
        valueField: PropTypes.string, //指定控件返回的值来自记录的那个属性，比如：user 字段，或者 email字段
        onClickFunc: PropTypes.func
    }

    render() {
        //Tree props
        let { rootNodes, onClickFunc, object } = this.props as any
        let getNodes = (node: any)=>{
            if(!node.nodes){
                return []
            }
            let { nodes:stateNodes = {} } = this.props as any
            let nodes: any = []
            node.nodes.forEach((element: any) => {
                if(stateNodes[element]){
                    nodes.push(stateNodes[element])
                }
            });
            return nodes
        }
        return (
            <SteedosTree object={object} rootNodes={rootNodes} getNodes={getNodes} onClickFunc={onClickFunc}/>
        )
    }
}
export default OrganizationsTree