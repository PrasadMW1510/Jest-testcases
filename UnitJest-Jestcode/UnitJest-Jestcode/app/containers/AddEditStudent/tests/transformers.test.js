import { fromJS } from 'immutable';
import { transformStudentMapForPost } from '../transformers';

describe('Student form transformers', () => {
  it('should take a student map and return json', () => {
    const studentId = 'student-123';
    const studentMap = fromJS({
      first_name: 'Foo',
      last_name: 'Bar',
      middle_name: 'M',
    });
    const studentObj = transformStudentMapForPost(studentMap, studentId);
    expect(studentObj.user).toBeDefined();
    expect(studentObj.user.user_id).toEqual(studentId);
    expect(Object.keys(studentObj.user).length).toBe(12);
  });
});
