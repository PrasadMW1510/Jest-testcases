import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import DemographicList from '../DemographicList';

describe('<DemographicList />', () => {
  let wrapper = null;
  const mockDemographics = ['Test Demo', 'Test Demo 2'];

  beforeEach(() => {
    wrapper = shallow(<DemographicList items={mockDemographics} />);
  });

  it('Expect to match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
