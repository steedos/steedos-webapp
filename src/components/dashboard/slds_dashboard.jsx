import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import _ from 'underscore'
import WidgetInstance from '../widget_instance';
import WidgetObject from '../widget_object';
import WidgetApps from '../widget_apps';
import WidgetRemote from '../widget_remote';

let Container = styled.div`
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    margin: 1rem;
    &>.slds-dashboard-column-center{
        .slds-dashboard-cell-bottom-left{
            padding-right: 0.5rem;
            margin-top: 1rem;
        }
        .slds-dashboard-cell-bottom-right{
            padding-left: 0.5rem;
            margin-top: 1rem;
        }
    }
    &>.slds-dashboard-column-right{
        margin-left: 1rem;
    }
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
        centerTopSection: <WidgetApps />,
        centerBottomLeftSection: null,
        centerBottomRightSection: null,
        rightSection: null
    };

    static propTypes = {
        config: PropTypes.object,
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
        leftSection: this.props.leftSection,
        centerTopSection: this.props.centerTopSection,
        centerBottomLeftSection: this.props.centerBottomLeftSection,
        centerBottomRightSection: this.props.centerBottomRightSection,
        rightSection: this.props.rightSection
    };

    convertConfigItemToSection(value, key){
        switch (value.type) {
            case "apps":
                return <WidgetApps key={key} label={value.label} mobile={value.mobile} showAllItems={value.showAllItems} />
            case "object":
                return <WidgetObject key={key} label={value.label} 
                    objectName={value.objectName} filters={value.filters} columns={value.columns} 
                    illustration={value.illustration} showAllLink={value.showAllLink}
                    noHeader={value.noHeader} unborderedRow={value.unborderedRow} />
            case "instance":
                return <WidgetInstance key={key} label={value.label} />
            case "react":
                if (typeof value.component === "function") {
                    return (
                        <React.Fragment key={key}>
                            {value.component(value)}
                        </React.Fragment>
                    )
                }
                else if (typeof value.component === "string" && value.component.length){
                    return <WidgetRemote key={key} label={value.label} url={value.component} />
                }
        }
    }

    convertConfigToSection(config) {
        let result = {}, section;
        _.each(config, (value, key) => {
            switch (value.position) {
                case "LEFT":
                    section = this.convertConfigItemToSection(value, key);
                    if (section){
                        if (!result.leftSection){
                            result.leftSection = [];
                        }
                        result.leftSection.push(section);
                    }
                    break;
                case "CENTER_TOP":
                    section = this.convertConfigItemToSection(value, key);
                    if (section) {
                        if (!result.centerTopSection) {
                            result.centerTopSection = [];
                        }
                        result.centerTopSection.push(section);
                    }
                    break;
                case "CENTER_BOTTOM_LEFT":
                    section = this.convertConfigItemToSection(value, key);
                    if (section) {
                        if (!result.centerBottomLeftSection) {
                            result.centerBottomLeftSection = [];
                        }
                        result.centerBottomLeftSection.push(section);
                    }
                    break;
                case "CENTER_BOTTOM_RIGHT":
                    section = this.convertConfigItemToSection(value, key);
                    if (section) {
                        if (!result.centerBottomRightSection) {
                            result.centerBottomRightSection = [];
                        }
                        result.centerBottomRightSection.push(section);
                    }
                    break;
                case "RIGHT":
                    section = this.convertConfigItemToSection(value, key);
                    if (section) {
                        if (!result.rightSection) {
                            result.rightSection = [];
                        }
                        result.rightSection.push(section);
                    }
                    break;
            }
        });
        return result;
    }

    render() {
        const config = this.props.config;
        let configSection = {};
        if (config) {
            configSection = this.convertConfigToSection(config);
        }
        let { leftSection, centerTopSection, centerBottomLeftSection, centerBottomRightSection, rightSection } = { ...this.state, ...configSection };

        return (
            <Container className="slds-dashboard">
                <Column className="slds-dashboard-column slds-dashboard-column-center">
                    {
                        centerTopSection ? (
                            <Cell className= "slds-dashboard-cell slds-dashboard-cell-center-top" >
                                <div className="slds-grid slds-grid_vertical">
                                    {centerTopSection}
                                </div>
                            </Cell>
                        ): null
                    }
                    {
                        centerBottomLeftSection ? (
                            <Cell className="slds-dashboard-cell flex-split slds-dashboard-cell-bottom-left" >
                                <div className="slds-grid slds-grid_vertical">
                                    {centerBottomLeftSection}
                                </div>
                            </Cell>
                        ) : null
                    }
                    {
                        centerBottomRightSection ? (
                            <Cell className="slds-dashboard-cell flex-split slds-dashboard-cell-bottom-right" >
                                <div className="slds-grid slds-grid_vertical">
                                    {centerBottomRightSection}
                                </div>
                            </Cell>
                        ) : null
                    }
                </Column>
                <Column className="slds-dashboard-column slds-dashboard-column-right">
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