import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import _ from 'underscore'
import { Card, Icon, DataTable, DataTableColumn } from '@salesforce/design-system-react';
import WidgetInstance from '../widget_instance';
import WidgetAppLauncher from '../widget_appLauncher';

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

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
    };

    static defaultProps = {
        leftSection: null,
        centerTopSection: <WidgetAppLauncher />,
        centerBottomLeftSection: null,
        centerBottomRightSection: null,
        rightSection: null
    };

    static propTypes = {
        leftSection: PropTypes.node,
        centerTopSection: PropTypes.node,
        centerBottomLeftSection: PropTypes.node,
        centerBottomRightSection: PropTypes.node,
        rightSection: PropTypes.node
    };

    componentDidMount() {
        const { init } = this.props;
        if (init) {
            init(this.props)
        }
    }

    static displayName = 'Dashboard';

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
        const { leftSection, centerTopSection, centerBottomLeftSection, centerBottomRightSection, rightSection } = this.props;
        return (
            <Container className="slds-dashboard">
                <Column className="slds-dashboard-column">
                    {
                        centerTopSection ? (
                            <Cell className = "slds-dashboard-cell" >
                                <div className="slds-grid slds-grid_vertical">
                                    {centerTopSection}
                                </div>
                            </Cell>
                        ): null
                    }
                    {
                        centerBottomLeftSection ? (
                            <Cell className="slds-dashboard-cell flex-split" >
                                <div className="slds-grid slds-grid_vertical">
                                    {centerBottomLeftSection}
                                </div>
                            </Cell>
                        ) : null
                    }
                    {
                        centerBottomRightSection ? (
                            <Cell className="slds-dashboard-cell flex-split" >
                                <div className="slds-grid slds-grid_vertical">
                                    {centerBottomRightSection}
                                </div>
                            </Cell>
                        ) : null
                    }
                </Column>
                <Column className="slds-dashboard-column">
                    {
                        rightSection ? (
                            <Cell className="slds-dashboard-cell" >
                                <div className="slds-grid slds-grid_vertical">
                                    {rightSection}
                                </div>
                            </Cell>
                        ) : null
                    }
                </Column>
            </Container>
        );
    }
}

export default Dashboard;