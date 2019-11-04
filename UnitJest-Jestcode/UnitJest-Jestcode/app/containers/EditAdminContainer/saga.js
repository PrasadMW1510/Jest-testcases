import { stopSubmit } from 'redux-form/immutable';
import { call, put, select, all, takeLatest } from 'redux-saga/effects';

import * as AppActions from 'containers/App/actions';
import { USER_ORG } from 'containers/App/constants';
import * as Request from 'containers/App/request';
import * as Selectors from 'containers/App/selectors';
import {
  makeSelectAdminToEditUserId,
  makeSelectAdminToEditUserOrg,
  makeSelectAdminToEditUserOrgId,
} from 'containers/ManageAdminAccountsContainer/selectors';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import { hideModal } from 'containers/ModalController/actions';
import { getAdminsRequest } from 'containers/ManageAdminAccountsContainer/actions';
import {
  transformDataForProfileUpdate,
  transformDataForProfileAdd,
  createPermissionFromIds,
  createPermissionsObj,
} from 'utils/transformData';

import * as Actions from './actions';
import * as Constants from './constants';

export function* editAdminContainerFlow() {
  try {
    const sessionId = yield select(Selectors.makeSelectProfileSessionId());
    const userId = yield select(Selectors.makeSelectProfileUserId());

    const [profileDetails, permissionData, passwordConfig] = yield all([
      call(Request.getProfileData, sessionId, userId),
      call(Request.getPermissions, sessionId, userId),
      call(Request.getPasswordConfig, sessionId, userId),
    ]);

    yield put(AppActions.updateProfileRequestSuccess(profileDetails));
    yield put(AppActions.permissionsRequestSuccess(permissionData));
    yield put(AppActions.passwordConfigRequestSuccess(passwordConfig));

    yield put(Actions.editAdminContainerRequestSuccess());
  } catch (e) {
    yield put(Actions.editAdminContainerRequestFailure(e));
  }
}

export function* postAddAdminFlow(action) {
  try {
    yield put(showLoading());

    const sessionId = yield select(Selectors.makeSelectProfileSessionId());
    const userOrgId = yield select(Selectors.makeSelectProfileUserOrgId());
    const userOrg = yield select(Selectors.makeSelectLoginUserOrg());

    const adminData = transformDataForProfileAdd(
      action.profileData,
      action.permissionIds,
      userOrgId,
      userOrg
    );

    yield call(Request.postAddSLMSAccount, sessionId, adminData);

    yield put(Actions.postAddAdminRequestSuccess());
    yield put(getAdminsRequest());

    yield put(hideLoading());
    yield put(hideModal());
  } catch (e) {
    yield put(stopSubmit(Constants.FORM_EDIT_ADMIN, e));

    yield put(Actions.postAddAdminRequestFailure());
    yield put(hideLoading());
  }
}

export function* postSaveAdminFlow(action) {
  try {
    yield put(showLoading());

    const permissionData = yield select(Selectors.makeSelectPermissionsData());
    const sessionId = yield select(Selectors.makeSelectProfileSessionId());
    let userId = yield select(Selectors.makeSelectProfileUserId());
    const loginUserOrg = yield select(Selectors.makeSelectLoginUserOrg());
    let userOrgId = yield select(Selectors.makeSelectProfileUserOrgId());

    let permissions = createPermissionsObj(permissionData);
    let userOrg = loginUserOrg;

    if (!action.editingSameAccount) {
      userId = yield select(makeSelectAdminToEditUserId());
      const adminUserOrg = yield select(makeSelectAdminToEditUserOrg());
      userOrgId = yield select(makeSelectAdminToEditUserOrgId());
      userOrg = adminUserOrg;
      permissions = createPermissionFromIds(action.permissionIds);

      if (loginUserOrg === USER_ORG.District && adminUserOrg === USER_ORG.School) {
        userOrgId = action.profileData.get('school_name');
      }
    }

    const updateData = transformDataForProfileUpdate(
      action.profileData,
      permissions,
      userId,
      userOrg,
      userOrgId
    );

    yield call(Request.postUpdateSLMSAccount, sessionId, updateData);

    yield put(Actions.postSaveAdminRequestSuccess());

    if (!action.editingSameAccount) {
      yield put(getAdminsRequest());
    }

    // Refresh profile details
    const profileDetails = yield call(Request.getProfileData, sessionId, userId);
    yield put(AppActions.updateProfileRequestSuccess(profileDetails));

    yield put(hideLoading());
    yield put(hideModal());
  } catch (e) {
    yield put(stopSubmit(Constants.FORM_EDIT_ADMIN, e));

    yield put(Actions.postSaveAdminRequestFailure());
    yield put(hideLoading());
  }
}

export default function* defaultSaga() {
  yield takeLatest(Constants.EDIT_ADMIN_CONTAINER_REQUEST, editAdminContainerFlow);
  yield takeLatest(Constants.POST_ADD_ADMIN_REQUEST, postAddAdminFlow);
  yield takeLatest(Constants.POST_SAVE_ADMIN_REQUEST, postSaveAdminFlow);
}
