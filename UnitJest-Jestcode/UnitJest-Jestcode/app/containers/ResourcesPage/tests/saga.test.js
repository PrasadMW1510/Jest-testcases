/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import * as SelectorsResourcesPage from 'containers/ResourcesPage/selectors';
import defaultSaga, * as Saga from '../saga';
import * as Selectors from '../../App/selectors';
import * as Actions from '../actions';
import * as Request from '../request';
import * as Constants from '../constants';

describe('ResourceProgramContainer Saga', () => {
  let generator = null;
  let loginSelector = null;
  let mockEpochTime = null;
  let mockSAMBuildVersion = null;

  beforeEach(() => {
    mockSAMBuildVersion = jest.fn();
    loginSelector = jest.fn();
    mockEpochTime = 1516120801689;
    jest.spyOn(Date.prototype, 'getTime').mockReturnValue(mockEpochTime);
    jest.spyOn(Selectors, 'makeSelectLoginData').mockReturnValue(loginSelector);
    jest
      .spyOn(SelectorsResourcesPage, 'makeSelectSAMBuildVersion')
      .mockReturnValue(mockSAMBuildVersion);
  });

  describe('getSlmsApps', () => {
    let store = null;
    let err = null;

    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfczas111'],
        },
        profile: {
          school_id: ['my_school'],
        },
      });

      err = 'mock error';

      generator = Saga.getSlmsApps();
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.next(store.get('login')).value).toEqual(
        call(Request.getSlmsApplication, store.getIn(['login', 'session_id', 0]))
      );
      expect(generator.next().value).toEqual(put(Actions.getProductListSuccess()));
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.getProductListFailure(err)));
    });
  });

  describe('getBuildInfo', () => {
    let store = null;
    let err = null;
    beforeEach(() => {
      store = fromJS({
        buildInfo: {
          build_info: {
            build_number: ['2.5.4'],
          },
        },
      });
      err = 'mock error';
      generator = Saga.getBuildInfo();
    });

    it('call the getBuild info calls', () => {
      expect(generator.next().value).toEqual(call(Request.getBuildInfo, mockEpochTime));
      expect(generator.next(store.get('buildInfo')).value).toEqual(
        put(Actions.getBuildInfoSuccess(store.get('buildInfo')))
      );
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(call(Request.getBuildInfo, mockEpochTime));
      expect(generator.throw(err).value).toEqual(put(Actions.getBuildInfoFailure(err)));
    });
  });

  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('GET_PRODUCT_SEARCH IS CALLED', () => {
      expect(generator.next().value).toEqual(
        takeLatest(Constants.GET_PRODUCT_SEARCH, Saga.getSlmsApps)
      );
    });

    it('GET BUILD INFO', () => {
      expect(generator.next().value).toEqual(
        takeLatest(Constants.GET_BUILD_INFO, Saga.getBuildInfo)
      );
    });

    it('POST QUICK SEARCH DEFAULT', () => {
      expect(generator.next().value).toEqual(
        takeLatest(Constants.POST_RESOURCES_QUICK_SEARCH, Saga.postQuickSearch)
      );
    });
  });

  describe('post resource manager quick search', () => {
    let err = null;
    let resource = null;
    let mockResponse = null;
    beforeEach(() => {
      resource = {
        resource_type: 'test',
        samversion: null,
      };
      mockResponse = {
        resource_type: 'test',
      };
      err = 'invalid post';
      generator = Saga.postQuickSearch({ resource });
    });
    it('verify the get call', () => {
      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next().value).toEqual(select(mockSAMBuildVersion));
      expect(generator.next().value).toEqual(
        call(
          Request.quickSearchPostResources,
          mockEpochTime,
          Saga.keywordRequestPayload(resource, '9987')
        )
      );
      expect(generator.next(mockResponse).value).toEqual(
        put(Actions.postResourcesQuickSearchSuccess(mockResponse))
      );
      expect(generator.next().value).toEqual(put(hideLoading()));
    });

    it('verify get call failure', () => {
      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next().value).toEqual(select(mockSAMBuildVersion));
      expect(generator.next().value).toEqual(
        call(
          Request.quickSearchPostResources,
          mockEpochTime,
          Saga.keywordRequestPayload(resource, '9987')
        )
      );
      expect(generator.throw(err).value).toEqual(put(Actions.postResourcesQuickSearchFailure(err)));
      expect(generator.next().value).toEqual(put(hideLoading()));
    });
  });
});
