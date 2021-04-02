import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {Tasks} from './Tasks';
import {auth} from './auth';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            tasks:Tasks,
            auth:auth
        }),
        applyMiddleware(thunk,logger)
    );

    return store;
}