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
describe('getSearchResultDetails   ', () => {
  beforeEach(() => {
    API.post.mockReturnValue(Promise.resolve());
  });

  it('should getSearchResultDetails  ', () => {
    expect.assertions(2);
    return Request.getSearchResultDetails('564738478', '{}').then(res => {
      expect(res).not.toBeDefined();
      expect(API.post).toHaveBeenCalled();
    });
  });
});
describe('saveSearchResultDetails   ', () => {
  beforeEach(() => {
    API.post.mockReturnValue(Promise.resolve());
  });

  it('should saveSearchResultDetails   ', () => {
    expect.assertions(2);
    return Request.saveSearchResultDetails('564738478', '{}').then(res => {
      expect(res).not.toBeDefined();
      expect(API.post).toHaveBeenCalled();
    });
  });
});
describe('getSearchResultQuizDetails', () => {
  beforeEach(() => {
    API.post.mockReturnValue(Promise.resolve());
  });

  it('should getSearchResultQuizDetails', () => {
    expect.assertions(2);
    return Request.getSearchResultQuizDetails('564738478', '{}').then(res => {
      expect(res).not.toBeDefined();
      expect(API.post).toHaveBeenCalled();
    });
  });
});
describe('SaveTeacherMadeQuiz', () => {
  beforeEach(() => {
    API.post.mockReturnValue(Promise.resolve());
  });

  it('should SaveTeacherMadeQuiz', () => {
    expect.assertions(2);
    return Request.saveTeacherMadeQuiz('564738478', '{}').then(res => {
      expect(res).not.toBeDefined();
      expect(API.post).toHaveBeenCalled();
    });
  });
});
