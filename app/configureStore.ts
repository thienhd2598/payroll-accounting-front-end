/**
 * Create the store with dynamic reducers
 */

import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createInjectorsEnhancer, forceReducerReload } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';
import { History } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import localForage from 'localforage';
import { createLogger } from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import createReducer from './reducers';
import { InjectedStore, ApplicationRootState } from 'types';
import { inited } from 'redux/actions';

export default function configureStore(
  initialState: ApplicationRootState | {} = {},
  history: History,
) {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;

  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const loggerMiddleware = createLogger({
    predicate: (getState, action) => process.env.NODE_ENV !== 'production'
});

  const enhancers = [
    applyMiddleware(...middlewares, loggerMiddleware),
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
    // autoRehydrate()
  ];

  let enhancer;
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    enhancer = composeWithDevTools(...enhancers as any);
  } else {
    enhancer = compose(...enhancers);
  }

  const store = createStore(
    createReducer(),
    initialState,
    enhancer,
  ) as InjectedStore;

  persistStore(
    store,
    {
      storage: localForage,
      whitelist: ['config']
    }, (a, b) => {
      console.log(`Redux-Persist loaded state...`);
      store.dispatch(inited());
    }
  );

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      forceReducerReload(store);
    });
  }

  return store;
}
