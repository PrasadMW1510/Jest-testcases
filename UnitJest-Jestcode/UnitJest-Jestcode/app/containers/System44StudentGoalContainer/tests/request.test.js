import API from 'utils/request';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  post: jest.fn().mockReturnValue(Promise.resolve()),
  get: jest.fn().mockReturnValue(Promise.resolve()),
  getBaseUrl: jest.fn().mockReturnValue('https://h511000002.education.scholastic.com'),
  getBaseUrlWithoutSlms: jest.fn().mockReturnValue('https://h511000002.education.scholastic.com'),
  xmlToJSON: jest.fn().mockReturnValue({ testdata: 'value' }),
}));

describe('getCombinedStudentGoalsData', () => {
  const testUserId = 'guidTestUser';
  const testSessionId = 'guidSessionId';
  const testData = '<>';
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

  it('should return get Awards Data', () => {
    Request.getCombinedStudentGoalsData(testUserId, testSessionId).then(() => {
      expect(API.post).toHaveBeenCalledWith(
        `${mockSlmsBaseUrl}/S44NG/s44ngProductCtrls.cd`,
        testData,
        {
          params: {
            command: 'GetCombinedStudentGoals',
            user_id: testUserId,
            sid: testSessionId,
          },
        }
      );
    });
  });
});
describe('getAllStudentGoalsData   ', () => {
  const testUserId = 'guidTestUser';
  const testSessionId = 'guidSessionId';
  const testData = '<>';
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

  it('should return get Goals Data', () => {
    Request.getAllStudentGoalsData(testUserId, testSessionId).then(() => {
      expect(API.post).toHaveBeenCalledWith(
        `${mockSlmsBaseUrl}/S44NG/s44ngProductCtrls.cd`,
        testData,
        {
          params: {
            command: 'GetStudentAcademicDefaultGoals',
            user_id: testUserId,
            sid: testSessionId,
          },
        }
      );
    });
  });
});
describe('setStudentAcademicGoals   ', () => {
  const testUserId = 'guidTestUser';
  const testSessionId = 'guidSessionId';
  const testData = '<>';
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

  it('should return get Goals Data', () => {
    Request.setStudentAcademicGoals(testUserId, testSessionId, testData).then(() => {
      expect(API.post).toHaveBeenCalledWith(
        `${mockSlmsBaseUrl}/S44NG/s44ngProductCtrls.cd`,
        testData,
        {
          params: {
            command: 'SetStudentAcademicGoals',
            user_id: testUserId,
            sid: testSessionId,
          },
        }
      );
    });
  });
});
describe('setStudentBehavoiralGoals   ', () => {
  const testUserId = 'guidTestUser';
  const testSessionId = 'guidSessionId';
  const testData = '<>';
  const testIsUpdate = 'isUpdate';
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

  it('should return get Goals Data', () => {
    Request.setStudentBehaviourGoals(testUserId, testSessionId, testIsUpdate, testData).then(() => {
      expect(API.post).toHaveBeenCalledWith(
        `${mockSlmsBaseUrl}/S44NG/s44ngProductCtrls.cd`,
        testData,
        {
          params: {
            command: 'SetStudentBehavioralGoals',
            user_id: testUserId,
            sid: testSessionId,
            is_update: testIsUpdate,
            work_item_id: null,
          },
        }
      );
    });
  });
});
describe('updateStudentBehaviourGoals   ', () => {
  const testUserId = 'guidTestUser';
  const testSessionId = 'guidSessionId';
  const testData = '<>';
  const testIsUpdate = 'isUpdate';
  const testWorkItemId = 'workitemid';
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

  it('should return get Goals Data', () => {
    Request.updateStudentBehaviourGoals(
      testUserId,
      testSessionId,
      testIsUpdate,
      testWorkItemId,
      testData
    ).then(() => {
      expect(API.post).toHaveBeenCalledWith(
        `${mockSlmsBaseUrl}/S44NG/s44ngProductCtrls.cd`,
        testData,
        {
          params: {
            command: 'SetStudentBehavioralGoals',
            user_id: testUserId,
            sid: testSessionId,
            is_update: testIsUpdate,
            work_item_id: testWorkItemId,
          },
        }
      );
    });
  });
});
describe('getStudentSubmissions  ', () => {
  const testCohortId = 'guidTestUser';
  const testSessionId = 'guidSessionId';
  const testData = '<>';
  const communityIds = 'testcommunityid';
  const testCohortType = 'testcohorttype';
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

  it('should return get Goals Data', () => {
    Request.getStudentSubmissions(
      testSessionId,
      testCohortId,
      communityIds,
      testCohortType,
      testData
    ).then(() => {
      expect(API.post).toHaveBeenCalledWith(`/SlmsSdp`, testData, {
        params: {
          command: 'get_student_submissions',
          communityIds,
          cohort_type: testCohortType,
          sid: testSessionId,
          cohort_id: testCohortId,
        },
      });
    });
  });
});
