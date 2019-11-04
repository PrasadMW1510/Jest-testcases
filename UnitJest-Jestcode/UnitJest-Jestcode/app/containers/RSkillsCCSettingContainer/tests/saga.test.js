/**
 * Test  sagas
 */
/* eslint-disable redux-saga/yield-effects */
import { push } from 'react-router-redux';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { COHORT_TYPE } from 'containers/App/constants';
import { genericNonSLMSGetAPICall, genericNonSLMSPostAPICall } from 'containers/App/request';
import * as Selectors from 'containers/App/selectors';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import { showModal } from 'containers/ModalController/actions';
import { RSKILLSCC_TEST_ASSIGNMENT_SAVE_SUCCESS_MODAL } from 'containers/ModalController/constants';
import { ROUTE_PATHS } from 'containers/RosterPage/constants';
import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import * as SmartBarSelectors from 'containers/SmartBarContainer/selectors';

import * as Actions from '../actions';
import * as Constants from '../constants';
import * as Request from '../request';
import defaultSaga, * as Saga from '../saga';
import { transformRSkillsCCStagesData } from '../transformers';

describe('RSkillsCCSettingContainer Saga', () => {
  let generator = null;
  let cohortObjSelector = null;
  let sessionIdSelector = null;
  let mockCohortObj = null;
  let mockURLObj = null;
  let mockDefaultSettingsURLObj = null;
  let mockSessionId = null;
  const mockErr = 'mock error';

  beforeEach(() => {
    cohortObjSelector = jest.fn();
    sessionIdSelector = jest.fn();
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(sessionIdSelector);
    jest
      .spyOn(SmartBarSelectors, 'makeSelectEffectiveCohortObject')
      .mockReturnValue(cohortObjSelector);

    mockSessionId = 'mockSessionId';
    mockCohortObj = {
      cohortType: COHORT_TYPE.District,
      id: 'mockDistrictId',
    };
  });

  afterEach(() => {
    expect(generator.next().done).toBeTruthy();
  });

  describe('rSkillsTestAssignmentRequestFlow', () => {
    const mockApiSettingsOutputData = {
      key1: 'value1',
      key2: 'value2',
    };

    const mockApiSettingsOutput = {
      output: {
        output_data: [{ settings: [mockApiSettingsOutputData] }],
      },
    };

    const mockApiTestAssignment = {
      stage: [
        {
          $: {
            id: 'A',
            name: 'Stage A',
          },
          bundles: [
            {
              bundle: [
                {
                  $: {
                    id: 'rbook',
                    name: 'rBook',
                  },
                  tests: [
                    {
                      test: [
                        {
                          $: {
                            at_grade_pdf: '/rtng/extensions/sample_pdfs/rSkillsTests_A_1b.pdf',
                            below_grade_pdf: '/rtng/extensions/sample_pdfs/rSkillsTests_A_1a.pdf',
                            description: 'Skills from Workshop 1',
                            name: 'Test 1',
                            number: '1',
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          $: {
            id: 'C',
            name: 'Stage C',
          },
          bundles: [
            {
              bundle: [
                {
                  $: {
                    id: 'rbook',
                    name: 'rBook',
                  },
                  tests: [
                    {
                      test: [
                        {
                          $: {
                            at_grade_pdf: '/rtng/extensions/sample_pdfs/rSkillsTests_C_1b.pdf',
                            below_grade_pdf: '/rtng/extensions/sample_pdfs/rSkillsTests_C_1a.pdf',
                            description: 'Skills from Workshop 1',
                            name: 'Test 1',
                            number: '1',
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  $: {
                    id: 'rbook_flex_i',
                    name: 'rBook Flex',
                  },
                  tests: [
                    {
                      test: [
                        {
                          $: {
                            at_grade_pdf: '/rtng/extensions/sample_pdfs/rSkillsTests_F1_1b.pdf',
                            below_grade_pdf:
                              '/rtng/extensions/sample_pdfs/rSkillsTests_FlexI_1a.pdf',
                            description: 'Skills from Workshop 1',
                            name: 'Test 1',
                            number: '1',
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  $: {
                    id: 'rbook_flex_ii',
                    name: 'rBook Flex II',
                  },
                  tests: [
                    {
                      test: [
                        {
                          $: {
                            at_grade_pdf: '/rtng/extensions/sample_pdfs/rSkillsTests_FlexII_1b.pdf',
                            below_grade_pdf:
                              '/rtng/extensions/sample_pdfs/rSkillsTests_FlexII_1a.pdf',
                            description: 'Skills from Workshop 1',
                            name: 'Test 1',
                            number: '1',
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    const mockTransformedStages = transformRSkillsCCStagesData(mockApiTestAssignment);

    beforeEach(() => {
      generator = Saga.rSkillsTestAssignmentRequestFlow();

      mockURLObj = {
        url: Constants.RSKILLSCC_SETTINGS_URL,
        params: {
          sid: mockSessionId,
          command: Constants.RSKILLSCC_SETTINGS_GET_COMMAND,
          cohort_type: mockCohortObj.cohortType.toLowerCase(),
          cohort_id: mockCohortObj.id,
          output_format: 'raw',
        },
      };
    });

    it('should run the test assignment request flow', () => {
      expect(generator.next().value).toEqual(put(Actions.rSkillsCCSettingsContainerLoading()));
      expect(generator.next().value).toEqual(select(cohortObjSelector));
      expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));

      expect(generator.next(mockSessionId).value).toEqual(
        all([
          call(genericNonSLMSGetAPICall, mockURLObj.url, mockURLObj.params),
          call(Request.getRSkillsCCTestAssignment, mockSessionId),
        ])
      );

      expect(generator.next([mockApiSettingsOutput, mockApiTestAssignment]).value).toEqual(
        put(
          Actions.rSkillsCCSettingsTestAssignmentRequestSuccess(
            mockApiSettingsOutputData,
            mockTransformedStages
          )
        )
      );
    });

    it('should fail when there is an error in testAssignmentRequestFlow', () => {
      expect(generator.next().value).toEqual(put(Actions.rSkillsCCSettingsContainerLoading()));
      expect(generator.next().value).toEqual(select(cohortObjSelector));
      expect(generator.throw(mockErr).value).toEqual(
        put(Actions.rSkillsCCSettingsTestAssignmentRequestFailure(mockErr))
      );
    });
  });

  describe('rSkillsTestAssignmentSaveRequestFlow', () => {
    const data = {
      bundleName: 'rBook Flex I',
      testDescription: 'Skills for Workshop 3',
      redirectToRoster: 'mockRedirectToRoster',
      postPayload: {
        output: {
          output_data: {
            cohort_type: COHORT_TYPE.Teacher,
            cohort_id: 'guidTeacherId12345',
            stage: 'A',
            test_bundle_id: 'rbook_flex_i',
            test_number: '3',
            level: '1',
          },
        },
      },
    };

    const mockAction = { type: Constants.RSKILLS_TEST_ASSIGNMENT_SAVE_REQUEST, data };

    const mockSaveResult = {
      output: 'mockSaveResult',
    };

    const updatedMockSaveResult = {
      output: 'mockSaveResult',
      rBookName: mockAction.data.bundleName,
      rSkillsTestDescription: mockAction.data.testDescription,
      redirectToRoster: mockAction.data.redirectToRoster,
    };

    beforeEach(() => {
      generator = Saga.rSkillsTestAssignmentSaveRequestFlow(mockAction);
    });

    it('should run the save request flow successfully', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(mockSessionId, mockAction.data.payload).value).toEqual(
        call(Request.postRSkillsCCSetTestAssignments, mockSessionId, mockAction.data.postPayload)
      );

      expect(generator.next(mockSaveResult).value).toEqual(
        put(Actions.rSkillsCCTestAssignmentSaveRequestSuccess(updatedMockSaveResult))
      );

      expect(generator.next().value).toEqual(
        put(showModal(RSKILLSCC_TEST_ASSIGNMENT_SAVE_SUCCESS_MODAL, updatedMockSaveResult))
      );
    });

    it('should fail when there is an error', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(mockErr).value).toEqual(
        put(Actions.rSkillsCCTestAssignmentSaveRequestFailure(mockErr))
      );
    });
  });

  describe('rSkillsCCDefaultSettingsRequestFlow', () => {
    const mockApiDefaultSettingsOutputData = {
      key1: 'valueA',
      key2: 'valueB',
    };

    const mockApiDefaultSettingsOutput = {
      output: {
        output_data: [{ settings: [mockApiDefaultSettingsOutputData] }],
      },
    };

    beforeEach(() => {
      generator = Saga.rSkillsCCDefaultSettingsRequestFlow();

      mockDefaultSettingsURLObj = {
        url: Constants.RSKILLSCC_SETTINGS_URL,
        params: {
          sid: mockSessionId,
          command: Constants.RSKILLSCC_DEFAULT_SETTINGS_COMMAND,
          cohort_type: mockCohortObj.cohortType.toLowerCase(),
          cohort_id: mockCohortObj.id,
        },
      };
    });

    it('should run the default settings request flow', () => {
      expect(generator.next().value).toEqual(select(cohortObjSelector));
      expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));
      expect(generator.next(mockSessionId).value).toEqual(
        call(
          genericNonSLMSGetAPICall,
          mockDefaultSettingsURLObj.url,
          mockDefaultSettingsURLObj.params
        )
      );
      expect(generator.next(mockApiDefaultSettingsOutput).value).toEqual(
        put(Actions.rSkillsCCDefaultSettingsRequestSuccess(mockApiDefaultSettingsOutputData))
      );
    });

    describe('for grade cohort type', () => {
      beforeEach(() => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Grade,
          id: 'mockGradeId',
          school_id: 'mockSchoolId',
        };

        mockDefaultSettingsURLObj = {
          url: Constants.RSKILLSCC_SETTINGS_URL,
          params: {
            sid: mockSessionId,
            command: Constants.RSKILLSCC_DEFAULT_SETTINGS_COMMAND,
            cohort_type: mockCohortObj.cohortType.toLowerCase(),
            cohort_id: mockCohortObj.id,
          },
        };
      });

      it('should run the default settings request flow for grade cohort type', () => {
        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(
          call(
            genericNonSLMSGetAPICall,
            mockDefaultSettingsURLObj.url,
            mockDefaultSettingsURLObj.params
          )
        );
        expect(generator.next(mockApiDefaultSettingsOutput).value).toEqual(
          put(Actions.rSkillsCCDefaultSettingsRequestSuccess(mockApiDefaultSettingsOutputData))
        );
      });
    });

    it('should fail when there is an error', () => {
      expect(generator.next().value).toEqual(select(cohortObjSelector));
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(mockErr).value).toEqual(
        put(Actions.rSkillsCCDefaultSettingsRequestFailure(mockErr))
      );
    });
  });

  describe('rSkillsSettingsSaveRequestFlow', () => {
    const data = {
      redirectToRoster: true,
      postPayload: {
        output: {
          output_data: {
            cohort_type: COHORT_TYPE.Teacher,
            cohort_id: 'guidTeacherId12345',
            settings: {
              audio_instructions: 1,
              show_correct_incorrect: 0,
              include_open_response: 0,
              include_writing_prompts: 1,
              ell_audio_instructions: 5,
              writing_prompt_grading: {
                grading_rubric: 1,
              },
            },
          },
        },
      },
    };
    const mockAction = { type: Constants.RSKILLSCC_SETTINGS_SAVE_REQUEST, data };
    beforeEach(() => {
      generator = Saga.rSkillsSettingsSaveRequestFlow(mockAction);

      mockURLObj = {
        url: Constants.RSKILLSCC_SETTINGS_URL,
        params: {
          sid: mockSessionId,
          command: Constants.RSKILLSCC_SETTINGS_SET_COMMAND,
          output_format: 'raw',
        },
      };
    });

    it('should run the settings save request flow successfully and redirect to roster', () => {
      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next().value).toEqual(select(cohortObjSelector));
      expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));
      expect(generator.next(mockSessionId).value).toEqual(
        call(genericNonSLMSPostAPICall, mockURLObj.url, mockURLObj.params, data.postPayload)
      );
      expect(generator.next().value).toEqual(put(Actions.rSkillsCCSettingsSaveRequestSuccess()));
      expect(generator.next().value).toEqual(put(hideLoading()));
      expect(generator.next().value).toEqual(put(push(ROUTE_PATHS.roster)));
    });

    it('should fail when there is an error', () => {
      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.throw(mockErr).value).toEqual(
        put(Actions.rSkillsCCSettingsSaveRequestFailure(mockErr))
      );
      expect(generator.next().value).toEqual(put(hideLoading()));
    });
    describe('Grade cohort without a Redirect to Roster', () => {
      beforeEach(() => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Grade,
          id: 'mockGradeId',
          schoolId: 'guidSchoolId12345',
        };
        // update this dataObj so that code lines are covered by this test
        data.redirectToRoster = false;
        data.postPayload.output.output_data.cohort_type = COHORT_TYPE.Grade;
        data.postPayload.output.output_data.cohort_id = '12';

        mockURLObj = {
          url: Constants.RSKILLSCC_SETTINGS_URL,
          params: {
            sid: mockSessionId,
            command: Constants.RSKILLSCC_SETTINGS_SET_COMMAND,
            output_format: 'raw',
            school_id: 'guidSchoolId12345',
          },
        };
        generator = Saga.rSkillsSettingsSaveRequestFlow(mockAction);
      });
      it('should run the settings save request flow successfully with no redirect', () => {
        expect(generator.next().value).toEqual(put(showLoading()));
        expect(generator.next().value).toEqual(select(cohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(
          call(genericNonSLMSPostAPICall, mockURLObj.url, mockURLObj.params, data.postPayload)
        );
        expect(generator.next().value).toEqual(put(Actions.rSkillsCCSettingsSaveRequestSuccess()));
        expect(generator.next().value).toEqual(put(hideLoading()));
        expect(generator.next().value).toEqual(
          put(Actions.rSkillsCCSettingsTestAssignmentRequest())
        );
      });
    });
  });

  describe('defaultSaga', () => {
    beforeEach(() => {
      generator = defaultSaga();
    });

    it('Expects default Sagas are called ', () => {
      expect(generator.next().value).toEqual(
        all([
          takeLatest(
            [
              SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
              SmartBarConstants.GRADE_SELECTION_SUCCESS,
              SmartBarConstants.TEACHER_SELECTION_SUCCESS,
              SmartBarConstants.CLASS_SELECTION_SUCCESS,
              SmartBarConstants.GROUP_SELECTION_SUCCESS,
              SmartBarConstants.STUDENT_SELECTION_SUCCESS,
              Constants.RSKILLSCC_SETTINGS_TEST_ASSIGNMENT_REQUEST,
            ],
            Saga.rSkillsTestAssignmentRequestFlow
          ),
          takeLatest(
            Constants.RSKILLS_TEST_ASSIGNMENT_SAVE_REQUEST,
            Saga.rSkillsTestAssignmentSaveRequestFlow
          ),
          takeLatest(
            Constants.RSKILLSCC_DEFAULT_SETTINGS_REQUEST,
            Saga.rSkillsCCDefaultSettingsRequestFlow
          ),
          takeLatest(
            Constants.RSKILLSCC_SETTINGS_SAVE_REQUEST,
            Saga.rSkillsSettingsSaveRequestFlow
          ),
        ])
      );
    });
  });
});
