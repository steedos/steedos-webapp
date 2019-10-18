import React from 'react';
import styled from 'styled-components'
import { action } from '@storybook/addon-actions';
import Dashboard from '../components/dashboard'
import Bootstrap from '../components/bootstrap'
import { Provider  } from 'react-redux';
import store from '../stores/configureStore'

export default {
  title: 'Dashboard'
};

let CenterDiv = styled.div`
  text-align: center;
  height: 230px;
  background: #fff;
  border: solid 1px #eee;
`;

export const sections = () => (
  <div className="App">
      <Provider store={store}>
        <Bootstrap>
          <Dashboard
            centerTopSection={(
              <CenterDiv>
                Center Top Section
              </CenterDiv>
            )}
            centerBottomLeftSection={(
              <CenterDiv>
                Center Bottom Left Section
              </CenterDiv>
            )}
            centerBottomRightSection={(
              <CenterDiv>
                Center Bottom Right Section
              </CenterDiv>
            )}
            rightSection={(
              <CenterDiv>
                Right Section
              </CenterDiv>
            )}
          />
        </Bootstrap>
      </Provider>
  </div>
);

const config1 = {
  sectionCT1: {
    label: "Center Top Section 1",
    position: "CENTER_TOP",
    type: "react",
    component: function (options) {
      return <CenterDiv>{options.label}</CenterDiv>
    }
  },
  sectionCT2: {
    label: "Center Top Section 2",
    position: "CENTER_TOP",
    type: "react",
    component: function (options) {
      return <CenterDiv>{options.label}</CenterDiv>
    }
  },
  sectionCBL: {
    label: "Bottom Left Section",
    position: "CENTER_BOTTOM_LEFT",
    type: "react",
    component: function (options) {
      return <CenterDiv>{options.label}</CenterDiv>
    }
  },
  sectionCBR: {
    label: "Bottom Left Section",
    position: "CENTER_BOTTOM_RIGHT",
    type: "react",
    component: function (options) {
      return <CenterDiv>{options.label}</CenterDiv>
    }
  },
  sectionR1: {
    label: "Right Section 1",
    position: "RIGHT",
    type: "react",
    component: function (options) {
      return <CenterDiv>{options.label}</CenterDiv>
    }
  },
  sectionR2: {
    label: "Right Section 2",
    position: "RIGHT",
    type: "react",
    component: function (options) {
      return <CenterDiv>{options.label}</CenterDiv>
    }
  }
}

export const configPosition = () => (
  <div className="App">
    <Provider store={store}>
      <Bootstrap>
        <Dashboard config={config1}/>
      </Bootstrap>
    </Provider>
  </div>
)

const config2 = {
  workflow: {
    label: "待审批",
    position: "CENTER_TOP",
    type: "object",
    object_name: "instances",
    filters: [
      ['space', '=', '{spaceId}'],
      [
        ['inbox_users', '=', '{userId}'], 'or', ['cc_users', '=', '{userId}']
      ]
    ],
    columns: [{
      label: "名称",
      field: "name",
      href: true
    }, {
      label: "修改时间",
      field: "modified",
      type: 'datetime'
    }]
  },
  pending_tasks: {
    label: '待办任务',
    position: 'CENTER_TOP',
    type: 'object',
    object_name: 'tasks',
    filters: [
      ['assignees', '=', '{userId}'],
      ['state', '<>', 'complete'],
      ['due_date', 'between', 'this_year']
    ],
    columns: [{
      label: "名称",
      field: 'name',
      href: true
    }, {
      label: "优先级",
      field: 'priority'
    }]
  }
}

export const configTypeObject = () => (
  <div className="App">
    <Provider store={store}>
      <Bootstrap>
        <Dashboard config={config2} />
      </Bootstrap>
    </Provider>
  </div>
)

const config3 = {
  apps: {
    label: "应用程序启动器",
    position: "CENTER_TOP",
    type: "apps"
  },
}

export const configTypeApps = () => (
  <div className="App">
    <Provider store={store}>
      <Bootstrap>
        <Dashboard config={config3} />
      </Bootstrap>
    </Provider>
  </div>
)