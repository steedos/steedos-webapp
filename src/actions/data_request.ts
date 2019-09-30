import * as DataSource from '../datasource'
import { createAction } from './base'

export function loadEntitiesDataRequest(dispatch: any, actionType: string, dataService: string, options: any) {
    return loadData(dataService, options).then(
        (sauce) => dispatch(loadDataSauce(actionType, sauce, options.objectName)),
        (error) => dispatch(loadDataError(actionType, error, options.objectName)),
    );
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