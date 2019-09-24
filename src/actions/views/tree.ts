import { loadEntitiesDataRequest } from '../data_request'
import states from '../../states';
import { createGridAction as baseCreateGridAction } from '../base'
export const TREE_STATE_CHANGE_ACTION = 'TREE_STATE_CHANGE';

export const createGridAction = (partialStateName: any, partialStateValue: any, objectName: string) => {
    return baseCreateGridAction(TREE_STATE_CHANGE_ACTION, partialStateName, partialStateValue, objectName);
}


export function loadEntitiesData(options: any) {
    return function (dispatch: any, getState: any) {
        const service = states.getDataServices(getState())
        return loadEntitiesDataRequest(dispatch, TREE_STATE_CHANGE_ACTION, service, options)
    };
}
