import { fromJS } from 'immutable';
import makeSelectBookQuizContainer, { getSearchedResults } from '../selectors';

describe('Advanced search container selector', () => {
  it('should select the advance search', () => {
    const bookQuizContainer = fromJS({
      advancedSearchContainer: { name: 'test' },
    });
    const mockedState = fromJS({
      bookQuizContainer,
    });

    expect(makeSelectBookQuizContainer()(mockedState)).toEqual(bookQuizContainer);
  });
  it('should select the advance search', () => {
    const bookQuizContainer = fromJS({
      advancedSearchContainer: { name: 'test' },
    });
    const mockedState = fromJS({
      bookQuizContainer,
    });

    expect(getSearchedResults()(mockedState)).toEqual(bookQuizContainer);
  });
});
