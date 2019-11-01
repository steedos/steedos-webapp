export function pluginInstanceSelector(state: any, name: string){
    let instances = state.plugins ? state.plugins.instances : {};
    return instances[name];
}

export function pluginObjectComponentSelector(state: any, objectName: string) {
    let components = state.plugins ? state.plugins.objectComponentNode : {};
    return components[objectName];
}