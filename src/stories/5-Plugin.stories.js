import React from 'react';
import Bootstrap from '../components/bootstrap';
import { Provider  } from 'react-redux';
import configureStore from '../stores/configureStore';
import { registerWindowLibraries, registerPlugin } from '../utils/plugin';
import WidgetApps from '../components/widget_apps';
import Dashboard from '../components/dashboard';
import { pluginComponentSelector } from '../selectors';

export default {
  title: 'Plugin',
};

registerWindowLibraries();

class TestPlugin1 {
  initialize(registry, store) {
    const widgetApps = () => (
      <Provider store={store}>
        <Bootstrap>
          <WidgetApps />
        </Bootstrap>
      </Provider>
    );
    registry.registerObjectHomeComponent("tasks", widgetApps);

    const config = {
      apps: {
        label: "应用程序启动器",
        position: "CENTER_TOP",
        type: "apps",
        showAllItems: false
      },
      apps_mobile: {
        label: '应用列表',
        position: 'RIGHT',
        type: 'apps',
        mobile: true
      }
    }
    const configedDashboard = () => (
      <Provider store={store}>
        <Bootstrap>
          <Dashboard config={config} />
        </Bootstrap>
      </Provider>
    )
    registry.registerObjectHomeComponent("home", configedDashboard);
  }

  uninitialize() {
    // No clean up required.
  }
}

registerPlugin('myplugin', new TestPlugin1());

export const widgetApps = pluginComponentSelector(configureStore.getState(), "ObjectHome" ,"tasks");
export const configedDashboard = pluginComponentSelector(configureStore.getState(), "ObjectHome", "home");