
import { ORGANIZATIONS_STATE_CHANGE_ACTION } from '../../actions/views/organizations'
import _ from 'underscore'

function getRootNodes(records: any){
    return _.pluck(records, '_id')
}


function reducer(state: any = {}, action: any) {
    if (action.type === ORGANIZATIONS_STATE_CHANGE_ACTION) {
        switch (action.partialStateName) {
            case 'loadDataSauce':
                return Object.assign({}, state, { rootNodes: getRootNodes(action.partialStateValue.records)});
            default:
                break;
        }
        return Object.assign({}, state, { [action.partialStateName]: action.partialStateValue });
    }
    return state;
};

export default reducer