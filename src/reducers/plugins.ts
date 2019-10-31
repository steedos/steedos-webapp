
import { PLUGIN_STATE_CHANGE_ACTION } from '../actions/plugin'

function updateState(oldState: any, newState: any) {
    return Object.assign({}, oldState, newState)
}

function transformInstanceState(oldState: any, newState: any) {
    let result = {};
    result[newState.name] = newState.instance;
    return updateState(oldState, { "instances": result })
}

function transformObjectComponentNodeState(oldState: any, newState: any) {
    let result = {};
    result[newState.objectName] = newState.componentNode;
    return updateState(oldState, { "objectComponentNode": result })
}

function reducer(state: any = {}, action: any) {
    if (action.type === PLUGIN_STATE_CHANGE_ACTION){
        const payload = action.payload
        switch (payload.partialStateName) {
            case "savePluginInstance":
                return transformInstanceState(state, payload.partialStateValue);
            case "savePluginObjectComponentNode":
                return transformObjectComponentNodeState(state, payload.partialStateValue);
            default:
                break;
        }
        return Object.assign({}, state, { [payload.partialStateName]: payload.partialStateValue });
    }
    return state;
};

export default reducer;