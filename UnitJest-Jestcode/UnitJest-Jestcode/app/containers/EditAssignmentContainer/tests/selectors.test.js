import { fromJS } from 'immutable';
import makeSelectEditAssignmentContainer from '../selectors';

describe('Advanced search container selector', () => {
  it('should select the advance search', () => {
    const editAssignmentContainer = fromJS({
      editAssignmentContainer: { name: 'test' },
    });
    const mockedState = fromJS({
      editAssignmentContainer,
    });

    expect(makeSelectEditAssignmentContainer()(mockedState)).toEqual(
      editAssignmentContainer.toJS()
    );
  });
});
