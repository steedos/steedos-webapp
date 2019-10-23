import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { rootReducer } from '../reducers'
import { composeWithDevTools } from 'redux-devtools-extension';
const composeEnhancers = composeWithDevTools({ realtime: true});

let steedosService = process.env.REACT_APP_API_BASE_URL;
if(window.Meteor && window.Meteor.settings && window.Meteor.settings.public && window.Meteor.settings.public.webservices && window.Meteor.settings.public.webservices.steedos){
    steedosService = window.Meteor.settings.public.webservices.steedos.url
}
if (steedosService){
    // 去掉url中的最后一个斜杠
    steedosService = steedosService.replace(/\/$/, "");
}

const initialStore = {
    settings: {
        services: {
            steedos: steedosService
        }
    }
}

const store = createStore(
        rootReducer,
        Object.assign({}, initialStore),
        composeEnhancers(applyMiddleware(thunkMiddleware)),
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
