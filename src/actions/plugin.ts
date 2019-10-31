import { createAction } from './base';
export var PLUGIN_STATE_CHANGE_ACTION = 'PLUGIN_STATE_CHANGE_ACTION';

export function savePluginInstance(name: string, instance: any) {
    return createAction(PLUGIN_STATE_CHANGE_ACTION, 'savePluginInstance', { name, instance }, null)
}

export function savePluginObjectComponentNode(objectName: string, componentNode: any) {
    return createAction(PLUGIN_STATE_CHANGE_ACTION, 'savePluginObjectComponentNode', { objectName, componentNode}, null)
}
