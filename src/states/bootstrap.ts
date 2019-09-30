function getBootstrapState(state: any){
    return state.bootstrap ? state.bootstrap: undefined
}

function getVisibleApps(state: any){
    return state.bootstrap ? state.bootstrap.apps: undefined
}

export default {
    getBootstrapState,
    getVisibleApps
}