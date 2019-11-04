import { fromJS } from 'immutable';
import makeSelectRead180NgAssaignmentContainer from '../selectors';

describe('Advanced search container selector', () => {
  it('should select the advance search', () => {
    const addRead180NgAssaignmentContainer = fromJS({
      addRead180NgAssaignmentContainer: { name: 'test' },
    });
    const mockedState = fromJS({
      addRead180NgAssaignmentContainer,
    });

    expect(makeSelectRead180NgAssaignmentContainer()(mockedState)).toEqual(
      addRead180NgAssaignmentContainer.toJS()
    );
  });
});
