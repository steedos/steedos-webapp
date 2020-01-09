import React from 'react';
import styled from 'styled-components'
import { action } from '@storybook/addon-actions';
import Dashboard from '../components/dashboard'
import Bootstrap from '../components/bootstrap'
import { Provider  } from 'react-redux';
import store from '../stores/configureStore'
import { getAbsoluteUrl } from '../utils';

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
  sectionCBL1: {
    label: "Bottom Left Section 1",
    position: "CENTER_BOTTOM_LEFT",
    type: "react",
    component: function (options) {
      return <CenterDiv>{options.label}</CenterDiv>
    }
  },
  sectionCBL2: {
    label: "Bottom Left Section 2",
    position: "CENTER_BOTTOM_LEFT",
    type: "react",
    component: function (options) {
      return <CenterDiv>{options.label}</CenterDiv>
    }
  },
  sectionCBL3: {
    label: "Bottom Left Section 3",
    position: "CENTER_BOTTOM_LEFT",
    type: "react",
    component: function (options) {
      return <CenterDiv>{options.label}</CenterDiv>
    }
  },
  sectionCBR1: {
    label: "Bottom Right Section 1",
    position: "CENTER_BOTTOM_RIGHT",
    type: "react",
    component: function (options) {
      return <CenterDiv>{options.label}</CenterDiv>
    }
  },
  sectionCBR2: {
    label: "Bottom Right Section 2",
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
    objectName: "instances",
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
        label: "提交人",
        field: "submitter_name",
        width: "16rem"
      }, {
        label: "修改时间",
        field: "modified",
        type: 'datetime',
        width: "14rem"
    }],
    showAllLink: true,
    hrefTarget: "_blank",
    unborderedRow: true,
    sort: "modified desc, name",
    rowIcon: {
      category:"standard",
      name:"account",
      size:"small"
    }
  },
  pending_tasks: {
    label: '待办任务1',
    position: 'CENTER_BOTTOM_LEFT',
    type: 'object',
    objectName: 'tasks',
    filters: ()=>{
      return [
        ['due_date', '<=', '{now}']
      ]
    },
    columns: [{
      label: "名称",
      field: 'name',
      href: true,
      format: (children, data, options) => {
        let objectName = options.objectName;
        let url =getAbsoluteUrl(`/app/-/${objectName}/view/${data.id}`);

        return (
          <a target="_blank" href={url} title={children}>
            {children}
          </a>
        )
      }
    }, {
      label: "状态",
      field: 'state',
      width: "10rem"
    }, {
      label: "截止时间",
      field: 'due_date',
      width: "10rem",
      type: "datetime"
    }],
    sort: [["due_date", "desc"], ["state"]],
    noHeader: true,
    footer: (options) => {
      let objectName = options.objectName;
      return (
        <a href={`/app/-/${objectName}`} target="_blank">
          查看全部任务
        </a>
      )
    }
  },
  bottomLeftTask: {
    label: '待办任务2',
    position: 'CENTER_BOTTOM_RIGHT',
    type: 'object',
    objectName: 'tasks',
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
    }],
    noHeader: true,
    unborderedRow: true
  },
  bottomLeftTask3: {
    label: '待办任务3',
    position: 'CENTER_BOTTOM_LEFT',
    type: 'object',
    objectName: 'tasks',
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
    }],
    noHeader: true,
    unborderedRow: true
  },
  bottomLeftTask4: {
    label: '待办任务 all',
    position: 'CENTER_BOTTOM_RIGHT',
    type: 'object',
    objectName: 'tasks',
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
    }],
    noHeader: true,
    unborderedRow: true,
    maxRows:"all"
  },
  bottomRightApps: {
    label: '应用',
    position: 'RIGHT',
    type: 'apps',
    mobile: true
  },
  bottomLeftTask5: {
    label: '待办任务5',
    position: 'RIGHT',
    type: 'object',
    objectName: 'tasks',
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
    }],
    noHeader: true,
    unborderedRow: true
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
    label: "应用程序启动器(前3个应用preventDefault不会跳转)",
    position: "CENTER_TOP",
    type: "apps",
    showAllItems: false,
    onTileClick: (event, app, tile, index)=>{
      if(index < 3){
        event.preventDefault();
      }
      alert(`触发了onTileClick事件，点击的APP是:${app.name}，且前3个应用preventDefault了，不会跳转`);
    }
  },
  apps_mobile: {
    label: '应用列表(忽略了设置)',
    position: 'RIGHT',
    type: 'apps',
    mobile: true,
    ignoreApps: ['admin']
  }
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

