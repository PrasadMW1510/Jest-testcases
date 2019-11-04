/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { COHORT_TYPE } from 'containers/App/constants';
import { genericGetAPICall } from 'containers/App/request';
import * as Selectors from 'containers/App/selectors';
import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import * as SmartBarSelectors from 'containers/SmartBarContainer/selectors';
import { createEnrollmentURLObj } from 'utils/programSettingsUtils';

import * as Actions from '../actions';
import * as Constants from '../constants';
import defaultSaga, * as Saga from '../saga';

describe('ProgramSettingsContainer Saga', () => {
  let generator = null;
  const error = 'mockError';

  let cohortObjSelector = null;
  let sessionIdSelector = null;
  let userOrgIdSelector = null;
  let userOrgTypeSelector = null;

  let mockCohortObj = null;
  let mockSessionId = null;
  let mockUserOrgId = null;
  let mockUserOrgType = null;
  let mockEnrollmentList = null;

  afterEach(() => {
    expect(generator.next().done).toBeTruthy();
  });

  beforeEach(() => {
    cohortObjSelector = jest.fn();
    sessionIdSelector = jest.fn();
    userOrgIdSelector = jest.fn();
    userOrgTypeSelector = jest.fn();

    jest
      .spyOn(SmartBarSelectors, 'makeSelectEffectiveCohortObject')
      .mockReturnValue(cohortObjSelector);
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(sessionIdSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserOrgId').mockReturnValue(userOrgIdSelector);
    jest.spyOn(Selectors, 'makeSelectLoginUserOrg').mockReturnValue(userOrgTypeSelector);

    mockCohortObj = {
      cohortType: COHORT_TYPE.District,
      id: 'mockDistrictId',
    };
    mockSessionId = 'mockSessionId';
    mockUserOrgId = 'mockUserOrgId';
    mockUserOrgType = 'mockUserOrgType';
    mockEnrollmentList = {
      applications: [
        {
          application: 'mockApplication',
        },
      ],
    };
  });

  describe('programSettingsEnrollmentListFlow', () => {
    beforeEach(() => {
      generator = Saga.programSettingsEnrollmentListFlow();
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(select(cohortObjSelector));
      expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));
      expect(generator.next(mockSessionId).value).toEqual(select(userOrgIdSelector));
      expect(generator.next(mockUserOrgId).value).toEqual(select(userOrgTypeSelector));

      const mockURLObj = createEnrollmentURLObj(
        mockCohortObj,
        mockSessionId,
        mockUserOrgType,
        mockUserOrgId
      );

      expect(generator.next(mockUserOrgType).value).toEqual(
        call(genericGetAPICall, mockURLObj.url, mockURLObj.params)
      );
      expect(generator.next(mockEnrollmentList).value).toEqual(
        put(
          Actions.programSettingsEnrollmentListSuccess(
            mockEnrollmentList.applications[0].application
          )
        )
      );
    });

    it('should handle failure', () => {
      expect(generator.next().value).toEqual(select(cohortObjSelector));
      expect(generator.throw(error).value).toEqual(
        put(Actions.programSettingsEnrollmentListFailure(error))
      );
    });
  });

  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('All calls are made', () => {
      expect(generator.next().value).toEqual(
        all([
          takeLatest(
            Constants.PROGRAM_SETTINGS_ENROLLMENT_LIST,
            Saga.programSettingsEnrollmentListFlow
          ),
          takeLatest(
            SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
            Saga.programSettingsEnrollmentListFlow
          ),
          takeLatest(
            SmartBarConstants.GRADE_SELECTION_SUCCESS,
            Saga.programSettingsEnrollmentListFlow
          ),
          takeLatest(
            SmartBarConstants.TEACHER_SELECTION_SUCCESS,
            Saga.programSettingsEnrollmentListFlow
          ),
          takeLatest(
            SmartBarConstants.CLASS_SELECTION_SUCCESS,
            Saga.programSettingsEnrollmentListFlow
          ),
          takeLatest(
            SmartBarConstants.GROUP_SELECTION_SUCCESS,
            Saga.programSettingsEnrollmentListFlow
          ),
          takeLatest(
            SmartBarConstants.STUDENT_SELECTION_SUCCESS,
            Saga.programSettingsEnrollmentListFlow
          ),
        ])
      );
    });
  });
});
