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

describe('S44NGSettingContainer Saga', () => {
  let generator = null;
  const error = 'mockError';

  let cohortObjSelector = null;
  let sessionIdSelector = null;

  let mockCohortObj = null;
  let mockSessionId = null;
  let mockURLObj = null;
  let mockOutput = null;

  let mockSettingData = null;
  let mockPayloadData = null;

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

  describe('s44NGProgramSettingsContainerFlow', () => {
    beforeEach(() => {
      generator = Saga.s44NGProgramSettingsContainerFlow();
    });

    describe('All calls pass', () => {
      it('cohortType is District', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.District,
          id: 'mockDistrictId',
        };

        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(
          put(Actions.s44NGSettingsContainerSuccess())
        );
      });

      it('cohortType is School', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.School,
          id: 'mockSchoolId',
        };

        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(
          put(Actions.s44NGSettingsContainerSuccess())
        );
      });

      describe('cohortType is Student', () => {
        beforeEach(() => {
          mockCohortObj = {
            cohortType: COHORT_TYPE.Student,
            id: 'mockStudentId',
          };

          mockURLObj = {
            url: Constants.S44NG_SETTINGS_URL,
            params: {
              command: 'GetStudentSettings',
              sid: mockSessionId,
              user_id: mockCohortObj.id,
            },
          };
        });

        it('output_data has data', () => {
          mockOutput = {
            output: {
              output_data: [
                {
                  student_settings: ['mockStudentSettings'],
                },
              ],
            },
          };

          expect(generator.next().value).toEqual(select(cohortObjSelector));
          expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));

          expect(generator.next(mockSessionId).value).toEqual(
            call(genericNonSLMSGetAPICall, mockURLObj.url, mockURLObj.params)
          );

          expect(generator.next(mockOutput).value).toEqual(
            put(Actions.s44NGSettingsContainerSuccess('mockStudentSettings'))
          );
        });

        it('output_data is empty object', () => {
          mockOutput = {
            output: {
              output_data: [{}],
            },
          };

          expect(generator.next().value).toEqual(select(cohortObjSelector));
          expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));

          expect(generator.next(mockSessionId).value).toEqual(
            call(genericNonSLMSGetAPICall, mockURLObj.url, mockURLObj.params)
          );

          expect(generator.next(mockOutput).value).toEqual(
            put(Actions.s44NGSettingsContainerSuccess({}))
          );
        });
      });

      it('any other cohort', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Teacher,
          id: 'mockTeacherId',
        };

        mockURLObj = {
          url: Constants.S44NG_SETTINGS_URL,
          params: {
            command: 'GetGroupSettings',
            sid: mockSessionId,
            cohort_type: mockCohortObj.cohortType.toLowerCase(),
            cohort_id: mockCohortObj.id,
          },
        };

        mockOutput = {
          output: {
            output_data: [
              {
                group_settings: ['mockGroupSettings'],
              },
            ],
          },
        };

        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));

        expect(generator.next(mockSessionId).value).toEqual(
          call(genericNonSLMSGetAPICall, mockURLObj.url, mockURLObj.params)
        );

        expect(generator.next(mockOutput).value).toEqual(
          put(Actions.s44NGSettingsContainerSuccess('mockGroupSettings'))
        );
      });
    });

    it('should handle failure', () => {
      expect(generator.next().value).toEqual(select(cohortObjSelector));
      expect(generator.throw(error).value).toEqual(
        put(Actions.s44NGSettingsContainerFailure(error))
      );
    });
  });

  describe('s44NGProgramSettingsSaveFlow', () => {
    describe('cohort type is Student', () => {
      beforeEach(() => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Student,
          id: 'mockStudentId',
        };

        mockSettingData = {
          writing_enabled: ['0'],
          spanish_support: ['0'],
          captioning: ['0'],
          auto_placement: ['0'],
          initial_placement: ['0'],
          enable_fasttrack: ['0'],
        };

        mockURLObj = {
          url: Constants.S44NG_SETTINGS_URL,
          params: {
            command: 'SetStudentSettings',
            sid: mockSessionId,
            user_id: mockCohortObj.id,
          },
        };

        mockPayloadData = {
          output: {
            output_data: {
              cohort_type: mockCohortObj.cohortType.toUpperCase(),
              cohort_id: mockCohortObj.id,
              group_settings: {
                writing_enabled: mockSettingData.writing_enabled[0],
                spanish_support: mockSettingData.spanish_support[0],
                captioning: mockSettingData.captioning[0],
                auto_placement: mockSettingData.auto_placement[0],
                initial_placement: mockSettingData.initial_placement[0],
                enable_fasttrack: mockSettingData.enable_fasttrack[0],
              },
            },
          },
        };

        generator = Saga.s44NGProgramSettingsSaveFlow({ settingsData: mockSettingData });
      });

      it('All calls pass', () => {
        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(
          call(genericNonSLMSPostAPICall, mockURLObj.url, mockURLObj.params, mockPayloadData)
        );
        expect(generator.next().value).toEqual(put(Actions.s44NGSettingsSaveSuccess()));
        expect(generator.next().value).toEqual(put(Actions.s44NGSettingsContainerRequest()));
      });

      it('should handle failure', () => {
        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.throw(error).value).toEqual(put(Actions.s44NGSettingsSaveFailure(error)));
      });
    });

    describe('cohort type is not student', () => {
      beforeEach(() => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Teacher,
          id: 'mockTeacherId',
        };

        mockSettingData = {
          writing_enabled: ['0'],
          spanish_support: ['0'],
          captioning: ['0'],
        };

        mockURLObj = {
          url: Constants.S44NG_SETTINGS_URL,
          params: {
            command: 'SetGroupSettings',
            sid: mockSessionId,
          },
        };

        mockPayloadData = {
          output: {
            output_data: {
              cohort_type: mockCohortObj.cohortType.toUpperCase(),
              cohort_id: mockCohortObj.id,
              group_settings: {
                writing_enabled: mockSettingData.writing_enabled[0],
                spanish_support: mockSettingData.spanish_support[0],
                captioning: mockSettingData.captioning[0],
              },
            },
          },
        };

        generator = Saga.s44NGProgramSettingsSaveFlow({ settingsData: mockSettingData });
      });

      it('All calls pass', () => {
        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(
          call(genericNonSLMSPostAPICall, mockURLObj.url, mockURLObj.params, mockPayloadData)
        );
        expect(generator.next().value).toEqual(put(Actions.s44NGSettingsSaveSuccess()));
        expect(generator.next().value).toEqual(put(Actions.s44NGSettingsContainerRequest()));
      });

      it('should handle failure', () => {
        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.throw(error).value).toEqual(put(Actions.s44NGSettingsSaveFailure(error)));
      });
    });
  });

  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('All calls are made', () => {
      expect(generator.next().value).toEqual(
        all([
          takeLatest(Constants.S44NG_SETTINGS_CONTAINER, Saga.s44NGProgramSettingsContainerFlow),
          takeLatest(
            SmartBarConstants.GRADE_SELECTION_SUCCESS,
            Saga.s44NGProgramSettingsContainerFlow
          ),
          takeLatest(
            SmartBarConstants.TEACHER_SELECTION_SUCCESS,
            Saga.s44NGProgramSettingsContainerFlow
          ),
          takeLatest(
            SmartBarConstants.CLASS_SELECTION_SUCCESS,
            Saga.s44NGProgramSettingsContainerFlow
          ),
          takeLatest(
            SmartBarConstants.GROUP_SELECTION_SUCCESS,
            Saga.s44NGProgramSettingsContainerFlow
          ),
          takeLatest(
            SmartBarConstants.STUDENT_SELECTION_SUCCESS,
            Saga.s44NGProgramSettingsContainerFlow
          ),
          takeLatest(Constants.S44NG_SETTINGS_SAVE, Saga.s44NGProgramSettingsSaveFlow),
        ])
      );
    });
  });
});
