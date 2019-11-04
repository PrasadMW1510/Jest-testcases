import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';

import NoItemsSelectedModal from '../index';

describe('<NoItemsSelectedModal />', () => {
  let wrapper = null;

  let mockData = null;
  let mockOnOK = null;

  beforeEach(() => {
    mockData = { type: 'mockType' };
    mockOnOK = jest.fn();

    wrapper = shallow(<NoItemsSelectedModal data={mockData} onOK={mockOnOK} />);
  });

  it('expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
