import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import QuickLinksItem from '../index';

describe('<QuickLinksItem />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<QuickLinksItem />);
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to render color correctly', () => {
    wrapper = shallow(<QuickLinksItem color="blue" />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
