import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import _ from 'underscore'
import WidgetObject from '../widget_object';
import WidgetApps from '../widget_apps';
import WidgetRemote from '../widget_remote';
import { WidgetInstancesPendings, WidgetAnnouncementsWeek, WidgetTasksToday, WidgetEventsToday } from '../widget_reducts';

let Container = styled.div`
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    margin: 1rem;
    @media (max-width: 767px) {
        margin: 0rem;
        margin-bottom: 1rem;
        .slds-grid{
            .slds-card{
                border: none;
                border-radius: 0;
            }
        }
    }
    &>.slds-dashboard-column-center{
        .slds-dashboard-cell-bottom-left{
            padding-right: 0.5rem;
            margin-top: 1rem;
            @media (max-width: 767px) {
                padding-right: 0;
            }
        }
        .slds-dashboard-cell-bottom-right{
            padding-left: 0.5rem;
            margin-top: 1rem;
            @media (max-width: 767px) {
                padding-left: 0;
            }
        }
    }
    &>.slds-dashboard-column-right{
        margin-left: 1rem;
        @media (max-width: 767px) {
            margin-left: 0;
        }
    }
    &>.slds-dashboard-column{
        @media (max-width: 767px) {
            &:not(:first-of-type){
                margin-top: 1rem;
            }
        }
    }
`;

let Column = styled.div`
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    align-content: flex-start;
    &:nth-child(2){
        flex: 0 0 33%;
        @media (max-width: 767px) {
            flex: 0 0 100%;
        }
    }
`;

let Cell = styled.div`
    flex: 0 0 100%;
    align-content: flex-start;
    &.flex-split{
        flex: 1;
        @media (max-width: 767px) {
            flex: 0 0 100%;
        }
    }
    .slds-card__body{
        min-height: 7.6rem;
        .slds-illustration.slds-illustration_small{
            .slds-illustration__svg{
                height: 8rem;
                margin-bottom: 0.4rem;
                margin: -0.8rem 0;
            }
            .slds-text-longform{
                p{
                    margin-bottom: 0;
                }
            }
        }
    }
    .slds-card__footer{
        margin-top: 0px;
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
        config: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
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
                return <WidgetApps key={key} label={value.label} mobile={value.mobile} showAllItems={value.showAllItems} onTileClick={value.onTileClick} ignoreApps={value.ignoreApps} />
            case "object":
                return <WidgetObject key={key} label={value.label} 
                    objectName={value.objectName} filters={value.filters} columns={value.columns} 
                    illustration={value.illustration} showAllLink={value.showAllLink} hrefTarget={value.hrefTarget} footer={value.footer}
                    noHeader={value.noHeader} unborderedRow={value.unborderedRow} sort={value.sort} rowIcon={value.rowIcon} maxRows={value.maxRows} />
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
            case "instances_pendings":
                return <WidgetInstancesPendings key={key} {...value} />
            case "announcements_week":
                return <WidgetAnnouncementsWeek key={key} {...value} />
            case "tasks_today":
                return <WidgetTasksToday key={key} {...value} />
            case "events_today":
                return <WidgetEventsToday key={key} {...value} />
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