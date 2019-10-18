import React from 'react';
import styled from 'styled-components'
import { action } from '@storybook/addon-actions';
import Dashboard from '../components/dashboard'
import Bootstrap from '../components/bootstrap'
import { IconSettings } from '@salesforce/design-system-react';
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
    <IconSettings iconPath="/assets/icons" >
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
    </IconSettings>
  </div>
)