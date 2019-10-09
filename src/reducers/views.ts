import { combineReducers } from 'redux'
import { DXGRID_STATE_CHANGE_ACTION } from '../actions/views/dx_grid'
import { GRID_STATE_CHANGE_ACTION } from '../actions/views/grid'
import { TREE_STATE_CHANGE_ACTION } from '../actions/views/tree'
import { ORGANIZATIONS_STATE_CHANGE_ACTION } from '../actions/views/organizations'
import TreeReducer from './views/tree'
import DXGridReducer from './views/dx_grid'
import GridReducer from './views/grid'
import OrgReducer from './views/organizations'
import produce from "immer"


function changeState(id, draft: any, newState: any) {
    return draft[id] = newState
}

function getState(state, id) {
    return state ? state[id] : { id: id }
}

const byId = produce((draft = {}, action) => {
    let id, viewState
    if (action.payload) {
        id = action.payload.id
        viewState = getState(draft, id)
    }
    switch (action.type) {
        case DXGRID_STATE_CHANGE_ACTION:
            changeState(id, draft, DXGridReducer(viewState, action))
            break;
        case GRID_STATE_CHANGE_ACTION:
            changeState(id, draft, GridReducer(viewState, action))
            break;
        case TREE_STATE_CHANGE_ACTION:
            changeState(id, draft, TreeReducer(viewState, action))
            break;
        case ORGANIZATIONS_STATE_CHANGE_ACTION:
            changeState(id, draft, OrgReducer(viewState, action))
            break;
    }
    return draft;
});

export default combineReducers({
    byId
});