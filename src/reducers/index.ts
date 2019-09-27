import { combineReducers } from 'redux'
import entitiesReducer from './entities'
import settingsReducer from './settings'
import {TREE_STATE_CHANGE_ACTION} from '../actions/views/tree'

const combinedReducer = combineReducers({
    entities: entitiesReducer,
    settings: settingsReducer
})

// function updateState(oldState: any, newState: any){
//     return Object.assign({}, oldState, newState)
// }

function crossSliceReducer(state: any, action: any) {
    console.log('crossSliceReducer state', state, action)
    if (action.type === TREE_STATE_CHANGE_ACTION) {
        switch (action.partialStateName) {
            default:
                return state
        }
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