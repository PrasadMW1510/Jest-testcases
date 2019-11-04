/**
 * Create the store with dynamic reducers
 */

import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import globalSaga from 'containers/App/saga';
import * as Actions from 'containers/App/actions';
import { getLocalSLMSId, getSSOSLMSId } from 'utils/cookieManager';
import createReducer from './reducers';

const logger = createLogger({
  collapsed: true,
});

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
  }

  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
          // Prevent recomputing reducers for `replaceReducer`
          shouldHotReload: false, // eslint-disable-line indent
        }) // eslint-disable-line indent
      : compose;
  /* eslint-enable */

  const store = createStore(createReducer(), fromJS(initialState), composeEnhancers(...enhancers));

  sagaMiddleware.run(globalSaga);

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  // Check if there is a SSO session id saved in a cookie
  let SLMS_SID = getSSOSLMSId();

  if (SLMS_SID) {
    store.dispatch(Actions.ssoLogin(SLMS_SID));
  } else {
    SLMS_SID = getLocalSLMSId();

    // Check if there is a non-SSO session id saved in a cookie
    if (SLMS_SID) {
      store.dispatch(Actions.localRelogin(SLMS_SID));
    }
  }

  return store;
}
