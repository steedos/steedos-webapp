import { loadEntitiesDataRequest } from '../data_request'
import states from '../../states';
import { createAction as baseCreateAction } from '../base'
export const ORGANIZATIONS_STATE_CHANGE_ACTION = 'ORGANIZATIONS_STATE_CHANGE';

export const createAction = (partialStateName: any, partialStateValue: any, object: any) => {
    return baseCreateAction(ORGANIZATIONS_STATE_CHANGE_ACTION, partialStateName, partialStateValue, object);
}


export function loadEntitiesData(options: any) {
    return function (dispatch: any, getState: any) {
        const service = states.getDataServices(getState())
        return loadEntitiesDataRequest(dispatch, ORGANIZATIONS_STATE_CHANGE_ACTION, service, options)
    };
}
