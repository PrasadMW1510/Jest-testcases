import { fromJS } from 'immutable';
import { makeSelectDeactivateStudentModalContainer } from '../selectors';

describe('makeSelectDeactivateStudentModalContainer', () => {
  it('should return student deactivation', () => {
    const deactivateStudent = fromJS({
      deactivateStudent: { name: 'test' },
    });
    const mockedState = fromJS({
      deactivateStudent,
    });
    expect(makeSelectDeactivateStudentModalContainer()(mockedState)).toEqual(deactivateStudent);
  });
});
