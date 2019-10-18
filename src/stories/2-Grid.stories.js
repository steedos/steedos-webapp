import React from 'react';
import { action } from '@storybook/addon-actions';
import Bootstrap from '../components/bootstrap'
import { IconSettings } from '@salesforce/design-system-react';
import { Provider  } from 'react-redux';
import store from '../stores/configureStore'
import settings from '../states/settings'

import Grid from '../components/grid'

export default {
  title: 'Grid',
};


export const company = () => (
      <Provider store={store}>
        <Bootstrap>
            <Grid objectName={'company'} 
              columns={[
                {
                  field: 'name',
                  label: '公司名称'
                },
                {
                  field: 'modified_by',
                  label: '修改人',
                  type: 'lookup'
                },
                {
                  field: 'modified',
                  label: '修改时间',
                  type: 'datetime'
                },
              ]} 
              enableSearch={true}></Grid>
        </Bootstrap>
      </Provider>
)


export const space_users = () => (
  <IconSettings iconPath="/assets/icons" >
    <Provider store={store}>
      <Bootstrap>
          <Grid objectName={'space_users'} 
            columns={[
              {
                field: 'name',
                label: '公司名称'
              },
              {
                field: 'username',
                label: '用户名',
                type: 'lookup'
              },
              {
                field: 'organization',
                label: '部门',
                type: 'lookup'
              },
            ]} 
            enableSearch={true}></Grid>
      </Bootstrap>
    </Provider>
  </IconSettings>
)