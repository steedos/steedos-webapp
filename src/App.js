import React from 'react';
import './App.css';
import { Provider  } from 'react-redux';
import store from './stores/configureStore'
import SelectUsers from './components/select_users'
import DXGrid from './components/dx_grid'
import Grid from './components/grid'

function App() {
  let appStore = store({settings: {services: {odata: 'http://127.0.0.1:5000'}}})
  let columns= [
    { name: '_id', title: '唯一标识' },
    { name: 'name', title: '名称' },
    // { name: 'applicant_name', title: '申请人' },
    { name: 'email', title: 'Email'}
  ];
  let getRowId = (row) => row._id

  let rootNodes = ["xZXy9x8o6qykf2ZAf"] // , "51aefb658e296a29c9000049"

  let selectionLabel = (item)=>{
    return `${item.name}(${item.email})`
  }

  let userListColumns = [
    { name: 'name', title: '姓名' },
    // { name: 'username', title: 'username' },
    // { name: 'email', title: 'email' },
    // { name: 'mobile', title: 'mobile' }
]
  
  return (
    <div className="App">
      <Provider store={appStore}>
        {/* <DXGrid objectName='instances' columns={columns} getRowId={getRowId}/> */}
        <SelectUsers getRowId={getRowId} rootNodes={rootNodes} valueField="user" selectionLabel2={selectionLabel} userListColumns={userListColumns}/>
        {/* <Grid objectName='space_users' columns={columns} pageSize={100}></Grid> */}
      </Provider>
    </div>
  );
}

export default App;