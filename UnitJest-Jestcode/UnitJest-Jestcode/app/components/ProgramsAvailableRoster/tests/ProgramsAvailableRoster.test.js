import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ProgramsAvailableRoster from '../index';

describe('<ProgramsAvailableRoster />', () => {
  let wrapper = null;
  let mockMessagesData = null;

  describe('props.messages is empty array', () => {
    it('Should render correctly', () => {
      wrapper = shallow(<ProgramsAvailableRoster messages={[]} />);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('props.messages is not an empty array', () => {
    beforeEach(() => {
      mockMessagesData = [
        {
          array: [1],
          name: ['CDX'],
        },
      ];

      wrapper = shallow(<ProgramsAvailableRoster messages={mockMessagesData} />);
    });

    it('Should render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
