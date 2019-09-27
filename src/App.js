import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './stores/configureStore'
import SelectUsers from './components/select_users'
import DXGrid from './components/dx_grid'
import Grid from './components/grid'
import { IconSettings } from '@salesforce/design-system-react';
import settings from './states/settings'

function App() {
  let columns = [
    { name: '_id', title: '唯一标识' },
    { name: 'name', title: '名称' },
    // { name: 'applicant_name', title: '申请人' },
    { name: 'email', title: 'Email' }
  ];
  let getRowId = (row) => row._id

  let rootNodes = ["xZXy9x8o6qykf2ZAf"] // , "51aefb658e296a29c9000049"

  let selectionLabel = (item) => {
    return `${item.name}(${item.email})`
  }

  let service = settings.getDataServices(store.getState());
  let iconPath = `/assets/icons`;

  let company = {
    name: 'company',
    label: '单位',
    fields: {
      name: {
        label: '公司名称',
        cellOnClick: function(){
          console.log(111);
        }
      },
      code: {
        label: '公司名称'
      },
      modified: {
        label: '修改时间',
        type: 'datetime'
      }
    }
  }

  return (

    < div className="App">
      <IconSettings iconPath={iconPath} >
        <Provider store={store}>
          <SelectUsers getRowId={getRowId} searchMode="omitFilters" rootNodes2={rootNodes} multiple={true} valueField2="user" selectionLabel2={selectionLabel} />
          {/* <Grid object={company} ></Grid> */}
        </Provider>
      </IconSettings>
    </div>
  );
}

export default App;