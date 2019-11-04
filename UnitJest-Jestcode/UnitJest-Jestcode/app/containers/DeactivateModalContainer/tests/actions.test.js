import * as Actions from '../actions';

it('should return the correct Certificate Info', () => {
  expect(Actions.deactivateUserRequest('zzzzz123')).toMatchSnapshot();
});

it('should return the success for  Certificate Info', () => {
  expect(Actions.deactivateUserRequestSuccess()).toMatchSnapshot();
});

it('should return the failure for Certificate Info', () => {
  expect(Actions.deactivateUserRequestFailure('error')).toMatchSnapshot();
});
