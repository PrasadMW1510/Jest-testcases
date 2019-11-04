/**
 * Created by luib <Brian.Lui@hmhco.com> on 11/17/17.
 */

import * as Actions from '../actions';

describe('Global App actions', () => {
  describe('Login', () => {
    it('should return the correct constant for login request', () => {
      expect(Actions.loginRequest()).toMatchSnapshot();
    });

    it('should return the correct constant for login request success', () => {
      expect(Actions.loginSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for login request success', () => {
      const err = 'invalid user';

      expect(Actions.loginFailure(err)).toMatchSnapshot();
    });

    it('should return the correct constant for logout request', () => {
      expect(Actions.logoutRequest()).toMatchSnapshot();
    });

    it('should return the correct constant for school user flow login request', () => {
      expect(Actions.schoolUserLoginFlowRequest()).toMatchSnapshot();
    });

    it('should return the correct constant for logout request success', () => {
      expect(Actions.logoutRequestSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for logout request failure', () => {
      expect(Actions.logoutRequestFailure()).toMatchSnapshot();
    });

    it('should return the correct constant for password hint request', () => {
      expect(Actions.passwordHintRequest()).toMatchSnapshot();
    });

    it('should return the correct constant for password hint request success', () => {
      expect(Actions.passwordHintRequestSuccess('foobar')).toMatchSnapshot();
    });

    it('should return the correct constant for password hint request failure', () => {
      expect(Actions.passwordHintRequestFailure('error')).toMatchSnapshot();
    });

    it('should return the correct constant for grade list request', () => {
      expect(Actions.gradeListRequest()).toMatchSnapshot();
    });

    it('should return the correct constant for grade list request success', () => {
      expect(Actions.gradeListRequestSuccess([1, 2, 3])).toMatchSnapshot();
    });

    it('should return the correct constant for grade list request success no data', () => {
      expect(Actions.gradeListRequestSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for grade list request failure', () => {
      expect(Actions.gradeListRequestFailure('err')).toMatchSnapshot();
    });

    it('should return the correct constant for teacher list request', () => {
      expect(Actions.teacherListRequest()).toMatchSnapshot();
    });

    it('should return the correct constant for teacher list request success', () => {
      expect(Actions.teacherListRequestSuccess([1, 2, 3])).toMatchSnapshot();
    });

    it('should return the correct constant for teacher list request success no data', () => {
      expect(Actions.teacherListRequestSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for teacher list request failure', () => {
      expect(Actions.teacherListRequestFailure()).toMatchSnapshot();
    });

    it('should return the correct constant for update teacher data', () => {
      expect(Actions.updateTeacherData('asdfas', 'asdfas')).toMatchSnapshot();
    });

    it('should return the correct constant for update teacher data success', () => {
      expect(Actions.updateTeacherDataSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for update teacher data failure', () => {
      expect(Actions.updateTeacherDataFailure('err')).toMatchSnapshot();
    });

    it('should return the correct constant for update grade data', () => {
      expect(Actions.updateGradeData('dsaf', 'asdfasd')).toMatchSnapshot();
    });

    it('should return the correct constant for update grade data success', () => {
      expect(Actions.updateGradeDataSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for update grade data failure', () => {
      expect(Actions.updateGradeDataFailure()).toMatchSnapshot();
    });

    it('should return the correct constant for class list request', () => {
      expect(Actions.classListRequest()).toMatchSnapshot();
    });

    it('should return the correct constant for class list request success no data', () => {
      expect(Actions.classListRequestSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for class list request success', () => {
      const classes = ['abcd', '123', 'zzz'];
      expect(Actions.classListRequestSuccess(classes)).toMatchSnapshot();
    });

    it('should return the correct constant for class list request failure', () => {
      const error = 'no classes found';
      expect(Actions.classListRequestFailure(error)).toMatchSnapshot();
    });

    it('should return the correct constant for profile request', () => {
      expect(Actions.profileRequest()).toMatchSnapshot();
    });

    it('should return the correct constant for profile request success', () => {
      const profile = { name: 'Jack' };
      expect(Actions.profileRequestSuccess(profile)).toMatchSnapshot();
    });

    it('should return the correct constant for profile request failure', () => {
      const error = 'no profile found';
      expect(Actions.profileRequestFailure(error)).toMatchSnapshot();
    });

    it('should return the correct constant for student list request', () => {
      expect(Actions.studentListRequest()).toMatchSnapshot();
    });

    it('should return the correct constant for student list request success no data', () => {
      expect(Actions.studentListRequestSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for student list request success', () => {
      expect(Actions.studentListRequestSuccess([{ id: 1 }, { id: 2 }])).toMatchSnapshot();
    });

    it('should return the correct constant for student list request failure', () => {
      expect(Actions.studentListRequestFailure('error goes here')).toMatchSnapshot();
    });

    it('should return the correct constant for group list request', () => {
      expect(Actions.groupListRequest()).toMatchSnapshot();
    });

    it('should return the correct constant for student list request success no data', () => {
      expect(Actions.groupListRequestSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for student list request success', () => {
      expect(Actions.groupListRequestSuccess([{ id: 1 }, { id: 2 }])).toMatchSnapshot();
    });

    it('should return the correct constant for student list request failure', () => {
      expect(Actions.groupListRequestFailure('error goes here')).toMatchSnapshot();
    });

    it('should return the correct constant for school list request', () => {
      expect(Actions.schoolListRequest()).toMatchSnapshot();
    });

    it('should return the correct constant for school list request success no data', () => {
      expect(Actions.schoolListRequestSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for student list request success', () => {
      expect(Actions.schoolListRequestSuccess([{ id: 1 }, { id: 2 }])).toMatchSnapshot();
    });

    it('should return the correct constant for student list request failure', () => {
      expect(Actions.schoolListRequestFailure('error goes here')).toMatchSnapshot();
    });

    it('should return the correct constant for update school data request', () => {
      expect(Actions.updateSchoolData('zzzzz123')).toMatchSnapshot();
    });

    it('should return the correct constant for update school data request success', () => {
      expect(Actions.updateSchoolDataSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for update school data request success teacher', () => {
      expect(Actions.updateSchoolDataSuccessTeacher()).toMatchSnapshot();
    });

    it('should return the correct constant for update school data request failure', () => {
      expect(Actions.updateSchoolDataFailure()).toMatchSnapshot();
    });

    it('should return the correct constant for update class data request', () => {
      expect(Actions.updateClassData('zzzzz123')).toMatchSnapshot();
    });

    it('should return the correct constant for update class data request success', () => {
      expect(Actions.updateClassDataSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for update class data request failure', () => {
      expect(Actions.updateClassDataFailure('error')).toMatchSnapshot();
    });

    it('should return the correct constant for update group data request', () => {
      expect(Actions.updateGroupData('zzzzz123')).toMatchSnapshot();
    });

    it('should return the correct constant for update group data request success', () => {
      expect(Actions.updateGroupDataSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for update group data request failure', () => {
      expect(Actions.updateGroupDataFailure('error')).toMatchSnapshot();
    });

    it('should return the correct constant for update student data request', () => {
      expect(Actions.updateStudentData('zzzzz123')).toMatchSnapshot();
    });

    it('should return the correct constant for update student data request success', () => {
      expect(Actions.updateStudentDataSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for update student data request failure', () => {
      expect(Actions.updateStudentDataFailure('error')).toMatchSnapshot();
    });
    it('should return the correct constant for programAvailableRequest list request ', () => {
      expect(Actions.programAvailableRequest()).toMatchSnapshot();
    });
    it('should return the correct constant for program available  list request success', () => {
      expect(Actions.programAvailableRequestSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for program available  list request failure', () => {
      expect(Actions.programAvailableRequestFailure('error')).toMatchSnapshot();
    });
    it('should return the correct constant for update user data', () => {
      expect(Actions.updateUserData()).toMatchSnapshot();
    });

    it('should return the correct constant for update user data success', () => {
      expect(Actions.updateUserDataSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for update user data failure', () => {
      const err = 'invalid user';
      expect(Actions.updateUserDataFailure(err)).toMatchSnapshot();
    });

    it('should return the correct constant for update profile request success with no params', () => {
      expect(Actions.updateProfileRequestSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for update profile request success with params', () => {
      expect(Actions.updateProfileRequestSuccess({ id: 123, data: 456 })).toMatchSnapshot();
    });

    it('should return the correct constant for password config request success with no params', () => {
      expect(Actions.passwordConfigRequestSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for password config request success with params', () => {
      expect(Actions.passwordConfigRequestSuccess({ id: 123, data: 456 })).toMatchSnapshot();
    });

    it('should return school data when click on school data', () => {
      expect(Actions.updateProfileSchoolDataSuccess('123School')).toMatchSnapshot();
    });

    it('should return grade data when click on anything above grade', () => {
      expect(Actions.updateProfileGradeDataSuccess('123Grade')).toMatchSnapshot();
    });

    it('should return teacher data when click on anything above teacher', () => {
      expect(Actions.updateProfileTeacherDataSuccess('123Teacher')).toMatchSnapshot();
    });

    it('should return class data when click on anything above class', () => {
      expect(Actions.updateProfileClassDataSuccess('123Class')).toMatchSnapshot();
    });

    it('should return group data when click on anything above group', () => {
      expect(Actions.updateProfileGroupDataSuccess('123Group')).toMatchSnapshot();
    });

    it('should return student data when clicked on anything above student', () => {
      expect(Actions.updateProfileStudentDataSuccess('123Student')).toMatchSnapshot();
    });

    it('should return failure when data is incorrect', () => {
      expect(Actions.updateProfilePageDataFailure('error')).toMatchSnapshot();
    });

    describe('schoolsAndClassesRequestSuccess', () => {
      it('should return the correct constant for schools and classes request success with no params', () => {
        expect(Actions.schoolsAndClassesRequestSuccess()).toMatchSnapshot();
      });

      it('should return the correct constant for schools and classes request success with params', () => {
        expect(
          Actions.schoolsAndClassesRequestSuccess({ id: 'mockSchoolsAndClasses' })
        ).toMatchSnapshot();
      });
    });
  });
});
