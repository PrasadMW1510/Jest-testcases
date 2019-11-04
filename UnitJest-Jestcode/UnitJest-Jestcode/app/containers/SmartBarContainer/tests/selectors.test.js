import { fromJS } from 'immutable';

import { COHORT_TYPE } from 'containers/App/constants';

import makeSelectSmartBarContainer, * as Selectors from '../selectors';

describe('SmartBar selectors', () => {
  let mockedState = null;

  beforeEach(() => {
    mockedState = fromJS({
      smartBar: {
        selectedSchoolId: 'selectedSchoolId',
        selectedClassId: 'selectedClassId',
        selectedGroupId: 'selectedGroupId',
        selectedStudentId: 'selectedStudentId',
        selectedGradeId: 'selectedGradeId',
        selectedTeacherId: 'selectedTeacherId',
        makeSelectCohortType: 'makeSelectCohortType',
        clickedSchoolId: 'clickedSchoolId',
        clickedClassId: 'clickedClassId',
        clickedGroupId: 'clickedGroupId',
        clickedStudentId: 'clickedStudentId',
        clickedGradeId: 'clickedGradeId',
        clickedTeacherId: 'clickedTeacherId',
        activeSchoolId: 'activeSchoolId',
        activeGradeId: 'activeGradeId',
        activeTeacherId: 'activeTeacherId',
        activeClassId: 'activeClassId',
        activeGroupId: 'activeGroupId',
        activeStudentId: 'activeStudentId',
      },
      global: {
        userData: {
          classes: {
            selectedClassId: { id: 'selectedClassId', display_name: ['Selected Class'] },
          },
          groups: {
            selectedGroupId: { id: 'selectedGroupId', display_name: ['Selected Group'] },
          },
          teachers: {
            selectedTeacherId: {
              id: 'selectedTeacherId',
              first_name: ['Teacher First Name'],
              last_name: ['Teacher Last Name'],
            },
          },
          grades: {
            selectedGradeId: { id: 'selectedGradeId', full_name: ['Grade Full Name'] },
          },
          students: {
            selectedStudentId: {
              id: 'selectedStudentId',
              first_name: ['Student First Name'],
              last_name: ['Student Last Name'],
            },
          },
          schools: {
            selectedSchoolId: { id: 'selectedSchoolId', name: ['Selected School'] },
          },
          login: {
            user_org: ['School'],
            user_org_id: ['loginSchoolId'],
            user_type: ['Teacher'],
            user_id: ['loginTeacherId'],
          },
        },
        profileData: {
          schools: { activeSchoolId: { name: ['Selected School'] } },
          grades: { activeGradeId: { full_name: ['Grade Full Name'] } },
          teachers: {
            activeTeacherId: {
              first_name: ['Teacher First Name'],
              last_name: ['Teacher Last Name'],
            },
          },
          classes: { activeClassId: { display_name: ['Selected Class'] } },
          groups: { activeGroupId: { display_name: ['Selected Group'] } },
          students: {
            activeStudentId: {
              first_name: ['Student First Name'],
              last_name: ['Student Last Name'],
            },
          },
          failure: null,
        },
      },
    });
  });

  it('should consistently return the smartbar state', () => {
    expect(makeSelectSmartBarContainer()(mockedState)).toMatchSnapshot();
  });

  describe('Actual Selections', () => {
    it('should consistently return the school id', () => {
      expect(Selectors.makeSelectSchoolId()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the grade id', () => {
      expect(Selectors.makeSelectGradeId()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the teacher id', () => {
      expect(Selectors.makeSelectTeacherId()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the group id', () => {
      expect(Selectors.makeSelectGroupId()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the student id', () => {
      expect(Selectors.makeSelectStudentId()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the class id', () => {
      expect(Selectors.makeSelectClassId()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the selected school', () => {
      expect(Selectors.makeSelectSelectedSchoolData()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the selected grade', () => {
      expect(Selectors.makeSelectSelectedGradeData()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the selected teacher', () => {
      expect(Selectors.makeSelectSelectedTeacherData()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the selected group', () => {
      expect(Selectors.makeSelectSelectedGroupData()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the selected student', () => {
      expect(Selectors.makeSelectSelectedStudentData()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the active schoolId', () => {
      expect(Selectors.makeSelectedActiveSchoolId()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the active gradeId', () => {
      expect(Selectors.makeSelectedActiveGradeId()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the active teacherId', () => {
      expect(Selectors.makeSelectedActiveTeacherId()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the active classId', () => {
      expect(Selectors.makeSelectedActiveClassId()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the active groupId', () => {
      expect(Selectors.makeSelectedActiveGroupId()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the active studentId', () => {
      expect(Selectors.makeSelectedActiveStudentId()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the selected class', () => {
      expect(Selectors.makeSelectSelectedClassData()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the selected cohort type', () => {
      expect(Selectors.makeSelectCohortType()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return nothing if there is no selected school', () => {
      mockedState = mockedState.setIn(['global', 'userData'], null);
      expect(Selectors.makeSelectSelectedSchoolData()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return nothing if there is no selected grade', () => {
      mockedState = mockedState.setIn(['global', 'userData'], null);
      expect(Selectors.makeSelectSelectedGradeData()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return nothing if there is no selected teacher', () => {
      mockedState = mockedState.setIn(['global', 'userData'], null);
      expect(Selectors.makeSelectSelectedTeacherData()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return nothing if there is no selected group', () => {
      mockedState = mockedState.setIn(['global', 'userData'], null);
      expect(Selectors.makeSelectSelectedGroupData()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return nothing if there is no selected student', () => {
      mockedState = mockedState.setIn(['global', 'userData'], null);
      expect(Selectors.makeSelectSelectedStudentData()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return nothing if there is no selected class', () => {
      mockedState = mockedState.setIn(['global', 'userData'], null);
      expect(Selectors.makeSelectSelectedClassData()(mockedState)).toMatchSnapshot();
    });
  });

  describe('Clicked Selections', () => {
    it('should consistently return the school id', () => {
      expect(Selectors.makeSelectClickedSchoolId()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the grade id', () => {
      expect(Selectors.makeSelectClickedGradeId()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the teacher id', () => {
      expect(Selectors.makeSelectClickedTeacherId()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the group id', () => {
      expect(Selectors.makeSelectClickedGroupId()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the student id', () => {
      expect(Selectors.makeSelectClickedStudentId()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the class id', () => {
      expect(Selectors.makeSelectClickedClassId()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the selected school', () => {
      expect(Selectors.makeSelectClickedSchoolData()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the selected grade', () => {
      expect(Selectors.makeSelectClickedGradeData()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the selected teacher', () => {
      expect(Selectors.makeSelectClickedTeacherData()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the selected group', () => {
      expect(Selectors.makeSelectClickedGroupData()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the selected student', () => {
      expect(Selectors.makeSelectClickedStudentData()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the selected class', () => {
      expect(Selectors.makeSelectClickedClassData()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return nothing if there is no selected school', () => {
      mockedState = mockedState.setIn(['global', 'userData'], null);
      expect(Selectors.makeSelectClickedSchoolData()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return nothing if there is no selected grade', () => {
      mockedState = mockedState.setIn(['global', 'userData'], null);
      expect(Selectors.makeSelectClickedGradeData()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return nothing if there is no selected teacher', () => {
      mockedState = mockedState.setIn(['global', 'userData'], null);
      expect(Selectors.makeSelectClickedTeacherData()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return nothing if there is no selected group', () => {
      mockedState = mockedState.setIn(['global', 'userData'], null);
      expect(Selectors.makeSelectClickedGroupData()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return nothing if there is no selected student', () => {
      mockedState = mockedState.setIn(['global', 'userData'], null);
      expect(Selectors.makeSelectClickedStudentData()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return nothing if there is no selected class', () => {
      mockedState = mockedState.setIn(['global', 'userData'], null);
      expect(Selectors.makeSelectClickedClassData()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the selectedCohortTypeCohortId for school', () => {
      mockedState = mockedState.setIn(['smartBar', 'selectedCohType'], 'School');
      expect(Selectors.makeSelectCohortTypeCohortId()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the selectedCohortTypeCohortId for grade', () => {
      mockedState = mockedState.setIn(['smartBar', 'selectedCohType'], 'Grade');
      expect(Selectors.makeSelectCohortTypeCohortId()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the selectedCohortTypeCohortId for teacher', () => {
      mockedState = mockedState.setIn(['smartBar', 'selectedCohType'], 'Teacher');
      expect(Selectors.makeSelectCohortTypeCohortId()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the selectedCohortTypeCohortId for class', () => {
      mockedState = mockedState.setIn(['smartBar', 'selectedCohType'], 'Class');
      expect(Selectors.makeSelectCohortTypeCohortId()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the selectedCohortTypeCohortId for group', () => {
      mockedState = mockedState.setIn(['smartBar', 'selectedCohType'], 'Group');
      expect(Selectors.makeSelectCohortTypeCohortId()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the selectedCohortTypeCohortId for student', () => {
      mockedState = mockedState.setIn(['smartBar', 'selectedCohType'], 'Student');
      expect(Selectors.makeSelectCohortTypeCohortId()(mockedState)).toMatchSnapshot();
    });

    it('should consistently return the selectedCohortTypeCohortId when none selected', () => {
      mockedState = mockedState.setIn(['smartBar', 'selectedCohType'], null);
      expect(Selectors.makeSelectCohortTypeCohortId()(mockedState)).toMatchSnapshot();
    });
  });
  describe('cohort selections', () => {
    it('should consistently return the selectedEffectiveCohortObject when none selected and District userOrg', () => {
      mockedState = mockedState.setIn(['smartBar', 'selectedCohType'], null);
      mockedState = mockedState.setIn(['global', 'userData', 'login', 'user_org', 0], 'District');
      mockedState = mockedState.setIn(
        ['global', 'userData', 'login', 'user_org_id', 0],
        'loginDistrictId'
      );
      const result = Selectors.makeSelectEffectiveCohortObject()(mockedState);
      expect(result).toMatchSnapshot();
      expect(result.cohortType).toEqual(COHORT_TYPE.District);
      expect(result.id).toEqual('loginDistrictId');
    });

    it('should consistently return the selectedEffectiveCohortObject when none selected and School userOrg', () => {
      mockedState = mockedState.setIn(['smartBar', 'selectedCohType'], null);
      const result = Selectors.makeSelectEffectiveCohortObject()(mockedState);
      expect(result).toMatchSnapshot();
      expect(result.cohortType).toEqual(COHORT_TYPE.School);
      expect(result.id).toEqual('loginSchoolId');
    });

    it('should consistently return the selectedEffectiveCohortObject when none selected and Teacher is logged in', () => {
      mockedState = mockedState.setIn(['smartBar', 'selectedCohType'], null);
      mockedState = mockedState.setIn(['global', 'userData', 'login', 'user_org'], null);
      mockedState = mockedState.setIn(['global', 'userData', 'login', 'user_org_id'], null);
      const result = Selectors.makeSelectEffectiveCohortObject()(mockedState);
      expect(result).toMatchSnapshot();
      expect(result.cohortType).toEqual(COHORT_TYPE.Teacher);
      expect(result.id).toEqual('loginTeacherId');
    });
    it('should consistently return the selectedEffectiveCohortObject when School selected in SmartBar', () => {
      mockedState = mockedState.setIn(['smartBar', 'selectedCohType'], 'School');
      const result = Selectors.makeSelectEffectiveCohortObject()(mockedState);
      expect(result).toMatchSnapshot();
      expect(result.cohortType).toEqual(COHORT_TYPE.School);
      expect(result.id).toEqual('selectedSchoolId');
    });

    it('should consistently return the selectedEffectiveCohortObject when Grade selected in SmartBar', () => {
      mockedState = mockedState.setIn(['smartBar', 'selectedCohType'], 'Grade');
      const result = Selectors.makeSelectEffectiveCohortObject()(mockedState);
      expect(result).toMatchSnapshot();
      expect(result.cohortType).toEqual(COHORT_TYPE.Grade);
      expect(result.id).toEqual('selectedGradeId');
      expect(result.schoolId).toEqual('selectedSchoolId');
    });

    it('should consistently return selected grade with school when user type is DA/DTA', () => {
      mockedState = mockedState.setIn(['smartBar', 'selectedCohType'], 'Grade');
      mockedState = mockedState.setIn(['smartBar', 'selectedSchoolId'], null);
      const result = Selectors.makeSelectEffectiveCohortObject()(mockedState);
      expect(result.cohortType).toEqual(COHORT_TYPE.Grade);
      expect(result.schoolId).toEqual('activeSchoolId');
      expect(result.id).toEqual('selectedGradeId');
    });

    it('should consistently return the selectedEffectiveCohortObject when teacher selected in SmartBar', () => {
      mockedState = mockedState.setIn(['smartBar', 'selectedCohType'], 'Teacher');
      const result = Selectors.makeSelectEffectiveCohortObject()(mockedState);
      expect(result).toMatchSnapshot();
      expect(result.cohortType).toEqual(COHORT_TYPE.Teacher);
      expect(result.id).toEqual('selectedTeacherId');
    });

    it('should consistently return the selectedEffectiveCohortObject when Class selected in SmartBar', () => {
      mockedState = mockedState.setIn(['smartBar', 'selectedCohType'], 'Class');
      const result = Selectors.makeSelectEffectiveCohortObject()(mockedState);
      expect(result).toMatchSnapshot();
      expect(result.cohortType).toEqual(COHORT_TYPE.Class);
      expect(result.id).toEqual('selectedClassId');
    });

    it('should consistently return the selectedEffectiveCohortObject when Group selected in SmartBar', () => {
      mockedState = mockedState.setIn(['smartBar', 'selectedCohType'], 'Group');
      const result = Selectors.makeSelectEffectiveCohortObject()(mockedState);
      expect(result).toMatchSnapshot();
      expect(result.cohortType).toEqual(COHORT_TYPE.Group);
      expect(result.id).toEqual('selectedGroupId');
    });

    it('should consistently return the selectedEffectiveCohortObject when Student selected in SmartBar', () => {
      mockedState = mockedState.setIn(['smartBar', 'selectedCohType'], 'Student');
      const result = Selectors.makeSelectEffectiveCohortObject()(mockedState);
      expect(result).toMatchSnapshot();
      expect(result.cohortType).toEqual(COHORT_TYPE.Student);
      expect(result.id).toEqual('selectedStudentId');
    });
  });

  describe('makeSelectSelectedCohortName', () => {
    it('should return correct value for selected school', () => {
      mockedState = mockedState.setIn(['smartBar', 'selectedCohType'], 'School');
      expect(Selectors.makeSelectSelectedCohortName()(mockedState)).toEqual('Selected School');
    });

    it('should return correct value for selected student', () => {
      mockedState = mockedState.setIn(['smartBar', 'selectedCohType'], 'Student');
      expect(Selectors.makeSelectSelectedCohortName()(mockedState)).toEqual(
        'Student Last Name, Student First Name'
      );
    });

    it('should return correct value for selected grade', () => {
      mockedState = mockedState.setIn(['smartBar', 'selectedCohType'], 'Grade');
      expect(Selectors.makeSelectSelectedCohortName()(mockedState)).toEqual('Grade Full Name');
    });

    it('should return correct value for selected teacher', () => {
      mockedState = mockedState.setIn(['smartBar', 'selectedCohType'], 'Teacher');
      expect(Selectors.makeSelectSelectedCohortName()(mockedState)).toEqual(
        'Teacher Last Name, Teacher First Name'
      );
    });

    it('should return correct value for selected class', () => {
      mockedState = mockedState.setIn(['smartBar', 'selectedCohType'], 'Class');
      expect(Selectors.makeSelectSelectedCohortName()(mockedState)).toEqual('Selected Class');
    });

    it('should return correct value for selected group', () => {
      mockedState = mockedState.setIn(['smartBar', 'selectedCohType'], 'Group');
      expect(Selectors.makeSelectSelectedCohortName()(mockedState)).toEqual('Selected Group');
    });

    it('should return correct value for no data available', () => {
      mockedState = mockedState.setIn(['smartBar', 'selectedCohType'], 'Teacher');
      mockedState = mockedState.setIn(['global', 'profileData', 'teachers'], null);
      expect(Selectors.makeSelectSelectedCohortName()(mockedState)).toEqual('');
    });
  });

  describe('makeSelectActiveSchoolId', () => {
    it('should consistently return school ID for SA users', () => {
      mockedState = mockedState.setIn(['smartBar', 'selectedSchoolId'], null);
      mockedState = mockedState.setIn(
        ['global', 'userData', 'profile', 'organizations', 0, 'organization', 0, 'type', 0],
        'School'
      );
      mockedState = mockedState.setIn(
        ['global', 'userData', 'profile', 'organizations', 0, 'organization', 0, 'org_id', 0],
        'schoolId'
      );
      const schoolId = Selectors.makeSelectActiveSchoolId()(mockedState);
      expect(schoolId).toEqual('schoolId');
    });
  });
});
