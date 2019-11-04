import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import AddDemographic from '../AddDemographic';

describe('<AddDemographic />', () => {
  let wrapper = null;
  const mockOnClick = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<AddDemographic onClick={mockOnClick} />);
  });

  it('Expect to match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
