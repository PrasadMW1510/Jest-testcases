import API from 'utils/request';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  get: jest.fn().mockReturnValue(Promise.resolve()),
  post: jest.fn().mockReturnValue(Promise.resolve()),
  getBaseUrl: jest.fn().mockReturnValue('https://h511000002.education.scholastic.com'),
  getBaseUrlWithoutSlms: jest.fn().mockReturnValue('https://h511000002.education.scholastic.com'),
}));
describe('getPrintQuizAndAnswerData    ', () => {
  describe('stubbing successful response', () => {
    beforeEach(() => {
      API.post.mockReturnValue(
        Promise.resolve({ output_data: [{ report: [{ $: { id: 'testid' } }] }] })
      );
    });
    it('should call axios, xml2js, and lodash to produce a valid JSON object', () => {
      expect.assertions(2);
      return Request.getPrintQuizAndAnswerData('777777', 'movkdata').then(res => {
        expect(API.post).toHaveBeenCalled();
        expect(res).not.toBeDefined();
      });
    });
  });
});
describe('getQuizWithQuestions     ', () => {
  describe('stubbing successful response', () => {
    beforeEach(() => {
      API.post.mockReturnValue(Promise.resolve());
    });
    it('should call axios, xml2js, and lodash to produce a valid JSON object', () => {
      expect.assertions(2);
      return Request.getQuizWithQuestions('777777', 'movkdata').then(res => {
        expect(API.post).toHaveBeenCalled();
        expect(res).not.toBeDefined();
      });
    });
  });
});
