import API from 'utils/request';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  get: jest.fn().mockReturnValue(Promise.resolve()),
  post: jest.fn().mockReturnValue(Promise.resolve()),
}));

describe('ClearRosterModalContainer API request tests', () => {
  const testUserId = 'guidTestUser';
  const testSessionId = 'guidSessionId';
  const testSchoolId = 'guidSchooltId';

  describe('Clear Roster Modal Container', () => {
    beforeEach(() => {
      API.get.mockReturnValue(Promise.resolve({ output_data: [{}] }));
    });

    it('Should deactivate all classes', () =>
      Request.deactivateAllClasses(testUserId, testSessionId, testSchoolId).then(() =>
        expect(API.get).toHaveBeenCalledWith('/SlmsDeactivation', {
          params: {
            command: 'deactivate_all_classes',
            user_id: testUserId,
            sid: testSessionId,
            school_id: testSchoolId,
          },
        })
      ));
  });
});
