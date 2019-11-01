import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import PropTypes from 'prop-types';
import * as ReactDesignSystem from '@salesforce/design-system-react';
import * as ReactSteedos from '../components/index';
import store from "../stores/configureStore";
import { receivePluginInstance, receivePluginComponent } from '../actions';

/**
* Register a plugin to window
*/
export const registerPlugin = ( pluginName, pluginInstance ) => {
    // 保存到 store 中。
    // 调用 pluginInstance.initialize() 函数
    store.dispatch(receivePluginInstance(pluginName, pluginInstance))
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

function dispatchPluginComponentAction(name: string, component: any, id: string) {
    if(!id){
        id = generateId();
    }
    store.dispatch(receivePluginComponent(name, {
        id,
        component
    }))

    return id;
}

export function generateId() {
    // implementation taken from http://stackoverflow.com/a/2117523
    var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

    id = id.replace(/[xy]/g, (c) => {
        var r = Math.floor(Math.random() * 16);

        var v;
        if (c === 'x') {
            v = r;
        } else {
            v = (r & 0x3) | 0x8;
        }

        return v.toString(16);
    });

    return id;
}
export class PluginRegistry {

    /**
    * Register a component that show a dashboard
    */
    registerObjectHomeComponent = ( objectName, componentClass ) => {
        // 保存到 store 中。
        dispatchPluginComponentAction("ObjectHome", componentClass, objectName)
    }

}
