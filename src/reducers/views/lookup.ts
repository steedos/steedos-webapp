import {LOOKUP_STATE_CHANGE_ACTION} from '../../actions/views/lookup'

function reducer(state:any = {}, action: any){
    console.log('lookup reducer', state, action)
    if (action.type === LOOKUP_STATE_CHANGE_ACTION) {
        const payload = action.payload
        // switch (action.partialStateName) {
        //     case 'loadDataSauce':
        //         return transformEntityState(state, action);
        //     default:
        //         break;
        // }
        return Object.assign({}, state, {[payload.partialStateName]: payload.partialStateValue});
    }
    return state;
}

export default reducer