import { request } from '../datasource'
import { createAction } from './base'
import { getCookie } from '../utils'

export function loadBootstrapDataRequest(dispatch: any, actionType: string, dataService: string, options: any) {
    return loadBootstrapData(dataService, options).then(
        (sauce) => dispatch(loadBootstrapDataSauce(actionType, sauce, options)),
        (error) => dispatch(loadDataError(actionType, error, options)),
    );
}

export async function loadBootstrapData(dataService: string, options: any) {
    let spaceId = getCookie("X-Space-Id");
    let url = `${dataService}/api/bootstrap/${spaceId}`;
    return await request(url)
}

function loadBootstrapDataSauce(actionType: string, results: any, options: any) {
    return createAction(actionType, 'loadDataSauce', results, {objectName: 'bootstrap'})
}

function loadDataError(actionType: string, error: any, options: any) {
    return createAction(actionType, 'loadDataError', {error: error}, options)
}