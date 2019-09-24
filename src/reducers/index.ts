import { combineReducers } from 'redux'
import { GRID_STATE_CHANGE_ACTION } from '../actions/views/grid'
import entitiesReducer from './entities'
import settingsReducer from './settings'
import {TREE_STATE_CHANGE_ACTION} from '../actions/views/tree'
import selectUsrsReducer from './views/select_users'

const combinedReducer = combineReducers({
    entities: entitiesReducer,
    settings: settingsReducer
})

function updateState(oldState: any, newState: any){
    return Object.assign({}, oldState, newState)
}

function crossSliceReducer(state: any, action: any) {
    console.log('crossSliceReducer state', state, action)
    if (action.type === TREE_STATE_CHANGE_ACTION) {
        switch (action.partialStateName) {
            default:
                return state
        }
    // }else if(action.type === GRID_STATE_CHANGE_ACTION){
    //     return updateState(state, {entities: {...state.entities, [action.objectName]: selectUsrsReducer(state.entities[action.objectName], action)}})
    }
    else{
        return state;
    }
}

function rootReducer(state: any, action: any) {
    const intermediateState = combinedReducer(state, action)
    const finalState = crossSliceReducer(intermediateState, action)
    return finalState
}

export default rootReducer