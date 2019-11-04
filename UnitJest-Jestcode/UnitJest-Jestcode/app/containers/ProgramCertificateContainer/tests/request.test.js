import API from 'utils/request';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  get: jest.fn().mockReturnValue(Promise.resolve()),
}));

describe('Certificate Info', () => {
  describe('stubbing successful response', () => {
    beforeEach(() => {
      API.get.mockReturnValue(Promise.resolve({ output_data: [{ certificate_info: [{}] }] }));
    });

    it('Should get usage summary by session id and userid', () => {
      expect.assertions(3);
      return Request.getCertificateInfo('dsafasfasdf', 'jsmith', 'teacher').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
});
