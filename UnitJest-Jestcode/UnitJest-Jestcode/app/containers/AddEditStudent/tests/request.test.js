import API, { getFormAPIObject } from 'utils/request';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  get: jest.fn().mockReturnValue(Promise.resolve()),
  post: jest.fn().mockReturnValue(Promise.resolve()),
  getFormAPIObject: { post: jest.fn().mockReturnValue(Promise.resolve()) },
}));

describe('calls', () => {
  describe('stubbing successful response for postAddStudent', () => {
    beforeEach(() => {
      getFormAPIObject.post.mockReturnValue(Promise.resolve({ output_data: [{}] }));
    });
    it('should call getFormAPIObject.post, res should be defined, and res should be an object', () =>
      Request.postAddStudent('sessionid-123', { first_name: 'Mock Student' }).then(res => {
        expect(getFormAPIObject.post).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      }));
  });
  describe('stubbing successful response for postEditStudent', () => {
    beforeEach(() => {
      getFormAPIObject.post.mockReturnValue(Promise.resolve({ output_data: [{}] }));
    });

    it('should call getFormAPIObject.post, res should be defined, and res should be an object', () =>
      Request.postEditStudent('sessionid-123', { first_name: 'Mock Student' }).then(res => {
        expect(getFormAPIObject.post).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      }));
  });
  describe('stubbing successful response for getting group data', () => {
    beforeEach(() => {
      API.get.mockReturnValue(Promise.resolve({ output_data: [{ groups: [{ group: [{}] }] }] }));
    });

    it('Should get groups of school', () => {
      expect.assertions(3);
      return Request.getGroupDataBySchool('m-session-id', 'my-school-id').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
});
