import React from 'react';
import Bootstrap from '../components/bootstrap';
import { Provider  } from 'react-redux';
import store from '../stores/configureStore';
import Notifications from '../components/notifications';
import { registerPlugin  } from './plugin';

const HeaderNotifications = () => (
    <Provider store={store}>
        <Bootstrap>
            <Notifications interval={5 * 60} />
        </Bootstrap>
    </Provider>
)

class DefaultPlugin {
    initialize(registry, store) {
        registry.registerNotificationsComponent(
            'steedos-default-header',
            HeaderNotifications
        );
    }
}

export const registerDefaultPlugins = () => {
    registerPlugin('com.steedos.default', new DefaultPlugin());
}