
import { PLUGIN_INSTANCE_RECEIVED_ACTION, PLUGIN_COMPONENT_RECEIVED_ACTION } from '../actions/plugin'

function updateState(oldState: any, newState: any) {
    return Object.assign({}, oldState, newState)
}

function transformInstanceState(oldState: any, newState: any) {
    let result = oldState.instances ? oldState.instances : {};
    result = Object.assign({}, result, { [newState.name]: newState.instance });
    return updateState(oldState, { "instances": result })
}

function transformObjectHomeComponentState(oldState: any, newState: any) {
    let result = oldState.components ? oldState.components : {};
    let resultName = result[newState.name] ? result[newState.name] : {};
    result[newState.name] = Object.assign({}, resultName, { [newState.id]: newState.component });
    return updateState(oldState, { "components": result })
}

function reducer(state: any = {}, action: any) {
    if (action.type === PLUGIN_INSTANCE_RECEIVED_ACTION){
        const payload = action.payload
        switch (payload.partialStateName) {
            case "received":
                return transformInstanceState(state, payload.partialStateValue);
            default:
                break;
        }
        return Object.assign({}, state, { [payload.partialStateName]: payload.partialStateValue });
    }
    else if (action.type === PLUGIN_COMPONENT_RECEIVED_ACTION) {
        const payload = action.payload
        switch (payload.partialStateName) {
            case "received":
                return transformObjectHomeComponentState(state, payload.partialStateValue);
            default:
                break;
        }
        return Object.assign({}, state, { [payload.partialStateName]: payload.partialStateValue });
    }
    return state;
};

export default reducer;