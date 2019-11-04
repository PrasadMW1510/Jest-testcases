import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import MessageLogModal from '../index';

describe('<MessageLogModal />', () => {
  let wrapper = null;
  const mockDisplayText = { payloadData: 'dummy text' };
  const mockOnOk = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<MessageLogModal isOpen displayText={mockDisplayText} onOk={mockOnOk} />);
  });

  it('Expect to match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('OK clicked', () => {
    wrapper.find('button').simulate('click', { preventDefault: () => {} });
    expect(mockOnOk).toHaveBeenCalled();
  });
});
