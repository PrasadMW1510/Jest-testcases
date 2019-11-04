import API from 'utils/request';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  post: jest.fn().mockReturnValue(Promise.resolve()),
}));

describe('ReactivateClass API Request', () => {
  const mockSessionId = 'guidSessionId';
  const mockReactivateClassPayload = { account: 'mock reactivate class payload' };
  describe('postReactivateClass', () => {
    describe('stubbing successful response', () => {
      beforeEach(() => {
        API.post.mockReturnValue(Promise.resolve({ output_data: [{}] }));
      });

      it('should call API.post, res should be defined, and res should be an object', () => {
        expect.assertions(3);
        return Request.postReactivateClass(mockSessionId, mockReactivateClassPayload).then(res => {
          expect(API.post).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });

      it('should post the accounts delete to the server', () =>
        Request.postReactivateClass(mockSessionId, {}).then(() => {
          expect(API.post).toHaveBeenCalledWith(
            '/SlmsClass',
            {},
            {
              params: {
                command: 'set_school',
                sid: mockSessionId,
              },
            }
          );
        }));
    });
  });
});
