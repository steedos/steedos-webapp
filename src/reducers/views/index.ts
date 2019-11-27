import { combineReducers } from 'redux'
import { GRID_STATE_CHANGE_ACTION } from '../../actions/views/grid'
import { DXGRID_STATE_CHANGE_ACTION } from '../../actions/views/dx_grid'
import { TREE_STATE_CHANGE_ACTION } from '../../actions/views/tree'
import { ORGANIZATIONS_STATE_CHANGE_ACTION } from '../../actions/views/organizations'
import { NOTIFICATIONS_STATE_CHANGE_ACTION } from '../../actions/views/notifications'
import TreeReducer from './tree'
import DXGridReducer from './dx_grid'
import GridReducer from './grid'
import OrgReducer from './organizations'
import produce from "immer"
import NotificationsReducer from './notifications'


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
        case NOTIFICATIONS_STATE_CHANGE_ACTION:
            changeState(id, draft, NotificationsReducer(viewState, action))
            break;
    }
    return draft;
});

export default combineReducers({
    byId
});