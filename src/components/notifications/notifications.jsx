import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'underscore';
import { GlobalHeaderNotifications, Popover, Icon, AppLauncherExpandableSection} from '@salesforce/design-system-react';
import { getCookie } from '../../utils';
import {AppLauncherTile} from '@salesforce/design-system-react';

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


// Notifications content is currently the contents of a generic `Popover` with markup copied from https://www.lightningdesignsystem.com/components/global-header/#Notifications. This allows content to have tab stops and focus trapping. If you need a more specific/explicit `GlobalHeaderNotification` content, please create an issue.
const HeaderNotificationsCustomContent = (props) => (
	<ul id="header-notifications-custom-popover-content">
		{props.items.map((item) => (
			<li
				className={`slds-global-header__notification ${
					item.unread ? 'slds-global-header__notification_unread' : ''
				}`}
				key={`notification-item-${item.id}`}
			>
				<div className="slds-media slds-has-flexi-truncate slds-p-around_x-small">
					<div className="slds-media__figure">
						<span className="slds-avatar slds-avatar_small">
							<img
								alt={item.name}
								src={`/assets/images/${item.avatar}.jpg`}
								title={`${item.name} avatar"`}
							/>
						</span>
					</div>
					<div className="slds-media__body">
						<div className="slds-grid slds-grid_align-spread">
							<a
								href="javascript:void(0);"
								className="slds-text-link_reset slds-has-flexi-truncate"
							>
								<h3
									className="slds-truncate"
									title={`${item.name} ${item.action}`}
								>
									<strong>{`${item.name} ${item.action}`}</strong>
								</h3>
								<p className="slds-truncate" title={item.comment}>
									{item.comment}
								</p>
								<p className="slds-m-top_x-small slds-text-color_weak">
									{item.timePosted}{' '}
									{item.unread ? (
										<abbr
											className="slds-text-link slds-m-horizontal_xxx-small"
											title="unread"
										>
											●
										</abbr>
									) : null}
								</p>
							</a>
						</div>
					</div>
				</div>
			</li>
		))}
	</ul>
);

HeaderNotificationsCustomContent.displayName = 'HeaderNotificationsCustomContent';

class Notifications extends React.Component {
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
            let token = getCookie("X-Access-Token");
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
        let items = [
            {
                action: 'mentioned you',
                avatar: 'avatar2',
                comment:
                    '@jrogers Could I please have a review on my presentation deck',
                id: 1,
                name: 'Val Handerly',
                timePosted: '10 hours ago',
                unread: true,
            },
            {
                action: 'commented on your post',
                avatar: 'avatar3',
                comment: 'I totally agree with your sentiment',
                id: 2,
                name: 'Jon Rogers',
                timePosted: '13 hours ago',
                unread: true,
            },
            {
                action: 'mentioned you',
                avatar: 'avatar2',
                comment:
                    "@jrogers Here's the conversation I mentioned to you",
                id: 3,
                name: 'Rebecca Stone',
                timePosted: '1 day ago',
            },
        ];

        return (
            <GlobalHeaderNotifications
                notificationCount={5}
                popover={
                    <Popover
                        ariaLabelledby="header-notifications-custom-popover-content"
                        body={
                            <HeaderNotificationsCustomContent
                                items={items}
                            />
                        }
                        id="header-notifications-popover-id"
                    />
                }
            />
        );
    }
}

export default Notifications;