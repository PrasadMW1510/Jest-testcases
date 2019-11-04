import * as Actions from '../actions';

it('should return the correct usage summary table', () => {
  expect(Actions.usageSummaryRequest('zzzzz123')).toMatchSnapshot();
});

it('should return the correct usage summary table success', () => {
  expect(Actions.usageSummaryRequestSuccess()).toMatchSnapshot();
});

it('should return the correct correct usage summary table failure', () => {
  expect(Actions.usageSummaryRequestFailure('error')).toMatchSnapshot();
});

it('should return correct school usage summary', () => {
  expect(Actions.schoolUsageSummaryRequest('zzzzz123')).toMatchSnapshot();
});
