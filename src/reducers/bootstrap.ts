// import { GRID_STATE_CHANGE_ACTION } from '../../actions/views/grid'
import { BOOTSTRAP_STATE_CHANGE_ACTION } from '../actions/bootstrap';

function transformEntityState(state: any, payload: any){
    return Object.assign({}, state, { ...payload.partialStateValue });
}

function reducer(state:any = {}, action: any){
    if (action.type === BOOTSTRAP_STATE_CHANGE_ACTION) {
        const payload = action.payload
        switch (payload.partialStateName) {
            case 'loadDataSauce':
                return transformEntityState(state, payload);
            default:
                break;
        }
        return Object.assign({}, state, {[payload.partialStateName]: payload.partialStateValue});
    }
    return state;
}

export default reducer