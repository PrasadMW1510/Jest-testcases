import API from 'utils/request';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  get: jest.fn().mockReturnValue(Promise.resolve()),
}));

describe('ManageInactiveAccountsContainer API Request', () => {
  describe('getInactiveCohortMembers', () => {
    describe('stubbing successful response', () => {
      beforeEach(() => {
        API.get.mockReturnValue(Promise.resolve({ output_data: [{ cohorts: [{}] }] }));
      });

      it('should call API.get, res should be defined, and res should be an object', () => {
        expect.assertions(3);
        const params = {
          cohortType: 'Student',
          sortColumn: 'last_name',
        };
        return Request.getInactiveCohortMembers('sessionId', 'userId', params).then(res => {
          expect(API.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });
    });
  });
});
