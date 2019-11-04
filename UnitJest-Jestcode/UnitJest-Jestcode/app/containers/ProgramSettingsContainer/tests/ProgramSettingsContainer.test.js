import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import React from 'react';

import ProgramSettingsView from 'components/ProgramSettingsView';

import { ProgramSettingsContainer } from '../ProgramSettingsContainer';

describe('<ProgramSettingsContainer />', () => {
  let wrapper = null;
  let mockProgramSettingsEnrollmentList = null;

  const mockEnrollmentList = fromJS([]);
  const mockRosterPage = {
    selectedProgram: {
      settings: 'Settings',
      display_name: 'READ 180 Next Generation',
      display_image: '/d4d957e1b5fed309a10581d6df938d4c.png',
    },
  };

  beforeEach(() => {
    mockProgramSettingsEnrollmentList = jest.fn();

    wrapper = shallow(
      <ProgramSettingsContainer
        enrollmentList={mockEnrollmentList}
        programSettingsEnrollmentList={mockProgramSettingsEnrollmentList}
        rosterPage={mockRosterPage}
      />
    );
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should contain a ProgramSettingsView', () => {
    expect(wrapper.find(ProgramSettingsView).exists()).toBeTruthy();
  });
});
