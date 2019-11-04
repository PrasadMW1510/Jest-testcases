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
  describe('stubbing successful response for getRead180DataRequestAction', () => {
    beforeEach(() => {
      API.post.mockReturnValue(Promise.resolve({}));
    });

    it('should call API.post, res should be defined, and res should be an object', () => {
      const userID = {};
      expect.assertions(3);
      return Request.getRead180DataRequestAction('sessionid-123', 'mockMessageXML', userID).then(
        res => {
          expect(API.post).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        }
      );
    });
  });
  describe('stubbing successful response for setRead180DataRequestAction', () => {
    beforeEach(() => {
      API.post.mockReturnValue(Promise.resolve({}));
    });

    it('should call API.post, res should be defined, and res should be an object', () => {
      const workItemId = {};
      expect.assertions(3);
      return Request.setRead180DataRequestAction(
        'sessionid-123',
        'mockMessageXML',
        workItemId
      ).then(res => {
        expect(API.post).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
  describe('stubbing successful response for setRead180DataRequestAction', () => {
    beforeEach(() => {
      API.post.mockReturnValue(Promise.resolve({}));
    });

    it('should call API.post, res should be defined, and res should be an object', () => {
      const workItemId = {};
      expect.assertions(3);
      return Request.deleteRead180DataRequestAction(
        'sessionid-123',
        'mockMessageXML',
        workItemId
      ).then(res => {
        expect(API.post).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
});
