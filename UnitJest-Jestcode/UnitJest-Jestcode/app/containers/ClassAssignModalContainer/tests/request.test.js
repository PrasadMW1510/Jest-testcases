import API from 'utils/request';
import * as Request from '../request';

jest.mock('utils/request', () => ({
  get: jest.fn().mockReturnValue(Promise.resolve()),
  post: jest.fn().mockReturnValue(Promise.resolve()),
}));

describe('ClassAssignModalContainer API request tests', () => {
  const testUserId = 'guidTestUser';
  const testSessionId = 'guidSessionId';
  const testDistrictId = 'guidDistrictId';
  const numPostAssignToClassAssertionsExpected = 3;
  describe('Classes and Groups For Search', () => {
    beforeEach(() => {
      API.get.mockReturnValue(Promise.resolve({ output_data: [{ schools: [{ classes: [{}] }] }] }));
    });

    it('Should get the school search list by session_id and user_id', () =>
      Request.getClassesAndGroupForSearch(testDistrictId, testUserId, testSessionId).then(() =>
        expect(API.get).toHaveBeenCalledWith('/SlmsSearch', {
          params: {
            command: 'get_school_classes_and_groups_for_search',
            district_id: testDistrictId,
            user_id: testUserId,
            sid: testSessionId,
          },
        })
      ));
  });

  describe('postAssignToClass', () => {
    const payload = {};
    beforeEach(() => {
      API.post.mockReturnValue(
        Promise.resolve({ output_data: [{ results: [{ more_results: [{}] }] }] })
      );
    });

    it('Should call API.post, res should be defined, and res should be an object', () => {
      expect.assertions(numPostAssignToClassAssertionsExpected);
      return Request.postAssignToClass(testSessionId, payload).then(res => {
        expect(API.post).toHaveBeenCalled();
        expect(res).toBeDefined();
        expect(typeof res).toBe('object');
      });
    });

    it('should post the assign to class to the server', () =>
      Request.postAssignToClass(testSessionId, {}).then(() => {
        expect(API.post).toHaveBeenCalledWith(
          '/SlmsStudent',
          {},
          {
            params: {
              command: 'add_classes_and_groups',
              sid: testSessionId,
            },
          }
        );
      }));
  });
});
