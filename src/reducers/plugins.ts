
import { PLUGIN_STATE_CHANGE_ACTION } from '../actions/plugin'

function updateState(oldState: any, newState: any) {
    return Object.assign({}, oldState, newState)
}

function transformInstanceState(oldState: any, newState: any) {
    let result = oldState.instances ? oldState.instances : {};
    result = Object.assign({}, result, { [newState.name]: newState.instance });
    return updateState(oldState, { "instances": result })
}

function transformObjectHomeComponentState(oldState: any, newState: any) {
    let result = oldState.objectHomeComponents ? oldState.objectHomeComponents : {};
    result = Object.assign({}, result, { [newState.objectName]: newState.component });
    return updateState(oldState, { "objectHomeComponents": result })
}

function reducer(state: any = {}, action: any) {
    if (action.type === PLUGIN_STATE_CHANGE_ACTION){
        const payload = action.payload
        switch (payload.partialStateName) {
            case "savePluginInstance":
                return transformInstanceState(state, payload.partialStateValue);
            case "savePluginObjectHomeComponent":
                return transformObjectHomeComponentState(state, payload.partialStateValue);
            default:
                break;
        }
        return Object.assign({}, state, { [payload.partialStateName]: payload.partialStateValue });
    }
    return state;
};

export default reducer;