import { fromJS } from 'immutable';
import makeSelectBooksPage from '../selectors';

describe('selectBooksPageDomain', () => {
  it('should select the books page domain', () => {
    const booksPage = fromJS({
      booksPage: { name: 'test' },
    });
    const mockedState = fromJS({
      booksPage,
    });

    expect(makeSelectBooksPage()(mockedState)).toEqual(booksPage.toJS());
  });
});
