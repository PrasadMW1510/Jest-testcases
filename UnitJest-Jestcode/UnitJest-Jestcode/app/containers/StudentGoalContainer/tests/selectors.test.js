import { fromJS } from 'immutable';
import makeSelectStudentGoalContainer from '../selectors';

describe('Student Goal Containerselector', () => {
  it('should select the student goal', () => {
    const studentGoalContainer = fromJS({
      studentGoalContainer: { name: 'test' },
    });
    const mockedState = fromJS({
      studentGoalContainer,
    });
    expect(makeSelectStudentGoalContainer()(mockedState)).toEqual(studentGoalContainer.toJS());
  });
});
