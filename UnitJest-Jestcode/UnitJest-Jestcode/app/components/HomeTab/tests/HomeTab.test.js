import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import HomeTab from '../index';

describe('<HomeTab />', () => {
  let wrapper = null;
  let link = null;
  let tabColor = null;
  let tabText = null;
  let tabWidth = null;

  beforeEach(() => {
    link = '/';
    tabColor = 'blue';
    tabText = 'Home';
    tabWidth = '250px';

    wrapper = shallow(
      <HomeTab link={link} tabColor={tabColor} tabText={tabText} tabWidth={tabWidth} />
    );
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should contain the tab text', () => {
    expect(wrapper.children().text()).toContain(tabText);
  });
});
