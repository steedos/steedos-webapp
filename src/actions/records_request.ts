import * as DataSource from '../datasource'
import { createAction } from './base'
import utils from '../utils'

export function loadEntitiesDataRequest(dispatch: any, actionType: string, dataService: string, options: any) {
    return loadData(dataService, options).then(
        (sauce) => dispatch(loadDataSauce(actionType, sauce, options)),
        (error) => dispatch(loadDataError(actionType, error, options)),
    );
}

async function loadData(dataService: string, options: any) {
    return await DataSource.query(dataService, options)
}

function loadDataSauce(actionType: string, results: any, options: any) {
    let records = results.value
    let totalCount = results["@odata.count"] || 0
    records = records.map((item: any)=>{
        item.id = item._id
        return item
    })
    return createAction(actionType, 'loadDataSauce', {records, totalCount}, options)
}

function loadDataError(actionType: string, error: any, options: any) {
    return createAction(actionType, 'loadDataError', {error: error}, options)
}