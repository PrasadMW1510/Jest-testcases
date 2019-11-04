import API from 'utils/request';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  get: jest.fn().mockReturnValue(Promise.resolve()),
  post: jest.fn().mockReturnValue(Promise.resolve()),
}));

describe('SearchModalContainer API request', () => {
  const numAssertionsExpected = 3;
  const testUserId = 'guidTestUser';
  const testSessionId = 'guidSessionId';
  describe('School List For Search', () => {
    describe('stubbing successful resonse', () => {
      beforeEach(() => {
        API.get.mockReturnValue(
          Promise.resolve({ output_data: [{ schools: [{ school: [{}] }] }] })
        );
      });

      it('Should get the school search list by session_id and user_id', () => {
        expect.assertions(numAssertionsExpected);
        return Request.getSchoolListForSearch(testSessionId, testUserId).then(res => {
          expect(API.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });
    });
  });

  describe('Apps for search', () => {
    describe('stubbing successful response', () => {
      beforeEach(() => {
        API.get.mockReturnValue(Promise.resolve({ output_data: [{ server_assets: [{}] }] }));
      });

      it('Should call API.get, res should be defined, and res should be an object', () => {
        expect.assertions(numAssertionsExpected);
        return Request.getAppsForSearch(testSessionId).then(res => {
          expect(API.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });
    });
  });

  describe('Classes for search', () => {
    describe('stubbing successful response', () => {
      beforeEach(() => {
        API.get.mockReturnValue(Promise.resolve({ output_data: [{ classes: [{}] }] }));
      });

      it('Should call API.get, res should be defined, and res should be an object', () => {
        expect.assertions(numAssertionsExpected);
        return Request.getClassesForSearch(testSessionId, testUserId).then(res => {
          expect(API.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });
    });
  });

  describe('Teachers for search', () => {
    describe('stubbing successful response', () => {
      beforeEach(() => {
        API.get.mockReturnValue(Promise.resolve({ output_data: [{ teachers: [{}] }] }));
      });

      it('Should call API.get, res should be defined, and res should be an object', () => {
        expect.assertions(numAssertionsExpected);
        return Request.getTeachersForSearch(testSessionId, testUserId).then(res => {
          expect(API.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });
    });
  });

  describe('Grades for search', () => {
    describe('stubbing successful response', () => {
      beforeEach(() => {
        API.get.mockReturnValue(Promise.resolve({ output_data: [{ grades: [{}] }] }));
      });

      it('Should call API.get, res should be defined, and res should be an object', () => {
        expect.assertions(numAssertionsExpected);
        return Request.getGradesForSearch(testSessionId, testUserId).then(res => {
          expect(API.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });
    });
  });

  describe('Get Search results', () => {
    describe('stubbing successful response', () => {
      beforeEach(() => {
        API.post.mockReturnValue(
          Promise.resolve({ output_data: [{ search_results: [{ students: [{}] }] }] })
        );
      });

      it('Should call API.post, res should be defined, and res should be an object', () => {
        expect.assertions(numAssertionsExpected);
        return Request.getStudentSearchResults(testSessionId, testUserId).then(res => {
          expect(API.post).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });
    });
  });

  describe('Get Teacher Search results', () => {
    beforeEach(() => {
      API.post.mockReturnValue(
        Promise.resolve({ output_data: [{ search_results: [{ teachers: [{}] }] }] })
      );
    });

    it('Should call API.post for teacher, res should be defined, and res should be an object', () => {
      expect.assertions(numAssertionsExpected);
      return Request.getTeacherSearchResults(testSessionId, testUserId).then(res => {
        expect(API.post).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
});
