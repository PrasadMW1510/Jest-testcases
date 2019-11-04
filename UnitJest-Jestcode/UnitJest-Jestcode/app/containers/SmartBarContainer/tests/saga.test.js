/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put, takeLatest, select, all, take, fork, cancel } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { createMockTask } from 'redux-saga/utils';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import * as AppSelectors from 'containers/App/selectors';
import * as AppActions from 'containers/App/actions';
import * as AppConstants from 'containers/App/constants';

import rootSaga, * as Saga from '../saga';
import * as Actions from '../actions';
import * as UsageSummaryActions from '../../UsageSummaryContainer/actions';
import * as Constants from '../constants';
import * as Selectors from '../selectors';

describe('SmartBarContainer Saga', () => {
  let generator = null;
  let error = null;
  let schoolSelector = null;
  let locationSelector = null;
  let clickedSchoolIdSelector = null;
  let clickedSchoolId = null;
  let mockWatcherTasks = null;
  let mockTask1 = null;
  let mockTask2 = null;
  let mockActiveSelectedSchoolId = null;
  let mockActiveSelectedGradeId = null;
  let mockActiveSelectedTeacherId = null;
  let mockActiveSelectedClassId = null;
  let mockActiveSelectedGroupId = null;
  let mockActiveSelectedStudentId = null;
  let mockMakeSelectCohortType = null;
  let mockUserType = null;

  beforeEach(() => {
    error = {};
    schoolSelector = jest.fn();
    locationSelector = jest.fn();
    clickedSchoolIdSelector = jest.fn();
    mockActiveSelectedSchoolId = jest.fn();
    mockActiveSelectedGradeId = jest.fn();
    mockActiveSelectedTeacherId = jest.fn();
    mockActiveSelectedClassId = jest.fn();
    mockActiveSelectedGroupId = jest.fn();
    mockActiveSelectedStudentId = jest.fn();
    mockMakeSelectCohortType = jest.fn();
    mockUserType = jest.fn();

    clickedSchoolId = 'adsfas';

    mockTask1 = createMockTask();
    mockTask2 = createMockTask();
    mockWatcherTasks = [mockTask1, mockTask2];

    jest.spyOn(AppSelectors, 'makeSelectSchoolsData').mockReturnValue(schoolSelector);
    jest.spyOn(AppSelectors, 'makeSelectLocation').mockReturnValue(locationSelector);
    jest.spyOn(Selectors, 'makeSelectClickedSchoolId').mockReturnValue(clickedSchoolIdSelector);
    jest.spyOn(Selectors, 'makeSelectedActiveSchoolId').mockReturnValue(mockActiveSelectedSchoolId);
    jest.spyOn(Selectors, 'makeSelectedActiveGradeId').mockReturnValue(mockActiveSelectedGradeId);
    jest
      .spyOn(Selectors, 'makeSelectedActiveTeacherId')
      .mockReturnValue(mockActiveSelectedTeacherId);
    jest.spyOn(Selectors, 'makeSelectedActiveClassId').mockReturnValue(mockActiveSelectedClassId);
    jest.spyOn(Selectors, 'makeSelectedActiveGroupId').mockReturnValue(mockActiveSelectedGroupId);
    jest
      .spyOn(Selectors, 'makeSelectedActiveStudentId')
      .mockReturnValue(mockActiveSelectedStudentId);
    jest.spyOn(Selectors, 'makeSelectCohortType').mockReturnValue(mockMakeSelectCohortType);
    jest.spyOn(AppSelectors, 'makeSelectProfileUserType').mockReturnValue(mockUserType);
  });

  describe('School Selection', () => {
    let schoolAction = null;

    beforeEach(() => {
      schoolAction = Actions.schoolSelection('abcdef123');
      generator = Saga.schoolSelectionFlow();
    });

    it('Should handle successful single selection', () => {
      expect(generator.next().value).toEqual(take(Constants.SCHOOL_SELECTION));

      expect(generator.next(schoolAction).value).toEqual(
        put(AppActions.updateSchoolData(schoolAction.schoolId))
      );
      expect(generator.next().value).toEqual(take(Constants.SCHOOL_SELECTION));
    });

    it('Should handle successful double selection from homepage', () => {
      expect(generator.next().value).toEqual(take(Constants.SCHOOL_SELECTION));

      expect(generator.next(schoolAction).value).toEqual(
        put(Actions.schoolSelectionSuccess(schoolAction.schoolId))
      );

      expect(generator.next().value).toEqual(select(locationSelector));

      expect(generator.next({ pathname: '/' }).value).toEqual(put(push('/roster')));
      expect(generator.next(schoolAction).value).toEqual(
        put(AppActions.updateSchoolData(schoolAction.schoolId))
      );
      expect(generator.next().value).toEqual(take(Constants.SCHOOL_SELECTION));
    });

    it('Should handle successful double selection not from homepage', () => {
      expect(generator.next().value).toEqual(take(Constants.SCHOOL_SELECTION));

      expect(generator.next(schoolAction).value).toEqual(
        put(Actions.schoolSelectionSuccess(schoolAction.schoolId))
      );

      expect(generator.next().value).toEqual(select(locationSelector));
      expect(generator.next(schoolAction).value).toEqual(
        put(AppActions.updateSchoolData(schoolAction.schoolId))
      );

      // while loop starts over
      expect(generator.next({ pathname: '/reports' }).value).toEqual(
        take(Constants.SCHOOL_SELECTION)
      );
    });

    it('Should handle selection failure', () => {
      schoolAction = Actions.schoolSelection('abcSchool');
      expect(generator.next().value).toEqual(take(Constants.SCHOOL_SELECTION));

      expect(generator.next(schoolAction).value).toEqual(
        put(AppActions.updateSchoolData(schoolAction.schoolId))
      );

      expect(generator.throw(error).value).toEqual(
        put(UsageSummaryActions.usageSummaryRequestFailure(error))
      );

      expect(generator.next().value).toEqual(put(Actions.schoolSelectionFailure(error)));
    });
  });

  describe('Grade Selection', () => {
    let gradeAction = null;

    beforeEach(() => {
      gradeAction = Actions.gradeSelection('grade1');
      generator = Saga.gradeSelectionFlow();
    });

    it('Should handle successful single selection', () => {
      expect(generator.next().value).toEqual(take(Constants.GRADE_SELECTION));
      expect(generator.next(gradeAction).value).toEqual(select(clickedSchoolIdSelector));
      expect(generator.next(clickedSchoolId).value).toEqual(
        put(AppActions.updateGradeData(gradeAction.gradeId, clickedSchoolId))
      );
      expect(generator.next().value).toEqual(take(Constants.GRADE_SELECTION));
    });

    it('Should handle successful double selection from homepage', () => {
      expect(generator.next().value).toEqual(take(Constants.GRADE_SELECTION));
      expect(generator.next(gradeAction).value).toEqual(
        put(Actions.gradeSelectionSuccess(gradeAction.gradeId))
      );
      expect(generator.next().value).toEqual(select(locationSelector));

      expect(generator.next({ pathname: '/' }).value).toEqual(put(push('/roster')));
      expect(generator.next(gradeAction).value).toEqual(select(clickedSchoolIdSelector));
      expect(generator.next(clickedSchoolId).value).toEqual(
        put(AppActions.updateGradeData(gradeAction.gradeId, clickedSchoolId))
      );
      expect(generator.next().value).toEqual(take(Constants.GRADE_SELECTION));
    });

    it('Should handle successful double selection not from homepage', () => {
      expect(generator.next().value).toEqual(take(Constants.GRADE_SELECTION));
      expect(generator.next(gradeAction).value).toEqual(
        put(Actions.gradeSelectionSuccess(gradeAction.gradeId))
      );
      expect(generator.next().value).toEqual(select(locationSelector));

      expect(generator.next(gradeAction).value).toEqual(select(clickedSchoolIdSelector));
      expect(generator.next(clickedSchoolId).value).toEqual(
        put(AppActions.updateGradeData(gradeAction.gradeId, clickedSchoolId))
      );
      // while loop starts over
      expect(generator.next({ pathname: '/reports' }).value).toEqual(
        take(Constants.GRADE_SELECTION)
      );
    });

    it('Should handle selection failure', () => {
      gradeAction = Actions.gradeSelection('grade2s');
      expect(generator.next().value).toEqual(take(Constants.GRADE_SELECTION));
      expect(generator.next(gradeAction).value).toEqual(select(clickedSchoolIdSelector));

      expect(generator.throw(error).value).toEqual(put(Actions.gradeSelectionFailure(error)));
    });
  });

  describe('Teacher Selection', () => {
    let teacherAction = null;

    beforeEach(() => {
      teacherAction = Actions.teacherSelection('teacher1');
      generator = Saga.teacherSelectionFlow();
    });

    it('Should handle successful single selection', () => {
      expect(generator.next().value).toEqual(take(Constants.TEACHER_SELECTION));
      expect(generator.next(teacherAction).value).toEqual(select(clickedSchoolIdSelector));
      expect(generator.next(clickedSchoolId).value).toEqual(
        put(AppActions.updateTeacherData(teacherAction.teacherId, clickedSchoolId))
      );
      expect(generator.next().value).toEqual(take(Constants.TEACHER_SELECTION));
    });

    it('Should handle successful double selection from homepage', () => {
      expect(generator.next().value).toEqual(take(Constants.TEACHER_SELECTION));
      expect(generator.next(teacherAction).value).toEqual(
        put(Actions.teacherSelectionSuccess(teacherAction.teacherId))
      );
      expect(generator.next().value).toEqual(select(locationSelector));

      expect(generator.next({ pathname: '/' }).value).toEqual(put(push('/roster')));
      expect(generator.next(teacherAction).value).toEqual(select(clickedSchoolIdSelector));
      expect(generator.next(clickedSchoolId).value).toEqual(
        put(AppActions.updateTeacherData(teacherAction.teacherId, clickedSchoolId))
      );
    });

    it('Should handle successful double selection not from homepage', () => {
      expect(generator.next().value).toEqual(take(Constants.TEACHER_SELECTION));
      expect(generator.next(teacherAction).value).toEqual(
        put(Actions.teacherSelectionSuccess(teacherAction.teacherId))
      );
      expect(generator.next().value).toEqual(select(locationSelector));

      expect(generator.next(teacherAction).value).toEqual(select(clickedSchoolIdSelector));
      expect(generator.next(clickedSchoolId).value).toEqual(
        put(AppActions.updateTeacherData(teacherAction.teacherId, clickedSchoolId))
      );
      // while loop starts over
      expect(generator.next({ pathname: '/reports' }).value).toEqual(
        take(Constants.TEACHER_SELECTION)
      );
    });

    it('Should handle selection failure', () => {
      teacherAction = Actions.teacherSelection('teacher2');
      expect(generator.next().value).toEqual(take(Constants.TEACHER_SELECTION));
      expect(generator.next(teacherAction).value).toEqual(select(clickedSchoolIdSelector));

      expect(generator.throw(error).value).toEqual(put(Actions.teacherSelectionFailure(error)));
    });
  });

  describe('Class Redirection', () => {
    let classAction = null;

    beforeEach(() => {
      classAction = Actions.classRedirection('class1');
      generator = Saga.classRedirectionFlow();
    });

    it('Should handle successful double selection', () => {
      expect(generator.next().value).toEqual(take(Constants.CLASS_REDIRECTION));
      expect(generator.next(classAction).value).toEqual(
        put(AppActions.updateClassData(classAction.classId))
      );
      expect(generator.next(classAction).value).toEqual(
        put(Actions.classSelectionSuccess(classAction.classId))
      );
      expect(generator.next().value).toEqual(put(push('/roster')));
    });
  });

  describe('Group Smart bar refresh Redirection', () => {
    let groupAction = null;
    let teacherAction = null;
    const activeTeacherId = '333';
    let activeSchoolId = null;

    beforeEach(() => {
      groupAction = Actions.groupRedirection('groupId');
      teacherAction = Actions.teacherRedirection('333');
      generator = Saga.groupRedirectoinFlow();
    });

    it('Should handle successful redirect on group update', () => {
      activeSchoolId = '232';
      expect(generator.next().value).toEqual(take(Constants.GROUP_REDIRECTION));
      expect(generator.next(groupAction).value).toEqual(select(mockActiveSelectedSchoolId));
      expect(generator.next(activeSchoolId).value).toEqual(select(mockActiveSelectedTeacherId));
      expect(generator.next(activeTeacherId).value).toEqual(
        put(AppActions.updateTeacherData(activeTeacherId, activeSchoolId))
      );
      expect(generator.next(teacherAction).value).toEqual(
        put(AppActions.updateGroupData(groupAction.groupId))
      );
      expect(generator.next(groupAction).value).toEqual(
        put(Actions.groupSelectionSuccess(groupAction.groupId))
      );
      expect(generator.next().value).toEqual(put(push('/roster')));
    });
  });

  describe('School Redirection', () => {
    let schoolAction = null;

    beforeEach(() => {
      schoolAction = Actions.schoolRedirection('school1');
      generator = Saga.schoolRedirectionFlow();
    });

    it('Should handle successful double selection', () => {
      expect(generator.next().value).toEqual(take(Constants.SCHOOL_REDIRECTION));
      expect(generator.next(schoolAction).value).toEqual(
        put(AppActions.updateSchoolData(schoolAction.schoolId))
      );
      expect(generator.next(schoolAction).value).toEqual(
        put(Actions.schoolSelectionSuccess(schoolAction.schoolId))
      );
      expect(generator.next().value).toEqual(put(push('/roster')));
    });
  });

  describe('Teacher Redirection', () => {
    let teacherAction = null;

    beforeEach(() => {
      teacherAction = Actions.teacherRedirection('teacher1');
      generator = Saga.teacherRedirectionFlow();
    });

    it('Should handle successful double selection', () => {
      expect(generator.next().value).toEqual(take(Constants.TEACHER_REDIRECTION));
      expect(generator.next(teacherAction).value).toEqual(select(clickedSchoolIdSelector));
      expect(generator.next(clickedSchoolId).value).toEqual(
        put(AppActions.updateTeacherData(teacherAction.teacherId, clickedSchoolId))
      );
      expect(generator.next(teacherAction).value).toEqual(
        put(Actions.teacherSelectionSuccess(teacherAction.teacherId))
      );
      expect(generator.next().value).toEqual(put(push('/roster')));
    });
  });

  describe('Grade Redirection', () => {
    let gradeAction = null;

    beforeEach(() => {
      gradeAction = Actions.gradeRedirection('teacher1');
      generator = Saga.gradeRedirectionFlow();
    });

    it('Should handle successful double selection', () => {
      expect(generator.next().value).toEqual(take(Constants.GRADE_REDIRECTION));
      expect(generator.next(gradeAction).value).toEqual(select(clickedSchoolIdSelector));
      expect(generator.next(clickedSchoolId).value).toEqual(
        put(AppActions.updateGradeData(gradeAction.gradeId, clickedSchoolId))
      );
      expect(generator.next(gradeAction).value).toEqual(
        put(Actions.gradeSelectionSuccess(gradeAction.gradeId))
      );
      expect(generator.next().value).toEqual(put(push('/roster')));
    });
  });

  describe('Class Redirection in Group', () => {
    let groupAction = null;

    beforeEach(() => {
      groupAction = Actions.classRedirectionInGroup('group1');
      generator = Saga.classRedirectionInGroupFlow();
    });

    it('Should handle successful double selection', () => {
      expect(generator.next().value).toEqual(take(Constants.CLASS_REDIRECTION_IN_GROUP));
      expect(generator.next(groupAction).value).toEqual(select(clickedSchoolIdSelector));
      expect(generator.next(clickedSchoolId).value).toEqual(
        put(AppActions.updateGroupData(groupAction.classId, clickedSchoolId))
      );
      expect(generator.next(groupAction).value).toEqual(
        put(Actions.classSelectionSuccess(groupAction.classId))
      );
      expect(generator.next().value).toEqual(put(push('/roster')));
    });
  });

  describe('Class Selection', () => {
    let classAction = null;

    beforeEach(() => {
      classAction = Actions.classSelection('abcdef123');
      generator = Saga.classSelectionFlow();
    });

    it('Should handle successful single selection', () => {
      expect(generator.next().value).toEqual(take(Constants.CLASS_SELECTION));
      expect(generator.next(classAction).value).toEqual(
        put(AppActions.updateClassData(classAction.classId))
      );
      expect(generator.next().value).toEqual(take(Constants.CLASS_SELECTION));
    });

    it('Should handle successful double selection from homepage', () => {
      expect(generator.next().value).toEqual(take(Constants.CLASS_SELECTION));
      expect(generator.next(classAction).value).toEqual(
        put(Actions.classSelectionSuccess(classAction.classId))
      );
      expect(generator.next().value).toEqual(select(locationSelector));

      expect(generator.next({ pathname: '/' }).value).toEqual(put(push('/roster')));
      expect(generator.next(classAction).value).toEqual(
        put(AppActions.updateClassData(classAction.classId))
      );
    });

    it('Should handle successful double selection not from homepage', () => {
      expect(generator.next().value).toEqual(take(Constants.CLASS_SELECTION));
      expect(generator.next(classAction).value).toEqual(
        put(Actions.classSelectionSuccess(classAction.classId))
      );

      expect(generator.next().value).toEqual(select(locationSelector));
      expect(generator.next(classAction).value).toEqual(
        put(AppActions.updateClassData(classAction.classId))
      );

      // while loop starts over
      expect(generator.next({ pathname: '/reports' }).value).toEqual(
        take(Constants.CLASS_SELECTION)
      );
    });

    it('Should handle selection failure', () => {
      classAction = Actions.classSelection('abcdef1234');
      expect(generator.next().value).toEqual(take(Constants.CLASS_SELECTION));
      expect(generator.next(classAction).value).toEqual(
        put(AppActions.updateClassData(classAction.classId))
      );

      expect(generator.throw(error).value).toEqual(put(Actions.classSelectionFailure(error)));
    });
  });

  describe('Group Selection', () => {
    let groupAction = null;

    beforeEach(() => {
      groupAction = Actions.groupSelection('abcdef123');
      generator = Saga.groupSelectionFlow();
    });

    it('Should handle successful single selection', () => {
      expect(generator.next().value).toEqual(take(Constants.GROUP_SELECTION));
      expect(generator.next(groupAction).value).toEqual(
        put(AppActions.updateGroupData(groupAction.groupId))
      );
      expect(generator.next().value).toEqual(take(Constants.GROUP_SELECTION));
    });

    it('Should handle successful double selection from homepage', () => {
      expect(generator.next().value).toEqual(take(Constants.GROUP_SELECTION));
      expect(generator.next(groupAction).value).toEqual(
        put(Actions.groupSelectionSuccess(groupAction.groupId))
      );
      expect(generator.next().value).toEqual(select(locationSelector));

      expect(generator.next({ pathname: '/' }).value).toEqual(put(push('/roster')));
      expect(generator.next(groupAction).value).toEqual(
        put(AppActions.updateGroupData(groupAction.groupId))
      );
    });

    it('Should handle successful double selection not from homepage', () => {
      expect(generator.next().value).toEqual(take(Constants.GROUP_SELECTION));
      expect(generator.next(groupAction).value).toEqual(
        put(Actions.groupSelectionSuccess(groupAction.groupId))
      );
      expect(generator.next().value).toEqual(select(locationSelector));
      expect(generator.next(groupAction).value).toEqual(
        put(AppActions.updateGroupData(groupAction.groupId))
      );
      // while loop starts over
      expect(generator.next({ pathname: '/reports' }).value).toEqual(
        take(Constants.GROUP_SELECTION)
      );
    });

    it('Should handle selection failure', () => {
      groupAction = Actions.groupSelection('abcdef1234');
      expect(generator.next().value).toEqual(take(Constants.GROUP_SELECTION));
      expect(generator.next(groupAction).value).toEqual(
        put(AppActions.updateGroupData(groupAction.groupId))
      );

      expect(generator.throw(error).value).toEqual(put(Actions.groupSelectionFailure(error)));
    });
  });

  describe('Student Selection', () => {
    let studentAction = null;

    beforeEach(() => {
      studentAction = Actions.studentSelection('abcdef123');
      generator = Saga.studentsSelectionFlow();
    });

    it('Should handle successful single selection', () => {
      expect(generator.next().value).toEqual(take(Constants.STUDENT_SELECTION));
      expect(generator.next(studentAction).value).toEqual(
        put(AppActions.updateStudentData(studentAction.studentId))
      );
      expect(generator.next().value).toEqual(take(Constants.STUDENT_SELECTION));
    });

    it('Should handle successful double selection from homepage', () => {
      expect(generator.next().value).toEqual(take(Constants.STUDENT_SELECTION));
      expect(generator.next(studentAction).value).toEqual(
        put(Actions.studentSelectionSuccess(studentAction.studentId))
      );
      expect(generator.next().value).toEqual(select(locationSelector));

      expect(generator.next({ pathname: '/' }).value).toEqual(put(push('/roster')));
      expect(generator.next(studentAction).value).toEqual(
        put(AppActions.updateStudentData(studentAction.studentId))
      );
    });

    it('Should handle successful double selection not from homepage', () => {
      expect(generator.next().value).toEqual(take(Constants.STUDENT_SELECTION));
      expect(generator.next(studentAction).value).toEqual(
        put(Actions.studentSelectionSuccess(studentAction.studentId))
      );
      expect(generator.next().value).toEqual(select(locationSelector));
      expect(generator.next(studentAction).value).toEqual(
        put(AppActions.updateStudentData(studentAction.studentId))
      );
      // while loop starts over
      expect(generator.next({ pathname: '/reports' }).value).toEqual(
        take(Constants.STUDENT_SELECTION)
      );
    });

    it('Should handle selection failure', () => {
      studentAction = Actions.studentSelection('abcdef1234');
      expect(generator.next().value).toEqual(take(Constants.STUDENT_SELECTION));
      expect(generator.next(studentAction).value).toEqual(
        put(AppActions.updateStudentData(studentAction.studentId))
      );

      expect(generator.throw(error).value).toEqual(put(Actions.studentSelectionFailure(error)));
    });
  });

  describe('redirectionCommonModule', () => {
    let store = null;
    let redirection = null;
    beforeEach(() => {
      redirection = Actions.redirectionSmartBarSGT();
      generator = Saga.redirectionCommonModule();
    });

    it('verify when its cohort type School', () => {
      store = fromJS({
        activeSchoolId: ['school'],
        activeGradeId: [''],
        activeTeacherId: [''],
        activeClassId: [''],
        activeGroupId: [''],
        activeStudentId: [''],
        selectedCohType: ['School'],
      });
      expect(generator.next().value).toEqual(take(Constants.REDIRECTION_COMMON_SGT));
      expect(generator.next(redirection).value).toEqual(select(mockActiveSelectedSchoolId));
      expect(generator.next(store.getIn(['activeSchoolId', 0])).value).toEqual(
        select(mockActiveSelectedGradeId)
      );
      expect(generator.next(store.getIn(['activeGradeId', 0])).value).toEqual(
        select(mockActiveSelectedTeacherId)
      );
      expect(generator.next(store.getIn(['activeTeacherId', 0])).value).toEqual(
        select(mockActiveSelectedClassId)
      );
      expect(generator.next(store.getIn(['activeClassId', 0])).value).toEqual(
        select(mockActiveSelectedGroupId)
      );
      expect(generator.next(store.getIn(['activeGroupId', 0])).value).toEqual(
        select(mockActiveSelectedStudentId)
      );
      expect(generator.next(store.getIn(['activeStudentId', 0])).value).toEqual(
        select(mockMakeSelectCohortType)
      );
      expect(generator.next(store.getIn(['selectedCohType', 0])).value).toEqual(
        put(Actions.resetSelections())
      );
      expect(generator.next().value).toEqual(
        put(AppActions.updateSchoolData(store.getIn(['activeSchoolId', 0])))
      );
      expect(generator.next().value).toEqual(take(AppConstants.UPDATE_SCHOOL_DATA_SUCCESS));
      expect(generator.next().value).toEqual(
        put(Actions.schoolSelectionSuccess(store.getIn(['activeSchoolId', 0])))
      );
      expect(generator.next().value).toEqual(put(push('/roster')));
    });
    it('verify when its cohort type Grade', () => {
      store = fromJS({
        activeSchoolId: [''],
        activeGradeId: ['grade'],
        activeTeacherId: [''],
        activeClassId: [''],
        activeGroupId: [''],
        activeStudentId: [''],
        selectedCohType: ['Grade'],
      });
      expect(generator.next().value).toEqual(take(Constants.REDIRECTION_COMMON_SGT));
      expect(generator.next(redirection).value).toEqual(select(mockActiveSelectedSchoolId));
      expect(generator.next(store.getIn(['activeSchoolId', 0])).value).toEqual(
        select(mockActiveSelectedGradeId)
      );
      expect(generator.next(store.getIn(['activeGradeId', 0])).value).toEqual(
        select(mockActiveSelectedTeacherId)
      );
      expect(generator.next(store.getIn(['activeTeacherId', 0])).value).toEqual(
        select(mockActiveSelectedClassId)
      );
      expect(generator.next(store.getIn(['activeClassId', 0])).value).toEqual(
        select(mockActiveSelectedGroupId)
      );
      expect(generator.next(store.getIn(['activeGroupId', 0])).value).toEqual(
        select(mockActiveSelectedStudentId)
      );
      expect(generator.next(store.getIn(['activeStudentId', 0])).value).toEqual(
        select(mockMakeSelectCohortType)
      );
      expect(generator.next(store.getIn(['selectedCohType', 0])).value).toEqual(
        put(Actions.resetSelections())
      );
      expect(generator.next().value).toEqual(
        put(
          AppActions.updateGradeData(
            store.getIn(['activeGradeId', 0]),
            store.getIn(['activeSchoolId', 0])
          )
        )
      );
      expect(generator.next().value).toEqual(take(AppConstants.UPDATE_GRADE_DATA_SUCCESS));
      expect(generator.next().value).toEqual(
        put(Actions.gradeSelectionSuccess(store.getIn(['activeGradeId', 0])))
      );
      expect(generator.next().value).toEqual(put(push('/roster')));
    });
    it('verify when its cohort type Teacher', () => {
      store = fromJS({
        activeSchoolId: [''],
        activeGradeId: [''],
        activeTeacherId: ['teacher'],
        activeClassId: [''],
        activeGroupId: [''],
        activeStudentId: [''],
        selectedCohType: ['Teacher'],
      });
      expect(generator.next().value).toEqual(take(Constants.REDIRECTION_COMMON_SGT));
      expect(generator.next(redirection).value).toEqual(select(mockActiveSelectedSchoolId));
      expect(generator.next(store.getIn(['activeSchoolId', 0])).value).toEqual(
        select(mockActiveSelectedGradeId)
      );
      expect(generator.next(store.getIn(['activeGradeId', 0])).value).toEqual(
        select(mockActiveSelectedTeacherId)
      );
      expect(generator.next(store.getIn(['activeTeacherId', 0])).value).toEqual(
        select(mockActiveSelectedClassId)
      );
      expect(generator.next(store.getIn(['activeClassId', 0])).value).toEqual(
        select(mockActiveSelectedGroupId)
      );
      expect(generator.next(store.getIn(['activeGroupId', 0])).value).toEqual(
        select(mockActiveSelectedStudentId)
      );
      expect(generator.next(store.getIn(['activeStudentId', 0])).value).toEqual(
        select(mockMakeSelectCohortType)
      );
      expect(generator.next(store.getIn(['selectedCohType', 0])).value).toEqual(
        put(Actions.resetSelections())
      );
      expect(generator.next().value).toEqual(
        put(
          AppActions.updateTeacherData(
            store.getIn(['activeTeacherId', 0]),
            store.getIn(['activeSchoolId', 0])
          )
        )
      );
      expect(generator.next().value).toEqual(take(AppConstants.UPDATE_TEACHER_DATA_SUCCESS));
      expect(generator.next().value).toEqual(
        put(Actions.teacherSelectionSuccess(store.getIn(['activeTeacherId', 0])))
      );
      expect(generator.next().value).toEqual(put(push('/roster')));
    });
    it('verify when its cohort type Class', () => {
      store = fromJS({
        activeSchoolId: [''],
        activeGradeId: [''],
        activeTeacherId: [''],
        activeClassId: ['class'],
        activeGroupId: [''],
        activeStudentId: [''],
        selectedCohType: ['Class'],
      });
      expect(generator.next().value).toEqual(take(Constants.REDIRECTION_COMMON_SGT));
      expect(generator.next(redirection).value).toEqual(select(mockActiveSelectedSchoolId));
      expect(generator.next(store.getIn(['activeSchoolId', 0])).value).toEqual(
        select(mockActiveSelectedGradeId)
      );
      expect(generator.next(store.getIn(['activeGradeId', 0])).value).toEqual(
        select(mockActiveSelectedTeacherId)
      );
      expect(generator.next(store.getIn(['activeTeacherId', 0])).value).toEqual(
        select(mockActiveSelectedClassId)
      );
      expect(generator.next(store.getIn(['activeClassId', 0])).value).toEqual(
        select(mockActiveSelectedGroupId)
      );
      expect(generator.next(store.getIn(['activeGroupId', 0])).value).toEqual(
        select(mockActiveSelectedStudentId)
      );
      expect(generator.next(store.getIn(['activeStudentId', 0])).value).toEqual(
        select(mockMakeSelectCohortType)
      );
      expect(generator.next(store.getIn(['selectedCohType', 0])).value).toEqual(
        put(Actions.resetSelections())
      );
      expect(generator.next().value).toEqual(
        put(AppActions.updateClassData(store.getIn(['activeClassId', 0])))
      );
      expect(generator.next().value).toEqual(take(AppConstants.UPDATE_CLASS_DATA_SUCCESS));
      expect(generator.next().value).toEqual(
        put(Actions.classSelectionSuccess(store.getIn(['activeClassId', 0])))
      );
      expect(generator.next().value).toEqual(put(push('/roster')));
    });
    it('verify when its cohort type Group', () => {
      store = fromJS({
        activeSchoolId: [''],
        activeGradeId: [''],
        activeTeacherId: [''],
        activeClassId: [''],
        activeGroupId: ['group'],
        activeStudentId: [''],
        selectedCohType: ['Group'],
      });
      expect(generator.next().value).toEqual(take(Constants.REDIRECTION_COMMON_SGT));
      expect(generator.next(redirection).value).toEqual(select(mockActiveSelectedSchoolId));
      expect(generator.next(store.getIn(['activeSchoolId', 0])).value).toEqual(
        select(mockActiveSelectedGradeId)
      );
      expect(generator.next(store.getIn(['activeGradeId', 0])).value).toEqual(
        select(mockActiveSelectedTeacherId)
      );
      expect(generator.next(store.getIn(['activeTeacherId', 0])).value).toEqual(
        select(mockActiveSelectedClassId)
      );
      expect(generator.next(store.getIn(['activeClassId', 0])).value).toEqual(
        select(mockActiveSelectedGroupId)
      );
      expect(generator.next(store.getIn(['activeGroupId', 0])).value).toEqual(
        select(mockActiveSelectedStudentId)
      );
      expect(generator.next(store.getIn(['activeStudentId', 0])).value).toEqual(
        select(mockMakeSelectCohortType)
      );
      expect(generator.next(store.getIn(['selectedCohType', 0])).value).toEqual(
        put(Actions.resetSelections())
      );
      expect(generator.next().value).toEqual(
        put(AppActions.updateGroupData(store.getIn(['activeGroupId', 0])))
      );
      expect(generator.next().value).toEqual(take(AppConstants.UPDATE_GROUP_DATA_SUCCESS));
      expect(generator.next().value).toEqual(
        put(Actions.groupSelectionSuccess(store.getIn(['activeGroupId', 0])))
      );
      expect(generator.next().value).toEqual(put(push('/roster')));
    });
    it('verify when its cohort type Student', () => {
      store = fromJS({
        activeSchoolId: [''],
        activeGradeId: [''],
        activeTeacherId: [''],
        activeClassId: [''],
        activeGroupId: [''],
        activeStudentId: ['student'],
        selectedCohType: ['Student'],
      });
      expect(generator.next().value).toEqual(take(Constants.REDIRECTION_COMMON_SGT));
      expect(generator.next(redirection).value).toEqual(select(mockActiveSelectedSchoolId));
      expect(generator.next(store.getIn(['activeSchoolId', 0])).value).toEqual(
        select(mockActiveSelectedGradeId)
      );
      expect(generator.next(store.getIn(['activeGradeId', 0])).value).toEqual(
        select(mockActiveSelectedTeacherId)
      );
      expect(generator.next(store.getIn(['activeTeacherId', 0])).value).toEqual(
        select(mockActiveSelectedClassId)
      );
      expect(generator.next(store.getIn(['activeClassId', 0])).value).toEqual(
        select(mockActiveSelectedGroupId)
      );
      expect(generator.next(store.getIn(['activeGroupId', 0])).value).toEqual(
        select(mockActiveSelectedStudentId)
      );
      expect(generator.next(store.getIn(['activeStudentId', 0])).value).toEqual(
        select(mockMakeSelectCohortType)
      );
      expect(generator.next(store.getIn(['selectedCohType', 0])).value).toEqual(
        put(Actions.resetSelections())
      );
      expect(generator.next().value).toEqual(
        put(AppActions.updateStudentData(store.getIn(['activeStudentId', 0])))
      );
      expect(generator.next().value).toEqual(take(AppConstants.UPDATE_STUDENT_DATA_SUCCESS));
      expect(generator.next().value).toEqual(
        put(Actions.studentSelectionSuccess(store.getIn(['activeStudentId', 0])))
      );
      expect(generator.next().value).toEqual(put(push('/roster')));
    });
    it('verify when all cohorts are empty', () => {
      store = fromJS({
        activeSchoolId: [''],
        activeGradeId: [''],
        activeTeacherId: [''],
        activeClassId: [''],
        activeGroupId: [''],
        activeStudentId: [''],
        selectedCohType: [''],
      });
      expect(generator.next().value).toEqual(take(Constants.REDIRECTION_COMMON_SGT));
      expect(generator.next(redirection).value).toEqual(select(mockActiveSelectedSchoolId));
      expect(generator.next(store.getIn(['activeSchoolId', 0])).value).toEqual(
        select(mockActiveSelectedGradeId)
      );
      expect(generator.next(store.getIn(['activeGradeId', 0])).value).toEqual(
        select(mockActiveSelectedTeacherId)
      );
      expect(generator.next(store.getIn(['activeTeacherId', 0])).value).toEqual(
        select(mockActiveSelectedClassId)
      );
      expect(generator.next(store.getIn(['activeClassId', 0])).value).toEqual(
        select(mockActiveSelectedGroupId)
      );
      expect(generator.next(store.getIn(['activeGroupId', 0])).value).toEqual(
        select(mockActiveSelectedStudentId)
      );
      expect(generator.next(store.getIn(['activeStudentId', 0])).value).toEqual(
        select(mockMakeSelectCohortType)
      );
      expect(generator.next(store.getIn(['selectedCohType', 0])).value).toEqual(
        put(Actions.resetSelections())
      );
      expect(generator.next().value).toEqual(put(AppActions.updateUserData()));
      expect(generator.next().value).toEqual(put(push('/roster')));
    });
  });

  describe('Route Change Flow', () => {
    let routeAction = null;

    it('Should handle home route', () => {
      routeAction = { payload: { pathname: '/' } };

      generator = Saga.routeChangeFlow(routeAction);

      expect(generator.next().value).toEqual(put(Actions.resetSelections()));
    });

    it('Should handle non home route', () => {
      routeAction = { payload: { pathname: '/roster' } };

      generator = Saga.routeChangeFlow(routeAction);

      expect(generator.next().value).toEqual(undefined);
      expect(generator.next().done).toBeTruthy();
    });
  });

  describe('reset SmartBar Const Values', () => {
    beforeEach(() => {
      generator = Saga.resetSmartBarConstValues();
    });

    it('reset smarbar constants', () => {
      expect(generator.next().value).toEqual(take(Constants.RESET_SMARTBAR_CONSTANTS));
      expect(generator.next().value).toEqual(put(push('/')));
    });
  });

  describe('Root Saga', () => {
    beforeEach(() => {
      generator = rootSaga();
    });

    it('Should subscribe child sagas', () => {
      expect(generator.next().value).toEqual(
        all([fork(Saga.mainSelectionFlow), takeLatest(LOCATION_CHANGE, Saga.routeChangeFlow)])
      );
    });
  });

  describe('Main Selection Flow', () => {
    beforeEach(() => {
      generator = Saga.mainSelectionFlow();
    });

    it('Should subscribe child sagas', () => {
      expect(generator.next().value).toEqual(
        all([
          fork(Saga.studentsSelectionFlow),
          fork(Saga.groupSelectionFlow),
          fork(Saga.classSelectionFlow),
          fork(Saga.schoolSelectionFlow),
          fork(Saga.classRedirectionFlow),
          fork(Saga.schoolRedirectionFlow),
          fork(Saga.gradeSelectionFlow),
          fork(Saga.teacherSelectionFlow),
          fork(Saga.teacherRedirectionFlow),
          fork(Saga.gradeRedirectionFlow),
          fork(Saga.classRedirectionInGroupFlow),
          fork(Saga.groupRedirectoinFlow),
          fork(Saga.redirectionCommonModule),
          fork(Saga.resetSmartBarConstValues),
        ])
      );

      expect(generator.next(mockWatcherTasks).value).toEqual(take(LOCATION_CHANGE));

      expect(generator.next().value).toEqual(all(mockWatcherTasks.map(task => cancel(task))));
    });
  });
});
