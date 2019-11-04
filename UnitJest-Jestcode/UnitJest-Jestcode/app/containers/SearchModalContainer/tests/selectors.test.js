import { fromJS } from 'immutable';
import makeSelectSearchModalContainer from '../selectors';

describe('selectSearchModalContainerDomain', () => {
  it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true);
  });

  it('should have selectSearchModalContainerDomain', () => {
    const searchModalContainer = fromJS({
      // searchModalContainer: { name: 'test' },
      searchModalContainer: {
        error: false,
        loading: true,
        searchMeta: {
          apps: [],
          classes: [],
          grades: [],
          permissions: [],
          schools: [],
          teachers: [],
        },
      },
    });
    const mockedState = fromJS({
      searchModalContainer,
    });
    expect(makeSelectSearchModalContainer()(mockedState)).toEqual(searchModalContainer);
  });
});
