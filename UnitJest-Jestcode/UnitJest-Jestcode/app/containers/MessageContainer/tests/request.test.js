import API from 'utils/request';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  get: jest.fn().mockReturnValue(Promise.resolve()),
  post: jest.fn().mockReturnValue(Promise.resolve()),
}));

describe('MessageContainer API Request', () => {
  describe('getMessageData', () => {
    describe('stubbing successful response', () => {
      beforeEach(() => {
        API.get.mockReturnValue(Promise.resolve({ output_data: [{ messages: [{}] }] }));
      });

      it('should call API.get, res should be defined, and res should be an object', () => {
        expect.assertions(3);
        return Request.getMessageData('jsmith', 'testpw').then(res => {
          expect(API.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });
    });
  });

  describe('postDeleteMessages', () => {
    describe('stubbing successful response', () => {
      beforeEach(() => {
        API.post.mockReturnValue(Promise.resolve({ output_data: [{}] }));
      });

      it('should call API.post, res should be defined, and res should be an object', () => {
        expect.assertions(3);
        return Request.postDeleteMessages('1213212', 'mockMessageXML').then(res => {
          expect(API.post).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });
    });
  });
});
