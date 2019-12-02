import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'underscore';
import moment from 'moment';
import { GlobalHeaderNotifications, Popover, Button } from '@salesforce/design-system-react';
import { getAbsoluteUrl } from '../../utils';

const notificationsObjectName = "notifications";

const LoadingContainer = styled.div`
    text-align: center;
`;

const EmptyContainer = styled.div`
    text-align: center;
`;

const ContentContainer = styled.div`
    .slds-avatar img{
        width: 100%;
        height: 100%;
    }
`;

const HeaderNotificationsCustomHeading = (props) => (
    <div>
        <span>{props.title}</span>
        <Button
            label="全部标记为已读"
            onClick={props.onMarkReadAll}
            variant="link"
            style={{
                float: "right",
                fontSize: "0.9rem",
                marginTop: "2px"
            }}
        />
    </div>
)

HeaderNotificationsCustomHeading.displayName = 'HeaderNotificationsCustomHeading';

const getItemUrl = (item)=>{
    return getAbsoluteUrl(`/api/v4/notifications/${item._id}/read`);
}

const getItemAvatarUrl = (item)=>{
    if(item.from){
        return getAbsoluteUrl(`/avatar/${item.from}`);
    }
    else{
        return getAbsoluteUrl(`/packages/steedos_lightning-design-system/client/images/themes/oneSalesforce/lightning_lite_profile_avatar_96.png`);
    }
}

const HeaderNotificationsCustomContent = (props) => {
    if(props.isEmpty){
        return (<EmptyContainer>您现在没有任何通知。</EmptyContainer>);
    }
    else if(props.isLoading){
        return (<LoadingContainer>...</LoadingContainer>);
    }
    else{
        return (
            <ContentContainer>
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
                                            src={getItemAvatarUrl(item)}
                                            title={`${item.name}"`}
                                        />
                                    </span>
                                </div>
                                <div className="slds-media__body">
                                    <div className="slds-grid slds-grid_align-spread">
                                        <a
                                            href={getItemUrl(item)}
                                            target="_blank"
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
                                                {moment(item.created).startOf().fromNow()}{' '}
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
            </ContentContainer>
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
        filters: [
            ['space', '=', '{spaceId}'],
            ['owner', '=', '{userId}']
        ],
        top: 10
    };

    static propTypes = {
        title: PropTypes.string,
        rows: PropTypes.array,
        interval: PropTypes.number, //定时多少秒抓取一次数据
        filters: PropTypes.array,
        top: PropTypes.number, //抓取多少条数据
        markReadAllApiUrl: PropTypes.string //全部标记为已读的url可配置，默认不需要配置，未配置时为：/api/v4/notifications/all/markReadAll
    };

    componentDidMount() {
        const { init } = this.props;
        if (init) {
            let options = Object.assign({}, this.props, {
                objectName: notificationsObjectName,
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
                pageSize: this.props.top
            });
            init(options);
        }
    }

    componentWillUnmount() {
        const { exist } = this.props;
        if (exist) {
            exist(this.props);
        }
    }

    state = {
    };

    getPopover(){
		const { rows: items, loading: isLoading, title, onMarkReadAll } = this.props;
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
                        onMarkReadAll={onMarkReadAll}
                    />
                }
                id="header-notifications-popover-id"
            />
        )
    }

    render() {
		const { unreadCount, countLoading } = this.props;
        const popover = this.getPopover();
        return (
            <GlobalHeaderNotifications
                notificationCount={countLoading ? 0 : unreadCount}
                popover={popover}
            />
        );
    }
}

export default Notifications;