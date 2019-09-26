import * as React from 'react';
import Grid from '../grid'
import OrganizationsTree from '../organizations'
import PropTypes from 'prop-types';
import { createAction } from '../../actions/views/grid';
import styled from 'styled-components'
import _ from 'underscore'
import { Card, CardEmpty, CardFilter, Icon, DataTable, DataTableColumn, IconSettings } from '@salesforce/design-system-react';

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

const userId = "hPgDcEd9vKQxwndQR";
const spaceId = "Af8eM6mAHo7wMDqD3";

class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        // props.dispatch(loadEntitiesData({ objectName: 'organizations', filters: [{ columnName: 'parent', operation: 'equals', value: null }] }))
        props.dispatch(createAction("$filter", (p) => {
            return p.equals("space", spaceId).and(p.equals("inbox_users", userId).or(p.equals("cc_users", userId)));
        }, "instances"))
    };

    static defaultProps = {
        selectionLabel: 'name',
        cellListColumns: [
            { name: 'name', title: '名称' },
            { name: 'modified', title: '修改时间' }
        ],
        $select: ['name'],
    };

    static propTypes = {
    };

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
        let { selectionLabel, cellListColumns, $select } = this.props as any
        
        return (
            <Container className="slds-dashboard">
                <Column className="slds-dashboard-column">
                    <Cell className="slds-dashboard-cell">
                        <IconSettings iconPath="/icons">
                            <div className="slds-grid slds-grid_vertical">
                                <Card
                                    id="InstanceCard"
                                    heading="待办事项"
                                    icon={<Icon category="standard" name="document" size="small" />}
                                >
                                    <Grid searchMode="omitFilters"
                                        pageSize={200} 
                                        objectName='instances' 
                                        columns={cellListColumns} 
                                        selectionLabel={selectionLabel} 
                                        $select={$select} 
                                    />
                                </Card>
                            </div>
                        </IconSettings>
                    </Cell>
                    <Cell className="slds-dashboard-cell">
                        <IconSettings iconPath="/icons">
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
                        </IconSettings>
                    </Cell>
                    <Cell className="slds-dashboard-cell">
                        <IconSettings iconPath="/icons">
                            <div className="slds-grid slds-grid_vertical">
                                <Card
                                    id="ExampleCard"
                                    heading="应用程序启动器"
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
                        </IconSettings>
                    </Cell>
                    <Cell className="slds-dashboard-cell flex-split">
                        <IconSettings iconPath="/icons">
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
                        </IconSettings>
                    </Cell>
                    <Cell className="slds-dashboard-cell flex-split">
                        <IconSettings iconPath="/icons">
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
                        </IconSettings>
                    </Cell>
                </Column>
                <Column className="slds-dashboard-column">
                    <Cell className="slds-dashboard-cell">
                    <IconSettings iconPath="/icons">
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
                    </IconSettings>
                </Cell>
                </Column>
            </Container>
        );
    }
}

export default Dashboard;