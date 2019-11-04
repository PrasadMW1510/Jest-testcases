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
import * as Selectors from '../selectors';

describe('R180EESettingContainer Saga', () => {
  let generator = null;
  const err = 'mockError';

  let cohortObjSelector = null;
  let sessionIdSelector = null;
  let getSelectedStageSelector = null;

  let mockCohortObj = null;
  let mockOutput = null;
  let mockSessionId = null;
  let mockUrlObj = null;
  let mockSettingsData = null;
  let mockPayload = null;
  let mockStageId = null;
  let mockTopicData = null;

  beforeEach(() => {
    cohortObjSelector = jest.fn();
    sessionIdSelector = jest.fn();
    getSelectedStageSelector = jest.fn();

    jest
      .spyOn(SmartBarSelectors, 'makeSelectEffectiveCohortObject')
      .mockReturnValue(cohortObjSelector);
    jest.spyOn(AppSelectors, 'makeSelectProfileSessionId').mockReturnValue(sessionIdSelector);
    jest.spyOn(Selectors, 'getSelectedStage').mockReturnValue(getSelectedStageSelector);

    mockSessionId = 'mockSessionId';
    mockStageId = 'mockStageId';
  });

  afterEach(() => {
    expect(generator.next().done).toBeTruthy();
  });

  describe('r180EESettingsContainerFlow', () => {
    beforeEach(() => {
      generator = Saga.r180EESettingsContainerFlow();
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(
        all([
          call(Saga.r180EEProgramSettingsFlow),
          call(Saga.r180EEInstallStagesFlow),
          call(Saga.r180EETopicsFlow),
        ])
      );

      expect(generator.next().value).toEqual(put(Actions.r180EESettingsContainerSuccess()));
    });

    it('should handle a failure', () => {
      expect(generator.next().value).toEqual(
        all([
          call(Saga.r180EEProgramSettingsFlow),
          call(Saga.r180EEInstallStagesFlow),
          call(Saga.r180EETopicsFlow),
        ])
      );

      expect(generator.throw(err).value).toEqual(put(Actions.r180EESettingsContainerFailure(err)));
    });
  });

  describe('r180EEProgramSettingsFlow', () => {
    beforeEach(() => {
      generator = Saga.r180EEProgramSettingsFlow();
    });

    describe('All calls pass', () => {
      it('cohortType is District', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.District,
          id: 'mockDistrictId',
        };

        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(
          put(Actions.r180EEGetSettingsSuccess())
        );
      });

      it('cohortType is School', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.School,
          id: 'mockSchoolId',
        };

        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(
          put(Actions.r180EEGetSettingsSuccess())
        );
      });

      it('cohortType is Grade', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Grade,
          id: 'mockGradeId',
          schoolId: 'mockSchoolId',
        };

        mockUrlObj = {
          url: Constants.R180EE_SETTINGS_URL,
          params: {
            command: Constants.R180EE_SETTINGS_URL_GET_COMMAND,
            sid: mockSessionId,
            cohort_type: mockCohortObj.cohortType.toLowerCase(),
            cohort_id: mockCohortObj.id,
            school_id: mockCohortObj.schoolId,
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
          call(genericNonSLMSGetAPICall, mockUrlObj.url, mockUrlObj.params)
        );
        expect(generator.next(mockOutput).value).toEqual(
          put(Actions.r180EEGetSettingsSuccess(mockOutput.output.output_data[0].group_settings[0]))
        );
      });

      it('cohortType is Group', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Group,
          id: 'mockGroupId',
        };

        mockUrlObj = {
          url: Constants.R180EE_SETTINGS_URL,
          params: {
            command: Constants.R180EE_SETTINGS_URL_GET_COMMAND,
            sid: mockSessionId,
            cohort_type: COHORT_TYPE.Class.toLowerCase(),
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
          call(genericNonSLMSGetAPICall, mockUrlObj.url, mockUrlObj.params)
        );
        expect(generator.next(mockOutput).value).toEqual(
          put(Actions.r180EEGetSettingsSuccess(mockOutput.output.output_data[0].group_settings[0]))
        );
      });

      it('cohort without any data', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Student,
          id: 'mockStudentId',
        };

        mockUrlObj = {
          url: Constants.R180EE_SETTINGS_URL,
          params: {
            command: Constants.R180EE_SETTINGS_URL_GET_COMMAND,
            sid: mockSessionId,
            cohort_type: mockCohortObj.cohortType.toLowerCase(),
            cohort_id: mockCohortObj.id,
          },
        };

        mockOutput = {
          output: {
            output_data: [''],
          },
        };

        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(
          call(genericNonSLMSGetAPICall, mockUrlObj.url, mockUrlObj.params)
        );
        expect(generator.next(mockOutput).value).toEqual(put(Actions.r180EEGetSettingsSuccess({})));
      });
    });

    it('should handle a failure', () => {
      expect(generator.next().value).toEqual(select(cohortObjSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.r180EEGetSettingsFailure(err)));
    });
  });

  describe('r180EEProgramSettingsSaveFlow', () => {
    beforeEach(() => {
      mockCohortObj = {
        cohortType: COHORT_TYPE.Student,
        id: 'mockStudentId',
        schoolId: 'mockSchoolId',
      };

      mockUrlObj = {
        url: Constants.R180EE_SETTINGS_URL,
        params: {
          command: Constants.R180EE_SETTINGS_URL_SET_COMMAND,
          sid: mockSessionId,
        },
      };

      mockSettingsData = {
        computer_placement: ['1'],
        auto_level: ['0'],
        captioning: ['0'],
        alt_color_scheme: ['0'],
        button_rollover: ['0'],
        pronunciation_tip: ['0'],
        second_language_id: ['3'],
        student_level: ['4'],
        reading_speed: ['3'],
      };

      mockPayload = {
        output: {
          output_data: {
            cohort_type: mockCohortObj.cohortType.toUpperCase(),
            cohort_id: mockCohortObj.id,
            school_id: mockCohortObj.schoolId,
            group_settings: {
              auto_level: mockSettingsData.auto_level[0],
              computer_placement: mockSettingsData.computer_placement[0],
              reading_speed: mockSettingsData.reading_speed[0],
              captioning: mockSettingsData.captioning[0],
              student_level: mockSettingsData.student_level[0],
              second_language_id: mockSettingsData.second_language_id[0],
              pronunciation_tip: mockSettingsData.pronunciation_tip[0],
              alt_color_scheme: mockSettingsData.alt_color_scheme[0],
              button_rollover: mockSettingsData.button_rollover[0],
            },
          },
        },
      };

      generator = Saga.r180EEProgramSettingsSaveFlow({ settingsData: mockSettingsData });
    });

    it('all calls pass', () => {
      expect(generator.next().value).toEqual(select(cohortObjSelector));
      expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));

      expect(generator.next(mockSessionId).value).toEqual(
        call(genericNonSLMSPostAPICall, mockUrlObj.url, mockUrlObj.params, mockPayload)
      );

      expect(generator.next().value).toEqual(put(Actions.r180EESettingsSaveSuccess()));
      expect(generator.next().value).toEqual(put(Actions.r180EESettingsContainerRequest()));
    });

    it('should handle a failure', () => {
      expect(generator.next().value).toEqual(select(cohortObjSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.r180EESettingsSaveFailure(err)));
    });
  });

  describe('r180EEInstallStagesFlow', () => {
    beforeEach(() => {
      generator = Saga.r180EEInstallStagesFlow();
    });

    it('All calls pass', () => {
      mockUrlObj = {
        url: Constants.R180EE_SETTINGS_URL,
        params: {
          command: Constants.R180EE_SETTINGS_URL_INSTALL_STAGES_COMMAND,
          sid: mockSessionId,
        },
      };

      mockOutput = {
        output: {
          output_data: [
            {
              installed_stages: [
                {
                  stage: 'mockStages',
                },
              ],
            },
          ],
        },
      };

      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(mockSessionId).value).toEqual(
        call(genericNonSLMSGetAPICall, mockUrlObj.url, mockUrlObj.params)
      );
      expect(generator.next(mockOutput).value).toEqual(
        put(Actions.r180EEGetInstallStagesSuccess('mockStages'))
      );
    });

    it('should handle a failure', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.r180EEGetInstallStagesFailure(err)));
    });
  });

  describe('r180EETopicsFlow', () => {
    beforeEach(() => {
      mockOutput = {
        output: {
          output_data: [
            {
              topic_cds: [
                {
                  topic_cd: 'mockTopicData',
                },
              ],
            },
          ],
        },
      };

      generator = Saga.r180EETopicsFlow();
    });

    describe('all calls pass', () => {
      it('cohortType is District', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.District,
          id: 'mockDistrictId',
        };

        mockUrlObj = {
          url: Constants.R180EE_SETTINGS_URL,
          params: {
            command: Constants.R180EE_SETTINGS_URL_TOPIC_COMMAND.District,
            sid: mockSessionId,
            stage_id: mockStageId,
          },
        };

        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(getSelectedStageSelector));

        expect(generator.next(mockStageId).value).toEqual(
          call(genericNonSLMSGetAPICall, mockUrlObj.url, mockUrlObj.params)
        );

        expect(generator.next(mockOutput).value).toEqual(
          put(Actions.r180EEGetTopicsSuccess('mockTopicData'))
        );
      });

      it('cohortType is School', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.School,
          id: 'mockSchoolId',
        };

        mockUrlObj = {
          url: Constants.R180EE_SETTINGS_URL,
          params: {
            command: Constants.R180EE_SETTINGS_URL_TOPIC_COMMAND.District,
            sid: mockSessionId,
            stage_id: mockStageId,
          },
        };

        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(getSelectedStageSelector));

        expect(generator.next(mockStageId).value).toEqual(
          call(genericNonSLMSGetAPICall, mockUrlObj.url, mockUrlObj.params)
        );

        expect(generator.next(mockOutput).value).toEqual(
          put(Actions.r180EEGetTopicsSuccess('mockTopicData'))
        );
      });

      it('cohortType is Grade', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Grade,
          id: 'mockGradeId',
          schoolId: 'mockSchoolId',
        };

        mockUrlObj = {
          url: Constants.R180EE_SETTINGS_URL,
          params: {
            command: Constants.R180EE_SETTINGS_URL_TOPIC_COMMAND.Group,
            sid: mockSessionId,
            cohort_type: mockCohortObj.cohortType.toLowerCase(),
            cohort_id: mockCohortObj.id,
            school_id: mockCohortObj.schoolId,
            stage_id: mockStageId,
          },
        };

        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(getSelectedStageSelector));

        expect(generator.next(mockStageId).value).toEqual(
          call(genericNonSLMSGetAPICall, mockUrlObj.url, mockUrlObj.params)
        );

        expect(generator.next(mockOutput).value).toEqual(
          put(Actions.r180EEGetTopicsSuccess('mockTopicData'))
        );
      });

      it('cohortType is Student', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Student,
          id: 'mockStudentId',
        };

        mockUrlObj = {
          url: Constants.R180EE_SETTINGS_URL,
          params: {
            command: Constants.R180EE_SETTINGS_URL_TOPIC_COMMAND.Student,
            sid: mockSessionId,
            cohort_type: mockCohortObj.cohortType.toLowerCase(),
            user_id: mockCohortObj.id,
            stage_id: mockStageId,
          },
        };

        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(getSelectedStageSelector));

        expect(generator.next(mockStageId).value).toEqual(
          call(genericNonSLMSGetAPICall, mockUrlObj.url, mockUrlObj.params)
        );

        expect(generator.next(mockOutput).value).toEqual(
          put(Actions.r180EEGetTopicsSuccess(mockOutput.output.output_data[0].topic_cds[0]))
        );
      });

      it('cohortType is Teacher', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Teacher,
          id: 'mockTeacherId',
        };

        mockUrlObj = {
          url: Constants.R180EE_SETTINGS_URL,
          params: {
            command: Constants.R180EE_SETTINGS_URL_TOPIC_COMMAND.Group,
            sid: mockSessionId,
            cohort_type: mockCohortObj.cohortType.toLowerCase(),
            cohort_id: mockCohortObj.id,
            stage_id: mockStageId,
          },
        };

        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(getSelectedStageSelector));

        expect(generator.next(mockStageId).value).toEqual(
          call(genericNonSLMSGetAPICall, mockUrlObj.url, mockUrlObj.params)
        );

        expect(generator.next(mockOutput).value).toEqual(
          put(Actions.r180EEGetTopicsSuccess('mockTopicData'))
        );
      });

      it('cohortType is Group', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Group,
          id: 'mockGroupId',
        };

        mockUrlObj = {
          url: Constants.R180EE_SETTINGS_URL,
          params: {
            command: Constants.R180EE_SETTINGS_URL_TOPIC_COMMAND.Group,
            sid: mockSessionId,
            cohort_type: COHORT_TYPE.Class.toLowerCase(),
            cohort_id: mockCohortObj.id,
            stage_id: mockStageId,
          },
        };

        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(getSelectedStageSelector));

        expect(generator.next(mockStageId).value).toEqual(
          call(genericNonSLMSGetAPICall, mockUrlObj.url, mockUrlObj.params)
        );

        expect(generator.next(mockOutput).value).toEqual(
          put(Actions.r180EEGetTopicsSuccess('mockTopicData'))
        );
      });

      it('cohort has no data', () => {
        mockOutput = {
          output: {
            output_data: [''],
          },
        };

        mockCohortObj = {
          cohortType: COHORT_TYPE.Teacher,
          id: 'mockTeacherId',
        };

        mockUrlObj = {
          url: Constants.R180EE_SETTINGS_URL,
          params: {
            command: Constants.R180EE_SETTINGS_URL_TOPIC_COMMAND.Group,
            sid: mockSessionId,
            cohort_type: mockCohortObj.cohortType.toLowerCase(),
            cohort_id: mockCohortObj.id,
            stage_id: mockStageId,
          },
        };

        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(getSelectedStageSelector));

        expect(generator.next(mockStageId).value).toEqual(
          call(genericNonSLMSGetAPICall, mockUrlObj.url, mockUrlObj.params)
        );

        expect(generator.next(mockOutput).value).toEqual(put(Actions.r180EEGetTopicsSuccess([])));
      });
    });

    it('should handle a failure', () => {
      expect(generator.next().value).toEqual(select(cohortObjSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.r180EEGetTopicsFailure(err)));
    });
  });

  describe('r180EETopicsSaveFlow', () => {
    describe('all calls pass', () => {
      describe('cohort is either District or School', () => {
        beforeEach(() => {
          mockUrlObj = {
            url: Constants.R180EE_SETTINGS_URL,
            params: {
              command: Constants.R180EE_SETTINGS_URL_SET_TOPIC_COMMAND.District,
              sid: mockSessionId,
            },
          };

          mockTopicData = [
            {
              enable: ['0'],
              cd_name: ['A01'],
            },
            {
              enable: ['0'],
              cd_name: ['A02'],
            },
            {
              enable: ['1'],
              cd_name: ['A03'],
            },
          ];

          mockPayload = {
            output: {
              output_data: {
                cohort_type: '',
                cohort_id: '',
                topic_cds: [
                  mockTopicData.map(topic => ({
                    topic_cd: {
                      enable: topic.enable[0],
                      cd_name: topic.cd_name[0],
                    },
                  })),
                ],
              },
            },
          };

          generator = Saga.r180EETopicsSaveFlow({ topicData: mockTopicData });
        });

        it('cohortType is District', () => {
          mockCohortObj = {
            cohortType: COHORT_TYPE.District,
            id: 'mockDistrictId',
          };

          mockPayload.output.output_data.cohort_type = mockCohortObj.cohortType.toUpperCase();
          mockPayload.output.output_data.cohort_id = mockCohortObj.id;

          expect(generator.next().value).toEqual(select(cohortObjSelector));
          expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));
          expect(generator.next(mockSessionId).value).toEqual(
            call(genericNonSLMSPostAPICall, mockUrlObj.url, mockUrlObj.params, mockPayload)
          );
          expect(generator.next().value).toEqual(put(Actions.r180EETopicSaveSuccess()));
          expect(generator.next().value).toEqual(put(Actions.r180EESettingsContainerRequest()));
        });

        it('cohortType is School', () => {
          mockCohortObj = {
            cohortType: COHORT_TYPE.School,
            id: 'mockSchoolId',
          };

          mockPayload.output.output_data.cohort_type = mockCohortObj.cohortType.toUpperCase();
          mockPayload.output.output_data.cohort_id = mockCohortObj.id;

          expect(generator.next().value).toEqual(select(cohortObjSelector));
          expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));
          expect(generator.next(mockSessionId).value).toEqual(
            call(genericNonSLMSPostAPICall, mockUrlObj.url, mockUrlObj.params, mockPayload)
          );
          expect(generator.next().value).toEqual(put(Actions.r180EETopicSaveSuccess()));
          expect(generator.next().value).toEqual(put(Actions.r180EESettingsContainerRequest()));
        });
      });

      describe('cohort is student', () => {
        beforeEach(() => {
          mockCohortObj = {
            cohortType: COHORT_TYPE.Student,
            id: 'mockTeacherId',
          };

          mockUrlObj = {
            url: Constants.R180EE_SETTINGS_URL,
            params: {
              command: Constants.R180EE_SETTINGS_URL_SET_TOPIC_COMMAND.Student,
              sid: mockSessionId,
            },
          };

          mockTopicData = [
            {
              enable: '0',
              completed: '1',
              manual_advance: '1',
              cd_name: 'A01',
              cd_segment: '0',
              level: '1',
            },
            {
              enable: '1',
              completed: '0',
              manual_advance: '0',
              cd_name: 'B01',
              cd_segment: '0',
              level: '2',
            },
          ];

          mockPayload = {
            output: {
              output_data: {
                user_id: mockCohortObj.id,
                topic_cds: [mockTopicData.map(topic => ({ topic_cd: { ...topic } }))],
              },
            },
          };

          generator = Saga.r180EETopicsSaveFlow({ topicData: mockTopicData });
        });

        it('All calls pass', () => {
          expect(generator.next().value).toEqual(select(cohortObjSelector));
          expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));
          expect(generator.next(mockSessionId).value).toEqual(
            call(genericNonSLMSPostAPICall, mockUrlObj.url, mockUrlObj.params, mockPayload)
          );
          expect(generator.next().value).toEqual(put(Actions.r180EETopicSaveSuccess()));
          expect(generator.next().value).toEqual(put(Actions.r180EESettingsContainerRequest()));
        });
      });

      describe('cohort is not District or School', () => {
        beforeEach(() => {
          mockUrlObj = {
            url: Constants.R180EE_SETTINGS_URL,
            params: {
              command: Constants.R180EE_SETTINGS_URL_SET_TOPIC_COMMAND.Group,
              sid: mockSessionId,
            },
          };

          mockTopicData = [
            {
              enable: ['0'],
              cd_name: ['A01'],
              globally_enabled: ['1'],
            },
            {
              enable: ['0'],
              cd_name: ['A02'],
              globally_enabled: ['0'],
            },
            {
              enable: ['1'],
              cd_name: ['A03'],
              globally_enabled: ['0'],
            },
          ];

          mockPayload = {
            output: {
              output_data: {
                cohort_type: '',
                cohort_id: '',
                topic_cds: [
                  mockTopicData.map(topic => ({
                    topic_cd: {
                      enable: topic.enable[0],
                      cd_name: topic.cd_name[0],
                      globally_enabled: topic.globally_enabled[0],
                    },
                  })),
                ],
              },
            },
          };

          generator = Saga.r180EETopicsSaveFlow({ topicData: mockTopicData });
        });

        it('cohortType is Teacher', () => {
          mockCohortObj = {
            cohortType: COHORT_TYPE.Teacher,
            id: 'mockTeacherId',
          };

          mockPayload.output.output_data.cohort_type = mockCohortObj.cohortType.toUpperCase();
          mockPayload.output.output_data.cohort_id = mockCohortObj.id;

          expect(generator.next().value).toEqual(select(cohortObjSelector));
          expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));
          expect(generator.next(mockSessionId).value).toEqual(
            call(genericNonSLMSPostAPICall, mockUrlObj.url, mockUrlObj.params, mockPayload)
          );
          expect(generator.next().value).toEqual(put(Actions.r180EETopicSaveSuccess()));
          expect(generator.next().value).toEqual(put(Actions.r180EESettingsContainerRequest()));
        });
      });
    });

    it('should handle a failure', () => {
      generator = Saga.r180EETopicsSaveFlow({ topicData: [] });

      expect(generator.next().value).toEqual(select(cohortObjSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.r180EETopicSaveFailure(err)));
    });
  });

  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('All calls are made', () => {
      const getSettingsConstants = [
        Constants.R180EE_SETTINGS_CONTAINER,
        SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
        SmartBarConstants.GRADE_SELECTION_SUCCESS,
        SmartBarConstants.TEACHER_SELECTION_SUCCESS,
        SmartBarConstants.CLASS_SELECTION_SUCCESS,
        SmartBarConstants.GROUP_SELECTION_SUCCESS,
        SmartBarConstants.STUDENT_SELECTION_SUCCESS,
      ];

      expect(generator.next().value).toEqual(
        all([
          takeLatest(getSettingsConstants, Saga.r180EESettingsContainerFlow),
          takeLatest(Constants.R180EE_SETTINGS_SAVE, Saga.r180EEProgramSettingsSaveFlow),
          takeLatest(Constants.R180EE_SET_SELECTED_STAGE, Saga.r180EETopicsFlow),
          takeLatest(Constants.R180EE_TOPIC_SAVE, Saga.r180EETopicsSaveFlow),
        ])
      );
    });
  });
});
