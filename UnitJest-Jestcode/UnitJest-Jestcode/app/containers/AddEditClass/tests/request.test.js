import API from 'utils/request';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  post: jest.fn().mockReturnValue(Promise.resolve()),
  get: jest.fn().mockReturnValue(Promise.resolve()),
}));

describe('calls', () => {
  describe('stubbing successful response for postAddClass', () => {
    beforeEach(() => {
      API.post.mockReturnValue(Promise.resolve({ output_data: [{}] }));
    });

    it('should call API.post, res should be defined, and res should be an object', () => {
      expect.assertions(3);
      return Request.postAddClass('sessionid-123', 'mockMessageXML').then(res => {
        expect(API.post).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
  describe('stubbing successful response for postEditClass', () => {
    beforeEach(() => {
      API.post.mockReturnValue(Promise.resolve({ output_data: [{}] }));
    });

    it('should call API.post, res should be defined, and res should be an object', () => {
      expect.assertions(3);
      return Request.postEditClass('sessionid-123', 'mockClassObj').then(res => {
        expect(API.post).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
  describe('stubbing successful response for getting students of school', () => {
    beforeEach(() => {
      API.get.mockReturnValue(Promise.resolve({ output_data: [{ users: [{ user: [{}] }] }] }));
    });

    it('Should get students of school', () => {
      expect.assertions(3);
      return Request.getStudentDataBySchool('m-session-id', 'my-school-id', 'my-user-id').then(
        res => {
          expect(API.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        }
      );
    });
  });
});
