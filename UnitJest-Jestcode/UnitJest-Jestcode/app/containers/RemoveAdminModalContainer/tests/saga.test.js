/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import * as Selectors from 'containers/App/selectors';
import * as SmartBarSelectors from 'containers/SmartBarContainer/selectors';
import { hideModal } from 'containers/ModalController/actions';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import { getAdminsRequest } from 'containers/ManageAdminAccountsContainer/actions';
import defaultSaga, * as Saga from '../saga';
import * as Constants from '../constants';
import * as Actions from '../actions';
import * as Request from '../request';

describe('RemoveAdminModalContainer Saga', () => {
  let generator = null;

  let loginDataSelector = null;
  let profileDistrictIdSelector = null;
  let profileSessionIdSelector = null;
  let loginUserOrgSelector = null;
  let schoolIdSelector = null;
  let profileUserIdSelector = null;
  let profileUserOrgIdSelector;
  let mockStore = null;
  const err = 'mock error';
  beforeEach(() => {
    loginDataSelector = jest.fn();
    profileDistrictIdSelector = jest.fn();
    profileSessionIdSelector = jest.fn();
    profileUserIdSelector = jest.fn();
    loginUserOrgSelector = jest.fn();
    schoolIdSelector = jest.fn();
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
    jest.spyOn(Selectors, 'makeSelectProfileUserId').mockReturnValue(profileUserIdSelector);
    jest.spyOn(Selectors, 'makeSelectLoginUserOrg').mockReturnValue(loginUserOrgSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserOrgId').mockReturnValue(profileUserOrgIdSelector);
    jest.spyOn(SmartBarSelectors, 'makeSelectSchoolId').mockReturnValue(schoolIdSelector);
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
        takeLatest(Constants.DISABLE_ADMIN_REQUEST, Saga.disableAdminFlow)
      );
    });
  });

  describe('disableAdminFlow', () => {
    const mockAction = {
      adminId: 'mock-admin-id',
    };
    beforeEach(() => {
      generator = Saga.disableAdminFlow(mockAction);
    });

    it('should successfully run', () => {
      const sessionId = mockStore.getIn(['loginData', 'session_id', 0]);

      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));

      expect(generator.next(sessionId).value).toEqual(
        call(Request.disableAdmin, sessionId, mockAction.adminId)
      );
      expect(generator.next().value).toEqual(put(Actions.disableAdminRequestSuccess()));
      expect(generator.next().value).toEqual(put(hideLoading()));
      expect(generator.next().value).toEqual(put(getAdminsRequest()));
      expect(generator.next().value).toEqual(put(hideModal()));
    });

    it('should throw error', () => {
      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));

      expect(generator.throw(err).value).toEqual(put(Actions.disableAdminRequestFailure(err)));
      expect(generator.next().value).toEqual(put(hideLoading()));
      expect(generator.next().value).toEqual(put(hideModal()));
    });
  });
});
