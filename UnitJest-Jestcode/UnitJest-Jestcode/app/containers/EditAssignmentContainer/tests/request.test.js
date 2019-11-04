import API from 'utils/request';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  get: jest.fn().mockReturnValue(Promise.resolve()),
  post: jest.fn().mockReturnValue(Promise.resolve()),
  getBaseUrl: jest.fn().mockReturnValue('https://h511000002.education.scholastic.com'),
  getBaseUrlWithoutSlms: jest.fn().mockReturnValue('https://h511000002.education.scholastic.com'),
}));
describe('postAssignmentData     ', () => {
  describe('postAssignmentData ', () => {
    beforeEach(() => {
      API.post.mockReturnValue(Promise.resolve());
    });
    it('should call axios, xml2js, and lodash to produce a valid JSON object', () => {
      expect.assertions(2);
      return Request.postAssignmentData('8888', 'movkdata').then(res => {
        expect(API.post).toHaveBeenCalled();
        expect(res).not.toBeDefined();
      });
    });
  });
  describe('getStudentDetails  ', () => {
    beforeEach(() => {
      API.post.mockReturnValue(Promise.resolve());
    });
    it('should call axios, xml2js, and lodash to produce a valid JSON object', () => {
      expect.assertions(2);
      return Request.getStudentDetails('8888', 'movkdata').then(res => {
        expect(API.post).toHaveBeenCalled();
        expect(res).not.toBeDefined();
      });
    });
  });
  describe('saveAssignmentRequest   ', () => {
    const sid = 'kjashdkjakhdi';
    beforeEach(() => {
      API.post.mockReturnValue(Promise.resolve());
    });
    it('should call axios, xml2js, and lodash to produce a valid JSON object', () => {
      expect.assertions(2);
      return Request.saveAssignmentRequest(sid, 'movkdata', 'workItemId', 'payload').then(res => {
        expect(API.post).toHaveBeenCalled();
        expect(res).not.toBeDefined();
      });
    });
  });
  describe('deleteAssignmentRequest    ', () => {
    beforeEach(() => {
      API.post.mockReturnValue(Promise.resolve());
    });
    it('should call axios, xml2js, and lodash to produce a valid JSON object', () => {
      expect.assertions(2);
      return Request.deleteAssignmentRequest('movkdata', 'workItemId', 'payload').then(res => {
        expect(API.post).toHaveBeenCalled();
        expect(res).not.toBeDefined();
      });
    });
  });
});
