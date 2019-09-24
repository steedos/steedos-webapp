import states from '../../states';
import { loadEntitiesDataRequest } from '../data_request'
import { createGridAction as baseCreateGridAction } from '../base'
export const GRID_STATE_CHANGE_ACTION = 'GRID_STATE_CHANGE';

export function createGridAction(partialStateName: any, partialStateValue: any, objectName: string) {
    if(["currentPage", "pageSize", "filters", "search"].includes(partialStateName)){
        return function(dispatch: any, getState: any){
            let entityState = states.getEntityState(getState(), objectName);
            const service = states.getDataServices(getState())
            let options: any = Object.assign({}, entityState, {[partialStateName]: partialStateValue})
            loadEntitiesDataRequest(dispatch, GRID_STATE_CHANGE_ACTION, service, options)
            dispatch(baseCreateGridAction(GRID_STATE_CHANGE_ACTION, partialStateName, partialStateValue, objectName))
        }
    }else{
        return baseCreateGridAction(GRID_STATE_CHANGE_ACTION, partialStateName, partialStateValue, objectName)
    }
} 

export function loadEntitiesData(options: any) {
    return function (dispatch: any, getState: any) {
        const service = states.getDataServices(getState())
        return loadEntitiesDataRequest(dispatch, GRID_STATE_CHANGE_ACTION, service, options)
    };
}