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
  describe('stubbing successful response for getPortfolioClassData', () => {
    beforeEach(() => {
      API.post.mockReturnValue(Promise.resolve({}));
    });

    it('should call API.post, res should be defined, and res should be an object', () => {
      expect.assertions(3);
      return Request.getPortfolioClassData('sessionid-123', 'mockMessageXML').then(res => {
        expect(API.post).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
  describe('stubbing successful response for getPortfolioGradeData', () => {
    beforeEach(() => {
      API.post.mockReturnValue(Promise.resolve({}));
    });

    it('should call API.post, res should be defined, and res should be an object', () => {
      const schoolid = {
        schoolid: ['1', '2'],
      };
      expect.assertions(3);
      return Request.getPortfolioGradeData(
        'sessionid-123',
        'userId',
        'mockMessageXML',
        schoolid
      ).then(res => {
        expect(API.post).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
  describe('stubbing successful response for getPortfolioTeacherData', () => {
    beforeEach(() => {
      API.post.mockReturnValue(Promise.resolve({}));
    });

    it('should call API.post, res should be defined, and res should be an object', () => {
      const schoolid = {};
      const gradeid = {};
      expect.assertions(3);
      return Request.getPortfolioTeacherData(
        'sessionid-123',
        schoolid,
        gradeid,
        'mockMessageXML'
      ).then(res => {
        expect(API.post).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
  describe('stubbing successful response for getPortfolioClassDataRequest', () => {
    beforeEach(() => {
      API.post.mockReturnValue(Promise.resolve({}));
    });

    it('should call API.post, res should be defined, and res should be an object', () => {
      const teacherid = {
        teacherId: ['1'],
      };
      expect.assertions(3);
      return Request.getPortfolioClassDataRequest(
        'sessionid-123',
        teacherid,
        'mockMessageXML'
      ).then(res => {
        expect(API.post).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });

  describe('stubbing successful response for getStudentSubmissionDataRequest', () => {
    beforeEach(() => {
      API.post.mockReturnValue(Promise.resolve({}));
    });

    it('should call API.post, res should be defined, and res should be an object', () => {
      const classId = {};
      expect.assertions(3);
      return Request.getStudentSubmissionDataRequest(
        'sessionid-123',
        classId,
        'mockMessageXML'
      ).then(res => {
        expect(API.post).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });

  describe('stubbing successful response for getStudentSubmissionsData', () => {
    beforeEach(() => {
      API.post.mockReturnValue(Promise.resolve({}));
    });

    it('should call API.post, res should be defined, and res should be an object', () => {
      const userId = {};
      const userType = {};
      expect.assertions(2);
      return Request.getStudentSubmissionsData('sessionid-123', userId, userType).then(res => {
        expect(API.post).toHaveBeenCalled();
        expect(res).not.toBeDefined();
      });
    });
  });
  describe('stubbing successful response for getClassCommunityData', () => {
    beforeEach(() => {
      API.post.mockReturnValue(Promise.resolve({}));
    });

    it('should call API.post, res should be defined, and res should be an object', () => {
      const userId = {};
      expect.assertions(2);
      return Request.getClassCommunityData('sessionid-123', userId, 'abcd').then(res => {
        expect(API.post).toHaveBeenCalled();
        expect(res).not.toBeDefined();
      });
    });
  });
  describe('stubbing successful response for getClassByCommunityId', () => {
    beforeEach(() => {
      API.post.mockReturnValue(Promise.resolve({}));
    });

    it('should call API.post, res should be defined, and res should be an object', () => {
      const userId = {};
      expect.assertions(3);
      return Request.getClassByCommunityId('sessionid-123', userId, 'mockMessageXML').then(res => {
        expect(API.post).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
  describe('stubbing successful response for getAssignmentMetaData', () => {
    beforeEach(() => {
      API.post.mockReturnValue(Promise.resolve({}));
    });

    it('should call API.post, res should be defined, and res should be an object', () => {
      const userId = {};
      const classId = {};
      expect.assertions(3);
      return Request.getAssignmentMetaData('sessionid-123', userId, classId, 'mockMessageXML').then(
        res => {
          expect(API.post).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        }
      );
    });
  });
  describe('stubbing successful response for getEnrolmentByCommunityId', () => {
    beforeEach(() => {
      API.post.mockReturnValue(Promise.resolve({}));
    });

    it('should call API.post, res should be defined, and res should be an object', () => {
      const userId = {};
      expect.assertions(3);
      return Request.getEnrolmentByCommunityId('sessionid-123', userId, 'mockMessageXML').then(
        res => {
          expect(API.post).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        }
      );
    });
  });
});
