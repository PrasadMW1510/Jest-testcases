import { fromJS } from 'immutable';

import { USER_TYPE } from '../constants';
import * as Selectors from '../selectors';

describe('makeSelectLocation', () => {
  it('should select the location', () => {
    const route = fromJS({
      location: { pathname: '/foo' },
    });
    const mockedState = fromJS({
      route,
    });
    expect(Selectors.makeSelectLocation()(mockedState)).toEqual(route.get('location').toJS());
  });

  it('should consistently return the global app state', () => {
    const global = fromJS({
      userData: {},
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectGlobal()(mockedState)).toMatchSnapshot();
  });

  it('should consistently return the error state', () => {
    const global = fromJS({
      error: 'foobar',
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectGlobalError()(mockedState)).toMatchSnapshot();
  });

  it('should consistently return the global app user data state', () => {
    const global = fromJS({
      userData: {},
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectGlobalUserData()(mockedState)).toMatchSnapshot();
  });

  describe('isGlobalLoading', () => {
    it('should return true if mockState is undefined', () => {
      const global = undefined;
      const mockState = fromJS({
        global,
      });

      expect(Selectors.isGlobalLoading()(mockState)).toBeTruthy();
    });

    it('should return true if global state is loading', () => {
      const global = fromJS({
        loading: true,
      });
      const mockState = fromJS({
        global,
      });

      expect(Selectors.isGlobalLoading()(mockState)).toBeTruthy();
    });

    describe('global state is not loading', () => {
      it('loading requests have one loading', () => {
        const global = fromJS({
          loading: false,
          loadingRequests: {
            request1: false,
            request2: true,
            request3: false,
          },
        });
        const mockState = fromJS({
          global,
        });

        expect(Selectors.isGlobalLoading()(mockState)).toBeTruthy();
      });

      it('loading requests have none loading', () => {
        const global = fromJS({
          loading: false,
          loadingRequests: {
            request1: false,
            request2: false,
            request3: false,
          },
        });
        const mockState = fromJS({
          global,
        });

        expect(Selectors.isGlobalLoading()(mockState)).toBeFalsy();
      });
    });
  });

  it('should consistently return the global app login data state', () => {
    const global = fromJS({
      userData: {
        login: {},
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectLoginData()(mockedState)).toMatchSnapshot();
  });

  it('should consistently return the global app profile data state', () => {
    const global = fromJS({
      userData: {
        profile: {},
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectProfileData()(mockedState)).toMatchSnapshot();
  });

  it('should consistently return the global app classes data state', () => {
    const global = fromJS({
      userData: {
        classes: {},
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectClassesData()(mockedState)).toMatchSnapshot();
  });

  it('should consistently return the initial global app classes data state', () => {
    const global = fromJS({
      userData: {
        classes: null,
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectClassesData()(mockedState)).toMatchSnapshot();
  });

  it('should consistently return the global app students data state', () => {
    const global = fromJS({
      userData: {
        students: {},
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectStudentsData()(mockedState)).toMatchSnapshot();
  });

  it('should consistently return the initial global app students data state', () => {
    const global = fromJS({
      userData: {
        students: null,
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectStudentsData()(mockedState)).toMatchSnapshot();
  });

  it('should consistently return the profile user type', () => {
    const global = fromJS({
      userData: {
        login: {
          user_type: [USER_TYPE.Administrator],
        },
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectProfileOrganizationData()(mockedState)).toMatchSnapshot();
    expect(Selectors.makeSelectProfileUserType()(mockedState)).toEqual(USER_TYPE.Administrator);
  });

  it('should consistently return false profile user type for missing data', () => {
    const global = fromJS({
      userData: {
        login: {},
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectProfileUserType()(mockedState)).toBeFalsy();
  });

  it('should consistently return the profile user ID', () => {
    const global = fromJS({
      userData: {
        login: {
          user_id: ['some_user_id'],
        },
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectProfileUserId()(mockedState)).toEqual('some_user_id');
  });

  it('should consistently return the login user organization', () => {
    const global = fromJS({
      userData: {
        login: {
          user_org: ['some_user_org'],
        },
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectLoginUserOrg()(mockedState)).toEqual('some_user_org');
  });

  it('should consistently return the login user organization id', () => {
    const global = fromJS({
      userData: {
        login: {
          user_org_id: ['123'],
        },
      },
    });
    const mockState = fromJS({
      global,
    });
    expect(Selectors.makeSelectProfileUserOrgId()(mockState)).toEqual('123');
  });

  it('should consistently return user org and user type for admin', () => {
    const global = fromJS({
      userData: {
        login: {
          user_org: ['some_user_org'],
          user_type: ['some_user_type'],
        },
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectUserOrgUserType()(mockedState)).toEqual({
      userOrg: 'some_user_org',
      userType: 'some_user_type',
    });
  });

  it('should consistently return user org and user type for teacher', () => {
    const global = fromJS({
      userData: {
        login: {
          user_org: [null],
          user_type: ['some_user_type'],
        },
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectUserOrgUserType()(mockedState)).toEqual({
      userOrg: 'School',
      userType: 'some_user_type',
    });
  });

  it('should consistently return false profile user ID for missing data', () => {
    const global = fromJS({
      userData: {
        login: {},
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectProfileUserId()(mockedState)).toBeFalsy();
  });

  it('should consistently return false profile organization info for missing data', () => {
    const global = fromJS({
      userData: {
        profile: {},
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectProfileOrganizationData()(mockedState)).toBeFalsy();
  });

  it('should consistently return the district ID for non-district-admin', () => {
    const global = fromJS({
      userData: {
        profile: {
          organizations: [
            {
              organization: [
                {
                  org_id: ['some_org_id'],
                  parent_org_id: ['some_parent_org_id'],
                  type: ['school'],
                },
              ],
            },
          ],
        },
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectProfileDistrictId()(mockedState)).toEqual('some_parent_org_id');
  });

  it('should consistently return the district ID for district-admin', () => {
    const global = fromJS({
      userData: {
        profile: {
          organizations: [
            {
              organization: [
                {
                  org_id: ['some_org_id'],
                  parent_org_id: ['some_parent_org_id'],
                  type: ['district'],
                },
              ],
            },
          ],
        },
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectProfileDistrictId()(mockedState)).toEqual('some_org_id');
  });

  it('should consistently return false district ID for missing data', () => {
    const global = fromJS({
      userData: {
        profile: {
          organizations: [
            {
              organization: [{}],
            },
          ],
        },
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectProfileDistrictId()(mockedState)).toBeFalsy();
  });

  it('should consistently return the profile session ID', () => {
    const global = fromJS({
      userData: {
        login: {
          session_id: ['some_session_id'],
        },
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectProfileSessionId()(mockedState)).toEqual('some_session_id');
  });

  it('should consistently return false profile session ID for missing data', () => {
    const global = fromJS({
      userData: {
        login: {},
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectProfileSessionId()(mockedState)).toBeFalsy();
  });

  it('should consistently return the global app groups data state', () => {
    const global = fromJS({
      userData: {
        groups: {},
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectGroupsData()(mockedState)).toMatchSnapshot();
  });

  it('should consistently return the initial global app groups data state', () => {
    const global = fromJS({
      userData: {
        groups: null,
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectGroupsData()(mockedState)).toMatchSnapshot();
  });

  it('should consistently return the global app schools data state', () => {
    const global = fromJS({
      userData: {
        schools: {},
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectSchoolsData()(mockedState)).toMatchSnapshot();
  });

  it('should consistently return the initial global app schools data state', () => {
    const global = fromJS({
      userData: {
        schools: null,
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectSchoolsData()(mockedState)).toMatchSnapshot();
  });

  it('should consistently return the global app grades data state', () => {
    const global = fromJS({
      userData: {
        grades: {},
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectGradesData()(mockedState)).toMatchSnapshot();
  });

  it('should consistently return the initial global app grades data state', () => {
    const global = fromJS({
      userData: {
        grades: null,
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectGradesData()(mockedState)).toMatchSnapshot();
  });

  it('should consistently return the global app teachers data state', () => {
    const global = fromJS({
      userData: {
        teachers: {},
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectTeachersData()(mockedState)).toMatchSnapshot();
  });

  it('should consistently return the initial global app teachers data state', () => {
    const global = fromJS({
      userData: {
        teachers: null,
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectTeachersData()(mockedState)).toMatchSnapshot();
  });

  it('should consistently return the global app program available data state', () => {
    const global = fromJS({
      userData: {
        serverAssets: [],
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectProgramAvailableData()(mockedState)).toMatchSnapshot();
  });

  it('should consistently return the permission data', () => {
    const global = fromJS({
      userData: {
        permissions: '123',
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectPermissionsData()(mockedState)).toMatchSnapshot();
  });

  it('should consistently return the password config data', () => {
    const global = fromJS({
      userData: {
        passwordConfig: {
          grade_mappings: [],
          configs: [],
        },
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectPasswordConfigData()(mockedState)).toMatchSnapshot();
  });

  it('should consistently return the schools and classes data', () => {
    const global = fromJS({
      userData: {
        schoolsAndClasses: {
          school: [
            {
              school_id: [],
              school_name: [],
              classes: [
                {
                  class: [
                    {
                      class_id: [],
                      class_name: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectSchoolsAndClassesData()(mockedState)).toMatchSnapshot();
  });

  it('expand collapase status for school', () => {
    const global = fromJS({
      expandCollapseStatus: {
        school: 'schoolId',
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectSchoolExpandCollapseStatus()(mockedState)).toEqual(
      global.getIn(['expandCollapseStatus', 'school'])
    );
  });

  it('expand collapase status for grade', () => {
    const global = fromJS({
      expandCollapseStatus: {
        grade: 'gradeId',
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectGradeExpandCollapseStatus()(mockedState)).toEqual(
      global.getIn(['expandCollapseStatus', 'grade'])
    );
  });

  it('expand collapase status for teacher', () => {
    const global = fromJS({
      expandCollapseStatus: {
        teacher: 'teacherId',
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectTeacherExpandCollapseStatus()(mockedState)).toEqual(
      global.getIn(['expandCollapseStatus', 'teacher'])
    );
  });

  it('expand collapase status for class', () => {
    const global = fromJS({
      expandCollapseStatus: {
        class: 'classlId',
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectClassExpandCollapseStatus()(mockedState)).toEqual(
      global.getIn(['expandCollapseStatus', 'class'])
    );
  });

  it('expand collapase status for group', () => {
    const global = fromJS({
      expandCollapseStatus: {
        group: 'groupId',
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectGroupExpandCollapseStatus()(mockedState)).toEqual(
      global.getIn(['expandCollapseStatus', 'group'])
    );
  });

  it('expand collapase status for student', () => {
    const global = fromJS({
      expandCollapseStatus: {
        student: 'studentId',
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectStudentExpandCollapseStatus()(mockedState)).toEqual(
      global.getIn(['expandCollapseStatus', 'student'])
    );
  });

  it('should consistently return reset credentials status', () => {
    const global = fromJS({
      userData: {
        login: {
          reset_credentials: ['reset_credentials'],
        },
      },
    });
    const mockedState = fromJS({
      global,
    });
    expect(Selectors.makeSelectResetCredentials()(mockedState)).toMatchSnapshot();
  });
});
