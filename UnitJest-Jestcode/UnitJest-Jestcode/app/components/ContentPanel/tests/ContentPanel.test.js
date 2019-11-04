import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ContentPanel from '../index';

describe('<ContentPanel />', () => {
  let wrapper = null;
  let child = null;

  describe('loading is true', () => {
    beforeEach(() => {
      child = <span>Hello World!</span>;
      wrapper = shallow(<ContentPanel loading>{child}</ContentPanel>);
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('loading is false', () => {
    beforeEach(() => {
      child = <span>Hello World!</span>;
      wrapper = shallow(<ContentPanel>{child}</ContentPanel>);
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
