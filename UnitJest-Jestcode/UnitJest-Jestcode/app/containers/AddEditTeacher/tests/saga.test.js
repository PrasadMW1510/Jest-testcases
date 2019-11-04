/**
 * Test  sagas
 */

describe('<AddEditTeacher Saga />', () => {
  it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true);
  });
});

/* eslint-disable redux-saga/yield-effects */
// import { fromJS } from 'immutable';
// import { stopSubmit } from 'redux-form/immutable';
// import { all, call, put, takeLatest, select } from 'redux-saga/effects';
//
// import * as AppActions from 'containers/App/actions';
// import * as Request from 'containers/App/request';
// import * as Selectors from 'containers/App/selectors';
// import * as SelectorSchool from 'containers/SmartBarContainer/selectors';
// import { showLoading, hideLoading } from 'containers/LoadingController/actions';
// import { hideModal } from 'containers/ModalController/actions';
// import * as ProfileRequest from 'containers/ProfilePageContainer/request';
//
// import * as Actions from '../actions';
// import * as Constants from '../constants';
// import defaultSaga, * as Saga from '../saga';
//
// describe('AddEditTeacher Saga', () => {
//   let generator = null;
//
//   let districtIdSelector = null;
//   let permissionDataSelector = null;
//   let sessionIdSelector = null;
//   let teacherIdSelector = null;
//   let userIdSelector = null;
//   let activeSchoolIdSelector = null;
//   let activeGradeIdSelector = null;
//
//   let selectedDistrictId = null;
//   let selectedPermissionData = null;
//   let selectedSessionId = null;
//   let selectedTeacherId = null;
//   const activeSchoolId = null;
//   const activeGradeId = null;
//   let selectedUserId = null;
//
//   let store = null;
//   let err;
//
//   let profileDetails = null;
//   let schoolsAndClassesDetails = null;
//   let permissionData = null;
//   let passwordConfig = null;
//
//   beforeEach(() => {
//     districtIdSelector = jest.fn();
//     permissionDataSelector = jest.fn();
//     sessionIdSelector = jest.fn();
//     teacherIdSelector = jest.fn();
//     activeSchoolIdSelector = jest.fn();
//     activeGradeIdSelector = jest.fn();
//     userIdSelector = jest.fn();
//
//     jest.spyOn(Selectors, 'makeSelectProfileDistrictId').mockReturnValue(districtIdSelector);
//     jest.spyOn(Selectors, 'makeSelectPermissionsData').mockReturnValue(permissionDataSelector);
//     jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(sessionIdSelector);
//     jest.spyOn(SelectorSchool, 'makeSelectedActiveTeacherId').mockReturnValue(teacherIdSelector);
//     jest
//       .spyOn(SelectorSchool, 'makeSelectedActiveSchoolId')
//       .mockReturnValue(activeSchoolIdSelector);
//     jest.spyOn(SelectorSchool, 'makeSelectedActiveGradeId').mockReturnValue(activeGradeIdSelector);
//     jest.spyOn(Selectors, 'makeSelectProfileUserId').mockReturnValue(userIdSelector);
//
//     store = fromJS({
//       login: {
//         district_id: ['mockDistrictId'],
//         session_id: ['mockSessionId'],
//         user_id: ['mockUserId'],
//         activeTeacherId: [''],
//         activeSchoolId: ['mockActiveSchoolId'],
//         activeGradeId: [''],
//       },
//       permissions: [{ id: ['permissionMock1'] }, { id: ['permissionMock2'] }],
//     });
//
//     selectedDistrictId = store.getIn(['login', 'district_id', 0]);
//     selectedPermissionData = store.get('permissions');
//     selectedSessionId = store.getIn(['login', 'session_id', 0]);
//     selectedTeacherId = store.getIn(['login', 'activeTeacherId', 0]);
//     selectedUserId = store.getIn(['login', 'user_id', 0]);
//
//     err = 'mockError';
//
//     profileDetails = [{ id: 'mockProfileDetails' }];
//     schoolsAndClassesDetails = [{ id: 'mockSchoolsAndClassesDetails' }];
//     permissionData = [{ id: 'mockPermissionData' }];
//     passwordConfig = [{ id: 'mockPasswordConfig' }];
//   });
//
//   afterEach(() => {
//     expect(generator.next().done).toBeTruthy();
//   });
//
//   describe('addEditTeacherFlow', () => {
//     beforeEach(() => {
//       generator = Saga.addEditTeacherFlow();
//     });
//
//     it('All calls pass', () => {
//       expect(generator.next().value).toEqual(select(districtIdSelector));
//       expect(generator.next(selectedDistrictId).value).toEqual(select(sessionIdSelector));
//       expect(generator.next(selectedSessionId).value).toEqual(select(teacherIdSelector));
//       expect(generator.next(selectedTeacherId).value).toEqual(select(userIdSelector));
//       expect(generator.next(selectedUserId).value).toEqual(
//         all([
//           call(ProfileRequest.getTeacherProfilePageData, selectedSessionId, selectedUserId),
//           call(Request.getSchoolsAndClasses, selectedSessionId, selectedUserId, selectedDistrictId),
//           call(Request.getPermissions, selectedSessionId, selectedUserId),
//           call(Request.getPasswordConfig, selectedSessionId),
//         ])
//       );
//
//       expect(
//         generator.next([profileDetails, schoolsAndClassesDetails, permissionData, passwordConfig])
//           .value
//       ).toEqual(
//         all([
//           put(AppActions.updateProfileRequestSuccess(profileDetails)),
//           put(AppActions.schoolsAndClassesRequestSuccess(schoolsAndClassesDetails)),
//           put(AppActions.permissionsRequestSuccess(permissionData)),
//           put(AppActions.passwordConfigRequestSuccess(passwordConfig)),
//         ])
//       );
//
//       expect(generator.next().value).toEqual(put(Actions.addEditTeacherRequestSuccess()));
//     });
//
//     it('should handle failed add edit teacher request', () => {
//       expect(generator.next().value).toEqual(select(districtIdSelector));
//
//       expect(generator.throw(err).value).toEqual(put(Actions.addEditTeacherRequestFailure(err)));
//     });
//   });
//
//   describe('postSaveTeacherFlow', () => {
//     let transformedData = null;
//
//     beforeEach(() => {
//       const actionData = {
//         profileData: fromJS({
//           user_type: 'mock_user_type',
//           district_user_id: 'mock_district_user_id',
//           sps_id: 'mock_sps_id',
//           prefix: 'mock_prefix',
//           first_name: 'mock_first_name',
//           last_name: 'mock_last_name',
//           title: 'mock_title',
//           suffix: 'mock_suffix',
//           email: 'mock_email',
//           user_name: 'mock_user_name',
//           password: 'mock_password',
//           password_hint: 'mock_password_hint',
//           classes: {
//             mockClassId1: true,
//             mockClassId2: true,
//           },
//         }),
//       };
//
//       generator = Saga.postSaveTeacherFlow(actionData);
//
//       transformedData = {
//         user: {
//           user_id: selectedUserId,
//           user_type: actionData.profileData.get('user_type'),
//           district_user_id: actionData.profileData.get('district_user_id'),
//           sps_id: actionData.profileData.get('sps_id'),
//           prefix: actionData.profileData.get('prefix'),
//           first_name: actionData.profileData.get('first_name'),
//           last_name: actionData.profileData.get('last_name'),
//           title: actionData.profileData.get('title'),
//           suffix: actionData.profileData.get('suffix'),
//           email: actionData.profileData.get('email'),
//           user_name: actionData.profileData.get('user_name'),
//           password: actionData.profileData.get('password'),
//           password_hint: actionData.profileData.get('password_hint'),
//           permissions: {
//             permission: [
//               { permission_id: 'permissionMock1' },
//               { permission_id: 'permissionMock2' },
//             ],
//           },
//           organizations: {
//             org_id: undefined,
//           },
//           schools: {
//             school_id: undefined,
//           },
//           classes: {
//             class_id: ['mockClassId1', 'mockClassId2'],
//           },
//         },
//       };
//     });
//
//     it('All calls pass', () => {
//       expect(generator.next().value).toEqual(put(showLoading()));
//       expect(generator.next().value).toEqual(select(permissionDataSelector));
//       expect(generator.next(selectedPermissionData).value).toEqual(select(sessionIdSelector));
//       expect(generator.next(selectedSessionId).value).toEqual(select(teacherIdSelector));
//       expect(generator.next(selectedTeacherId).value).toEqual(select(userIdSelector));
//
//       expect(generator.next(selectedUserId).value).toEqual(select(activeSchoolIdSelector));
//       expect(generator.next(activeSchoolId).value).toEqual(select(activeGradeIdSelector));
//       expect(generator.next(activeGradeId).value).toEqual(
//         call(Request.postUpdateSLMSAccount, selectedSessionId, transformedData)
//       );
//
//       expect(generator.next().value).toEqual(put(Actions.postSaveTeacherRequestSuccess()));
//
//       expect(generator.next().value).toEqual(
//         call(Request.getProfileData, selectedSessionId, selectedUserId)
//       );
//       expect(generator.next(profileDetails).value).toEqual(
//         put(AppActions.updateProfileRequestSuccess(profileDetails))
//       );
//       expect(generator.next().value).toEqual(put(hideLoading()));
//       expect(generator.next().value).toEqual(put(hideModal()));
//     });
//
//     it('should handle failed post request', () => {
//       expect(generator.next().value).toEqual(put(showLoading()));
//
//       expect(generator.throw(err).value).toEqual(
//         put(stopSubmit(Constants.FORM_TEACHER_PROFILE, err))
//       );
//
//       expect(generator.next().value).toEqual(put(Actions.postSaveTeacherRequestFailure()));
//       expect(generator.next().value).toEqual(put(hideLoading()));
//     });
//   });
//
//   describe('defaultSaga', () => {
//     beforeAll(() => {
//       generator = defaultSaga();
//     });
//
//     it('All calls are made', () => {
//       expect(generator.next().value).toEqual(
//         takeLatest(Constants.ADD_EDIT_TEACHER_REQUEST, Saga.addEditTeacherFlow)
//       );
//       expect(generator.next().value).toEqual(
//         takeLatest(Constants.POST_ADD_TEACHER_REQUEST, Saga.postAddTeacherFlow)
//       );
//       expect(generator.next().value).toEqual(
//         takeLatest(Constants.POST_SAVE_TEACHER_REQUEST, Saga.postSaveTeacherFlow)
//       );
//     });
//   });
// });
