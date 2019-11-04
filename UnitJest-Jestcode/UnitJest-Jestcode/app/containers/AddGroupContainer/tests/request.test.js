import API, { getFormAPIObject } from 'utils/request';
import * as Request from '../request';

// mock out the API module and define implementation later
jest.mock('utils/request', () => ({
  get: jest.fn().mockReturnValue(Promise.resolve()),
  getFormAPIObject: { post: jest.fn().mockReturnValue(Promise.resolve()) },
}));

describe('Add A Group teacher request', () => {
  beforeEach(() => {
    API.get.mockReturnValue(Promise.resolve({ output_data: [{ classes: [{ class: {} }] }] }));
    getFormAPIObject.post.mockReturnValue(Promise.resolve({ output_data: [{ classes: [] }] }));
  });

  it('should get class data by teacher', () => {
    expect.assertions(3);
    return Request.getClassDataWithStudents('asdfa123aa', 'schoolid', 'jdoe').then(res => {
      expect(API.get).toHaveBeenCalled();
      expect(res).toBeDefined();
      expect(typeof res).toBe('object');
    });
  });

  it('should get class based on teacher', () => {
    expect.assertions(3);
    return Request.getClassesAssosiatedWithTeacher('asdfa123aa', 'jdoe').then(res => {
      expect(API.get).toHaveBeenCalled();
      expect(res).toBeDefined();
      expect(typeof res).toBe('object');
    });
  });

  it('should post a group', () => {
    expect.assertions(3);
    return Request.postCreateAGroup('asdfa123aa', 'jdoe').then(res => {
      expect(API.get).toHaveBeenCalled();
      expect(res).toBeDefined();
      expect(typeof res).toBe('object');
    });
  });

  it('should post group info', () => {
    expect.assertions(3);
    return Request.updateGroupInfo('asdfa123aa', 'jdoe').then(res => {
      expect(getFormAPIObject.post).toHaveBeenCalled();
      expect(res).toBeDefined();
      expect(typeof res).toBe('object');
    });
  });
});
