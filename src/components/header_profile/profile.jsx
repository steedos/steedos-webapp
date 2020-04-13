import React from 'react';
import styled from 'styled-components';
import { GlobalHeaderProfile, Popover, MediaObject, Icon, Avatar } from '@salesforce/design-system-react';
import PropTypes from 'prop-types';
import _ from 'underscore';

const ProfileContainer = styled.div`
    .slds-popover__body, .slds-popover__footer{
        padding: 0px;
    }

    .slds-avatar{
        img{
            height: 100%;
        }
    }

    .user-profile-content{
        .slds-avatar{
            width: 2.4rem;
            height: 2.4rem;
            .slds-icon{
                width: 2.4rem;
                height: 2.4rem;
            }
        }
    }
`;

class profile extends React.Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        settingsAccountClick: PropTypes.func.isRequired,
        logoutAccountClick: PropTypes.func.isRequired,
        avatarURL: PropTypes.string.isRequired
    }

    footerClick = (url)=>{
        if(window.Steedos){
            window.Steedos.openWindow(url);
        }else{
            const target = "_blank";
            const options = 'scrollbars=yes,EnableViewPortScale=yes,toolbarposition=top,transitionstyle=fliphorizontal,menubar=yes,closebuttoncaption=  x  '
            window.open(url, target, options);
        }
    }

    settingsAccount = ()=>{
        const { settingsAccountClick } = this.props
        if(settingsAccountClick && _.isFunction(settingsAccountClick)){
            settingsAccountClick();
        }
    }

    logoutAccount = ()=>{
        const { logoutAccountClick } = this.props
        if(logoutAccountClick && _.isFunction(logoutAccountClick)){
            logoutAccountClick();
        }
    }


    render() {

        const { profile, avatarURL } = this.props

        return (
            <ProfileContainer>
                <GlobalHeaderProfile
                    popover={
                        <Popover
                            hasNoCloseButton={true}
                            body={
                                <MediaObject
                                    className="user-profile-content slds-var-p-around_medium"
                                    body={
                                        <div id={`profile-${profile.userId}`} className="slds-m-left_x-small">
                                            <span className="slds-listbox__option-text slds-listbox__option-text_entity slds-m-bottom_x-small">{profile.name}</span>
                                            <span className="slds-listbox__option-meta slds-text-body--small slds-listbox__option-meta_entity slds-m-bottom_x-small">{window.location.hostname}</span>
                                            <span>
                                                <a className="slds-p-right--medium" href="javacript:void(0);" onClick={()=>{this.settingsAccount()}}>账户设置</a>
                                                <a href="javacript:void(0);" onClick={()=>{this.logoutAccount()}}>注销</a>
                                            </span>
                                        </div>
                                    }
                                    figure={<Avatar
                                        imgSrc={avatarURL}
                                        imgAlt={profile.name}
                                        title={profile.name}
                                    />}
                                />
                            }
                            id="header-profile-popover-id"
                            heading={false}
                            footer={
                            <div className="profile-footer slds-var-p-around_medium"> 
                                    <div className="slds-media slds-media--center slds-p-left--none">
                                        <a className="footerAction slds-grow" href="javacript:void(0);" onClick={()=>{this.footerClick('https://www.steedos.com/help')}}>
                                            <div className="slds-media slds-media--center slds-p-bottom_x-small">
                                                <div className="slds-media__body slds-m-left--none">帮助文档</div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="slds-media slds-media--center slds-p-left--none">
                                        <a className="footerAction slds-grow" href="javacript:void(0);" onClick={()=>{this.footerClick('https://www.steedos.com/help/download')}}>
                                            <div className="slds-media slds-media--center slds-p-bottom_x-small">
                                                <div className="slds-media__body slds-m-left--none">下载客户端</div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="slds-media slds-media--center slds-p-left--none">

                                        <a className="footerAction slds-grow" href="javacript:void(0);" onClick={()=>{this.footerClick('https://www.steedos.com')}}>
                                            <div className="slds-media slds-media--center">
                                                <div className="slds-media__body slds-m-left--none">关于</div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            }
                        />
                    }
                    userName={profile.name}
                    avatar={<Avatar
                        imgSrc={avatarURL}
                        imgAlt={profile.name}
                        title={profile.name}
                    />}
                />
            </ProfileContainer>
        );
    }
}

export default profile