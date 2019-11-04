import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { XSkillsTestAssignmentSaveSuccessModalContainer } from '../index';

describe('<XSkillsTestAssignmentSaveSuccessModalContainer />', () => {
  let wrapper = null;
  let wrapperInstance = null;
  const mockHideModal = jest.fn();
  const mockXSkillsTestAssignmentRequest = jest.fn();
  const mockFullData = {
    redirectToRoster: false,
    users_affected: [{ user: [{ first_name: 'John', last_name: 'doe', middle_name: '' }] }],
    users_unaffected: [
      {
        unenrolled_users_xt: [{ user: [] }],
        assigned_but_incomplete_users: [{ user: [] }],
        test_completed: [{ user: [] }],
      },
    ],
  };
  const mockEmptyData = {};
  beforeEach(() => {
    wrapper = shallow(
      <XSkillsTestAssignmentSaveSuccessModalContainer
        data={mockFullData}
        hideModal={mockHideModal}
        xSkillsTestAssignmentRequest={mockXSkillsTestAssignmentRequest}
      />
    );
    wrapperInstance = wrapper.instance();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('handleYes', () => {
    it('should call xSkillsTestAssignmentRequest', () => {
      wrapperInstance.handleYes();
      expect(mockHideModal).toHaveBeenCalled();
      expect(mockXSkillsTestAssignmentRequest).toHaveBeenCalled();
    });

    it('should Not call xSkillsTestAssignmentRequest when Redirecting to Roster', () => {
      wrapper.setProps({ data: { redirectToRoster: true } });
      wrapperInstance.handleYes();
      expect(mockHideModal).toHaveBeenCalled();
      expect(mockXSkillsTestAssignmentRequest).not.toHaveBeenCalled();
    });
  });

  describe('having no data', () => {
    beforeEach(() => {
      wrapper = shallow(
        <XSkillsTestAssignmentSaveSuccessModalContainer
          data={mockEmptyData}
          hideModal={mockHideModal}
          xSkillsTestAssignmentRequest={mockXSkillsTestAssignmentRequest}
        />
      );
    });
    it('should render as expected', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
