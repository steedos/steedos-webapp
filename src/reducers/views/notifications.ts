import { NOTIFICATIONS_STATE_CHANGE_ACTION, NOTIFICATIONS_INTERVAL_CHANGE_ACTION, NOTIFICATIONS_COUNT_CHANGE_ACTION } from '../../actions/views/notifications'

function transformEntityState(state: any, payload: any, options: any){
    return Object.assign({}, state, { rows: payload.partialStateValue.records, totalCount: payload.partialStateValue.totalCount }, options);
}

function transformEntityStateForCount(state: any, payload: any, options: any){
    return Object.assign({}, state, { unreadCount: payload.partialStateValue.totalCount }, options);
}

function reducer(state:any = {}, action: any){
    if (action.type === NOTIFICATIONS_STATE_CHANGE_ACTION) {
        const payload = action.payload;
        switch (payload.partialStateName) {
            case 'loadDataSauce':
                return transformEntityState(state, payload, {loading: false});
            default:
                break;
        }
        return Object.assign({}, state, {[payload.partialStateName]: payload.partialStateValue});
    }
    else if (action.type === NOTIFICATIONS_COUNT_CHANGE_ACTION) {
        const payload = action.payload;
        switch (payload.partialStateName) {
            case 'loadDataSauce':
                return transformEntityStateForCount(state, payload, {loading: false});
            default:
                break;
        }
        return Object.assign({}, state, {[payload.partialStateName]: payload.partialStateValue});
    }
    else if (action.type === NOTIFICATIONS_INTERVAL_CHANGE_ACTION) {
        const payload = action.payload;
        return Object.assign({}, state, { 
            intervalId: payload.partialStateValue.intervalId, 
            intervalCount: payload.partialStateValue.intervalCount, 
            intervalTime: payload.partialStateValue.intervalTime
        });
    }
    return state;
}

export default reducer;