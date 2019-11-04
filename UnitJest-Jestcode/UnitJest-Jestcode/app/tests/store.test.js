/**
 * Test store addons
 */

import { browserHistory } from 'react-router-dom';
import * as redux from 'redux';
import { getLocalSLMSId, getSSOSLMSId } from 'utils/cookieManager';
import * as Actions from 'containers/App/actions';
import configureStore from '../configureStore';

// mock out the cookieManager module and define implementation later
jest.mock('utils/cookieManager', () => ({
  getLocalSLMSId: jest.fn(),
  getSSOSLMSId: jest.fn(),
  getSSOReferrer: jest.fn(),
  deleteLocalSLMSId: jest.fn(),
}));

describe('configureStore', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  describe('injectedReducers', () => {
    it('should contain an object for reducers', () => {
      expect(typeof store.injectedReducers).toBe('object');
    });
  });

  describe('injectedSagas', () => {
    it('should contain an object for sagas', () => {
      expect(typeof store.injectedSagas).toBe('object');
    });
  });

  describe('runSaga', () => {
    it('should contain a hook for `sagaMiddleware.run`', () => {
      expect(typeof store.runSaga).toBe('function');
    });
  });
});

describe('configureStore params', () => {
  it('should call window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__', () => {
    /* eslint-disable no-underscore-dangle */
    const compose = jest.fn();
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = () => compose;
    configureStore(undefined, browserHistory);
    expect(compose).toHaveBeenCalled();
    /* eslint-enable */
  });
});

describe('redux logger', () => {
  let originalEnv;
  beforeAll(() => {
    originalEnv = process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
  });

  it('should add redux logger to the middlewares', () => {
    process.env.NODE_ENV = 'development';
    const createStoreSpy = jest.fn();
    redux.applyMiddleware = createStoreSpy;
    configureStore({}, browserHistory);
    expect(redux.applyMiddleware.mock.calls[0]).toHaveLength(3);
  });

  it('should not add redux logger to the middlewares in production', () => {
    process.env.NODE_ENV = 'production';
    const createStoreSpy = jest.fn();
    redux.applyMiddleware = createStoreSpy;
    configureStore({}, browserHistory);
    expect(redux.applyMiddleware.mock.calls[0]).toHaveLength(2);
  });
});

describe('SLMS id loading', () => {
  const SLMS_ID = 'adsfadsfas123';
  let mockStore = null;
  beforeEach(() => {
    getSSOSLMSId.mockReset();
    getLocalSLMSId.mockReset();

    // we don't want store actions to actually run in the test
    mockStore = {
      replaceReducer: jest.fn(),
      dispatch: jest.fn(),
    };
    jest.spyOn(redux, 'createStore').mockReturnValue(mockStore);
  });

  it('should not do anything if there is no SSO cookie', () => {
    configureStore(undefined, browserHistory);

    expect(getSSOSLMSId).toHaveBeenCalled();
    expect(getLocalSLMSId).toHaveBeenCalled();

    expect(mockStore.dispatch).not.toHaveBeenCalled();
  });

  it('should login if there is a SSO cookie', () => {
    getSSOSLMSId.mockReturnValue(SLMS_ID);
    configureStore(undefined, browserHistory);

    expect(getSSOSLMSId).toHaveBeenCalled();
    expect(getLocalSLMSId).not.toHaveBeenCalled();

    expect(mockStore.dispatch).toHaveBeenCalledWith(Actions.ssoLogin(SLMS_ID));
  });

  it('should login if there is a local cookie', () => {
    getLocalSLMSId.mockReturnValue(SLMS_ID);
    configureStore(undefined, browserHistory);

    expect(getSSOSLMSId).toHaveBeenCalled();
    expect(getLocalSLMSId).toHaveBeenCalled();

    expect(mockStore.dispatch).toHaveBeenCalledWith(Actions.localRelogin(SLMS_ID));
  });
});
