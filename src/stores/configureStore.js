import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'
import { loadBootstrapDataRequest } from '../actions/bootstrap_request';
import { composeWithDevTools } from 'redux-devtools-extension';
const composeEnhancers = composeWithDevTools({ realtime: true});
const initialStore = {
    settings: {
        services: {
            steedos: process.env.REACT_APP_API_BASE_URL
        }
    },
    // views: {
    //     grid: {
    //         [gid]: {

    //         },
    //         [gid]: {

    //         }
    //     },
    //     tree: {

    //     },
    // }
}

const store = createStore(
        rootReducer,
        Object.assign({}, initialStore),
        composeEnhancers(applyMiddleware(thunkMiddleware)),
    );

store.dispatch(function (dispatch) {
    return loadBootstrapDataRequest(dispatch, 'BOOTSTRAP_STATE_CHANGE', process.env.REACT_APP_API_BASE_URL);
});

export function bindActionToRedux(action, ...args) {
    return async () => {
        await action(...args)(store.dispatch, store.getState);
    };
}

if (process.env.NODE_ENV !== 'production') { //eslint-disable-line no-process-env
    window.store = store;
}

export default store;
