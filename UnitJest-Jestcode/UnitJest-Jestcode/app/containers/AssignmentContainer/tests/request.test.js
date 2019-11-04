import API from 'utils/request';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  post: jest.fn().mockReturnValue(Promise.resolve()),
  get: jest.fn().mockReturnValue(Promise.resolve()),
  //  getBaseUrl: jest.fn().mockReturnValue('https://h511000002.education.scholastic.com'),
  getBaseUrlWithoutSlms: jest.fn().mockReturnValue('https://h511000002.education.scholastic.com'),
  xmlToJSON: jest.fn().mockReturnValue({ testdata: 'value' }),
}));
jest.mock('axios', () => ({
  get: jest.fn().mockReturnValue(Promise.resolve()),
}));

describe('calls', () => {
  describe('stubbing successful response for getPfAsignRequest', () => {
    beforeEach(() => {
      API.post.mockReturnValue(Promise.resolve({}));
    });

    it('should call API.post, res should be defined, and res should be an object', () => {
      expect.assertions(3);
      return Request.getPfAsignRequest('sessionid-123', 'mockMessageXML').then(res => {
        expect(API.post).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
  describe('stubbing successful response for getPfAsignGridRequest', () => {
    beforeEach(() => {
      API.post.mockReturnValue(Promise.resolve({}));
    });

    it('should call API.post, res should be defined, and res should be an object', () => {
      const classId = {
        data: [],
      };
      expect.assertions(3);
      return Request.getPfAsignGridRequest(
        'sessionid-123',
        'userid',
        classId,
        'mockMessageXML'
      ).then(res => {
        expect(API.post).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
  describe('saveAssignmentRequest   ', () => {
    beforeEach(() => {
      API.post.mockReturnValue(Promise.resolve());
    });
    it('should call axios, xml2js, and lodash to produce a valid JSON object', () => {
      expect.assertions(2);
      return Request.saveAssignmentRequest(
        '8888',
        'isStudentWorkItem',
        'movkdata',
        'messageObject'
      ).then(res => {
        expect(API.post).toHaveBeenCalled();
        expect(res).not.toBeDefined();
      });
    });
  });
});
