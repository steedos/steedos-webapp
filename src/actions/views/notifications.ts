import { dataServicesSelector, viewStateSelector } from '../../selectors';
import { loadEntitiesDataRequest } from '../records_request'
import { createAction as baseCreateAction } from '../base'
export var NOTIFICATIONS_STATE_CHANGE_ACTION = 'NOTIFICATIONS_STATE_CHANGE';
export function createNotificationsAction(partialStateName: any, partialStateValue: any, options: any) {
    if(["currentPage", "pageSize", "filters", "search"].includes(partialStateName)){
        return function(dispatch: any, getState: any){
            let entityState = viewStateSelector(getState(), options.id);
            const service = dataServicesSelector(getState())
            let newOptions: any = Object.assign({}, options, entityState, {[partialStateName]: partialStateValue})
            dispatch(createNotificationsAction("loading", true, options));
            loadEntitiesDataRequest(dispatch, NOTIFICATIONS_STATE_CHANGE_ACTION, service, newOptions)
            dispatch(baseCreateAction(NOTIFICATIONS_STATE_CHANGE_ACTION, partialStateName, partialStateValue, options))
        }
    }else{
        return baseCreateAction(NOTIFICATIONS_STATE_CHANGE_ACTION, partialStateName, partialStateValue, options)
    }
} 

export function loadNotificationsData(options: any) {
    return function (dispatch: any, getState: any) {
        const service = dataServicesSelector(getState())
        dispatch(createNotificationsAction("loading", true, options));
        return loadEntitiesDataRequest(dispatch, NOTIFICATIONS_STATE_CHANGE_ACTION, service, options)
    };
}