import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import React from 'react';

import { XSKILLS_COURSES } from 'components/XSkillsSettings/constants';
import { COHORT_TYPE } from 'containers/App/constants';
import { XSkillsSettingContainer } from '../index';

describe('<XSkillsSettingContainer />', () => {
  let wrapper = null;
  let wrapperInstance = null;
  const mockCohortObj = {
    cohortType: COHORT_TYPE.School,
    id: 'guidSchool12345',
  };
  const mockXSkillsSettingsRequest = jest.fn();
  const mockXSkillsTestAssignmentRequest = jest.fn();
  const mockXSkillsTestAssignmentSaveRequest = jest.fn();
  const mockXSkillsSettingData = fromJS({
    loadingSettings: false,
    loadingTestAssignment: false,
    testsMeta: {
      test: [
        {
          test_number: '1',
          test_title: 'Test 1',
          test_description: 'test 1: Skills from Workshops 1',
        },
      ],
    },
    settings: {
      audio_instructions: '1',
      show_correct_incorrect: '1',
      include_open_response: '1',
      include_writing_prompts: '1',
      ell_audio_instructions: '0',
    },
  });
  beforeEach(() => {
    wrapper = shallow(
      <XSkillsSettingContainer
        cohortObj={mockCohortObj}
        xSkillsSettingsRequest={mockXSkillsSettingsRequest}
        xSkillsTestAssignmentRequest={mockXSkillsTestAssignmentRequest}
        xSkillsTestAssignmentSaveRequest={mockXSkillsTestAssignmentSaveRequest}
        enrollmentCount={3}
        highestEnrolledCourse={XSKILLS_COURSES.XT_I}
        xSkillsSettingData={mockXSkillsSettingData}
      />
    );
    wrapperInstance = wrapper.instance();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('handleTestAssignmentSave', () => {
    wrapperInstance.handleTestAssignmentSave(3, false);
    expect(mockXSkillsTestAssignmentSaveRequest).toHaveBeenCalled();
  });
});
