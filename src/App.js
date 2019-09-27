import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './stores/configureStore'
import SelectUsers from './components/select_users'
import DXGrid from './components/dx_grid'
import Grid from './components/grid'
import { IconSettings } from '@salesforce/design-system-react';

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

  const iconPath = "/assets/icons"
  return (

    < div className="App">
      <IconSettings iconPath={iconPath} >
        <Provider store={store}>
          {/* <DXGrid objectName='instances' columns={columns} getRowId={getRowId}/> */}
          <SelectUsers getRowId={getRowId} searchMode="omitFilters" rootNodes2={rootNodes} multiple={true} valueField2="user" selectionLabel2={selectionLabel} />
          {/* <Grid objectName='space_users' columns={columns} pageSize={100}></Grid> */}
        </Provider>
      </IconSettings>
    </div>
  );
}

export default App;