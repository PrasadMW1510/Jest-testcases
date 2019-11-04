/**
 * Test  sagas
 */

// TODO: Uncomment and rename imports as needed.

/* eslint-disable redux-saga/yield-effects */
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { COHORT_TYPE } from 'containers/App/constants';
import { genericNonSLMSGetAPICall, genericNonSLMSPostAPICall } from 'containers/App/request';
import * as AppSelectors from 'containers/App/selectors';
import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import * as SmartBarSelectors from 'containers/SmartBarContainer/selectors';

import * as Actions from '../actions';
import * as Constants from '../constants';
import defaultSaga, * as Saga from '../saga';
// import * as Selectors from '../selectors';

describe('RCSettingContainer Saga', () => {
  // TODO: Uncomment definitions as needed.

  let generator = null;
  const err = 'mockError';

  let cohortObjSelector = null;
  let sessionIdSelector = null;

  let mockCohortObj = null;
  let mockOutput = null;
  let mockSessionId = null;
  let mockUrlObj = null;
  let immMockSettingsData = null;
  let mockPayload = null;
  // let mockTopicData = null;

  beforeEach(() => {
    cohortObjSelector = jest.fn();
    sessionIdSelector = jest.fn();
    jest
      .spyOn(SmartBarSelectors, 'makeSelectEffectiveCohortObject')
      .mockReturnValue(cohortObjSelector);
    jest.spyOn(AppSelectors, 'makeSelectProfileSessionId').mockReturnValue(sessionIdSelector);
    mockSessionId = 'mockSessionId';
  });

  afterEach(() => {
    expect(generator.next().done).toBeTruthy();
  });

  describe('rcSettingsContainerFlow', () => {
    beforeEach(() => {
      generator = Saga.rcSettingsContainerFlow();
    });

    it('All calls pass', () => {
      expect(generator.next().value).toEqual(
        all([
          call(Saga.rcProgramSettingsFlow),
          // call(Saga.rcInstallStagesFlow),
          // call(Saga.rcTopicsFlow),
        ])
      );
      expect(generator.next().value).toEqual(put(Actions.rcSettingsContainerSuccess()));
    });

    it('should handle a failure', () => {
      expect(generator.next().value).toEqual(
        all([
          call(Saga.rcProgramSettingsFlow),
          // call(Saga.rcInstallStagesFlow),
          // call(Saga.rcTopicsFlow),
        ])
      );

      expect(generator.throw(err).value).toEqual(put(Actions.rcSettingsContainerFailure(err)));
    });
  });

  describe('rcProgramSettingsFlow', () => {
    beforeEach(() => {
      generator = Saga.rcProgramSettingsFlow();
    });

    describe('All calls pass', () => {
      it('cohortType is District', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.District,
          id: 'mockDistrictId',
        };

        mockUrlObj = {
          url: Constants.RC_SETTINGS_URL,
          params: {
            command: Constants.RC_SETTINGS_URL_GET_COMMAND,
            sid: mockSessionId,
            cohort_type: mockCohortObj.cohortType.toUpperCase(),
            cohort_id: mockCohortObj.id,
          },
        };

        mockOutput = {
          output: {
            output_data: [
              {
                GetSettingsResp: ['mockGroupSettings'],
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
          put(Actions.rcGetSettingsSuccess(mockOutput.output.output_data[0].GetSettingsResp[0]))
        );
      });

      /* it('cohortType is School', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.School,
          id: 'mockSchoolId',
        };

        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(
          put(Actions.rcGetSettingsSuccess())
        );
      }); */

      it('cohortType is Grade', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Grade,
          id: 'mockGradeId',
          schoolId: 'mockSchoolId',
        };

        mockUrlObj = {
          url: Constants.RC_SETTINGS_URL,
          params: {
            command: Constants.RC_SETTINGS_URL_GET_COMMAND,
            sid: mockSessionId,
            cohort_type: mockCohortObj.cohortType.toUpperCase(),
            cohort_id: mockCohortObj.id,
            school_id: mockCohortObj.schoolId,
          },
        };

        mockOutput = {
          output: {
            output_data: [
              {
                GetSettingsResp: ['mockGroupSettings'],
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
          put(Actions.rcGetSettingsSuccess(mockOutput.output.output_data[0].GetSettingsResp[0]))
        );
      });

      /* it('cohortType is Group', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Group,
          id: 'mockGroupId',
        };

        mockUrlObj = {
          url: Constants.RC_SETTINGS_URL,
          params: {
            command: Constants.RC_SETTINGS_URL_GET_COMMAND,
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
          put(Actions.rcGetSettingsSuccess(mockOutput.output.output_data[0].group_settings[0]))
        );
      }); */

      /* it('cohort without any data', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Student,
          id: 'mockStudentId',
        };

        mockUrlObj = {
          url: Constants.RC_SETTINGS_URL,
          params: {
            command: Constants.RC_SETTINGS_URL_GET_COMMAND,
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
        expect(generator.next(mockOutput).value).toEqual(put(Actions.rcGetSettingsSuccess({})));
      });
    }); */

      it('should handle a failure', () => {
        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.throw(err).value).toEqual(put(Actions.rcGetSettingsFailure(err)));
      });
    });
  });

  describe('rcProgramSettingsSaveFlow', () => {
    describe('cohortType is student', () => {
      beforeEach(() => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Student,
          id: 'mockStudentId',
          schoolId: 'mockSchoolId',
        };
        mockUrlObj = {
          url: Constants.RC_SETTINGS_URL,
          params: {
            cohort_id: mockCohortObj.id,
            cohort_type: mockCohortObj.cohortType.toUpperCase(),
            command: Constants.RC_SETTINGS_URL_SET_COMMAND,
            sid: mockSessionId,
          },
        };
        immMockSettingsData = fromJS({
          StudentSettings: [{ key1: ['value1'], StudentDefaults: ['default'] }],
          QuizSettings: [{ key2: ['value2'], QuizDefaults: ['default'] }],
          AwardSettings: [
            {
              key3: ['value3'],
              AwardDefaults: ['awardDefault'],
              BookDefaults: ['bookDefault'],
              PointDefaults: ['pointDefault'],
            },
          ],
        });
        mockPayload = {
          SetSettingsReq: {
            StudentSettings: {
              key1: 'value1',
            },
            QuizSettings: {
              key2: 'value2',
            },
            AwardSettings: {
              key3: 'value3',
            },
          },
        };
        generator = Saga.rcProgramSettingsSaveFlow({ immSettings: immMockSettingsData });
      });

      it('all calls pass', () => {
        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(
          call(genericNonSLMSPostAPICall, mockUrlObj.url, mockUrlObj.params, mockPayload)
        );
        expect(generator.next().value).toEqual(
          put(Actions.rcSettingsSaveSuccess(immMockSettingsData))
        );
        expect(generator.next().value).toEqual(put(Actions.rcSettingsContainerRequest()));
      });

      it('should handle a failure', () => {
        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.throw(err).value).toEqual(put(Actions.rcSettingsSaveFailure(err)));
      });
    });

    describe('cohortType is grade', () => {
      beforeEach(() => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Grade,
          id: 'mockStudentId',
          schoolId: 'mockSchoolId',
        };
        mockUrlObj = {
          url: Constants.RC_SETTINGS_URL,
          params: {
            cohort_id: mockCohortObj.id,
            cohort_type: mockCohortObj.cohortType.toUpperCase(),
            command: Constants.RC_SETTINGS_URL_SET_COMMAND,
            school_id: mockCohortObj.schoolId,
            sid: mockSessionId,
          },
        };
        immMockSettingsData = fromJS({
          StudentSettings: [{ key1: ['value1'], StudentDefaults: ['default'] }],
          QuizSettings: [{ key2: ['value2'], QuizDefaults: ['default'] }],
          AwardSettings: [
            {
              key3: ['value3'],
              AwardDefaults: ['awardDefault'],
              BookDefaults: ['bookDefault'],
              PointDefaults: ['pointDefault'],
            },
          ],
        });
        mockPayload = {
          SetSettingsReq: {
            StudentSettings: {
              key1: 'value1',
            },
            QuizSettings: {
              key2: 'value2',
            },
            AwardSettings: {
              key3: 'value3',
            },
          },
        };
        generator = Saga.rcProgramSettingsSaveFlow({ immSettings: immMockSettingsData });
      });

      it('all calls pass', () => {
        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(
          call(genericNonSLMSPostAPICall, mockUrlObj.url, mockUrlObj.params, mockPayload)
        );
        expect(generator.next().value).toEqual(
          put(Actions.rcSettingsSaveSuccess(immMockSettingsData))
        );
        expect(generator.next().value).toEqual(put(Actions.rcSettingsContainerRequest()));
      });

      it('should handle a failure', () => {
        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.throw(err).value).toEqual(put(Actions.rcSettingsSaveFailure(err)));
      });
    });
  });

  /* describe('rcInstallStagesFlow', () => {
    beforeEach(() => {
      generator = Saga.rcInstallStagesFlow();
    });

    it('All calls pass', () => {
      mockUrlObj = {
        url: Constants.RC_SETTINGS_URL,
        params: {
          command: Constants.RC_SETTINGS_URL_INSTALL_STAGES_COMMAND,
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
        put(Actions.rcGetInstallStagesSuccess('mockStages'))
      );
    });

    it('should handle a failure', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.rcGetInstallStagesFailure(err)));
    });
  }); */

  /* describe('rcTopicsFlow', () => {
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

      generator = Saga.rcTopicsFlow();
    });

    describe('all calls pass', () => {
      it('cohortType is District', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.District,
          id: 'mockDistrictId',
        };

        mockUrlObj = {
          url: Constants.RC_SETTINGS_URL,
          params: {
            command: Constants.RC_SETTINGS_URL_TOPIC_COMMAND.District,
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
          put(Actions.rcGetTopicsSuccess('mockTopicData'))
        );
      });

      it('cohortType is School', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.School,
          id: 'mockSchoolId',
        };

        mockUrlObj = {
          url: Constants.RC_SETTINGS_URL,
          params: {
            command: Constants.RC_SETTINGS_URL_TOPIC_COMMAND.District,
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
          put(Actions.rcGetTopicsSuccess('mockTopicData'))
        );
      });

      it('cohortType is Grade', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Grade,
          id: 'mockGradeId',
          schoolId: 'mockSchoolId',
        };

        mockUrlObj = {
          url: Constants.RC_SETTINGS_URL,
          params: {
            command: Constants.RC_SETTINGS_URL_TOPIC_COMMAND.Group,
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
          put(Actions.rcGetTopicsSuccess('mockTopicData'))
        );
      });

      it('cohortType is Student', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Student,
          id: 'mockStudentId',
        };

        mockUrlObj = {
          url: Constants.RC_SETTINGS_URL,
          params: {
            command: Constants.RC_SETTINGS_URL_TOPIC_COMMAND.Student,
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

        expect(generator.next(mockOutput).value).toEqual(put(Actions.rcGetTopicsSuccess([])));
      });

      it('cohortType is Teacher', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Teacher,
          id: 'mockTeacherId',
        };

        mockUrlObj = {
          url: Constants.RC_SETTINGS_URL,
          params: {
            command: Constants.RC_SETTINGS_URL_TOPIC_COMMAND.Group,
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
          put(Actions.rcGetTopicsSuccess('mockTopicData'))
        );
      });

      it('cohortType is Group', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Group,
          id: 'mockGroupId',
        };

        mockUrlObj = {
          url: Constants.RC_SETTINGS_URL,
          params: {
            command: Constants.RC_SETTINGS_URL_TOPIC_COMMAND.Group,
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
          put(Actions.rcGetTopicsSuccess('mockTopicData'))
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
          url: Constants.RC_SETTINGS_URL,
          params: {
            command: Constants.RC_SETTINGS_URL_TOPIC_COMMAND.Group,
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

        expect(generator.next(mockOutput).value).toEqual(put(Actions.rcGetTopicsSuccess([])));
      });
    });

    it('should handle a failure', () => {
      expect(generator.next().value).toEqual(select(cohortObjSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.rcGetTopicsFailure(err)));
    });
  }); */

  /* describe('rcTopicsSaveFlow', () => {
    describe('all calls pass', () => {
      describe('cohort is either District or School', () => {
        beforeEach(() => {
          mockUrlObj = {
            url: Constants.RC_SETTINGS_URL,
            params: {
              command: Constants.RC_SETTINGS_URL_SET_TOPIC_COMMAND.District,
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

          generator = Saga.rcTopicsSaveFlow({ topicData: mockTopicData });
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
          expect(generator.next().value).toEqual(put(Actions.rcTopicSaveSuccess()));
          expect(generator.next().value).toEqual(put(Actions.rcSettingsContainerRequest()));
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
          expect(generator.next().value).toEqual(put(Actions.rcTopicSaveSuccess()));
          expect(generator.next().value).toEqual(put(Actions.rcSettingsContainerRequest()));
        });
      });

      describe('cohort is not District or School', () => {
        beforeEach(() => {
          mockUrlObj = {
            url: Constants.RC_SETTINGS_URL,
            params: {
              command: Constants.RC_SETTINGS_URL_SET_TOPIC_COMMAND.Group,
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

          generator = Saga.rcTopicsSaveFlow({ topicData: mockTopicData });
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
          expect(generator.next().value).toEqual(put(Actions.rcTopicSaveSuccess()));
          expect(generator.next().value).toEqual(put(Actions.rcSettingsContainerRequest()));
        });
      });
    });

    it('should handle a failure', () => {
      generator = Saga.rcTopicsSaveFlow({ topicData: [] });

      expect(generator.next().value).toEqual(select(cohortObjSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.rcTopicSaveFailure(err)));
    });
  }); */

  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });

    it('All calls are made', () => {
      const getSettingsConstants = [
        Constants.RC_SETTINGS_CONTAINER,
        SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
        SmartBarConstants.GRADE_SELECTION_SUCCESS,
        SmartBarConstants.TEACHER_SELECTION_SUCCESS,
        SmartBarConstants.CLASS_SELECTION_SUCCESS,
        SmartBarConstants.GROUP_SELECTION_SUCCESS,
        SmartBarConstants.STUDENT_SELECTION_SUCCESS,
      ];

      expect(generator.next().value).toEqual(
        all([
          takeLatest(getSettingsConstants, Saga.rcSettingsContainerFlow),
          takeLatest(Constants.RC_SETTINGS_SAVE, Saga.rcProgramSettingsSaveFlow),
          // takeLatest(Constants.RC_SET_SELECTED_STAGE, Saga.rcTopicsFlow),
          // takeLatest(Constants.RC_TOPIC_SAVE, Saga.rcTopicsSaveFlow),
        ])
      );
    });
  });
});
