import API from 'utils/request';
import Axios from 'axios';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  post: jest.fn().mockReturnValue(Promise.resolve()),
  get: jest.fn().mockReturnValue(Promise.resolve()),
  getBaseUrlWithoutSlms: jest.fn().mockReturnValue('https://h511000002.education.scholastic.com'),
  getSkillQuestionURL: jest.fn().mockReturnValue('https://h511000002.education.scholastic.com'),
  xmlToJSON: jest.fn().mockReturnValue({ testdata: 'value' }),
}));
jest.mock('axios', () => ({
  get: jest.fn().mockReturnValue(Promise.resolve()),
  getSkillQuestionURL: jest.fn().mockReturnValue('https://h511000002.education.scholastic.com'),
}));

describe('calls', () => {
  describe('stubbing successful response for getStudentProgramDetailsDataRequestData ', () => {
    beforeEach(() => {
      API.post.mockReturnValue(Promise.resolve({}));
    });

    it('should call API.post, res should be defined, and res should be an object', () => {
      expect.assertions(3);
      return Request.getStudentProgramDetailsDataRequestData(
        'sessionid-123',
        'user_id',
        'search-opts',
        'mockMessageXML'
      ).then(res => {
        expect(API.post).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
  describe('stubbing successful response for saveStudentEvaluationDataRequest  ', () => {
    beforeEach(() => {
      API.post.mockReturnValue(Promise.resolve({}));
    });

    it('should call API.post, res should be defined, and res should be an object', () => {
      expect.assertions(3);
      return Request.saveStudentEvaluationDataRequest(
        'sessionid-123',
        'user_id',
        'search-opts'
      ).then(res => {
        expect(API.post).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
  describe('stubbing successful response for saveStudentEvaluationDataRequest  ', () => {
    beforeEach(() => {
      Axios.get.mockReturnValue(Promise.resolve({}));
    });

    it('should call Axios.get, res should be defined, and res should be an object', () => {
      expect.assertions(3);
      return Request.getStudentQuestionRequestData('sessionid-123').then(res => {
        expect(Axios.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
});
