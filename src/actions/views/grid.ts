import states from '../../states';
import { loadEntitiesDataRequest } from '../records_request'
import { createAction as baseCreateAction } from '../base'
export const GRID_STATE_CHANGE_ACTION = 'GRID_STATE_CHANGE';

export function createAction(partialStateName: any, partialStateValue: any, options: any) {
    if(["currentPage", "pageSize", "filters", "search"].includes(partialStateName)){
        return function(dispatch: any, getState: any){
            let entityState = states.getViewState(getState(), options.id);
            const service = states.getDataServices(getState())
            let newOptions: any = Object.assign({}, options, entityState, {[partialStateName]: partialStateValue})
            loadEntitiesDataRequest(dispatch, GRID_STATE_CHANGE_ACTION, service, newOptions)
            dispatch(baseCreateAction(GRID_STATE_CHANGE_ACTION, partialStateName, partialStateValue, options))
        }
    }else{
        return baseCreateAction(GRID_STATE_CHANGE_ACTION, partialStateName, partialStateValue, options)
    }
} 

export function loadEntitiesData(options: any) {
    return function (dispatch: any, getState: any) {
        const service = states.getDataServices(getState())
        return loadEntitiesDataRequest(dispatch, GRID_STATE_CHANGE_ACTION, service, options)
    };
}