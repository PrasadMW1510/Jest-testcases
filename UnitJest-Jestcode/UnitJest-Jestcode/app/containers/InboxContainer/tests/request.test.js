import API from 'utils/request';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  post: jest.fn().mockReturnValue(Promise.resolve()),
  get: jest.fn().mockReturnValue(Promise.resolve()),
  getBaseUrlWithoutSlms: jest.fn().mockReturnValue('https://h511000002.education.scholastic.com'),
  xmlToJSON: jest.fn().mockReturnValue({ testdata: 'value' }),
}));
jest.mock('axios', () => ({
  get: jest.fn().mockReturnValue(Promise.resolve()),
}));

describe('calls', () => {
  describe('getInBoxGridRequest ', () => {
    beforeEach(() => {
      API.post.mockReturnValue(Promise.resolve({}));
    });

    it('should call API.post, res should be defined, and res should be an object', () => {
      expect.assertions(3);
      return Request.getInBoxGridRequest('sessionid-123', 'mockMessageXML').then(res => {
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

    it('getStudentSubmissionDataRequest ', () => {
      const schoolid = {
        schoolid: ['1', '2'],
      };
      expect.assertions(3);
      return Request.getStudentSubmissionDataRequest(
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

    it('getPortfolioStudentTreeData ', () => {
      const classId = {
        data: [],
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
  describe('stubbing successful response for getPortfolioClassDataRequest', () => {
    beforeEach(() => {
      API.post.mockReturnValue(Promise.resolve({}));
    });

    it('getStudentListClassData ', () => {
      const teacherid = {
        teacherId: ['1'],
      };
      expect.assertions(3);
      return Request.getStudentListClassData('sessionid-123', teacherid, 'mockMessageXML').then(
        res => {
          expect(API.post).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        }
      );
    });
  });
});
