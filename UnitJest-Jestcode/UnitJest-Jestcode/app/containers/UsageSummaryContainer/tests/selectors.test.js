import { fromJS } from 'immutable';
import makeSelectUsageSummaryData, { isUsageSummaryLoading } from '../selectors';

describe('selectUsageSummary', () => {
  it('should consistently return the global app schools data state', () => {
    const usageSummary = fromJS({
      usageSummary: { name: 'test' },
    });
    const mockedState = fromJS({
      usageSummary,
    });
    expect(makeSelectUsageSummaryData()(mockedState)).toEqual(usageSummary);
  });

  describe('isUsageSummaryLoading', () => {
    it('should return true if mockState is undefined', () => {
      const usageSummary = undefined;
      const mockState = fromJS({
        usageSummary,
      });

      expect(isUsageSummaryLoading()(mockState)).toBeTruthy();
    });

    it('should return loading prop', () => {
      const usageSummary = fromJS({
        loading: false,
      });
      const mockState = fromJS({
        usageSummary,
      });

      expect(isUsageSummaryLoading()(mockState)).toBeFalsy();
    });
  });
});
