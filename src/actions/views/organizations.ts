import { loadEntitiesDataRequest } from '../records_request'
import { dataServicesSelector } from '../../selectors';
import { createAction as baseCreateAction } from '../base'
export const ORGANIZATIONS_STATE_CHANGE_ACTION = 'ORGANIZATIONS_STATE_CHANGE';

export const createAction = (partialStateName: any, partialStateValue: any, options: any) => {
    return baseCreateAction(ORGANIZATIONS_STATE_CHANGE_ACTION, partialStateName, partialStateValue, options);
}


export function loadEntitiesData(options: any = {}) {
    return function (dispatch: any, getState: any) {
        const service = dataServicesSelector(getState())
        return loadEntitiesDataRequest(dispatch, ORGANIZATIONS_STATE_CHANGE_ACTION, service, options)
    };
}
