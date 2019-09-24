import states from '../../states';
import { loadEntitiesDataRequest } from '../data_request'
import { createGridAction as baseCreateGridAction } from '../base'
export const LOOKUP_STATE_CHANGE_ACTION = 'LOOKUP_STATE_CHANGE';

export const createGridAction = (partialStateName: any, partialStateValue: any, objectName: string) => {
    return baseCreateGridAction(LOOKUP_STATE_CHANGE_ACTION, partialStateName, partialStateValue, objectName);
}

export function loadEntitiesData(options: any) {
    return function (dispatch: any, getState: any) {
        const service = states.getDataServices(getState())
        return loadEntitiesDataRequest(dispatch, LOOKUP_STATE_CHANGE_ACTION, service, options)
    };
}