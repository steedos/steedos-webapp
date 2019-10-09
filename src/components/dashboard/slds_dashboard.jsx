import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import _ from 'underscore'
import { Card, Icon, DataTable, DataTableColumn, 
    AppLauncherTile, AppLauncherExpandableSection } from '@salesforce/design-system-react';
import WidgetInstance from '../widget_instance';

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
class Dashboard extends React.Component {
    constructor(props) {
        super(props)
    };

    static defaultProps = {
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
        let { apps } = this.props;
        let appCells;
        if(apps){
            appCells = _.map(apps, (app, key) => {
                if (app.name) {
                    return (
                        <AppLauncherTile
                            assistiveText={{ dragIconText: app.name }}
                            key={key}
                            description={app.description}
                            iconNode={
                                <Icon
                                    assistiveText={{ label: app.name }}
                                    category="standard"
                                    name={app.icon_slds}
                                />
                            }
                            title={app.name}
                            href={`/app/${app._id}`}
                            onClick={(event, args)=>{
                                if (args.href){
                                    window.location = args.href;
                                }
                            }}
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
                            <WidgetInstance />
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