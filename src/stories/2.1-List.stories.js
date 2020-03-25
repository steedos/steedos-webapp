import React from 'react';
import Bootstrap from '../components/bootstrap'
import { Provider  } from 'react-redux';
import store from '../stores/configureStore'

import List from '../components/list'

export default {
  title: 'List',
};


export const company1 = () => (
      <Provider store={store}>
        <Bootstrap>
          <List objectName={'company'} 
            columns={[
              {
                field: 'name',
                label: '公司名称'
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
            labelField="name"
            // topRightField="modified_by"
            bottomLeftField="name"
            bottomRightField="modified"
            unborderedRow={true}
            noHeader={true}
            sort="name, modified desc"
            rowIcon={{
              category:"standard",
              name:"account",
              size:"small"
            }}
            enableSearch={true}
            pageSize={5}>
          </List>
        </Bootstrap>
      </Provider>
)
