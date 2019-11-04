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
    const distId = {
      dist_id: 'hhh_iii',
    };
    beforeEach(() => {
      API.post.mockReturnValue(Promise.resolve({}));
    });

    it('should call API.post, res should be defined, and res should be an object', () => {
      expect.assertions(3);
      return Request.getPortfolioClassData(
        'sessionid-123',
        'user_id',
        distId.dist_id,
        'mockMessageXML'
      ).then(res => {
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
        schoolid: ['1'],
      };
      expect.assertions(3);
      return Request.getPortfolioGradeData(
        'sessionid-123',
        'userid',
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
        'userid',
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
        teacherId: ['2'],
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
        'userid',
        classId,
        'mockMessageXML'
      ).then(res => {
        expect(API.post).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
  describe('stubbing successful response for getPortfolioStudentTreeData', () => {
    beforeEach(() => {
      API.post.mockReturnValue(Promise.resolve({}));
    });

    it('should call API.post, res should be defined, and res should be an object', () => {
      const classId = {
        data: ['3'],
      };
      expect.assertions(3);
      return Request.getPortfolioStudentTreeData('sessionid-123', classId, 'mockMessageXML').then(
        res => {
          expect(API.post).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        }
      );
    });
  });
  describe('stubbing successful response for getStudentSubmissionNodeRequest', () => {
    beforeEach(() => {
      API.post.mockReturnValue(Promise.resolve({}));
    });

    it('should call API.post, res should be defined, and res should be an object', () => {
      const studentId = {};
      expect.assertions(3);
      return Request.getStudentSubmissionNodeRequest(
        'sessionid-123',
        'userid',
        studentId,
        'mockMessageXML'
      ).then(res => {
        expect(API.post).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
});
