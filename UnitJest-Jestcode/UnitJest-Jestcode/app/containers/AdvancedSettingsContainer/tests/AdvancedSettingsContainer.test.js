import React from 'react';
import { shallow } from 'enzyme';

import AdvancedSettings from 'components/AdvancedSettings';
import { USER_TYPE } from 'containers/App/constants';
import { AdvancedSettingsContainer } from '../AdvancedSettingsContainer';

describe('<AdvancedSettingsContainer />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(
      <AdvancedSettingsContainer
        profileUserType={USER_TYPE.Administrator}
        profileDistrictId="some_district_id"
        profileUserId="some_user_id"
        profileSessionId="some_session_id"
      />
    );
  });

  it('Should contain AdvancedSettings component with right props', () => {
    const advancedSettings = wrapper.find(AdvancedSettings);
    expect(advancedSettings).toBeDefined();
    expect(advancedSettings.prop('profileUserType')).toBe(USER_TYPE.Administrator);
    expect(advancedSettings.prop('profileDistrictId')).toBe('some_district_id');
    expect(advancedSettings.prop('profileUserId')).toBe('some_user_id');
    expect(advancedSettings.prop('profileSessionId')).toBe('some_session_id');
  });
});
