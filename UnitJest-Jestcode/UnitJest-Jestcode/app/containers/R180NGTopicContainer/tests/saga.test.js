/**
 * Test  R180NGTopic Saga
 */

/* eslint-disable redux-saga/yield-effects */
import { fromJS } from 'immutable';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { getUrl, postUrl } from 'utils/request';
import * as Selectors from 'containers/App/selectors';
import * as R180Request from 'containers/R180NGSettingContainer/request';
import * as R180Action from 'containers/R180NGSettingContainer/actions';
import * as SmartBarSelectors from 'containers/SmartBarContainer/selectors';
import * as Actions from '../actions';
import * as Constants from '../constants';
import * as Request from '../request';
import defaultSaga, * as Saga from '../saga';
import * as SmartBarConstants from '../../SmartBarContainer/constants';
import { COHORT_TYPE } from '../../App/constants';

describe('R180NGTopicContainer Saga', () => {
  let generator = null;

  let sessionIdSelector = null;
  let smartBarSelector = null;
  let userIdSelector = null;
  let userTypeSelector = null;
  let userOrgTypeSelector = null;
  let userOrgIdSelector = null;
  let mockStudentObj = null;
  let mockSessionId = null;
  let mockUserOrgType = null;
  let mockCohortObj = null;
  let mockStageId = null;
  let mockCohortObjSelector = null;
  let mockSmartBarSelections = null;
  let mockUrlObj = null;
  let mockUserType = null;

  let mockUrlDistrictTopics = null;
  // let mockSelectedId = null;
  const mockTopics = null;
  let mockState = null;
  let mockUserId = null;
  let err = null;

  beforeEach(() => {
    sessionIdSelector = jest.fn();
    smartBarSelector = jest.fn();
    userTypeSelector = jest.fn();
    userIdSelector = jest.fn();
    mockCohortObjSelector = jest.fn();
    userOrgTypeSelector = jest.fn();
    userOrgIdSelector = jest.fn();
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(sessionIdSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserId').mockReturnValue(userIdSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserType').mockReturnValue(userTypeSelector);
    jest.spyOn(Selectors, 'makeSelectLoginUserOrg').mockReturnValue(userOrgTypeSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserOrgId').mockReturnValue(userOrgIdSelector);
    jest.spyOn(SmartBarSelectors, 'makeSelectSmartBarContainer').mockReturnValue(smartBarSelector);
    jest
      .spyOn(SmartBarSelectors, 'makeSelectEffectiveCohortObject')
      .mockReturnValue(mockCohortObjSelector);

    mockSessionId = 'mockSessionId';
    mockUserOrgType = 'mockUerOrgType';
    mockSmartBarSelections = fromJS({
      selectedCohType: COHORT_TYPE.District,
    });
    mockCohortObj = { cohortType: 'School', id: 'mockedId' };
    mockUserId = 'mockUserId';
    err = 'mock error';
  });

  describe('R180NGTopicsRequestFlow', () => {
    beforeEach(() => {
      mockSmartBarSelections = { selectedSchoolId: 'mockselectedSchoolId' };
      mockState = {
        completionLevel: '',
        currentSegment: 'segment1_name',
        currentSegmentId: '1',
        currentTopic: 'Can You Believe It?',
        currentTopicID: 'A01',
        r180ngTopicsObj: {
          student_level: ['1'],
          topic_cd: [
            {
              enable: ['1'],
              cd_name: ['A01'],
              supplimental: ['0'],
              topic_name: ['Can You Believe It?'],
              globally_enabled: ['1'],
              student_level: ['2'],
              segment1_name: ['segment1_name'],
              segment2_name: ['segment2_name'],
              segment3_name: ['segment3_name'],
              segment4_name: ['segment4_name'],
              topic_complete_levels: [{ topic_complete_level: [] }],
              current_segment: ['1'],
            },
            {
              enable: ['1'],
              cd_name: ['A02'],
              supplimental: ['0'],
              topic_name: ['Predator'],
              globally_enabled: ['1'],
              student_level: ['2'],
              segment1_name: ['segment1_name'],
              segment2_name: ['segment2_name'],
              segment3_name: ['segment3_name'],
              segment4_name: ['segment4_name'],
              current_segment: ['2'],
            },
          ],
        },
        saveOptions: true,
        skipLevel: true,
        skipSegment: false,
        skipTopic: false,
        skipTopicObj: {},
        studentLevel: { student_level: ['1'] },
        studentLevelToggle: true,
      };
      generator = Saga.r180NGTopicsRequestFlow({ r180ngTopics: mockState });
    });

    describe('userType is Administrator, selectedCohType is School', () => {
      it('calls pass', () => {
        mockStageId = [{ stapgeId: '' }];
        mockCohortObj = { cohortType: 'School', id: 'mockedId' };
        mockUserOrgType = 'Administrator';
        mockSmartBarSelections = fromJS({
          selectedCohType: COHORT_TYPE.District,
          selectedSchoolId: 'mockedId',
        });
        // const mockActiveStage = '';
        mockUrlObj = {
          url: `/r180ng/r180ngProductCtrls?command=get_district_topics&sid=mockSessionId&stage_id=[object Object]`,
          sid: 'mockSessionId',
        };

        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(mockCohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(smartBarSelector));
        expect(generator.next(mockSmartBarSelections).value).toEqual(
          call(getUrl, `${mockUrlObj.url}`)
        );
        expect(generator.next(mockTopics).value).toEqual(
          put(Actions.updateR180NGTopicsSelectedStageRequestSuccess(mockState))
        );
        expect(generator.next().value).toEqual(put(Actions.R180NGTopicsRequestSuccess(mockTopics)));
      });
      it('calls pass District', () => {
        mockStageId = [{ stapgeId: '' }];
        mockCohortObj = { cohortType: 'District', id: 'mockedId' };
        mockUserOrgType = 'Administrator';
        mockSmartBarSelections = fromJS({
          selectedCohType: COHORT_TYPE.District,
          selectedSchoolId: 'mockedId',
        });
        // const mockActiveStage = '';
        mockUrlObj = {
          url: `/r180ng/r180ngProductCtrls?command=get_district_topics&sid=mockSessionId&stage_id=[object Object]`,
          sid: 'mockSessionId',
        };

        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(mockCohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(smartBarSelector));
        expect(generator.next(mockSmartBarSelections).value).toEqual(
          call(getUrl, `${mockUrlObj.url}`)
        );
        expect(generator.next(mockTopics).value).toEqual(
          put(Actions.updateR180NGTopicsSelectedStageRequestSuccess(mockState))
        );
        expect(generator.next().value).toEqual(put(Actions.R180NGTopicsRequestSuccess(mockTopics)));
      });
      it('calls pass Grade', () => {
        mockStageId = [{ stapgeId: '' }];
        mockCohortObj = { cohortType: COHORT_TYPE.Grade, id: 'mockedId' };
        mockUserOrgType = 'Administrator';
        // const mockActiveStage = '';
        mockSmartBarSelections = fromJS({
          selectedCohType: COHORT_TYPE.Grade,
          selectedSchoolId: 'mockedId',
        });

        mockUrlObj = {
          url: `/r180ng/r180ngProductCtrls?command=get_group_topics&sid=${mockSessionId}&stage_id=${mockStageId}&cohort_type=${mockCohortObj.cohortType.toLowerCase()}&cohort_id=${
            mockCohortObj.id
          }&school_id=${'mockedId'}`,
          sid: 'mockSessionId',
        };

        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(mockCohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(smartBarSelector));
        expect(generator.next(mockSmartBarSelections).value).toEqual(
          call(getUrl, `${mockUrlObj.url}`)
        );
        expect(generator.next(mockTopics).value).toEqual(
          put(Actions.updateR180NGTopicsSelectedStageRequestSuccess(mockState))
        );
        expect(generator.next().value).toEqual(put(Actions.R180NGTopicsRequestSuccess(mockTopics)));
      });
      it('calls pass Class', () => {
        mockStageId = [{ stapgeId: '' }];
        mockCohortObj = { cohortType: COHORT_TYPE.Class, id: 'mockedId' };
        mockUserOrgType = 'Administrator';
        // const mockActiveStage = '';
        mockSmartBarSelections = fromJS({
          selectedCohType: COHORT_TYPE.Class,
          selectedSchoolId: 'mockedId',
        });

        mockUrlObj = {
          url: `/r180ng/r180ngProductCtrls?command=get_group_topics&sid=${mockSessionId}&stage_id=${mockStageId}&cohort_type=${
            mockCohortObj.cohortType
          }&cohort_id=${mockCohortObj.id}`,
          sid: 'mockSessionId',
        };

        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(mockCohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(smartBarSelector));
        expect(generator.next(mockSmartBarSelections).value).toEqual(
          call(getUrl, `${mockUrlObj.url}`)
        );
        expect(generator.next(mockTopics).value).toEqual(
          put(Actions.updateR180NGTopicsSelectedStageRequestSuccess(mockState))
        );
        expect(generator.next().value).toEqual(put(Actions.R180NGTopicsRequestSuccess(mockTopics)));
      });

      it('calls pass Teacher', () => {
        mockStageId = [{ stapgeId: '' }];
        mockCohortObj = { cohortType: COHORT_TYPE.Teacher, id: 'mockedId' };
        mockUserOrgType = 'Administrator';
        // const mockActiveStage = '';
        mockSmartBarSelections = fromJS({
          selectedCohType: COHORT_TYPE.Teacher,
          selectedSchoolId: 'mockedId',
        });

        mockUrlObj = {
          url: `/r180ng/r180ngProductCtrls?command=get_group_topics&sid=${mockSessionId}&stage_id=${mockStageId}&cohort_type=${
            mockCohortObj.cohortType
          }&cohort_id=${mockCohortObj.id}`,
          sid: 'mockSessionId',
        };

        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(mockCohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(smartBarSelector));
        expect(generator.next(mockSmartBarSelections).value).toEqual(
          call(getUrl, `${mockUrlObj.url}`)
        );
        expect(generator.next(mockTopics).value).toEqual(
          put(Actions.updateR180NGTopicsSelectedStageRequestSuccess(mockState))
        );
        expect(generator.next().value).toEqual(put(Actions.R180NGTopicsRequestSuccess(mockTopics)));
      });
      it('calls pass School admin', () => {
        mockStageId = [{ stapgeId: '' }];
        mockCohortObj = { cohortType: '', id: 'mockedId' };
        mockUserOrgType = 'School';
        // const mockActiveStage = '';
        mockSmartBarSelections = fromJS({
          selectedCohType: '',
          selectedSchoolId: 'mockedId',
        });

        mockUrlObj = {
          url: `/r180ng/r180ngProductCtrls?command=get_district_topics&sid=${mockSessionId}&stage_id=${mockStageId}`,
          sid: 'mockSessionId',
        };

        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(mockCohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(smartBarSelector));
        expect(generator.next(mockSmartBarSelections).value).toEqual(
          call(getUrl, `${mockUrlObj.url}`)
        );
        expect(generator.next(mockTopics).value).toEqual(
          put(Actions.updateR180NGTopicsSelectedStageRequestSuccess(mockState))
        );
        expect(generator.next().value).toEqual(put(Actions.R180NGTopicsRequestSuccess(mockTopics)));
      });

      it('calls pass Student', () => {
        mockStageId = [{ stapgeId: '' }];
        mockCohortObj = { cohortType: COHORT_TYPE.Student, id: 'mockedId' };
        mockUserOrgType = 'Administrator';
        // const mockActiveStage = '';
        mockSmartBarSelections = fromJS({
          selectedCohType: COHORT_TYPE.Student,
          selectedSchoolId: 'mockedId',
        });

        mockUrlObj = {
          url: `/r180ng/r180ngProductCtrls?command=get_student_topics&sid=${mockSessionId}&stage_id=${mockStageId}&user_id=mockedId`,
          sid: 'mockSessionId',
        };
        const mockGetSettings = null;
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(mockCohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(smartBarSelector));
        expect(generator.next(mockSmartBarSelections).value).toEqual(
          call(
            R180Request.getGroupSettingsR180NG,
            mockSessionId,
            mockCohortObj.id,
            mockCohortObj.cohortType
          )
        );
        expect(generator.next(mockGetSettings).value).toEqual(
          put(R180Action.updateR180NGSettingRequestSuccess(mockGetSettings))
        );
        expect(generator.next().value).toEqual(call(getUrl, `${mockUrlObj.url}`));
        expect(generator.next(mockTopics).value).toEqual(
          put(Actions.updateR180NGTopicsSelectedStageRequestSuccess(mockState))
        );
        expect(generator.next().value).toEqual(put(Actions.R180NGTopicsRequestSuccess(mockTopics)));
      });
      it('calls fail', () => {
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.throw(err).value).toEqual(put(Actions.R180NGTopicsRequestFailure(err)));
      });
    });
  });
  describe('r180ngTopicsSaveRequestFlow', () => {
    describe('cohort is either District or School', () => {
      beforeEach(() => {
        mockStageId = '';
        mockUrlObj = {
          url: '/r180ng/r180ngProductCtrls?command=set_district_topics',
          sid: mockSessionId,
        };
        mockUrlDistrictTopics = `/r180ng/r180ngProductCtrls?command=get_district_topics&sid=${mockSessionId}&stage_id=${mockStageId}`;
        mockState = {
          completionLevel: '',
          currentSegment: 'segment1_name',
          currentSegmentId: '1',
          currentTopic: 'Can You Believe It?',
          currentTopicID: 'A01',
          r180ngTopicsObj: {
            student_level: ['1'],
            topic_cd: [
              {
                enable: ['1'],
                cd_name: ['A01'],
                supplimental: ['0'],
                topic_name: ['Can You Believe It?'],
                globally_enabled: ['1'],
                student_level: ['2'],
                segment1_name: ['segment1_name'],
                segment2_name: ['segment2_name'],
                segment3_name: ['segment3_name'],
                segment4_name: ['segment4_name'],
                topic_complete_levels: [{ topic_complete_level: [] }],
                current_segment: ['1'],
              },
              {
                enable: ['1'],
                cd_name: ['A02'],
                supplimental: ['0'],
                topic_name: ['Predator'],
                globally_enabled: ['1'],
                student_level: ['2'],
                segment1_name: ['segment1_name'],
                segment2_name: ['segment2_name'],
                segment3_name: ['segment3_name'],
                segment4_name: ['segment4_name'],
                current_segment: ['2'],
              },
            ],
          },
          saveOptions: true,
          skipLevel: true,
          skipData: { skipLevel: 1 },
          skipSegment: false,
          skipTopic: true,
          skipTopicObj: {},
          studentLevel: { student_level: ['1'] },
          studentLevelToggle: true,
        };
        const r180ngTopicObj = mockState.r180ngTopicsObj.topic_cd.map(coldata => ({
          topic_cd: {
            enable: coldata.enable && coldata.enable[0],
            cd_name: coldata.cd_name && coldata.cd_name[0],
          },
        }));
        mockStudentObj = {
          output: {
            output_data: {
              topic_cds: [r180ngTopicObj],
            },
          },
        };

        generator = Saga.r180ngTopicsSaveRequestFlow({ r180ngTopics: mockState });
      });

      it('cohortType is District', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.District,
          id: 'mockDistrictId',
          schoolId: 'mockSchoolId',
        };
        mockSmartBarSelections = fromJS({
          selectedCohType: COHORT_TYPE.District,
          activeSchoolId: mockCohortObj.id,
        });
        mockUserOrgType = 'School';
        mockSessionId = 'mockSessionId';
        mockUserId = 'mockUserId';
        mockUserType = 'Administrator';
        // mockStudentObj.output.output_data.cohort_type = mockCohortObj.cohortType.toUpperCase();
        // mockStudentObj.output.output_data.cohort_id = mockCohortObj.id;
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userTypeSelector));
        expect(generator.next(mockUserType).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(mockCohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(smartBarSelector));
        expect(generator.next(mockSmartBarSelections).value).toEqual(
          call(postUrl, `${mockUrlObj.url}&sid=${mockUrlObj.sid}`, mockStudentObj)
        );
        expect(generator.next().value).toEqual(put(Actions.R180NGTopicsSaveRequestSuccess()));
        expect(generator.next().value).toEqual(call(getUrl, mockUrlDistrictTopics));
        expect(generator.next().value).toEqual(put(Actions.updateR180NGTopicsRequestSuccess()));
      });

      it('cohortType is School', () => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.School,
          id: 'mockDistrictId',
          schoolId: 'mockSchoolId',
        };
        mockSmartBarSelections = fromJS({
          selectedCohType: COHORT_TYPE.School,
          activeSchoolId: mockCohortObj.id,
        });
        mockUserOrgType = 'School';
        mockSessionId = 'mockSessionId';
        mockUserId = 'mockUserId';
        mockUserType = 'Administrator';
        // mockStudentObj.output.output_data.cohort_type = mockCohortObj.cohortType.toUpperCase();
        // mockStudentObj.output.output_data.cohort_id = mockCohortObj.id;
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userTypeSelector));
        expect(generator.next(mockUserType).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(mockCohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(smartBarSelector));
        expect(generator.next(mockSmartBarSelections).value).toEqual(
          call(postUrl, `${mockUrlObj.url}&sid=${mockUrlObj.sid}`, mockStudentObj)
        );
        expect(generator.next().value).toEqual(put(Actions.R180NGTopicsSaveRequestSuccess()));
        expect(generator.next().value).toEqual(call(getUrl, mockUrlDistrictTopics));
        expect(generator.next().value).toEqual(put(Actions.updateR180NGTopicsRequestSuccess()));
      });
      it('cohortType is Teacher', () => {
        mockStageId = '';
        mockUrlObj = {
          url: '/r180ng/r180ngProductCtrls?command=set_group_topics',
          sid: mockSessionId,
        };
        mockCohortObj = {
          cohortType: COHORT_TYPE.Teacher,
          id: 'mockTeacherId',
          schoolId: 'mockSchoolId',
        };
        mockUrlDistrictTopics = `/r180ng/r180ngProductCtrls?command=get_group_topics&sid=${mockSessionId}&stage_id=${mockStageId}&cohort_type=${
          mockCohortObj.cohortType
        }&cohort_id=${mockCohortObj.id}`;

        mockSmartBarSelections = fromJS({
          selectedCohType: COHORT_TYPE.Teacher,
          activeSchoolId: mockCohortObj.id,
        });
        mockUserOrgType = 'School';
        mockSessionId = 'mockSessionId';
        mockUserId = 'mockUserId';
        mockUserType = 'Teacher';
        mockStudentObj.output.output_data.cohort_type = mockCohortObj.cohortType.toLowerCase();
        mockStudentObj.output.output_data.cohort_id = mockCohortObj.id;
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userTypeSelector));
        expect(generator.next(mockUserType).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(mockCohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(smartBarSelector));
        expect(generator.next(mockSmartBarSelections).value).toEqual(
          call(postUrl, `${mockUrlObj.url}&sid=${mockUrlObj.sid}`, mockStudentObj)
        );
        expect(generator.next().value).toEqual(put(Actions.R180NGTopicsSaveRequestSuccess()));
        expect(generator.next().value).toEqual(call(getUrl, mockUrlDistrictTopics));
        expect(generator.next().value).toEqual(put(Actions.updateR180NGTopicsRequestSuccess()));
      });
      it('cohortType is Class', () => {
        mockStageId = '';
        mockUrlObj = {
          url: '/r180ng/r180ngProductCtrls?command=set_group_topics',
          sid: mockSessionId,
        };
        mockCohortObj = {
          cohortType: COHORT_TYPE.Class,
          id: 'mockDistrictId',
          schoolId: 'mockSchoolId',
        };
        mockUrlDistrictTopics = `/r180ng/r180ngProductCtrls?command=get_group_topics&sid=${mockSessionId}&stage_id=${mockStageId}&cohort_type=${
          mockCohortObj.cohortType
        }&cohort_id=${mockCohortObj.id}`;

        mockSmartBarSelections = fromJS({
          selectedCohType: COHORT_TYPE.Class,
          activeSchoolId: mockCohortObj.id,
        });
        mockUserOrgType = 'School';
        mockSessionId = 'mockSessionId';
        mockUserId = 'mockUserId';
        mockUserType = 'Class';
        mockStudentObj.output.output_data.cohort_type = mockCohortObj.cohortType.toLowerCase();
        mockStudentObj.output.output_data.cohort_id = mockCohortObj.id;
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userTypeSelector));
        expect(generator.next(mockUserType).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(mockCohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(smartBarSelector));
        expect(generator.next(mockSmartBarSelections).value).toEqual(
          call(postUrl, `${mockUrlObj.url}&sid=${mockUrlObj.sid}`, mockStudentObj)
        );
        expect(generator.next().value).toEqual(put(Actions.R180NGTopicsSaveRequestSuccess()));
        expect(generator.next().value).toEqual(call(getUrl, mockUrlDistrictTopics));
        expect(generator.next().value).toEqual(put(Actions.updateR180NGTopicsRequestSuccess()));
      });
      it('cohortType is Group', () => {
        mockStageId = '';
        mockUrlObj = {
          url: '/r180ng/r180ngProductCtrls?command=set_group_topics',
          sid: mockSessionId,
        };
        mockCohortObj = {
          cohortType: COHORT_TYPE.Group,
          id: 'mockGroupId',
          schoolId: 'mockSchoolId',
        };
        mockUrlDistrictTopics = `/r180ng/r180ngProductCtrls?command=get_group_topics&sid=${mockSessionId}&stage_id=${mockStageId}&cohort_type=${
          mockCohortObj.cohortType
        }&cohort_id=${mockCohortObj.id}`;

        mockSmartBarSelections = fromJS({
          selectedCohType: COHORT_TYPE.Group,
          activeSchoolId: mockCohortObj.id,
        });
        mockUserOrgType = 'Tech';
        mockSessionId = 'mockSessionId';
        mockUserId = 'mockUserId';
        mockUserType = 'Group';
        mockStudentObj.output.output_data.cohort_type = mockCohortObj.cohortType.toLowerCase();
        mockStudentObj.output.output_data.cohort_id = mockCohortObj.id;
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userTypeSelector));
        expect(generator.next(mockUserType).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(mockCohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(smartBarSelector));
        expect(generator.next(mockSmartBarSelections).value).toEqual(
          call(postUrl, `${mockUrlObj.url}&sid=${mockUrlObj.sid}`, mockStudentObj)
        );
        expect(generator.next().value).toEqual(put(Actions.R180NGTopicsSaveRequestSuccess()));
        expect(generator.next().value).toEqual(call(getUrl, mockUrlDistrictTopics));
        expect(generator.next().value).toEqual(put(Actions.updateR180NGTopicsRequestSuccess()));
      });
      it('cohortType is Grade', () => {
        mockStageId = '';
        mockUrlObj = {
          url: '/r180ng/r180ngProductCtrls?command=set_group_topics',
          sid: mockSessionId,
        };
        mockCohortObj = {
          cohortType: COHORT_TYPE.Grade,
          id: 'mockGradeId',
          schoolId: 'mockGradeId',
        };

        mockUrlDistrictTopics = `/r180ng/r180ngProductCtrls?command=get_group_topics&sid=${mockSessionId}&stage_id=${mockStageId}&cohort_type=${
          mockCohortObj.cohortType
        }&cohort_id=${mockCohortObj.id}&school_id=${mockCohortObj.schoolId}`;

        mockSmartBarSelections = fromJS({
          selectedCohType: COHORT_TYPE.Grade,
          activeSchoolId: mockCohortObj.id,
        });
        mockUserOrgType = 'Tech';
        mockSessionId = 'mockSessionId';
        mockUserId = 'mockUserId';
        mockUserType = 'Grade';
        mockStudentObj.output.output_data.cohort_type = mockCohortObj.cohortType.toLowerCase();
        mockStudentObj.output.output_data.cohort_id = mockCohortObj.id;
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userTypeSelector));
        expect(generator.next(mockUserType).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(mockCohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(smartBarSelector));
        expect(generator.next(mockSmartBarSelections).value).toEqual(
          call(postUrl, `${mockUrlObj.url}&sid=${mockUrlObj.sid}`, mockStudentObj)
        );
        expect(generator.next().value).toEqual(put(Actions.R180NGTopicsSaveRequestSuccess()));
        expect(generator.next().value).toEqual(call(getUrl, mockUrlDistrictTopics));
        expect(generator.next().value).toEqual(put(Actions.updateR180NGTopicsRequestSuccess()));
      });
      it('cohortType is Student', () => {
        mockStageId = '';
        mockUrlObj = {
          url: '/r180ng/r180ngProductCtrls?command=set_student_topics',
          sid: mockSessionId,
        };
        mockCohortObj = {
          cohortType: COHORT_TYPE.Student,
          id: 'mockStudentId',
          schoolId: 'mockSchoolId',
        };
        const r180ngTopicObj = mockState.r180ngTopicsObj.topic_cd.map(coldata => ({
          topic_cd: {
            enable: coldata.enable && coldata.enable[0],
            completed: '0',
            manual_advance: '0',
            cd_name: coldata.cd_name && coldata.cd_name[0],
            cd_segment: coldata.current_segment && coldata.current_segment[0],
            level: mockState.r180ngTopicsObj.student_level[0],
          },
        }));
        mockStudentObj = {
          output: {
            output_data: {
              topic_cds: [r180ngTopicObj],
            },
          },
        };

        const mockSkipTopicObj = {
          topic_cd: {
            enable: '1',
            completed: '1',
            manual_advance: '1',
            cd_name: mockState.currentTopicID && mockState.currentTopicID,
            cd_segment: '0',
            level: mockState.skipData.skipLevel && mockState.skipData.skipLevel,
          },
        };
        r180ngTopicObj.push(mockSkipTopicObj);
        mockUrlDistrictTopics = `/r180ng/r180ngProductCtrls?command=get_student_topics&sid=mockSessionId&user_id=mockStudentId&stage_id=''`;

        mockSmartBarSelections = fromJS({
          selectedCohType: COHORT_TYPE.Student,
          activeSchoolId: mockCohortObj.id,
        });
        mockUserOrgType = 'Tech';
        mockSessionId = 'mockSessionId';
        mockUserId = 'mockUserId';
        mockUserType = 'Student';
        mockStudentObj.output.output_data.user_id = mockCohortObj.id;
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userTypeSelector));
        expect(generator.next(mockUserType).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(mockCohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(smartBarSelector));
        expect(generator.next(mockSmartBarSelections).value).toEqual(
          call(postUrl, `${mockUrlObj.url}&sid=${mockUrlObj.sid}`, mockStudentObj)
        );
        expect(generator.next().value).toEqual(put(Actions.R180NGTopicsSaveRequestSuccess()));
        expect(generator.next().value).toEqual(call(getUrl, mockUrlDistrictTopics));
        expect(generator.next().value).toEqual(put(Actions.updateR180NGTopicsRequestSuccess()));
      });
      it('cohortType is Student with skip segment', () => {
        mockStageId = '';
        mockState = {
          completionLevel: '',
          currentSegment: 'segment1_name',
          currentSegmentId: '1',
          currentTopic: 'Can You Believe It?',
          currentTopicID: 'A01',
          r180ngTopicsObj: {
            student_level: ['1'],
            topic_cd: [
              {
                enable: ['1'],
                cd_name: ['A01'],
                supplimental: ['0'],
                topic_name: ['Can You Believe It?'],
                globally_enabled: ['1'],
                student_level: ['2'],
                segment1_name: ['segment1_name'],
                segment2_name: ['segment2_name'],
                segment3_name: ['segment3_name'],
                segment4_name: ['segment4_name'],
                topic_complete_levels: [{ topic_complete_level: [] }],
                current_segment: ['1'],
              },
              {
                enable: ['1'],
                cd_name: ['A02'],
                supplimental: ['0'],
                topic_name: ['Predator'],
                globally_enabled: ['1'],
                student_level: ['2'],
                segment1_name: ['segment1_name'],
                segment2_name: ['segment2_name'],
                segment3_name: ['segment3_name'],
                segment4_name: ['segment4_name'],
                current_segment: ['2'],
              },
            ],
          },
          saveOptions: true,
          skipLevel: true,
          skipData: { skipLevel: 1 },
          skipSegment: true,
          skipTopic: true,
          skipTopicObj: {},
          studentLevel: { student_level: ['1'] },
          skipsSegmentData: { skippedSegmentId: '0', skipLevel: 1 },
          studentLevelToggle: true,
          activeStage: 'r180ng_a',
        };
        mockUrlObj = {
          url: '/r180ng/r180ngProductCtrls?command=set_student_topics',
          sid: mockSessionId,
        };
        mockCohortObj = {
          cohortType: COHORT_TYPE.Student,
          id: 'mockStudentId',
          schoolId: 'mockSchoolId',
        };
        const r180ngTopicObj = mockState.r180ngTopicsObj.topic_cd.map(coldata => ({
          topic_cd: {
            enable: coldata.enable && coldata.enable[0],
            completed: '0',
            manual_advance: '0',
            cd_name: coldata.cd_name && coldata.cd_name[0],
            cd_segment: coldata.current_segment && coldata.current_segment[0],
            level: mockState.r180ngTopicsObj.student_level[0],
          },
        }));
        mockStudentObj = {
          output: {
            output_data: {
              topic_cds: [r180ngTopicObj],
            },
          },
        };

        const mockSkipTopicObj = {
          topic_cd: {
            enable: '1',
            completed: '1',
            manual_advance: '1',
            cd_name: mockState.currentTopicID && mockState.currentTopicID,
            cd_segment: mockState.skipsSegmentData.skippedSegmentId,
            level: mockState.skipsSegmentData.skipLevel && mockState.skipsSegmentData.skipLevel,
          },
        };
        r180ngTopicObj.push(mockSkipTopicObj);
        mockUrlDistrictTopics = `/r180ng/r180ngProductCtrls?command=get_student_topics&sid=mockSessionId&user_id=mockStudentId&stage_id=''`;

        mockSmartBarSelections = fromJS({
          selectedCohType: COHORT_TYPE.Student,
          activeSchoolId: mockCohortObj.id,
        });
        mockUserOrgType = 'Tech';
        mockSessionId = 'mockSessionId';
        mockUserId = 'mockUserId';
        mockUserType = 'Student';
        mockStudentObj.output.output_data.user_id = mockCohortObj.id;
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userTypeSelector));
        expect(generator.next(mockUserType).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(mockCohortObjSelector));
        expect(generator.next(mockCohortObj).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(smartBarSelector));
        expect(generator.next(mockSmartBarSelections).value).toEqual(
          call(postUrl, `${mockUrlObj.url}&sid=${mockUrlObj.sid}`, mockStudentObj)
        );
        expect(generator.next().value).toEqual(put(Actions.R180NGTopicsSaveRequestSuccess()));
        expect(generator.next().value).toEqual(call(getUrl, mockUrlDistrictTopics));
        expect(generator.next().value).toEqual(put(Actions.updateR180NGTopicsRequestSuccess()));
      });
      it('calls fail', () => {
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.throw(err).value).toEqual(
          put(Actions.R180NGTopicsSaveRequestFailure(err))
        );
      });
    });
  });
  describe('r180NGTopicsInstalledStagesFlow', () => {
    beforeEach(() => {
      generator = Saga.r180ngTopicInstalledStagesFlow();
    });

    describe('userType is Administrator, selectedCohType is School', () => {
      it('calls pass', () => {
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(
          call(Request.geInstalledStagesR180NG, mockSessionId)
        );
        expect(generator.next(mockTopics).value).toEqual(
          put(Actions.R180NGTopicsInstalledStagesRequestSuccess(mockTopics))
        );
      });
      it('calls fail', () => {
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.throw(err).value).toEqual(
          put(Actions.R180NGTopicsInstalledStagesRequestFailure(err))
        );
      });
    });
  });

  describe('defaultSaga', () => {
    beforeEach(() => {
      generator = defaultSaga();
    });

    it('All calls are made', () => {
      expect(generator.next().value).toEqual(
        all([
          takeLatest(
            [
              Constants.R180NG_TOPICS_REQUEST,
              SmartBarConstants.CLASS_SELECTION_SUCCESS,
              SmartBarConstants.GRADE_SELECTION_SUCCESS,
              SmartBarConstants.GROUP_SELECTION_SUCCESS,
              SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
              SmartBarConstants.STUDENT_SELECTION_SUCCESS,
              SmartBarConstants.TEACHER_SELECTION_SUCCESS,
            ],
            Saga.r180NGTopicsRequestFlow
          ),
          takeLatest(
            Constants.R180NG_TOPICS_INSTALLED_STAGES_REQUEST,
            Saga.r180ngTopicInstalledStagesFlow
          ),
          takeLatest(Constants.R180NG_TOPICS_SAVE_REQUEST, Saga.r180ngTopicsSaveRequestFlow),
        ])
      );
    });
  });
});
