import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import LoadingModal from '../index';

describe('<LoadingModal />', () => {
  let wrapper = null;

  describe('isOpen is true', () => {
    beforeEach(() => {
      wrapper = shallow(<LoadingModal isOpen />);
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('isOpen is false', () => {
    beforeEach(() => {
      wrapper = shallow(<LoadingModal />);
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
