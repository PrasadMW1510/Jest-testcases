import axios from 'axios';
import API from 'utils/request';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  post: jest.fn().mockReturnValue(Promise.resolve()),
  getBaseUrl: jest.fn().mockReturnValue('https://h511000002.education.scholastic.com'),
  getBaseUrlWithoutSlms: jest.fn().mockReturnValue('https://h511000002.education.scholastic.com'),
  xmlToJSON: jest.fn().mockReturnValue({ testdata: 'value' }),
}));
jest.mock('axios', () => ({
  post: jest.fn().mockReturnValue(Promise.resolve()),
  get: jest.fn().mockReturnValue(Promise.resolve()),
}));

describe('getInstalledQuizData ', () => {
  beforeEach(() => {
    axios.get.mockReturnValue(Promise.resolve({ data: [] }));
  });

  it('should return getInstalledQuizData ', () => {
    expect.assertions(3);
    return Request.getInstalledQuizData('564738478').then(res => {
      expect(axios.get).toHaveBeenCalled();
      expect(res).toBeDefined();
      expect(typeof res).toBe('object');
    });
  });
});
describe('postTeacherMadeQuizRequest  ', () => {
  beforeEach(() => {
    API.post.mockReturnValue(Promise.resolve());
  });

  it('should postTeacherMadeQuizRequest  ', () => {
    expect.assertions(2);
    return Request.postTeacherMadeQuizRequest('564738478', '{}').then(res => {
      expect(res).not.toBeDefined();
      expect(API.post).toHaveBeenCalled();
    });
  });
});
describe('getQuizDetailData ', () => {
  beforeEach(() => {
    API.post.mockReturnValue(Promise.resolve({ data: [] }));
  });

  it('should return getQuizDetailData ', () => {
    expect.assertions(3);
    return Request.getQuizDetailData('564738478', 'quizObj').then(res => {
      expect(API.post).toHaveBeenCalled();
      expect(res).toBeDefined();
      expect(typeof res).toBe('object');
    });
  });
});
describe('deleteQuizDetailData  ', () => {
  beforeEach(() => {
    API.post.mockReturnValue(Promise.resolve({ data: [] }));
  });

  it('should deleteQuizDetailData  ', () => {
    expect.assertions(3);
    return Request.deleteQuizDetailData('564738478', 'quizObj').then(res => {
      expect(API.post).toHaveBeenCalled();
      expect(res).toBeDefined();
      expect(typeof res).toBe('object');
    });
  });
});
