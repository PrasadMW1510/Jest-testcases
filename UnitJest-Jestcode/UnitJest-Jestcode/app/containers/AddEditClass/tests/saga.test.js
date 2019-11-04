/**
 * Test sagas
 */
/* eslint-disable redux-saga/yield-effects */
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { initialize, change, setSubmitFailed } from 'redux-form/immutable';
import { transformClassDataForForm, transformClassMapForPost } from 'utils/transformData';
import * as SmartBarSelectors from 'containers/SmartBarContainer/selectors';
import * as AppSelectors from 'containers/App/selectors';
import { redirectionSmartBarSGT } from 'containers/SmartBarContainer/actions';
import { hideModal } from 'containers/ModalController/actions';
import { getGradeDataBySchool, getTeacherDataBySchool } from 'containers/App/request';
import { getClassDetails } from 'containers/ProfilePageContainer/request';
import { getStudentDataBySchool, postAddClass, postEditClass } from '../request';
import * as Actions from '../actions';
import {
  FORM_CLASS_PROFILE,
  INITIALIZE_CLASS_FORM_REQUEST,
  META_DATA_GRADES,
  META_DATA_TEACHERS,
  META_DATA_STUDENTS,
  SAVE_CLASS_REQUEST,
  SAVE_CLASS_MIA_REQUEST,
} from '../constants';
import defaultSaga, * as Saga from '../saga';

