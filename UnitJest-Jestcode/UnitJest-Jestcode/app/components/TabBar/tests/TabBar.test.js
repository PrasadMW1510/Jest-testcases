import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import TabBar from '../index';

describe('<TabBar />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<TabBar />);
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should have a Home tab', () => {
    expect(wrapper.find('Tab[to="/"]').length).toEqual(1);
  });

  it('Should have a Roster tab', () => {
    expect(wrapper.find('Tab[to="/roster"]').length).toEqual(1);
  });

  it('Should have a Reports tab', () => {
    expect(wrapper.find('Tab[to="/reports"]').length).toEqual(1);
  });

  it('Should have a Resources tab', () => {
    expect(wrapper.find('Tab[to="/resources"]').length).toEqual(1);
  });

  it('Should have a Books tab', () => {
    expect(wrapper.find('Tab[to="/books"]').length).toEqual(1);
  });

  it('Should have a Portfolio tab', () => {
    expect(wrapper.find('Tab[to="/portfolio"]').length).toEqual(1);
  });
});
