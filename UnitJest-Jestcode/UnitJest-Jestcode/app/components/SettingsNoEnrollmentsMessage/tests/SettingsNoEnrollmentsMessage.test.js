import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';

import { COHORT_TYPE, PROGRAM_LIST } from 'containers/App/constants';

import SettingsNoEnrollmentsMessage from '../index';

describe('<SettingsNoEnrollmentsMessage />', () => {
  let wrapper = null;

  it('cohort is student', () => {
    wrapper = shallow(
      <SettingsNoEnrollmentsMessage
        cohort={COHORT_TYPE.Student}
        productName={PROGRAM_LIST.R180.name}
      />
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('cohort is not student', () => {
    wrapper = shallow(
      <SettingsNoEnrollmentsMessage
        cohort={COHORT_TYPE.District}
        productName={PROGRAM_LIST.S44JR.name}
      />
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
