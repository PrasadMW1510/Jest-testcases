/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import * as ProfilePageSelectors from 'containers/ProfilePageContainer/selectors';
import defaultSaga, * as Saga from '../saga';
import * as Constants from '../constants';
import * as Actions from '../actions';
import * as Request from '../request';
import * as Selectors from '../../App/selectors';

describe('EditDistrictProfile Saga', () => {
  let generator = null;

  let profileSessionIdSelector = null;
  let profilePageDataSelector;
  let mockStore = null;
  const err = 'mock error';
  beforeEach(() => {
    profileSessionIdSelector = jest.fn();
    profilePageDataSelector = jest.fn();

    mockStore = fromJS({
      loginData: {
        session_id: ['adsfczas111'],
        user_id: ['user123'],
        user_org: ['District'],
        user_org_id: ['district9'],
      },
    });
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(profileSessionIdSelector);
    jest
      .spyOn(ProfilePageSelectors, 'makeSelectProfilePageData')
      .mockReturnValue(profilePageDataSelector);
  });

  afterEach(() => {
    // To-Do fix saga test
    // expect(generator.next().done).toBeTruthy();
  });

  describe('defaultSaga', () => {
    beforeEach(() => {
      generator = defaultSaga();
    });

    it('Expects default Sagas are called ', () => {
      expect(generator.next().value).toEqual(
        takeLatest(Constants.GET_TIME_ZONES_REQUEST, Saga.getTimeZonesFlow)
      );
    });
  });

  describe('getTimeZones saga flow', () => {
    const mockProfile = fromJS({
      profileDetailsDistAdmin: { groups: [{ group: ['test-group'] }] },
    });
    beforeEach(() => {
      generator = Saga.getTimeZonesFlow(mockProfile);
    });

    it('should successfully run', () => {
      const sessionId = mockStore.getIn(['loginData', 'session_id', 0]);
      // const mockTimeZones = ['US Pacific'];

      expect(generator.next().value).toEqual(select(profileSessionIdSelector));

      expect(generator.next(sessionId).value).toEqual(call(Request.getTimeZones, sessionId));
    });

    it('should throw error', () => {
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.getTimeZonesRequestFailure(err)));
    });
  });
});
