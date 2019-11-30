import { dataServicesSelector, viewStateSelector } from '../../selectors';
import { loadEntitiesDataRequest } from '../records_request'
import { createAction as baseCreateAction } from '../base'

export var NOTIFICATIONS_STATE_CHANGE_ACTION = 'NOTIFICATIONS_STATE_CHANGE';
export var NOTIFICATIONS_COUNT_CHANGE_ACTION = 'NOTIFICATIONS_COUNT_CHANGE';
export var NOTIFICATIONS_INTERVAL_CHANGE_ACTION = 'NOTIFICATIONS_INTERVAL_CHANGE';

export function loadNotificationsData(options: any) {
    return function (dispatch: any, getState: any) {
        dispatch(loadNotificationsItems(options));
        dispatch(loadNotificationsCount(options));
    };
}

export function loadNotificationsItems(options: any) {
    return function (dispatch: any, getState: any) {
        const service = dataServicesSelector(getState());
        dispatch(baseCreateAction(NOTIFICATIONS_STATE_CHANGE_ACTION, "loading", true, options));
        loadEntitiesDataRequest(dispatch, NOTIFICATIONS_STATE_CHANGE_ACTION, service, options);
    };
}

export function loadNotificationsCount(options: any) {
    return function (dispatch: any, getState: any) {
        const service = dataServicesSelector(getState());
        // options.count = true;
        options = { ...options, count: true, pageSize: 0 };
        options.filters = [...options.filters];
        // 只显示未读数量
        options.filters.push([['is_read', '=', null], 'or', ['is_read', '=', false]]);
        dispatch(baseCreateAction(NOTIFICATIONS_COUNT_CHANGE_ACTION, "loading", true, options));
        loadEntitiesDataRequest(dispatch, NOTIFICATIONS_COUNT_CHANGE_ACTION, service, options);
    };
}

export function loadNotificationsDataInterval(options: any) {
    return function (dispatch: any, getState: any) {
        let intervalCount = 1;
        let entityState = viewStateSelector(getState(), options.id);
        if(entityState && entityState.intervalId){
            intervalCount = entityState.intervalCount + 1;
            clearTimeout(entityState.intervalId);
        }
        const intervalId = setTimeout(()=>{
            dispatch(loadNotificationsDataInterval(options));
        }, options.interval * 1000);
        const intervalTime = new Date();
        dispatch(baseCreateAction(NOTIFICATIONS_INTERVAL_CHANGE_ACTION, 'startInterval', {intervalId, intervalCount, intervalTime}, options));
        if(entityState && entityState.loading){
            // 如果当前正在请求数据，说明网络可能有问题或者options.interval值太小执行间隔太短不执行请求。
            return;
        }
        dispatch(loadNotificationsData(options));
    };
}

export function clearNotificationsInterval(options: any) {
    return function (dispatch: any, getState: any) {
        let entityState = viewStateSelector(getState(), options.id);
        if(entityState){
            clearTimeout(entityState.intervalId);
        }
        dispatch(baseCreateAction(NOTIFICATIONS_INTERVAL_CHANGE_ACTION, 'clearInterval', { intervalId: null, intervalCount: 0, intervalTime: null }, options));
    };
}