import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

const initialStore = {
    settings: {
        services: {
            odata: process.env.REACT_APP_API_BASE_URL
        }
    }
}

const store = createStore(
        rootReducer,
        Object.assign({}, initialStore),
        applyMiddleware(thunkMiddleware)
    );

export function bindActionToRedux(action, ...args) {
    return async () => {
        await action(...args)(store.dispatch, store.getState);
    };
}

if (process.env.NODE_ENV !== 'production') { //eslint-disable-line no-process-env
    window.store = store;
}

export default store;
