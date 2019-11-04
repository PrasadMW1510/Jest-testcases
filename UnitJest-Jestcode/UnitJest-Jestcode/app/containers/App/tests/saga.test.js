/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { call, put, takeLatest, select, all, take, cancel } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/utils';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import { deleteLocalSLMSId, saveLocalSLMSId } from 'utils/cookieManager';
import * as SmartBarSelectors from 'containers/SmartBarContainer/selectors';
import { fromJS } from 'immutable';
import * as Request from '../request';
import * as Saga from '../saga';
import * as Actions from '../actions';
import * as Constants from '../constants';
import * as Selectors from '../selectors';

describe('Global App saga', () => {
  let generator = null;
  let username = null;
  let password = null;
  let loginDetails = null;
  let schoolDetails = null;
  let error = null;
  let loginSelector = null;
  let profileSelector = null;
  let schoolSelector = null;
  let globalSelector = null;
  let sessionIdSelector = null;
  let userIdSelector = null;

  beforeEach(() => {
    username = 'audrey';
    password = 'Welcome1';
    loginDetails = {
      session_id: ['abcdef123'],
    };
    schoolDetails = fromJS([
      {
        org_id: ['asdfas'],
      },
      {
        org_id: ['adsfasfasf'],
      },
    ]);

    error = {};
    loginSelector = jest.fn();
    profileSelector = jest.fn();
    schoolSelector = jest.fn();
    globalSelector = jest.fn();
    sessionIdSelector = jest.fn();
    userIdSelector = jest.fn();

    jest.spyOn(Selectors, 'makeSelectLoginData').mockReturnValue(loginSelector);
    jest.spyOn(Selectors, 'makeSelectProfileData').mockReturnValue(profileSelector);
    jest.spyOn(Selectors, 'makeSelectSchoolsData').mockReturnValue(schoolSelector);
    jest.spyOn(Selectors, 'makeSelectGlobal').mockReturnValue(globalSelector);
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(sessionIdSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserId').mockReturnValue(userIdSelector);
  });

  afterEach(() => {
    expect(generator.next().done).toBeTruthy();
  });

  describe('Password hint flow', () => {
    beforeEach(() => {
      generator = Saga.passwordHintFlow();
    });

    it('should always fail', () => {
      expect(generator.next().value).toEqual(
        put(
          Actions.passwordHintRequestFailure(
            'Sorry, we were unable to locate your Password Hint. Please enter your Username, and then click "Password Hint".'
          )
        )
      );
    });
  });

  describe('Login flow (non-SSO)', () => {
    beforeEach(() => {
      generator = Saga.loginFlow({ username, password });
    });

    it('Should handle successful login', () => {
      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next().value).toEqual(call(Request.getLoginData, username, password));
      expect(generator.next(loginDetails).value).toEqual(
        call(saveLocalSLMSId, loginDetails.session_id[0])
      );
      expect(generator.next().value).toEqual(put(Actions.loginCredentialsSave(loginDetails)));
      expect(generator.next().value).toEqual(call(Saga.mainLoginFlow, '/'));
    });

    it('Should handle login failure', () => {
      expect(generator.next().value).toEqual(put(showLoading()));

      expect(generator.throw(error).value).toEqual(put(Actions.loginFailure(error)));
      expect(generator.next().value).toEqual(put(hideLoading()));
    });
  });

  describe('Main Login flow', () => {
    let loginState = null;
    let mockWatcherTasks = null;
    let mockTask1 = null;
    let mockTask2 = null;

    beforeEach(() => {
      loginState = fromJS({
        user_org: [],
      });
      mockTask1 = createMockTask();
      mockTask2 = createMockTask();
      mockWatcherTasks = [mockTask1, mockTask2];
    });

    it('should not redirect', () => {
      generator = Saga.mainLoginFlow();
      expect(generator.next().value).toEqual(
        all([
          call(Saga.profileRequestFlow),
          call(Saga.programAvailableRequestFlow),
          call(Saga.permissionsRequestFlow),
        ])
      );

      expect(generator.next().value).toEqual(call(Saga.userDataUpdateFlow));

      expect(generator.next().value).toEqual(
        all([
          takeLatest(Constants.PROFILE_REQUEST, Saga.profileRequestFlow),
          takeLatest(Constants.SCHOOL_LIST_REQUEST, Saga.schoolRequestFlow),
          takeLatest(Constants.SCHOOL_USER_LOGIN_FLOW_REQUEST, Saga.schoolUserLoginFlow),
          takeLatest(Constants.UPDATE_CLASS_DATA, Saga.classUpdateFlow),
          takeLatest(Constants.UPDATE_GROUP_DATA, Saga.groupUpdateFlow),
          takeLatest(Constants.UPDATE_SCHOOL_DATA, Saga.schoolUpdateFlow),
          takeLatest(Constants.UPDATE_STUDENT_DATA, Saga.studentUpdateFlow),
          takeLatest(Constants.UPDATE_GRADE_DATA, Saga.gradeUpdateFlow),
          takeLatest(Constants.UPDATE_TEACHER_DATA, Saga.teacherUpdateFlow),
          takeLatest(Constants.PROGRAM_AVAILABLE_DATA, Saga.programAvailableRequestFlow),
          takeLatest(Constants.UPDATE_USER_DATA, Saga.userDataUpdateFlow),
          takeLatest(LOCATION_CHANGE, Saga.routeChangeFlow),
          takeLatest(Constants.PERMISSION_REQUEST, Saga.permissionsRequestFlow),
        ])
      );

      expect(generator.next(mockWatcherTasks).value).toEqual(put(Actions.loginSuccess()));
      expect(generator.next().value).toEqual(put(hideLoading()));
      expect(generator.next().value).toEqual(take(Constants.LOGOUT_REQUEST));
      expect(generator.next().value).toEqual(all(mockWatcherTasks.map(task => cancel(task))));
    });

    it('should redirect', () => {
      generator = Saga.mainLoginFlow('/');
      expect(generator.next().value).toEqual(
        all([
          call(Saga.profileRequestFlow),
          call(Saga.programAvailableRequestFlow),
          call(Saga.permissionsRequestFlow),
        ])
      );

      expect(generator.next().value).toEqual(call(Saga.userDataUpdateFlow));

      expect(generator.next().value).toEqual(
        all([
          takeLatest(Constants.PROFILE_REQUEST, Saga.profileRequestFlow),
          takeLatest(Constants.SCHOOL_LIST_REQUEST, Saga.schoolRequestFlow),
          takeLatest(Constants.SCHOOL_USER_LOGIN_FLOW_REQUEST, Saga.schoolUserLoginFlow),
          takeLatest(Constants.UPDATE_CLASS_DATA, Saga.classUpdateFlow),
          takeLatest(Constants.UPDATE_GROUP_DATA, Saga.groupUpdateFlow),
          takeLatest(Constants.UPDATE_SCHOOL_DATA, Saga.schoolUpdateFlow),
          takeLatest(Constants.UPDATE_STUDENT_DATA, Saga.studentUpdateFlow),
          takeLatest(Constants.UPDATE_GRADE_DATA, Saga.gradeUpdateFlow),
          takeLatest(Constants.UPDATE_TEACHER_DATA, Saga.teacherUpdateFlow),
          takeLatest(Constants.PROGRAM_AVAILABLE_DATA, Saga.programAvailableRequestFlow),
          takeLatest(Constants.UPDATE_USER_DATA, Saga.userDataUpdateFlow),
          takeLatest(LOCATION_CHANGE, Saga.routeChangeFlow),
          takeLatest(Constants.PERMISSION_REQUEST, Saga.permissionsRequestFlow),
        ])
      );

      expect(generator.next(mockWatcherTasks).value).toEqual(put(Actions.loginSuccess()));
      expect(generator.next().value).toEqual(put(hideLoading()));
      expect(generator.next().value).toEqual(put(push('/')));
      expect(generator.next().value).toEqual(take(Constants.LOGOUT_REQUEST));
      expect(generator.next().value).toEqual(all(mockWatcherTasks.map(task => cancel(task))));
    });

    it('should handle district admins', () => {
      loginState = loginState.setIn(['user_org', 0], Constants.COHORT_TYPE.District);

      generator = Saga.mainLoginFlow('/');
      expect(generator.next().value).toEqual(
        all([
          call(Saga.profileRequestFlow),
          call(Saga.programAvailableRequestFlow),
          call(Saga.permissionsRequestFlow),
        ])
      );

      expect(generator.next().value).toEqual(call(Saga.userDataUpdateFlow));

      expect(generator.next().value).toEqual(
        all([
          takeLatest(Constants.PROFILE_REQUEST, Saga.profileRequestFlow),
          takeLatest(Constants.SCHOOL_LIST_REQUEST, Saga.schoolRequestFlow),
          takeLatest(Constants.SCHOOL_USER_LOGIN_FLOW_REQUEST, Saga.schoolUserLoginFlow),
          takeLatest(Constants.UPDATE_CLASS_DATA, Saga.classUpdateFlow),
          takeLatest(Constants.UPDATE_GROUP_DATA, Saga.groupUpdateFlow),
          takeLatest(Constants.UPDATE_SCHOOL_DATA, Saga.schoolUpdateFlow),
          takeLatest(Constants.UPDATE_STUDENT_DATA, Saga.studentUpdateFlow),
          takeLatest(Constants.UPDATE_GRADE_DATA, Saga.gradeUpdateFlow),
          takeLatest(Constants.UPDATE_TEACHER_DATA, Saga.teacherUpdateFlow),
          takeLatest(Constants.PROGRAM_AVAILABLE_DATA, Saga.programAvailableRequestFlow),
          takeLatest(Constants.UPDATE_USER_DATA, Saga.userDataUpdateFlow),
          takeLatest(LOCATION_CHANGE, Saga.routeChangeFlow),
          takeLatest(Constants.PERMISSION_REQUEST, Saga.permissionsRequestFlow),
        ])
      );

      expect(generator.next(mockWatcherTasks).value).toEqual(put(Actions.loginSuccess()));
      expect(generator.next().value).toEqual(put(hideLoading()));
      expect(generator.next().value).toEqual(put(push('/')));
      expect(generator.next().value).toEqual(take(Constants.LOGOUT_REQUEST));
      expect(generator.next().value).toEqual(all(mockWatcherTasks.map(task => cancel(task))));
    });

    it('should handle school admins', () => {
      loginState = loginState.setIn(['user_org', 0], Constants.COHORT_TYPE.School);

      generator = Saga.mainLoginFlow('/');
      expect(generator.next().value).toEqual(
        all([
          call(Saga.profileRequestFlow),
          call(Saga.programAvailableRequestFlow),
          call(Saga.permissionsRequestFlow),
        ])
      );

      expect(generator.next().value).toEqual(call(Saga.userDataUpdateFlow));

      expect(generator.next().value).toEqual(
        all([
          takeLatest(Constants.PROFILE_REQUEST, Saga.profileRequestFlow),
          takeLatest(Constants.SCHOOL_LIST_REQUEST, Saga.schoolRequestFlow),
          takeLatest(Constants.SCHOOL_USER_LOGIN_FLOW_REQUEST, Saga.schoolUserLoginFlow),
          takeLatest(Constants.UPDATE_CLASS_DATA, Saga.classUpdateFlow),
          takeLatest(Constants.UPDATE_GROUP_DATA, Saga.groupUpdateFlow),
          takeLatest(Constants.UPDATE_SCHOOL_DATA, Saga.schoolUpdateFlow),
          takeLatest(Constants.UPDATE_STUDENT_DATA, Saga.studentUpdateFlow),
          takeLatest(Constants.UPDATE_GRADE_DATA, Saga.gradeUpdateFlow),
          takeLatest(Constants.UPDATE_TEACHER_DATA, Saga.teacherUpdateFlow),
          takeLatest(Constants.PROGRAM_AVAILABLE_DATA, Saga.programAvailableRequestFlow),
          takeLatest(Constants.UPDATE_USER_DATA, Saga.userDataUpdateFlow),
          takeLatest(LOCATION_CHANGE, Saga.routeChangeFlow),
          takeLatest(Constants.PERMISSION_REQUEST, Saga.permissionsRequestFlow),
        ])
      );

      expect(generator.next(mockWatcherTasks).value).toEqual(put(Actions.loginSuccess()));
      expect(generator.next().value).toEqual(put(hideLoading()));
      expect(generator.next().value).toEqual(put(push('/')));
      expect(generator.next().value).toEqual(take(Constants.LOGOUT_REQUEST));
      expect(generator.next().value).toEqual(all(mockWatcherTasks.map(task => cancel(task))));
    });
  });

  describe('route change flow', () => {
    let action = null;

    describe('going to home page', () => {
      beforeEach(() => {
        action = { payload: { pathname: '/' } };
        generator = Saga.routeChangeFlow(action);
      });

      it('should update user data', () => {
        expect(generator.next().value).toEqual(call(Saga.userDataUpdateFlow));
      });
    });

    describe('going to anything besides home page', () => {
      beforeEach(() => {
        action = { payload: { roster: '/roster' } };
        generator = Saga.routeChangeFlow(action);
      });

      it('should not update user data', () => {
        expect(generator.next().value).toBeUndefined();
        expect(generator.next().done).toBeTruthy();
      });
    });
  });

  describe('user data update flow', () => {
    let loginState = null;

    beforeEach(() => {
      generator = Saga.userDataUpdateFlow();
    });

    it('should handle district users', () => {
      loginState = fromJS({
        user_org: [Constants.COHORT_TYPE.District],
      });
      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.next(loginState).value).toEqual(call(Saga.districtUserLoginFlow));
    });

    it('should handle school users', () => {
      loginState = fromJS({
        user_org: [Constants.COHORT_TYPE.School],
      });
      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.next(loginState).value).toEqual(call(Saga.schoolUserLoginFlow));
    });

    it('should handle teacher users', () => {
      loginState = fromJS({
        user_org: [],
      });
      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.next(loginState).value).toEqual(call(Saga.teacherUserLoginFlow));
    });
  });

  describe('SLMS Login flow', () => {
    describe('SSO login', () => {
      beforeEach(() => {
        generator = Saga.slmsLoginFlow(Actions.ssoLogin(loginDetails.session_id[0]));
        error = 'Invalid session id.';
      });

      it('Should handle successful login', () => {
        expect(generator.next().value).toEqual(
          call(Request.getLoginDataSLMSID, loginDetails.session_id[0])
        );
        expect(generator.next(loginDetails).value).toEqual(
          put(Actions.loginCredentialsSave(loginDetails))
        );
        expect(generator.next().value).toEqual(call(Saga.mainLoginFlow));
      });

      it('Should handle login failure by redirecting to LLO', () => {
        expect(generator.next().value).toEqual(
          call(Request.getLoginDataSLMSID, loginDetails.session_id[0])
        );
        expect(generator.throw(error).value).toEqual(
          call(window.location.replace, 'null/client/?LLO=true')
        );
      });
    });

    describe('Local re-login', () => {
      beforeEach(() => {
        generator = Saga.slmsLoginFlow(Actions.localRelogin(loginDetails.session_id[0]));
        error = 'Invalid session id.';
      });

      it('Should handle successful login', () => {
        expect(generator.next().value).toEqual(
          call(Request.getLoginDataSLMSID, loginDetails.session_id[0])
        );
        expect(generator.next(loginDetails).value).toEqual(
          put(Actions.loginCredentialsSave(loginDetails))
        );
        expect(generator.next().value).toEqual(call(Saga.mainLoginFlow));
      });

      it('Should handle login failure', () => {
        expect(generator.next().value).toEqual(
          call(Request.getLoginDataSLMSID, loginDetails.session_id[0])
        );
        expect(generator.throw(error).value).toEqual(call(deleteLocalSLMSId));
        expect(generator.next().value).toEqual(
          all([put(push('/login')), put(Actions.loginFailure('Invalid session id.'))])
        );
      });
    });
  });

  describe('School user login flow', () => {
    let loginState = null;
    let classDetails = null;
    let teacherDetails = null;
    let gradeDetails = null;

    beforeEach(() => {
      loginState = fromJS({
        session_id: ['adsfadsf'],
        user_id: ['id1'],
        user_org_id: ['schoolid1'],
      });
      generator = Saga.schoolUserLoginFlow();
      error = 'Invalid session id.';

      classDetails = {};
      teacherDetails = {};
      gradeDetails = {};
    });

    it('Should handle successful login', () => {
      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.next(loginState).value).toEqual(select(sessionIdSelector));
      expect(generator.next(loginState.getIn(['session_id', 0])).value).toEqual(
        select(userIdSelector)
      );
      expect(generator.next(loginState.getIn(['user_id', 0])).value).toEqual(
        all([
          call(
            Request.getClassDataBySchool,
            loginState.getIn(['session_id', 0]),
            loginState.getIn(['user_org_id', 0]),
            loginState.getIn(['user_id', 0])
          ),
          call(
            Request.getTeacherDataBySchool,
            loginState.getIn(['session_id', 0]),
            loginState.getIn(['user_org_id', 0]),
            loginState.getIn(['user_id', 0])
          ),
          call(
            Request.getGradeDataBySchool,
            loginState.getIn(['session_id', 0]),
            loginState.getIn(['user_org_id', 0]),
            loginState.getIn(['user_id', 0])
          ),
        ])
      );

      expect(generator.next([classDetails, teacherDetails, gradeDetails]).value).toEqual(
        put(Actions.classListRequestSuccess(classDetails))
      );
      expect(generator.next().value).toEqual(
        put(Actions.teacherListRequestSuccess(teacherDetails))
      );
      expect(generator.next().value).toEqual(put(Actions.gradeListRequestSuccess(gradeDetails)));
      expect(generator.next().value).toEqual(put(Actions.updateSchoolAdminDataSuccess()));
    });

    it('Should handle login failure', () => {
      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.throw(error).value).toEqual(put(Actions.updateSchoolDataFailure(error)));
    });
  });

  describe('Teacher login flow', () => {
    let profileState = null;

    beforeEach(() => {
      profileState = fromJS({
        user_id: ['userid1'],
        organizations: [
          {
            organization: [
              {
                org_id: 'orgid1',
              },
            ],
          },
        ],
      });
      generator = Saga.teacherUserLoginFlow();
    });

    it('Should handle successful login for one school', () => {
      expect(generator.next().value).toEqual(select(profileSelector));
      expect(generator.next(profileState).value).toEqual(
        call(
          Saga.teacherUpdateFlow,
          Actions.updateTeacherData(
            profileState.getIn(['user_id', 0]),
            profileState.getIn(['organizations', 0, 'organization', 0, 'org_id', 0])
          )
        )
      );
    });

    it('Should handle successful login for multiple schools', () => {
      profileState = fromJS({
        user_id: ['userid1'],
        organizations: [
          {
            organization: [
              {
                org_id: 'orgid1',
              },
              {
                org_id: 'orgid2',
              },
            ],
          },
        ],
      });

      expect(generator.next().value).toEqual(select(profileSelector));
      expect(generator.next(profileState).value).toEqual(call(Saga.schoolRequestFlow));
    });
  });

  describe('District login flow', () => {
    let loginState = null;

    beforeEach(() => {
      loginState = fromJS({
        session_id: ['sid1'],
        user_org_id: ['orgid1'],
      });
      generator = Saga.districtUserLoginFlow();
    });

    it('Should handle successful login', () => {
      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.next(loginState).value).toEqual(select(sessionIdSelector));
      expect(generator.next(loginState.getIn(['session_id', 0])).value).toEqual(
        call(
          Request.getSchoolDataByDistrict,
          loginState.getIn(['session_id', 0]),
          loginState.getIn(['user_org_id', 0])
        )
      );
      expect(generator.next(schoolDetails).value).toEqual(
        put(Actions.schoolListRequestSuccess(schoolDetails))
      );
    });

    it('Should handle login failure', () => {
      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.throw(error).value).toEqual(put(Actions.schoolListRequestFailure(error)));
    });
  });

  describe('Class Update Flow', () => {
    let store = null;
    let err = null;
    let action = null;
    let groupDetails = null;
    let studentDetails = null;

    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfczas111'],
          user_id: ['user123'],
        },
        profile: {
          school_id: ['my_school'],
        },
      });

      groupDetails = {};
      studentDetails = {};

      err = 'no class found';

      action = {
        classId: 1,
      };

      generator = Saga.classUpdateFlow(action);
    });

    it('Should handle successful class update request', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));

      expect(generator.next(store.getIn(['login', 'session_id', 0])).value).toEqual(
        all([
          call(
            Request.getGroupDataByClass,
            store.getIn(['login', 'session_id', 0]),
            action.classId
          ),
          call(
            Request.getStudentDataByClass,
            store.getIn(['login', 'session_id', 0]),
            action.classId
          ),
        ])
      );

      expect(generator.next([groupDetails, studentDetails]).value).toEqual(
        put(Actions.groupListRequestSuccess(groupDetails))
      );

      expect(generator.next().value).toEqual(
        put(Actions.studentListRequestSuccess(studentDetails))
      );

      expect(generator.next().value).toEqual(put(Actions.updateClassDataSuccess()));
    });

    it('Should handle failed class update request', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));

      expect(generator.throw(err).value).toEqual(put(Actions.updateClassDataFailure(err)));
    });
  });

  describe('Teacher Update Flow', () => {
    let store = null;
    let err = null;
    let action = null;
    let groupDetails = null;
    let classDetails = null;
    let studentDetails = null;

    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfczas111'],
          user_id: ['user123'],
          user_org_id: ['aasdfzx'],
        },
      });

      classDetails = {};
      groupDetails = {};
      studentDetails = {};

      err = 'no teacher found';

      action = {
        schoolId: 1,
      };

      generator = Saga.teacherUpdateFlow(action);
    });

    it('Should handle successful teacher update request', () => {
      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.next(store.get('login')).value).toEqual(select(sessionIdSelector));

      expect(generator.next(store.getIn(['login', 'session_id', 0])).value).toEqual(
        all([
          call(
            Request.getClassData,
            store.getIn(['login', 'session_id', 0]),
            action.schoolId,
            action.teacherId
          ),
          call(
            Request.getGroupDataBySchool,
            store.getIn(['login', 'session_id', 0]),
            action.schoolId,
            action.teacherId
          ),
          call(
            Request.getStudentDataBySchool,
            store.getIn(['login', 'session_id', 0]),
            action.schoolId,
            action.teacherId
          ),
        ])
      );

      expect(generator.next([classDetails, groupDetails, studentDetails]).value).toEqual(
        put(Actions.classListRequestSuccess(classDetails))
      );

      expect(generator.next().value).toEqual(put(Actions.groupListRequestSuccess(groupDetails)));

      expect(generator.next().value).toEqual(
        put(Actions.studentListRequestSuccess(studentDetails))
      );

      expect(generator.next().value).toEqual(put(Actions.updateTeacherDataSuccess()));
    });

    it('Should handle successful teacher update request with no specified school id', () => {
      generator = Saga.teacherUpdateFlow({ ...action, schoolId: undefined });

      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.next(store.get('login')).value).toEqual(select(sessionIdSelector));

      expect(generator.next(store.getIn(['login', 'session_id', 0])).value).toEqual(
        all([
          call(
            Request.getClassData,
            store.getIn(['login', 'session_id', 0]),
            store.getIn(['login', 'user_org_id', 0]),
            action.teacherId
          ),
          call(
            Request.getGroupDataBySchool,
            store.getIn(['login', 'session_id', 0]),
            store.getIn(['login', 'user_org_id', 0]),
            action.teacherId
          ),
          call(
            Request.getStudentDataBySchool,
            store.getIn(['login', 'session_id', 0]),
            store.getIn(['login', 'user_org_id', 0]),
            action.teacherId
          ),
        ])
      );

      expect(generator.next([classDetails, groupDetails, studentDetails]).value).toEqual(
        put(Actions.classListRequestSuccess(classDetails))
      );

      expect(generator.next().value).toEqual(put(Actions.groupListRequestSuccess(groupDetails)));

      expect(generator.next().value).toEqual(
        put(Actions.studentListRequestSuccess(studentDetails))
      );

      expect(generator.next().value).toEqual(put(Actions.updateTeacherDataSuccess()));
    });

    it('Should handle failed teacher update request', () => {
      expect(generator.next().value).toEqual(select(loginSelector));

      expect(generator.throw(err).value).toEqual(put(Actions.updateTeacherDataFailure(err)));
    });
  });

  describe('Grade Update Flow', () => {
    let store = null;
    let err = null;
    let action = null;
    let teacherDetails = null;
    let classDetails = null;
    let studentDetails = null;

    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfczas111'],
          user_id: ['user123'],
          user_org_id: ['aasdfzx'],
        },
      });

      classDetails = {};
      teacherDetails = {};
      studentDetails = {};

      err = 'no grade found';

      action = {
        schoolId: 1,
        gradeId: 2,
      };

      generator = Saga.gradeUpdateFlow(action);
    });

    it('Should handle successful teacher update request', () => {
      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.next(store.get('login')).value).toEqual(select(sessionIdSelector));

      expect(generator.next(store.getIn(['login', 'session_id', 0])).value).toEqual(
        all([
          call(
            Request.getClassDataByGradeSchool,
            store.getIn(['login', 'session_id', 0]),
            action.schoolId,
            action.gradeId
          ),
          call(
            Request.getTeacherDataByGradeSchool,
            store.getIn(['login', 'session_id', 0]),
            action.schoolId,
            action.gradeId
          ),
          call(
            Request.getStudentDataByGradeSchool,
            store.getIn(['login', 'session_id', 0]),
            action.schoolId,
            action.gradeId
          ),
        ])
      );

      expect(generator.next([classDetails, teacherDetails, studentDetails]).value).toEqual(
        put(Actions.classListRequestSuccess(classDetails))
      );

      expect(generator.next().value).toEqual(
        put(Actions.teacherListRequestSuccess(teacherDetails))
      );

      expect(generator.next().value).toEqual(
        put(Actions.studentListRequestSuccess(studentDetails))
      );

      expect(generator.next().value).toEqual(put(Actions.updateGradeDataSuccess()));
    });

    it('Should handle successful teacher update request with no specified school id', () => {
      generator = Saga.gradeUpdateFlow({ ...action, schoolId: undefined });

      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.next(store.get('login')).value).toEqual(select(sessionIdSelector));

      expect(generator.next(store.getIn(['login', 'session_id', 0])).value).toEqual(
        all([
          call(
            Request.getClassDataByGradeSchool,
            store.getIn(['login', 'session_id', 0]),
            store.getIn(['login', 'user_org_id', 0]),
            action.gradeId
          ),
          call(
            Request.getTeacherDataByGradeSchool,
            store.getIn(['login', 'session_id', 0]),
            store.getIn(['login', 'user_org_id', 0]),
            action.gradeId
          ),
          call(
            Request.getStudentDataByGradeSchool,
            store.getIn(['login', 'session_id', 0]),
            store.getIn(['login', 'user_org_id', 0]),
            action.gradeId
          ),
        ])
      );

      expect(generator.next([classDetails, teacherDetails, studentDetails]).value).toEqual(
        put(Actions.classListRequestSuccess(classDetails))
      );

      expect(generator.next().value).toEqual(
        put(Actions.teacherListRequestSuccess(teacherDetails))
      );

      expect(generator.next().value).toEqual(
        put(Actions.studentListRequestSuccess(studentDetails))
      );

      expect(generator.next().value).toEqual(put(Actions.updateGradeDataSuccess()));
    });

    it('Should handle failed teacher update request', () => {
      expect(generator.next().value).toEqual(select(loginSelector));

      expect(generator.throw(err).value).toEqual(put(Actions.updateGradeDataFailure(err)));
    });
  });

  describe('Profile request flow', () => {
    let store = null;
    let profileDetails = null;
    let err = null;

    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfczas111'],
          user_id: ['user123'],
        },
        profile: {
          school_id: ['my_school'],
        },
      });

      profileDetails = { firstName: 'John', lastName: 'Smith' };

      err = 'no profile found';

      generator = Saga.profileRequestFlow();
    });

    it('Should handle successful profile request', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(store.getIn(['login', 'session_id', 0])).value).toEqual(
        select(userIdSelector)
      );

      expect(generator.next(store.getIn(['login', 'user_id', 0])).value).toEqual(
        call(
          Request.getProfileData,
          store.getIn(['login', 'session_id', 0]),
          store.getIn(['login', 'user_id', 0])
        )
      );

      expect(generator.next(profileDetails).value).toEqual(
        put(Actions.profileRequestSuccess(profileDetails))
      );
    });

    it('Should handle failed profile request', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));

      expect(generator.throw(err).value).toEqual(put(Actions.profileRequestFailure(err)));
    });
  });

  describe('School request flow', () => {
    let store = null;
    let err = null;

    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfczas111'],
          user_id: ['user123'],
        },
        profile: {
          school_id: ['my_school'],
        },
      });

      err = 'no profile found';

      generator = Saga.schoolRequestFlow();
    });

    it('Should handle successful school request', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(store.getIn(['login', 'session_id', 0])).value).toEqual(
        select(userIdSelector)
      );

      expect(generator.next(store.getIn(['login', 'user_id', 0])).value).toEqual(
        call(
          Request.getSchoolData,
          store.getIn(['login', 'session_id', 0]),
          store.getIn(['login', 'user_id', 0])
        )
      );

      expect(generator.next(schoolDetails).value).toEqual(
        put(Actions.schoolListRequestSuccess(schoolDetails))
      );
    });

    it('Should handle failed school request', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));

      expect(generator.throw(err).value).toEqual(put(Actions.schoolListRequestFailure(err)));
    });
  });
  describe('Program available request flow', () => {
    let store = null;
    let ProgramDetails = null;
    let err = null;

    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfczas111'],
        },
        serverAssets: {
          array: ['$'],
        },
      });

      ProgramDetails = [{ id: 'CDX' }, { id: 'FM' }, { id: 'E3D' }];

      err = 'no prgrsm found';

      generator = Saga.programAvailableRequestFlow();
    });

    it('Should handle successful Program request', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));

      expect(generator.next(store.getIn(['login', 'session_id', 0])).value).toEqual(
        call(Request.getProgramList, store.getIn(['login', 'session_id', 0]))
      );

      expect(generator.next(ProgramDetails).value).toEqual(
        put(Actions.programAvailableRequestSuccess(ProgramDetails))
      );
    });

    it('Should handle failed Program request', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));

      expect(generator.throw(err).value).toEqual(put(Actions.programAvailableRequestFailure(err)));
    });
  });

  describe('School update flow', () => {
    let store = null;
    let gradeDetails = null;
    let teacherDetails = null;
    let classDetails = null;
    let groupDetails = null;
    let studentDetails = null;
    let action = null;
    let err = null;

    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfczas111'],
          user_id: ['user123'],
          user_org: [Constants.COHORT_TYPE.District],
        },
        profile: {
          school_id: ['my_school'],
        },
      });

      gradeDetails = [{ id: 1 }, { id: 2 }, { id: 3 }];
      teacherDetails = [{ id: 1 }, { id: 2 }, { id: 3 }];
      classDetails = [{ id: 1 }, { id: 2 }, { id: 3 }];
      groupDetails = [{ id: 1 }, { id: 2 }, { id: 3 }];
      studentDetails = [{ id: 1 }, { id: 2 }, { id: 3 }];

      err = 'no profile found';

      action = {
        schoolId: 'adsfasfa',
      };

      generator = Saga.schoolUpdateFlow(action);
    });

    it('Should handle successful school update request', () => {
      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.next(store.get('login')).value).toEqual(select(sessionIdSelector));
      expect(generator.next(store.getIn(['login', 'session_id', 0])).value).toEqual(
        select(userIdSelector)
      );

      expect(generator.next(store.getIn(['login', 'user_id', 0])).value).toEqual(
        all([
          call(
            Request.getTeacherDataBySchool,
            store.getIn(['login', 'session_id', 0]),
            action.schoolId
          ),
          call(
            Request.getGradeDataBySchool,
            store.getIn(['login', 'session_id', 0]),
            action.schoolId
          ),
        ])
      );

      expect(generator.next([teacherDetails, gradeDetails]).value).toEqual(
        put(Actions.teacherListRequestSuccess(teacherDetails))
      );

      expect(generator.next().value).toEqual(put(Actions.gradeListRequestSuccess(gradeDetails)));
      expect(generator.next().value).toEqual(put(Actions.updateSchoolDataSuccess()));
    });

    it('Should handle successful school update request for teachers', () => {
      store = fromJS({
        login: {
          session_id: ['adsfczas111'],
          user_id: ['user123'],
          user_org: [],
        },
        profile: {
          school_id: ['my_school'],
        },
      });

      expect(generator.next().value).toEqual(select(loginSelector));
      expect(generator.next(store.get('login')).value).toEqual(select(sessionIdSelector));
      expect(generator.next(store.getIn(['login', 'session_id', 0])).value).toEqual(
        select(userIdSelector)
      );

      expect(generator.next(store.getIn(['login', 'user_id', 0])).value).toEqual(
        all([
          call(
            Request.getClassData,
            store.getIn(['login', 'session_id', 0]),
            action.schoolId,
            store.getIn(['login', 'user_id', 0])
          ),
          call(
            Request.getGroupDataBySchool,
            store.getIn(['login', 'session_id', 0]),
            action.schoolId,
            store.getIn(['login', 'user_id', 0])
          ),
          call(
            Request.getStudentDataBySchool,
            store.getIn(['login', 'session_id', 0]),
            action.schoolId,
            store.getIn(['login', 'user_id', 0])
          ),
        ])
      );

      expect(generator.next([classDetails, groupDetails, studentDetails]).value).toEqual(
        put(Actions.classListRequestSuccess(classDetails))
      );

      expect(generator.next().value).toEqual(put(Actions.groupListRequestSuccess(groupDetails)));
      expect(generator.next().value).toEqual(
        put(Actions.studentListRequestSuccess(studentDetails))
      );
      expect(generator.next().value).toEqual(put(Actions.updateSchoolDataSuccessTeacher()));
    });

    it('Should handle failed school update request', () => {
      expect(generator.next().value).toEqual(select(loginSelector));

      expect(generator.throw(err).value).toEqual(put(Actions.updateSchoolDataFailure(err)));
    });
  });

  describe('Group update flow', () => {
    let store = null;
    let studentDetails = null;
    let action = null;
    let err = null;

    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfczas111'],
          user_id: ['user123'],
        },
        profile: {
          school_id: ['my_school'],
        },
      });

      studentDetails = [{ id: 1 }, { id: 2 }, { id: 3 }];

      err = 'no profile found';

      action = {
        groupId: 'adsfasfa',
      };

      generator = Saga.groupUpdateFlow(action);
    });

    it('Should handle successful group update request', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));

      expect(generator.next(store.getIn(['login', 'session_id', 0])).value).toEqual(
        call(Request.getStudentDataByGroup, store.getIn(['login', 'session_id', 0]), action.groupId)
      );

      expect(generator.next(studentDetails).value).toEqual(
        put(Actions.studentListRequestSuccess(studentDetails))
      );

      expect(generator.next().value).toEqual(put(Actions.updateGroupDataSuccess()));
    });

    it('Should handle failed group update request', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));

      expect(generator.throw(err).value).toEqual(put(Actions.updateGroupDataFailure(err)));
    });
  });

  describe('Student update flow', () => {
    let err = null;

    beforeEach(() => {
      err = 'no profile found';

      generator = Saga.studentUpdateFlow();
    });

    it('Should handle successful student update request', () => {
      expect(generator.next().value).toEqual(put(Actions.updateStudentDataSuccess()));
    });

    it('Should handle failed student update request', () => {
      expect(generator.next().value).toEqual(put(Actions.updateStudentDataSuccess()));
      expect(generator.throw(err).value).toEqual(put(Actions.updateStudentDataFailure(err)));
    });
  });

  describe('permissions request flow', () => {
    let err = null;
    let mockSessionId = null;
    let mockUserId = null;

    beforeEach(() => {
      err = 'permission failure';
      mockSessionId = 'abc';
      mockUserId = '123';

      generator = Saga.permissionsRequestFlow();
    });

    it('should handle successful permission request', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(mockSessionId).value).toEqual(select(userIdSelector));

      expect(generator.next(mockUserId).value).toEqual(
        call(Request.getPermissions, mockSessionId, mockUserId)
      );

      expect(generator.next().value).toEqual(put(Actions.permissionsRequestSuccess()));
    });

    it('should handle failed permission request', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.permissionsRequestFailure(err)));
    });
  });

  describe('Logout flow', () => {
    let mockGlobal = null;
    beforeEach(() => {
      generator = Saga.logoutFlow();
      mockGlobal = fromJS({
        isSSO: false,
      });
    });

    it('should handle logout flow for local logins', () => {
      expect(generator.next().value).toEqual(select(globalSelector));
      expect(generator.next(mockGlobal).value).toEqual(call(deleteLocalSLMSId));
      expect(generator.next().value).toEqual(put(Actions.logoutRequestSuccess()));
    });

    it('should handle logout flow for SSO logins', () => {
      mockGlobal = mockGlobal.set('isSSO', true);
      expect(generator.next().value).toEqual(select(globalSelector));
      expect(generator.next(mockGlobal).value).toEqual(
        call(window.location.replace, 'null/client/?LLO=true')
      );
    });

    it('should handle logout errors', () => {
      expect(generator.next().value).toEqual(select(globalSelector));
      expect(generator.throw('error value').value).toEqual(put(Actions.logoutRequestSuccess()));
    });
  });
});

