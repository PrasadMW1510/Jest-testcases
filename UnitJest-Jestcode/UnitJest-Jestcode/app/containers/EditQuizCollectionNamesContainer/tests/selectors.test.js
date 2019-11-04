import { fromJS } from 'immutable';
import makeSelecteditQuizCollectionNames from '../selectors';

describe('EditQuizCollectionNamesContainer selector', () => {
  it('should select the EditQuizCollectionNamesContainer.test', () => {
    const editQuizCollectionNamesContainer = fromJS({
      EditQuizCollectionNamesContainer: { name: 'test' },
    });
    const mockedState = fromJS({
      editQuizCollectionNamesContainer,
    });

    expect(makeSelecteditQuizCollectionNames()(mockedState)).toEqual(
      editQuizCollectionNamesContainer.toJS()
    );
  });
});
