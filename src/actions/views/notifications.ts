import { dataServicesSelector, viewStateSelector } from '../../selectors';
import { loadEntitiesDataRequest } from '../records_request'
import { createAction as baseCreateAction } from '../base'

export var NOTIFICATIONS_STATE_CHANGE_ACTION = 'NOTIFICATIONS_STATE_CHANGE';
export var NOTIFICATIONS_INTERVAL_CHANGE_ACTION = 'NOTIFICATIONS_INTERVAL_CHANGE';

export function loadNotificationsData(options: any) {
    return function (dispatch: any, getState: any) {
        const service = dataServicesSelector(getState())
        dispatch(baseCreateAction(NOTIFICATIONS_STATE_CHANGE_ACTION, "loading", true, options));
        return loadEntitiesDataRequest(dispatch, NOTIFICATIONS_STATE_CHANGE_ACTION, service, options)
    };
}

export function loadNotificationsDataInterval(options: any) {
    return function (dispatch: any, getState: any) {
        let intervalCount = 0;
        let entityState = viewStateSelector(getState(), options.id);
        if(entityState){
            intervalCount = entityState.intervalCount + 1;
            clearTimeout(entityState.intervalId);
        }
        const intervalId = setTimeout(()=>{
            dispatch(loadNotificationsDataInterval(options));
        }, options.interval * 1000);
        const intervalTime = new Date();
        dispatch(baseCreateAction(NOTIFICATIONS_INTERVAL_CHANGE_ACTION, 'startNewInterval', {intervalId, intervalCount, intervalTime}, options));
        if(entityState && entityState.loading){
            // 如果当前正在请求数据，说明网络有问题不执行请求。
            return;
        }
        dispatch(loadNotificationsData(options));
    };
}