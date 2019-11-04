/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import * as Selectors from 'containers/App/selectors';
import * as SmartBarSelectors from 'containers/SmartBarContainer/selectors';
import { hideModal, showModal } from 'containers/ModalController/actions';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import * as ModalConstants from 'containers/ModalController/constants';
import defaultSaga, * as Saga from '../saga';
import * as Constants from '../constants';
import * as Actions from '../actions';
import * as Request from '../request';

describe('ClearRosterModalContainer Saga', () => {
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
        takeLatest(Constants.DEACTIVATE_ALL_CLASSES_REQUEST, Saga.deactivateAllClassesFlow)
      );
    });
  });

  describe('deactivateAllClasses', () => {
    beforeEach(() => {
      generator = Saga.deactivateAllClassesFlow();
    });

    it('should successfully run for user_org District', () => {
      const userId = mockStore.getIn(['loginData', 'user_id', 0]);
      const sessionId = mockStore.getIn(['loginData', 'session_id', 0]);
      const userOrg = mockStore.getIn(['logindata', 'user_org', 0]);
      const schoolId = ['sss'];

      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next().value).toEqual(select(profileUserIdSelector));
      expect(generator.next(userId).value).toEqual(select(profileSessionIdSelector));
      expect(generator.next(sessionId).value).toEqual(select(schoolIdSelector));
      expect(generator.next(schoolId).value).toEqual(select(loginUserOrgSelector));

      expect(generator.next(userOrg).value).toEqual(
        call(Request.deactivateAllClasses, userId, sessionId, schoolId)
      );
      expect(generator.next().value).toEqual(put(Actions.deactivateAllClassesRequestSuccess()));
      expect(generator.next().value).toEqual(put(hideLoading()));
      expect(generator.next().value).toEqual(
        put(showModal(ModalConstants.CLEAR_ROSTER_SUCCESS_MODAL))
      );
    });

    it('should successfully run for user_org School', () => {
      const userId = mockStore.getIn(['loginData', 'user_id', 0]);
      const sessionId = mockStore.getIn(['loginData', 'session_id', 0]);
      const userOrgId = mockStore.getIn(['loginData', 'user_org_id', 0]);
      const userOrg = 'School';
      const schoolId = ['sss'];

      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next().value).toEqual(select(profileUserIdSelector));
      expect(generator.next(userId).value).toEqual(select(profileSessionIdSelector));
      expect(generator.next(sessionId).value).toEqual(select(schoolIdSelector));
      expect(generator.next(schoolId).value).toEqual(select(loginUserOrgSelector));
      expect(generator.next(userOrg).value).toEqual(select(profileUserOrgIdSelector));

      expect(generator.next(userOrgId).value).toEqual(
        call(Request.deactivateAllClasses, userId, sessionId, userOrgId)
      );
      expect(generator.next().value).toEqual(put(Actions.deactivateAllClassesRequestSuccess()));
      expect(generator.next().value).toEqual(put(hideLoading()));
      expect(generator.next().value).toEqual(
        put(showModal(ModalConstants.CLEAR_ROSTER_SUCCESS_MODAL))
      );
    });

    it('should throw error', () => {
      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next().value).toEqual(select(profileUserIdSelector));

      expect(generator.throw(err).value).toEqual(put(hideModal()));
      expect(generator.next().value).toEqual(
        put(showModal(ModalConstants.CLEAR_ROSTER_SUCCESS_MODAL))
      );
      expect(generator.next().value).toEqual(put(Actions.deactivateAllClassesRequestFailure(err)));
      expect(generator.next().value).toEqual(put(hideLoading()));
    });
  });
});
