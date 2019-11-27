import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'underscore';
import { GlobalHeaderNotifications, Popover } from '@salesforce/design-system-react';

const LoadingContainer = styled.div`
    text-align: center;
`;

const EmptyContainer = styled.div`
    text-align: center;
`;

const HeaderNotificationsCustomHeading = (props) => (
    <div>{props.title}</div>
)

HeaderNotificationsCustomHeading.displayName = 'HeaderNotificationsCustomHeading';


const HeaderNotificationsCustomContent = (props) => {
    if(props.isEmpty){
        return (<EmptyContainer>您现在没有任何通知。</EmptyContainer>);
    }
    else if(props.isLoading){
        return (<LoadingContainer>...</LoadingContainer>);
    }
    else{
        return (
            <ul id="header-notifications-custom-popover-content">
                {props.items.map((item) => (
                    <li
                        className={`slds-global-header__notification ${
                            item.is_read ? '' : 'slds-global-header__notification_unread'
                        }`}
                        key={`notification-item-${item._id}`}
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
                                            title={`${item.name}`}
                                        >
                                            <strong>{`${item.name}`}</strong>
                                        </h3>
                                        <p className="slds-truncate" title={item.body}>
                                            {item.body}
                                        </p>
                                        <p className="slds-m-top_x-small slds-text-color_weak">
                                            {item.created}{' '}
                                            {item.is_read ?  null : (
                                                <abbr
                                                    className="slds-text-link slds-m-horizontal_xxx-small"
                                                    title="unread"
                                                >
                                                    ●
                                                </abbr>
                                            )}
                                        </p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        );
    }
}

HeaderNotificationsCustomContent.displayName = 'HeaderNotificationsCustomContent';

class Notifications extends React.Component {
    constructor(props) {
        super(props);
    };

    static defaultProps = {
        title: "通知",
		rows: [],
        objectName: "notifications",
        columns: [
            { field: "name" },
            { field: "body" },
            { field: "related_to" },
            { field: "related_name" },
            { field: "url" },
            { field: "owner" },
            { field: "is_read" },
            { field: "created" }
        ],
        interval: 5 //定时5秒抓取一次数据
    };

    static propTypes = {
        title: PropTypes.string,
        rows: PropTypes.array,
		objectName: PropTypes.string.isRequired,
		columns: PropTypes.arrayOf(PropTypes.shape({
			field: PropTypes.string.isRequired
		})).isRequired,
        interval: PropTypes.number
    };

    componentDidMount() {
        const { init } = this.props;
        if (init) {
            init(this.props);
        }
    }

    state = {
    };

    getPopover(){
		const { rows: items, loading: isLoading, title } = this.props;
        const isEmpty = isLoading ? false : items.length === 0;
        return (
            <Popover
                ariaLabelledby="header-notifications-custom-popover-content"
                body={
                    <HeaderNotificationsCustomContent
                        isLoading={isLoading}
                        isEmpty={isEmpty}
                        items={items}
                    />
                }
                heading={
                    <HeaderNotificationsCustomHeading
                        isEmpty={isEmpty}
                        title={title}
                    />
                }
                id="header-notifications-popover-id"
            />
        )
    }

    render() {
		const { rows } = this.props;
        const popover = this.getPopover();
        return (
            <GlobalHeaderNotifications
                notificationCount={rows.length}
                popover={popover}
            />
        );
    }
}

export default Notifications;