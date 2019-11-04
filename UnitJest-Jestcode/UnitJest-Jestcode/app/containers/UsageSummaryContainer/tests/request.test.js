import API from 'utils/request';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  get: jest.fn().mockReturnValue(Promise.resolve()),
}));

describe('Usage Summary', () => {
  describe('stubbing successful response getUsageSummaryDataForTeacher', () => {
    beforeEach(() => {
      API.get.mockReturnValue(
        Promise.resolve({ output_data: [{ Teacher: [{ classes: [{ class: [{}] }] }] }] })
      );
    });

    it('Should get usage summary by session id and userid', () => {
      expect.assertions(3);
      return Request.getUsageSummaryDataForTeacher('dsafasfasdf', 'jsmith').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });

  describe('stubbing successful response getUsageSummaryDataForDistAdmin', () => {
    beforeEach(() => {
      API.get.mockReturnValue(
        Promise.resolve({ output_data: [{ district: [{ schools: [{ school: [{}] }] }] }] })
      );
    });

    it('Should get usage summary by session id and userid', () => {
      expect.assertions(3);
      return Request.getUsageSummaryDataForDistAdmin('abcdefgh', 'xyz').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
  describe('getUsageSummaryDataForDistAdmin', () => {
    beforeEach(() => {
      API.get.mockReturnValue(Promise.resolve({ output_data: [{ school: [{ classes: [{}] }] }] }));
    });

    it('Should get usage summary by sessionId and schoolId', () => {
      expect.assertions(3);
      return Request.getUsageSummaryDataForSchoolAdmin('sabcdefgh', 'xyz').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });

  describe('getClassUsageSummaryData', () => {
    beforeEach(() => {
      API.get.mockReturnValue(
        Promise.resolve({ output_data: [{ class: [{ students: [{ student: [{}] }] }] }] })
      );
    });

    it('Should get usage summary by sessionId, classId', () => {
      expect.assertions(3);
      return Request.getClassUsageSummaryData('sabcdefgh', 'sabcdefgh').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });

  describe('getGradeUsageSummaryData', () => {
    beforeEach(() => {
      API.get.mockReturnValue(Promise.resolve({ output_data: [{ grade: [{ classes: [{}] }] }] }));
    });

    it('Should get usage summary by sessionId, gradeId and schoolId', () => {
      expect.assertions(3);
      return Request.getGradeUsageSummaryData('sabcdefgh', 'sabcdefgh', 'xyz').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });

  describe('getGroupUsageSummaryData', () => {
    beforeEach(() => {
      API.get.mockReturnValue(
        Promise.resolve({ output_data: [{ group: [{ students: [{ student: [{}] }] }] }] })
      );
    });

    it('Should get usage summary by sessionId, gradeId and schoolId', () => {
      expect.assertions(3);
      return Request.getGroupUsageSummaryData('sabcdefgh', 'sabcdefgh').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });

  describe('getStudentUsageSummaryData', () => {
    beforeEach(() => {
      API.get.mockReturnValue(Promise.resolve({ output_data: [{ student: [{}] }] }));
    });

    it('Should get usage summary by sessionId, gradeId and schoolId', () => {
      expect.assertions(3);
      return Request.getStudentUsageSummaryData('sabcdefgh', 'sabcdefgh').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
});
