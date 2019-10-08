import states from '../../states';
import { loadEntitiesDataRequest } from '../records_request'
import { createAction as baseCreateAction } from '../base'
export const LOOKUP_STATE_CHANGE_ACTION = 'LOOKUP_STATE_CHANGE';

export const createAction = (partialStateName: any, partialStateValue: any, objectName: string) => {
    return baseCreateAction(LOOKUP_STATE_CHANGE_ACTION, partialStateName, partialStateValue, objectName);
}

export function loadEntitiesData(options: any) {
    return function (dispatch: any, getState: any) {
        const service = states.getDataServices(getState())
        return loadEntitiesDataRequest(dispatch, LOOKUP_STATE_CHANGE_ACTION, service, options)
    };
}