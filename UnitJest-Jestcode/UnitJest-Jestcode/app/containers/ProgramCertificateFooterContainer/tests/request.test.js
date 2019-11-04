import API from 'utils/request';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  post: jest.fn().mockReturnValue(Promise.resolve()),
}));

describe('getCertificatePrintPdf API Request', () => {
  describe('stubbing successful response', () => {
    beforeEach(() => {
      API.post.mockReturnValue(Promise.resolve({ output_data: [{ certificate: [{}] }] }));
    });

    it('should call API.post, res should be defined, and res should be an object', () => {
      expect.assertions(3);
      return Request.getCertificatePrintPdf('1213212', 'mockMessageXML').then(res => {
        expect(API.post).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
});
