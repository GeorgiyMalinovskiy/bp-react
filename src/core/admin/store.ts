// in src/createAdminStore.js
import { routerMiddleware, connectRouter } from 'connected-react-router'
import { AuthProvider, USER_LOGOUT, adminReducer, adminSaga, createAdminStore } from 'react-admin'
import { applyMiddleware, combineReducers, compose, createStore as createReduxStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all, fork } from 'redux-saga/effects'

interface ExtendedWindow extends Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
}

const withDevTools = (window: Window | ExtendedWindow): window is ExtendedWindow =>
    !!window && '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__' in window

export const createStore: typeof createAdminStore = ({ authProvider, dataProvider, history }) => {
    const reducer = combineReducers({
        admin: adminReducer,
        router: connectRouter(history),
        // add your own reducers here
    })
    const resettableAppReducer = (...args: Parameters<typeof reducer>) => {
        const [state, action] = args
        return reducer(action.type !== USER_LOGOUT ? state : undefined, action)
    }
    const saga = function* rootSaga() {
        yield all(
            [
                adminSaga(dataProvider, authProvider as AuthProvider),
                // add your own sagas here
            ].map(fork)
        )
    }
    const sagaMiddleware = createSagaMiddleware()

    const composeEnhancers =
        (process.env.NODE_ENV === 'development' &&
            withDevTools(window) &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                trace: true,
                traceLimit: 25,
            })) ||
        compose

    const store = createReduxStore(
        resettableAppReducer,
        {
            /* set your initial state here */
        },
        composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
    )
    sagaMiddleware.run(saga)
    return store
}
