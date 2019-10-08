
import { DXGRID_STATE_CHANGE_ACTION } from '../actions/views/dx_grid'
import { GRID_STATE_CHANGE_ACTION } from '../actions/views/grid'
import { TREE_STATE_CHANGE_ACTION } from '../actions/views/tree'
import { ORGANIZATIONS_STATE_CHANGE_ACTION } from '../actions/views/organizations'
import TreeReducer from './views/tree'
import DXGridReducer from './views/dx_grid'
import GridReducer from './views/grid'
import OrgReducer from './views/organizations'
import { makeNewID } from '../components';


function updateState(oldState: any, newState: any){
    return Object.assign({}, oldState, newState)
}

function getState(state, id){
    return state.byId ? state.byId[id] : {id: id}
}

function reducer(state: any = {}, action: any){
    console.log('state', state, action)
    const id = action.id || makeNewID(action)
    const viewState = getState(state, id)
    switch (action.type) {
        case DXGRID_STATE_CHANGE_ACTION:
            return updateState(state, {[id]: DXGridReducer(viewState, action)})
        case GRID_STATE_CHANGE_ACTION:
            return updateState(state, {[id]: GridReducer(viewState, action)})
        case TREE_STATE_CHANGE_ACTION:
            return updateState(state, {[id]: TreeReducer(viewState, action)})
        case ORGANIZATIONS_STATE_CHANGE_ACTION:
            return updateState(state, { [id]: OrgReducer(viewState, action) })
        default:
            break;
    }
    return state;
};

export default reducer;