describe('EditClass Saga', () => {
  const sessionId = 'session-123';
  const schoolId = 'school-123';
  const schoolIdSmartBarSelection = 'smartbar-selected-school-xyz';
  const userId = 'user-123';
  const classId = 'class-123';
  const metaDataGrades = 'grades data';
  const metaDataTeachers = 'teachers data';
  const metaDataStudents = 'students data';
  const error = 'an error';

  let generator = null;

  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('All calls are made', () => {
      expect(generator.next().value).toEqual(
        all([
          takeLatest(INITIALIZE_CLASS_FORM_REQUEST, Saga.initializeClassFormRequestFlow),
          takeLatest(SAVE_CLASS_REQUEST, Saga.handleSaveRequestFlow),
          takeLatest(SAVE_CLASS_MIA_REQUEST, Saga.handleSaveMIARequestFlow),
        ])
      );
    });
  });

  describe('initializeClassFormRequestFlow', () => {
    const classProfile = {
      name: 'foo class',
    };
    let mockClassIdSelectorSmartBar = null;

    beforeEach(() => {
      mockClassIdSelectorSmartBar = jest.fn();
      generator = Saga.initializeClassFormRequestFlow({ data: { edit: false } });
      jest
        .spyOn(SmartBarSelectors, 'makeSelectedActiveClassId')
        .mockReturnValue(mockClassIdSelectorSmartBar);
    });

    it('Should handle the loading flow successfully', () => {
      const metaData = {
        [META_DATA_GRADES]: metaDataGrades,
        [META_DATA_TEACHERS]: metaDataTeachers,
        [META_DATA_STUDENTS]: metaDataStudents,
      };

      expect(generator.next().value).toEqual(call(Saga.getUserData));
      expect(generator.next({ sessionId, userId }).value).toEqual(call(Saga.getActiveSchool));
      expect(generator.next(schoolId).value).toEqual(
        all([
          call(Saga.loadMetaData, sessionId, schoolId, userId),
          call(Saga.getInitialState, sessionId, userId, false, undefined),
        ])
      );
      expect(generator.next([metaData, classProfile]).value).toEqual(
        put(initialize(FORM_CLASS_PROFILE, fromJS({ ...classProfile, metaData })))
      );
      expect(generator.next().value).toEqual(put(Actions.initializeClassFormRequestSuccess()));
      expect(generator.next().done).toBeTruthy();
    });

    it('Should handle the loading flow when failure', () => {
      expect(generator.next().value).toEqual(call(Saga.getUserData));
      expect(generator.throw(error).value).toEqual(
        put(Actions.initializeClassFormRequestFailure(error))
      );
      expect(generator.next().done).toBeTruthy();
    });
  });

  describe('Meta Data', () => {
    beforeEach(() => {
      generator = Saga.loadMetaData(sessionId, schoolId, userId);
    });

    it('Should handle successful loading meta data', () => {
      expect(generator.next().value).toEqual(
        all([
          call(getGradeDataBySchool, sessionId, schoolId, userId),
          call(getTeacherDataBySchool, sessionId, schoolId, userId),
          call(getStudentDataBySchool, sessionId, schoolId, userId),
        ])
      );
      // Pass-in some mock returned data from `calls`
      const finalNext = generator.next([metaDataGrades, metaDataTeachers, metaDataStudents]);
      // Make sure returned data gets transformed into expected shape
      expect(finalNext.value).toEqual({
        [META_DATA_GRADES]: metaDataGrades,
        [META_DATA_TEACHERS]: metaDataTeachers,
        [META_DATA_STUDENTS]: metaDataStudents,
      });
      expect(finalNext.done).toBeTruthy();
    });
  });

  describe('Initial Form State - Add a Class', () => {
    let mockClassIdSelector;
    beforeEach(() => {
      generator = Saga.getInitialState(sessionId, userId);
      mockClassIdSelector = jest.fn();
      jest
        .spyOn(SmartBarSelectors, 'makeSelectedActiveClassId')
        .mockReturnValue(mockClassIdSelector);
    });

    it('Should get initial state for an "Add Class"', () => {
      expect(generator.next().value).toEqual(select(mockClassIdSelector));
      const finalNext = generator.next(classId);
      // Make sure returned data gets transformed into expected shape
      expect(finalNext.value).toEqual(
        // teacher1 value gets populated with userId
        Object.assign({}, transformClassDataForForm({}), {
          teacher1: userId,
          teacherList: [userId],
        })
      );
      expect(finalNext.done).toBeTruthy();
    });
  });

  describe('Initial Form State - Edit a Class', () => {
    let mockClassIdSelector;
    beforeEach(() => {
      generator = Saga.getInitialState(sessionId, userId, true);
      mockClassIdSelector = jest.fn();
      jest
        .spyOn(SmartBarSelectors, 'makeSelectedActiveClassId')
        .mockReturnValue(mockClassIdSelector);
    });

    it('Should get initial state for an "Edit Class"', () => {
      const name = 'foo from server';
      expect(generator.next().value).toEqual(select(mockClassIdSelector));
      expect(generator.next(classId).value).toEqual(call(getClassDetails, sessionId, classId));
      const finalNext = generator.next({ name });
      // Make sure returned data gets transformed into expected shape
      expect(finalNext.value).toEqual(transformClassDataForForm({ name }));
      expect(finalNext.done).toBeTruthy();
    });
  });

  describe('Saving Data', () => {
    let mockProfileSessionIdSelector = null;
    let mockProfileUserIdSelector = null;
    let mockClassIdSelectorSmartBar = null;
    const classObject = fromJS({ name: 'foo', teacherList: [] });
    beforeEach(() => {
      mockProfileSessionIdSelector = jest.fn();
      mockProfileUserIdSelector = jest.fn();
      mockClassIdSelectorSmartBar = jest.fn();
      jest
        .spyOn(SmartBarSelectors, 'makeSelectedActiveClassId')
        .mockReturnValue(mockClassIdSelectorSmartBar);
      jest
        .spyOn(AppSelectors, 'makeSelectProfileSessionId')
        .mockReturnValue(mockProfileSessionIdSelector);
      jest
        .spyOn(AppSelectors, 'makeSelectProfileUserId')
        .mockReturnValue(mockProfileUserIdSelector);
    });

    it('Should handle the saving flow successfully - Add Class', () => {
      generator = Saga.handleSaveRequestFlow({ classObject });
      expect(generator.next().value).toEqual(call(Saga.getUserData));
      expect(generator.next({ sessionId, userId }).value).toEqual(
        select(mockClassIdSelectorSmartBar)
      );
      expect(generator.next(classId).value).toEqual(call(Saga.getActiveSchool));
      expect(generator.next(schoolId).value).toEqual(
        call(postAddClass, sessionId, transformClassMapForPost(classObject, classId, schoolId))
      );
      expect(generator.next().value).toEqual(put(Actions.saveClassRequestSuccess()));
      // expect(generator.next().value).toEqual(put(updateTeacherData(userId, schoolId)));
      expect(generator.next().value).toEqual(put(redirectionSmartBarSGT()));
      expect(generator.next().value).toEqual(put(hideModal()));
      expect(generator.next().done).toBeTruthy();
    });

    it('Should handle the saving flow successfully - Edit Class', () => {
      generator = Saga.handleSaveRequestFlow({ classObject, isEdit: true });
      expect(generator.next().value).toEqual(call(Saga.getUserData));
      expect(generator.next({ sessionId, userId }).value).toEqual(
        select(mockClassIdSelectorSmartBar)
      );
      expect(generator.next(classId).value).toEqual(call(Saga.getActiveSchool));
      expect(generator.next(schoolId).value).toEqual(
        call(postEditClass, sessionId, transformClassMapForPost(classObject, classId, schoolId))
      );
      expect(generator.next().value).toEqual(put(Actions.saveClassRequestSuccess()));
      // expect(generator.next().value).toEqual(put(updateTeacherData(userId, schoolId)));
      expect(generator.next().value).toEqual(put(redirectionSmartBarSGT()));
      expect(generator.next().value).toEqual(put(hideModal()));
      expect(generator.next().done).toBeTruthy();
    });

    it('Should handle the saving flow when failure', () => {
      generator = Saga.handleSaveRequestFlow({ classObject });
      expect(generator.next().value).toEqual(call(Saga.getUserData));
      expect(generator.throw(error).value).toEqual(
        put(change(FORM_CLASS_PROFILE, 'serverErrors', error))
      );
      expect(generator.next().value).toEqual(put(setSubmitFailed(FORM_CLASS_PROFILE)));
      expect(generator.next().value).toEqual(put(Actions.saveClassRequestFailure(error)));
      expect(generator.next().done).toBeTruthy();
    });
  });

  describe('User Data', () => {
    let mockProfileSessionIdSelector = null;
    let mockProfileUserIdSelector = null;

    beforeEach(() => {
      generator = Saga.getUserData();
      mockProfileSessionIdSelector = jest.fn();
      mockProfileUserIdSelector = jest.fn();
      jest
        .spyOn(AppSelectors, 'makeSelectProfileSessionId')
        .mockReturnValue(mockProfileSessionIdSelector);
      jest
        .spyOn(AppSelectors, 'makeSelectProfileUserId')
        .mockReturnValue(mockProfileUserIdSelector);
    });

    it('Should handle returning user data', () => {
      expect(generator.next().value).toEqual(select(mockProfileSessionIdSelector));
      expect(generator.next(sessionId).value).toEqual(select(mockProfileUserIdSelector));
      const finalNext = generator.next(userId);
      // Make sure returned data gets transformed into expected shape
      expect(finalNext.value).toEqual({ sessionId, userId });
      expect(finalNext.done).toBeTruthy();
    });
  });

  describe('Selected School Id', () => {
    const profileOrgsData = fromJS([{ organization: [{ org_id: [schoolId], type: ['school'] }] }]);
    const profileOrgsDistrictData = fromJS([
      { organization: [{ org_id: ['district-123'], type: ['district'] }] },
    ]);
    let mockSchoolIdSelectorSmartBar = null;
    let mockProfileOrganizationData = null;
    beforeEach(() => {
      generator = Saga.getActiveSchool();
      mockSchoolIdSelectorSmartBar = jest.fn();
      mockProfileOrganizationData = jest.fn();
      jest
        .spyOn(SmartBarSelectors, 'makeSelectedActiveSchoolId')
        .mockReturnValue(mockSchoolIdSelectorSmartBar);
      jest
        .spyOn(AppSelectors, 'makeSelectProfileOrganizationData')
        .mockReturnValue(mockProfileOrganizationData);
    });

    it('Should handle returning a schoolId when SmartBar is selected', () => {
      expect(generator.next().value).toEqual(select(mockSchoolIdSelectorSmartBar));
      const finalNext = generator.next(schoolIdSmartBarSelection);
      // Make sure returned data gets transformed into expected shape
      expect(finalNext.value).toEqual(schoolIdSmartBarSelection);
      expect(finalNext.done).toBeTruthy();
    });

    it('Should handle returning a schoolId when there is no smartbar selection and there is a school org_id', () => {
      expect(generator.next().value).toEqual(select(mockSchoolIdSelectorSmartBar));
      // No smartbar selection, pass-in null
      expect(generator.next(null).value).toEqual(select(mockProfileOrganizationData));
      const finalYield = generator.next(profileOrgsData);
      // Make sure returned data gets transformed into expected shape
      expect(finalYield.value).toEqual(schoolId);
      expect(finalYield.done).toBeTruthy();
    });

    it('Should return null when there is no smartbar selection and there is not a school org_id', () => {
      expect(generator.next().value).toEqual(select(mockSchoolIdSelectorSmartBar));
      // No smartbar selection, pass-in null
      expect(generator.next(null).value).toEqual(select(mockProfileOrganizationData));
      const finalYield = generator.next(profileOrgsDistrictData);
      // Make sure returned data gets transformed into expected shape
      expect(finalYield.value).toEqual(null);
      expect(finalYield.done).toBeTruthy();
    });
  });
});
