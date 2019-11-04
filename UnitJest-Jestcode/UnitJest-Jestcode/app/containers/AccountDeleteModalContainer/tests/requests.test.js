import API from 'utils/request';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  post: jest.fn().mockReturnValue(Promise.resolve()),
}));

describe('AccountDelete API Request', () => {
  const mockSessionId = 'guidSessionId';
  const mockAccountDeletePayload = { account: 'mock delete accountpayload' };
  describe('postAccountDelete', () => {
    describe('stubbing successful response', () => {
      beforeEach(() => {
        API.post.mockReturnValue(Promise.resolve({ output_data: [{}] }));
      });

      it('should call API.post, res should be defined, and res should be an object', () => {
        expect.assertions(3);
        return Request.postAccountsDelete(mockSessionId, mockAccountDeletePayload).then(res => {
          expect(API.post).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });

      it('should post the accounts delete to the server', () =>
        Request.postAccountsDelete(mockSessionId, {}).then(() => {
          expect(API.post).toHaveBeenCalledWith(
            '/SlmsStudent',
            {},
            {
              params: {
                command: 'disable_if_unattached',
                sid: mockSessionId,
              },
            }
          );
        }));
    });
  });
});
