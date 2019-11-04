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

describe('getAllTeacherMadeQuizData ', () => {
  beforeEach(() => {
    axios.post.mockReturnValue(Promise.resolve({ data: [] }));
  });

  it('should return get All Teacher Made Quiz Data ', () => {
    expect.assertions(2);
    return Request.getAllTeacherMadeQuizData('564738478').then(res => {
      expect(res).not.toBeDefined();
      expect(typeof res).toBe('undefined');
    });
  });
});
describe('getCollectionName  ', () => {
  beforeEach(() => {
    axios.get.mockReturnValue(Promise.resolve({ data: [] }));
  });

  it('should return get Collection Name  ', () => {
    expect.assertions(3);
    return Request.getCollectionName('564738478').then(res => {
      expect(axios.get).toHaveBeenCalled();
      expect(res).toBeDefined();
      expect(typeof res).toBe('object');
    });
  });
});
