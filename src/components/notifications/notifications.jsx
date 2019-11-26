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

const HeaderNotificationsCustomHeading = (props) => (
    <div>通知</div>
)

HeaderNotificationsCustomHeading.displayName = 'HeaderNotificationsCustomHeading';


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

    getItems(){
        return [
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
    }

    getPopover(items){
        return (
            <Popover
                ariaLabelledby="header-notifications-custom-popover-content"
                body={
                    <HeaderNotificationsCustomContent
                        items={items}
                    />
                }
                heading={
                    <HeaderNotificationsCustomHeading
                        isEmpty={!!items.length}
                    />
                }
                id="header-notifications-popover-id"
            />
        )
    }

    render() {
        const items = this.getItems();
        const popover = this.getPopover(items);

        return (
            <GlobalHeaderNotifications
                notificationCount={5}
                popover={popover}
            />
        );
    }
}

export default Notifications;