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

describe('S44SettingContainer Saga', () => {
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

  describe('s44ProgramSettingsContainerFlow', () => {
    beforeEach(() => {
      generator = Saga.s44ProgramSettingsContainerFlow();
    });

    describe('All calls pass', () => {
      it('cohortType is District', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.District,
          id: 'mockDistrictId',
        };

        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(
          put(Actions.s44SettingsContainerSuccess())
        );
      });

      it('cohortType is School', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.School,
          id: 'mockSchoolId',
        };

        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(
          put(Actions.s44SettingsContainerSuccess())
        );
      });

      describe('cohortType is Student', () => {
        beforeEach(() => {
          mockCohortObj = {
            cohortType: COHORT_TYPE.Student,
            id: 'mockStudentId',
          };

          mockURLObj = {
            url: Constants.S44_SETTINGS_URL,
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
            put(Actions.s44SettingsContainerSuccess('mockStudentSettings'))
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
            put(Actions.s44SettingsContainerSuccess({}))
          );
        });
      });

      it('any other cohort', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Teacher,
          id: 'mockTeacherId',
        };

        mockURLObj = {
          url: Constants.S44_SETTINGS_URL,
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
          put(Actions.s44SettingsContainerSuccess('mockGroupSettings'))
        );
      });
    });

    it('should handle a failure', () => {
      expect(generator.next().value).toEqual(select(cohortObjSelector));
      expect(generator.throw(error).value).toEqual(put(Actions.s44SettingsContainerFailure(error)));
    });
  });

  describe('s44ProgramSettingsSaveFlow', () => {
    describe('All calls pass', () => {
      it('cohortType is Student', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Student,
          id: 'mockStudentId',
        };

        mockSettingData = {
          spanish_support: ['0'],
          captioning: ['0'],
          auto_placement: ['0'],
          initial_placement: ['0'],
          enable_fasttrack: ['0'],
        };

        mockURLObj = {
          url: Constants.S44_SETTINGS_URL,
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
                spanish_support: mockSettingData.spanish_support[0],
                captioning: mockSettingData.captioning[0],
                auto_placement: mockSettingData.auto_placement[0],
                initial_placement: mockSettingData.initial_placement[0],
                enable_fasttrack: mockSettingData.enable_fasttrack[0],
              },
            },
          },
        };

        generator = Saga.s44ProgramSettingsSaveFlow({ settingsData: mockSettingData });

        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(
          call(genericNonSLMSPostAPICall, mockURLObj.url, mockURLObj.params, mockPayloadData)
        );
        expect(generator.next().value).toEqual(put(Actions.s44SettingsSaveSuccess()));
        expect(generator.next().value).toEqual(put(Actions.s44SettingsContainerRequest()));
      });

      it('any other cohort', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Teacher,
          id: 'mockTeacherId',
        };

        mockSettingData = {
          spanish_support: ['0'],
          captioning: ['0'],
        };

        mockURLObj = {
          url: Constants.S44_SETTINGS_URL,
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
                spanish_support: mockSettingData.spanish_support[0],
                captioning: mockSettingData.captioning[0],
              },
            },
          },
        };

        generator = Saga.s44ProgramSettingsSaveFlow({ settingsData: mockSettingData });

        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(
          call(genericNonSLMSPostAPICall, mockURLObj.url, mockURLObj.params, mockPayloadData)
        );
        expect(generator.next().value).toEqual(put(Actions.s44SettingsSaveSuccess()));
        expect(generator.next().value).toEqual(put(Actions.s44SettingsContainerRequest()));
      });
    });

    it('should handle a failure', () => {
      generator = Saga.s44ProgramSettingsSaveFlow({ settingsData: mockSettingData });

      expect(generator.next().value).toEqual(select(cohortObjSelector));
      expect(generator.throw(error).value).toEqual(put(Actions.s44SettingsSaveFailure(error)));
    });
  });

  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('All calls are made', () => {
      const getSettingsConstants = [
        Constants.S44_SETTINGS_CONTAINER,
        SmartBarConstants.GRADE_SELECTION_SUCCESS,
        SmartBarConstants.TEACHER_SELECTION_SUCCESS,
        SmartBarConstants.CLASS_SELECTION_SUCCESS,
        SmartBarConstants.GROUP_SELECTION_SUCCESS,
        SmartBarConstants.STUDENT_SELECTION_SUCCESS,
      ];

      expect(generator.next().value).toEqual(
        all([
          takeLatest(getSettingsConstants, Saga.s44ProgramSettingsContainerFlow),
          takeLatest(Constants.S44_SETTINGS_SAVE, Saga.s44ProgramSettingsSaveFlow),
        ])
      );
    });
  });
});
