
import { DXGRID_STATE_CHANGE_ACTION } from '../actions/views/dx_grid'
import { GRID_STATE_CHANGE_ACTION } from '../actions/views/grid'
import { TREE_STATE_CHANGE_ACTION } from '../actions/views/tree'
import { ORGANIZATIONS_STATE_CHANGE_ACTION } from '../actions/views/organizations'
import { BOOTSTRAP_STATE_CHANGE_ACTION } from '../actions/bootstrap'
import TreeReducer from './views/tree'
import DXGridReducer from './views/dx_grid'
import GridReducer from './views/grid'
import OrgReducer from './views/organizations'
import BootstrapReducer from './bootstrap'

function updateState(oldState: any, newState: any){
    return Object.assign({}, oldState, newState)
}

function reducer(state: any = {}, action: any){
    const objectName = action.payload ? action.payload.objectName : ''
    switch (action.type) {
        case DXGRID_STATE_CHANGE_ACTION:
            return updateState(state, {[objectName]: DXGridReducer(state[objectName], action)})
        case GRID_STATE_CHANGE_ACTION:
            return updateState(state, {[objectName]: GridReducer(state[objectName], action)})
        case TREE_STATE_CHANGE_ACTION:
            return updateState(state, {[objectName]: TreeReducer(state[objectName], action)})
        case ORGANIZATIONS_STATE_CHANGE_ACTION:
            return updateState(state, { [objectName]: OrgReducer(state[objectName], action) })
        case BOOTSTRAP_STATE_CHANGE_ACTION:
            return updateState(state, BootstrapReducer(state, action))
        default:
            break;
    }
    return state;
};

export default reducer;