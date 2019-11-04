import API, { getFormAPIObject } from 'utils/request';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  get: jest.fn().mockReturnValue(Promise.resolve()),
  post: jest.fn().mockReturnValue(Promise.resolve()),
  getFormAPIObject: { post: jest.fn().mockReturnValue(Promise.resolve()) },
}));

describe('AddEditSchool API request', () => {
  const numAssertionsExpected = 3;
  const testDistrictId = 'guidTestDistrict';
  const testSessionId = 'guidSessionId';

  describe('Grade list for district', () => {
    describe('stubbing successful response', () => {
      beforeEach(() => {
        API.get.mockReturnValue(Promise.resolve({ output_data: [{ grades: [{ grade: [{}] }] }] }));
      });

      it('Should get the grade list by session_id and district_id', () => {
        expect.assertions(numAssertionsExpected);
        return Request.getGradeListForDistrict(testSessionId, testDistrictId).then(res => {
          expect(API.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });
    });
  });

  describe('postAddSchool', () => {
    describe('stubbing successful response', () => {
      beforeEach(() => {
        getFormAPIObject.post.mockReturnValue(Promise.resolve({ output_data: [{ test: 'test' }] }));
      });
      it('should call API.post, res should be defined, and res should be an object', () => {
        expect.assertions(3);
        return Request.postAddSchool(testSessionId, 'mockMessageXML').then(res => {
          expect(getFormAPIObject.post).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });
    });
  });

  describe('postEditSchool', () => {
    describe('stubbing successful response', () => {
      beforeEach(() => {
        getFormAPIObject.post.mockReturnValue(Promise.resolve({ output_data: [{ test: 'test' }] }));
      });
      it('should call API.post, res should be defined, and res should be an object', () => {
        expect.assertions(3);
        return Request.postEditSchool(testSessionId, 'mockMessageXML').then(res => {
          expect(getFormAPIObject.post).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });
    });
  });
});
