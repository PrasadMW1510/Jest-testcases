import { COHORT_TYPE, USER_ORG } from 'containers/App/constants';

import { createEnrollmentURLObj } from '../programSettingsUtils';

describe('programSettingsUtils', () => {
  describe('createEnrollmentURLObj', () => {
    let mockCohortObj = null;
    const mockSessionId = 'mockSessionId';
    const mockUserOrgId = 'mockUserOrgId';

    it('cohortType is District', () => {
      mockCohortObj = {
        cohortType: COHORT_TYPE.District,
        id: 'mockDistrictId',
      };

      expect(createEnrollmentURLObj(mockCohortObj, mockSessionId)).toMatchSnapshot();
    });

    it('cohortType is School', () => {
      mockCohortObj = {
        cohortType: COHORT_TYPE.School,
        id: 'mockSchoolId',
      };

      expect(createEnrollmentURLObj(mockCohortObj, mockSessionId)).toMatchSnapshot();
    });

    describe('cohortType is Grade', () => {
      beforeEach(() => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Grade,
          id: 'mockGradeId',
          schoolId: 'mockSchoolId',
        };
      });

      it('userOrgType is District', () => {
        expect(
          createEnrollmentURLObj(mockCohortObj, mockSessionId, USER_ORG.District, mockUserOrgId)
        ).toMatchSnapshot();
      });

      it('userOrgType is School', () => {
        expect(
          createEnrollmentURLObj(mockCohortObj, mockSessionId, USER_ORG.School, mockUserOrgId)
        ).toMatchSnapshot();
      });
    });

    it('cohortType is Teacher', () => {
      mockCohortObj = {
        cohortType: COHORT_TYPE.Teacher,
        id: 'mockTeacherId',
      };

      expect(createEnrollmentURLObj(mockCohortObj, mockSessionId)).toMatchSnapshot();
    });

    it('cohortType is Class', () => {
      mockCohortObj = {
        cohortType: COHORT_TYPE.Class,
        id: 'mockClassId',
      };

      expect(createEnrollmentURLObj(mockCohortObj, mockSessionId)).toMatchSnapshot();
    });

    it('cohortType is Group', () => {
      mockCohortObj = {
        cohortType: COHORT_TYPE.Group,
        id: 'mockGroupId',
      };

      expect(createEnrollmentURLObj(mockCohortObj, mockSessionId)).toMatchSnapshot();
    });

    it('cohortType is Student', () => {
      mockCohortObj = {
        cohortType: COHORT_TYPE.Student,
        id: 'mockStudentId',
      };

      expect(createEnrollmentURLObj(mockCohortObj, mockSessionId)).toMatchSnapshot();
    });
  });
});
