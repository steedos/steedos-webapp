import React from 'react';
import styled from 'styled-components'
import { Provider  } from 'react-redux';
import store from '../stores/configureStore';
import Bootstrap from '../components/bootstrap'
import { FlowsModal } from '../components';
import { createFlowsModalAction } from '../actions'
import _ from 'underscore'

export default {
    title: 'FlowsModal',
};

const modalId = 'flowsModal';

export const MyFlowsModal = () => {

    var toggleOpen = () => {
        store.dispatch(createFlowsModalAction('isOpen', true, {id: modalId}))
    };

    var onConfirm = ()=>{
        let selection = store.getState().views.byId.flowsList.selection;
        document.getElementById("flowIds").value = _.pluck(selection, '_id')
    }

    return (
        <Provider store={store}>
            <Bootstrap>
                <input id="flowIds" type="text" style={{height: 35, width: 350}}/><br/>
                <button onClick={toggleOpen}>显示FlowsModal</button>
                <FlowsModal id={modalId} appElement="body" onConfirm={onConfirm} gridId="flowsList" multiple={false}/>
            </Bootstrap>
        </Provider>
    )
};