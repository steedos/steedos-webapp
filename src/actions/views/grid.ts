import states from '../../states';
import { loadEntitiesDataRequest } from '../data_request'
import { createAction as baseCreateAction } from '../base'
export const GRID_STATE_CHANGE_ACTION = 'GRID_STATE_CHANGE';

export function createAction(partialStateName: any, partialStateValue: any, object: any) {
    if(["currentPage", "pageSize", "filters", "search"].includes(partialStateName)){
        return function(dispatch: any, getState: any){
            let entityState = states.getEntityState(getState(), object.name);
            const service = states.getDataServices(getState())
            let options: any = Object.assign({}, entityState, {[partialStateName]: partialStateValue})
            loadEntitiesDataRequest(dispatch, GRID_STATE_CHANGE_ACTION, service, options)
            dispatch(baseCreateAction(GRID_STATE_CHANGE_ACTION, partialStateName, partialStateValue, object))
        }
    }else{
        return baseCreateAction(GRID_STATE_CHANGE_ACTION, partialStateName, partialStateValue, object)
    }
} 

export function loadEntitiesData(options: any) {
    return function (dispatch: any, getState: any) {
        const service = states.getDataServices(getState())
        return loadEntitiesDataRequest(dispatch, GRID_STATE_CHANGE_ACTION, service, options)
    };
}