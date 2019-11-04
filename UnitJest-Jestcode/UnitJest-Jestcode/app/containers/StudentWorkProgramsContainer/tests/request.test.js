import API from 'utils/request';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  post: jest.fn().mockReturnValue(Promise.resolve()),
  get: jest.fn().mockReturnValue(Promise.resolve()),
  getBaseUrl: jest.fn().mockReturnValue('https://h511000002.education.scholastic.com'),
  getBaseUrlWithoutSlms: jest.fn().mockReturnValue('https://h511000002.education.scholastic.com'),
  xmlToJSON: jest.fn().mockReturnValue({ testdata: 'value' }),
}));

describe('getIReadStudentWorkDataRequest', () => {
  const testCohortId = 'guidTestUser';
  const testSessionId = 'guidSessionId';
  const testStudentObj = 'studentobj';
  const mockSlmsBaseUrl = 'https://h511000002.education.scholastic.com';
  beforeEach(() => {
    API.post.mockReturnValue(Promise.resolve());
  });

  jest.mock('utils/request', () => ({
    post: jest.fn().mockReturnValue(Promise.resolve()),
    get: jest.fn().mockReturnValue(Promise.resolve()),
    getBaseUrl: jest.fn().mockReturnValue('https://h511000002.education.scholastic.com'),
    getBaseUrlWithoutSlms: jest.fn().mockReturnValue(mockSlmsBaseUrl),
    xmlToJSON: jest.fn().mockReturnValue({ testdata: 'value' }),
  }));
  jest.mock('axios', () => ({
    get: jest.fn().mockReturnValue(Promise.resolve()),
  }));

  it('should return get Iread Data', () => {
    Request.getIReadStudentWorkDataRequest(testSessionId, testCohortId, testStudentObj).then(() => {
      expect(API.post).toHaveBeenCalledWith(`${mockSlmsBaseUrl}/slms/SlmsSdp`, testStudentObj, {
        params: {
          command: 'get_student_submissions',
          communityIds: 'R180NG,S44NG,S44JR,M180,M180Y2',
          cohort_type: 'teacher',
          sid: testSessionId,
          cohort_id: testCohortId,
        },
      });
    });
  });
});

describe('postIReadStudentWorkDataRequest', () => {
  const testWorkId = 'guidTestUser';
  const testSessionId = 'guidSessionId';
  const testStudentObj = 'studentobj';
  const mockSlmsBaseUrl = 'https://h511000002.education.scholastic.com';
  beforeEach(() => {
    API.post.mockReturnValue(Promise.resolve());
  });

  jest.mock('utils/request', () => ({
    post: jest.fn().mockReturnValue(Promise.resolve()),
    get: jest.fn().mockReturnValue(Promise.resolve()),
    getBaseUrl: jest.fn().mockReturnValue('https://h511000002.education.scholastic.com'),
    getBaseUrlWithoutSlms: jest.fn().mockReturnValue(mockSlmsBaseUrl),
    xmlToJSON: jest.fn().mockReturnValue({ testdata: 'value' }),
  }));
  jest.mock('axios', () => ({
    get: jest.fn().mockReturnValue(Promise.resolve()),
  }));

  it('should return get Iread Data', () => {
    Request.postIReadStudentWorkData(testSessionId, testWorkId, testStudentObj).then(() => {
      expect(API.post).toHaveBeenCalledWith(`${mockSlmsBaseUrl}/slms/SlmsSdp`, testStudentObj, {
        params: {
          command: 'update_class_assignment',
          isStudentWorkItem: true,
          sid: testSessionId,
          workItemId: testWorkId,
        },
      });
    });
  });
});

describe('deleteIReadStudentWorkDataRequest', () => {
  const testWorkId = 'guidTestUser';
  const testSessionId = 'guidSessionId';
  const testStudentObj = 'studentobj';
  const mockSlmsBaseUrl = 'https://h511000002.education.scholastic.com';
  beforeEach(() => {
    API.post.mockReturnValue(Promise.resolve());
  });

  jest.mock('utils/request', () => ({
    post: jest.fn().mockReturnValue(Promise.resolve()),
    get: jest.fn().mockReturnValue(Promise.resolve()),
    getBaseUrl: jest.fn().mockReturnValue('https://h511000002.education.scholastic.com'),
    getBaseUrlWithoutSlms: jest.fn().mockReturnValue(mockSlmsBaseUrl),
    xmlToJSON: jest.fn().mockReturnValue({ testdata: 'value' }),
  }));
  jest.mock('axios', () => ({
    get: jest.fn().mockReturnValue(Promise.resolve()),
  }));

  it('should return get Iread Data', () => {
    Request.delIReadStudentWorkData(testSessionId, testWorkId, testStudentObj).then(() => {
      expect(API.post).toHaveBeenCalledWith(`${mockSlmsBaseUrl}/slms/SlmsSdp`, testStudentObj, {
        params: {
          command: 'delete_class_assignment',
          isStudentWorkItem: true,
          workItemId: testWorkId,
          sid: testSessionId,
        },
      });
    });
  });
});
