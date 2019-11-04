import API, { getFormAPIObject } from 'utils/request';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  get: jest.fn().mockReturnValue(
    Promise.resolve({
      pagination_data: [{ current_page: [1] }],
      output_data: [{ teachers: [{}] }],
    })
  ),
  post: jest.fn().mockReturnValue(Promise.resolve()),
  getFormAPIObject: { post: jest.fn().mockReturnValue(Promise.resolve()) },
}));

describe('getTeacherEnrollment', () => {
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
      Request.getTeacherEnrollmentForDistrict('dsafasfasdf', 'jsmith', {}).then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      }));

    it('Should get data for school', () =>
      // expect.assertions(3);
      Request.getTeacherEnrollmentForSchool('dsafasfasdf', 'jsmith', {}).then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      }));

    it('Should get data for grade', () =>
      // expect.assertions(3);
      Request.getTeacherEnrollmentForGrade('dsafasfasdf', 'school-123', 'jsmith', {}).then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      }));

    it('Should get data for teacher', () =>
      // expect.assertions(3);
      Request.getTeacherEnrollmentForTeacher('dsafasfasdf', 'school-123', 'jsmith', {}).then(
        res => {
          expect(API.get).toHaveBeenCalled();
          expect(res).toBeDefined();
          expect(typeof res).toBe('object');
        }
      ));
  });
});

describe('getTeacherAppsUsage', () => {
  describe('stubbing successful response', () => {
    beforeEach(() => {
      API.get.mockReturnValue(Promise.resolve({ output_data: [{ applications: [{}] }] }));
    });

    it('Should get usage summary by session id', () => {
      expect.assertions(3);
      return Request.getTeacherAppsUsage('dsafasfasdf').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
});

describe('getTeacherAppsUsageForSchool', () => {
  describe('stubbing successful response', () => {
    beforeEach(() => {
      API.get.mockReturnValue(Promise.resolve({ output_data: [{ applications: [{}] }] }));
    });

    it('Should get usage summary by session id', () => {
      expect.assertions(3);
      return Request.getTeacherAppsUsageForSchool('dsafasfasdf').then(res => {
        expect(API.get).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });
  });
});

describe('postAssignToClass', () => {
  const payload = {};
  const testSessionId = 'guidSessionId';
  beforeEach(() => {
    getFormAPIObject.post.mockReturnValue(Promise.resolve({}));
  });

  it('Should call API.post, res should be defined, and res should be an object', () => {
    expect.assertions(3);
    return Request.postTeacherEnrollment(testSessionId, payload).then(res => {
      expect(getFormAPIObject.post).toHaveBeenCalled();
      expect(res).toBeDefined();
      expect(typeof res).toBe('object');
    });
  });

  it('should post the assign to class to the server', () =>
    Request.postTeacherEnrollment(testSessionId, {}).then(() => {
      expect(getFormAPIObject.post).toHaveBeenCalledWith(
        '/SlmsApplication',
        {},
        {
          params: {
            command: 'set_enrollment',
            sid: testSessionId,
            license_category: 'Teacher',
          },
        }
      );
    }));
});
