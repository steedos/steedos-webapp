import * as React from 'react';
import Grid from '../grid'
import OrganizationsTree from '../organizations'
import PropTypes from 'prop-types';
import { createAction as createActionGrid } from '../../actions/views/grid';
import styled from 'styled-components'
import _ from 'underscore'
import { Card, CardEmpty, CardFilter, Icon, DataTable, DataTableColumn, 
    AppLauncherTile, AppLauncherExpandableSection } from '@salesforce/design-system-react';
import utils from '../../utils'


const userId = utils.getCookie("X-User-Id");
const spaceId = utils.getCookie("X-Space-Id");

class WidgetInstance extends React.Component {

    constructor(props) {
        super(props)
        // props.dispatch(loadEntitiesData({ objectName: 'organizations', filters: [{ columnName: 'parent', operation: 'equals', value: null }] }))
        // props.dispatch(createActionGrid("$filter", (p) => {
        //     return p.equals("space", spaceId).and(p.equals("inbox_users", userId).or(p.equals("cc_users", userId)));
        // }, "instances"))
    };

    static defaultProps = {
        selectionLabel: 'name',
        cellListColumns: [
            { 
                field: 'name', 
                label: '名称', 
                onClick: function (event, data) { 
                    let url = `/workflow/space/${spaceId}/inbox/${data.id}`;
                    window.location = url;
                } 
            },{ 
                field: 'modified', 
                label: '修改时间', 
                type: 'datetime' 
            }
        ],
        $select: ['name'],
        $filter: (p) => {
            return p.equals("space", spaceId).and(p.equals("inbox_users", userId).or(p.equals("cc_users", userId)));
        }
    };

    static propTypes = {
    };

    componentDidMount() {
        const { init } = this.props;
        if (init) {
            init(this.props)
        }
    }

    static displayName = 'CardExample';

    state = {
    };

    render() {
        let { selectionLabel, cellListColumns, $filter } = this.props;
        return (
            <Card
                id="InstanceCard"
                heading="待办事项"
                footer={
                    <a href={`/workflow/space/${spaceId}/inbox`}>
                        查看全部
                    </a>
                }
            >
                <Grid searchMode="omitFilters"
                    pageSize={5}
                    objectName="instances"
                    columns={cellListColumns}
                    selectionLabel={selectionLabel}
                    $filter={$filter}
                />
            </Card>
        );
    }
}

export default WidgetInstance;