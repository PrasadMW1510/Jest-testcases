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
describe('setRead180ResponseWrite', () => {
  beforeEach(() => {
    API.post.mockReturnValue(Promise.resolve());
  });

  it('should setRead180ResponseWrite', () => {
    expect.assertions(2);
    return Request.setRead180ResponseWrite('564738478', '{}').then(res => {
      expect(res).not.toBeDefined();
      expect(API.post).toHaveBeenCalled();
    });
  });
});
