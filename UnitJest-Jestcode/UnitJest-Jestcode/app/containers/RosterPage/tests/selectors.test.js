import { fromJS } from 'immutable';
import makeSelectRosterPage from '../selectors';

describe('selectRosterPageDomain', () => {
  it('should select the reports page domain', () => {
    const rosterPage = fromJS({
      roster: { name: 'test' },
    });
    const mockedState = fromJS({
      rosterPage,
    });

    expect(makeSelectRosterPage()(mockedState)).toEqual(rosterPage.toJS());
  });
});
