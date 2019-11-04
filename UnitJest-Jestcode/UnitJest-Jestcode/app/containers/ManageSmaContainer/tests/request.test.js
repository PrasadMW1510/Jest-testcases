import * as API from 'utils/request';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  get: jest.fn().mockReturnValue(Promise.resolve()),
}));

describe('Get media servers for school', () => {
  describe('stubbing successful response getMediaServers', () => {
    beforeEach(() => {
      API.get.mockReturnValue(
        Promise.resolve({
          output_data: [{ media_servers: [{ media_server: [{}] }] }],
        })
      );
    });
    it('Should get media servers by session id and userid', () => {
      expect.assertions(3);
      return Request.getMediaServers('session', 'id').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
});
