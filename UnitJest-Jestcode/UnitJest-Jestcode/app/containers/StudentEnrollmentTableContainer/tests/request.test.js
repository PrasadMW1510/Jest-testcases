import API from 'utils/request';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  get: jest.fn().mockReturnValue(
    Promise.resolve({
      pagination_data: [{ current_page: [1] }],
      output_data: [{ teachers: [{}] }],
    })
  ),
  post: jest.fn().mockReturnValue(Promise.resolve()),
}));

describe('getStudentEnrollment', () => {
  describe('stubbing successful response', () => {
    beforeEach(() => {
      API.get.mockReturnValue(
        Promise.resolve({
          pagination_data: [{ current_page: [1] }],
          output_data: [{ teachers: [{}] }],
        })
      );
    });

    it('Should get data for district', () =>
      // expect.assertions(3);
      Request.getStudentEnrollmentForDistrict('dsafasfasdf', 'jsmith', {}).then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      }));

    it('Should get data for school', () =>
      // expect.assertions(3);
      Request.getStudentEnrollmentForSchool('dsafasfasdf', 'jsmith', {}).then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      }));

    it('Should get data for grade', () =>
      // expect.assertions(3);
      Request.getStudentEnrollmentForGrade('dsafasfasdf', 'school-123', 'jsmith', {}).then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      }));

    it('Should get data for teacher', () =>
      // expect.assertions(3);
      Request.getStudentEnrollmentForTeacher('dsafasfasdf', 'school-123', 'jsmith', {}).then(
        res => {
          expect(API.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        }
      ));

    it('Should get data for class', () =>
      // expect.assertions(3);
      Request.getStudentEnrollmentForClass('dsafasfasdf', 'school-123', 'jsmith', {}).then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      }));

    it('Should get data for group', () =>
      // expect.assertions(3);
      Request.getStudentEnrollmentForGroup('dsafasfasdf', 'school-123', 'jsmith', {}).then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      }));

    it('Should get data for student', () =>
      // expect.assertions(3);
      Request.getStudentEnrollmentForStudent('dsafasfasdf', 'school-123', 'jsmith', {}).then(
        res => {
          expect(API.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        }
      ));
  });
});

describe('getStudentAppsUsage', () => {
  describe('stubbing successful response', () => {
    beforeEach(() => {
      API.get.mockReturnValue(Promise.resolve({ output_data: [{ applications: [{}] }] }));
    });

    it('Should get apps usage by session id', () => {
      expect.assertions(3);
      return Request.getStudentAppsUsage('dsafasfasdf').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
});

describe('getStudentAppsUsageForSchool', () => {
  describe('stubbing successful response', () => {
    beforeEach(() => {
      API.get.mockReturnValue(Promise.resolve({ output_data: [{ applications: [{}] }] }));
    });

    it('Should get usage summary by session id', () => {
      expect.assertions(3);
      return Request.getStudentAppsUsageForSchool('dsafasfasdf').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
});

describe('postStudentEnrollment', () => {
  const payload = {};
  const testSessionId = 'guidSessionId';
  beforeEach(() => {
    API.post.mockReturnValue(Promise.resolve({}));
  });

  it('Should call API.post, res should be defined, and res should be an object', () => {
    expect.assertions(3);
    return Request.postStudentEnrollment(testSessionId, payload).then(res => {
      expect(API.post).toHaveBeenCalled();
      expect(res).toBeDefined();
      expect(typeof res).toBe('object');
    });
  });

  it('should post the assign to class to the server', () =>
    Request.postStudentEnrollment(testSessionId, {}).then(() => {
      expect(API.post).toHaveBeenCalledWith(
        '/SlmsApplication',
        {},
        {
          params: {
            command: 'set_enrollment',
            sid: testSessionId,
          },
        }
      );
    }));
});

describe('getSamCentralStatus', () => {
  describe('stubbing successful response', () => {
    beforeEach(() => {
      API.get.mockReturnValue(Promise.resolve({ output_data: [{ samCentralStatus: [{}] }] }));
    });

    it('Should get sam central status by session id', () => {
      expect.assertions(3);
      return Request.getSamCentralStatus('dsafasfasdf').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
});

describe('getListOfStudentsEnrollment', () => {
  describe('stubbing successful response', () => {
    beforeEach(() => {
      API.get.mockReturnValue(Promise.resolve({ output_data: [{ applications: [{}] }] }));
    });

    it('Should get list of students enrolled by session id', () => {
      expect.assertions(3);
      return Request.getListOfStudentsEnrollment('dsafasfasdf').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
});

describe('getEnrollmentMigration', () => {
  const payload = {};
  const testSessionId = 'guidSessionId';
  beforeEach(() => {
    API.post.mockReturnValue(Promise.resolve({}));
  });

  it('Should call API.post, res should be defined, and res should be an object', () => {
    expect.assertions(3);
    return Request.getEnrollmentMigration(testSessionId, payload).then(res => {
      expect(API.post).toHaveBeenCalled();
      expect(res).toBeDefined();
      expect(typeof res).toBe('object');
    });
  });

  it('should post the assign to class to the server', () =>
    Request.getEnrollmentMigration(testSessionId, {}).then(() => {
      expect(API.post).toHaveBeenCalledWith(
        '/SlmsApplication',
        {},
        {
          params: {
            command: 'get_enrollment_migration',
            sid: testSessionId,
          },
        }
      );
    }));
});
