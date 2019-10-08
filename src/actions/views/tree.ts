import { loadEntitiesDataRequest } from '../records_request'
import states from '../../states';
import { createAction as baseCreateAction } from '../base'
export const TREE_STATE_CHANGE_ACTION = 'TREE_STATE_CHANGE';

export const createAction = (partialStateName: any, partialStateValue: any, objectName: string) => {
    return baseCreateAction(TREE_STATE_CHANGE_ACTION, partialStateName, partialStateValue, objectName);
}


export function loadEntitiesData(options: any) {
    return function (dispatch: any, getState: any) {
        const service = states.getDataServices(getState())
        return loadEntitiesDataRequest(dispatch, TREE_STATE_CHANGE_ACTION, service, options)
    };
}
