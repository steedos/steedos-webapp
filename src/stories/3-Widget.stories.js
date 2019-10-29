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
      <WidgetApps showAllItems={true} label="showAllItems模式的应用程序启动器" />
      <WidgetApps mobile={true} label="Mobile模式的应用程序启动器" />
    </Bootstrap>
  </Provider>
);

export const widgetPendingTasks = () => (
  <Provider store={store}>
    <Bootstrap>
      <WidgetObject label="待办任务" objectName="tasks" filters={() => {
        return [
          ['assignees', '=', '{userId}'],
          ['state', '<>', 'complete'],
          ['due_date', 'between', 'this_year']
        ]}}
        columns={[{
            label: "名称",
            field: 'name',
            href: true
          }, {
            label: "状态",
            field: 'state'
          }, {
            label: "分派给",
            field: 'assignees'
          }
        ]} 
        noHeader
        unborderedRow
      />
    </Bootstrap>
  </Provider>
);

export const widgetInstances = () => (
  <Provider store={store}>
    <Bootstrap>
      <WidgetObject label="待审批" objectName="instances" filters={[
          ['space', '=', '{spaceId}'],
          [
            ['inbox_users', '=', '{userId}'], 'or', ['cc_users', '=', '{userId}']
          ]
        ]}
        columns={[{
            label: "名称",
            field: "name",
            href: true
          }, {
            label: "提交人",
            field: "submitter_name",
            width: "10rem"
          }, {
            label: "修改时间",
            field: "modified",
            type: 'datetime',
            width: "14rem"
          }
        ]}
        hrefTarget="_blank"
      />
    </Bootstrap>
  </Provider>
);

export const widgetEmpty = () => (
  <Provider store={store}>
    <Bootstrap>
      <WidgetObject label="日历事件" objectName="events" filters={[
          ['state', '=', 'xx']
        ]}
        columns={[{
          label: "名称",
          field: 'name',
          href: true
        }]}
        illustration={{
          path: "/assets/images/illustrations/empty-state-no-results.svg#no-results",
          heading: "没有找到日历事件"
        }}
        showAllLink={true}
      />
    </Bootstrap>
  </Provider>
);
