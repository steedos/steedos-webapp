export function getSettingsState(state: any){
    return state.settings ? state.settings: undefined
}

export function getDataServices(state: any){
    return state.settings ? state.settings.services.steedos: undefined
}