/**
 * Created by luib <Brian.Lui@hmhco.com> on 11/17/17.
 */

import * as Actions from '../actions';

describe('SmartBar actions', () => {
  describe('All actions', () => {
    it('should return the correct constant for grade selection request', () => {
      const gradeId = 'asdfz123';

      expect(Actions.gradeSelection(gradeId)).toMatchSnapshot();
    });

    it('should return the correct constant for grade selection request success', () => {
      const gradeId = 'asdfz123';

      expect(Actions.gradeSelectionSuccess(gradeId)).toMatchSnapshot();
    });

    it('should return the correct constant for grade selection request failure', () => {
      const error = 'error error';

      expect(Actions.gradeSelectionFailure(error)).toMatchSnapshot();
    });

    it('should return the correct constant for teacher selection request', () => {
      const teacherId = 'asdfz123';

      expect(Actions.teacherSelection(teacherId)).toMatchSnapshot();
    });

    it('should return the correct constant for teacher selection request success', () => {
      const teacherId = 'asdfz123';

      expect(Actions.teacherSelectionSuccess(teacherId)).toMatchSnapshot();
    });

    it('should return the correct constant for teacher redirection success', () => {
      const teacherId = 'asdfz123';

      expect(Actions.teacherRedirection(teacherId)).toMatchSnapshot();
    });

    it('should return the correct constant for school redirection success', () => {
      const schoolId = 'asdfz123';

      expect(Actions.schoolRedirection(schoolId)).toMatchSnapshot();
    });

    it('should return the correct constant for class redirection success', () => {
      const classId = 'asdfz123';

      expect(Actions.classRedirection(classId)).toMatchSnapshot();
    });

    it('should return the correct constant for grade redirection success', () => {
      const gradeId = 'asdfz123';

      expect(Actions.gradeRedirection(gradeId)).toMatchSnapshot();
    });

    it('should return the correct constant for grade redirection success', () => {
      const groupId = 'asdfz123';

      expect(Actions.classRedirectionInGroup(groupId)).toMatchSnapshot();
    });
    it('should return the correct constant for teacher selection request failure', () => {
      const error = 'error error';

      expect(Actions.teacherSelectionFailure(error)).toMatchSnapshot();
    });

    it('should return the correct constant for school selection request', () => {
      const schoolId = 'asdfz123';

      expect(Actions.schoolSelection(schoolId)).toMatchSnapshot();
    });

    it('should return the correct constant for school selection request success', () => {
      const schoolId = 'asdfz123';

      expect(Actions.schoolSelectionSuccess(schoolId)).toMatchSnapshot();
    });

    it('should return the correct constant for school selection request failure', () => {
      const error = 'error error';

      expect(Actions.schoolSelectionFailure(error)).toMatchSnapshot();
    });

    it('should return the correct constant for class selection request', () => {
      const classId = 'asdfz123';

      expect(Actions.classSelection(classId)).toMatchSnapshot();
    });

    it('should return the correct constant for class selection request success', () => {
      const classId = 'asdfz123';

      expect(Actions.classSelectionSuccess(classId)).toMatchSnapshot();
    });

    it('should return the correct constant for class selection request failure', () => {
      const error = 'error error';

      expect(Actions.classSelectionFailure(error)).toMatchSnapshot();
    });

    it('should return the correct constant for group selection request', () => {
      const groupId = 'asdfz123';

      expect(Actions.groupSelection(groupId)).toMatchSnapshot();
    });

    it('should return the correct constant for group selection request success', () => {
      const groupId = 'asdfz123';

      expect(Actions.groupSelectionSuccess(groupId)).toMatchSnapshot();
    });

    it('should return the correct constant for group selection request failure', () => {
      const error = 'error error';

      expect(Actions.groupSelectionFailure(error)).toMatchSnapshot();
    });

    it('should return the correct constant for student selection request', () => {
      const studentId = 'asdfz123';

      expect(Actions.studentSelection(studentId)).toMatchSnapshot();
    });

    it('should return the correct constant for student selection request success', () => {
      const studentId = 'asdfz123';

      expect(Actions.studentSelectionSuccess(studentId)).toMatchSnapshot();
    });

    it('should return the correct constant for student selection request failure', () => {
      const error = 'error error';

      expect(Actions.studentSelectionFailure(error)).toMatchSnapshot();
    });

    it('should return the correct constant for reset selections', () => {
      expect(Actions.resetSelections()).toMatchSnapshot();
    });

    it('should update active school id', () => {
      const schoolId = 'school';
      expect(Actions.activeSelectedSchool(schoolId)).toMatchSnapshot();
    });

    it('should update active grade id', () => {
      const gradeId = 'grade';
      expect(Actions.activeSelectedGrade(gradeId)).toMatchSnapshot();
    });

    it('should update active school id', () => {
      const teacherId = 'teacher';
      expect(Actions.activeSelectedTeacher(teacherId)).toMatchSnapshot();
    });

    it('should update active school id', () => {
      const classId = 'class';
      expect(Actions.activeSelectedSchool(classId)).toMatchSnapshot();
    });

    it('should update active school id', () => {
      const groupId = 'group';
      expect(Actions.activeSelectedSchool(groupId)).toMatchSnapshot();
    });

    it('should update active school id', () => {
      const studentId = 'student';
      expect(Actions.activeSelectedSchool(studentId)).toMatchSnapshot();
    });

    it('verify common redirection', () => {
      expect(Actions.redirectionSmartBarSGT()).toMatchSnapshot();
    });

    it('reset constants', () => {
      expect(Actions.resetConstantId()).toMatchSnapshot();
    });

    it('smartbarSelectedUpdateData constants', () => {
      expect(Actions.smartbarSelectedUpdateData()).toMatchSnapshot();
    });
  });
});
