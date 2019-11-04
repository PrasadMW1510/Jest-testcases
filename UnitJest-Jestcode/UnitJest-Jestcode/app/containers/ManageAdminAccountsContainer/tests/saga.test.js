/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import defaultSaga, * as Saga from '../saga';
import * as Constants from '../constants';
import * as Actions from '../actions';
import * as Request from '../request';
import * as Selectors from '../../App/selectors';

describe('ManageAdminAccounts Saga', () => {
  let generator = null;

  let loginDataSelector = null;
  let profileDistrictIdSelector = null;
  let profileSessionIdSelector = null;
  let loginUserOrgSelector = null;
  let profileUserOrgIdSelector = null;
  let mockStore = null;
  const err = 'mock error';
  beforeEach(() => {
    loginDataSelector = jest.fn();
    profileDistrictIdSelector = jest.fn();
    profileSessionIdSelector = jest.fn();
    loginUserOrgSelector = jest.fn();
    profileUserOrgIdSelector = jest.fn();

    mockStore = fromJS({
      loginData: {
        session_id: ['adsfczas111'],
        user_id: ['user123'],
        user_org: ['District'],
        user_org_id: ['district9'],
      },
    });
    jest.spyOn(Selectors, 'makeSelectLoginData').mockReturnValue(loginDataSelector);
    jest.spyOn(Selectors, 'makeSelectProfileDistrictId').mockReturnValue(profileDistrictIdSelector);
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(profileSessionIdSelector);
    jest.spyOn(Selectors, 'makeSelectLoginUserOrg').mockReturnValue(loginUserOrgSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserOrgId').mockReturnValue(profileUserOrgIdSelector);
  });

  afterEach(() => {
    expect(generator.next().done).toBeTruthy();
  });

  describe('defaultSaga', () => {
    beforeEach(() => {
      generator = defaultSaga();
    });

    it('Expects default Sagas are called ', () => {
      expect(generator.next().value).toEqual(
        all([
          takeLatest(Constants.GET_ADMIN_REQUEST, Saga.getAdminRequest),
          takeLatest(Constants.GET_ADMINS_REQUEST, Saga.getAdminsRequest),
        ])
      );
    });
  });

  describe('getAdminsRequest saga flow', () => {
    beforeEach(() => {
      generator = Saga.getAdminsRequest();
    });

    it('should successfully run DA/DTA', () => {
      const mockAdmins = [];
      const districtId = mockStore.getIn(['loginData', 'user_org_id', 0]);

      const sessionId = mockStore.getIn(['loginData', 'session_id', 0]);
      const userOrg = mockStore.getIn(['loginData', 'user_org', 0]);
      const userOrgId = ['gggg'];

      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.next(sessionId).value).toEqual(select(profileDistrictIdSelector));
      expect(generator.next(districtId).value).toEqual(select(loginUserOrgSelector));
      expect(generator.next(userOrg).value).toEqual(select(profileUserOrgIdSelector));

      expect(generator.next(userOrgId).value).toEqual(
        call(Request.getAdmins, sessionId, districtId)
      );

      expect(generator.next().value).toEqual(put(Actions.getAdminsRequestSuccess(mockAdmins)));
    });

    it('should successfully run for SA/STA', () => {
      const mockAdmins = [];
      const districtId = mockStore.getIn(['loginData', 'user_org_id', 0]);

      const sessionId = mockStore.getIn(['loginData', 'session_id', 0]);
      const userOrg = ['School'];
      const schoolId = ['sss'];

      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.next(sessionId).value).toEqual(select(profileDistrictIdSelector));
      expect(generator.next(districtId).value).toEqual(select(loginUserOrgSelector));
      expect(generator.next(userOrg).value).toEqual(select(profileUserOrgIdSelector));

      expect(generator.next(schoolId).value).toEqual(call(Request.getSchools, sessionId, schoolId));

      expect(generator.next().value).toEqual(put(Actions.getAdminsRequestSuccess(mockAdmins)));
    });

    it('should throw error', () => {
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.getAdminsRequestFailure(err)));
    });
  });
});