const config4 = {
  testReact1: {
    label: "Test React Component Simple",
    position: "CENTER_TOP",
    type: "react",
    component: function (options) {
      let CenterDiv2 = styled.div`
        text-align: center;
        height: 230px;
        background: #fff;
        border: solid 1px #eee;
        border-radius: 4px;
        margin-bottom: 12px;
      `;
      return <CenterDiv2 className="testReact1">{options.label}</CenterDiv2>;
    }
  },
  testReact2: {
    label: "Test React Component require",
    position: "CENTER_TOP",
    type: "react",
    component: function (options) {
      const Card = require('@salesforce/design-system-react').Card;
      const AppLauncherExpandableSection = require('@salesforce/design-system-react').AppLauncherExpandableSection;
      const AppLauncherTile = require('@salesforce/design-system-react').AppLauncherTile;
      const styled = require('styled-components').default;
      let AppLauncherDesktopInternal = styled.div`
          padding: 0px 1rem;
          .slds-section.slds-is-open{
              .slds-section__content{
                  padding-top: 0px;
              }
          }
      `;
      return (
        <Card
          heading={options.label}
        >
          <AppLauncherDesktopInternal className="slds-app-launcher__content">
            <AppLauncherExpandableSection title="Tile Section">
              <AppLauncherTile
                description="The primary internal Salesforce org. Used to run our online sales business and manage accounts."
                iconText="SC"
                title="Sales Cloud"
                href="/a"
              />
              <AppLauncherTile
                description="Salesforce Marketing Cloud lets businesses of any size engage with their customers through multiple channels of messaging."
                iconBackgroundColor="#e0cf76"
                iconText="MC"
                title="Marketing Cloud"
                href="/b"
              />
            </AppLauncherExpandableSection>
          </AppLauncherDesktopInternal>
        </Card>
      );
    }
  },
  testReact3: {
    label: "Test React Component Styled",
    position: "RIGHT",
    type: "react",
    component: function (options) {
      const Card = require('@salesforce/design-system-react').Card;
      const DataTable = require('@salesforce/design-system-react').DataTable;
      const DataTableColumn = require('@salesforce/design-system-react').DataTableColumn;
      const styled = require('styled-components').default;
      let CustomStyledComponent = styled.div`
        color: green;
        .slds-card{
          background: #eee;
        }
      `;
      const sampleItems = [
        { id: '1', name: 'Cloudhub' },
        { id: '2', name: 'Cloudhub + Anypoint Connectors' },
        { id: '3', name: 'Cloud City' },
      ];
      return (
        <CustomStyledComponent className="styled-component">
          <Card
            heading={options.label}
          >
            <DataTable items={sampleItems}>
              <DataTableColumn
                label="Opportunity Name"
                property="name"
                truncate
              />
            </DataTable>
          </Card>
        </CustomStyledComponent>
      );
    }
  },
  testReact4: {
    label: "Test React ComponentUrl",
    position: "CENTER_TOP",
    type: "react",
    component: "/dashboard_type_react_url.js"
  }
}

export const configTypeReact = () => (
  <div className="App">
    <Provider store={store}>
      <Bootstrap>
        <Dashboard config={config4} />
      </Bootstrap>
    </Provider>
  </div>
)