import * as Odata from 'ts-odata-client'
import utils from '../utils'
import _ from 'underscore'
import { formatFiltersToODataQuery } from "@steedos/filters";
import { request } from "./request"

function getSelect(columns){
    return _.pluck(columns, 'field')
}

function getExpand(columns) {
    return _.pluck(_.filter(columns, (column: any)=>{
        if(column.type === 'lookup' || column.type === 'master_detail'){
            return true
        }
        return false
    }), 'field')
}

function getODataFilter(options: any, $select: any) : string{
    if (options.filters || (options.search && $select)) {
        let { searchMode } = options;
        let result: any, _filters: any, _query: any;
        if (options.filters && options.filters.length) {
            _filters = options.filters;
        }
        if (options.search && $select) {
            $select = _.union($select, ["_id"]);
            _query = [];
            $select.forEach((element: string, i: number) => {
                if(i > 0){
                    _query.push('or');
                }
                _query.push([element, 'contains', options.search]);
            });
        }

        if (searchMode && _query) {
            result = _query;
        }
        else if (_filters && _query) {
            result = [_filters, 'and', _query];
        }
        else if (_filters){
            result = _filters;
        }
        return formatFiltersToODataQuery(result) as string;
    }
    else{
        return "";
    }
}

export async function query(service: string, options: any = { pageSize: 10, currentPage: 0 }) {
    let { currentPage, pageSize, objectName, columns } = options

    let $select = getSelect(columns);
    let $expand = getExpand(columns);
    let skip = currentPage * pageSize

    let spaceId = utils.getCookie("X-Space-Id");
    let authToken = utils.getCookie("X-Auth-Token");
    let userId = utils.getCookie("X-User-Id")

    const endpoint = `${service}/api/odata/v4/${spaceId}/${objectName}`;
    const requestInit = () => {
        return {
            headers: {
                'X-Auth-Token': authToken,
                'X-User-Id': userId
            }
        }
    }
    const baseQuery = Odata.ODataV4QueryProvider.createQuery<any>(endpoint, requestInit);
    let query = baseQuery.skip(skip || 0)

    if (pageSize) {
        query = query.top(pageSize)
    }

    if ($select) {
        query = query.select(...$select)
    }

    _.each(($expand as any), (e:string)=>{
        query = query.expand(e);
    })

    let odataFilter: string = getODataFilter(options, $select);
    let odataUrl = query.provider.buildQuery(query.expression);
    console.log("====odataUrl=====", `${odataUrl}&$filter=${encodeURIComponent(odataFilter)}`);
    if (odataFilter){
        odataUrl = `${odataUrl}&$filter=${encodeURIComponent(odataFilter)}`;
    }
    let results = await request(odataUrl);
    return results
}