import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';

import ProgramGradingView from 'components/ProgramGradingView';
import { ProgramGradingContainer } from '../ProgramGradingContainer';

describe('<ProgramGradingContainer />', () => {
  let wrapper = null;
  let mockProgramSettingsEnrollmentList = null;

  const mockEnrollmentList = fromJS([]);
  const mockRosterPage = {
    selectedProgram: {
      settings: 'Settings',
      display_name: 'Progress Space',
      display_image: '/a2dabdfecfde82f90145cbd702e07a6b.png',
    },
  };

  beforeEach(() => {
    mockProgramSettingsEnrollmentList = jest.fn();

    wrapper = shallow(
      <ProgramGradingContainer
        enrollmentList={mockEnrollmentList}
        programSettingsEnrollmentList={mockProgramSettingsEnrollmentList}
        rosterPage={mockRosterPage}
      />
    );
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should contain a ProgramGradingView', () => {
    expect(wrapper.find(ProgramGradingView).exists()).toBeTruthy();
  });
});
