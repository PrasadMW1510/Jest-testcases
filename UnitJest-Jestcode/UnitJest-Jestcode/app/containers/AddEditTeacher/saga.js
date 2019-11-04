import { stopSubmit } from 'redux-form/immutable';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import * as AppActions from 'containers/App/actions';
import { USER_ORG, USER_TYPE } from 'containers/App/constants';
import * as Request from 'containers/App/request';
import * as Selectors from 'containers/App/selectors';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import {
  schoolRedirection,
  gradeRedirection,
  teacherRedirection,
} from 'containers/SmartBarContainer/actions';
import {
  makeSelectedActiveSchoolId,
  makeSelectedActiveGradeId,
  makeSelectedActiveTeacherId,
} from 'containers/SmartBarContainer/selectors';

import { hideModal } from 'containers/ModalController/actions';
import * as ProfileRequest from 'containers/ProfilePageContainer/request';
import * as MIAActions from 'containers/ManageInactiveAccountsContainer/actions';
import {
  transformDataForProfileAdd,
  transformDataForProfileUpdate,
  createPermissionFromIds,
  createPermissionsObj,
} from 'utils/transformData';

import * as ProfilePageActions from 'containers/ProfilePageContainer/actions';

import * as Actions from './actions';
import * as Constants from './constants';

export function* addEditTeacherFlow(action) {
  try {
    const districtId = yield select(Selectors.makeSelectProfileDistrictId());
    const sessionId = yield select(Selectors.makeSelectProfileSessionId());
    const editTeacherId = action && action.editTeacherId;
    // teacher - smart bar selection or mia teacher
    let teacherId = yield select(makeSelectedActiveTeacherId());
    if (editTeacherId) {
      teacherId = editTeacherId;
    }
    // user - logged in
    const userId = yield select(Selectors.makeSelectProfileUserId());

    // teacher login and editing profile
    if (!teacherId || teacherId === '') {
      teacherId = userId;
    }

    const userType = yield select(Selectors.makeSelectProfileUserType());

    const [profileDetails, schoolsAndClassesDetails, permissionData, passwordConfig] = yield all([
      call(ProfileRequest.getTeacherProfilePageData, sessionId, teacherId),
      call(Request.getSchoolsAndClasses, sessionId, userId, districtId),
      call(Request.getPermissions, sessionId, teacherId),
      call(Request.getPasswordConfig, sessionId),
    ]);

    if (userType === USER_TYPE.Teacher) {
      yield all([
        put(AppActions.updateProfileRequestSuccess(profileDetails)),
        put(AppActions.schoolsAndClassesRequestSuccess(schoolsAndClassesDetails)),
        put(AppActions.permissionsRequestSuccess(permissionData)),
        put(AppActions.passwordConfigRequestSuccess(passwordConfig)),
      ]);
    } else {
      yield all([
        put(Actions.addEditTeacherRequestProfileDetailsSuccess(profileDetails)),
        put(Actions.addEditTeacherRequestSchoolsAndClassesSuccess(schoolsAndClassesDetails)),
        put(Actions.addEditTeacherRequestPermissionsSuccess(permissionData)),
        put(Actions.addEditTeacherRequestPasswordConfigSuccess(passwordConfig)),
      ]);
    }
    yield put(Actions.addEditTeacherRequestSuccess());
  } catch (e) {
    yield put(Actions.addEditTeacherRequestFailure(e));
  }
}

export function* postAddTeacherFlow(action) {
  try {
    yield put(showLoading());

    const sessionId = yield select(Selectors.makeSelectProfileSessionId());
    const userOrgId = yield select(Selectors.makeSelectProfileUserOrgId());

    const schoolId = yield select(makeSelectedActiveSchoolId());
    const gradeId = yield select(makeSelectedActiveGradeId());

    const addTeacherData = transformDataForProfileAdd(
      action.profileData,
      action.permissionIds,
      userOrgId,
      USER_ORG.School
    );

    yield call(Request.postAddSLMSAccount, sessionId, addTeacherData);
    yield put(Actions.postAddTeacherRequestSuccess());

    // Refresh profile page details
    const userId = yield select(Selectors.makeSelectProfileUserId());
    const profileDetails = yield call(Request.getProfileData, sessionId, userId);
    yield put(AppActions.updateProfileRequestSuccess(profileDetails));

    if (gradeId !== '') {
      yield put(gradeRedirection(gradeId));
    } else if (schoolId !== '') {
      yield put(schoolRedirection(schoolId));
    }

    yield put(hideLoading());
    yield put(hideModal());
  } catch (e) {
    yield put(stopSubmit(Constants.FORM_TEACHER_PROFILE, e));

    yield put(Actions.postAddTeacherRequestFailure());
    yield put(hideLoading());
  }
}

