/**
 * Test sagas
 */
/* eslint-disable redux-saga/yield-effects */
import { call, takeLatest, select, all } from 'redux-saga/effects';
import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import * as SmartBarSelectors from 'containers/SmartBarContainer/selectors';
import { USER_ORG, COHORT_TYPE } from 'containers/App/constants';
import * as AppSelectors from 'containers/App/selectors';
import * as Request from '../request';
import * as Constants from '../constants';
import defaultSaga, * as Saga from '../saga';

describe('FMGradingToolsContainer Saga', () => {
  const sessionId = 'session-123';
  const userOrgType = USER_ORG.School;
  const userOrgId = 'school-123';

  describe('defaultSaga', () => {
    let generator;
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('All calls are made', () => {
      expect(generator.next().value).toEqual(
        all([
          takeLatest(
            [
              Constants.FM_STUDENT_OPERATION_REQUEST,
              SmartBarConstants.CLASS_SELECTION_SUCCESS,
              SmartBarConstants.GRADE_SELECTION_SUCCESS,
              SmartBarConstants.GROUP_SELECTION_SUCCESS,
              SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
              SmartBarConstants.STUDENT_SELECTION_SUCCESS,
              SmartBarConstants.TEACHER_SELECTION_SUCCESS,
            ],
            Saga.FMStudentOperationRequestFlow
          ),
        ]),
        takeLatest(Constants.FM_GENERATE_PDF_REPORT, Saga.FMGeneratePdfReportFlow)
      );
    });
  });

  describe('FMStudentOperationRequestFlow', () => {
    const generator = Saga.FMStudentOperationRequestFlow();

    it('should first get the profile data', () => {
      expect(generator.next().value).toEqual(call(Saga.getProfileData));
    });

    it('should second select the effectiveCohortObject', () => {
      const mockCohortSelector = jest.fn();
      jest
        .spyOn(SmartBarSelectors, 'makeSelectEffectiveCohortObject')
        .mockReturnValue(mockCohortSelector);

      expect(generator.next({ sessionId, userOrgId, userOrgType }).value).toEqual(
        select(mockCohortSelector)
      );
    });

    it('should third call the getFMStudentOperation API route', () => {
      const mockApiParam = {
        cohortType: COHORT_TYPE.Teacher,
        schoolId: userOrgId,
        sessionId,
      };
      expect(generator.next(mockApiParam).value).toEqual(
        call(Request.getFMStudentOperation, mockApiParam)
      );
    });
  });

  describe('FMGeneratePdfReportFlow', () => {
    const sagaParams = {
      current: true,
      addition: false,
      subtraction: false,
      multiplication: false,
      division: false,
      problemType: '1digit',
      orientation: 'horizontal',
      answerKey: false,
    };
    const generator = Saga.FMGeneratePdfReportFlow(sagaParams);

    it('should first get the profile data', () => {
      expect(generator.next().value).toEqual(call(Saga.getProfileData));
    });

    it('should second select the effectiveCohortObject', () => {
      const mockCohortSelector = jest.fn();
      jest
        .spyOn(SmartBarSelectors, 'makeSelectEffectiveCohortObject')
        .mockReturnValue(mockCohortSelector);

      expect(generator.next({ sessionId, userOrgId, userOrgType }).value).toEqual(
        select(mockCohortSelector)
      );
    });

    it('should third call the FMGeneratePdfReport API route', () => {
      const mockApiParam = {
        cohortType: COHORT_TYPE.Teacher,
        sessionId,
        ...sagaParams,
      };
      expect(generator.next(mockApiParam).value).toEqual(
        call(Request.FMGeneratePdfReport, mockApiParam)
      );
    });
  });

  describe('Get Profile Data', () => {
    let generator;
    let mockProfileSessionIdSelector = null;
    let mockProfileUserOrgIdSelector = null;
    let mockLoginUserOrgSelector = null;

    beforeEach(() => {
      generator = Saga.getProfileData();
      mockProfileSessionIdSelector = jest.fn();
      mockProfileUserOrgIdSelector = jest.fn();
      mockLoginUserOrgSelector = jest.fn();
      jest
        .spyOn(AppSelectors, 'makeSelectProfileSessionId')
        .mockReturnValue(mockProfileSessionIdSelector);
      jest
        .spyOn(AppSelectors, 'makeSelectProfileUserOrgId')
        .mockReturnValue(mockProfileUserOrgIdSelector);
      jest.spyOn(AppSelectors, 'makeSelectLoginUserOrg').mockReturnValue(mockLoginUserOrgSelector);
    });

    it('Should handle returning profile data', () => {
      expect(generator.next().value).toEqual(select(mockProfileSessionIdSelector));
      expect(generator.next(sessionId).value).toEqual(select(mockLoginUserOrgSelector));
      expect(generator.next(userOrgType).value).toEqual(select(mockProfileUserOrgIdSelector));
      const finalNext = generator.next(userOrgId);
      // Make sure returned data gets transformed into expected shape
      expect(finalNext.value).toEqual({ sessionId, userOrgId, userOrgType });
      expect(finalNext.done).toBeTruthy();
    });
  });
});
