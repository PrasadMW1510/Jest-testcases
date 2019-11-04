import * as Actions from '../actions';

describe('ReportsPage actions', () => {
  describe('Default Action', () => {
    it('should return the correct constant for report request', () => {
      expect(Actions.reportListRequest()).toMatchSnapshot();
    });

    it('should return the correct constant for report request success', () => {
      expect(Actions.reportListRequestSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for report request failure', () => {
      expect(Actions.reportListRequestFailure()).toMatchSnapshot();
    });
  });
});
