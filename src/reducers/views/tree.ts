
import { TREE_STATE_CHANGE_ACTION } from '../../actions/views/tree'
import _ from 'underscore'


/**
 * return: {id: {label: ,type: , id}}
 * @param records 待转换的数据
 */
function transformData(records: any) {
    let items: any = {}
    records.forEach((element: any) => {
        let item: any = { id: element._id, label: element.name }
        if (_.isEmpty(element.children)) {
            item.type = 'item'
        } else {
            item.type = 'branch'
            item.nodes = element.children
        }
        items[element._id] = item
    });
    return items;
}

//TODO: 优化expandClick，click
function reducer(state: any = {}, action: any) {
    if (action.type === TREE_STATE_CHANGE_ACTION) {
        const payload = action.payload
        let value = payload.partialStateValue
        let nodeId: string = value.node ? value.node.id : ""
        switch (payload.partialStateName) {
            case 'expandClick':
                state.nodes[value.node.id]["expanded"] = value.expand
                break;
            case 'click':
                let selectedNodeIds = state.selectedNode || []
                if (selectedNodeIds.length > 0) {
                    (state.nodes[selectedNodeIds[0]] as any).selected = false
                }
                let selected = value.select ? true : value.node.selected
                state.nodes[nodeId]["selected"] = selected
                if (selected) {
                    state.selectedNode = [nodeId]
                }
                break;
            case 'loadDataSauce':
                return Object.assign({}, state, { nodes: transformData(payload.partialStateValue.records), totalCount: payload.partialStateValue.totalCount });
            default:
                break;
        }
        return Object.assign({}, state, { [payload.partialStateName]: payload.partialStateValue });

    }
    return state;
};

export default reducer