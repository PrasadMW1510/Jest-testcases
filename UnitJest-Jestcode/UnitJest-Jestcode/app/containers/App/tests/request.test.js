/**
 * Created by luib <Brian.Lui@hmhco.com> on 12/4/17.
 *
 * Test the Global API functions
 */

import API, { getFormAPIObject, getBaseUrlWithoutSlmsObject } from 'utils/request';
import * as Request from '../request';

// mock out the API module and define implementation later
jest.mock('utils/request', () => ({
  get: jest.fn().mockReturnValue(Promise.resolve()),
  getFormAPIObject: { post: jest.fn().mockReturnValue(Promise.resolve()) },
  getBaseUrlWithoutSlmsObject: {
    get: jest.fn().mockReturnValue(Promise.resolve()),
    post: jest.fn().mockReturnValue(Promise.resolve()),
  },
}));

describe('Global API Request', () => {
  describe('Login', () => {
    describe('stubbing successful response', () => {
      beforeEach(() => {
        API.get.mockReturnValue(Promise.resolve({ output_data: [{ login: [{}] }] }));
      });

      it('should call axios, xml2js, and lodash to produce a valid JSON object', () => {
        expect.assertions(3);
        return Request.getLoginData('jsmith', 'testpw').then(res => {
          expect(API.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });
    });
  });

  describe('SSO Login', () => {
    describe('stubbing successful response', () => {
      beforeEach(() => {
        API.get.mockReturnValue(Promise.resolve({ output_data: [{ login: [{}] }] }));
      });

      it('should call axios, xml2js, and lodash to produce a valid JSON object', () => {
        expect.assertions(3);
        return Request.getLoginDataSLMSID('jsdfa123wd').then(res => {
          expect(API.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });
    });
  });

  describe('Profile', () => {
    describe('stubbing successful response', () => {
      beforeEach(() => {
        API.get.mockReturnValue(Promise.resolve({ output_data: [{ user: [{}] }] }));
      });

      it('should call axios, xml2js, and lodash to produce a valid JSON object', () => {
        expect.assertions(3);
        return Request.getProfileData('dskflanlja', 'jdoe').then(res => {
          expect(API.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });
    });
  });

  describe('Class List', () => {
    describe('stubbing successful response', () => {
      beforeEach(() => {
        API.get.mockReturnValue(Promise.resolve({ output_data: [{ classes: [{ class: {} }] }] }));
      });

      it('should get class data by teacher', () => {
        expect.assertions(3);
        return Request.getClassData('asdfa123aa', 'schoolid', 'jdoe').then(res => {
          expect(API.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });

      it('should get class data by school', () => {
        expect.assertions(3);
        return Request.getClassDataBySchool('asdfa123aa', 'schoolid').then(res => {
          expect(API.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });

      it('should get class data by grade and school', () => {
        expect.assertions(3);
        return Request.getClassDataByGradeSchool('asdfa123aa', 'schoolid', 'gradeid').then(res => {
          expect(API.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });
    });
  });

  describe('School', () => {
    describe('stubbing successful response', () => {
      beforeEach(() => {
        API.get.mockReturnValue(
          Promise.resolve({ output_data: [{ organizations: [{ organization: [{}] }] }] })
        );
      });

      it('Should get school by session id and userid', () => {
        expect.assertions(3);
        return Request.getSchoolData('dsafasfasdf', 'jsmith').then(res => {
          expect(API.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });

      it('Should get school data by district', () => {
        expect.assertions(3);
        return Request.getSchoolDataByDistrict('dsafasfasdf', 'dasdfasfa').then(res => {
          expect(API.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });
    });
  });

  describe('Group', () => {
    describe('stubbing successful response', () => {
      beforeEach(() => {
        API.get.mockReturnValue(Promise.resolve({ output_data: [{ groups: [{ group: [{}] }] }] }));
      });

      it('Should get group by sessionId, schoolId, and userId', () => {
        expect.assertions(3);
        return Request.getGroupDataBySchool('dsafasfasdf', 'asdfas', 'jsmith').then(res => {
          expect(API.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });

      it('Should get group by sessionId and class id', () => {
        expect.assertions(3);
        return Request.getGroupDataByClass('dsafasfasdf', 'asdfas').then(res => {
          expect(API.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });
    });
  });

  describe('Student', () => {
    describe('stubbing successful response', () => {
      beforeEach(() => {
        API.get.mockReturnValue(Promise.resolve({ output_data: [{ users: [{ user: [{}] }] }] }));
      });

      it('Should get student by session id and userid', () => {
        expect.assertions(3);
        return Request.getStudentDataBySchool('dsafasfasdf', 'jsmith', 'aza').then(res => {
          expect(API.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });

      it('Should get student by session id and class id', () => {
        expect.assertions(3);
        return Request.getStudentDataByClass('dsafasfasdf', 'asdfas').then(res => {
          expect(API.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });

      it('Should get student by session id and group id', () => {
        expect.assertions(3);
        return Request.getStudentDataByGroup('dsafasfasdf', 'asdfas').then(res => {
          expect(API.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });

      it('Should get student by grade id and school id', () => {
        expect.assertions(3);
        return Request.getStudentDataByGradeSchool('dsafasfasdf', 'asdfas', 'asdfasdfa').then(
          res => {
            expect(API.get).toHaveBeenCalled();
            expect(res).toBeDefined();
            expect(typeof res).toBe('object');
          }
        );
      });
    });
  });

  describe('Grade', () => {
    describe('stubbing successful response', () => {
      beforeEach(() => {
        API.get.mockReturnValue(Promise.resolve({ output_data: [{ grades: [{ grade: [{}] }] }] }));
      });

      it('Should get grade by session id and school id', () => {
        expect.assertions(3);
        return Request.getGradeDataBySchool('dsafasfasdf', 'adsfads').then(res => {
          expect(API.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });
    });
  });

  describe('Teacher', () => {
    describe('stubbing successful response', () => {
      beforeEach(() => {
        API.get.mockReturnValue(Promise.resolve({ output_data: [{ users: [{ user: [{}] }] }] }));
      });

      it('Should get teacher by session id and school id', () => {
        expect.assertions(3);
        return Request.getTeacherDataBySchool('dsafasfasdf', 'adsfads').then(res => {
          expect(API.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });

      it('Should get teacher by session id, school id, grade id', () => {
        expect.assertions(3);
        return Request.getTeacherDataByGradeSchool('dsafasfasdf', 'adsfads').then(res => {
          expect(API.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        });
      });
    });
  });

  describe('Program Available Bar', () => {
    describe('stubbing successful response', () => {
      beforeEach(() => {
        API.get.mockReturnValue(
          Promise.resolve({ output_data: [{ server_assets: [{ application: [{}] }] }] })
        );
      });

      it('should call axios, xml2js, and lodash to produce a valid JSON object', () =>
        Request.getProgramList('ggg').then(res => {
          expect(API.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        }));
    });
  });

  describe('getPermissions', () => {
    beforeEach(() => {
      API.get.mockReturnValue(
        Promise.resolve({ output_data: [{ permissions: [{ permission: {} }] }] })
      );
    });

    it('should call axios, xml2js, and lodash to produce a valid JSON object', () =>
      Request.getPermissions('abc', '123').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      }));
  });

  describe('getPasswordConfig', () => {
    beforeEach(() => {
      API.get.mockReturnValue(
        Promise.resolve({ output_data: [{ password_config: [{ password: 123 }] }] })
      );
    });

    it('should call axios, xml2js, and lodash to produce a valid JSON object', () =>
      Request.getPasswordConfig('abc').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      }));
  });

  describe('postUpdateSLMSAccount', () => {
    beforeEach(() => {
      getFormAPIObject.post.mockReturnValue(Promise.resolve({ output_data: [{ test: 'test' }] }));
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should call axios, xml2js, and lodash to produce a valid JSON object', () =>
      Request.postUpdateSLMSAccount('abc', '123').then(res => {
        expect(getFormAPIObject.post).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      }));
  });

  describe('postAddSLMSAccount', () => {
    beforeEach(() => {
      getFormAPIObject.post.mockReturnValue(
        Promise.resolve({
          output_data: [{ test: 'test' }],
        })
      );
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should call correctly', () => {
      const sessionId = 'sss';
      const adminData = { user_type: 'Adminstrator' };
      Request.postAddSLMSAccount(sessionId, adminData).then(() => {
        expect(getFormAPIObject.post).toHaveBeenCalledWith('/SlmsAccount', adminData, {
          params: {
            command: 'add',
            sid: sessionId,
          },
        });
      });
    });
  });

  describe('getSchoolsAndClasses', () => {
    beforeEach(() => {
      API.get.mockReturnValue(
        Promise.resolve({ output_data: [{ schools: [{ classes: 'classesMock' }] }] })
      );
    });

    it('should call axios, xml2js, and lodash to produce a valid JSON object', () =>
      Request.getSchoolsAndClasses('mockSessionId', 'mockUserId', 'mockDistrictId').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      }));
  });

  describe('genericGetAPICall', () => {
    beforeEach(() => {
      API.get.mockReturnValue(Promise.resolve({ output_data: [{ mockData: 'mockOutputData' }] }));
    });

    it('should call axios, xml2js, and lodash to produce a valid JSON object', () =>
      Request.genericGetAPICall('/mockURL', { params: 'mockParams' }).then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      }));
  });

  describe('genericNonSLMSGetAPICall', () => {
    beforeEach(() => {
      getBaseUrlWithoutSlmsObject.get.mockReturnValue(
        Promise.resolve({ output_data: [{ mockData: 'mockOutputData' }] })
      );
    });

    it('should call axios, xml2js, and lodash to produce a valid JSON object', () =>
      Request.genericNonSLMSGetAPICall('/mockURL', { params: 'mockParams' }).then(res => {
        expect(getBaseUrlWithoutSlmsObject.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      }));
  });

  describe('genericNonSLMSPostAPICall', () => {
    beforeEach(() => {
      getBaseUrlWithoutSlmsObject.post.mockReturnValue(
        Promise.resolve({ output_data: [{ mockData: 'mockOutputData' }] })
      );
    });

    it('should call axios, xml2js, and lodash to produce a valid JSON object', () =>
      Request.genericNonSLMSPostAPICall(
        '/mockURL',
        { params: 'mockParams' },
        { postData: 'mockPostData' }
      ).then(res => {
        expect(getBaseUrlWithoutSlmsObject.post).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      }));
  });
});
