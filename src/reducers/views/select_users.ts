import { GRID_STATE_CHANGE_ACTION } from '../../actions/views/grid'

function reducer(state:any = {}, action: any){
    console.log('selectUsers reducer', state, action)
    if (action.type === GRID_STATE_CHANGE_ACTION) {
        // switch (action.partialStateName) {
        //     case 'loadDataSauce':
        //         return transformEntityState(state, action);
        //     default:
        //         break;
        // }
        return Object.assign({}, state, {[action.partialStateName]: action.partialStateValue});
    }
    return state;
}

export default reducer