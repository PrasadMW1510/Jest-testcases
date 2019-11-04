import API from 'utils/request';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  get: jest.fn().mockReturnValue(Promise.resolve()),
}));

describe('Deactivate User ', () => {
  describe('stubbing successful response', () => {
    beforeEach(() => {
      API.get.mockReturnValue(Promise.resolve({ output_data: [{}] }));
    });

    it('Should get deactivate user by sessionId, userId, cohortId, cohortType', () => {
      expect.assertions(3);
      return Request.getDeactivateUser('dsafasfasdf', 'jsmith', 'teacher', 'teacher').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
});
