import React from 'react';
import Bootstrap from '../components/bootstrap'
import { Provider  } from 'react-redux';
import store from '../stores/configureStore'
import { Icon } from '@salesforce/design-system-react';
import PropTypes from 'prop-types';

import List from '../components/list'

export default {
  title: 'List',
};


export const base = () => (
      <Provider store={store}>
        <Bootstrap>
          <List objectName={'instances'} 
            columns={[
              {
                field: 'name',
                label: '名称'
              },
              {
                field: 'applicant_name',
                label: '申请人',
                type: 'text',
                width: "14rem"
              },
              {
                field: 'flow_name',
                label: '流程名称',
                type: 'text',
                width: "14rem"
              },
              {
                field: 'modified',
                label: '修改时间',
                type: 'datetime',
                width: "14rem"
              },
            ]} 
            sort="name, modified desc"
            pageSize={5}>
          </List>
        </Bootstrap>
      </Provider>
)

export const rowIcon = () => (
  <Provider store={store}>
    <Bootstrap>
      <List objectName={'space_users'} 
        columns={[
          {
            field: 'name',
            label: '名称'
          },
          {
            field: 'email',
            label: '邮件',
            type: 'text',
            width: "14rem"
          },
          {
            field: 'modified_by',
            label: '修改人',
            type: 'lookup',
            width: "14rem"
          },
          {
            field: 'modified',
            label: '修改时间',
            type: 'datetime',
            width: "14rem"
          },
        ]} 
        sort="name, modified desc"
        rowIcon={{
          category:"standard",
          name:"account"
        }}
        pageSize={5}>
      </List>
    </Bootstrap>
  </Provider>
)

const CustomListItemExample = (props) => (
	<div>
		<Icon
			category="action"
			name={props.item.content.status === 'Contacted' ? 'check' : 'call'}
			size="x-small"
		/>
		<span className="slds-text-heading_small slds-m-left_medium">
			{props.item.content.name}
		</span>
	</div>
);

CustomListItemExample.propsTypes = {
	item: PropTypes.shape({
		content: PropTypes.object
	}),
};

CustomListItemExample.displayName = 'CustomListItemExample';

export const CustomListItem = () => (
  <Provider store={store}>
    <Bootstrap>
      <List objectName={'tasks'} 
        columns={[
          {
            field: 'name',
            label: '名称'
          }
        ]} 
        sort="name"
        listItem={CustomListItemExample}
        pageSize={5}>
      </List>
    </Bootstrap>
  </Provider>
)

export const CustomListItemHref = () => (
  <Provider store={store}>
    <Bootstrap>
      <List objectName={'space_users'} 
        columns={[
          {
            field: 'name',
            label: '名称'
          },
          {
            field: 'email',
            label: '邮件',
            type: 'text',
            width: "14rem"
          },
          {
            field: 'modified_by',
            label: '修改人',
            type: 'lookup',
            width: "14rem"
          },
          {
            field: 'modified',
            label: '修改时间',
            type: 'datetime',
            width: "14rem"
          },
        ]} 
        sort="name"
        listItemHref={(item) => {
          return `xxx/app/-/tasks/view/${item.content._id}`;
        }}
        pageSize={5}>
      </List>
    </Bootstrap>
  </Provider>
)


export const InfiniteScrollList = () => (
  <Provider store={store}>
    <Bootstrap>
      <List objectName={'space_users'} 
        columns={[
          {
            field: 'name',
            label: '名称'
          },
          {
            field: 'email',
            label: '邮件',
            type: 'text',
            width: "14rem"
          },
          {
            field: 'username',
            label: '修改人',
            type: 'text',
            width: "14rem"
          },
          {
            field: 'modified',
            label: '修改时间',
            type: 'datetime',
            width: "14rem"
          },
        ]} 
        sort="name"
        pager={true}
        pageSize={5}>
      </List>
    </Bootstrap>
  </Provider>
)

