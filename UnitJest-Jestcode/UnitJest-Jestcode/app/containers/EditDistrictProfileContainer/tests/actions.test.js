import * as Actions from '../actions';

describe('EditDistrictProfileContainer actions', () => {
  it('should getTimeZonesRequest', () => {
    expect(Actions.getTimeZonesRequest()).toMatchSnapshot();
  });

  it('should getTimeZonesRequestSuccess', () => {
    const zones = ['US Pacific'];
    expect(Actions.getTimeZonesRequestSuccess(zones)).toMatchSnapshot();
  });

  it('should getTimeZonesRequestFailure', () => {
    expect(Actions.getTimeZonesRequestFailure('err')).toMatchSnapshot();
  });
  it('should updateDistrictProfileRequest', () => {
    expect(Actions.updateDistrictProfileRequest()).toMatchSnapshot();
  });

  it('should updateDistrictProfileSuccess', () => {
    expect(Actions.updateDistrictProfileSuccess()).toMatchSnapshot();
  });

  it('should updateDistrictProfileFailure', () => {
    expect(Actions.updateDistrictProfileFailure('err')).toMatchSnapshot();
  });

  it('should updateCustomDemographics', () => {
    const demographics = ['my demographic'];
    expect(Actions.updateCustomDemographics(demographics)).toMatchSnapshot();
  });
});
