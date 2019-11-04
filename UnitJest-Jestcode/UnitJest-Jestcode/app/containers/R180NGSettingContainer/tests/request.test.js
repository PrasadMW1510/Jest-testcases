import * as API from 'utils/request';
import * as Request from '../request';
jest.mock('utils/request', () => ({
  getBaseUrlWithoutSlmsObject: {
    get: jest.fn().mockReturnValue(Promise.resolve()),
    post: jest.fn().mockReturnValue(Promise.resolve()),
  },
  post: jest.fn().mockReturnValue(Promise.resolve()),
  get: jest.fn().mockReturnValue(Promise.resolve()),
}));
describe('ProgramSettingContainer API Request', () => {
  describe('Program Setting for r180ng Group Data', () => {
    describe('stubbing successful response getProgramSetting Group Data', () => {
      beforeEach(() => {
        API.getBaseUrlWithoutSlmsObject.get.mockReturnValue(
          Promise.resolve({ output: { output_data: [{ group_settings: [{}] }] } })
        );
      });

      it('Should get ProgramSetting', () => {
        expect.assertions(3);
        return Request.getGroupSettingsR180NG('Ab2345', '12345', 'teacher').then(res => {
          expect(API.getBaseUrlWithoutSlmsObject.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });
    });
  });
});
describe('Program Setting for r180ng Group Data', () => {
  describe('stubbing successful response getProgramSetting Group Data', () => {
    beforeEach(() => {
      API.getBaseUrlWithoutSlmsObject.get.mockReturnValue(
        Promise.resolve({ output: { output_data: [{ group_settings: [{}] }] } })
      );
    });

    it('Should get ProgramSetting Grade', () => {
      expect.assertions(3);
      return Request.getGradeSettingsR180NG('Ab2345', '12345', 'teacher', 'school').then(res => {
        expect(API.getBaseUrlWithoutSlmsObject.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
});
describe('Program Setting for Enrollment data for school', () => {
  describe('stubbing successful response getProgramSetting Enrollment Data school', () => {
    beforeEach(() => {
      API.get.mockReturnValue(
        Promise.resolve({
          output_data: [{ applications: [{ application: [{}] }] }],
        })
      );
    });
    it('Should get enrollment class by session id and userid', () => {
      expect.assertions(3);
      return Request.getEnrollmentCountSchool('session', 'id').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
});
describe('Program Setting for Enrollment data for school', () => {
  describe('stubbing successful response getProgramSetting Enrollment Data district', () => {
    beforeEach(() => {
      API.get.mockReturnValue(
        Promise.resolve({
          output_data: [{ applications: [{ application: [{}] }] }],
        })
      );
    });
    it('Should get enrollment class by session id and userid', () => {
      expect.assertions(3);
      return Request.getEnrollmentCountDistrict('session', 'id').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
});
describe('Program Setting for Enrollment data for class', () => {
  describe('stubbing successful response getProgramSetting Enrollment Data Class', () => {
    beforeEach(() => {
      API.get.mockReturnValue(
        Promise.resolve({
          output_data: [{ applications: [{ application: [{}] }] }],
        })
      );
    });
    it('Should get enrollment class by session id and userid', () => {
      expect.assertions(3);
      return Request.getEnrollmentCountClass('session', 'id').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
});
describe('Program Setting for Enrollment data for Grade', () => {
  describe('stubbing successful response getProgramSetting Enrollment Data Class', () => {
    beforeEach(() => {
      API.get.mockReturnValue(
        Promise.resolve({
          output_data: [{ applications: [{ application: [{}] }] }],
        })
      );
    });
    it('Should get enrollment class by session id and userid', () => {
      expect.assertions(3);
      return Request.getEnrollmentCountGrade('session', 'id', 'gradeNo').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
});
describe('Program Setting Enrollment data for Teacher', () => {
  describe('stubbing successful response getProgramSetting Enrollment Data Teacher', () => {
    beforeEach(() => {
      API.get.mockReturnValue(
        Promise.resolve({
          output_data: [{ applications: [{ application: [{}] }] }],
        })
      );
    });

    it('Should get Enrollment Count by session id and userid', () => {
      expect.assertions(3);
      return Request.getEnrollmentCountTeacher('session', 'id').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
});

describe('Program Setting Enrollment data for Group', () => {
  describe('stubbing successful response getProgramSetting Enrollment Data Group', () => {
    beforeEach(() => {
      API.get.mockReturnValue(
        Promise.resolve({
          output_data: [{ applications: [{ application: [{}] }] }],
        })
      );
    });

    it('Should get getEnrollmentCountGroup by session id and userid', () => {
      expect.assertions(3);
      return Request.getEnrollmentCountGroup('session', 'id').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
});

describe('Program Setting Enrollment data for Student', () => {
  describe('stubbing successful response getProgramSetting Enrollment Data Student', () => {
    beforeEach(() => {
      API.get.mockReturnValue(
        Promise.resolve({
          output_data: [{ applications: [{ application: [{}] }] }],
        })
      );
    });

    it('Should get getEnrollmentCountStudent by session id and userid', () => {
      expect.assertions(3);
      return Request.getEnrollmentCountStudent('session', 'id').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
  describe('Program Setting save data for Teacher', () => {
    describe('stubbing successful response save changes', () => {
      beforeEach(() => {
        API.getBaseUrlWithoutSlmsObject.post.mockReturnValue(
          Promise.resolve({ output_data: [{}] })
        );
      });

      it('Should post changes by session id and userid', () => {
        const xml = {};
        expect.assertions(3);
        return Request.postChangeSettingsR180NG('session', { xml }).then(res => {
          expect(API.getBaseUrlWithoutSlmsObject.post).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });
    });
  });
});
