import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'underscore';
import { Card, Icon, AppLauncherExpandableSection} from '@salesforce/design-system-react';
import { getCookie } from '../../utils';
import {AppLauncherTile} from '../slds_app_launcher';

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
    .slds-link{
        color: #006dcc;
        text-decoration: none;
        transition: color .1s linear;
        background-color: transparent;
        cursor: pointer;
        &:hover, &:focus{
            text-decoration: underline;
            color: #005fb2;
        }
    }
`;

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
        showAllItems: PropTypes.bool,
        ignoreApps: PropTypes.array,
        onTileClick: PropTypes.func
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

    onTileClick(event, app, tile, index){
        if(app && window.Creator && window.Creator.openApp){
            window.Creator.openApp(app._id, event);
        }
        const { onTileClick } = this.props;
        if(onTileClick){
            onTileClick.call(this, event, app, tile, index);
        }
    }

    getAppCells(apps){
        if (apps) {
            const onTileClick = this.onTileClick;
            let token = getCookie("X-Access-Token");
            const self = this;
            return _.map(apps, (app, key) => {
                if (app && app.name) {
                    let url = this.getAppUrl(app, token);
                    let target = app.is_new_window ? "_blank" : null;
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
                            href={url}
                            target={target}
                            onClick={(e)=>{
                                onTileClick.call(self, e, app, {...this}, key);
                            }}
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
        let { label, apps, mobile, showAllItems, ignoreApps } = this.props;
        if(ignoreApps && ignoreApps.length){
            apps = _.reject(apps, function(o) { return ignoreApps.indexOf(o._id) > -1 });
        }
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