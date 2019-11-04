/**
 * Test sagas
 */
/* eslint-disable redux-saga/yield-effects */
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  getClassData,
  getClassDataBySchool,
  getGradeDataBySchool,
  getPasswordConfig,
  getStudentDataBySchool,
} from 'containers/App/request';
import * as SmartBarSelectors from 'containers/SmartBarContainer/selectors';
import * as AppSelectors from 'containers/App/selectors';
import { studentListRequestSuccess } from 'containers/App/actions';
import { redirectionSmartBarSGT } from 'containers/SmartBarContainer/actions';
import { getStudentProfilePageData } from 'containers/ProfilePageContainer/request';
import { getActiveSchool, getUserData } from 'containers/AddEditClass/saga';
import { transformStudentDataForForm } from 'utils/transformData';
import { fromJS } from 'immutable';
import { initialize, stopSubmit } from 'redux-form/immutable';
import { USER_TYPE } from 'containers/App/constants';
import { hideModal } from 'containers/ModalController/actions';
import { transformStudentMapForPost } from '../transformers';
import * as Actions from '../actions';
import * as Constants from '../constants';
import * as Request from '../request';
import defaultSaga, * as Saga from '../saga';

describe('AddEditStudent Saga', () => {
  const sessionId = 'session-123';
  const userId = 'user-123';
  const schoolId = 'school-123';
  const studentId = 'student-123';
  const meta = {
    classes: 'classes mock data',
    grades: 'grades mock data',
    groups: [{ group_id: 'group-123', owner_id: ['class-123'] }],
    passwordConfig: 'password config mock data',
  };
  const error = 'a mock error';
  let generator = null;

  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('All calls are made', () => {
      expect(generator.next().value).toEqual(
        all([
          takeLatest(
            Constants.INITIALIZE_STUDENT_FORM_REQUEST,
            Saga.initializeStudentFormRequestFlow
          ),
          takeLatest(Constants.SAVE_STUDENT_REQUEST, Saga.handleSaveRequestFlow),
        ])
      );
    });
  });

  describe('initialize Student Form Flow', () => {
    const studentProfile = {
      name: 'foo',
      groups: { 'group-123': true },
    };

    const metaData = {
      [Constants.META_DATA_GRADES]: meta.grades,
      [Constants.META_DATA_CLASSES]: meta.classes,
      [Constants.META_DATA_GROUPS]: meta.groups,
      [Constants.META_DATA_PASSWORD_CONFIG]: meta.passwordConfig,
    };
    beforeEach(() => {
      generator = Saga.initializeStudentFormRequestFlow({ data: { edit: false } });
    });

    it('Should handle the loading flow successfully', () => {
      expect(generator.next().value).toEqual(call(getUserData));
      expect(generator.next({ sessionId, userId }).value).toEqual(call(getActiveSchool));
      expect(generator.next(schoolId).value).toEqual(
        all([
          call(Saga.loadMetaData, sessionId, schoolId, userId),
          call(Saga.getInitialState, sessionId, false),
        ])
      );
      expect(generator.next([metaData, studentProfile]).value).toEqual(
        put(
          initialize(
            Constants.FORM_STUDENT_PROFILE,
            fromJS({ ...studentProfile, ...{ classes: { 'class-123': true } }, metaData })
          )
        )
      );
      expect(generator.next().value).toEqual(put(Actions.initializeStudentFormRequestSuccess()));
      expect(generator.next().done).toBeTruthy();
    });

    it('Should handle the loading flow when failure', () => {
      expect(generator.next().value).toEqual(call(getUserData));
      expect(generator.throw(error).value).toEqual(
        put(Actions.initializeStudentFormRequestFailure(error))
      );
      expect(generator.next().done).toBeTruthy();
    });
  });

  describe('Saving Data', () => {
    let mockProfileSessionIdSelector = null;
    let mockProfileUserIdSelector = null;
    let mockStudentIdSelectorSmartBar = null;
    const studentObj = fromJS({ first_name: 'foo' });
    beforeEach(() => {
      mockProfileSessionIdSelector = jest.fn();
      mockProfileUserIdSelector = jest.fn();
      mockStudentIdSelectorSmartBar = jest.fn();
      jest
        .spyOn(SmartBarSelectors, 'makeSelectedActiveStudentId')
        .mockReturnValue(mockStudentIdSelectorSmartBar);
      jest
        .spyOn(AppSelectors, 'makeSelectProfileSessionId')
        .mockReturnValue(mockProfileSessionIdSelector);
      jest
        .spyOn(AppSelectors, 'makeSelectProfileUserId')
        .mockReturnValue(mockProfileUserIdSelector);
    });

    it('Should handle the saving flow successfully - Add Student', () => {
      generator = Saga.handleSaveRequestFlow({ studentObj });
      expect(generator.next().value).toEqual(call(getUserData));
      expect(generator.next({ sessionId, userId }).value).toEqual(
        select(mockStudentIdSelectorSmartBar)
      );
      // No student id for an `Add`
      expect(generator.next('').value).toEqual(call(getActiveSchool));
      expect(generator.next(schoolId).value).toEqual(
        call(Request.postAddStudent, sessionId, transformStudentMapForPost(studentObj, ''))
      );
      expect(generator.next().value).toEqual(put(Actions.saveStudentRequestSuccess()));
      expect(generator.next().value).toEqual(put(redirectionSmartBarSGT()));
      expect(generator.next().value).toEqual(
        call(getStudentDataBySchool, sessionId, schoolId, userId)
      );
      expect(generator.next().value).toEqual(put(studentListRequestSuccess([])));
      expect(generator.next([]).value).toEqual(put(hideModal()));
      expect(generator.next().done).toBeTruthy();
    });

    it('Should handle the saving flow successfully - Edit Student', () => {
      generator = Saga.handleSaveRequestFlow({ studentObj, isEdit: true });
      expect(generator.next().value).toEqual(call(getUserData));
      expect(generator.next({ sessionId, userId }).value).toEqual(
        select(mockStudentIdSelectorSmartBar)
      );
      // No student id for an `Add`
      expect(generator.next(studentId).value).toEqual(call(getActiveSchool));
      expect(generator.next(schoolId).value).toEqual(
        call(Request.postEditStudent, sessionId, transformStudentMapForPost(studentObj, studentId))
      );
      expect(generator.next().value).toEqual(put(Actions.saveStudentRequestSuccess()));
      // expect(generator.next().value).toEqual(put(usageSummaryRequest()));
      expect(generator.next().value).toEqual(put(redirectionSmartBarSGT()));
      expect(generator.next().value).toEqual(
        call(getStudentDataBySchool, sessionId, schoolId, userId)
      );
      expect(generator.next().value).toEqual(put(studentListRequestSuccess([])));
      expect(generator.next().value).toEqual(put(hideModal()));
      expect(generator.next().done).toBeTruthy();
    });

    it('Should handle the saving flow when failure', () => {
      generator = Saga.handleSaveRequestFlow({ studentObj });
      expect(generator.next().value).toEqual(call(getUserData));
      expect(generator.throw(error).value).toEqual(
        put(stopSubmit(Constants.FORM_STUDENT_PROFILE, error))
      );
      expect(generator.next().value).toEqual(put(Actions.saveStudentRequestFailure(error)));
      expect(generator.next().done).toBeTruthy();
    });
  });

  describe('Meta Data', () => {
    const userTypeTeacher = 'Teacher';
    const userTypeAdmin = 'Administrator';
    let mockProfileUserTypeSelector;
    beforeEach(() => {
      mockProfileUserTypeSelector = jest.fn();
      jest
        .spyOn(AppSelectors, 'makeSelectProfileUserType')
        .mockReturnValue(mockProfileUserTypeSelector);
      generator = Saga.loadMetaData(sessionId, schoolId, userId);
    });

    it('Should handle successful loading meta data for user with Teacher user type', () => {
      expect(generator.next().value).toEqual(select(mockProfileUserTypeSelector));
      expect(generator.next(userTypeTeacher).value).toEqual(
        all([
          call(getGradeDataBySchool, sessionId, schoolId),
          call(getClassData, sessionId, schoolId, userId),
          call(Request.getGroupDataBySchool, sessionId, schoolId),
          call(getPasswordConfig, sessionId),
        ])
      );
      const { classes, grades, groups, passwordConfig } = meta;
      // Pass-in mock returned data from `calls`
      const finalNext = generator.next([grades, classes, groups, passwordConfig]);
      // Make sure returned data gets transformed into expected shape
      expect(finalNext.value).toEqual({
        [Constants.META_DATA_GRADES]: grades,
        [Constants.META_DATA_CLASSES]: classes,
        [Constants.META_DATA_GROUPS]: groups,
        [Constants.META_DATA_PASSWORD_CONFIG]: passwordConfig,
      });
      expect(finalNext.done).toBeTruthy();
    });

    it('Should handle successful loading meta data for user with Admin user type', () => {
      expect(generator.next().value).toEqual(select(mockProfileUserTypeSelector));
      expect(generator.next(userTypeAdmin).value).toEqual(
        all([
          call(getGradeDataBySchool, sessionId, schoolId),
          call(getClassDataBySchool, sessionId, schoolId, userId),
          call(Request.getGroupDataBySchool, sessionId, schoolId),
          call(getPasswordConfig, sessionId),
        ])
      );
      const { classes, grades, groups, passwordConfig } = meta;
      // Pass-in mock returned data from `calls`
      const finalNext = generator.next([grades, classes, groups, passwordConfig]);
      // Make sure returned data gets transformed into expected shape
      expect(finalNext.value).toEqual({
        [Constants.META_DATA_GRADES]: grades,
        [Constants.META_DATA_CLASSES]: classes,
        [Constants.META_DATA_GROUPS]: groups,
        [Constants.META_DATA_PASSWORD_CONFIG]: passwordConfig,
      });
      expect(finalNext.done).toBeTruthy();
    });
  });

  describe('Initial Form State', () => {
    let mockStudentIdSelector;
    let mockClassIdSelector;
    let mockGroupIdSelector;
    let mockGradeIdSelector;
    beforeEach(() => {
      mockStudentIdSelector = jest.fn();
      mockClassIdSelector = jest.fn();
      mockGroupIdSelector = jest.fn();
      mockGradeIdSelector = jest.fn();
      jest
        .spyOn(SmartBarSelectors, 'makeSelectedActiveStudentId')
        .mockReturnValue(mockStudentIdSelector);
      jest
        .spyOn(SmartBarSelectors, 'makeSelectedActiveClassId')
        .mockReturnValue(mockClassIdSelector);
      jest
        .spyOn(SmartBarSelectors, 'makeSelectedActiveGroupId')
        .mockReturnValue(mockGroupIdSelector);
      jest
        .spyOn(SmartBarSelectors, 'makeSelectedActiveGradeId')
        .mockReturnValue(mockGradeIdSelector);
    });
    describe('Edit a Student', () => {
      beforeEach(() => {
        generator = Saga.getInitialState(sessionId, true);
      });

      it('Should get initial state for an "Edit Student"', () => {
        const name = 'foo from server';
        expect(generator.next().value).toEqual(select(mockStudentIdSelector));
        expect(generator.next(studentId).value).toEqual(select(mockGradeIdSelector));
        expect(generator.next().value).toEqual(select(mockClassIdSelector));
        expect(generator.next().value).toEqual(select(mockGroupIdSelector));
        expect(generator.next().value).toEqual(
          call(getStudentProfilePageData, sessionId, studentId)
        );
        expect(generator.next({ name }).value).toEqual(call(transformStudentDataForForm, { name }));
        const finalNext = generator.next({ name });
        expect(finalNext.value).toEqual({ name });
        expect(finalNext.done).toBeTruthy();
      });
    });

    describe('Add a Student', () => {
      beforeEach(() => {
        generator = Saga.getInitialState(sessionId);
      });

      it('Should get initial state for an "Add Student"', () => {
        expect(generator.next().value).toEqual(select(mockStudentIdSelector));
        expect(generator.next().value).toEqual(select(mockGradeIdSelector));
        expect(generator.next().value).toEqual(select(mockClassIdSelector));
        expect(generator.next().value).toEqual(select(mockGroupIdSelector));
        expect(generator.next().value).toEqual(
          call(transformStudentDataForForm, { user_type: USER_TYPE.Student })
        );
        const finalNext = generator.next({});
        // Make sure returned data gets transformed into expected shape
        expect(finalNext.value).toEqual({});
        expect(finalNext.done).toBeTruthy();
      });

      it('Should get initial state for an "Add Student" with smartbar selections', () => {
        const transformedData = {
          user_type: USER_TYPE.Student,
          selectedClass: { 'foo-class': true },
          selectedGrade: 'PK',
          selectedGroup: { 'foo-group': true },
        };
        expect(generator.next().value).toEqual(select(mockStudentIdSelector));
        expect(generator.next(studentId).value).toEqual(select(mockGradeIdSelector));
        expect(generator.next('PK').value).toEqual(select(mockClassIdSelector));
        expect(generator.next('foo-class').value).toEqual(select(mockGroupIdSelector));
        expect(generator.next('foo-group').value).toEqual(
          call(transformStudentDataForForm, transformedData)
        );
        const finalNext = generator.next(transformedData);
        // Make sure returned data gets transformed into expected shape
        expect(finalNext.value).toEqual(transformedData);
        expect(finalNext.done).toBeTruthy();
      });
    });
  });
});
