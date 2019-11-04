import { fromJS } from 'immutable';
import makeSelectCatchAllClassContainer from '../selectors';

describe('Advanced search container selector', () => {
  it('should select the advance search', () => {
    const catchAllClassContainer = fromJS({
      catchAllClassContainer: { name: 'test' },
    });
    const mockedState = fromJS({
      catchAllClassContainer,
    });

    expect(makeSelectCatchAllClassContainer()(mockedState)).toEqual(catchAllClassContainer.toJS());
  });
});
