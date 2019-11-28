import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'underscore';
import moment from 'moment';
import { GlobalHeaderNotifications, Popover } from '@salesforce/design-system-react';
import { getObjectRecordUrl, getAbsoluteUrl } from '../../utils';

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
    <div>{props.title}</div>
)

HeaderNotificationsCustomHeading.displayName = 'HeaderNotificationsCustomHeading';

const getItemUrl = (item)=>{
    if(item.url){
        return getAbsoluteUrl(item.url);
    }
    else{
        if(item.related_to){
            return getObjectRecordUrl(item.related_to.o, item.related_to.ids[0], item.space)
        }
        else{
            return "";
        }
    }
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
		rows: []
    };

    static propTypes = {
        title: PropTypes.string,
        rows: PropTypes.array,
        interval: PropTypes.number //定时多少秒抓取一次数据
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
                ]
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