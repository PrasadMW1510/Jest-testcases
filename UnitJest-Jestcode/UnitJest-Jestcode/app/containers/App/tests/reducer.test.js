import { fromJS } from 'immutable';
import appReducer from '../reducer';
import * as Actions from '../actions';
import * as Constants from '../constants';

describe('Global App reducer', () => {
  it('returns the initial state', () => {
    expect(appReducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle login success actions', () => {
    const action = {
      sessionId: 'abcd123',
      userId: 'jsmith',
      firstName: 'john',
      lastName: 'smith',
      userType: 'user',
    };

    expect(appReducer(undefined, Actions.loginSuccess(action))).toMatchSnapshot();
  });

  it('should handle login failure actions', () => {
    const error = 'did not find user';

    expect(appReducer(undefined, Actions.loginFailure(error))).toMatchSnapshot();
  });

  it('should handle sso login actions', () => {
    expect(appReducer(undefined, Actions.ssoLogin('asfdsafa1'))).toMatchSnapshot();
  });

  it('should handle local relogin actions', () => {
    expect(appReducer(undefined, Actions.localRelogin('asfdsafa1'))).toMatchSnapshot();
  });

  it('should handle logout request success actions', () => {
    expect(appReducer(undefined, Actions.logoutRequestSuccess())).toMatchSnapshot();
  });

  it('should handle password hint request failure actions', () => {
    expect(appReducer(undefined, Actions.passwordHintRequestFailure('err'))).toMatchSnapshot();
  });

  it('should handle class list success actions', () => {
    const classes = [{ class_id: 'class1' }, { class_id: 'class2' }];

    expect(appReducer(undefined, Actions.classListRequestSuccess(classes))).toMatchSnapshot();
  });

  it('should handle class list failure actions', () => {
    const err = 'no classes found';

    expect(appReducer(undefined, Actions.classListRequestFailure(err))).toMatchSnapshot();
  });

  it('should handle grade list success actions', () => {
    const grades = [{ name: 'grade1' }, { name: 'grade2' }];

    expect(appReducer(undefined, Actions.gradeListRequestSuccess(grades))).toMatchSnapshot();
  });

  it('should handle grade list failure actions', () => {
    const err = 'no grades found';

    expect(appReducer(undefined, Actions.gradeListRequestFailure(err))).toMatchSnapshot();
  });

  it('should handle teacher list success actions', () => {
    const teachers = [{ user_id: 'teacher1' }, { user_id: 'teacher2' }];

    expect(appReducer(undefined, Actions.teacherListRequestSuccess(teachers))).toMatchSnapshot();
  });

  it('should handle teacher list failure actions', () => {
    const err = 'no teachers found';

    expect(appReducer(undefined, Actions.teacherListRequestFailure(err))).toMatchSnapshot();
  });

  it('should handle update school data success', () => {
    const initialState = fromJS({
      userData: {
        classes: {},
        groups: {},
        students: {},
      },
    });

    expect(appReducer(initialState, Actions.updateSchoolDataSuccess())).toMatchSnapshot();
  });

  it('should handle update school data success teacher', () => {
    const initialState = fromJS({
      userData: {
        classes: {},
        groups: {},
        students: {},
      },
    });

    expect(appReducer(initialState, Actions.updateSchoolDataSuccessTeacher())).toMatchSnapshot();
  });

  it('should handle update grade data success', () => {
    const initialState = fromJS({
      userData: {
        groups: {},
      },
    });

    expect(appReducer(initialState, Actions.updateGradeDataSuccess())).toMatchSnapshot();
  });

  it('should handle profile success actions', () => {
    const profile = {
      firstName: 'John',
    };

    expect(appReducer(undefined, Actions.profileRequestSuccess(profile))).toMatchSnapshot();
  });

  it('should handle class list failure actions', () => {
    const err = 'no profile found';

    expect(appReducer(undefined, Actions.profileRequestFailure(err))).toMatchSnapshot();
  });

  it('should handle login save credentials actions', () => {
    expect(appReducer(undefined, Actions.loginCredentialsSave({}))).toMatchSnapshot();
  });

  it('should handle student list request success actions', () => {
    expect(appReducer(undefined, Actions.studentListRequestSuccess())).toMatchSnapshot();
  });

  it('should handle student list request failure actions', () => {
    expect(appReducer(undefined, Actions.studentListRequestFailure('err'))).toMatchSnapshot();
  });

  it('should handle school list request success actions', () => {
    expect(appReducer(undefined, Actions.schoolListRequestSuccess())).toMatchSnapshot();
  });

  it('should handle school list request failure actions', () => {
    expect(appReducer(undefined, Actions.schoolListRequestFailure('err'))).toMatchSnapshot();
  });

  it('should handle group list request success actions', () => {
    expect(appReducer(undefined, Actions.groupListRequestSuccess())).toMatchSnapshot();
  });

  it('should handle group list request failure actions', () => {
    expect(appReducer(undefined, Actions.groupListRequestFailure('err'))).toMatchSnapshot();
  });

  it('should handle Program Available list request success actions', () => {
    const programs = [
      {
        $: {
          community_id: 'DTM2',
          description: 'Do The Math',
        },
      },
      {
        $: {
          community_id: 'FM',
          description: 'Fastt Math',
        },
      },
    ];
    expect(
      appReducer(undefined, Actions.programAvailableRequestSuccess(programs))
    ).toMatchSnapshot();
  });

  it('should handle permission request success actions', () => {
    const permissions = [
      {
        id: 100,
        name: 'Edit Student Profile',
        display_name: 'Edit Student Profile',
      },
    ];

    expect(appReducer(undefined, Actions.permissionsRequestSuccess(permissions))).toMatchSnapshot();
  });

  it('should handle Program Available  list request failure actions', () => {
    expect(appReducer(undefined, Actions.programAvailableRequestFailure('err'))).toMatchSnapshot();
  });

  it('should handle update profile request', () => {
    const profile = {
      id: 123,
      data: 456,
    };

    expect(appReducer(undefined, Actions.updateProfileRequestSuccess(profile))).toMatchSnapshot();
  });

  it('should handle password config request', () => {
    const passwordConfig = {
      config: [
        {
          id: 123,
          data: 456,
        },
      ],
    };

    expect(
      appReducer(undefined, Actions.passwordConfigRequestSuccess(passwordConfig))
    ).toMatchSnapshot();
  });

  it('should handle schools and classes request', () => {
    const schoolsAndClasses = {
      id: 'mockSchoolsAndClasses',
    };

    expect(appReducer(undefined, Actions.schoolsAndClassesRequestSuccess(schoolsAndClasses)));
  });

  it('should handle PERMISSION_REQUEST', () => {
    expect(appReducer(undefined, { type: Constants.PERMISSION_REQUEST })).toMatchSnapshot();
  });

  it('should handle PROFILE_REQUEST', () => {
    expect(appReducer(undefined, { type: Constants.PROFILE_REQUEST })).toMatchSnapshot();
  });

  it('should handle PROGRAM_AVAILABLE_DATA', () => {
    expect(appReducer(undefined, { type: Constants.PROGRAM_AVAILABLE_DATA })).toMatchSnapshot();
  });

  it('should handle SCHOOL_LIST_REQUEST', () => {
    expect(appReducer(undefined, { type: Constants.SCHOOL_LIST_REQUEST })).toMatchSnapshot();
  });

  it('should handle UPDATE_CLASS_DATA', () => {
    expect(appReducer(undefined, { type: Constants.UPDATE_CLASS_DATA })).toMatchSnapshot();
  });

  it('should handle UPDATE_GRADE_DATA', () => {
    expect(appReducer(undefined, { type: Constants.UPDATE_GRADE_DATA })).toMatchSnapshot();
  });

  it('should handle UPDATE_GROUP_DATA', () => {
    expect(appReducer(undefined, { type: Constants.UPDATE_GROUP_DATA })).toMatchSnapshot();
  });

  it('should handle UPDATE_SCHOOL_DATA', () => {
    expect(appReducer(undefined, { type: Constants.UPDATE_SCHOOL_DATA })).toMatchSnapshot();
  });

  it('should handle UPDATE_STUDENT_DATA', () => {
    expect(appReducer(undefined, { type: Constants.UPDATE_STUDENT_DATA })).toMatchSnapshot();
  });

  it('should handle UPDATE_TEACHER_DATA', () => {
    expect(appReducer(undefined, { type: Constants.UPDATE_TEACHER_DATA })).toMatchSnapshot();
  });

  it('should handle update class data success action', () => {
    expect(appReducer(undefined, Actions.updateClassDataSuccess())).toMatchSnapshot();
  });

  it('should handle update group data success action', () => {
    expect(appReducer(undefined, Actions.updateGroupDataSuccess())).toMatchSnapshot();
  });

  it('should handle update student data success action', () => {
    expect(appReducer(undefined, Actions.updateStudentDataSuccess())).toMatchSnapshot();
  });

  it('should handle update teacher data success action', () => {
    expect(appReducer(undefined, Actions.updateTeacherDataSuccess())).toMatchSnapshot();
  });

  it('should update school data when update profile school data success is called', () => {
    const profileSchool = '123School';
    expect(
      appReducer(undefined, Actions.updateProfileSchoolDataSuccess(profileSchool))
    ).toMatchSnapshot();
  });

  it('should update grade data when update profile grade data success is called', () => {
    const profileGrade = [{ name: 'grade1' }, { name: 'grade2' }];
    expect(
      appReducer(undefined, Actions.updateProfileGradeDataSuccess(profileGrade))
    ).toMatchSnapshot();
  });

  it('should update teacher data when update profile teacher data success is called', () => {
    const profileTeacher = [{ user_id: 'teacher1' }, { user_id: 'teacher2' }];
    expect(
      appReducer(undefined, Actions.updateProfileTeacherDataSuccess(profileTeacher))
    ).toMatchSnapshot();
  });

  it('should update class data when update profile class data success is called', () => {
    const profileClass = [{ class_id: 'class1' }, { class_id: 'class2' }];
    expect(
      appReducer(undefined, Actions.updateProfileClassDataSuccess(profileClass))
    ).toMatchSnapshot();
  });

  it('should update group data when update profile group data success is called', () => {
    const profileGroup = [{ group_id: 'group1' }, { group_id: 'group2' }];
    expect(
      appReducer(undefined, Actions.updateProfileGroupDataSuccess(profileGroup))
    ).toMatchSnapshot();
  });

  it('should update Student data when update profile student data success is called', () => {
    const profileStudent = [{ user_id: 'student1' }, { user_id: 'student2' }];
    expect(
      appReducer(undefined, Actions.updateProfileStudentDataSuccess(profileStudent))
    ).toMatchSnapshot();
  });

  it('should not update Grade data when null', () => {
    const profileGrade = undefined;
    expect(
      appReducer(undefined, Actions.updateProfileGradeDataSuccess(profileGrade))
    ).toMatchSnapshot();
  });

  it('should not update Teacher data when null', () => {
    const profileTeacher = undefined;
    expect(
      appReducer(undefined, Actions.updateProfileTeacherDataSuccess(profileTeacher))
    ).toMatchSnapshot();
  });

  it('should not update Class data when null', () => {
    const profileClass = undefined;
    expect(
      appReducer(undefined, Actions.updateProfileClassDataSuccess(profileClass))
    ).toMatchSnapshot();
  });

  it('should not update Group data when null', () => {
    const profileGroup = undefined;
    expect(
      appReducer(undefined, Actions.updateProfileGroupDataSuccess(profileGroup))
    ).toMatchSnapshot();
  });

  it('should not update Student data when null', () => {
    const profileStudent = undefined;
    expect(
      appReducer(undefined, Actions.updateProfileStudentDataSuccess(profileStudent))
    ).toMatchSnapshot();
  });

  it('should update school data when update profile school data success is called', () => {
    const err = 'error';
    expect(
      appReducer(undefined, { type: Constants.UPDATE_PROFILE_PAGE_DATA_FAILURE, err })
    ).toMatchSnapshot();
  });

  it('when logged in as org id school clear only  grade and student', () => {
    expect(
      appReducer(undefined, { type: Constants.UPDATE_SCHOOL_ADMIN_DATA_SUCCESS })
    ).toMatchSnapshot();
  });

  it('update expand and collapse status', () => {
    expect(
      appReducer(
        undefined,
        Actions.updateSmartBarExpandCollapseStatus(true, true, true, true, true, true)
      )
    ).toMatchSnapshot();
  });
});
