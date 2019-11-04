import { fromJS } from 'immutable';
import makeSelectAddAssignmentContainer from '../selectors';

describe('Advanced search container selector', () => {
  it('should select the advance search', () => {
    const addAssignmentContainer = fromJS({
      addAssignmentContainer: { name: 'test' },
    });
    const mockedState = fromJS({
      addAssignmentContainer,
    });

    expect(makeSelectAddAssignmentContainer()(mockedState)).toEqual(addAssignmentContainer.toJS());
  });
});
