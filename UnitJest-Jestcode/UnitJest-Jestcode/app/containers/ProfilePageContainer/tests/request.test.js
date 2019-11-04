import API from 'utils/request';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  get: jest.fn().mockReturnValue(Promise.resolve()),
}));

describe('Profile in Roster Page', () => {
  describe('stubbing successful response getStudentProfilePageData', () => {
    beforeEach(() => {
      API.get.mockReturnValue(Promise.resolve({ output_data: [{ user: [{}] }] }));
    });

    it('Should get profile information by session id and userid', () => {
      expect.assertions(3);
      return Request.getStudentProfilePageData('abcdefgh', 'xyz').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });

  describe('getGroupProfilePageData', () => {
    beforeEach(() => {
      API.get.mockReturnValue(Promise.resolve({ output_data: [{ group: [{}] }] }));
    });

    it('Should get profile information by sessionId, groupId', () => {
      expect.assertions(3);
      return Request.getGroupProfilePageData('sabcdefgh', 'sabcdefgh').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });

  describe('getTeacherProfilePageData', () => {
    beforeEach(() => {
      API.get.mockReturnValue(Promise.resolve({ output_data: [{ user: [{}] }] }));
    });

    it('Should get profile information by sessionId, teacherId', () => {
      expect.assertions(3);
      return Request.getTeacherProfilePageData('sabcdefgh', 'sabcdefgh').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });

  describe('getSchoolProfilePageData', () => {
    beforeEach(() => {
      API.get.mockReturnValue(Promise.resolve({ output_data: [{ organization: [{}] }] }));
    });

    it('Should get profile information by sessionId, groupId', () => {
      expect.assertions(3);
      return Request.getSchoolProfilePageData('sabcdefgh', 'sabcdefgh').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });

  describe('getClassDetails', () => {
    beforeEach(() => {
      API.get.mockReturnValue(Promise.resolve({ output_data: [{ class: [{}] }] }));
    });

    it('Should get profile information by sessionId, classId', () => {
      expect.assertions(3);
      return Request.getClassDetails('sabcdefgh', 'sabcdefgh').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });

  describe('getTeachersByGrade', () => {
    beforeEach(() => {
      API.get.mockReturnValue(Promise.resolve({ item_count: [{}] }));
    });

    it('Should get profile information by sessionId, teacherId', () => {
      expect.assertions(3);
      return Request.getTeachersByGrade('sabcdefgh', 'sabcdefgh').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });

  describe('getClassByGrade', () => {
    beforeEach(() => {
      API.get.mockReturnValue(Promise.resolve({ item_count: [{}] }));
    });

    it('Should get profile information by sessionId, teacherId', () => {
      expect.assertions(3);
      return Request.getClassByGrade('sabcdefgh', 'sabcdefgh').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });

  describe('getStudentsByGrade', () => {
    beforeEach(() => {
      API.get.mockReturnValue(Promise.resolve({ item_count: [{}] }));
    });

    it('Should get profile information by sessionId, teacherId', () => {
      expect.assertions(3);
      return Request.getStudentsByGrade('sabcdefgh', 'sabcdefgh').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });

  describe('getProfileForDistrictAdmin', () => {
    beforeEach(() => {
      API.get.mockReturnValue(Promise.resolve({ output_data: [{ organization: [{}] }] }));
    });

    it('Should get profile information by sessionId, districtId', () => {
      expect.assertions(3);
      return Request.getProfileForDistrictAdmin('sabcdefgh', 'sabcdefgh').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });

  describe('getProfileForSchoolAdmin', () => {
    beforeEach(() => {
      API.get.mockReturnValue(Promise.resolve({ output_data: [{ organization: [{}] }] }));
    });

    it('Should get profile information by sessionId, schoolId', () => {
      expect.assertions(3);
      return Request.getProfileForSchoolAdmin('sabcdefgh', 'sabcdefgh').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
});
