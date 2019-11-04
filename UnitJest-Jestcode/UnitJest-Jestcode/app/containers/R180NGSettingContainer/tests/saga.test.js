/* eslint-disable redux-saga/yield-effects */
/**
 * Test  sagas R180NG Setting
 */
/* eslint-disable redux-saga/yield-effects */
import { fromJS } from 'immutable';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { COHORT_TYPE, USER_TYPE, USER_ORG } from 'containers/App/constants';
import * as Selectors from 'containers/App/selectors';
import * as SmartBarSelectors from 'containers/SmartBarContainer/selectors';
import * as Actions from '../actions';
import * as Constants from '../constants';
import * as Request from '../request';
import defaultSaga, * as Saga from '../saga';
import * as SmartBarConstants from '../../SmartBarContainer/constants';

describe('R180NgsettingContainer Saga', () => {
  let generator = null;

  let sessionIdSelector = null;
  let smartBarSelector = null;
  let userIdSelector = null;
  let userTypeSelector = null;
  let userOrgTypeSelector = null;
  let userOrgIdSelector = null;
  let mockClassId = null;
  let mockEnrollmentCount = null;
  let mockGradeId = null;
  let mockGroupId = null;
  let mockProgramSettings = null;
  let mockSelectedId = null;
  let mockSessionId = null;
  let mockSchoolId = null;
  let mockSmartBarSelection = null;
  let mockStudentId = null;
  let mockTeacherId = null;
  let mockUserId = null;
  let mockUserType = null;
  let mockUserOrgType = null;
  let mockUserOrgId = null;

  let err = null;

  beforeEach(() => {
    sessionIdSelector = jest.fn();
    smartBarSelector = jest.fn();
    userTypeSelector = jest.fn();
    userIdSelector = jest.fn();
    userOrgTypeSelector = jest.fn();
    userOrgIdSelector = jest.fn();
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(sessionIdSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserId').mockReturnValue(userIdSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserType').mockReturnValue(userTypeSelector);
    jest.spyOn(Selectors, 'makeSelectLoginUserOrg').mockReturnValue(userOrgTypeSelector);
    jest.spyOn(Selectors, 'makeSelectProfileUserOrgId').mockReturnValue(userOrgIdSelector);
    jest.spyOn(SmartBarSelectors, 'makeSelectSmartBarContainer').mockReturnValue(smartBarSelector);

    mockSessionId = 'mockSessionId';
    mockUserId = 'mockUserId';
    mockSchoolId = 'mockSchoolId';
    err = 'mock error';
  });

  afterEach(() => {
    expect(generator.next().done).toBeTruthy();
  });

  describe('r180ngprogramSettingsEnrollmentRequestFlow', () => {
    beforeEach(() => {
      generator = Saga.r180NGProgramSettingsEnrollmentRequestFlow();
    });

    describe('userType is Administrator, selectedCohType is School', () => {
      beforeEach(() => {
        mockSmartBarSelection = fromJS({
          selectedCohType: COHORT_TYPE.School,
        });
        mockUserType = USER_TYPE.Administrator;
      });

      it('calls pass', () => {
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserOrgId).value).toEqual(select(smartBarSelector));
        expect(generator.next(mockSmartBarSelection).value).toEqual(select(userIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(userTypeSelector));
        expect(generator.next(mockUserType).value).toEqual(
          call(Request.getEnrollmentCountDistrict, mockSessionId, mockUserOrgId)
        );
        expect(generator.next(mockEnrollmentCount).value).toEqual(
          put(Actions.R180NGProgramSettingsEnrollmentRequestSuccess(mockEnrollmentCount))
        );
      });
    });

    describe('userType is Tech, selectedCohType is School', () => {
      beforeEach(() => {
        mockSmartBarSelection = fromJS({
          selectedCohType: COHORT_TYPE.School,
        });
        mockUserType = USER_TYPE.Tech;
      });

      it('calls pass', () => {
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserOrgId).value).toEqual(select(smartBarSelector));
        expect(generator.next(mockSmartBarSelection).value).toEqual(select(userIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(userTypeSelector));
        expect(generator.next(mockUserType).value).toEqual(
          call(Request.getEnrollmentCountDistrict, mockSessionId, mockUserOrgId)
        );
        expect(generator.next(mockEnrollmentCount).value).toEqual(
          put(Actions.R180NGProgramSettingsEnrollmentRequestSuccess(mockEnrollmentCount))
        );
      });
    });

    describe('userType is Student, cohortType is School', () => {
      beforeEach(() => {
        mockSmartBarSelection = fromJS({
          selectedCohType: COHORT_TYPE.School,
        });
        mockUserType = USER_TYPE.Student;
      });

      it('calls pass', () => {
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserOrgId).value).toEqual(select(smartBarSelector));
        expect(generator.next(mockSmartBarSelection).value).toEqual(select(userIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(userTypeSelector));
        expect(generator.next(mockUserType).value).toEqual(
          call(Request.getEnrollmentCountDistrict, mockSessionId, mockUserOrgId)
        );
        expect(generator.next(mockEnrollmentCount).value).toEqual(
          put(Actions.R180NGProgramSettingsEnrollmentRequestSuccess(mockEnrollmentCount))
        );
      });
    });

    describe('userType is Teacher', () => {
      beforeEach(() => {
        mockEnrollmentCount = 123;
        mockSmartBarSelection = fromJS({
          selectedCohType: COHORT_TYPE.Grade,
        });
        mockUserType = USER_TYPE.Teacher;
      });

      it('calls pass', () => {
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserOrgId).value).toEqual(select(smartBarSelector));
        expect(generator.next(mockSmartBarSelection).value).toEqual(select(userIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(userTypeSelector));

        expect(generator.next(mockUserType).value).toEqual(
          call(Request.getEnrollmentCountTeacher, mockSessionId, mockUserId)
        );

        expect(generator.next(mockEnrollmentCount).value).toEqual(
          put(Actions.R180NGProgramSettingsEnrollmentRequestSuccess(mockEnrollmentCount))
        );
      });
    });

    describe('cohortType is Teacher, smartBarSelection is selectedTeacherId', () => {
      beforeEach(() => {
        mockSelectedId = 'mockSelectedTeacherId';
        mockEnrollmentCount = 123;
        mockSmartBarSelection = fromJS({
          selectedCohType: COHORT_TYPE.Teacher,
          selectedTeacherId: mockSelectedId,
        });
        mockUserType = USER_TYPE.Administrator;
      });

      it('calls pass', () => {
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserOrgId).value).toEqual(select(smartBarSelector));
        expect(generator.next(mockSmartBarSelection).value).toEqual(select(userIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(userTypeSelector));

        expect(generator.next(mockUserType).value).toEqual(
          call(Request.getEnrollmentCountTeacher, mockSessionId, mockSelectedId)
        );

        expect(generator.next(mockEnrollmentCount).value).toEqual(
          put(Actions.R180NGProgramSettingsEnrollmentRequestSuccess(mockEnrollmentCount))
        );
      });
    });

    describe('cohortType is Grade, smartBarSelection is selectedGradeId', () => {
      beforeEach(() => {
        mockSelectedId = {
          grade: 'mockSelectedGradeId',
          school: 'mockSelectedSchoolId',
        };
        mockEnrollmentCount = 123;
        mockSmartBarSelection = fromJS({
          selectedCohType: COHORT_TYPE.Grade,
          selectedGradeId: mockSelectedId.grade,
          selectedSchoolId: mockSelectedId.school,
        });
        mockUserType = USER_TYPE.Administrator;
      });

      it('calls pass', () => {
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserOrgId).value).toEqual(select(smartBarSelector));
        expect(generator.next(mockSmartBarSelection).value).toEqual(select(userIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(userTypeSelector));

        expect(generator.next(mockUserType).value).toEqual(
          call(
            Request.getEnrollmentCountGrade,
            mockSessionId,
            mockSelectedId.school,
            mockSelectedId.grade
          )
        );

        // const schoolSelection = SmartBarActions.schoolSelection(mockSelectedId.school);
        //
        // expect(generator.next(mockEnrollmentCount).value).toEqual(
        //   all([
        //     call(Saga.enrollmentCountR180NGGradeRequestFlow, gradeSelection, schoolSelection),
        //     call(
        //       Saga.programSettingsR180NGSettingsGradeRequestFlow,
        //       gradeSelection,
        //       schoolSelection
        //     ),
        //   ])
        // );

        expect(generator.next(mockEnrollmentCount).value).toEqual(
          put(Actions.R180NGProgramSettingsEnrollmentRequestSuccess(mockEnrollmentCount))
        );
      });
    });
    describe('cohortType is Grade, smartBarSelection is selectedGradeId and user is SA', () => {
      beforeEach(() => {
        mockSelectedId = {
          grade: 'mockSelectedGradeId',
          school: 'mockSelectedSchoolId',
        };
        mockUserOrgType = USER_ORG.School;
        mockUserOrgId = 'schoolId';
        mockEnrollmentCount = 123;
        mockSmartBarSelection = fromJS({
          selectedCohType: COHORT_TYPE.Grade,
          selectedGradeId: mockSelectedId.grade,
        });
        mockUserType = USER_TYPE.Administrator;
      });

      it('calls pass', () => {
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserOrgId).value).toEqual(select(smartBarSelector));
        expect(generator.next(mockSmartBarSelection).value).toEqual(select(userIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(userTypeSelector));

        expect(generator.next(mockUserType).value).toEqual(
          call(Request.getEnrollmentCountGrade, mockSessionId, mockUserOrgId, mockSelectedId.grade)
        );

        expect(generator.next(mockEnrollmentCount).value).toEqual(
          put(Actions.R180NGProgramSettingsEnrollmentRequestSuccess(mockEnrollmentCount))
        );
      });
    });
    describe('cohortType is Class, smartBarSelection is selectedClassId', () => {
      beforeEach(() => {
        mockSelectedId = 'mockSelectedClassId';
        mockEnrollmentCount = 123;
        mockSmartBarSelection = fromJS({
          selectedCohType: COHORT_TYPE.Class,
          selectedClassId: mockSelectedId,
        });
        mockUserType = USER_TYPE.Administrator;
      });

      it('calls pass', () => {
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserOrgId).value).toEqual(select(smartBarSelector));
        expect(generator.next(mockSmartBarSelection).value).toEqual(select(userIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(userTypeSelector));

        expect(generator.next(mockUserType).value).toEqual(
          call(Request.getEnrollmentCountClass, mockSessionId, mockSelectedId)
        );

        expect(generator.next(mockEnrollmentCount).value).toEqual(
          put(Actions.R180NGProgramSettingsEnrollmentRequestSuccess(mockEnrollmentCount))
        );
      });
    });
    describe('cohortType is student , smartBarSelection is selectedClassId userType Teacher', () => {
      beforeEach(() => {
        mockSelectedId = 'mockSelectedStudentId';
        mockEnrollmentCount = 123;
        mockSmartBarSelection = fromJS({
          selectedCohType: COHORT_TYPE.Student,
          selectedStudentId: mockSelectedId,
        });
        mockUserType = USER_TYPE.Teacher;
      });

      it('calls pass', () => {
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserOrgId).value).toEqual(select(smartBarSelector));
        expect(generator.next(mockSmartBarSelection).value).toEqual(select(userIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(userTypeSelector));

        expect(generator.next(mockUserType).value).toEqual(
          call(Request.getEnrollmentCountStudent, mockSessionId, mockSelectedId)
        );

        expect(generator.next(mockEnrollmentCount).value).toEqual(
          put(Actions.R180NGProgramSettingsEnrollmentRequestSuccess(mockEnrollmentCount))
        );
      });
    });
    describe('cohortType is Group, smartBarSelection is selectedClassId userType is Teacher', () => {
      beforeEach(() => {
        mockUserOrgType = USER_ORG.District;
        mockUserOrgId = 'schoolId';
        mockSelectedId = 'mockSelectedGroupId';
        mockEnrollmentCount = 123;
        mockSmartBarSelection = fromJS({
          selectedCohType: COHORT_TYPE.Group,
          selectedGroupId: mockSelectedId,
        });
        mockUserType = USER_TYPE.Teacher;
      });

      it('calls pass', () => {
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserOrgId).value).toEqual(select(smartBarSelector));
        expect(generator.next(mockSmartBarSelection).value).toEqual(select(userIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(userTypeSelector));
        expect(generator.next(mockUserType).value).toEqual(
          call(Request.getEnrollmentCountGroup, mockSessionId, mockSelectedId)
        );

        expect(generator.next(mockEnrollmentCount).value).toEqual(
          put(Actions.R180NGProgramSettingsEnrollmentRequestSuccess(mockEnrollmentCount))
        );
      });
    });
    describe('cohortType is Class, smartBarSelection is selectedClassId userType Teacher', () => {
      beforeEach(() => {
        mockSelectedId = 'mockSelectedClassId';
        mockEnrollmentCount = 123;
        mockSmartBarSelection = fromJS({
          selectedCohType: COHORT_TYPE.Class,
          selectedClassId: mockSelectedId,
        });
        mockUserType = USER_TYPE.Teacher;
      });

      it('calls pass', () => {
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserOrgId).value).toEqual(select(smartBarSelector));
        expect(generator.next(mockSmartBarSelection).value).toEqual(select(userIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(userTypeSelector));

        expect(generator.next(mockUserType).value).toEqual(
          call(Request.getEnrollmentCountClass, mockSessionId, mockSelectedId)
        );
        expect(generator.next(mockEnrollmentCount).value).toEqual(
          put(Actions.R180NGProgramSettingsEnrollmentRequestSuccess(mockEnrollmentCount))
        );
      });
    });

    describe('cohortType is Group, smartBarSelection is selectedGroupId', () => {
      beforeEach(() => {
        mockSelectedId = 'mockSelectedGroupId';
        mockEnrollmentCount = 123;
        mockSmartBarSelection = fromJS({
          selectedCohType: COHORT_TYPE.Group,
          selectedGroupId: mockSelectedId,
        });
        mockUserType = USER_TYPE.Administrator;
      });

      it('calls pass', () => {
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserOrgId).value).toEqual(select(smartBarSelector));
        expect(generator.next(mockSmartBarSelection).value).toEqual(select(userIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(userTypeSelector));

        expect(generator.next(mockUserType).value).toEqual(
          call(Request.getEnrollmentCountGroup, mockSessionId, mockSelectedId)
        );

        expect(generator.next(mockEnrollmentCount).value).toEqual(
          put(Actions.R180NGProgramSettingsEnrollmentRequestSuccess(mockEnrollmentCount))
        );
      });
    });

    describe('cohortType is Student, smartBarSelection is selectedStudentId', () => {
      beforeEach(() => {
        mockSelectedId = 'mockSelectedStudentId';
        mockEnrollmentCount = [];
        mockSmartBarSelection = fromJS({
          selectedCohType: COHORT_TYPE.Student,
          selectedStudentId: mockSelectedId,
        });
        mockUserType = USER_TYPE.Administrator;
      });

      it('calls pass', () => {
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserOrgId).value).toEqual(select(smartBarSelector));
        expect(generator.next(mockSmartBarSelection).value).toEqual(select(userIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(userTypeSelector));

        expect(generator.next(mockUserType).value).toEqual(
          call(Request.getEnrollmentCountStudent, mockSessionId, mockSelectedId)
        );

        expect(generator.next().value).toEqual(
          put(Actions.R180NGProgramSettingsEnrollmentRequestSuccess(mockEnrollmentCount))
        );
      });
    });

    describe('cohortType is not valid', () => {
      beforeEach(() => {
        mockUserOrgType = USER_ORG.District;
        mockUserOrgId = 'mockUserOrgId';
        mockSmartBarSelection = fromJS({
          selectedCohType: 'invalidCohType',
        });
        mockEnrollmentCount = 'admin';
        mockUserType = USER_TYPE.Administrator;
      });

      it('calls pass', () => {
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserOrgId).value).toEqual(select(smartBarSelector));
        expect(generator.next(mockSmartBarSelection).value).toEqual(select(userIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(userTypeSelector));
        expect(generator.next(mockUserType).value).toEqual(
          call(Request.getEnrollmentCountDistrict, mockSessionId, mockUserOrgId)
        );
        expect(generator.next(mockEnrollmentCount).value).toEqual(
          put(Actions.R180NGProgramSettingsEnrollmentRequestSuccess(mockEnrollmentCount))
        );
      });
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.R180NGProgramSettingsEnrollmentRequestFailure(err))
      );
    });
  });

  describe('programSettingsR180NGSettingsTeacherRequestFlow', () => {
    beforeEach(() => {
      mockProgramSettings = 'mockProgramSettings';
      mockSmartBarSelection = fromJS({
        selectedCohType: COHORT_TYPE.Teacher,
      });
      mockTeacherId = 'mockTeacherId';

      generator = Saga.programSettingsR180NGSettingsTeacherRequestFlow({
        teacherId: mockTeacherId,
      });
    });

    it('calls pass', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(mockSessionId).value).toEqual(select(smartBarSelector));

      expect(generator.next(mockSmartBarSelection).value).toEqual(
        call(Request.getGroupSettingsR180NG, mockSessionId, mockTeacherId, COHORT_TYPE.Teacher)
      );

      expect(generator.next(mockProgramSettings).value).toEqual(
        put(Actions.R180NGProgramSettingsRequestSuccess(mockProgramSettings))
      );
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.R180NGProgramSettingsRequestFailure(err))
      );
    });
  });

  describe('programSettingsR180NGSettingsClassRequestFlow', () => {
    beforeEach(() => {
      mockClassId = 'mockClassId';
      mockProgramSettings = 'mockProgramSettings';
      mockSmartBarSelection = fromJS({
        selectedCohType: COHORT_TYPE.Class,
      });

      generator = Saga.programSettingsR180NGSettingsClassRequestFlow({
        classId: mockClassId,
      });
    });

    it('calls pass', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(mockSessionId).value).toEqual(select(smartBarSelector));

      expect(generator.next(mockSmartBarSelection).value).toEqual(
        call(Request.getGroupSettingsR180NG, mockSessionId, mockClassId, COHORT_TYPE.Class)
      );

      expect(generator.next(mockProgramSettings).value).toEqual(
        put(Actions.R180NGProgramSettingsRequestSuccess(mockProgramSettings))
      );
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.R180NGProgramSettingsRequestFailure(err))
      );
    });
  });

  describe('programSettingsR180NGSettingsGroupRequestFlow', () => {
    beforeEach(() => {
      mockGroupId = 'mockGroupId';
      mockProgramSettings = 'mockProgramSettings';
      mockSmartBarSelection = fromJS({
        selectedCohType: COHORT_TYPE.Group,
      });

      generator = Saga.programSettingsR180NGSettingsGroupRequestFlow({
        groupId: mockGroupId,
      });
    });

    it('calls pass', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(mockSessionId).value).toEqual(select(smartBarSelector));

      expect(generator.next(mockSmartBarSelection).value).toEqual(
        call(Request.getGroupSettingsR180NG, mockSessionId, mockGroupId, COHORT_TYPE.Group)
      );

      expect(generator.next(mockProgramSettings).value).toEqual(
        put(Actions.R180NGProgramSettingsRequestSuccess(mockProgramSettings))
      );
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.R180NGProgramSettingsRequestFailure(err))
      );
    });
  });

  describe('programSettingsR180NGSettingsGradeRequestFlow', () => {
    beforeEach(() => {
      mockGradeId = 'mockGradeId';
      mockProgramSettings = 'mockProgramSettings';
      mockSelectedId = 'mockSelectedSchoolId';
      mockSmartBarSelection = fromJS({
        selectedCohType: COHORT_TYPE.Grade,
        // selectedSchoolId: mockSelectedId,
      });

      generator = Saga.programSettingsR180NGSettingsGradeRequestFlow(
        {
          gradeId: mockGradeId,
        },
        mockSelectedId
      );
    });

    it('calls pass', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(mockSessionId).value).toEqual(select(smartBarSelector));
      expect(generator.next(mockSmartBarSelection).value).toEqual(
        call(
          Request.getGradeSettingsR180NG,
          mockSessionId,
          mockGradeId,
          COHORT_TYPE.Grade,
          mockSelectedId
        )
      );

      expect(generator.next(mockProgramSettings).value).toEqual(
        put(Actions.R180NGProgramSettingsRequestSuccess(mockProgramSettings))
      );
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.R180NGProgramSettingsRequestFailure(err))
      );
    });
  });

  describe('programSettingsR180NGSettingsStudentRequestFlow', () => {
    beforeEach(() => {
      mockStudentId = 'mockStudentId';
      mockProgramSettings = 'mockProgramSettings';
      mockSmartBarSelection = fromJS({
        selectedCohType: COHORT_TYPE.Student,
      });

      generator = Saga.programSettingsR180NGSettingsStudentRequestFlow({
        studentId: mockStudentId,
      });
    });

    it('calls pass', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(mockSessionId).value).toEqual(select(smartBarSelector));

      expect(generator.next(mockSmartBarSelection).value).toEqual(
        call(Request.getGroupSettingsR180NG, mockSessionId, mockStudentId, COHORT_TYPE.Student)
      );

      expect(generator.next(mockProgramSettings).value).toEqual(
        put(Actions.R180NGProgramSettingsRequestSuccess(mockProgramSettings))
      );
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.R180NGProgramSettingsRequestFailure(err))
      );
    });
  });
  describe('enrollmentCountR180NGSchoolRequestFlow', () => {
    beforeEach(() => {
      mockEnrollmentCount = 123;
      mockSchoolId = 'mockSchoolId';
      mockSmartBarSelection = fromJS({
        selectedCohType: COHORT_TYPE.School,
      });
      generator = Saga.enrollmentCountR180NGSchoolRequestFlow({ schoolId: mockSchoolId });
    });

    it('calls pass', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(mockSessionId).value).toEqual(
        call(Request.getEnrollmentCountSchool, mockSessionId, mockSchoolId)
      );

      expect(generator.next(mockEnrollmentCount).value).toEqual(
        put(Actions.R180NGProgramSettingsEnrollmentRequestSuccess(mockEnrollmentCount))
      );
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.R180NGProgramSettingsEnrollmentRequestFailure(err))
      );
    });
  });
  describe('enrollmentCountR180NGTeacherRequestFlow', () => {
    beforeEach(() => {
      mockEnrollmentCount = 123;
      mockTeacherId = 'mockTeacherId';
      mockSmartBarSelection = fromJS({
        selectedCohType: COHORT_TYPE.Teacher,
      });
      generator = Saga.enrollmentCountR180NGTeacherRequestFlow({ teacherId: mockTeacherId });
    });

    it('calls pass', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));

      expect(generator.next(mockSessionId).value).toEqual(select(smartBarSelector));
      expect(generator.next(mockSmartBarSelection).value).toEqual(
        call(Request.getEnrollmentCountTeacher, mockSessionId, mockTeacherId)
      );

      expect(generator.next(mockEnrollmentCount).value).toEqual(
        put(Actions.R180NGProgramSettingsEnrollmentRequestSuccess(mockEnrollmentCount))
      );
      expect(generator.next(mockEnrollmentCount).value).toEqual(
        call(Request.getGroupSettingsR180NG, mockSessionId, mockTeacherId, COHORT_TYPE.Teacher)
      );

      expect(generator.next(mockProgramSettings).value).toEqual(
        put(Actions.R180NGProgramSettingsRequestSuccess(mockProgramSettings))
      );
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.R180NGProgramSettingsEnrollmentRequestFailure(err))
      );
    });
  });

  describe('enrollmentCountR180NGGroupRequestFlow', () => {
    beforeEach(() => {
      mockEnrollmentCount = 123;
      mockGroupId = 'mockGroupId';
      mockSmartBarSelection = fromJS({
        selectedCohType: COHORT_TYPE.Group,
      });
      generator = Saga.enrollmentCountR180NGGroupRequestFlow({ groupId: mockGroupId });
    });

    it('calls pass', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));

      expect(generator.next(mockSessionId).value).toEqual(select(smartBarSelector));
      expect(generator.next(mockSmartBarSelection).value).toEqual(
        call(Request.getEnrollmentCountGroup, mockSessionId, mockGroupId)
      );

      expect(generator.next(mockEnrollmentCount).value).toEqual(
        put(Actions.R180NGProgramSettingsEnrollmentRequestSuccess(mockEnrollmentCount))
      );
      expect(generator.next(mockEnrollmentCount).value).toEqual(
        call(Request.getGroupSettingsR180NG, mockSessionId, mockGroupId, COHORT_TYPE.Group)
      );

      expect(generator.next(mockProgramSettings).value).toEqual(
        put(Actions.R180NGProgramSettingsRequestSuccess(mockProgramSettings))
      );
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.R180NGProgramSettingsEnrollmentRequestFailure(err))
      );
    });
  });

  describe('enrollmentCountR180NGGradeRequestFlow', () => {
    beforeEach(() => {
      mockEnrollmentCount = 123;
      mockGradeId = 'mockGradeId';
      mockSchoolId = 'mockSchoolId';
      mockSmartBarSelection = fromJS({
        selectedCohType: COHORT_TYPE.Grade,
        gradeId: mockGradeId,
        selectedSchoolId: mockSelectedId,
      });

      mockUserOrgType = USER_ORG.District;
      mockUserOrgId = 'mockUserOrgId';
      generator = Saga.enrollmentCountR180NGGradeRequestFlow({
        gradeId: mockGradeId,
      });
    });

    it('calls pass', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));

      expect(generator.next(mockSessionId).value).toEqual(select(smartBarSelector));
      expect(generator.next(mockSmartBarSelection).value).toEqual(select(userOrgTypeSelector));
      expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
      expect(generator.next(mockUserOrgId).value).toEqual(
        call(Request.getEnrollmentCountGrade, mockSessionId, mockSelectedId, mockGradeId)
      );

      expect(generator.next(mockEnrollmentCount).value).toEqual(
        put(Actions.R180NGProgramSettingsEnrollmentRequestSuccess(mockEnrollmentCount))
      );
      expect(generator.next(mockEnrollmentCount).value).toEqual(
        call(
          Request.getGradeSettingsR180NG,
          mockSessionId,
          mockGradeId,
          COHORT_TYPE.Grade,
          mockSelectedId
        )
      );

      expect(generator.next(mockProgramSettings).value).toEqual(
        put(Actions.R180NGProgramSettingsRequestSuccess(mockProgramSettings))
      );
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.R180NGProgramSettingsEnrollmentRequestFailure(err))
      );
    });
  });
  describe('enrollmentCountR180NGGradeRequestFlow', () => {
    beforeEach(() => {
      mockEnrollmentCount = 123;
      mockGradeId = 'mockGroupId';
      mockSchoolId = 'mockSchoolId';
      mockUserOrgId = 'mockUserOrgId';
      mockSmartBarSelection = fromJS({
        selectedCohType: COHORT_TYPE.Grade,
        selectedSchoolId: mockSelectedId,
      });

      mockUserOrgType = USER_ORG.School;
      generator = Saga.enrollmentCountR180NGGradeRequestFlow({
        gradeId: mockGradeId,
      });
    });

    it('calls pass', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));

      expect(generator.next(mockSessionId).value).toEqual(select(smartBarSelector));
      expect(generator.next(mockSmartBarSelection).value).toEqual(select(userOrgTypeSelector));
      expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
      const schoolSelection = mockUserOrgId;
      expect(generator.next(mockUserOrgId).value).toEqual(
        call(Request.getEnrollmentCountGrade, mockSessionId, schoolSelection, mockGradeId)
      );

      expect(generator.next(mockEnrollmentCount).value).toEqual(
        put(Actions.R180NGProgramSettingsEnrollmentRequestSuccess(mockEnrollmentCount))
      );
      expect(generator.next(mockEnrollmentCount).value).toEqual(
        call(
          Request.getGradeSettingsR180NG,
          mockSessionId,
          mockGradeId,
          COHORT_TYPE.Grade,
          schoolSelection
        )
      );

      expect(generator.next(mockProgramSettings).value).toEqual(
        put(Actions.R180NGProgramSettingsRequestSuccess(mockProgramSettings))
      );
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.R180NGProgramSettingsEnrollmentRequestFailure(err))
      );
    });
  });
  describe('enrollmentCountR180NGClassRequestFlow', () => {
    beforeEach(() => {
      mockClassId = 'mockClassId';
      mockEnrollmentCount = 123;
      mockSmartBarSelection = fromJS({
        selectedCohType: COHORT_TYPE.Class,
      });
      generator = Saga.enrollmentCountR180NGClassRequestFlow({ classId: mockClassId });
    });

    it('calls pass', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));

      expect(generator.next(mockSessionId).value).toEqual(select(smartBarSelector));
      expect(generator.next(mockSmartBarSelection).value).toEqual(
        call(Request.getEnrollmentCountClass, mockSessionId, mockClassId)
      );

      expect(generator.next(mockEnrollmentCount).value).toEqual(
        put(Actions.R180NGProgramSettingsEnrollmentRequestSuccess(mockEnrollmentCount))
      );
      expect(generator.next(mockEnrollmentCount).value).toEqual(
        call(Request.getGroupSettingsR180NG, mockSessionId, mockClassId, COHORT_TYPE.Class)
      );

      expect(generator.next(mockProgramSettings).value).toEqual(
        put(Actions.R180NGProgramSettingsRequestSuccess(mockProgramSettings))
      );
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.R180NGProgramSettingsEnrollmentRequestFailure(err))
      );
    });
  });

  describe('enrollmentCountR180NGStudentRequestFlow', () => {
    beforeEach(() => {
      mockEnrollmentCount = 123;
      mockStudentId = 'mockStudentId';
      mockSmartBarSelection = fromJS({
        selectedCohType: COHORT_TYPE.Student,
      });
      generator = Saga.enrollmentCountR180NGStudentRequestFlow({ studentId: mockStudentId });
    });

    it('calls pass', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.next(mockSessionId).value).toEqual(select(smartBarSelector));
      expect(generator.next(mockSmartBarSelection).value).toEqual(
        call(Request.getEnrollmentCountStudent, mockSessionId, mockStudentId)
      );

      expect(generator.next(mockEnrollmentCount).value).toEqual(
        put(Actions.R180NGProgramSettingsEnrollmentRequestSuccess(mockEnrollmentCount))
      );

      expect(generator.next(mockEnrollmentCount).value).toEqual(
        call(Request.getGroupSettingsR180NG, mockSessionId, mockStudentId, COHORT_TYPE.Student)
      );

      expect(generator.next(mockProgramSettings).value).toEqual(
        put(Actions.R180NGProgramSettingsRequestSuccess(mockProgramSettings))
      );
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.R180NGProgramSettingsEnrollmentRequestFailure(err))
      );
    });
  });

  describe('R180NGProgramSettingsRequestFlow', () => {
    beforeEach(() => {
      mockProgramSettings = 'mockProgramSettings';
      generator = Saga.r180NGProgramSettingsRequestFlow();
    });

    describe('userType is Teacher', () => {
      beforeEach(() => {
        mockUserType = USER_TYPE.Teacher;
        mockSelectedId = 'mockSelectedTeacherId';
        mockSmartBarSelection = fromJS({
          selectedCohType: COHORT_TYPE.Teacher,
          selectedTeacherId: mockSelectedId,
        });
      });

      it('calls pass', () => {
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(userTypeSelector));
        expect(generator.next(mockUserType).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserOrgId).value).toEqual(select(smartBarSelector));
        expect(generator.next(mockSmartBarSelection).value).toEqual(
          call(Request.getGroupSettingsR180NG, mockSessionId, mockUserId, mockUserType)
        );

        expect(generator.next(mockProgramSettings).value).toEqual(
          put(Actions.R180NGProgramSettingsRequestSuccess(mockProgramSettings))
        );
      });
    });
    describe('userType is Teacher: selected cohort type class', () => {
      beforeEach(() => {
        mockUserType = USER_TYPE.Teacher;
        mockSelectedId = 'mockSelectedClassId';
        mockSmartBarSelection = fromJS({
          selectedCohType: COHORT_TYPE.Class,
          selectedClassId: mockSelectedId,
        });
      });

      it('calls pass', () => {
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(userTypeSelector));
        expect(generator.next(mockUserType).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserOrgId).value).toEqual(select(smartBarSelector));
        expect(generator.next(mockSmartBarSelection).value).toEqual(
          call(Request.getGroupSettingsR180NG, mockSessionId, mockSelectedId, COHORT_TYPE.Class)
        );

        expect(generator.next(mockProgramSettings).value).toEqual(
          put(Actions.R180NGProgramSettingsRequestSuccess(mockProgramSettings))
        );
      });
    });
    describe('userType is Teacher: selected cohort type is group', () => {
      beforeEach(() => {
        mockUserType = USER_TYPE.Teacher;
        mockSelectedId = 'mockSelectedGroupId';
        mockSmartBarSelection = fromJS({
          selectedCohType: COHORT_TYPE.Group,
          selectedGroupId: mockSelectedId,
        });
      });

      it('calls pass', () => {
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(userTypeSelector));
        expect(generator.next(mockUserType).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserOrgId).value).toEqual(select(smartBarSelector));
        expect(generator.next(mockSmartBarSelection).value).toEqual(
          call(Request.getGroupSettingsR180NG, mockSessionId, mockSelectedId, COHORT_TYPE.Group)
        );

        expect(generator.next(mockProgramSettings).value).toEqual(
          put(Actions.R180NGProgramSettingsRequestSuccess(mockProgramSettings))
        );
      });
    });
    describe('userType is Teacher selected cohtype is Student', () => {
      beforeEach(() => {
        mockUserType = USER_TYPE.Teacher;
        mockSelectedId = 'mockSelectedStudentId';
        mockSmartBarSelection = fromJS({
          selectedCohType: COHORT_TYPE.Student,
          selectedStudentId: mockSelectedId,
        });
      });

      it('calls pass', () => {
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(userTypeSelector));
        expect(generator.next(mockUserType).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserOrgId).value).toEqual(select(smartBarSelector));

        expect(generator.next(mockSmartBarSelection).value).toEqual(
          call(Request.getGroupSettingsR180NG, mockSessionId, mockSelectedId, COHORT_TYPE.Student)
        );

        expect(generator.next(mockProgramSettings).value).toEqual(
          put(Actions.R180NGProgramSettingsRequestSuccess(mockProgramSettings))
        );
      });
    });
    describe('userType is Administrator, selectedCohType is Teacher', () => {
      beforeEach(() => {
        mockSelectedId = 'mockSelectedTeacherId';
        mockSmartBarSelection = fromJS({
          selectedCohType: COHORT_TYPE.Teacher,
          selectedTeacherId: mockSelectedId,
        });
        mockUserType = USER_TYPE.Administrator;
      });

      it('calls pass', () => {
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(userTypeSelector));
        expect(generator.next(mockUserType).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserOrgId).value).toEqual(select(smartBarSelector));

        expect(generator.next(mockSmartBarSelection).value).toEqual(
          call(Request.getGroupSettingsR180NG, mockSessionId, mockSelectedId, COHORT_TYPE.Teacher)
        );

        expect(generator.next(mockProgramSettings).value).toEqual(
          put(Actions.R180NGProgramSettingsRequestSuccess(mockProgramSettings))
        );
      });
    });

    describe('userType is Administrator, selectedCohType is Grade', () => {
      beforeEach(() => {
        mockSelectedId = {
          grade: 'mockSelectedGradeId',
          school: 'selectedSchoolId',
        };

        mockSmartBarSelection = fromJS({
          selectedCohType: COHORT_TYPE.Grade,
          selectedGradeId: mockSelectedId.grade,
          selectedSchoolId: mockSelectedId.school,
        });
        mockUserType = USER_TYPE.Administrator;
        mockUserOrgType = USER_ORG.District;
        mockUserOrgId = 'schoolOrgId';
      });

      it('calls pass', () => {
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(userTypeSelector));
        expect(generator.next(mockUserType).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserOrgId).value).toEqual(select(smartBarSelector));

        expect(generator.next(mockSmartBarSelection).value).toEqual(
          call(
            Request.getGradeSettingsR180NG,
            mockSessionId,
            mockSelectedId.grade,
            COHORT_TYPE.Grade,
            mockSelectedId.school
          )
        );

        expect(generator.next(mockProgramSettings).value).toEqual(
          put(Actions.R180NGProgramSettingsRequestSuccess(mockProgramSettings))
        );
      });
    });
    describe('userType is Administrator, selectedCohType is Grade', () => {
      beforeEach(() => {
        mockSelectedId = {
          grade: 'mockSelectedGradeId',
          school: 'selectedSchoolId',
        };

        mockSmartBarSelection = fromJS({
          selectedCohType: COHORT_TYPE.Grade,
          selectedGradeId: mockSelectedId.grade,
          selectedSchoolId: mockSelectedId.school,
        });
        mockUserType = USER_TYPE.Administrator;
        mockUserOrgType = USER_ORG.School;
        mockUserOrgId = 'schoolOrgId';
      });

      it('calls pass', () => {
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(userTypeSelector));
        expect(generator.next(mockUserType).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserOrgId).value).toEqual(select(smartBarSelector));

        expect(generator.next(mockSmartBarSelection).value).toEqual(
          call(
            Request.getGradeSettingsR180NG,
            mockSessionId,
            mockSelectedId.grade,
            COHORT_TYPE.Grade,
            mockUserOrgId
          )
        );

        expect(generator.next(mockProgramSettings).value).toEqual(
          put(Actions.R180NGProgramSettingsRequestSuccess(mockProgramSettings))
        );
      });
    });

    describe('userType is Administrator, selectedCohType is Class', () => {
      beforeEach(() => {
        mockSelectedId = 'mockSelectedClassId';
        mockSmartBarSelection = fromJS({
          selectedCohType: COHORT_TYPE.Class,
          selectedClassId: mockSelectedId,
        });
        mockUserType = USER_TYPE.Administrator;
      });

      it('calls pass', () => {
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(userTypeSelector));
        expect(generator.next(mockUserType).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserOrgId).value).toEqual(select(smartBarSelector));

        expect(generator.next(mockSmartBarSelection).value).toEqual(
          call(Request.getGroupSettingsR180NG, mockSessionId, mockSelectedId, COHORT_TYPE.Class)
        );

        expect(generator.next(mockProgramSettings).value).toEqual(
          put(Actions.R180NGProgramSettingsRequestSuccess(mockProgramSettings))
        );
      });
    });

    describe('userType is Administrator, selectedCohType is Group', () => {
      beforeEach(() => {
        mockSelectedId = 'mockSelectedGroupId';
        mockSmartBarSelection = fromJS({
          selectedCohType: COHORT_TYPE.Group,
          selectedGroupId: mockSelectedId,
        });
        mockUserType = USER_TYPE.Administrator;
      });

      it('calls pass', () => {
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(userTypeSelector));

        expect(generator.next(mockUserType).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserOrgId).value).toEqual(select(smartBarSelector));

        expect(generator.next(mockSmartBarSelection).value).toEqual(
          call(Request.getGroupSettingsR180NG, mockSessionId, mockSelectedId, COHORT_TYPE.Group)
        );

        expect(generator.next(mockProgramSettings).value).toEqual(
          put(Actions.R180NGProgramSettingsRequestSuccess(mockProgramSettings))
        );
      });
    });

    describe('userType is Administrator, selectedCohType is Student', () => {
      beforeEach(() => {
        mockSelectedId = 'mockSelectedStudentId';
        mockSmartBarSelection = fromJS({
          selectedCohType: COHORT_TYPE.Student,
          selectedStudentId: mockSelectedId,
        });
        mockUserType = USER_TYPE.Administrator;
      });

      it('calls pass', () => {
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(userTypeSelector));
        expect(generator.next(mockUserType).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserOrgId).value).toEqual(select(smartBarSelector));

        expect(generator.next(mockSmartBarSelection).value).toEqual(
          call(Request.getGroupSettingsR180NG, mockSessionId, mockSelectedId, COHORT_TYPE.Student)
        );

        expect(generator.next(mockProgramSettings).value).toEqual(
          put(Actions.R180NGProgramSettingsRequestSuccess(mockProgramSettings))
        );
      });
    });

    describe('userType is Administrator, selectedCohType is null', () => {
      beforeEach(() => {
        mockSmartBarSelection = fromJS({
          selectedCohType: '',
        });
        mockUserType = USER_TYPE.Administrator;
      });

      it('calls pass', () => {
        expect(generator.next().value).toEqual(select(sessionIdSelector));
        expect(generator.next(mockSessionId).value).toEqual(select(userIdSelector));
        expect(generator.next(mockUserId).value).toEqual(select(userTypeSelector));
        expect(generator.next(mockUserType).value).toEqual(select(userOrgTypeSelector));
        expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
        expect(generator.next(mockUserOrgId).value).toEqual(select(smartBarSelector));

        expect(generator.next(mockSmartBarSelection).value).toEqual(
          put(Actions.R180NGProgramSettingsRequestSuccess('admin'))
        );
      });
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(sessionIdSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.R180NGProgramSettingsRequestFailure(err))
      );
    });
  });

  describe('R180NGSaveRequestFlow', () => {
    let mockProgramsSettingChanged = null;
    beforeEach(() => {
      mockProgramsSettingChanged = {
        auto_level: ['mock_auto_level'],
        computer_placement: ['mock_computer_placement'],
        writing_zone_enabled: ['mock_writing_zone_enabled'],
        writing_zone_frequency: ['mock_writing_zone_frequency'],
        ereads_enabled: ['mock_ereads_enabled'],
        match_ereads_level_to_sw_reading_level: ['mock_match_ereads_level_to_sw_reading_level'],
        ereads_level: ['mock_ereads_level'],
        reading_speed: ['mock_reading_speed'],
        captioning: ['mock_captioning'],
        student_level: ['mock_student_level'],
        second_language_id: ['mock_second_language_id'],
        pronunciation_tip: ['mock_pronunciation_tip'],
        alt_color_scheme: ['mock_alt_color_scheme'],
        button_rollover: ['mock_button_rollover'],
      };

      generator = Saga.R180NGSaveRequestFlow({
        programsSettingChanged: mockProgramsSettingChanged,
      });
    });
    describe('userType is random', () => {
      beforeEach(() => {
        mockUserType = 'random';
        mockSelectedId = 'mockSelectedStudentId';
      });
      describe('selecteduserType is random', () => {
        beforeEach(() => {
          mockSmartBarSelection = fromJS({
            selectedCohType: COHORT_TYPE.Student,
            selectedStudentId: mockSelectedId,
          });
        });

        it('calls fail', () => {
          expect(generator.next().value).toEqual(select(userTypeSelector));
          expect(generator.next(mockUserType).value).toEqual(select(sessionIdSelector));
          expect(generator.next(mockSessionId).value).toEqual(select(smartBarSelector));
          expect(generator.next(mockSmartBarSelection).value).toEqual(select(userOrgTypeSelector));
          expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
          expect(generator.next(mockUserOrgId).value).toEqual(
            put(Actions.R180NGSaveRequestFailure(new Error('User Type not supported yet')))
          );
        });
      });
    });

    describe('userType is Administrator', () => {
      let mockGetSettings = null;
      let mockR180NGObj = null;
      beforeEach(() => {
        mockUserType = USER_TYPE.Administrator;
        mockGetSettings = 'mockGetSettings';
        mockUserId = 'mockUserId';
        mockR180NGObj = {
          output: {
            output_data: {
              cohort_type: COHORT_TYPE.Teacher.toUpperCase(),
              cohort_id: mockUserId,
              school_id: mockSchoolId,
              group_settings: {
                auto_level: mockProgramsSettingChanged.auto_level[0],
                computer_placement: mockProgramsSettingChanged.computer_placement[0],
                writing_zone_enabled: mockProgramsSettingChanged.writing_zone_enabled[0],
                writing_zone_frequency: mockProgramsSettingChanged.writing_zone_frequency[0],
                ereads_enabled: mockProgramsSettingChanged.ereads_enabled[0],
                match_ereads_level_to_sw_reading_level:
                  mockProgramsSettingChanged.match_ereads_level_to_sw_reading_level[0],
                ereads_level: mockProgramsSettingChanged.ereads_level[0],
                reading_speed: mockProgramsSettingChanged.reading_speed[0],
                captioning: mockProgramsSettingChanged.captioning[0],
                student_level: mockProgramsSettingChanged.student_level[0],
                second_language_id: mockProgramsSettingChanged.second_language_id[0],
                pronunciation_tip: mockProgramsSettingChanged.pronunciation_tip[0],
                alt_color_scheme: mockProgramsSettingChanged.alt_color_scheme[0],
                button_rollover: mockProgramsSettingChanged.button_rollover[0],
              },
            },
          },
        };
      });

      describe('userType Adiministrator userOrgType District selectedCohType is Student', () => {
        beforeEach(() => {
          mockSelectedId = 'mockSelectedStudentId';
          const mockCohortType = COHORT_TYPE.Grade;
          mockSmartBarSelection = fromJS({
            selectedCohType: COHORT_TYPE.Grade,
            selectedGradeId: mockSelectedId,
            selectedSchoolId: mockSchoolId,
          });
          mockUserOrgType = USER_ORG.District;
          mockUserOrgId = 'mockUserOrgId';
          mockR180NGObj.output.output_data.cohort_id = mockSelectedId;
          mockR180NGObj.output.output_data.cohort_type = mockCohortType.toUpperCase();
          mockR180NGObj.output.output_data.school_id = mockSchoolId;
        });

        it('calls pass', () => {
          expect(generator.next().value).toEqual(select(userTypeSelector));
          expect(generator.next(mockUserType).value).toEqual(select(sessionIdSelector));
          expect(generator.next(mockSessionId).value).toEqual(select(smartBarSelector));
          expect(generator.next(mockSmartBarSelection).value).toEqual(select(userOrgTypeSelector));
          expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
          expect(generator.next(mockUserOrgId).value).toEqual(
            call(Request.postChangeSettingsR180NG, mockSessionId, mockR180NGObj)
          );
          expect(generator.next().value).toEqual(put(Actions.R180NGSaveRequestSuccess()));

          expect(generator.next().value).toEqual(
            call(
              Request.getGradeSettingsR180NG,
              mockSessionId,
              mockSelectedId,
              COHORT_TYPE.Grade,
              'mockSchoolId'
            )
          );
          expect(generator.next(mockGetSettings).value).toEqual(
            put(Actions.updateR180NGSettingRequestSuccess(mockGetSettings))
          );
        });
      });

      describe('userType Adiministrator userOrgType School selectedCohType is Grade', () => {
        beforeEach(() => {
          mockSelectedId = 'mockSelectedGradeId';
          const mockCohortType = COHORT_TYPE.Grade;
          mockSmartBarSelection = fromJS({
            selectedCohType: COHORT_TYPE.Grade,
            selectedGradeId: mockSelectedId,
          });
          const mockUserOrgid = 'mockUserOrgId';
          mockUserOrgType = USER_ORG.School;
          mockUserOrgId = fromJS({
            user_org_id: mockUserOrgid,
          });
          mockR180NGObj.output.output_data.cohort_id = mockSelectedId;
          mockR180NGObj.output.output_data.cohort_type = mockCohortType.toUpperCase();
          mockR180NGObj.output.output_data.school_id = mockUserOrgId;
        });

        it('calls pass', () => {
          expect(generator.next().value).toEqual(select(userTypeSelector));
          expect(generator.next(mockUserType).value).toEqual(select(sessionIdSelector));
          expect(generator.next(mockSessionId).value).toEqual(select(smartBarSelector));
          expect(generator.next(mockSmartBarSelection).value).toEqual(select(userOrgTypeSelector));
          expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
          expect(generator.next(mockUserOrgId).value).toEqual(
            call(Request.postChangeSettingsR180NG, mockSessionId, mockR180NGObj)
          );
          expect(generator.next().value).toEqual(put(Actions.R180NGSaveRequestSuccess()));
          expect(generator.next().value).toEqual(
            call(
              Request.getGradeSettingsR180NG,
              mockSessionId,
              mockSelectedId,
              COHORT_TYPE.Grade,
              mockUserOrgId.user_org_id
            )
          );
          expect(generator.next(mockGetSettings).value).toEqual(
            put(Actions.updateR180NGSettingRequestSuccess(mockGetSettings))
          );
        });
      });
      describe('selectedCohType is Student', () => {
        beforeEach(() => {
          mockSelectedId = 'mockSelectedStudentId';
          mockSmartBarSelection = fromJS({
            selectedCohType: COHORT_TYPE.Student,
            selectedStudentId: mockSelectedId,
          });
          mockUserOrgType = 'randdom';
          mockUserOrgId = 'mockUserOrgId';
          mockR180NGObj = null;
        });

        it('calls pass', () => {
          expect(generator.next().value).toEqual(select(userTypeSelector));
          expect(generator.next(mockUserType).value).toEqual(select(sessionIdSelector));
          expect(generator.next(mockSessionId).value).toEqual(select(smartBarSelector));
          expect(generator.next(mockSmartBarSelection).value).toEqual(select(userOrgTypeSelector));
          expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
          expect(generator.next(mockUserOrgId).value).toEqual(
            call(Request.postChangeSettingsR180NG, mockSessionId, mockR180NGObj)
          );
          expect(generator.next().value).toEqual(put(Actions.R180NGSaveRequestSuccess()));

          expect(generator.next().value).toEqual(
            call(Request.getGroupSettingsR180NG, mockSessionId, mockSelectedId, COHORT_TYPE.Student)
          );
          expect(generator.next(mockGetSettings).value).toEqual(
            put(Actions.updateR180NGSettingRequestSuccess(mockGetSettings))
          );
        });
      });
    });

    describe('userType is Teacher', () => {
      let mockGetSettings = null;
      let mockR180NGObj = null;

      beforeEach(() => {
        mockGetSettings = 'mockGetSettings';
        mockR180NGObj = {
          output: {
            output_data: {
              cohort_type: USER_TYPE.Teacher.toUpperCase(),
              group_settings: {
                auto_level: mockProgramsSettingChanged.auto_level[0],
                computer_placement: mockProgramsSettingChanged.computer_placement[0],
                writing_zone_enabled: mockProgramsSettingChanged.writing_zone_enabled[0],
                writing_zone_frequency: mockProgramsSettingChanged.writing_zone_frequency[0],
                ereads_enabled: mockProgramsSettingChanged.ereads_enabled[0],
                match_ereads_level_to_sw_reading_level:
                  mockProgramsSettingChanged.match_ereads_level_to_sw_reading_level[0],
                ereads_level: mockProgramsSettingChanged.ereads_level[0],
                reading_speed: mockProgramsSettingChanged.reading_speed[0],
                captioning: mockProgramsSettingChanged.captioning[0],
                student_level: mockProgramsSettingChanged.student_level[0],
                second_language_id: mockProgramsSettingChanged.second_language_id[0],
                pronunciation_tip: mockProgramsSettingChanged.pronunciation_tip[0],
                alt_color_scheme: mockProgramsSettingChanged.alt_color_scheme[0],
                button_rollover: mockProgramsSettingChanged.button_rollover[0],
              },
            },
          },
        };

        mockUserType = USER_TYPE.Teacher;
      });

      describe('selectedCohType is Student', () => {
        beforeEach(() => {
          mockSelectedId = 'mockSelectedStudentId';
          mockSmartBarSelection = fromJS({
            selectedCohType: COHORT_TYPE.Student,
            selectedStudentId: mockSelectedId,
          });
          mockR180NGObj.output.output_data.cohort_type = COHORT_TYPE.Student.toUpperCase();
          mockR180NGObj.output.output_data.cohort_id = mockSelectedId;
        });

        it('calls pass', () => {
          expect(generator.next().value).toEqual(select(userTypeSelector));
          expect(generator.next(mockUserType).value).toEqual(select(sessionIdSelector));
          expect(generator.next(mockSessionId).value).toEqual(select(smartBarSelector));

          expect(generator.next(mockSmartBarSelection).value).toEqual(select(userOrgTypeSelector));
          expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
          expect(generator.next(mockUserOrgId).value).toEqual(
            call(Request.postChangeSettingsR180NG, mockSessionId, mockR180NGObj)
          );
          expect(generator.next().value).toEqual(put(Actions.R180NGSaveRequestSuccess()));

          expect(generator.next().value).toEqual(
            call(Request.getGroupSettingsR180NG, mockSessionId, mockSelectedId, COHORT_TYPE.Student)
          );
          expect(generator.next(mockGetSettings).value).toEqual(
            put(Actions.updateR180NGSettingRequestSuccess(mockGetSettings))
          );
        });
      });

      describe('selectedCohType is none', () => {
        beforeEach(() => {
          mockSelectedId = 'mockSelectedId';
          mockSmartBarSelection = fromJS({
            selectedCohType: '',
            selectedTeacherId: '',
          });

          mockR180NGObj.output.output_data.cohort_id = mockSelectedId;
          mockR180NGObj.output.output_data.cohort_type = USER_TYPE.Teacher.toUpperCase();
        });

        it('calls pass', () => {
          expect(generator.next().value).toEqual(select(userTypeSelector));
          expect(generator.next(mockUserType).value).toEqual(select(sessionIdSelector));
          expect(generator.next(mockSessionId).value).toEqual(select(smartBarSelector));
          expect(generator.next(mockSmartBarSelection).value).toEqual(select(userOrgTypeSelector));
          expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
          expect(generator.next(mockUserOrgId).value).toEqual(select(userIdSelector));
          expect(generator.next(mockSelectedId).value).toEqual(
            call(Request.postChangeSettingsR180NG, mockSessionId, mockR180NGObj)
          );
          expect(generator.next().value).toEqual(put(Actions.R180NGSaveRequestSuccess()));

          expect(generator.next().value).toEqual(
            call(Request.getGroupSettingsR180NG, mockSessionId, mockSelectedId, '')
          );
          expect(generator.next(mockGetSettings).value).toEqual(
            put(Actions.updateR180NGSettingRequestSuccess(mockGetSettings))
          );
        });
      });

      describe('selectedCohType is Teacher', () => {
        beforeEach(() => {
          mockSelectedId = 'mockSelectedTeacherId';
          mockSmartBarSelection = fromJS({
            selectedCohType: COHORT_TYPE.Teacher,
            selectedTeacherId: mockSelectedId,
          });

          mockR180NGObj.output.output_data.cohort_id = mockSelectedId;
        });

        it('calls pass', () => {
          expect(generator.next().value).toEqual(select(userTypeSelector));
          expect(generator.next(mockUserType).value).toEqual(select(sessionIdSelector));
          expect(generator.next(mockSessionId).value).toEqual(select(smartBarSelector));

          expect(generator.next(mockSmartBarSelection).value).toEqual(select(userOrgTypeSelector));
          expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
          expect(generator.next(mockUserOrgId).value).toEqual(
            call(Request.postChangeSettingsR180NG, mockSessionId, mockR180NGObj)
          );
          expect(generator.next().value).toEqual(put(Actions.R180NGSaveRequestSuccess()));

          expect(generator.next().value).toEqual(
            call(Request.getGroupSettingsR180NG, mockSessionId, mockSelectedId, COHORT_TYPE.Teacher)
          );
          expect(generator.next(mockGetSettings).value).toEqual(
            put(Actions.updateR180NGSettingRequestSuccess(mockGetSettings))
          );
        });
      });

      describe('selectedCohType is Class', () => {
        beforeEach(() => {
          mockSelectedId = 'mockSelectedClassId';
          mockSmartBarSelection = fromJS({
            selectedCohType: COHORT_TYPE.Class,
            selectedClassId: mockSelectedId,
          });
          mockR180NGObj.output.output_data.cohort_type = COHORT_TYPE.Class.toUpperCase();

          mockR180NGObj.output.output_data.cohort_id = mockSelectedId;
        });

        it('calls pass', () => {
          expect(generator.next().value).toEqual(select(userTypeSelector));
          expect(generator.next(mockUserType).value).toEqual(select(sessionIdSelector));
          expect(generator.next(mockSessionId).value).toEqual(select(smartBarSelector));

          expect(generator.next(mockSmartBarSelection).value).toEqual(select(userOrgTypeSelector));
          expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
          expect(generator.next(mockUserOrgId).value).toEqual(
            call(Request.postChangeSettingsR180NG, mockSessionId, mockR180NGObj)
          );
          expect(generator.next().value).toEqual(put(Actions.R180NGSaveRequestSuccess()));

          expect(generator.next().value).toEqual(
            call(Request.getGroupSettingsR180NG, mockSessionId, mockSelectedId, COHORT_TYPE.Class)
          );
          expect(generator.next(mockGetSettings).value).toEqual(
            put(Actions.updateR180NGSettingRequestSuccess(mockGetSettings))
          );
        });
      });

      describe('selectedCohType is Group', () => {
        beforeEach(() => {
          mockSelectedId = 'mockSelectedGroupId';
          mockSmartBarSelection = fromJS({
            selectedCohType: COHORT_TYPE.Group,
            selectedGroupId: mockSelectedId,
          });
          mockR180NGObj.output.output_data.cohort_type = COHORT_TYPE.Group.toUpperCase();

          mockR180NGObj.output.output_data.cohort_id = mockSelectedId;
        });

        it('calls pass', () => {
          expect(generator.next().value).toEqual(select(userTypeSelector));
          expect(generator.next(mockUserType).value).toEqual(select(sessionIdSelector));
          expect(generator.next(mockSessionId).value).toEqual(select(smartBarSelector));

          expect(generator.next(mockSmartBarSelection).value).toEqual(select(userOrgTypeSelector));
          expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
          expect(generator.next(mockUserOrgId).value).toEqual(
            call(Request.postChangeSettingsR180NG, mockSessionId, mockR180NGObj)
          );
          expect(generator.next().value).toEqual(put(Actions.R180NGSaveRequestSuccess()));

          expect(generator.next().value).toEqual(
            call(Request.getGroupSettingsR180NG, mockSessionId, mockSelectedId, COHORT_TYPE.Group)
          );
          expect(generator.next(mockGetSettings).value).toEqual(
            put(Actions.updateR180NGSettingRequestSuccess(mockGetSettings))
          );
        });
      });

      describe('selectedCohType is Grade', () => {
        beforeEach(() => {
          mockSelectedId = 'mockSelectedSchoolId';
          mockSmartBarSelection = fromJS({
            selectedCohType: COHORT_TYPE.Grade,
            selectedGradeId: mockSelectedId,
          });
          mockR180NGObj.output.output_data.cohort_type = COHORT_TYPE.Grade.toUpperCase();

          mockR180NGObj.output.output_data.cohort_id = mockSelectedId;
        });

        it('calls pass', () => {
          expect(generator.next().value).toEqual(select(userTypeSelector));
          expect(generator.next(mockUserType).value).toEqual(select(sessionIdSelector));
          expect(generator.next(mockSessionId).value).toEqual(select(smartBarSelector));

          expect(generator.next(mockSmartBarSelection).value).toEqual(select(userOrgTypeSelector));
          expect(generator.next(mockUserOrgType).value).toEqual(select(userOrgIdSelector));
          expect(generator.next(mockUserOrgId).value).toEqual(
            call(Request.postChangeSettingsR180NG, mockSessionId, mockR180NGObj)
          );
          expect(generator.next().value).toEqual(put(Actions.R180NGSaveRequestSuccess()));

          expect(generator.next().value).toEqual(
            call(
              Request.getGradeSettingsR180NG,
              mockSessionId,
              mockSelectedId,
              COHORT_TYPE.Grade,
              mockSmartBarSelection.selectedGradeId
            )
          );
          expect(generator.next(mockGetSettings).value).toEqual(
            put(Actions.updateR180NGSettingRequestSuccess(mockGetSettings))
          );
        });
      });
    });

    it('calls fail', () => {
      expect(generator.next().value).toEqual(select(userTypeSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.R180NGSaveRequestFailure(err)));
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
            SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
            Saga.enrollmentCountR180NGSchoolRequestFlow
          ),
          takeLatest(
            SmartBarConstants.GRADE_SELECTION_SUCCESS,
            Saga.enrollmentCountR180NGGradeRequestFlow
          ),
          takeLatest(
            SmartBarConstants.TEACHER_SELECTION_SUCCESS,
            Saga.enrollmentCountR180NGTeacherRequestFlow
          ),
          takeLatest(
            SmartBarConstants.CLASS_SELECTION_SUCCESS,
            Saga.enrollmentCountR180NGClassRequestFlow
          ),
          takeLatest(
            SmartBarConstants.GROUP_SELECTION_SUCCESS,
            Saga.enrollmentCountR180NGGroupRequestFlow
          ),
          takeLatest(
            SmartBarConstants.STUDENT_SELECTION_SUCCESS,
            Saga.enrollmentCountR180NGStudentRequestFlow
          ),
          takeLatest(
            Constants.R180NG_PROGRAM_SETTINGS_REQUEST,
            Saga.r180NGProgramSettingsRequestFlow
          ),
          takeLatest(
            Constants.R180NG_PROGRAM_SETTINGS_ENROLLMENT_REQUEST,
            Saga.r180NGProgramSettingsEnrollmentRequestFlow
          ),
          takeLatest(Constants.R180NG_SAVE_REQUEST, Saga.R180NGSaveRequestFlow),
        ])
      );
    });
  });
});
