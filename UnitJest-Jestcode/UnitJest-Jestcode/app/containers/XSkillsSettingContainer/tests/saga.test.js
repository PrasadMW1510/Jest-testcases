/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { COHORT_TYPE } from 'containers/App/constants';
import { genericNonSLMSGetAPICall, genericNonSLMSPostAPICall } from 'containers/App/request';
import * as Selectors from 'containers/App/selectors';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import { showModal } from 'containers/ModalController/actions';
import { XSKILLS_TEST_ASSIGNMENT_SAVE_SUCCESS_MODAL } from 'containers/ModalController/constants';
import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import * as SmartBarSelectors from 'containers/SmartBarContainer/selectors';

import * as Actions from '../actions';
import * as Constants from '../constants';
import defaultSaga, * as Saga from '../saga';

let cohortObjSelector = null;
let sessionIdSelector = null;
let generator = null;
let mockTeacherCohortObj = null;
let mockXSkillTestAssignmentURLObj = null;
let mockDistrictCohortObj = null;
const mockSessionId = 'mockSessionId';
const mockError = 'error';
describe('xSkillsSettingContainer Saga', () => {
  mockTeacherCohortObj = {
    cohortType: COHORT_TYPE.Teacher,
    id: 'mockTeacherId',
  };

  beforeEach(() => {
    cohortObjSelector = jest.fn();
    sessionIdSelector = jest.fn();
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(sessionIdSelector);
    jest
      .spyOn(SmartBarSelectors, 'makeSelectEffectiveCohortObject')
      .mockReturnValue(cohortObjSelector);
    mockDistrictCohortObj = {
      cohortType: COHORT_TYPE.District,
      id: 'mockDistrictId',
    };
  });

  afterEach(() => {
    expect(generator.next().done).toBeTruthy();
  });

  describe('defaultSaga Saga', () => {
    beforeEach(() => {
      generator = defaultSaga();
    });
    it('Expect default sagas are called', () => {
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
              Constants.XSKILLS_TEST_ASSIGNMENT_REQUEST,
            ],
            Saga.xSkillsTestAssignmentRequestFlow
          ),
          takeLatest(
            Constants.XSKILLS_TEST_ASSIGNMENT_SAVE_REQUEST,
            Saga.xSkillsTestAssignmentSaveRequestFlow
          ),
          takeLatest(
            [
              SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
              SmartBarConstants.GRADE_SELECTION_SUCCESS,
              SmartBarConstants.TEACHER_SELECTION_SUCCESS,
              SmartBarConstants.CLASS_SELECTION_SUCCESS,
              SmartBarConstants.GROUP_SELECTION_SUCCESS,
              SmartBarConstants.STUDENT_SELECTION_SUCCESS,
              Constants.XSKILLS_SETTINGS_REQUEST,
            ],
            Saga.xSkillsSettingsRequestFlow
          ),
        ])
      );
      expect(generator.next().done).toBeTruthy();
    });
  });

  describe('xSkillsTestAssignmentRequestFlow', () => {
    const mockApiTestAssignmentOutputData = {
      test: {
        test_number: 1,
        test_title: 'Test 1',
        test_description: 'Test 1: Skills from Workshops 1',
      },
    };

    const mockApiTestAssignmentOutput = {
      output: {
        output_data: [{ tests: [mockApiTestAssignmentOutputData] }],
      },
    };
    beforeEach(() => {
      generator = Saga.xSkillsTestAssignmentRequestFlow();
      mockXSkillTestAssignmentURLObj = {
        url: Constants.XSKILLS_TEST_ASSIGN_URL,
        params: {
          sid: mockSessionId,
          command: Constants.XSKILLS_TEST_ASSIGN_GET_COMMAND,
          cohort_type: mockTeacherCohortObj.cohortType.toLowerCase(),
          cohort_id: mockTeacherCohortObj.id,
        },
      };
    });

    it('should handle the xSkillsTestAssignmentRequestFlow successfully', () => {
      expect(generator.next().value).toEqual(put(Actions.xSkillsTestAssignmentLoading()));
      expect(generator.next().value).toEqual(select(cohortObjSelector));
      expect(generator.next(mockTeacherCohortObj).value).toEqual(select(sessionIdSelector));
      expect(generator.next(mockSessionId).value).toEqual(
        call(
          genericNonSLMSGetAPICall,
          mockXSkillTestAssignmentURLObj.url,
          mockXSkillTestAssignmentURLObj.params
        )
      );
      expect(generator.next(mockApiTestAssignmentOutput).value).toEqual(
        put(Actions.xSkillsTestAssignmentRequestSuccess(mockApiTestAssignmentOutputData))
      );
    });

    it('should handle the xSkillsTestAssignmentRequestFlow when Cohort is District', () => {
      expect(generator.next().value).toEqual(put(Actions.xSkillsTestAssignmentLoading()));
      expect(generator.next().value).toEqual(select(cohortObjSelector));
      expect(generator.next(mockDistrictCohortObj).value).toEqual(
        put(Actions.xSkillsTestAssignmentRequestSuccess())
      );
    });

    it('should handle xSkillsSettingContainerFlow when there is an error', () => {
      expect(generator.next().value).toEqual(put(Actions.xSkillsTestAssignmentLoading()));
      expect(generator.throw(mockError).value).toEqual(
        put(Actions.xSkillsTestAssignmentRequestFailure(mockError))
      );
    });
  });

  describe('xSkillsTestAssignmentSaveRequestFlow', () => {
    const data = {
      redirectToRoster: false,
      postPayload: {
        output: {
          output_data: {
            cohort_type: mockTeacherCohortObj.cohortType.toLowerCase(),
            cohort_id: mockTeacherCohortObj.id,
            test_number: 1,
          },
        },
      },
    };
    const mockAction = { type: Constants.XSKILLS_TEST_ASSIGNMENT_SAVE_REQUEST, data };
    const mockXSkillTestAssignSaveUrlObj = {
      url: Constants.XSKILLS_TEST_ASSIGN_URL,
      params: {
        command: Constants.XSKILLS_TEST_ASSIGN_SET_COMMAND,
        sid: mockSessionId,
        cohort_type: mockTeacherCohortObj.cohortType.toLowerCase(),
        cohort_id: mockTeacherCohortObj.id,
      },
    };
    let updatedMockSaveResult = {
      output: 'mockSaveResult',
      redirectToRoster: mockAction.data.redirectToRoster,
      xSkillsTestNumber: mockAction.data.postPayload.output.output_data.test_number,
    };
    beforeEach(() => {
      generator = Saga.xSkillsTestAssignmentSaveRequestFlow(mockAction);
    });
    it('should handle xSkillsTestAssignmentSaveRequestFlow when there is an error', () => {
      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.throw(mockError).value).toEqual(
        put(Actions.xSkillsTestAssignmentSaveRequestFailure(mockError))
      );
      expect(generator.next().value).toEqual(put(hideLoading()));
    });

    it('should handle xSkillsTestAssignmentSaveRequestFlow successfully', () => {
      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next().value).toEqual(select(cohortObjSelector));
      expect(generator.next(mockTeacherCohortObj).value).toEqual(select(sessionIdSelector));
      expect(generator.next(mockSessionId, mockAction.data.payload).value).toEqual(
        call(
          genericNonSLMSPostAPICall,
          mockXSkillTestAssignSaveUrlObj.url,
          mockXSkillTestAssignSaveUrlObj.params,
          mockAction.data.postPayload
        )
      );

      const mockOutput = {
        output: {
          output_data: [
            {
              result: [{ mockData: 'mockData' }],
            },
          ],
        },
      };

      updatedMockSaveResult = {
        mockData: 'mockData',
        redirectToRoster: mockAction.data.redirectToRoster,
        xSkillsTestNumber: mockAction.data.postPayload.output.output_data.test_number,
      };

      expect(generator.next(mockOutput).value).toEqual(put(hideLoading()));
      expect(generator.next().value).toEqual(
        put(Actions.xSkillsTestAssignmentSaveRequestSuccess(updatedMockSaveResult))
      );
      expect(generator.next().value).toEqual(
        put(showModal(XSKILLS_TEST_ASSIGNMENT_SAVE_SUCCESS_MODAL, updatedMockSaveResult))
      );
    });
  });
});
