import { takeLatest, call, put, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
// import { getProfileData } from '../../App/request';
import defaultSaga, * as Saga from '../saga';
import * as Selectors from '../../App/selectors';
import * as Actions from '../actions';
import * as Request from '../request';
import * as Constants from '../constants';
/* eslint-disable redux-saga/yield-effects */

describe('Advanced Search Container Saga', () => {
  let generator = null;
  let selectSelector = null;
  let mockEpochTime = null;
  let error = null;
  let mockGetAppId = null;

  beforeEach(() => {
    selectSelector = jest.fn();
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(selectSelector);
    mockEpochTime = 1516120801689;
    jest.spyOn(Date.prototype, 'getTime').mockReturnValue(mockEpochTime);
  });

  describe('get Awards Data Request', () => {
    beforeEach(() => {
      mockGetAppId = {
        appId: ['R180_A', 'R180_B'],
      };
      error = {};
      generator = Saga.getAwardsDataRequest();
    });

    it('get Awards Request Success', () => {
      expect(generator.next().value).toEqual(call(Request.getAwardsData, mockEpochTime));
      expect(generator.next(mockGetAppId).value).toEqual(
        put(Actions.getAwardsRequestSuccess(mockGetAppId))
      );
    });

    it('get Awards Request Failure', () => {
      expect(generator.next().value).toEqual(call(Request.getAwardsData, mockEpochTime));
      expect(generator.throw(error).value).toEqual(put(Actions.getAwardsRequestFailure(error)));
    });
  });

  describe('get Comskill Data Request', () => {
    beforeEach(() => {
      mockGetAppId = {
        appId: ['R180_A', 'R180_B'],
      };
      error = {};
      generator = Saga.getComskillDataRequest();
    });

    it('getComskillRequestSuccess', () => {
      expect(generator.next().value).toEqual(call(Request.getComskillData, mockEpochTime));
      expect(generator.next(mockGetAppId).value).toEqual(
        put(Actions.getComskillRequestSuccess(mockGetAppId))
      );
    });

    it('getComskillRequestFailure', () => {
      expect(generator.next().value).toEqual(call(Request.getComskillData, mockEpochTime));
      expect(generator.throw(error).value).toEqual(put(Actions.getComskillRequestFailure(error)));
    });
  });

  describe('get Culture Data Request', () => {
    beforeEach(() => {
      mockGetAppId = {
        appId: ['R180_A', 'R180_B'],
      };
      error = {};
      generator = Saga.getCultureDataRequest();
    });

    it('getCultureRequestSuccess', () => {
      expect(generator.next().value).toEqual(call(Request.getCultureData, mockEpochTime));
      expect(generator.next(mockGetAppId).value).toEqual(
        put(Actions.getCultureRequestSuccess(mockGetAppId))
      );
    });

    it('getCultureRequestFailure', () => {
      expect(generator.next().value).toEqual(call(Request.getCultureData, mockEpochTime));
      expect(generator.throw(error).value).toEqual(put(Actions.getCultureRequestFailure(error)));
    });
  });

  describe('get Genre Data Request', () => {
    beforeEach(() => {
      mockGetAppId = {
        appId: ['R180_A', 'R180_B'],
      };
      error = {};
      generator = Saga.getGenreDataRequest();
    });

    it('getGenreRequestSuccess', () => {
      expect(generator.next().value).toEqual(call(Request.getGenreData, mockEpochTime));
      expect(generator.next(mockGetAppId).value).toEqual(
        put(Actions.getGenreRequestSuccess(mockGetAppId))
      );
    });

    it('getGenreRequestFailure', () => {
      expect(generator.next().value).toEqual(call(Request.getGenreData, mockEpochTime));
      expect(generator.throw(error).value).toEqual(put(Actions.getGenreRequestFailure(error)));
    });
  });

  describe('getInterestLevelDataRequest', () => {
    beforeEach(() => {
      mockGetAppId = {
        appId: ['R180_A', 'R180_B'],
      };
      error = {};
      generator = Saga.getInterestLevelDataRequest();
    });

    it('getInterestLevelRequestSuccess', () => {
      expect(generator.next().value).toEqual(call(Request.getInterestLevelData, mockEpochTime));
      expect(generator.next(mockGetAppId).value).toEqual(
        put(Actions.getInterestLevelRequestSuccess(mockGetAppId))
      );
    });

    it('getInterestLevelRequestFailure', () => {
      expect(generator.next().value).toEqual(call(Request.getInterestLevelData, mockEpochTime));
      expect(generator.throw(error).value).toEqual(
        put(Actions.getInterestLevelRequestFailure(error))
      );
    });
  });

  describe('getProgramSeriesDataRequest', () => {
    beforeEach(() => {
      mockGetAppId = {
        appId: ['R180_A', 'R180_B'],
      };
      error = {};
      generator = Saga.getProgramSeriesDataRequest();
    });

    it('getProgramSeriesRequestSuccess', () => {
      expect(generator.next().value).toEqual(call(Request.getProgramSeriesData, mockEpochTime));
      expect(generator.next(mockGetAppId).value).toEqual(
        put(Actions.getProgramSeriesRequestSuccess(mockGetAppId))
      );
    });

    it('getProgramSeriesRequestFailure', () => {
      expect(generator.next().value).toEqual(call(Request.getProgramSeriesData, mockEpochTime));
      expect(generator.throw(error).value).toEqual(
        put(Actions.getProgramSeriesRequestFailure(error))
      );
    });
  });

  describe('getTopicsDataRequest', () => {
    beforeEach(() => {
      mockGetAppId = {
        appId: ['R180_A', 'R180_B'],
      };
      error = {};
      generator = Saga.getTopicsDataRequest();
    });

    it('getTopicsRequestSuccess', () => {
      expect(generator.next().value).toEqual(call(Request.getTopicsData, mockEpochTime));
      expect(generator.next(mockGetAppId).value).toEqual(
        put(Actions.getTopicsRequestSuccess(mockGetAppId))
      );
    });

    it('getTopicsDataRequestFailure', () => {
      expect(generator.next().value).toEqual(call(Request.getTopicsData, mockEpochTime));
      expect(generator.throw(error).value).toEqual(put(Actions.getTopicsDataRequestFailure(error)));
    });
  });

  describe('getThemesDataRequest', () => {
    beforeEach(() => {
      mockGetAppId = {
        appId: ['R180_A', 'R180_B'],
      };
      error = {};
      generator = Saga.getThemesDataRequest();
    });

    it('getThemesRequestSuccess', () => {
      expect(generator.next().value).toEqual(call(Request.getThemesData, mockEpochTime));
      expect(generator.next(mockGetAppId).value).toEqual(
        put(Actions.getThemesRequestSuccess(mockGetAppId))
      );
    });

    it('getThemesRequestFailure', () => {
      expect(generator.next().value).toEqual(call(Request.getThemesData, mockEpochTime));
      expect(generator.throw(error).value).toEqual(put(Actions.getThemesRequestFailure(error)));
    });
  });

  describe('getInstalledQuizCountDataRequest', () => {
    let store = null;
    let err = null;

    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfadsf'],
          user_id: ['id1'],
        },
      });

      err = 'mock error';

      generator = Saga.getInstalledQuizCountDataRequest();
    });

    it('getInstalledQuizCountRequestSuccess', () => {
      expect(generator.next().value).toEqual(select(selectSelector));
      expect(generator.next(store.getIn(['session_id', 0])).value).toEqual(
        call(Request.getInstalledQuizCountData, store.getIn(['session_id', 0]))
      );
      expect(generator.next().value).toEqual(put(Actions.getInstalledQuizCountRequestSuccess()));
    });

    it('getInstalledQuizCountRequestFailure', () => {
      expect(generator.next().value).toEqual(select(selectSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.getInstalledQuizCountRequestFailure(err))
      );
    });
  });

  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('Expects default Sagas are called', () => {
      expect(generator.next().value).toEqual(
        takeLatest(Constants.GET_AWARDS_REQUEST, Saga.getAwardsDataRequest)
      );
    });

    it('Expects default Sagas are called', () => {
      expect(generator.next().value).toEqual(
        takeLatest(Constants.GET_COMSKILL_REQUEST, Saga.getComskillDataRequest)
      );
    });

    it('Expects default Sagas are called', () => {
      expect(generator.next().value).toEqual(
        takeLatest(Constants.GET_CULTURE_REQUEST, Saga.getCultureDataRequest)
      );
    });

    it('Expects default Sagas are called', () => {
      expect(generator.next().value).toEqual(
        takeLatest(Constants.GET_GENRE_REQUEST, Saga.getGenreDataRequest)
      );
    });

    it('Expects default Sagas are called', () => {
      expect(generator.next().value).toEqual(
        takeLatest(Constants.GET_INTERESTLEVEL_REQUEST, Saga.getInterestLevelDataRequest)
      );
    });

    it('Expects default Sagas are called', () => {
      expect(generator.next().value).toEqual(
        takeLatest(Constants.GET_PROGRAM_SERIES_REQUEST, Saga.getProgramSeriesDataRequest)
      );
    });

    it('Expects default Sagas are called', () => {
      expect(generator.next().value).toEqual(
        takeLatest(Constants.GET_TOPICS_REQUEST, Saga.getTopicsDataRequest)
      );
    });

    it('Expects default Sagas are called', () => {
      expect(generator.next().value).toEqual(
        takeLatest(Constants.GET_THEMES_REQUEST, Saga.getThemesDataRequest)
      );
    });
    it('Expects default Sagas are called', () => {
      expect(generator.next().value).toEqual(
        takeLatest(Constants.GET_INSTALLEDQUIZCOUNT_REQUEST, Saga.getInstalledQuizCountDataRequest)
      );
    });
  });
});
