import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import TextControl from '../index';

describe('<TextControl />', () => {
  let wrapper = null;
  const mockLabel = 'mockLabel';
  const mockInput = {
    value: 'mockInputValue',
  };
  const mockFormatText = jest.fn(() => 'mockFormattedText');

  it('should render correctly with defaults', () => {
    wrapper = shallow(<TextControl />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render correctly without formatText function', () => {
    wrapper = shallow(<TextControl label={mockLabel} input={mockInput} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render correctly with formatText function', () => {
    wrapper = shallow(
      <TextControl label={mockLabel} input={mockInput} formatText={mockFormatText} />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
