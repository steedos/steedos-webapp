import * as Odata from 'ts-odata-client'
import utils from '../utils'
import _ from 'underscore'

function getSelect(object){
    return _.keys(object.fields)
}

export async function query(service: string, options: any = { pageSize: 10, currentPage: 0 }) {
    let { currentPage, pageSize, searchMode, object } = options

    let objectName = object.name;
    let $select = getSelect(object);
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

    if (typeof options.$filter === "function") {
        query = query.filter(options.$filter);
    }
    else if (options.filters || (options.search && $select)) {

        query = query.filter((p: any) => {
            let _filters: any = null, _query: any = null
            if(options.filters){
                _filters = p
                options.filters.forEach((element: any) => {
                    _filters = p[element.operation](element.columnName, element.value)
                });
            }
            
            if(options.search && $select){
                _query = p
                $select = _.union($select, ["_id"]);
                $select.forEach((element: any, i: number) => {
                    if(_query.or){
                        _query = _query.or(p["contains"](element, options.search))
                    }else{
                        _query = p["contains"](element, options.search)
                    }
                    
                });
            }

            if(searchMode && _query){
                return _query
            }
            
            if(_filters && _query){
                return _filters.and(_query)
            }
            return _filters || _query || p
        });
    }

    let results = await query.getManyAsync();
    return results
}