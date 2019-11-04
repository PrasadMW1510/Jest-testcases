import { fromJS } from 'immutable';
import makeSelectAssignmentContainer from '../selectors';

describe('Advanced search container selector', () => {
  it('should select the advance search', () => {
    const assignmentContainer = fromJS({
      assignmentContainer: { name: 'test' },
    });
    const mockedState = fromJS({
      assignmentContainer,
    });

    expect(makeSelectAssignmentContainer()(mockedState)).toEqual(assignmentContainer.toJS());
  });
});
