import { fromJS } from 'immutable';
import { USER_ORG, USER_TYPE } from 'containers/App/constants';
import * as AdminConstants from 'components/ManageAdminAccounts/constants';

import * as TransformData from '../transformData';

describe('Transform Data Utils', () => {
  const defaultValues = {
    name: '',
    class_id: '',
    display_name: '',
    description: '',
    grades: {},
    rosterStudents: {},
    applications: {},
    teacher1: null,
    teacher2: null,
    teacherList: [],
  };

  describe('transformStudentDataForForm', () => {
    it('should return defaults if no attribute found', () => {
      const data = TransformData.transformStudentDataForForm({
        enabled: false,
        first_name: ['Foo'],
        last_name: 'Bar',
        extended_user_data: [
          {
            grade: [{ name: ['PK'] }],
          },
        ],
      });

      expect(data).toEqual({
        birth_date: undefined,
        classes: {},
        district_user_id: undefined,
        email: undefined,
        enabled: false,
        first_name: 'Foo',
        grade: 'PK',
        groups: {},
        last_name: 'Bar',
        middle_name: undefined,
        password: undefined,
        password_confirm: undefined,
        password_hint: undefined,
        prefix: undefined,
        sps_id: undefined,
        ssn: undefined,
        student_id: undefined,
        subgroupings: undefined,
        suffix: undefined,
        title: undefined,
        user_id: undefined,
        user_name: undefined,
        user_type: undefined,
      });
    });
  });

  describe('transformClassDataForForm', () => {
    it('should return defaults if no attribute found', () => {
      const classData = TransformData.transformClassDataForForm({});
      expect(classData).toEqual(defaultValues);
    });

    it('should extract a value embedded in the first position in an array', () => {
      const classData = TransformData.transformClassDataForForm({ name: ['foo'] });
      expect(classData).toEqual(Object.assign({}, defaultValues, { name: 'foo' }));
    });

    it('should extract ids of nested data', () => {
      const classData = TransformData.transformClassDataForForm({
        grades: [
          {
            grade: [{ name: 'grade-1' }, { name: 'grade-2' }],
          },
        ],
        teachers: [
          {
            user: [{ user_id: 'teacher-1' }, { user_id: 'teacher-2' }],
          },
        ],
        // Cover null case returned
        applications: [],
      });

      expect(classData).toEqual(
        Object.assign({}, defaultValues, {
          grades: {
            'grade-1': true,
            'grade-2': true,
          },
          teacher1: 'teacher-1',
          teacher2: 'teacher-2',
          teacherList: ['teacher-1', 'teacher-2'],
        })
      );
    });

    it('should extract ids of nested data', () => {
      const classData = TransformData.transformClassDataForForm({
        teachers: [],
      });
      expect(classData).toEqual(Object.assign({}, defaultValues));
    });

    it('should extract ids of nested data - 1 value', () => {
      const classData = TransformData.transformClassDataForForm({
        teachers: [
          {
            user: [{ user_id: 'teacher-1' }],
          },
        ],
      });
      expect(classData).toEqual(
        Object.assign({}, defaultValues, { teacher1: 'teacher-1', teacherList: ['teacher-1'] })
      );
    });
  });

  describe('transformClassMapForPost', () => {
    it('should return json in form that converts into xml for server', () => {
      const mockTeacherList = ['123', '456', '789', '111'];
      const immClass = fromJS({ teacherList: mockTeacherList, teacher1: '222', teacher2: '333' });
      const classId = 'foo-class-id';
      const schoolId = 'foo-school-id';
      const classJson = TransformData.transformClassMapForPost(immClass, classId, schoolId);
      expect(classJson).toEqual({
        class: {
          applications: { community_id: [] },
          class_id: classId,
          description: 'description',
          display_name: undefined,
          grades: { grade: [] },
          name: undefined,
          owner_id: schoolId,
          students: { user_id: [] },
          teachers: { user_id: ['222', '333', '789', '111'] },
        },
      });
    });
  });

  describe('extractValue', () => {
    it('should extract a value embedded in the first position only in an array', () => {
      expect(TransformData.extractValue(['foo'])).toEqual('foo');
    });

    it('should not extract a value embedded in an array that is not of size 1', () => {
      expect(TransformData.extractValue(['foo', 'bar'])).toEqual(['foo', 'bar']);
    });
  });

  describe('extractBoolValue', () => {
    it('should extract a true boolean value', () => {
      expect(TransformData.extractBoolValue(['true'])).toEqual(true);
    });

    it('should extract a false boolean value', () => {
      expect(TransformData.extractBoolValue(['false'])).toEqual(false);
    });
  });

  describe('transformDataForProfileUpdate', () => {
    let expectedProfileData = null;
    let mockProfileData = null;
    const mockPermissionData = fromJS([{ id: ['permissionMock1'] }, { id: ['permissionMock2'] }]);
    const mockUserId = 'mockUserId';
    const mockUserOrgId = 'mockUserOrgId';

    const permissions = TransformData.createPermissionsObj(mockPermissionData);

    it('classes is not defined and userOrg is not school', () => {
      mockProfileData = fromJS({
        user_type: 'mock_user_type',
        district_user_id: 'mock_district_user_id',
        sps_id: 'mock_sps_id',
        prefix: 'mock_prefix',
        first_name: 'mock_first_name',
        last_name: 'mock_last_name',
        title: 'mock_title',
        suffix: 'mock_suffix',
        email: 'mock_email',
        user_name: 'mock_user_name',
        password: 'mock_password',
        password_hint: 'mock_password_hint',
      });

      expectedProfileData = {
        user: {
          user_id: mockUserId,
          user_type: mockProfileData.get('user_type'),
          district_user_id: mockProfileData.get('district_user_id'),
          sps_id: mockProfileData.get('sps_id'),
          prefix: mockProfileData.get('prefix'),
          first_name: mockProfileData.get('first_name'),
          last_name: mockProfileData.get('last_name'),
          title: mockProfileData.get('title'),
          suffix: mockProfileData.get('suffix'),
          email: mockProfileData.get('email'),
          user_name: mockProfileData.get('user_name'),
          password: mockProfileData.get('password'),
          password_hint: mockProfileData.get('password_hint'),
          permissions: {
            permission: [
              { permission_id: 'permissionMock1' },
              { permission_id: 'permissionMock2' },
            ],
          },
          organizations: {
            org_id: mockUserOrgId,
          },
        },
      };

      expect(
        TransformData.transformDataForProfileUpdate(
          mockProfileData,
          permissions,
          mockUserId,
          USER_ORG.District,
          mockUserOrgId
        )
      ).toEqual(expectedProfileData);
    });

    it('classes is defined and userOrg is school', () => {
      mockProfileData = fromJS({
        user_type: 'mock_user_type',
        district_user_id: 'mock_district_user_id',
        sps_id: 'mock_sps_id',
        prefix: 'mock_prefix',
        first_name: 'mock_first_name',
        last_name: 'mock_last_name',
        title: 'mock_title',
        suffix: 'mock_suffix',
        email: 'mock_email',
        user_name: 'mock_user_name',
        password: 'mock_password',
        password_hint: 'mock_password_hint',
        classes: {
          mockClassId1: true,
          mockClassId2: true,
        },
      });

      expectedProfileData = {
        user: {
          user_id: mockUserId,
          user_type: mockProfileData.get('user_type'),
          district_user_id: mockProfileData.get('district_user_id'),
          sps_id: mockProfileData.get('sps_id'),
          prefix: mockProfileData.get('prefix'),
          first_name: mockProfileData.get('first_name'),
          last_name: mockProfileData.get('last_name'),
          title: mockProfileData.get('title'),
          suffix: mockProfileData.get('suffix'),
          email: mockProfileData.get('email'),
          user_name: mockProfileData.get('user_name'),
          password: mockProfileData.get('password'),
          password_hint: mockProfileData.get('password_hint'),
          permissions: {
            permission: [
              { permission_id: 'permissionMock1' },
              { permission_id: 'permissionMock2' },
            ],
          },
          organizations: {
            org_id: mockUserOrgId,
          },
          schools: {
            school_id: mockUserOrgId,
          },
          classes: {
            class_id: ['mockClassId1', 'mockClassId2'],
          },
        },
      };

      expect(
        TransformData.transformDataForProfileUpdate(
          mockProfileData,
          permissions,
          mockUserId,
          USER_ORG.School,
          mockUserOrgId
        )
      ).toEqual(expectedProfileData);
    });
  });

  describe('transformDataForProfileAdd', () => {
    let mockProfileData = null;
    const mockPermissionIds = [100, 500, 1500];
    const mockUserOrgId = 'mockUserOrgId';

    it('adds correctly for DA', () => {
      const mockAccountType = AdminConstants.DISTRICT_ADMINSTRATOR;
      const mockUserOrg = USER_ORG.Adminstrator;

      mockProfileData = fromJS({
        district_user_id: 'mock_district_user_id',
        sps_id: 'mock_sps_id',
        prefix: 'mock_prefix',
        first_name: 'mock_first_name',
        last_name: 'mock_last_name',
        title: 'mock_title',
        suffix: 'mock_suffix',
        email: 'mock_email',
        user_name: 'mock_user_name',
        password: 'mock_password',
        password_hint: 'mock_password_hint',
        user_type: mockAccountType,
      });

      expect(
        TransformData.transformDataForProfileAdd(
          mockProfileData,
          mockPermissionIds,
          mockUserOrgId,
          mockUserOrg
        )
      ).toMatchSnapshot();
    });
    it('adds correctly for DTA', () => {
      const mockAccountType = AdminConstants.DISTRICT_TECH;
      const mockUserOrg = USER_ORG.Adminstrator;

      mockProfileData = fromJS({
        district_user_id: 'mock_district_user_id',
        sps_id: 'mock_sps_id',
        prefix: 'mock_prefix',
        first_name: 'mock_first_name',
        last_name: 'mock_last_name',
        title: 'mock_title',
        suffix: 'mock_suffix',
        email: 'mock_email',
        user_name: 'mock_user_name',
        password: 'mock_password',
        password_hint: 'mock_password_hint',
        user_type: mockAccountType,
      });

      expect(
        TransformData.transformDataForProfileAdd(
          mockProfileData,
          mockPermissionIds,
          mockUserOrgId,
          mockUserOrg
        )
      ).toMatchSnapshot();
    });

    it('adds correctly for SA adding SA', () => {
      const mockAccountType = AdminConstants.SCHOOL_ADMINISTRATOR;
      const mockUserOrg = USER_ORG.School;

      mockProfileData = fromJS({
        district_user_id: 'mock_district_user_id',
        sps_id: 'mock_sps_id',
        prefix: 'mock_prefix',
        first_name: 'mock_first_name',
        last_name: 'mock_last_name',
        title: 'mock_title',
        suffix: 'mock_suffix',
        email: 'mock_email',
        user_name: 'mock_user_name',
        password: 'mock_password',
        password_hint: 'mock_password_hint',
        organizations: {
          org_id: mockUserOrgId,
        },
        schools: {
          school_id: mockUserOrgId,
        },
        user_type: mockAccountType,
      });

      expect(
        TransformData.transformDataForProfileAdd(
          mockProfileData,
          mockPermissionIds,
          mockUserOrgId,
          mockUserOrg
        )
      ).toMatchSnapshot();
    });

    it('adds correctly for SA adding STA', () => {
      const mockAccountType = AdminConstants.SCHOOL_TECH;
      const mockUserOrg = USER_ORG.School;

      mockProfileData = fromJS({
        district_user_id: 'mock_district_user_id',
        sps_id: 'mock_sps_id',
        prefix: 'mock_prefix',
        first_name: 'mock_first_name',
        last_name: 'mock_last_name',
        title: 'mock_title',
        suffix: 'mock_suffix',
        email: 'mock_email',
        user_name: 'mock_user_name',
        password: 'mock_password',
        password_hint: 'mock_password_hint',
        organizations: {
          org_id: mockUserOrgId,
        },
        schools: {
          school_id: mockUserOrgId,
        },
        user_type: mockAccountType,
      });

      expect(
        TransformData.transformDataForProfileAdd(
          mockProfileData,
          mockPermissionIds,
          mockUserOrgId,
          mockUserOrg
        )
      ).toMatchSnapshot();
    });

    it('adds correctly for DA adding SA', () => {
      const mockAccountType = AdminConstants.SCHOOL_ADMINISTRATOR;
      const mockUserOrg = USER_ORG.District;

      mockProfileData = fromJS({
        district_user_id: 'mock_district_user_id',
        sps_id: 'mock_sps_id',
        prefix: 'mock_prefix',
        first_name: 'mock_first_name',
        last_name: 'mock_last_name',
        title: 'mock_title',
        suffix: 'mock_suffix',
        email: 'mock_email',
        user_name: 'mock_user_name',
        password: 'mock_password',
        password_hint: 'mock_password_hint',
        school_name: mockUserOrgId,
        organizations: {
          org_id: mockUserOrgId,
        },
        schools: {
          school_id: mockUserOrgId,
        },
        user_type: mockAccountType,
        permissions: {
          permission: [{ permission_id: 'permissionMock1' }, { permission_id: 'permissionMock2' }],
        },
      });

      expect(
        TransformData.transformDataForProfileAdd(
          mockProfileData,
          mockPermissionIds,
          mockUserOrgId,
          mockUserOrg
        )
      ).toMatchSnapshot();
    });

    it('adds correctly for Teacher', () => {
      const mockAccountType = USER_TYPE.Teacher;
      const mockUserOrg = USER_ORG.School;

      mockProfileData = fromJS({
        district_user_id: 'mock_district_user_id',
        // sps_id: 'mock_sps_id',
        // prefix: 'mock_prefix',
        first_name: 'mock_first_name',
        last_name: 'mock_last_name',
        title: 'mock_title',
        suffix: 'mock_suffix',
        email: 'mock_email',
        user_name: 'mock_user_name',
        password: 'mock_password',
        password_hint: 'mock_password_hint',
        user_type: mockAccountType,
        school_name: 'mock_school_name',
        permissions: {
          permission: [{ permission_id: 'permissionMock1' }, { permission_id: 'permissionMock2' }],
        },
        organizations: {
          org_id: mockUserOrgId,
        },
        schools: {
          school_id: mockUserOrgId,
        },
        classes: {
          class_id: ['mockClassId1', 'mockClassId2'],
        },
      });

      expect(
        TransformData.transformDataForProfileAdd(
          mockProfileData,
          mockPermissionIds,
          mockUserOrgId,
          mockUserOrg
        )
      ).toMatchSnapshot();
    });
  });

  describe('createPermissionsObj', () => {
    it('returns permissions in the correct format', () => {
      const mockPermissionData = fromJS([{ id: ['permissionMock1'] }, { id: ['permissionMock2'] }]);
      const expectedPermissionObj = {
        permission: [{ permission_id: 'permissionMock1' }, { permission_id: 'permissionMock2' }],
      };
      expect(TransformData.createPermissionsObj(mockPermissionData)).toEqual(expectedPermissionObj);
    });
  });

  describe('createPermissionFromIds', () => {
    it('returns permissions in the correct format', () => {
      const ids = [100, 500, 1500];
      const expectedPermissionObj = {
        permission: [{ permission_id: 100 }, { permission_id: 500 }, { permission_id: 1500 }],
      };
      expect(TransformData.createPermissionFromIds(ids)).toEqual(expectedPermissionObj);
    });
  });
});
