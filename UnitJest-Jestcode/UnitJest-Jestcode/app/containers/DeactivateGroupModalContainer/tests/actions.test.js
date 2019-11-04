import * as Actions from '../actions';

it('should return the correct Certificate Info', () => {
  expect(Actions.deactivateGroupRequest('zzzzz123')).toMatchSnapshot();
});

it('should return the success for  Certificate Info', () => {
  expect(Actions.deactivateGroupRequestSuccess()).toMatchSnapshot();
});

it('should return the failure for Certificate Info', () => {
  expect(Actions.deactivateGroupRequestFailure('error')).toMatchSnapshot();
});
