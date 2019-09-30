import states from '../../states';
import { loadEntitiesDataRequest } from '../data_request'
import { createAction as baseCreateAction } from 'base'
export const BOOTSTRAP_STATE_CHANGE_ACTION = 'BOOTSTRAP_STATE_CHANGE';

export function createAction(partialStateName: any, partialStateValue: any) {
    if (["changeSpace"].includes(partialStateName)){
        return function(dispatch: any, getState: any){
            dispatch(baseCreateAction(BOOTSTRAP_STATE_CHANGE_ACTION, partialStateName, partialStateValue))
        }
    }else{
        return baseCreateAction(BOOTSTRAP_STATE_CHANGE_ACTION, partialStateName, partialStateValue)
    }
} 

export function loadEntitiesData(options: any) {
    return function (dispatch: any, getState: any) {
        const service = states.getDataServices(getState())
        return loadEntitiesDataRequest(dispatch, BOOTSTRAP_STATE_CHANGE_ACTION, service, options)
    };
}