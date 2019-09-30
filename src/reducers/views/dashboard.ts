// import { GRID_STATE_CHANGE_ACTION } from '../../actions/views/grid'
import { BOOTSTRAP_STATE_CHANGE_ACTION } from '../../actions/views/dashboard';

function transformEntityState(state: any, action: any){
    return Object.assign({}, state, { ...action.partialStateValue });
}

function reducer(state:any = {}, action: any){
    if (action.type === BOOTSTRAP_STATE_CHANGE_ACTION) {
        switch (action.partialStateName) {
            case 'loadDataSauce':
                return transformEntityState(state, action);
            default:
                break;
        }
        return Object.assign({}, state, {[action.partialStateName]: action.partialStateValue});
    }
    return state;
}

export default reducer