import { fromJS } from 'immutable';
import makeSelectReportsPage from '../selectors';

describe('selectReportsPageDomain', () => {
  it('should select the reports page domain', () => {
    const reportsPage = fromJS({
      reports: { name: 'test' },
    });
    const mockedState = fromJS({
      reportsPage,
    });

    expect(makeSelectReportsPage()(mockedState)).toEqual(reportsPage);
  });
});
