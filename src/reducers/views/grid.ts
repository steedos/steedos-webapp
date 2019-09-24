import { GRID_STATE_CHANGE_ACTION } from '../../actions/views/grid'

function transformEntityState(state: any, action: any){
    return Object.assign({}, state, {rows: action.partialStateValue.records, totalCount: action.partialStateValue.totalCount});
}

function reducer(state:any = {}, action: any){
    if (action.type === GRID_STATE_CHANGE_ACTION) {
        switch (action.partialStateName) {
            case 'loadDataSauce':
                return transformEntityState(state, action);
            case 'requestRemoveSelectedOption':
                return Object.assign({}, state, {selection: action.partialStateValue});
            case 'search':
                return Object.assign({}, state, {search: action.partialStateValue});
            default:
                break;
        }
        return Object.assign({}, state, {[action.partialStateName]: action.partialStateValue});
    }
    return state;
}

export default reducer