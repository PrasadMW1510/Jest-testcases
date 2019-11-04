import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import ProgramsAvailableRoster from 'components/ProgramsAvailableRoster';
import { ProgramAvailableRosterContainer } from '../ProgramAvailableRosterContainer';

describe('<ProgramAvailableRosterContainer />', () => {
  let wrapper = null;
  let mockProgramAvailable = null;

  beforeEach(() => {
    mockProgramAvailable = fromJS([
      { array: [1], name: ['CDX'] },
      { array: [2], name: ['FM'] },
      { array: [3], name: ['E3D'] },
    ]);

    wrapper = shallow(<ProgramAvailableRosterContainer global={mockProgramAvailable} />);
  });

  it('Should contain a ProgramsAvailableRoster', () => {
    expect(wrapper.find(ProgramsAvailableRoster).exists()).toBeTruthy();
  });
});
