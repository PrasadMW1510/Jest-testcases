import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import SelectClassMessage from '../index';

describe('<SelectClassMessage />', () => {
  describe('Expect to render correctly', () => {
    it('when message visible it should contain message text', () => {
      const wrapper = shallow(<SelectClassMessage visible />);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
      expect(wrapper.contains('Please select a class')).toBeTruthy();
    });

    it('when message not visible, it should not contain message text', () => {
      const wrapper = shallow(<SelectClassMessage />);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
      expect(wrapper.contains('Please select a class')).toBeFalsy();
    });
  });
});
