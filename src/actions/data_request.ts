import * as DataSource from '../datasource'
import { createAction } from './base'
import { BOOTSTRAP_STATE_CHANGE_ACTION } from './views/dashboard'
import utils from '../utils'

export function loadEntitiesDataRequest(dispatch: any, actionType: string, dataService: string, options: any) {
    if (actionType === BOOTSTRAP_STATE_CHANGE_ACTION) {
        return loadBootstrapData(dataService, options).then(
            (sauce) => dispatch(loadBootstrapDataSauce(actionType, sauce, options.objectName)),
            (error) => dispatch(loadDataError(actionType, error, options.objectName)),
        );
    }
    else {
        return loadData(dataService, options).then(
            (sauce) => dispatch(loadDataSauce(actionType, sauce, options.objectName)),
            (error) => dispatch(loadDataError(actionType, error, options.objectName)),
        );
    }
}

async function loadData(dataService: string, options: any) {
    return await DataSource.query(dataService, options)
}

function loadDataSauce(actionType: string, results: any, objectName: string) {
    let records = results.value
    let totalCount = results["@odata.count"] || 0
    records = records.map((item: any)=>{
        item.id = item._id
        return item
    })
    return createAction(actionType, 'loadDataSauce', {records, totalCount}, objectName)
}

function loadDataError(actionType: string, error: any, objectName: string) {
    return createAction(actionType, 'loadDataError', {error: error}, objectName)
}

export async function loadBootstrapData(dataService: string, options: any) {
    let spaceId = utils.getCookie("X-Space-Id");
    let url = `${dataService}/api/bootstrap/${spaceId}`;
    return await DataSource.request(url)
}

function loadBootstrapDataSauce(actionType: string, results: any, objectName: string) {
    results.current_user = results.USER_CONTEXT;
    delete results.USER_CONTEXT;
    return createAction(actionType, 'loadDataSauce', results, "bootstrap")
}