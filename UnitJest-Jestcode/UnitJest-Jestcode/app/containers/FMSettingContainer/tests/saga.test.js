/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { COHORT_TYPE } from 'containers/App/constants';
import { genericNonSLMSGetAPICall, genericNonSLMSPostAPICall } from 'containers/App/request';
import * as AppSelectors from 'containers/App/selectors';
import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import * as SmartBarSelectors from 'containers/SmartBarContainer/selectors';

import * as Actions from '../actions';
import * as Constants from '../constants';
import defaultSaga, * as Saga from '../saga';

describe('FMSettingContainer Saga', () => {
  let generator = null;
  const err = 'mockError';

  let cohortObjSelector = null;
  let sessionIdSelector = null;

  let mockCohortObj = null;
  let mockSessionId = null;
  let mockUrlObj = null;
  let mockSettingsData = null;
  let mockGetSettingsResp = null;
  let mockUpdatedSettings = null;
  let mockPayload = null;

  beforeEach(() => {
    cohortObjSelector = jest.fn();
    sessionIdSelector = jest.fn();

    jest
      .spyOn(SmartBarSelectors, 'makeSelectEffectiveCohortObject')
      .mockReturnValue(cohortObjSelector);
    jest.spyOn(AppSelectors, 'makeSelectProfileSessionId').mockReturnValue(sessionIdSelector);

    mockSessionId = 'mockSessionId';

    mockGetSettingsResp = {
      Defaults: ['mockDefaults'],
      Settings: ['mockSettings'],
      History: ['mockHistory'],
    };

    mockSettingsData = {
      output: {
        output_data: [
          {
            getSettings: [
              {
                GetSettingsResp: [mockGetSettingsResp],
              },
            ],
          },
        ],
      },
    };
  });

  afterEach(() => {
    expect(generator.next().done).toBeTruthy();
  });

  describe('fmSettingsContainerFlow', () => {
    beforeEach(() => {
      generator = Saga.fmSettingsContainerFlow();
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(
        all([call(Saga.fmProgramSettingsFlow), call(Saga.fmAdvancedSettingsFlow)])
      );
      expect(generator.next().value).toEqual(put(Actions.fmSettingsContainerSuccess()));
    });

    it('should handle a failure', () => {
      expect(generator.next().value).toEqual(
        all([call(Saga.fmProgramSettingsFlow), call(Saga.fmAdvancedSettingsFlow)])
      );
      expect(generator.throw(err).value).toEqual(put(Actions.fmSettingsContainerFailure(err)));
    });
  });

  describe('fmProgramSettingsFlow', () => {
    beforeEach(() => {
      generator = Saga.fmProgramSettingsFlow();
    });

    describe('All calls pass', () => {
      it('cohortType is District', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.District,
          id: 'mockDistrictId',
        };

        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(put(Actions.fmGetSettingsSuccess()));
      });

      it('cohortType is Class', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Class,
          id: 'mockClassId',
        };

        mockUrlObj = {
          url: Constants.FM_SETTINGS_URL,
          params: {
            command: Constants.FM_SETTINGS_URL_GET_COMMAND,
            sid: mockSessionId,
            cohort_type: mockCohortObj.cohortType.toLowerCase(),
            cohort_id: mockCohortObj.id,
          },
        };

        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(
          call(genericNonSLMSGetAPICall, mockUrlObj.url, mockUrlObj.params)
        );
        expect(generator.next(mockSettingsData).value).toEqual(
          put(Actions.fmGetSettingsSuccess(mockGetSettingsResp))
        );
      });

      it('cohortType is Group', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Group,
          id: 'mockGroupId',
        };

        mockUrlObj = {
          url: Constants.FM_SETTINGS_URL,
          params: {
            command: Constants.FM_SETTINGS_URL_GET_COMMAND,
            sid: mockSessionId,
            cohort_type: mockCohortObj.cohortType.toLowerCase(),
            cohort_id: mockCohortObj.id,
          },
        };

        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(
          call(genericNonSLMSGetAPICall, mockUrlObj.url, mockUrlObj.params)
        );
        expect(generator.next(mockSettingsData).value).toEqual(
          put(Actions.fmGetSettingsSuccess(mockGetSettingsResp))
        );
      });

      it('cohortType is Student', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Student,
          id: 'mockStudentId',
          schoolId: 'mockSchoolId',
        };

        mockUrlObj = {
          url: Constants.FM_SETTINGS_URL,
          params: {
            command: Constants.FM_SETTINGS_URL_GET_COMMAND,
            sid: mockSessionId,
            cohort_type: mockCohortObj.cohortType.toLowerCase(),
            cohort_id: mockCohortObj.id,
            school_id: mockCohortObj.schoolId,
            output_format: 'raw',
          },
        };

        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(
          call(genericNonSLMSGetAPICall, mockUrlObj.url, mockUrlObj.params)
        );
        expect(generator.next(mockSettingsData).value).toEqual(
          put(Actions.fmGetSettingsSuccess(mockGetSettingsResp))
        );
      });
    });

    it('should handle a failure', () => {
      expect(generator.next().value).toEqual(select(cohortObjSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.fmGetSettingsFailure(err)));
    });
  });

  describe('fmProgramSettingsSaveFlow', () => {
    beforeEach(() => {
      mockUpdatedSettings = {
        Operation: ['mockOperation'],
        Orientation: ['mockOrientation'],
        Language: ['mockLanguage'],
        Contrast: ['mockContrast'],
        Lessons: ['mockLessons'],
      };

      mockPayload = {
        SetSettingsReq: {
          Settings: {
            Operation: mockUpdatedSettings.Operation[0],
            Problems: '',
            Orientation: mockUpdatedSettings.Orientation[0],
            Response: '',
            Language: mockUpdatedSettings.Language[0],
            Contrast: mockUpdatedSettings.Contrast[0],
            Lessons: mockUpdatedSettings.Lessons[0],
            Reset: '',
          },
        },
      };

      generator = Saga.fmProgramSettingsSaveFlow({ settingsData: mockUpdatedSettings });
    });

    describe('All calls pass', () => {
      it('cohortType is Class', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Class,
          id: 'mockClassId',
        };

        mockUrlObj = {
          url: Constants.FM_SETTINGS_URL,
          params: {
            command: Constants.FM_SETTINGS_URL_SET_COMMAND,
            sid: mockSessionId,
            cohort_type: mockCohortObj.cohortType.toLowerCase(),
            cohort_id: mockCohortObj.id,
          },
        };

        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(
          call(genericNonSLMSPostAPICall, mockUrlObj.url, mockUrlObj.params, mockPayload)
        );

        expect(generator.next().value).toEqual(put(Actions.fmSettingsSaveSuccess()));
        expect(generator.next().value).toEqual(put(Actions.fmSettingsContainerRequest()));
      });

      it('cohortType is Group', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Group,
          id: 'mockGroupId',
        };

        mockUrlObj = {
          url: Constants.FM_SETTINGS_URL,
          params: {
            command: Constants.FM_SETTINGS_URL_SET_COMMAND,
            sid: mockSessionId,
            cohort_type: mockCohortObj.cohortType.toLowerCase(),
            cohort_id: mockCohortObj.id,
          },
        };

        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(
          call(genericNonSLMSPostAPICall, mockUrlObj.url, mockUrlObj.params, mockPayload)
        );

        expect(generator.next().value).toEqual(put(Actions.fmSettingsSaveSuccess()));
        expect(generator.next().value).toEqual(put(Actions.fmSettingsContainerRequest()));
      });

      it('cohortType is Student', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Student,
          id: 'mockStudentId',
          schoolId: 'mockSchoolId',
        };

        mockUrlObj = {
          url: Constants.FM_SETTINGS_URL,
          params: {
            command: Constants.FM_SETTINGS_URL_SET_COMMAND,
            sid: mockSessionId,
            cohort_type: mockCohortObj.cohortType.toLowerCase(),
            cohort_id: mockCohortObj.id,
            school_id: mockCohortObj.schoolId,
            output_format: 'raw',
          },
        };

        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(
          call(genericNonSLMSPostAPICall, mockUrlObj.url, mockUrlObj.params, mockPayload)
        );

        expect(generator.next().value).toEqual(put(Actions.fmSettingsSaveSuccess()));
        expect(generator.next().value).toEqual(put(Actions.fmSettingsContainerRequest()));
      });
    });

    it('should handle a failure', () => {
      expect(generator.next().value).toEqual(select(cohortObjSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.fmSettingsSaveFailure(err)));
    });
  });

  describe('fmAdvancedSettingsFlow', () => {
    beforeEach(() => {
      generator = Saga.fmAdvancedSettingsFlow();
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(put(Actions.fmGetAdvancedSettingsSuccess()));
    });

    it('should handle a failure', () => {
      expect(generator.next().value).toEqual(put(Actions.fmGetAdvancedSettingsSuccess()));
      expect(generator.throw(err).value).toEqual(put(Actions.fmGetAdvancedSettingsFailure(err)));
    });
  });

  describe('fmAdvancedSettingsSaveFlow', () => {
    beforeEach(() => {
      generator = Saga.fmAdvancedSettingsSaveFlow();
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(put(Actions.fmAdvancedSettingsSaveSuccess()));
      expect(generator.next().value).toEqual(put(Actions.fmSettingsContainerRequest()));
    });

    it('should handle a failure', () => {
      expect(generator.next().value).toEqual(put(Actions.fmAdvancedSettingsSaveSuccess()));
      expect(generator.throw(err).value).toEqual(put(Actions.fmAdvancedSettingsSaveFailure(err)));
    });
  });

  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('All calls are made', () => {
      const getSettingsConstants = [
        Constants.FM_SETTINGS_CONTAINER,
        SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
        SmartBarConstants.GRADE_SELECTION_SUCCESS,
        SmartBarConstants.TEACHER_SELECTION_SUCCESS,
        SmartBarConstants.CLASS_SELECTION_SUCCESS,
        SmartBarConstants.GROUP_SELECTION_SUCCESS,
        SmartBarConstants.STUDENT_SELECTION_SUCCESS,
      ];

      expect(generator.next().value).toEqual(
        all([
          takeLatest(getSettingsConstants, Saga.fmSettingsContainerFlow),
          takeLatest(Constants.FM_SETTINGS_SAVE, Saga.fmProgramSettingsSaveFlow),
          takeLatest(Constants.FM_ADVANCED_SETTINGS_SAVE, Saga.fmAdvancedSettingsSaveFlow),
        ])
      );
    });
  });
});
