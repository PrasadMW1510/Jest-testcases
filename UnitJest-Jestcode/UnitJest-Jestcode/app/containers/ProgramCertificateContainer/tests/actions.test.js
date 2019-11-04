import * as Actions from '../actions';

it('should return the correct Certificate Info', () => {
  expect(Actions.certificateInfoRequest('zzzzz123')).toMatchSnapshot();
});

it('should return the success for  Certificate Info', () => {
  expect(Actions.certificateInfoRequestSuccess()).toMatchSnapshot();
});

it('should return the failure for Certificate Info', () => {
  expect(Actions.certificateInfoRequestFailure('error')).toMatchSnapshot();
});
