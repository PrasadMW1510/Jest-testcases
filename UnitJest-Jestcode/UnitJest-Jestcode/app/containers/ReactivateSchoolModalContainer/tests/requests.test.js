import API from 'utils/request';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  post: jest.fn().mockReturnValue(Promise.resolve()),
}));

describe('ReactivateSchool API Request', () => {
  const mockSessionId = 'guidSessionId';
  const mockReactivateSchoolPayload = { account: 'mock reactivate school payload' };
  describe('postReactivateSchool', () => {
    describe('stubbing successful response', () => {
      beforeEach(() => {
        API.post.mockReturnValue(Promise.resolve({ output_data: [{}] }));
      });

      it('should call API.post, res should be defined, and res should be an object', () => {
        expect.assertions(3);
        return Request.postReactivateSchool(mockSessionId, mockReactivateSchoolPayload).then(
          res => {
            expect(API.post).toHaveBeenCalled();
            expect(res).toBeDefined();
            expect(typeof res).toBe('object');
          }
        );
      });

      it('should post the accounts delete to the server', () =>
        Request.postReactivateSchool(mockSessionId, {}).then(() => {
          expect(API.post).toHaveBeenCalledWith(
            '/SlmsSchool',
            {},
            {
              params: {
                command: 'set_district',
                sid: mockSessionId,
              },
            }
          );
        }));
    });
  });
});
