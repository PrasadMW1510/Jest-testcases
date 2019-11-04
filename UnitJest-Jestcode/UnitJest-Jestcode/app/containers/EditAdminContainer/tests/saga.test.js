/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { fromJS } from 'immutable';
import { stopSubmit } from 'redux-form/immutable';
import { call, select, takeLatest, all, put } from 'redux-saga/effects';

import {
  updateProfileRequestSuccess,
  permissionsRequestSuccess,
  passwordConfigRequestSuccess,
} from 'containers/App/actions';
import { USER_ORG, USER_TYPE } from 'containers/App/constants';
import * as AdminConstants from 'components/ManageAdminAccounts/constants';
import * as Request from 'containers/App/request';
import * as Selectors from 'containers/App/selectors';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import { hideModal } from 'containers/ModalController/actions';
import { getAdminsRequest } from 'containers/ManageAdminAccountsContainer/actions';

import * as Actions from '../actions';
import * as Constants from '../constants';
import defaultSaga, * as Saga from '../saga';

describe('EditAdminContainer Saga', () => {
  let generator = null;

  let permissionDataSelector = null;
  let sessionIdSelector = null;
  let userIdSelector = null;
  let userOrgSelector = null;
  let userOrgIdSelector = null;

  let selectedPermissionData = null;
  let selectedSessionId = null;
  let selectedUserId = null;
  let selectedUserOrg = null;
  let selectedUserOrgId = null;

  let passwordConfig = null;
  let permissionData = null;
  let profileDetails = null;
  let mockFormValues;

  let store = null;
  let err;

  beforeEach(() => {
    permissionDataSelector = jest.fn();
    sessionIdSelector = jest.fn();
    userIdSelector = jest.fn();
    userOrgSelector = jest.fn();
    userOrgIdSelector = jest.fn();

    jest.spyOn(Selectors, 'makeSelectPermissionsData').mockReturnValue(permissionDataSelector);
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(sessionIdSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserId').mockReturnValue(userIdSelector);
    jest.spyOn(Selectors, 'makeSelectLoginUserOrg').mockReturnValue(userOrgSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserOrgId').mockReturnValue(userOrgIdSelector);

    store = fromJS({
      login: {
        session_id: ['adsfczas111'],
        user_id: ['user123'],
        user_org_id: ['userOrgId123'],
      },
      permissions: [{ id: ['permissionMock1'] }, { id: ['permissionMock2'] }],
    });

    selectedPermissionData = store.get('permissions');
    selectedSessionId = store.getIn(['login', 'session_id', 0]);
    selectedUserId = store.getIn(['login', 'user_id', 0]);
    selectedUserOrgId = store.getIn(['login', 'user_org_id', 0]);

    passwordConfig = [{ id: 'passwordConfig' }];
    permissionData = [{ id: 'permissionData' }];
    profileDetails = [{ id: 'profileDetails' }];

    mockFormValues = {
      district_user_id: 'mock_district_user_id',
      sps_id: 'mock_sps_id',
      prefix: 'mock_prefix',
      first_name: 'mock_first_name',
      last_name: 'mock_last_name',
      title: 'mock_title',
      suffix: 'mock_suffix',
      email: 'mock_email',
      user_name: 'mock_user_name',
      password: 'mock_password',
      password_hint: 'mock_password_hint',
    };

    err = 'mockError';
  });

  afterEach(() => {
    expect(generator.next().done).toBeTruthy();
  });

  describe('editAdminContainerFlow', () => {
    beforeEach(() => {
      generator = Saga.editAdminContainerFlow();
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(selectedSessionId).value).toEqual(select(userIdSelector));

      expect(generator.next(selectedUserId).value).toEqual(
        all([
          call(Request.getProfileData, selectedSessionId, selectedUserId),
          call(Request.getPermissions, selectedSessionId, selectedUserId),
          call(Request.getPasswordConfig, selectedSessionId, selectedUserId),
        ])
      );

      expect(generator.next([profileDetails, permissionData, passwordConfig]).value).toEqual(
        put(updateProfileRequestSuccess(profileDetails))
      );

      expect(generator.next().value).toEqual(put(permissionsRequestSuccess(permissionData)));

      expect(generator.next().value).toEqual(put(passwordConfigRequestSuccess(passwordConfig)));

      expect(generator.next().value).toEqual(put(Actions.editAdminContainerRequestSuccess()));
    });

    it('should handle failed edit admin container request', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));

      expect(generator.throw(err).value).toEqual(
        put(Actions.editAdminContainerRequestFailure(err))
      );
    });
  });

  describe('postSaveAdminFlow', () => {
    let transformedData = null;

    beforeEach(() => {
      const actionData = {
        profileData: fromJS({
          user_type: 'mock_user_type',
          district_user_id: 'mock_district_user_id',
          sps_id: 'mock_sps_id',
          prefix: 'mock_prefix',
          first_name: 'mock_first_name',
          last_name: 'mock_last_name',
          title: 'mock_title',
          suffix: 'mock_suffix',
          email: 'mock_email',
          user_name: 'mock_user_name',
          password: 'mock_password',
          password_hint: 'mock_password_hint',
        }),
        editingSameAccount: true,
      };

      generator = Saga.postSaveAdminFlow(actionData);

      transformedData = {
        user: {
          user_id: selectedUserId,
          user_type: actionData.profileData.get('user_type'),
          district_user_id: actionData.profileData.get('district_user_id'),
          sps_id: actionData.profileData.get('sps_id'),
          prefix: actionData.profileData.get('prefix'),
          first_name: actionData.profileData.get('first_name'),
          last_name: actionData.profileData.get('last_name'),
          title: actionData.profileData.get('title'),
          suffix: actionData.profileData.get('suffix'),
          email: actionData.profileData.get('email'),
          user_name: actionData.profileData.get('user_name'),
          password: actionData.profileData.get('password'),
          password_hint: actionData.profileData.get('password_hint'),
          permissions: {
            permission: [
              { permission_id: 'permissionMock1' },
              { permission_id: 'permissionMock2' },
            ],
          },
          organizations: {
            org_id: selectedUserOrgId,
          },
        },
      };
    });

    describe('userOrg is District', () => {
      beforeEach(() => {
        selectedUserOrg = USER_ORG.District;
      });

      it('All calls pass', () => {
        expect(generator.next().value).toEqual(put(showLoading()));
        expect(generator.next().value).toEqual(select(permissionDataSelector));
        expect(generator.next(selectedPermissionData).value).toEqual(select(sessionIdSelector));
        expect(generator.next(selectedSessionId).value).toEqual(select(userIdSelector));
        expect(generator.next(selectedUserId).value).toEqual(select(userOrgSelector));
        expect(generator.next(selectedUserOrg).value).toEqual(select(userOrgIdSelector));

        expect(generator.next(selectedUserOrgId).value).toEqual(
          call(Request.postUpdateSLMSAccount, selectedSessionId, transformedData)
        );

        expect(generator.next().value).toEqual(put(Actions.postSaveAdminRequestSuccess()));

        expect(generator.next().value).toEqual(
          call(Request.getProfileData, selectedSessionId, selectedUserId)
        );
        expect(generator.next(profileDetails).value).toEqual(
          put(updateProfileRequestSuccess(profileDetails))
        );

        expect(generator.next().value).toEqual(put(hideLoading()));
        expect(generator.next().value).toEqual(put(hideModal()));
      });

      it('should handle failed post request', () => {
        expect(generator.next().value).toEqual(put(showLoading()));

        expect(generator.throw(err).value).toEqual(put(stopSubmit(Constants.FORM_EDIT_ADMIN, err)));

        expect(generator.next().value).toEqual(put(Actions.postSaveAdminRequestFailure(err)));
        expect(generator.next().value).toEqual(put(hideLoading()));
      });
    });

    describe('userOrg is School', () => {
      beforeEach(() => {
        selectedUserOrg = USER_ORG.School;

        transformedData.user.schools = {
          school_id: selectedUserOrgId,
        };
      });

      it('All calls pass', () => {
        expect(generator.next().value).toEqual(put(showLoading()));
        expect(generator.next().value).toEqual(select(permissionDataSelector));
        expect(generator.next(selectedPermissionData).value).toEqual(select(sessionIdSelector));
        expect(generator.next(selectedSessionId).value).toEqual(select(userIdSelector));
        expect(generator.next(selectedUserId).value).toEqual(select(userOrgSelector));
        expect(generator.next(selectedUserOrg).value).toEqual(select(userOrgIdSelector));

        expect(generator.next(selectedUserOrgId).value).toEqual(
          call(Request.postUpdateSLMSAccount, selectedSessionId, transformedData)
        );

        expect(generator.next().value).toEqual(put(Actions.postSaveAdminRequestSuccess()));

        expect(generator.next().value).toEqual(
          call(Request.getProfileData, selectedSessionId, selectedUserId)
        );
        expect(generator.next(profileDetails).value).toEqual(
          put(updateProfileRequestSuccess(profileDetails))
        );

        expect(generator.next().value).toEqual(put(hideLoading()));
        expect(generator.next().value).toEqual(put(hideModal()));
      });

      it('should handle failed post request', () => {
        expect(generator.next().value).toEqual(put(showLoading()));

        expect(generator.throw(err).value).toEqual(put(stopSubmit(Constants.FORM_EDIT_ADMIN, err)));

        expect(generator.next().value).toEqual(put(Actions.postSaveAdminRequestFailure(err)));
        expect(generator.next().value).toEqual(put(hideLoading()));
      });
    });
  });

  describe('postAddAdminFlow for DA', () => {
    let transformedData = null;

    beforeEach(() => {
      const actionData = {
        profileData: fromJS({
          user_type: AdminConstants.DISTRICT_ADMINISTRATOR,
          ...mockFormValues,
        }),
        permissionIds: [100, 500, 1500],
      };

      generator = Saga.postAddAdminFlow(actionData);

      transformedData = {
        user: {
          user_type: USER_TYPE.Administrator,
          district_user_id: actionData.profileData.get('district_user_id'),
          sps_id: actionData.profileData.get('sps_id'),
          prefix: actionData.profileData.get('prefix'),
          first_name: actionData.profileData.get('first_name'),
          last_name: actionData.profileData.get('last_name'),
          title: actionData.profileData.get('title'),
          suffix: actionData.profileData.get('suffix'),
          email: actionData.profileData.get('email'),
          user_name: actionData.profileData.get('user_name'),
          password: actionData.profileData.get('password'),
          password_hint: actionData.profileData.get('password_hint'),
          permissions: {
            permission: [{ permission_id: 100 }, { permission_id: 500 }, { permission_id: 1500 }],
          },
          organizations: { org_id: selectedUserOrgId },
        },
      };
    });

    describe('generators flow', () => {
      beforeEach(() => {
        selectedUserOrg = USER_ORG.District;
      });

      it('All calls pass', () => {
        expect(generator.next().value).toEqual(put(showLoading()));
        expect(generator.next().value).toEqual(select(sessionIdSelector));

        expect(generator.next(selectedSessionId).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(selectedUserOrgId).value).toEqual(select(userOrgSelector));

        expect(generator.next(selectedUserOrg).value).toEqual(
          call(Request.postAddSLMSAccount, selectedSessionId, transformedData)
        );

        expect(generator.next().value).toEqual(put(Actions.postAddAdminRequestSuccess()));
        expect(generator.next().value).toEqual(put(getAdminsRequest()));

        expect(generator.next().value).toEqual(put(hideLoading()));
        expect(generator.next().value).toEqual(put(hideModal()));
      });

      it('should handle failed post request', () => {
        expect(generator.next().value).toEqual(put(showLoading()));

        expect(generator.throw(err).value).toEqual(put(stopSubmit(Constants.FORM_EDIT_ADMIN, err)));

        expect(generator.next().value).toEqual(put(Actions.postAddAdminRequestFailure(err)));
        expect(generator.next().value).toEqual(put(hideLoading()));
      });
    });
  });

  describe('postAddAdminFlow for DTA', () => {
    let transformedData = null;

    beforeEach(() => {
      const actionData = {
        profileData: fromJS({
          user_type: AdminConstants.DISTRICT_TECH,
          ...mockFormValues,
        }),
        permissionIds: [100, 500, 1500],
      };

      generator = Saga.postAddAdminFlow(actionData);

      transformedData = {
        user: {
          user_type: USER_TYPE.Tech,
          district_user_id: actionData.profileData.get('district_user_id'),
          sps_id: actionData.profileData.get('sps_id'),
          prefix: actionData.profileData.get('prefix'),
          first_name: actionData.profileData.get('first_name'),
          last_name: actionData.profileData.get('last_name'),
          title: actionData.profileData.get('title'),
          suffix: actionData.profileData.get('suffix'),
          email: actionData.profileData.get('email'),
          user_name: actionData.profileData.get('user_name'),
          password: actionData.profileData.get('password'),
          password_hint: actionData.profileData.get('password_hint'),
          permissions: {
            permission: [{ permission_id: 100 }, { permission_id: 500 }, { permission_id: 1500 }],
          },
          organizations: { org_id: selectedUserOrgId },
        },
      };
    });

    describe('generators flow', () => {
      beforeEach(() => {
        selectedUserOrg = USER_ORG.District;
      });

      it('All calls pass', () => {
        expect(generator.next().value).toEqual(put(showLoading()));
        expect(generator.next().value).toEqual(select(sessionIdSelector));

        expect(generator.next(selectedSessionId).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(selectedUserOrgId).value).toEqual(select(userOrgSelector));

        expect(generator.next(selectedUserOrg).value).toEqual(
          call(Request.postAddSLMSAccount, selectedSessionId, transformedData)
        );

        expect(generator.next().value).toEqual(put(Actions.postAddAdminRequestSuccess()));
        expect(generator.next().value).toEqual(put(getAdminsRequest()));

        expect(generator.next().value).toEqual(put(hideLoading()));
        expect(generator.next().value).toEqual(put(hideModal()));
      });

      it('should handle failed post request', () => {
        expect(generator.next().value).toEqual(put(showLoading()));

        expect(generator.throw(err).value).toEqual(put(stopSubmit(Constants.FORM_EDIT_ADMIN, err)));

        expect(generator.next().value).toEqual(put(Actions.postAddAdminRequestFailure(err)));
        expect(generator.next().value).toEqual(put(hideLoading()));
      });
    });
  });

  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('All calls are made', () => {
      expect(generator.next().value).toEqual(
        takeLatest(Constants.EDIT_ADMIN_CONTAINER_REQUEST, Saga.editAdminContainerFlow)
      );
      expect(generator.next().value).toEqual(
        takeLatest(Constants.POST_ADD_ADMIN_REQUEST, Saga.postAddAdminFlow)
      );

      expect(generator.next().value).toEqual(
        takeLatest(Constants.POST_SAVE_ADMIN_REQUEST, Saga.postSaveAdminFlow)
      );
    });
  });
});
