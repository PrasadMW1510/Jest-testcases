import axios from 'axios';
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

describe('getEditQuizCollectionNamesData ', () => {
  beforeEach(() => {
    axios.get.mockReturnValue(Promise.resolve({ data: [] }));
  });

  it('should return getEditQuizCollectionNamesData ', () => {
    expect.assertions(3);
    return Request.getEditQuizCollectionNamesData('564738478').then(res => {
      expect(axios.get).toHaveBeenCalled();
      expect(res).toBeDefined();
      expect(typeof res).toBe('object');
    });
  });
});
describe('postEditQuizCollectionNamesData  ', () => {
  beforeEach(() => {
    axios.post.mockReturnValue(Promise.resolve({ data: [] }));
  });

  it('should postEditQuizCollectionNamesData  ', () => {
    expect.assertions(3);
    return Request.postEditQuizCollectionNamesData('564738478', 'mocknameobj').then(res => {
      expect(axios.post).toHaveBeenCalled();
      expect(res).toBeDefined();
      expect(typeof res).toBe('object');
    });
  });
});
