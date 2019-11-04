import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { USER_TYPE } from 'containers/App/constants';

import AdvancedSettings from '../index';

describe('<AdvancedSettings />', () => {
  let wrapper = null;

  describe('Administrator', () => {
    beforeEach(() => {
      wrapper = shallow(
        <AdvancedSettings
          profileUserType={USER_TYPE.Administrator}
          profileDistrictId="some_district_id"
          profileSessionId="some_session_id"
          profileUserId="some_user_id"
        />
      );
    });

    it('should match snapshot', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('Teacher', () => {
    beforeEach(() => {
      wrapper = shallow(
        <AdvancedSettings
          profileUserType={USER_TYPE.Teacher}
          profileDistrictId="some_district_id"
          profileSessionId="some_session_id"
          profileUserId="some_user_id"
        />
      );
    });

    it('should match snapshot', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