describe('update profile paga data', () => {
  let mockMakeSelectSchoolsDataMap = null;
  let mockMakeSelectedActiveSchoolId = null;
  let mockMakeSelectedActiveGradeId = null;
  let mockMakeSelectedActiveTeacherId = null;
  let mockMakeSelectedActiveClassId = null;
  let globalState = null;
  let mockActiveSchoolId = null;
  let loginSelector = null;
  let sessionIdSelector = null;
  let generator = null;
  let store = null;

  beforeEach(() => {
    mockMakeSelectSchoolsDataMap = jest.fn();
    mockMakeSelectedActiveSchoolId = jest.fn();
    mockMakeSelectedActiveGradeId = jest.fn();
    mockMakeSelectedActiveTeacherId = jest.fn();
    mockMakeSelectedActiveClassId = jest.fn();
    loginSelector = jest.fn();
    sessionIdSelector = jest.fn();

    jest.spyOn(Selectors, 'makeSelectSchoolsDataMap').mockReturnValue(mockMakeSelectSchoolsDataMap);
    jest
      .spyOn(SmartBarSelectors, 'makeSelectedActiveSchoolId')
      .mockReturnValue(mockMakeSelectedActiveSchoolId);
    jest
      .spyOn(SmartBarSelectors, 'makeSelectedActiveGradeId')
      .mockReturnValue(mockMakeSelectedActiveGradeId);
    jest
      .spyOn(SmartBarSelectors, 'makeSelectedActiveTeacherId')
      .mockReturnValue(mockMakeSelectedActiveTeacherId);
    jest
      .spyOn(SmartBarSelectors, 'makeSelectedActiveClassId')
      .mockReturnValue(mockMakeSelectedActiveClassId);
    jest.spyOn(Selectors, 'makeSelectLoginData').mockReturnValue(loginSelector);
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(sessionIdSelector);
  });

  it('school admin', () => {
    store = fromJS({
      session_id: ['adsfadsf'],
      user_id: ['id1'],
      user_org_id: ['schoolid1'],
      user_org: [Constants.COHORT_TYPE.School],
    });
    globalState = fromJS({
      userData: {
        schools: {
          SchoolId: {
            org_id: ['SchoolId'],
            name: ['123School'],
            parent_org_id: ['6477EA8C2E3D11E6A9700A2175802BAF'],
          },
        },
      },
    });
    mockActiveSchoolId = fromJS({
      activeSchoolId: '',
    });

    generator = Saga.updateProfilePageData();

    expect(generator.next().value).toEqual(select(mockMakeSelectSchoolsDataMap));
    expect(generator.next(globalState.getIn(['userData', 'school'])).value).toEqual(
      select(mockMakeSelectedActiveSchoolId)
    );
    expect(generator.next(mockActiveSchoolId.get('activeSchoolId')).value).toEqual(
      select(sessionIdSelector)
    );
    expect(generator.next(store.getIn(['session_id', 0])).value).toEqual(select(loginSelector));
    expect(generator.next(store).value).toEqual(put(Actions.updateProfileSchoolDataSuccess()));
    expect(generator.next().value).toEqual(
      call(
        Request.getTeacherDataBySchool,
        store.getIn(['session_id', 0]),
        store.getIn(['user_org_id', 0])
      )
    );
    expect(generator.next().value).toEqual(
      call(
        Request.getGradeDataBySchool,
        store.getIn(['session_id', 0]),
        store.getIn(['user_org_id', 0])
      )
    );
    expect(generator.next().value).toEqual(
      call(
        Request.getClassDataBySchool,
        store.getIn(['session_id', 0]),
        store.getIn(['user_org_id', 0]),
        store.getIn(['user_id', 0])
      )
    );
    expect(generator.next().value).toEqual(put(Actions.updateProfileGradeDataSuccess()));
    expect(generator.next().value).toEqual(put(Actions.updateProfileTeacherDataSuccess()));
    expect(generator.next().value).toEqual(put(Actions.updateProfileClassDataSuccess()));
  });

  it('District admin', () => {
    store = fromJS({
      session_id: ['adsfadsf'],
      user_id: ['id1'],
      user_org_id: ['schoolid1'],
    });
    globalState = fromJS({
      userData: {
        schools: {
          SchoolId: {
            org_id: ['SchoolId'],
            name: ['123School'],
            parent_org_id: ['6477EA8C2E3D11E6A9700A2175802BAF'],
          },
        },
      },
    });
    mockActiveSchoolId = fromJS({
      activeSchoolId: 'SchoolId',
    });

    generator = Saga.updateProfilePageData();

    expect(generator.next().value).toEqual(select(mockMakeSelectSchoolsDataMap));
    expect(generator.next(globalState.getIn(['userData', 'school'])).value).toEqual(
      select(mockMakeSelectedActiveSchoolId)
    );
    expect(generator.next(mockActiveSchoolId.get('activeSchoolId')).value).toEqual(
      select(sessionIdSelector)
    );
    expect(generator.next(store.getIn(['session_id', 0])).value).toEqual(select(loginSelector));
    expect(generator.next(store).value).toEqual(put(Actions.updateProfileSchoolDataSuccess()));
    expect(generator.next().value).toEqual(
      call(
        Request.getTeacherDataBySchool,
        store.getIn(['session_id', 0]),
        mockActiveSchoolId.get('activeSchoolId')
      )
    );
    expect(generator.next().value).toEqual(
      call(
        Request.getGradeDataBySchool,
        store.getIn(['session_id', 0]),
        mockActiveSchoolId.get('activeSchoolId')
      )
    );
    expect(generator.next().value).toEqual(
      call(
        Request.getClassDataBySchool,
        store.getIn(['session_id', 0]),
        mockActiveSchoolId.get('activeSchoolId'),
        store.getIn(['user_id', 0])
      )
    );
    expect(generator.next().value).toEqual(put(Actions.updateProfileGradeDataSuccess()));
    expect(generator.next().value).toEqual(put(Actions.updateProfileTeacherDataSuccess()));
    expect(generator.next().value).toEqual(put(Actions.updateProfileClassDataSuccess()));
  });

  it('Teacher login', () => {
    store = fromJS({
      session_id: ['adsfadsf'],
      user_id: ['id1'],
      user_org_id: ['schoolid1'],
      user_type: [Constants.USER_TYPE.Teacher],
    });
    globalState = fromJS({
      userData: {
        schools: {
          SchoolId: {
            org_id: ['SchoolId'],
            name: ['123School'],
            parent_org_id: ['6477EA8C2E3D11E6A9700A2175802BAF'],
          },
        },
      },
    });
    mockActiveSchoolId = fromJS({
      activeSchoolId: 'SchoolId',
    });

    generator = Saga.updateProfilePageData();

    expect(generator.next().value).toEqual(select(mockMakeSelectSchoolsDataMap));
    expect(generator.next(globalState.getIn(['userData', 'school'])).value).toEqual(
      select(mockMakeSelectedActiveSchoolId)
    );
    expect(generator.next(mockActiveSchoolId.get('activeSchoolId')).value).toEqual(
      select(sessionIdSelector)
    );
    expect(generator.next(store.getIn(['session_id', 0])).value).toEqual(select(loginSelector));
    expect(generator.next(store).value).toEqual(put(Actions.updateProfileSchoolDataSuccess()));
    expect(generator.next().value).toEqual(
      call(
        Request.getTeacherDataBySchool,
        store.getIn(['session_id', 0]),
        mockActiveSchoolId.get('activeSchoolId')
      )
    );
    expect(generator.next().value).toEqual(
      call(
        Request.getGradeDataBySchool,
        store.getIn(['session_id', 0]),
        mockActiveSchoolId.get('activeSchoolId')
      )
    );
    expect(generator.next().value).toEqual(
      call(
        Request.getClassDataBySchool,
        store.getIn(['session_id', 0]),
        mockActiveSchoolId.get('activeSchoolId'),
        store.getIn(['user_id', 0])
      )
    );
    expect(generator.next().value).toEqual(put(Actions.updateProfileGradeDataSuccess()));
    expect(generator.next().value).toEqual(put(Actions.updateProfileTeacherDataSuccess()));
    expect(generator.next().value).toEqual(put(Actions.updateProfileClassDataSuccess()));
    expect(generator.next().value).toEqual(
      call(
        Request.getGroupDataBySchool,
        store.getIn(['session_id', 0]),
        mockActiveSchoolId.get('activeSchoolId'),
        store.getIn(['user_id', 0])
      )
    );
    expect(generator.next().value).toEqual(
      call(
        Request.getStudentDataBySchool,
        store.getIn(['session_id', 0]),
        mockActiveSchoolId.get('activeSchoolId'),
        store.getIn(['user_id', 0])
      )
    );
    expect(generator.next().value).toEqual(put(Actions.updateProfileGroupDataSuccess()));
    expect(generator.next().value).toEqual(put(Actions.updateProfileStudentDataSuccess()));
  });

  it('School admin login with class id', () => {
    store = fromJS({
      session_id: ['adsfadsf'],
      user_id: ['id1'],
      user_org_id: ['schoolid1'],
      user_org: [Constants.USER_ORG.District],
    });
    globalState = fromJS({
      userData: {
        schools: {
          SchoolId: {
            org_id: ['SchoolId'],
            name: ['123School'],
            parent_org_id: ['6477EA8C2E3D11E6A9700A2175802BAF'],
          },
        },
      },
    });
    mockActiveSchoolId = fromJS({
      activeSchoolId: 'SchoolId',
      activeGradeId: 'GradeId',
      activeTeacherId: 'TeacherId',
      activeClassId: 'ClassId',
    });

    generator = Saga.updateProfilePageData();

    expect(generator.next().value).toEqual(select(mockMakeSelectSchoolsDataMap));
    expect(generator.next(globalState.getIn(['userData', 'school'])).value).toEqual(
      select(mockMakeSelectedActiveSchoolId)
    );
    expect(generator.next(mockActiveSchoolId.get('activeSchoolId')).value).toEqual(
      select(sessionIdSelector)
    );
    expect(generator.next(store.getIn(['session_id', 0])).value).toEqual(select(loginSelector));
    expect(generator.next(store).value).toEqual(put(Actions.updateProfileSchoolDataSuccess()));
    expect(generator.next().value).toEqual(
      call(
        Request.getTeacherDataBySchool,
        store.getIn(['session_id', 0]),
        mockActiveSchoolId.get('activeSchoolId')
      )
    );
    expect(generator.next().value).toEqual(
      call(
        Request.getGradeDataBySchool,
        store.getIn(['session_id', 0]),
        mockActiveSchoolId.get('activeSchoolId')
      )
    );
    expect(generator.next().value).toEqual(
      call(
        Request.getClassDataBySchool,
        store.getIn(['session_id', 0]),
        mockActiveSchoolId.get('activeSchoolId'),
        store.getIn(['user_id', 0])
      )
    );
    expect(generator.next().value).toEqual(put(Actions.updateProfileGradeDataSuccess()));
    expect(generator.next().value).toEqual(put(Actions.updateProfileTeacherDataSuccess()));
    expect(generator.next().value).toEqual(put(Actions.updateProfileClassDataSuccess()));
    expect(generator.next().value).toEqual(select(mockMakeSelectedActiveGradeId));
    expect(generator.next(mockActiveSchoolId.get('activeGradeId')).value).toEqual(
      select(mockMakeSelectedActiveTeacherId)
    );
    expect(generator.next(mockActiveSchoolId.get('activeTeacherId')).value).toEqual(
      select(mockMakeSelectedActiveClassId)
    );
    expect(generator.next(mockActiveSchoolId.get('activeClassId')).value).toEqual(
      call(
        Request.getGroupDataByClass,
        store.getIn(['session_id', 0]),
        mockActiveSchoolId.get('activeClassId')
      )
    );
    expect(generator.next().value).toEqual(
      call(
        Request.getStudentDataByClass,
        store.getIn(['session_id', 0]),
        mockActiveSchoolId.get('activeClassId')
      )
    );
    expect(generator.next().value).toEqual(put(Actions.updateProfileGroupDataSuccess()));
    expect(generator.next().value).toEqual(put(Actions.updateProfileStudentDataSuccess()));
  });

  it('School admin login with teacher id', () => {
    store = fromJS({
      session_id: ['adsfadsf'],
      user_id: ['id1'],
      user_org_id: ['schoolid1'],
      user_org: [Constants.USER_ORG.District],
    });
    globalState = fromJS({
      userData: {
        schools: {
          SchoolId: {
            org_id: ['SchoolId'],
            name: ['123School'],
            parent_org_id: ['6477EA8C2E3D11E6A9700A2175802BAF'],
          },
        },
      },
    });
    mockActiveSchoolId = fromJS({
      activeSchoolId: 'SchoolId',
      activeGradeId: 'GradeId',
      activeTeacherId: 'TeacherId',
      activeClassId: '',
    });

    generator = Saga.updateProfilePageData();

    expect(generator.next().value).toEqual(select(mockMakeSelectSchoolsDataMap));
    expect(generator.next(globalState.getIn(['userData', 'school'])).value).toEqual(
      select(mockMakeSelectedActiveSchoolId)
    );
    expect(generator.next(mockActiveSchoolId.get('activeSchoolId')).value).toEqual(
      select(sessionIdSelector)
    );
    expect(generator.next(store.getIn(['session_id', 0])).value).toEqual(select(loginSelector));
    expect(generator.next(store).value).toEqual(put(Actions.updateProfileSchoolDataSuccess()));
    expect(generator.next().value).toEqual(
      call(
        Request.getTeacherDataBySchool,
        store.getIn(['session_id', 0]),
        mockActiveSchoolId.get('activeSchoolId')
      )
    );
    expect(generator.next().value).toEqual(
      call(
        Request.getGradeDataBySchool,
        store.getIn(['session_id', 0]),
        mockActiveSchoolId.get('activeSchoolId')
      )
    );
    expect(generator.next().value).toEqual(
      call(
        Request.getClassDataBySchool,
        store.getIn(['session_id', 0]),
        mockActiveSchoolId.get('activeSchoolId'),
        store.getIn(['user_id', 0])
      )
    );
    expect(generator.next().value).toEqual(put(Actions.updateProfileGradeDataSuccess()));
    expect(generator.next().value).toEqual(put(Actions.updateProfileTeacherDataSuccess()));
    expect(generator.next().value).toEqual(put(Actions.updateProfileClassDataSuccess()));
    expect(generator.next().value).toEqual(select(mockMakeSelectedActiveGradeId));
    expect(generator.next(mockActiveSchoolId.get('activeGradeId')).value).toEqual(
      select(mockMakeSelectedActiveTeacherId)
    );
    expect(generator.next(mockActiveSchoolId.get('activeTeacherId')).value).toEqual(
      select(mockMakeSelectedActiveClassId)
    );
    expect(generator.next(mockActiveSchoolId.get('activeClassId')).value).toEqual(
      call(
        Request.getGroupDataBySchool,
        store.getIn(['session_id', 0]),
        mockActiveSchoolId.get('activeSchoolId'),
        mockActiveSchoolId.get('activeTeacherId')
      )
    );
    expect(generator.next().value).toEqual(
      call(
        Request.getStudentDataBySchool,
        store.getIn(['session_id', 0]),
        mockActiveSchoolId.get('activeSchoolId'),
        mockActiveSchoolId.get('activeTeacherId')
      )
    );
    expect(generator.next().value).toEqual(put(Actions.updateProfileGroupDataSuccess()));
    expect(generator.next().value).toEqual(put(Actions.updateProfileStudentDataSuccess()));
  });

  it('School admin login with grade id', () => {
    store = fromJS({
      session_id: ['adsfadsf'],
      user_id: ['id1'],
      user_org_id: ['schoolid1'],
      user_org: [Constants.USER_ORG.District],
    });
    globalState = fromJS({
      userData: {
        schools: {
          SchoolId: {
            org_id: ['SchoolId'],
            name: ['123School'],
            parent_org_id: ['6477EA8C2E3D11E6A9700A2175802BAF'],
          },
        },
      },
    });
    mockActiveSchoolId = fromJS({
      activeSchoolId: 'SchoolId',
      activeGradeId: 'GradeId',
      activeTeacherId: '',
      activeClassId: '',
    });

    generator = Saga.updateProfilePageData();

    expect(generator.next().value).toEqual(select(mockMakeSelectSchoolsDataMap));
    expect(generator.next(globalState.getIn(['userData', 'school'])).value).toEqual(
      select(mockMakeSelectedActiveSchoolId)
    );
    expect(generator.next(mockActiveSchoolId.get('activeSchoolId')).value).toEqual(
      select(sessionIdSelector)
    );
    expect(generator.next(store.getIn(['session_id', 0])).value).toEqual(select(loginSelector));
    expect(generator.next(store).value).toEqual(put(Actions.updateProfileSchoolDataSuccess()));
    expect(generator.next().value).toEqual(
      call(
        Request.getTeacherDataBySchool,
        store.getIn(['session_id', 0]),
        mockActiveSchoolId.get('activeSchoolId')
      )
    );
    expect(generator.next().value).toEqual(
      call(
        Request.getGradeDataBySchool,
        store.getIn(['session_id', 0]),
        mockActiveSchoolId.get('activeSchoolId')
      )
    );
    expect(generator.next().value).toEqual(
      call(
        Request.getClassDataBySchool,
        store.getIn(['session_id', 0]),
        mockActiveSchoolId.get('activeSchoolId'),
        store.getIn(['user_id', 0])
      )
    );
    expect(generator.next().value).toEqual(put(Actions.updateProfileGradeDataSuccess()));
    expect(generator.next().value).toEqual(put(Actions.updateProfileTeacherDataSuccess()));
    expect(generator.next().value).toEqual(put(Actions.updateProfileClassDataSuccess()));
    expect(generator.next().value).toEqual(select(mockMakeSelectedActiveGradeId));
    expect(generator.next(mockActiveSchoolId.get('activeGradeId')).value).toEqual(
      select(mockMakeSelectedActiveTeacherId)
    );
    expect(generator.next(mockActiveSchoolId.get('activeTeacherId')).value).toEqual(
      select(mockMakeSelectedActiveClassId)
    );
    expect(generator.next(mockActiveSchoolId.get('activeClassId')).value).toEqual(
      call(
        Request.getStudentDataByGradeSchool,
        store.getIn(['session_id', 0]),
        mockActiveSchoolId.get('activeSchoolId'),
        mockActiveSchoolId.get('activeGradeId')
      )
    );
    expect(generator.next().value).toEqual(put(Actions.updateProfileStudentDataSuccess()));
  });

  it('School admin login with no grade id', () => {
    store = fromJS({
      session_id: ['adsfadsf'],
      user_id: ['id1'],
      user_org_id: ['schoolid1'],
      user_org: [Constants.USER_ORG.District],
    });
    globalState = fromJS({
      userData: {
        schools: {
          SchoolId: {
            org_id: ['SchoolId'],
            name: ['123School'],
            parent_org_id: ['6477EA8C2E3D11E6A9700A2175802BAF'],
          },
        },
      },
    });
    mockActiveSchoolId = fromJS({
      activeSchoolId: 'SchoolId',
      activeGradeId: '',
      activeTeacherId: '',
      activeClassId: '',
    });

    generator = Saga.updateProfilePageData();

    expect(generator.next().value).toEqual(select(mockMakeSelectSchoolsDataMap));
    expect(generator.next(globalState.getIn(['userData', 'school'])).value).toEqual(
      select(mockMakeSelectedActiveSchoolId)
    );
    expect(generator.next(mockActiveSchoolId.get('activeSchoolId')).value).toEqual(
      select(sessionIdSelector)
    );
    expect(generator.next(store.getIn(['session_id', 0])).value).toEqual(select(loginSelector));
    expect(generator.next(store).value).toEqual(put(Actions.updateProfileSchoolDataSuccess()));
    expect(generator.next().value).toEqual(
      call(
        Request.getTeacherDataBySchool,
        store.getIn(['session_id', 0]),
        mockActiveSchoolId.get('activeSchoolId')
      )
    );
    expect(generator.next().value).toEqual(
      call(
        Request.getGradeDataBySchool,
        store.getIn(['session_id', 0]),
        mockActiveSchoolId.get('activeSchoolId')
      )
    );
    expect(generator.next().value).toEqual(
      call(
        Request.getClassDataBySchool,
        store.getIn(['session_id', 0]),
        mockActiveSchoolId.get('activeSchoolId'),
        store.getIn(['user_id', 0])
      )
    );
    expect(generator.next().value).toEqual(put(Actions.updateProfileGradeDataSuccess()));
    expect(generator.next().value).toEqual(put(Actions.updateProfileTeacherDataSuccess()));
    expect(generator.next().value).toEqual(put(Actions.updateProfileClassDataSuccess()));
    expect(generator.next().value).toEqual(select(mockMakeSelectedActiveGradeId));
    expect(generator.next(mockActiveSchoolId.get('activeGradeId')).value).toEqual(
      select(mockMakeSelectedActiveTeacherId)
    );
    expect(generator.next(mockActiveSchoolId.get('activeTeacherId')).value).toEqual(
      select(mockMakeSelectedActiveClassId)
    );
    expect(generator.next(mockActiveSchoolId.get('activeClassId')).value).toEqual();
  });

  it('failure for profile page update', () => {
    generator = Saga.updateProfilePageData();

    expect(generator.next().value).toEqual(select(mockMakeSelectSchoolsDataMap));
    expect(generator.throw('error value').value).toEqual(
      put(Actions.updateProfilePageDataFailure('error value'))
    );
  });

  it('not a district and is a school type', () => {
    store = fromJS({
      session_id: ['adsfadsf'],
      user_id: ['id1'],
      user_org_id: ['schoolid1'],
      user_org: [Constants.USER_ORG.District],
    });
    globalState = fromJS({
      userData: {
        schools: {
          SchoolId: {
            org_id: ['SchoolId'],
            name: ['123School'],
            parent_org_id: ['6477EA8C2E3D11E6A9700A2175802BAF'],
          },
        },
      },
    });
    mockActiveSchoolId = fromJS({
      activeSchoolId: '',
      activeGradeId: '',
      activeTeacherId: '',
      activeClassId: '',
    });

    generator = Saga.updateProfilePageData();

    expect(generator.next().value).toEqual(select(mockMakeSelectSchoolsDataMap));
    expect(generator.next(globalState.getIn(['userData', 'school'])).value).toEqual(
      select(mockMakeSelectedActiveSchoolId)
    );
    expect(generator.next(mockActiveSchoolId.get('activeSchoolId')).value).toEqual(
      select(sessionIdSelector)
    );
    expect(generator.next(store.getIn(['session_id', 0])).value).toEqual(select(loginSelector));
    expect(generator.next(store).value).toEqual(put(Actions.updateProfileSchoolDataSuccess()));
    expect(generator.next().value).toEqual(select(mockMakeSelectedActiveGradeId));
    expect(generator.next(mockActiveSchoolId.get('activeGradeId')).value).toEqual(
      select(mockMakeSelectedActiveTeacherId)
    );
    expect(generator.next(mockActiveSchoolId.get('activeTeacherId')).value).toEqual(
      select(mockMakeSelectedActiveClassId)
    );
    expect(generator.next(mockActiveSchoolId.get('activeClassId')).value).toEqual();
  });
});

