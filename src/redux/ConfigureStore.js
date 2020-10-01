import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {Tasks} from './Tasks';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            tasks:Tasks
        }),
        applyMiddleware(thunk,logger)
    );

    return store;
}