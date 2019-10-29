import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'underscore';
import { Card, Icon, AppLauncher, AppLauncherTile, AppLauncherExpandableSection} from '@salesforce/design-system-react';
// import { Highlighter, Truncate, Button, Tooltip } from '@salesforce/design-system-react';
import classNames from 'classnames';
import utils from '../../utils';

let AppLauncherDesktopInternal = styled.div`
    padding: 0px 1rem;
    .slds-section.slds-is-open{
        .slds-section__content{
            padding-top: 0px;
        }
    }
    .slds-section__title{
        display: none;
    }
    &.slds-app-launcher__show-all-items{
        .slds-section__title{
            display: block;
        }
    }
`;


class AppLauncherLinkTile extends AppLauncherTile {
    render() {
        let tile = super.render();
        const { target, href } = this.props;
        const { children, ...otherPorps } = tile.props;
        let newProps = {
            target,
            ...otherPorps
        };
        const linkTile = React.cloneElement(
            <a
                className={classNames(
                    'slds-app-launcher__tile slds-text-link_reset slds-is-draggable',
                    tile.props.className
                )}
                onClick={this.handleClick}
                role="button"
                tabIndex="0"
                href={href}
                target={target}
            />,
            newProps,
            children
        );
        return linkTile;
    }
}

class WidgetApps extends React.Component {
    constructor(props) {
        super(props);
    };

    static defaultProps = {
        label: "应用程序启动器",
        mobile: false,
        showAllItems: false
    };

    static propTypes = {
        label: PropTypes.string,
        apps: PropTypes.array,
        mobile: PropTypes.bool,
        showAllItems: PropTypes.bool
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

    getAppUrl(app, token){
        let url = `/app/${app._id}`;
        if (app.url) {
            url = app.url;
        }
        if (!/^http(s?):\/\//.test(url)) {
            if (window.__meteor_runtime_config__)
                url = window.__meteor_runtime_config__.ROOT_URL_PATH_PREFIX + url;
        }

        if (url.indexOf("?") > -1) {
            url += `&token=${token}`
        }
        else {
            url += `?token=${token}`
        }
        return url;
    }

    getAppCells(apps){
        if (apps) {
            let token = utils.getCookie("X-Access-Token");
            return _.map(apps, (app, key) => {
                if (app && app.name) {
                    let url = this.getAppUrl(app, token);
                    return (
                        <AppLauncherLinkTile
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
                            href={url}
                            target="_blank"
                            // onClick={(event, args) => {
                            //     if (args.href) {
                            //         if (app.is_new_window) {
                            //             window.open(args.href);
                            //         }
                            //         else {
                            //             window.location = args.href;
                            //         }
                            //     }
                            // }}
                        />
                    )
                }
            })
        }
        else{
            return null;
        }
    }

    render() {
        let { label, apps, mobile, showAllItems } = this.props;
        let appCells = this.getAppCells(apps);
        let appLauncherDesktopInternal;
        if (mobile){
            appLauncherDesktopInternal = (
                <AppLauncherDesktopInternal className="slds-app-launcher__content">
                    {appCells}
                </AppLauncherDesktopInternal>
            );
        }
        else {
            let extraClassName = "";
            if (showAllItems){
                extraClassName = "slds-app-launcher__show-all-items";
            }
            appLauncherDesktopInternal = (
                <AppLauncherDesktopInternal className={`slds-app-launcher__content ${extraClassName}`}>
                    <AppLauncherExpandableSection title="所有应用程序">
                        {appCells}
                    </AppLauncherExpandableSection>
                </AppLauncherDesktopInternal>
            );
        }
        return (
            <Card
                heading={label}
            >
                {appLauncherDesktopInternal}
            </Card>
        );
    }
}

export default WidgetApps;