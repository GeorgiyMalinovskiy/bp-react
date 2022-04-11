import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers, compose, createStore as createReduxStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

import { withDevTools } from '../utils';

const USER_LOGOUT = 'USER_LOGOUT';

export const defaultHistory = createBrowserHistory();

export const createStore = (): ReturnType<typeof createReduxStore> => {
    const reducer = combineReducers({
        a: connectRouter(defaultHistory),
        // add your own reducers here
    });
    const resettableAppReducer = (...args: Parameters<typeof reducer>) => {
        const [state, action] = args;
        return reducer(action.type !== USER_LOGOUT ? state : undefined, action);
    };
    const saga = function* rootSaga() {
        yield all(
            [
                // add your own sagas here
            ].map(fork)
        );
    };
    const sagaMiddleware = createSagaMiddleware();

    const composeEnhancers =
        (process.env.NODE_ENV === 'development' &&
            withDevTools(window) &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                trace: true,
                traceLimit: 25,
            })) ||
        compose;

    const store = createReduxStore(
        resettableAppReducer,
        {
            /* set your initial state here */
        },
        composeEnhancers(applyMiddleware(sagaMiddleware))
    );
    sagaMiddleware.run(saga);
    return store;
};