describe('update expand collapse status', () => {
  let mockMakeSelectClickedSchoolId = null;
  let mockMakeSelectClickedGradeId = null;
  let mockMakeSelectClickedTeacherId = null;
  let mockMakeSelectClickedClassId = null;
  let mockMakeSelectClickedGroupId = null;
  let mockMakeSelectClickedStudentId = null;
  let clickCohortValue = null;
  let schoolSelector = null;
  let loginSelector = null;
  let store = null;
  let generator = null;

  beforeEach(() => {
    mockMakeSelectClickedSchoolId = jest.fn();
    mockMakeSelectClickedGradeId = jest.fn();
    mockMakeSelectClickedTeacherId = jest.fn();
    mockMakeSelectClickedClassId = jest.fn();
    mockMakeSelectClickedGroupId = jest.fn();
    mockMakeSelectClickedStudentId = jest.fn();
    schoolSelector = jest.fn();
    loginSelector = jest.fn();
    jest
      .spyOn(SmartBarSelectors, 'makeSelectClickedSchoolId')
      .mockReturnValue(mockMakeSelectClickedSchoolId);
    jest
      .spyOn(SmartBarSelectors, 'makeSelectClickedGradeId')
      .mockReturnValue(mockMakeSelectClickedGradeId);
    jest
      .spyOn(SmartBarSelectors, 'makeSelectClickedTeacherId')
      .mockReturnValue(mockMakeSelectClickedTeacherId);
    jest
      .spyOn(SmartBarSelectors, 'makeSelectClickedClassId')
      .mockReturnValue(mockMakeSelectClickedClassId);
    jest
      .spyOn(SmartBarSelectors, 'makeSelectClickedGroupId')
      .mockReturnValue(mockMakeSelectClickedGroupId);
    jest
      .spyOn(SmartBarSelectors, 'makeSelectClickedStudentId')
      .mockReturnValue(mockMakeSelectClickedStudentId);
    jest.spyOn(Selectors, 'makeSelectSchoolsData').mockReturnValue(schoolSelector);
    jest.spyOn(Selectors, 'makeSelectLoginData').mockReturnValue(loginSelector);
  });

  it('when District user org is called with student id', () => {
    store = fromJS({
      user_org: ['District'],
    });
    clickCohortValue = fromJS({
      clickedSchoolId: '',
      clickedGradeId: '',
      clickedTeacherId: '',
      clickedClassId: '',
      clickedGroupId: '',
      clickedStudentId: 'studentId',
    });
    generator = Saga.updateExpandCollapse();

    expect(generator.next().value).toEqual(select(mockMakeSelectClickedSchoolId));
    expect(generator.next(clickCohortValue.get('clickedSchoolId')).value).toEqual(
      select(mockMakeSelectClickedGradeId)
    );
    expect(generator.next(clickCohortValue.get('clickedGradeId')).value).toEqual(
      select(mockMakeSelectClickedTeacherId)
    );
    expect(generator.next(clickCohortValue.get('clickedTeacherId')).value).toEqual(
      select(mockMakeSelectClickedClassId)
    );
    expect(generator.next(clickCohortValue.get('clickedClassId')).value).toEqual(
      select(mockMakeSelectClickedGroupId)
    );
    expect(generator.next(clickCohortValue.get('clickedGroupId')).value).toEqual(
      select(mockMakeSelectClickedStudentId)
    );
    expect(generator.next(clickCohortValue.get('clickedStudentId')).value).toEqual(
      select(loginSelector)
    );
    expect(generator.next(store).value).toEqual(select(schoolSelector));
    expect(generator.next().value).toEqual(
      put(Actions.updateSmartBarExpandCollapseStatus(false, false, true, true, true, true))
    );
  });

  it('when District user org is called with group id', () => {
    store = fromJS({
      user_org: ['District'],
    });
    clickCohortValue = fromJS({
      clickedSchoolId: '',
      clickedGradeId: '',
      clickedTeacherId: '',
      clickedClassId: '',
      clickedGroupId: 'groupId',
      clickedStudentId: '',
    });
    generator = Saga.updateExpandCollapse();

    expect(generator.next().value).toEqual(select(mockMakeSelectClickedSchoolId));
    expect(generator.next(clickCohortValue.get('clickedSchoolId')).value).toEqual(
      select(mockMakeSelectClickedGradeId)
    );
    expect(generator.next(clickCohortValue.get('clickedGradeId')).value).toEqual(
      select(mockMakeSelectClickedTeacherId)
    );
    expect(generator.next(clickCohortValue.get('clickedTeacherId')).value).toEqual(
      select(mockMakeSelectClickedClassId)
    );
    expect(generator.next(clickCohortValue.get('clickedClassId')).value).toEqual(
      select(mockMakeSelectClickedGroupId)
    );
    expect(generator.next(clickCohortValue.get('clickedGroupId')).value).toEqual(
      select(mockMakeSelectClickedStudentId)
    );
    expect(generator.next(clickCohortValue.get('clickedStudentId')).value).toEqual(
      select(loginSelector)
    );
    expect(generator.next(store).value).toEqual(select(schoolSelector));
    expect(generator.next().value).toEqual(
      put(Actions.updateSmartBarExpandCollapseStatus(false, false, true, true, true, true))
    );
  });

  it('when District user org is called with class id', () => {
    store = fromJS({
      user_org: ['District'],
    });
    clickCohortValue = fromJS({
      clickedSchoolId: '',
      clickedGradeId: '',
      clickedTeacherId: '',
      clickedClassId: 'classId',
      clickedGroupId: '',
      clickedStudentId: '',
    });
    generator = Saga.updateExpandCollapse();

    expect(generator.next().value).toEqual(select(mockMakeSelectClickedSchoolId));
    expect(generator.next(clickCohortValue.get('clickedSchoolId')).value).toEqual(
      select(mockMakeSelectClickedGradeId)
    );
    expect(generator.next(clickCohortValue.get('clickedGradeId')).value).toEqual(
      select(mockMakeSelectClickedTeacherId)
    );
    expect(generator.next(clickCohortValue.get('clickedTeacherId')).value).toEqual(
      select(mockMakeSelectClickedClassId)
    );
    expect(generator.next(clickCohortValue.get('clickedClassId')).value).toEqual(
      select(mockMakeSelectClickedGroupId)
    );
    expect(generator.next(clickCohortValue.get('clickedGroupId')).value).toEqual(
      select(mockMakeSelectClickedStudentId)
    );
    expect(generator.next(clickCohortValue.get('clickedStudentId')).value).toEqual(
      select(loginSelector)
    );
    expect(generator.next(store).value).toEqual(select(schoolSelector));
    expect(generator.next().value).toEqual(
      put(Actions.updateSmartBarExpandCollapseStatus(false, false, true, true, true, true))
    );
  });

  it('when District user org is called with teacher id', () => {
    store = fromJS({
      user_org: ['District'],
    });
    clickCohortValue = fromJS({
      clickedSchoolId: '',
      clickedGradeId: '',
      clickedTeacherId: 'teacherId',
      clickedClassId: '',
      clickedGroupId: '',
      clickedStudentId: '',
    });
    generator = Saga.updateExpandCollapse();

    expect(generator.next().value).toEqual(select(mockMakeSelectClickedSchoolId));
    expect(generator.next(clickCohortValue.get('clickedSchoolId')).value).toEqual(
      select(mockMakeSelectClickedGradeId)
    );
    expect(generator.next(clickCohortValue.get('clickedGradeId')).value).toEqual(
      select(mockMakeSelectClickedTeacherId)
    );
    expect(generator.next(clickCohortValue.get('clickedTeacherId')).value).toEqual(
      select(mockMakeSelectClickedClassId)
    );
    expect(generator.next(clickCohortValue.get('clickedClassId')).value).toEqual(
      select(mockMakeSelectClickedGroupId)
    );
    expect(generator.next(clickCohortValue.get('clickedGroupId')).value).toEqual(
      select(mockMakeSelectClickedStudentId)
    );
    expect(generator.next(clickCohortValue.get('clickedStudentId')).value).toEqual(
      select(loginSelector)
    );
    expect(generator.next(store).value).toEqual(select(schoolSelector));
    expect(generator.next().value).toEqual(
      put(Actions.updateSmartBarExpandCollapseStatus(false, false, true, true, false, true))
    );
  });

  it('when District user org is called with grade id', () => {
    store = fromJS({
      user_org: ['District'],
    });
    clickCohortValue = fromJS({
      clickedSchoolId: '',
      clickedGradeId: 'gradeId',
      clickedTeacherId: '',
      clickedClassId: '',
      clickedGroupId: '',
      clickedStudentId: '',
    });
    generator = Saga.updateExpandCollapse();

    expect(generator.next().value).toEqual(select(mockMakeSelectClickedSchoolId));
    expect(generator.next(clickCohortValue.get('clickedSchoolId')).value).toEqual(
      select(mockMakeSelectClickedGradeId)
    );
    expect(generator.next(clickCohortValue.get('clickedGradeId')).value).toEqual(
      select(mockMakeSelectClickedTeacherId)
    );
    expect(generator.next(clickCohortValue.get('clickedTeacherId')).value).toEqual(
      select(mockMakeSelectClickedClassId)
    );
    expect(generator.next(clickCohortValue.get('clickedClassId')).value).toEqual(
      select(mockMakeSelectClickedGroupId)
    );
    expect(generator.next(clickCohortValue.get('clickedGroupId')).value).toEqual(
      select(mockMakeSelectClickedStudentId)
    );
    expect(generator.next(clickCohortValue.get('clickedStudentId')).value).toEqual(
      select(loginSelector)
    );
    expect(generator.next(store).value).toEqual(select(schoolSelector));
    expect(generator.next().value).toEqual(
      put(Actions.updateSmartBarExpandCollapseStatus(false, true, true, false, false, true))
    );
  });

  it('when District user org is called with school id', () => {
    store = fromJS({
      user_org: ['District'],
    });
    clickCohortValue = fromJS({
      clickedSchoolId: 'schoolId',
      clickedGradeId: '',
      clickedTeacherId: '',
      clickedClassId: '',
      clickedGroupId: '',
      clickedStudentId: '',
    });
    generator = Saga.updateExpandCollapse();

    expect(generator.next().value).toEqual(select(mockMakeSelectClickedSchoolId));
    expect(generator.next(clickCohortValue.get('clickedSchoolId')).value).toEqual(
      select(mockMakeSelectClickedGradeId)
    );
    expect(generator.next(clickCohortValue.get('clickedGradeId')).value).toEqual(
      select(mockMakeSelectClickedTeacherId)
    );
    expect(generator.next(clickCohortValue.get('clickedTeacherId')).value).toEqual(
      select(mockMakeSelectClickedClassId)
    );
    expect(generator.next(clickCohortValue.get('clickedClassId')).value).toEqual(
      select(mockMakeSelectClickedGroupId)
    );
    expect(generator.next(clickCohortValue.get('clickedGroupId')).value).toEqual(
      select(mockMakeSelectClickedStudentId)
    );
    expect(generator.next(clickCohortValue.get('clickedStudentId')).value).toEqual(
      select(loginSelector)
    );
    expect(generator.next(store).value).toEqual(select(schoolSelector));
    expect(generator.next().value).toEqual(
      put(Actions.updateSmartBarExpandCollapseStatus(true, true, false, false, false, false))
    );
  });

  it('when District user org is called with school id', () => {
    store = fromJS({
      user_org: ['District'],
    });
    clickCohortValue = fromJS({
      clickedSchoolId: 'schoolId',
      clickedGradeId: '',
      clickedTeacherId: '',
      clickedClassId: '',
      clickedGroupId: '',
      clickedStudentId: '',
    });
    generator = Saga.updateExpandCollapse();

    expect(generator.next().value).toEqual(select(mockMakeSelectClickedSchoolId));
    expect(generator.next(clickCohortValue.get('clickedSchoolId')).value).toEqual(
      select(mockMakeSelectClickedGradeId)
    );
    expect(generator.next(clickCohortValue.get('clickedGradeId')).value).toEqual(
      select(mockMakeSelectClickedTeacherId)
    );
    expect(generator.next(clickCohortValue.get('clickedTeacherId')).value).toEqual(
      select(mockMakeSelectClickedClassId)
    );
    expect(generator.next(clickCohortValue.get('clickedClassId')).value).toEqual(
      select(mockMakeSelectClickedGroupId)
    );
    expect(generator.next(clickCohortValue.get('clickedGroupId')).value).toEqual(
      select(mockMakeSelectClickedStudentId)
    );
    expect(generator.next(clickCohortValue.get('clickedStudentId')).value).toEqual(
      select(loginSelector)
    );
    expect(generator.next(store).value).toEqual(select(schoolSelector));
    expect(generator.next().value).toEqual(
      put(Actions.updateSmartBarExpandCollapseStatus(true, true, false, false, false, false))
    );
  });

  it('when District user org is called with empty', () => {
    store = fromJS({
      user_org: ['District'],
    });
    clickCohortValue = fromJS({
      clickedSchoolId: '',
      clickedGradeId: '',
      clickedTeacherId: '',
      clickedClassId: '',
      clickedGroupId: '',
      clickedStudentId: '',
    });
    generator = Saga.updateExpandCollapse();

    expect(generator.next().value).toEqual(select(mockMakeSelectClickedSchoolId));
    expect(generator.next(clickCohortValue.get('clickedSchoolId')).value).toEqual(
      select(mockMakeSelectClickedGradeId)
    );
    expect(generator.next(clickCohortValue.get('clickedGradeId')).value).toEqual(
      select(mockMakeSelectClickedTeacherId)
    );
    expect(generator.next(clickCohortValue.get('clickedTeacherId')).value).toEqual(
      select(mockMakeSelectClickedClassId)
    );
    expect(generator.next(clickCohortValue.get('clickedClassId')).value).toEqual(
      select(mockMakeSelectClickedGroupId)
    );
    expect(generator.next(clickCohortValue.get('clickedGroupId')).value).toEqual(
      select(mockMakeSelectClickedStudentId)
    );
    expect(generator.next(clickCohortValue.get('clickedStudentId')).value).toEqual(
      select(loginSelector)
    );
    expect(generator.next(store).value).toEqual(select(schoolSelector));
    expect(generator.next().value).toEqual(
      put(Actions.updateSmartBarExpandCollapseStatus(true, false, false, false, false, false))
    );
  });

  it('when School user org is called with student id', () => {
    store = fromJS({
      user_org: ['School'],
    });
    clickCohortValue = fromJS({
      clickedSchoolId: '',
      clickedGradeId: '',
      clickedTeacherId: '',
      clickedClassId: '',
      clickedGroupId: '',
      clickedStudentId: 'studentId',
    });
    generator = Saga.updateExpandCollapse();

    expect(generator.next().value).toEqual(select(mockMakeSelectClickedSchoolId));
    expect(generator.next(clickCohortValue.get('clickedSchoolId')).value).toEqual(
      select(mockMakeSelectClickedGradeId)
    );
    expect(generator.next(clickCohortValue.get('clickedGradeId')).value).toEqual(
      select(mockMakeSelectClickedTeacherId)
    );
    expect(generator.next(clickCohortValue.get('clickedTeacherId')).value).toEqual(
      select(mockMakeSelectClickedClassId)
    );
    expect(generator.next(clickCohortValue.get('clickedClassId')).value).toEqual(
      select(mockMakeSelectClickedGroupId)
    );
    expect(generator.next(clickCohortValue.get('clickedGroupId')).value).toEqual(
      select(mockMakeSelectClickedStudentId)
    );
    expect(generator.next(clickCohortValue.get('clickedStudentId')).value).toEqual(
      select(loginSelector)
    );
    expect(generator.next(store).value).toEqual(select(schoolSelector));
    expect(generator.next().value).toEqual(
      put(Actions.updateSmartBarExpandCollapseStatus(false, false, true, true, true, true))
    );
  });

  it('when School user org is called with group id', () => {
    store = fromJS({
      user_org: ['School'],
    });
    clickCohortValue = fromJS({
      clickedSchoolId: '',
      clickedGradeId: '',
      clickedTeacherId: '',
      clickedClassId: '',
      clickedGroupId: 'groupId',
      clickedStudentId: '',
    });
    generator = Saga.updateExpandCollapse();

    expect(generator.next().value).toEqual(select(mockMakeSelectClickedSchoolId));
    expect(generator.next(clickCohortValue.get('clickedSchoolId')).value).toEqual(
      select(mockMakeSelectClickedGradeId)
    );
    expect(generator.next(clickCohortValue.get('clickedGradeId')).value).toEqual(
      select(mockMakeSelectClickedTeacherId)
    );
    expect(generator.next(clickCohortValue.get('clickedTeacherId')).value).toEqual(
      select(mockMakeSelectClickedClassId)
    );
    expect(generator.next(clickCohortValue.get('clickedClassId')).value).toEqual(
      select(mockMakeSelectClickedGroupId)
    );
    expect(generator.next(clickCohortValue.get('clickedGroupId')).value).toEqual(
      select(mockMakeSelectClickedStudentId)
    );
    expect(generator.next(clickCohortValue.get('clickedStudentId')).value).toEqual(
      select(loginSelector)
    );
    expect(generator.next(store).value).toEqual(select(schoolSelector));
    expect(generator.next().value).toEqual(
      put(Actions.updateSmartBarExpandCollapseStatus(false, false, true, true, true, true))
    );
  });

  it('when School user org is called with class id', () => {
    store = fromJS({
      user_org: ['School'],
    });
    clickCohortValue = fromJS({
      clickedSchoolId: '',
      clickedGradeId: '',
      clickedTeacherId: '',
      clickedClassId: 'classId',
      clickedGroupId: '',
      clickedStudentId: '',
    });
    generator = Saga.updateExpandCollapse();

    expect(generator.next().value).toEqual(select(mockMakeSelectClickedSchoolId));
    expect(generator.next(clickCohortValue.get('clickedSchoolId')).value).toEqual(
      select(mockMakeSelectClickedGradeId)
    );
    expect(generator.next(clickCohortValue.get('clickedGradeId')).value).toEqual(
      select(mockMakeSelectClickedTeacherId)
    );
    expect(generator.next(clickCohortValue.get('clickedTeacherId')).value).toEqual(
      select(mockMakeSelectClickedClassId)
    );
    expect(generator.next(clickCohortValue.get('clickedClassId')).value).toEqual(
      select(mockMakeSelectClickedGroupId)
    );
    expect(generator.next(clickCohortValue.get('clickedGroupId')).value).toEqual(
      select(mockMakeSelectClickedStudentId)
    );
    expect(generator.next(clickCohortValue.get('clickedStudentId')).value).toEqual(
      select(loginSelector)
    );
    expect(generator.next(store).value).toEqual(select(schoolSelector));
    expect(generator.next().value).toEqual(
      put(Actions.updateSmartBarExpandCollapseStatus(false, false, true, true, true, true))
    );
  });

  it('when School user org is called with teacher id', () => {
    store = fromJS({
      user_org: ['School'],
    });
    clickCohortValue = fromJS({
      clickedSchoolId: '',
      clickedGradeId: '',
      clickedTeacherId: 'teacherId',
      clickedClassId: '',
      clickedGroupId: '',
      clickedStudentId: '',
    });
    generator = Saga.updateExpandCollapse();

    expect(generator.next().value).toEqual(select(mockMakeSelectClickedSchoolId));
    expect(generator.next(clickCohortValue.get('clickedSchoolId')).value).toEqual(
      select(mockMakeSelectClickedGradeId)
    );
    expect(generator.next(clickCohortValue.get('clickedGradeId')).value).toEqual(
      select(mockMakeSelectClickedTeacherId)
    );
    expect(generator.next(clickCohortValue.get('clickedTeacherId')).value).toEqual(
      select(mockMakeSelectClickedClassId)
    );
    expect(generator.next(clickCohortValue.get('clickedClassId')).value).toEqual(
      select(mockMakeSelectClickedGroupId)
    );
    expect(generator.next(clickCohortValue.get('clickedGroupId')).value).toEqual(
      select(mockMakeSelectClickedStudentId)
    );
    expect(generator.next(clickCohortValue.get('clickedStudentId')).value).toEqual(
      select(loginSelector)
    );
    expect(generator.next(store).value).toEqual(select(schoolSelector));
    expect(generator.next().value).toEqual(
      put(Actions.updateSmartBarExpandCollapseStatus(false, false, true, true, false, true))
    );
  });

  it('when School user org is called with grade id', () => {
    store = fromJS({
      user_org: ['School'],
    });
    clickCohortValue = fromJS({
      clickedSchoolId: '',
      clickedGradeId: 'gradeId',
      clickedTeacherId: '',
      clickedClassId: '',
      clickedGroupId: '',
      clickedStudentId: '',
    });
    generator = Saga.updateExpandCollapse();

    expect(generator.next().value).toEqual(select(mockMakeSelectClickedSchoolId));
    expect(generator.next(clickCohortValue.get('clickedSchoolId')).value).toEqual(
      select(mockMakeSelectClickedGradeId)
    );
    expect(generator.next(clickCohortValue.get('clickedGradeId')).value).toEqual(
      select(mockMakeSelectClickedTeacherId)
    );
    expect(generator.next(clickCohortValue.get('clickedTeacherId')).value).toEqual(
      select(mockMakeSelectClickedClassId)
    );
    expect(generator.next(clickCohortValue.get('clickedClassId')).value).toEqual(
      select(mockMakeSelectClickedGroupId)
    );
    expect(generator.next(clickCohortValue.get('clickedGroupId')).value).toEqual(
      select(mockMakeSelectClickedStudentId)
    );
    expect(generator.next(clickCohortValue.get('clickedStudentId')).value).toEqual(
      select(loginSelector)
    );
    expect(generator.next(store).value).toEqual(select(schoolSelector));
    expect(generator.next().value).toEqual(
      put(Actions.updateSmartBarExpandCollapseStatus(false, true, true, false, false, true))
    );
  });

  it('when School user org is called with empty', () => {
    store = fromJS({
      user_org: ['School'],
    });
    clickCohortValue = fromJS({
      clickedSchoolId: '',
      clickedGradeId: '',
      clickedTeacherId: '',
      clickedClassId: '',
      clickedGroupId: '',
      clickedStudentId: '',
    });
    generator = Saga.updateExpandCollapse();

    expect(generator.next().value).toEqual(select(mockMakeSelectClickedSchoolId));
    expect(generator.next(clickCohortValue.get('clickedSchoolId')).value).toEqual(
      select(mockMakeSelectClickedGradeId)
    );
    expect(generator.next(clickCohortValue.get('clickedGradeId')).value).toEqual(
      select(mockMakeSelectClickedTeacherId)
    );
    expect(generator.next(clickCohortValue.get('clickedTeacherId')).value).toEqual(
      select(mockMakeSelectClickedClassId)
    );
    expect(generator.next(clickCohortValue.get('clickedClassId')).value).toEqual(
      select(mockMakeSelectClickedGroupId)
    );
    expect(generator.next(clickCohortValue.get('clickedGroupId')).value).toEqual(
      select(mockMakeSelectClickedStudentId)
    );
    expect(generator.next(clickCohortValue.get('clickedStudentId')).value).toEqual(
      select(loginSelector)
    );
    expect(generator.next(store).value).toEqual(select(schoolSelector));
    expect(generator.next().value).toEqual(
      put(Actions.updateSmartBarExpandCollapseStatus(false, true, false, false, false, false))
    );
  });

  it('when Teacher user org is called with student id', () => {
    store = fromJS({
      user_type: ['Teacher'],
    });
    clickCohortValue = fromJS({
      clickedSchoolId: '',
      clickedGradeId: '',
      clickedTeacherId: '',
      clickedClassId: '',
      clickedGroupId: '',
      clickedStudentId: 'studentId',
    });
    generator = Saga.updateExpandCollapse();

    expect(generator.next().value).toEqual(select(mockMakeSelectClickedSchoolId));
    expect(generator.next(clickCohortValue.get('clickedSchoolId')).value).toEqual(
      select(mockMakeSelectClickedGradeId)
    );
    expect(generator.next(clickCohortValue.get('clickedGradeId')).value).toEqual(
      select(mockMakeSelectClickedTeacherId)
    );
    expect(generator.next(clickCohortValue.get('clickedTeacherId')).value).toEqual(
      select(mockMakeSelectClickedClassId)
    );
    expect(generator.next(clickCohortValue.get('clickedClassId')).value).toEqual(
      select(mockMakeSelectClickedGroupId)
    );
    expect(generator.next(clickCohortValue.get('clickedGroupId')).value).toEqual(
      select(mockMakeSelectClickedStudentId)
    );
    expect(generator.next(clickCohortValue.get('clickedStudentId')).value).toEqual(
      select(loginSelector)
    );
    expect(generator.next(store).value).toEqual(select(schoolSelector));
    expect(generator.next().value).toEqual(
      put(Actions.updateSmartBarExpandCollapseStatus(true, false, false, true, true, true))
    );
  });

  it('when Teacher user org is called with group id', () => {
    store = fromJS({
      user_type: ['Teacher'],
    });
    clickCohortValue = fromJS({
      clickedSchoolId: '',
      clickedGradeId: '',
      clickedTeacherId: '',
      clickedClassId: '',
      clickedGroupId: 'groupId',
      clickedStudentId: '',
    });
    generator = Saga.updateExpandCollapse();

    expect(generator.next().value).toEqual(select(mockMakeSelectClickedSchoolId));
    expect(generator.next(clickCohortValue.get('clickedSchoolId')).value).toEqual(
      select(mockMakeSelectClickedGradeId)
    );
    expect(generator.next(clickCohortValue.get('clickedGradeId')).value).toEqual(
      select(mockMakeSelectClickedTeacherId)
    );
    expect(generator.next(clickCohortValue.get('clickedTeacherId')).value).toEqual(
      select(mockMakeSelectClickedClassId)
    );
    expect(generator.next(clickCohortValue.get('clickedClassId')).value).toEqual(
      select(mockMakeSelectClickedGroupId)
    );
    expect(generator.next(clickCohortValue.get('clickedGroupId')).value).toEqual(
      select(mockMakeSelectClickedStudentId)
    );
    expect(generator.next(clickCohortValue.get('clickedStudentId')).value).toEqual(
      select(loginSelector)
    );
    expect(generator.next(store).value).toEqual(select(schoolSelector));
    expect(generator.next().value).toEqual(
      put(Actions.updateSmartBarExpandCollapseStatus(true, false, true, true, true, true))
    );
  });

  it('when Teacher user org is called with class id', () => {
    store = fromJS({
      user_type: ['Teacher'],
    });
    clickCohortValue = fromJS({
      clickedSchoolId: '',
      clickedGradeId: '',
      clickedTeacherId: '',
      clickedClassId: 'classId',
      clickedGroupId: '',
      clickedStudentId: '',
    });
    generator = Saga.updateExpandCollapse();

    expect(generator.next().value).toEqual(select(mockMakeSelectClickedSchoolId));
    expect(generator.next(clickCohortValue.get('clickedSchoolId')).value).toEqual(
      select(mockMakeSelectClickedGradeId)
    );
    expect(generator.next(clickCohortValue.get('clickedGradeId')).value).toEqual(
      select(mockMakeSelectClickedTeacherId)
    );
    expect(generator.next(clickCohortValue.get('clickedTeacherId')).value).toEqual(
      select(mockMakeSelectClickedClassId)
    );
    expect(generator.next(clickCohortValue.get('clickedClassId')).value).toEqual(
      select(mockMakeSelectClickedGroupId)
    );
    expect(generator.next(clickCohortValue.get('clickedGroupId')).value).toEqual(
      select(mockMakeSelectClickedStudentId)
    );
    expect(generator.next(clickCohortValue.get('clickedStudentId')).value).toEqual(
      select(loginSelector)
    );
    expect(generator.next(store).value).toEqual(select(schoolSelector));
    expect(generator.next().value).toEqual(
      put(Actions.updateSmartBarExpandCollapseStatus(true, false, false, true, true, true))
    );
  });

  it('when Teacher user org is called with school id', () => {
    store = fromJS({
      user_type: ['Teacher'],
    });
    clickCohortValue = fromJS({
      clickedSchoolId: 'schoolId',
      clickedGradeId: '',
      clickedTeacherId: '',
      clickedClassId: '',
      clickedGroupId: '',
      clickedStudentId: '',
    });
    generator = Saga.updateExpandCollapse();

    expect(generator.next().value).toEqual(select(mockMakeSelectClickedSchoolId));
    expect(generator.next(clickCohortValue.get('clickedSchoolId')).value).toEqual(
      select(mockMakeSelectClickedGradeId)
    );
    expect(generator.next(clickCohortValue.get('clickedGradeId')).value).toEqual(
      select(mockMakeSelectClickedTeacherId)
    );
    expect(generator.next(clickCohortValue.get('clickedTeacherId')).value).toEqual(
      select(mockMakeSelectClickedClassId)
    );
    expect(generator.next(clickCohortValue.get('clickedClassId')).value).toEqual(
      select(mockMakeSelectClickedGroupId)
    );
    expect(generator.next(clickCohortValue.get('clickedGroupId')).value).toEqual(
      select(mockMakeSelectClickedStudentId)
    );
    expect(generator.next(clickCohortValue.get('clickedStudentId')).value).toEqual(
      select(loginSelector)
    );
    expect(generator.next(store).value).toEqual(select(schoolSelector));
    expect(generator.next().value).toEqual(
      put(Actions.updateSmartBarExpandCollapseStatus(true, false, false, true, false, true))
    );
  });

  it('when Teacher user org is called with multiple school non selected', () => {
    store = fromJS({
      user_type: ['Teacher'],
    });
    clickCohortValue = fromJS({
      clickedSchoolId: '',
      clickedGradeId: '',
      clickedTeacherId: '',
      clickedClassId: '',
      clickedGroupId: '',
      clickedStudentId: '',
    });
    const schoolValue = ['school1', 'school2'];
    generator = Saga.updateExpandCollapse();

    expect(generator.next().value).toEqual(select(mockMakeSelectClickedSchoolId));
    expect(generator.next(clickCohortValue.get('clickedSchoolId')).value).toEqual(
      select(mockMakeSelectClickedGradeId)
    );
    expect(generator.next(clickCohortValue.get('clickedGradeId')).value).toEqual(
      select(mockMakeSelectClickedTeacherId)
    );
    expect(generator.next(clickCohortValue.get('clickedTeacherId')).value).toEqual(
      select(mockMakeSelectClickedClassId)
    );
    expect(generator.next(clickCohortValue.get('clickedClassId')).value).toEqual(
      select(mockMakeSelectClickedGroupId)
    );
    expect(generator.next(clickCohortValue.get('clickedGroupId')).value).toEqual(
      select(mockMakeSelectClickedStudentId)
    );
    expect(generator.next(clickCohortValue.get('clickedStudentId')).value).toEqual(
      select(loginSelector)
    );
    expect(generator.next(store).value).toEqual(select(schoolSelector));
    expect(generator.next(schoolValue).value).toEqual(
      put(Actions.updateSmartBarExpandCollapseStatus(true, false, false, false, false, false))
    );
  });

  it('when Teacher user org is called with empty', () => {
    store = fromJS({
      user_type: ['Teacher'],
    });
    clickCohortValue = fromJS({
      clickedSchoolId: '',
      clickedGradeId: '',
      clickedTeacherId: '',
      clickedClassId: '',
      clickedGroupId: '',
      clickedStudentId: '',
    });
    generator = Saga.updateExpandCollapse();

    expect(generator.next().value).toEqual(select(mockMakeSelectClickedSchoolId));
    expect(generator.next(clickCohortValue.get('clickedSchoolId')).value).toEqual(
      select(mockMakeSelectClickedGradeId)
    );
    expect(generator.next(clickCohortValue.get('clickedGradeId')).value).toEqual(
      select(mockMakeSelectClickedTeacherId)
    );
    expect(generator.next(clickCohortValue.get('clickedTeacherId')).value).toEqual(
      select(mockMakeSelectClickedClassId)
    );
    expect(generator.next(clickCohortValue.get('clickedClassId')).value).toEqual(
      select(mockMakeSelectClickedGroupId)
    );
    expect(generator.next(clickCohortValue.get('clickedGroupId')).value).toEqual(
      select(mockMakeSelectClickedStudentId)
    );
    expect(generator.next(clickCohortValue.get('clickedStudentId')).value).toEqual(
      select(loginSelector)
    );
    expect(generator.next(store).value).toEqual(select(schoolSelector));
    expect(generator.next().value).toEqual(
      put(Actions.updateSmartBarExpandCollapseStatus(false, false, false, true, false, true))
    );
  });

  it('default switch', () => {
    store = fromJS({
      user_type: [''],
    });
    clickCohortValue = fromJS({
      clickedSchoolId: '',
      clickedGradeId: '',
      clickedTeacherId: '',
      clickedClassId: '',
      clickedGroupId: '',
      clickedStudentId: '',
    });
    generator = Saga.updateExpandCollapse();

    expect(generator.next().value).toEqual(select(mockMakeSelectClickedSchoolId));
    expect(generator.next(clickCohortValue.get('clickedSchoolId')).value).toEqual(
      select(mockMakeSelectClickedGradeId)
    );
    expect(generator.next(clickCohortValue.get('clickedGradeId')).value).toEqual(
      select(mockMakeSelectClickedTeacherId)
    );
    expect(generator.next(clickCohortValue.get('clickedTeacherId')).value).toEqual(
      select(mockMakeSelectClickedClassId)
    );
    expect(generator.next(clickCohortValue.get('clickedClassId')).value).toEqual(
      select(mockMakeSelectClickedGroupId)
    );
    expect(generator.next(clickCohortValue.get('clickedGroupId')).value).toEqual(
      select(mockMakeSelectClickedStudentId)
    );
    expect(generator.next(clickCohortValue.get('clickedStudentId')).value).toEqual(
      select(loginSelector)
    );
    expect(generator.next(store).value).toEqual(select(schoolSelector));
    expect(generator.next().value).toEqual();
  });

  it('error expand collapse', () => {
    store = fromJS({
      user_type: [''],
    });
    clickCohortValue = fromJS({
      clickedSchoolId: '',
      clickedGradeId: '',
      clickedTeacherId: '',
      clickedClassId: '',
      clickedGroupId: '',
      clickedStudentId: '',
    });
    const err = 'error';
    generator = Saga.updateExpandCollapse();

    expect(generator.next().value).toEqual(select(mockMakeSelectClickedSchoolId));
    expect(generator.throw(err).value).toEqual(
      put(Actions.updateSmartBarExpandCollapseFailure(err))
    );
  });
});
