import React from 'react';
import Bootstrap from '../components/bootstrap';
import { Provider  } from 'react-redux';
import store from '../stores/configureStore';
import { registerWindowLibraries, registerPlugin } from '../utils/plugin';
import WidgetApps from '../components/widget_apps';

export default {
  title: 'Plugin',
};

registerWindowLibraries();

const widgetApps = () => (
  <Provider store={store}>
    <Bootstrap>
      <WidgetApps />
    </Bootstrap>
  </Provider>
);


class TestPlugin {
  initialize(registry, store) {
    registry.registerObjectHomeComponent("tasks", widgetApps);
  }

  uninitialize() {
    // No clean up required.
  }
}

registerPlugin('myplugin', new TestPlugin());

export const widgetAppsNode = store.getState().plugins.objectComponentNode.tasks