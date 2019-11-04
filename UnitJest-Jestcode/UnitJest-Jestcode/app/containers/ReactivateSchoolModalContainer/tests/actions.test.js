import * as Actions from '../actions';

describe('ReactivateSchoolModalContainer actions', () => {
  it('should return the correct constant for postReactivateSchoolRequest', () => {
    expect(Actions.postReactivateSchoolRequest()).toMatchSnapshot();
  });

  it('should return the correct constant for postReactivateSchoolRequestSuccess', () => {
    expect(Actions.postReactivateSchoolRequestSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for postReactivateSchoolRequestFailure', () => {
    expect(Actions.postReactivateSchoolRequestFailure('err')).toMatchSnapshot();
  });
});
