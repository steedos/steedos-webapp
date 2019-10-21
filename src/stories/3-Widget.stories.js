import React from 'react';
import Bootstrap from '../components/bootstrap';
import { Provider  } from 'react-redux';
import store from '../stores/configureStore';
import WidgetApps from '../components/widget_apps';
import WidgetObject from '../components/widget_object';

export default {
  title: 'Widgets',
};

export const widgetApps = () => (
  <Provider store={store}>
    <Bootstrap>
      <WidgetApps />
    </Bootstrap>
  </Provider>
);

export const widgetPendingTasks = () => (
  <Provider store={store}>
    <Bootstrap>
      <WidgetObject label="待办任务" object_name="tasks" filters={[
        ['assignees', '=', '{userId}'],
        ['state', '<>', 'complete'],
        ['due_date', 'between', 'this_year']
      ]} columns={[{
        label: "名称",
        field: 'name',
        href: true
      }, {
        label: "优先级",
        field: 'priority'
      }]} />
    </Bootstrap>
  </Provider>
);

export const widgetInstances = () => (
  <Provider store={store}>
    <Bootstrap>
      <WidgetObject label="待审批" object_name="instances" filters={[
        ['space', '=', '{spaceId}'],
        [
          ['inbox_users', '=', '{userId}'], 'or', ['cc_users', '=', '{userId}']
        ]
      ]} columns={[{
        label: "名称",
        field: "name",
        href: true
      }, {
        label: "修改时间",
        field: "modified",
        type: 'datetime'
      }]} />
    </Bootstrap>
  </Provider>
);

