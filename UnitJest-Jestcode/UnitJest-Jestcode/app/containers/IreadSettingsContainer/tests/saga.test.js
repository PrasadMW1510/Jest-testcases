/**
 * Test  sagas
 */
/* eslint-disable redux-saga/yield-effects */
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { COHORT_TYPE } from 'containers/App/constants';
import { genericNonSLMSGetAPICall, genericNonSLMSPostAPICall } from 'containers/App/request';
import * as Selectors from 'containers/App/selectors';
import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import * as SmartBarSelectors from 'containers/SmartBarContainer/selectors';

import * as Actions from '../actions';
import * as Constants from '../constants';
import defaultSaga, * as Saga from '../saga';

describe('IreadSettingsContainer Saga', () => {
  let generator = null;
  const err = 'err';

  let cohortObjSelector = null;
  let sessionIdSelector = null;

  let mockCohortObj = null;
  let mockSessionId = null;
  let mockUrlObj = null;
  let mockResponse = null;

  beforeEach(() => {
    cohortObjSelector = jest.fn();
    sessionIdSelector = jest.fn();

    jest
      .spyOn(SmartBarSelectors, 'makeSelectEffectiveCohortObject')
      .mockReturnValue(cohortObjSelector);
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(sessionIdSelector);

    mockSessionId = 'mockSessionId';
  });

  afterEach(() => {
    expect(generator.next().done).toBeTruthy();
  });

  describe('getIreadProgramSettings', () => {
    beforeEach(() => {
      generator = Saga.getIreadProgramSettings();
    });

    describe('All calls pass', () => {
      it('cohortType is District', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.District,
          id: 'mockDistrictId',
        };

        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(
          put(Actions.IreadProgramSettingsRequestSuccess({}))
        );
      });

      it('cohortType is School', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.School,
          id: 'mockSchoolId',
        };

        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(
          put(Actions.IreadProgramSettingsRequestSuccess({}))
        );
      });

      it('cohortType is Grade', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Grade,
          id: 'mockGradeId',
        };

        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(
          put(Actions.IreadProgramSettingsRequestSuccess({}))
        );
      });

      it('cohortType is Teacher', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Teacher,
          id: 'mockTeacherId',
        };

        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(
          put(Actions.IreadProgramSettingsRequestSuccess({}))
        );
      });

      it('cohortType is a valid cohort', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Student,
          id: 'mockStudentId',
        };

        mockUrlObj = {
          url: Constants.IREAD_SETTINGS_URL,
          params: {
            command: 'GetCohortSettings',
            sid: mockSessionId,
            cohort_id: mockCohortObj.id,
            cohort_type: mockCohortObj.cohortType.toLowerCase(),
          },
        };

        mockResponse = {
          output: {
            output_data: [{ cohort_settings: ['mockSettings'] }],
          },
        };

        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(
          call(genericNonSLMSGetAPICall, mockUrlObj.url, mockUrlObj.params)
        );

        expect(generator.next(mockResponse).value).toEqual(
          put(Actions.IreadProgramSettingsRequestSuccess('mockSettings'))
        );
      });
    });

    it('should handle a failure', () => {
      expect(generator.next().value).toEqual(select(cohortObjSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.IreadProgramSettingsRequestFailure(err))
      );
    });
  });

  describe('saveIreadEnrollmentProgramSettings', () => {
    beforeEach(() => {
      generator = Saga.saveIreadEnrollmentProgramSettings({ settings: 'mockSettings' });
    });

    it('All calls pass', () => {
      mockCohortObj = {
        cohortType: COHORT_TYPE.Student,
        id: 'mockStudentId',
      };

      mockUrlObj = {
        url: Constants.IREAD_SETTINGS_URL,
        params: {
          command: 'SetCohortSettings',
          sid: mockSessionId,
          cohort_id: mockCohortObj.id,
          cohort_type: mockCohortObj.cohortType.toLowerCase(),
        },
      };

      mockResponse = {
        output: {
          output_data: { cohort_settings: 'mockSettings' },
        },
      };

      expect(generator.next().value).toEqual(select(cohortObjSelector));
      expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));
      expect(generator.next(mockSessionId).value).toEqual(
        call(genericNonSLMSPostAPICall, mockUrlObj.url, mockUrlObj.params, mockResponse)
      );
      expect(generator.next().value).toEqual(put(Actions.IreadSaveRequestSuccess()));
      expect(generator.next().value).toEqual(call(Saga.getIreadProgramSettings));
    });

    it('should handle a failure', () => {
      expect(generator.next().value).toEqual(select(cohortObjSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.IreadSaveRequestFailure(err)));
    });
  });

  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('All calls are made', () => {
      const getSettingsConstants = [
        Constants.IREAD_PROGRAM_SETTINGS_REQUEST,
        SmartBarConstants.CLASS_SELECTION_SUCCESS,
        SmartBarConstants.GROUP_SELECTION_SUCCESS,
        SmartBarConstants.STUDENT_SELECTION_SUCCESS,
      ];

      expect(generator.next().value).toEqual(
        all([
          takeLatest(getSettingsConstants, Saga.getIreadProgramSettings),
          takeLatest(Constants.IREAD_SAVE_REQUEST, Saga.saveIreadEnrollmentProgramSettings),
        ])
      );
    });
  });
});
