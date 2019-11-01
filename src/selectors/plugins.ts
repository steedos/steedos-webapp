export function pluginInstanceSelector(state: any, name: string){
    let instances = state.plugins ? state.plugins.instances : {};
    return instances[name];
}

export function pluginComponentSelector(state: any, name: string, id: string) {
    let components = state.plugins ? state.plugins.components : {};
    return components[name] ? components[name][id] : null;
}