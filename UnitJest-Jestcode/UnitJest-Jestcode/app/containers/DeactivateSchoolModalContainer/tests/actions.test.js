import * as Actions from '../actions';

it('should return the correct deactivate school', () => {
  expect(Actions.deactivateSchoolRequest('zzzzz123')).toMatchSnapshot();
});

it('should return the success for deactivate school', () => {
  expect(Actions.deactivateSchoolRequestSuccess()).toMatchSnapshot();
});

it('should return the failure for deactivate school', () => {
  expect(Actions.deactivateSchoolRequestFailure('error')).toMatchSnapshot();
});
