import { fromJS } from 'immutable';
import makeSelectAdvancedSearchContainer, { makeSelectGlobalBookResultData } from '../selectors';

describe('Advanced search container selector', () => {
  it('should select the advance search', () => {
    const advancedSearchContainer = fromJS({
      advancedSearchContainer: { name: 'test' },
    });
    const mockedState = fromJS({
      advancedSearchContainer,
    });

    expect(makeSelectAdvancedSearchContainer()(mockedState)).toEqual(
      advancedSearchContainer.toJS()
    );
  });
  it('should consistently return the global app user data state', () => {
    const advancedSearchContainer = fromJS({
      bookResult: { name: 'test' },
    });
    const mockedState = fromJS({
      advancedSearchContainer,
    });

    expect(makeSelectGlobalBookResultData()(mockedState)).toEqual(
      advancedSearchContainer.get('bookResult')
    );
  });
});
