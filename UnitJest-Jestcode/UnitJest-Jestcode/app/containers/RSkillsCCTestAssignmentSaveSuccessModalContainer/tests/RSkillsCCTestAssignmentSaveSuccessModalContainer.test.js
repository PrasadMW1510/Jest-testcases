import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { RSKILLS_SAMPLE_RESPONSE_A } from 'containers/RSkillsCCSettingContainer/constants';

import { RSkillsCCTestAssignmentSaveSuccessModalContainer } from '../index';

describe('<RSkillsCCTestAssignmentSaveSuccessModalContainer />', () => {
  let wrapper = null;
  const mockHideModal = jest.fn();
  const mockRSkillsCCSettingsTestAssignmentRequest = jest.fn();
  const mockDataA = {
    ...RSKILLS_SAMPLE_RESPONSE_A,
    rBookName: 'rBook',
    rSkillsTestDescription: 'Skills for Workshop 1',
    users_affected: [
      {
        below_grade_count: '0',
        grade_count: '1',
      },
    ],
    users_unaffected: [
      {
        assigned_but_incomplete_users: [{}],
        unenrolled_users_rt: [{}],
      },
    ],
  };

  const mockDataB = {
    ...RSKILLS_SAMPLE_RESPONSE_A,
    rBookName: 'rBook',
    rSkillsTestDescription: 'Skills for Workshop 1',
    redirectToRoster: true,
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('with results having user data', () => {
    beforeEach(() => {
      wrapper = shallow(
        <RSkillsCCTestAssignmentSaveSuccessModalContainer
          hideModal={mockHideModal}
          rSkillsCCSettingsTestAssignmentRequest={mockRSkillsCCSettingsTestAssignmentRequest}
          data={mockDataA}
        />
      );
    });
    it('should render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should handleYes for district org type', () => {
      const mockEvent = { preventDefault: () => {} };
      wrapper.instance().handleYes(mockEvent);
      expect(mockHideModal).toHaveBeenCalledTimes(1);
      expect(mockRSkillsCCSettingsTestAssignmentRequest).toBeCalled();
    });
  });

  describe('with results not having user data and redirecting to roster', () => {
    beforeEach(() => {
      wrapper = shallow(
        <RSkillsCCTestAssignmentSaveSuccessModalContainer
          hideModal={mockHideModal}
          rSkillsCCSettingsTestAssignmentRequest={mockRSkillsCCSettingsTestAssignmentRequest}
          data={mockDataB}
        />
      );
    });

    it('should render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should handleYes for district org type', () => {
      const mockEvent = { preventDefault: () => {} };
      wrapper.instance().handleYes(mockEvent);
      expect(mockHideModal).toHaveBeenCalledTimes(1);
      expect(mockRSkillsCCSettingsTestAssignmentRequest).not.toBeCalled();
    });
  });
});
