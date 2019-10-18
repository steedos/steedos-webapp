import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'underscore';
import { Card, Icon, AppLauncherTile, AppLauncherExpandableSection } from '@salesforce/design-system-react';

let AppLauncherDesktopInternal = styled.div`
    padding: 0px 1rem;
    .slds-section.slds-is-open{
        .slds-section__content{
            padding-top: 0px;
        }
    }
`;

class WidgetApps extends React.Component {
    constructor(props) {
        super(props)
    };

    static defaultProps = {
        label: "应用程序启动器"
    };

    static propTypes = {
        label: PropTypes.string,
        apps: PropTypes.array
    };

    componentDidMount() {
        const { init } = this.props;
        if (init) {
            init(this.props)
        }
    }

    state = {
        apps: []
    };

    render() {
        let { label,apps } = this.props;
        let appCells;
        if (apps) {
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
                            onClick={(event, args) => {
                                if (args.href) {
                                    window.location = args.href;
                                }
                            }}
                        />
                    )
                }
            })
        }
        return (
            <Card
                heading={label}
            >
                <AppLauncherDesktopInternal className="slds-app-launcher__content">
                    <AppLauncherExpandableSection title="所有应用程序">
                        {appCells}
                    </AppLauncherExpandableSection>
                </AppLauncherDesktopInternal>
            </Card>
        );
    }
}

export default WidgetApps;