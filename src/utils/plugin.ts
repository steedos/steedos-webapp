import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import PropTypes from 'prop-types';
import * as ReactDesignSystem from '@salesforce/design-system-react';
import * as ReactSteedos from '../components/index';
import store from "../stores/configureStore";
import { savePluginInstance, savePluginObjectComponentNode } from '../actions';

/**
* Register a plugin to window
*/
export const registerPlugin = ( pluginName, pluginInstance ) => {
    // 保存到 store 中。
    // 调用 pluginInstance.initialize() 函数
    store.dispatch(savePluginInstance(pluginName, pluginInstance))
    const registry = new PluginRegistry();
    pluginInstance.initialize(registry, store);
}

export const registerWindowLibraries = () => {
    window["React"] = React;
    window["PropTypes"] = PropTypes;
    window["ReactDom"] = ReactDom;
    window["Redux"] = Redux;
    window["ReactRedux"] = ReactRedux;
    window["ReactDesignSystem"] = ReactDesignSystem;
    window["ReactSteedos"] = ReactSteedos;
    window["registerPlugin"] = registerPlugin;
}

export class PluginRegistry {

    /**
    * Register a component that show a dashboard
    */
    registerObjectHomeComponent = ( objectName, componentClass ) => {
        // 保存到 store 中。
        store.dispatch(savePluginObjectComponentNode(objectName, componentClass))
    }

}
