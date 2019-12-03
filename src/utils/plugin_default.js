import React from 'react';
import Bootstrap from '../components/bootstrap';
import { Provider  } from 'react-redux';
import store from '../stores/configureStore';
import Notifications from '../components/notifications';
import { registerPlugin  } from './plugin';

const HeaderNotifications = (props) => (
    <Provider store={store}>
        <Bootstrap>
            <Notifications id={props.id} />
        </Bootstrap>
    </Provider>
)

class DefaultPlugin {
    initialize(registry, store) {
        registry.registerNotificationsComponent(
            'steedos-default-header-notifications',
            HeaderNotifications
        );
    }
}

export const registerDefaultPlugins = () => {
    registerPlugin('com.steedos.default', new DefaultPlugin());
}