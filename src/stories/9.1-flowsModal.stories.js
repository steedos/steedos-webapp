import React from 'react';
import styled from 'styled-components'
import { Provider  } from 'react-redux';
import store from '../stores/configureStore';
import Bootstrap from '../components/bootstrap'
import { FlowsModal } from '../components';

export default {
    title: 'FlowsModal',
};

export const MyFlowsModal = () => (
    <Provider store={store}>
        <Bootstrap>
            <FlowsModal />
        </Bootstrap>
    </Provider>
);