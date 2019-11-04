import * as Actions from '../actions';

it('should return the correct deactivate class', () => {
  expect(Actions.deactivateClassRequest('zzzzz123')).toMatchSnapshot();
});

it('should return the success for deactivate class', () => {
  expect(Actions.deactivateClassRequestSuccess()).toMatchSnapshot();
});

it('should return the failure for deactivate class', () => {
  expect(Actions.deactivateClassRequestFailure('error')).toMatchSnapshot();
});
