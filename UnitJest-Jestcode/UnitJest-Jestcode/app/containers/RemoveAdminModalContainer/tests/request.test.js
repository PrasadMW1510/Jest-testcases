import API from 'utils/request';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  get: jest.fn().mockReturnValue(Promise.resolve()),
  post: jest.fn().mockReturnValue(Promise.resolve()),
}));

describe('RemoveAdminModalContainer API request tests', () => {
  const testSessionId = 'test-session-id';
  const testAdminId = 'test-admin-id';

  describe('Remove Admin Modal Container', () => {
    beforeEach(() => {
      API.get.mockReturnValue(Promise.resolve({ output_data: [{}] }));
    });

    it('Should disable admin', () =>
      Request.disableAdmin(testSessionId, testAdminId).then(() =>
        expect(API.get).toHaveBeenCalledWith('/SlmsAccount', {
          params: {
            command: 'disable',
            sid: testSessionId,
            user_id: testAdminId,
            allow_orphans: 1,
          },
        })
      ));
  });
});
