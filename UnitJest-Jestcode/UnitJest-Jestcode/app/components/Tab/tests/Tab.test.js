import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Tab from '../index';

describe('<Tab />', () => {
  let wrapper = null;
  let label = null;
  beforeEach(() => {
    label = 'Home';
    wrapper = shallow(
      <Tab className="tab-bar__tab--foo" component="a" style={{ color: 'red' }}>
        {label}
      </Tab>
    );
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should contain the tab text', () => {
    expect(wrapper.contains(label)).toBeTruthy();
  });
});