export function* postSaveTeacherFlow(action) {
  try {
    yield put(showLoading());

    const permissionData = yield select(Selectors.makeSelectPermissionsData());
    const sessionId = yield select(Selectors.makeSelectProfileSessionId());
    const userOrgType = yield select(Selectors.makeSelectLoginUserOrg());
    const userOrgId = yield select(Selectors.makeSelectProfileUserOrgId());

    const teacherId = yield select(makeSelectedActiveTeacherId());
    const userId = yield select(Selectors.makeSelectProfileUserId());
    const editUserId = teacherId !== '' ? teacherId : userId;

    let permissions = createPermissionsObj(permissionData);

    let schoolId = yield select(makeSelectedActiveSchoolId());

    if (userOrgType === USER_ORG.School) {
      schoolId = userOrgId;
    }
    const gradeId = yield select(makeSelectedActiveGradeId());

    if (teacherId !== '') {
      permissions = createPermissionFromIds(action.permissionIds);
    }

    const updateData = transformDataForProfileUpdate(
      action.profileData,
      permissions,
      editUserId,
      USER_ORG.School,
      undefined // This is expected for the Teacher payload
    );

    yield call(Request.postUpdateSLMSAccount, sessionId, updateData);

    yield put(Actions.postSaveTeacherRequestSuccess());

    // Refresh profile details
    if (teacherId !== '') {
      const profilePageDetails = yield call(
        ProfileRequest.getTeacherProfilePageData,
        sessionId,
        editUserId
      );
      yield put(ProfilePageActions.profilePageRequestSuccess(profilePageDetails));
    }

    const profileDetails = yield call(Request.getProfileData, sessionId, userId);
    yield put(AppActions.updateProfileRequestSuccess(profileDetails));

    if (gradeId !== '') {
      yield put(gradeRedirection(gradeId));
    } else if (schoolId !== '') {
      yield put(schoolRedirection(schoolId));
    }

    if (teacherId !== '') {
      yield put(teacherRedirection(teacherId));
    }

    yield put(hideLoading());
    yield put(hideModal());
  } catch (e) {
    yield put(stopSubmit(Constants.FORM_TEACHER_PROFILE, e));

    yield put(Actions.postSaveTeacherRequestFailure());
    yield put(hideLoading());
  }
}

export function* postSaveTeacherMIAFlow(action) {
  try {
    yield put(showLoading());

    const permissionData = yield select(Selectors.makeSelectPermissionsData());
    const sessionId = yield select(Selectors.makeSelectProfileSessionId());
    const teacherId = action && action.editTeacherId;

    let permissions = createPermissionsObj(permissionData);

    if (teacherId !== '') {
      permissions = createPermissionFromIds(action.permissionIds);
    }

    const updateData = transformDataForProfileUpdate(
      action.profileData,
      permissions,
      teacherId,
      USER_ORG.School,
      undefined // This is expected for the Teacher payload
    );

    yield call(Request.postUpdateSLMSAccount, sessionId, updateData);

    yield put(Actions.postSaveTeacherRequestSuccess());

    // Refresh list of schools
    yield put(AppActions.updateUserData());

    // teacher reassign complete, issue request to refresh mia page
    yield put(MIAActions.getInactiveCohortMembersRequest(action.searchOpts));

    yield put(hideLoading());
    yield put(hideModal());
  } catch (e) {
    yield put(stopSubmit(Constants.FORM_TEACHER_PROFILE, e));

    yield put(Actions.postSaveTeacherRequestFailure());
    yield put(hideLoading());
  }
}

export default function* defaultSaga() {
  yield takeLatest(Constants.ADD_EDIT_TEACHER_REQUEST, addEditTeacherFlow);
  yield takeLatest(Constants.POST_ADD_TEACHER_REQUEST, postAddTeacherFlow);
  yield takeLatest(Constants.POST_SAVE_TEACHER_REQUEST, postSaveTeacherFlow);
  yield takeLatest(Constants.POST_SAVE_TEACHER_MIA_REQUEST, postSaveTeacherMIAFlow);
}
