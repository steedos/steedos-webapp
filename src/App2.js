import React from 'react';
import './App.css';
import { Provider  } from 'react-redux';
import store from './stores/configureStore'
import Dashboard from './components/dashboard'
import Bootstrap from './components/bootstrap'
import { IconSettings, Card, DataTable, DataTableColumn } from '@salesforce/design-system-react';
import WidgetInstance from './components/widget_instance';
import WidgetAppLauncher from './components/widget_appLauncher';

const sampleItems = [
  { id: '1', name: 'Cloudhub' },
  { id: '2', name: 'Cloudhub + Anypoint Connectors' },
  { id: '3', name: 'Cloud City' },
];

const config = {
  apps:{
    label: "应用程序启动器",
    position: "CENTER_TOP",
    type: "apps",
  },
  instance: {
    label: "待办事项2",
    position: "CENTER_TOP",
    type: "instance",
  }
}

function App() {
  return (
    <div className="App">
      <IconSettings iconPath="/assets/icons" >
        <Provider store={store}>
          <Bootstrap>
            <Dashboard
              config={config}
              centerTopSection={(
                <div>
                  <WidgetInstance />
                  <Card
                    id="ExampleCard"
                    heading="今日事件"
                  >
                    <DataTable items={sampleItems} id="DataTableExample-1">
                      <DataTableColumn
                        label="Opportunity Name"
                        property="name"
                        truncate
                      />
                    </DataTable>
                  </Card>
                  <WidgetAppLauncher />
                </div>
              )}
              centerBottomLeftSection={(
                <Card
                  id="ExampleCard"
                  heading="左下1"
                >
                  <DataTable items={sampleItems} id="DataTableExample-1">
                    <DataTableColumn
                      label="Opportunity Name"
                      property="name"
                      truncate
                    />
                  </DataTable>
                </Card>
              )}
              centerBottomRightSection={(
                <Card
                  id="ExampleCard"
                  heading="左下2"
                >
                  <DataTable items={sampleItems} id="DataTableExample-1">
                    <DataTableColumn
                      label="Opportunity Name"
                      property="name"
                      truncate
                    />
                  </DataTable>
                </Card>
              )}
              rightSection={(
                <Card
                  id="ExampleCard"
                  heading="右侧Card"
                >
                  <DataTable items={sampleItems} id="DataTableExample-1">
                    <DataTableColumn
                      label="Opportunity Name"
                      property="name"
                      truncate
                    />
                  </DataTable>
                </Card>
              )}
            />
          </Bootstrap>
        </Provider>
      </IconSettings>
    </div>
  );
}

export default App;