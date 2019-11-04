import API from 'utils/request';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  get: jest.fn(() => Promise.resolve({ output_data: ['test'] })),
  post: jest.fn(() => Promise.resolve({ output_data: [{}] })),
  getBaseUrlWithoutSlms: jest.fn().mockReturnValue('https://h511000002.education.scholastic.com'),
  xmlToJSON: jest.fn().mockReturnValue({ testdata: 'value' }),
}));
jest.mock('axios', () => ({
  get: jest.fn().mockReturnValue(Promise.resolve()),
}));
describe('getSearchResults   ', () => {
  beforeEach(() => {
    API.post.mockReturnValue(Promise.resolve({ output_data: [{ data: 'gfd' }, { data1: '' }] }));
  });
  it('should return getSearchResults  ', () => {
    expect.assertions(3);
    return Request.getSearchResults('564738478', 'mockClassObj').then(res => {
      expect(API.post).toHaveBeenCalled();
      expect(res).toBeDefined();
      expect(typeof res).toBe('object');
    });
  });
});
