/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { getUrl, postUrl } from 'utils/request';

import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import * as Selectors from 'containers/App/selectors';
import * as SmartBarSelectors from 'containers/SmartBarContainer/selectors';

import * as Actions from '../actions';
import * as Constants from '../constants';
import defaultSaga, * as Saga from '../saga';

describe('PISettingContainer Saga', () => {
  let generator = null;
  const err = 'mockError';
  let sessionIdSelector = null;
  let mockSettings = null;
  let mockCohortObj = null;
  let mockCohortObjSelector = null;
  let mockSessionId = null;
  let mockUrlObj = null;
  let mockSetting = null;
  let mockUrl = null;
  let mockPiSaveObject = null;
  beforeEach(() => {
    sessionIdSelector = jest.fn();
    mockCohortObjSelector = jest.fn();
    mockSessionId = 'mockSessionId';
    mockCohortObj = { cohortType: 'School', id: 'mockedId' };
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(sessionIdSelector);
    jest
      .spyOn(SmartBarSelectors, 'makeSelectEffectiveCohortObject')
      .mockReturnValue(mockCohortObjSelector);
  });
  afterEach(() => {
    expect(generator.next().done).toBeTruthy();
  });

  describe('piSettingContainerFlow', () => {
    beforeEach(() => {
      mockSettings = {
        spanish_support: ['0'],
        requires_accommodation: ['0'],
      };

      generator = Saga.piSettingsContainerFlow();
    });

    it('All calls pass', () => {
      mockCohortObj = { cohortType: 'School', id: 'mockedId', schoolId: 'mockSchoolId' };
      mockSetting = {
        output: {
          output_data: [
            {
              group_settings: [
                {
                  spanish_support: ['0'],
                  requires_accommodation: ['0'],
                },
              ],
            },
          ],
        },
      };
      mockUrlObj = {
        url: `spi/spiProductCtrls.cd?command=GetGroupSettings&cohort_type=${mockCohortObj.cohortType.toLowerCase()}&cohort_id=${
          mockCohortObj.id
        }&school_id=${mockCohortObj.schoolId}&sid=${mockSessionId}`,
        sid: 'mockSessionId',
      };
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(mockSessionId).value).toEqual(select(mockCohortObjSelector));
      expect(generator.next(mockCohortObj).value).toEqual(call(getUrl, `${mockUrlObj.url}`));
      expect(generator.next(mockSetting).value).toEqual(
        put(Actions.piSettingsContainerSuccess(mockSettings))
      );
    });

    it('should handle a failure', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.piSettingsContainerFailure(err)));
    });
  });

  describe('piProgramSettingsSaveFlow', () => {
    beforeEach(() => {
      mockSessionId = 'mockSessionId';
      mockSettings = {
        spanish_support: ['0'],
        requires_accommodation: ['0'],
      };
      mockUrl = `spi/spiProductCtrls.cd?command=SetGroupSettings&sid=${mockSessionId}`;
      mockCohortObj = { cohortType: 'School', id: 'mockedId', schoolId: 'mockSchoolId' };

      generator = Saga.piProgramSettingsSaveFlow({ settingsData: mockSettings });
    });

    it('All calls pass', () => {
      mockCohortObj = { cohortType: 'School', id: 'mockedId', schoolId: 'mockSchoolId' };
      mockPiSaveObject = {
        output: {
          output_data: {
            cohort_type: mockCohortObj.cohortType.toUpperCase(),
            cohort_id: mockCohortObj.id,
            school_id: mockCohortObj.schoolId,
            group_settings: {
              spanish_support: '0',
              requires_accommodation: '0',
            },
          },
        },
      };
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(mockSessionId).value).toEqual(select(mockCohortObjSelector));
      expect(generator.next(mockCohortObj).value).toEqual(
        call(postUrl, `${mockUrl}`, mockPiSaveObject)
      );
      expect(generator.next(mockSettings).value).toEqual(put(Actions.piSettingsSaveSuccess()));
      expect(generator.next().value).toEqual(put(Actions.piSettingsContainerRequest()));
    });

    it('should handle a failure', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.piSettingsSaveFailure(err)));
    });
  });

  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('All Calls are made', () => {
      const getSettingsConstants = [
        Constants.PI_SETTINGS_CONTAINER,
        SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
        SmartBarConstants.GRADE_SELECTION_SUCCESS,
        SmartBarConstants.TEACHER_SELECTION_SUCCESS,
        SmartBarConstants.CLASS_SELECTION_SUCCESS,
        SmartBarConstants.GROUP_SELECTION_SUCCESS,
        SmartBarConstants.STUDENT_SELECTION_SUCCESS,
      ];

      expect(generator.next().value).toEqual(
        all([
          takeLatest(getSettingsConstants, Saga.piSettingsContainerFlow),
          takeLatest(Constants.PI_SETTINGS_SAVE, Saga.piProgramSettingsSaveFlow),
        ])
      );
    });
  });
});
