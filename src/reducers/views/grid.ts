import { GRID_STATE_CHANGE_ACTION } from '../../actions/views/grid'

function transformEntityState(state: any, payload: any){
    return Object.assign({}, state, {rows: payload.partialStateValue.records, totalCount: payload.partialStateValue.totalCount});
}

function reducer(state:any = {}, action: any){
    if (action.type === GRID_STATE_CHANGE_ACTION) {
        const payload = action.payload
        switch (payload.partialStateName) {
            case 'loadDataSauce':
                return transformEntityState(state, payload);
            case 'requestRemoveSelectedOption':
                return Object.assign({}, state, {selection: payload.partialStateValue});
            case 'search':
                return Object.assign({}, state, {search: payload.partialStateValue});
            default:
                break;
        }
        return Object.assign({}, state, {[payload.partialStateName]: payload.partialStateValue});
    }
    return state;
}

export default reducer