import API from 'utils/request';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  get: jest.fn().mockReturnValue(Promise.resolve()),
  post: jest.fn().mockReturnValue(Promise.resolve()),
}));

describe('ManageAdminAccountsContainer API request', () => {
  const testSessionId = 'guidSessionId';
  const testDistrictId = 'guidDistrictId';
  const testSchoolId = 'guidSchoolId';

  describe('Get Admins Request', () => {
    beforeEach(() => {
      API.get.mockReturnValue(
        Promise.resolve({ output_data: [{ organizations: [{ organization: [{}] }] }] })
      );
    });

    it('Should get admins with session_id and user_id', () =>
      Request.getAdmins(testSessionId, testDistrictId).then(() =>
        expect(API.get).toHaveBeenCalledWith('/SlmsDistrict', {
          params: {
            command: 'get_admins',
            sid: testSessionId,
            district_id: testDistrictId,
          },
        })
      ));
  });

  describe('Get Schools Request', () => {
    beforeEach(() => {
      API.get.mockReturnValue(
        Promise.resolve({
          output_data: [{ organization: [{}] }],
        })
      );
    });

    it('Should get admins with session_id and user_id', () =>
      Request.getSchools(testSessionId, testSchoolId).then(() =>
        expect(API.get).toHaveBeenCalledWith('/SlmsSchool', {
          params: {
            command: 'get_admins',
            sid: testSessionId,
            school_id: testSchoolId,
          },
        })
      ));
  });
});
