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

let Cell = styled.div`
    flex: 0 0 50%;
    padding: 12px;
`;

class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        
    };

    static defaultProps = {
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
        return (
            <Container className="slds-dashboard">
                <Cell className="slds-dashboard-cell">
                    <IconSettings iconPath="/icons">
                        <div className="slds-grid slds-grid_vertical">
                            <Card
                                id="ExampleCard"
                                heading="今天的任务"
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
            </Container>
        );
    }
}

export default Dashboard;