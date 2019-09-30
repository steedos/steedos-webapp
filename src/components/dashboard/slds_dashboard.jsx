import * as React from 'react';
import Grid from '../grid'
import OrganizationsTree from '../organizations'
import PropTypes from 'prop-types';
import { createAction as createActionGrid } from '../../actions/views/grid';
import styled from 'styled-components'
import _ from 'underscore'
import { Card, CardEmpty, CardFilter, Icon, DataTable, DataTableColumn, 
    AppLauncherTile, AppLauncherExpandableSection } from '@salesforce/design-system-react';

const sampleItems = [
    { id: '1', name: 'Cloudhub' },
    { id: '2', name: 'Cloudhub + Anypoint Connectors' },
    { id: '3', name: 'Cloud City' },
];

let Container = styled.div`
    display: flex;
    flex: 1;
    flex-wrap: wrap;
`;

let Column = styled.div`
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    &:nth-child(2){
        flex: 0 0 33%;
    }
`;

let Cell = styled.div`
    flex: 0 0 100%;
    padding: 12px;
    &.flex-split{
        flex: 0 0 50%;
    }
`;

let AppLauncherDesktopInternal = styled.div`
    padding: 0px 1rem;
    .slds-section.slds-is-open{
        .slds-section__content{
            padding-top: 0px;
        }
    }
`;

const userId = "hPgDcEd9vKQxwndQR";
const spaceId = "Af8eM6mAHo7wMDqD3";

const instance = {
    name: 'instances',
    label: '申请单',
    fields: {
        name: {
            label: '名称',
            cellOnClick: function(event, data){
                console.log('instance.name click, data is', data);
            }
        },
        modified: {
            label: '修改时间'
        }
    }
}

class Dashboard extends React.Component {

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
            { field: 'name', label: '名称', onClick: function (event, data) { console.log('instance.name click, data is', data); } },
            { field: 'modified', label: '修改时间', type: 'datetime' }
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

    // componentDidMount() {
    //     const { init } = this.props as any
    //     init(this.props)
    // }

    static displayName = 'CardExample';

    state = {
        items: sampleItems,
        isFiltering: false,
    };

    handleFilterChange = (event) => {
        const filteredItems = sampleItems.filter((item) =>
            RegExp(event.target.value, 'i').test(item.name)
        );
        this.setState({ isFiltering: true, items: filteredItems });
    };

    render() {
        const isEmpty = this.state.items.length === 0;
        let { selectionLabel, cellListColumns, $filter, bootstrap } = this.props;
        let apps = bootstrap.apps;
        let appCells;
        if(apps){
            appCells = _.map(apps, (app, key) => {
                if (app.name) {
                    return (
                        <AppLauncherTile
                            key={key}
                            description={app.description}
                            iconText="APP"
                            title={app.name}
                        />
                    )
                }
            })
        }
        else{

        }
        return (
            <Container className="slds-dashboard">
                <Column className="slds-dashboard-column">
                    <Cell className="slds-dashboard-cell">
                        <div className="slds-grid slds-grid_vertical">
                            <Card
                                id="InstanceCard"
                                heading="待办事项"
                                icon={<Icon category="standard" name="document" size="small" />}
                            >
                                <Grid searchMode="omitFilters"
                                    pageSize={200} 
                                    objectName="instances"
                                    columns={cellListColumns}
                                    selectionLabel={selectionLabel}
                                    $filter={$filter}
                                />
                            </Card>
                        </div>
                    </Cell>
                    <Cell className="slds-dashboard-cell">
                        <div className="slds-grid slds-grid_vertical">
                            <Card
                                id="ExampleCard"
                                heading="今日事件"
                                icon={<Icon category="standard" name="document" size="small" />}
                            >
                                <DataTable items={this.state.items} id="DataTableExample-1">
                                    <DataTableColumn
                                        label="Opportunity Name"
                                        property="name"
                                        truncate
                                    />
                                </DataTable>
                            </Card>
                        </div>
                    </Cell>
                    <Cell className="slds-dashboard-cell">
                        <div className="slds-grid slds-grid_vertical">
                            <Card
                                id="ExampleCard"
                                heading="应用程序启动器"
                                icon={<Icon category="standard" name="document" size="small" />}
                            >
                                <AppLauncherDesktopInternal className="slds-app-launcher__content">
                                    <AppLauncherExpandableSection title="所有应用程序">
                                        {appCells}
                                    </AppLauncherExpandableSection>
                                </AppLauncherDesktopInternal>
                            </Card>
                        </div>
                    </Cell>
                    <Cell className="slds-dashboard-cell flex-split">
                        <div className="slds-grid slds-grid_vertical">
                            <Card
                                id="ExampleCard"
                                heading="左下1"
                                icon={<Icon category="standard" name="document" size="small" />}
                            >
                                <DataTable items={this.state.items} id="DataTableExample-1">
                                    <DataTableColumn
                                        label="Opportunity Name"
                                        property="name"
                                        truncate
                                    />
                                </DataTable>
                            </Card>
                        </div>
                    </Cell>
                    <Cell className="slds-dashboard-cell flex-split">
                        <div className="slds-grid slds-grid_vertical">
                            <Card
                                id="ExampleCard"
                                heading="左下2"
                                icon={<Icon category="standard" name="document" size="small" />}
                            >
                                <DataTable items={this.state.items} id="DataTableExample-1">
                                    <DataTableColumn
                                        label="Opportunity Name"
                                        property="name"
                                        truncate
                                    />
                                </DataTable>
                            </Card>
                        </div>
                    </Cell>
                </Column>
                <Column className="slds-dashboard-column">
                    <Cell className="slds-dashboard-cell">
                        <div className="slds-grid slds-grid_vertical">
                            <Card
                                id="ExampleCard"
                                heading="右侧Card"
                                icon={<Icon category="standard" name="document" size="small" />}
                            >
                                <DataTable items={this.state.items} id="DataTableExample-1">
                                    <DataTableColumn
                                        label="Opportunity Name"
                                        property="name"
                                        truncate
                                    />
                                </DataTable>
                            </Card>
                        </div>
                    </Cell>
                </Column>
            </Container>
        );
    }
}

export default Dashboard;