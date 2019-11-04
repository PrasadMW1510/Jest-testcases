import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import PortfolioTabBar from '../index';

describe('<PortfolioTabBar  />', () => {
  let wrapper = null;
  const props = {
    usertype: 'Teacher',
    programList: ['S44NG'],
  };
  wrapper = shallow(<PortfolioTabBar {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
describe('<PortfolioTabBar  />', () => {
  let wrapper = null;
  const props = {
    usertype: 'Teacher',
    programList: ['r180u_B'],
  };
  wrapper = shallow(<PortfolioTabBar {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
describe('<PortfolioTabBar  />', () => {
  let wrapper = null;
  const props = {
    usertype: 'Teacher',
    programList: ['r180ng_A'],
  };
  wrapper = shallow(<PortfolioTabBar {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
describe('<PortfolioTabBar  />', () => {
  let wrapper = null;
  const props = {
    usertype: 'Teacher',
    programList: ['r180ng_B'],
  };
  wrapper = shallow(<PortfolioTabBar {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
describe('<PortfolioTabBar  />', () => {
  let wrapper = null;
  const props = {
    usertype: 'Teacher',
    programList: ['r180ng_C'],
  };
  wrapper = shallow(<PortfolioTabBar {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
