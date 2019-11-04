import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import SAMButton from 'components/SAMButton';
import SAMLinkButton from 'components/SAMLinkButton';

import XSkillsTestAssignmentSaveSuccessModal from '../index';

describe('<XSkillsTestAssignmentSaveSuccessModal />', () => {
  let wrapper = null;
  const mockUsersList = [{ first_name: 'John', middle_name: 'a', last_name: 'Doe', user_id: 1 }];
  const mockOnYes = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<XSkillsTestAssignmentSaveSuccessModal onYes={mockOnYes} />);
  });
  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('saveSuccessMsg', () => {
    wrapper.setProps({ affectedUserCount: 10, xSkillsTestNumber: '8' });
    const expectedElem = (
      <div className="xskills-test-assignment-save-success__message">
        On the next login, 10 students will take xSkills Test 8
      </div>
    );
    expect(wrapper.containsMatchingElement(expectedElem)).toBeTruthy();
  });
  describe('testsAlreadyCompletedMsg', () => {
    it('does not have users who have already completed the test', () => {
      wrapper.setProps({ xSkillsTestNumber: '8' });
      expect(
        wrapper.find('.xskills-test-assignment-save-success__details-message').exists()
      ).toBeFalsy();
    });

    it('does have users who have already completed the test', () => {
      wrapper.setProps({ completedUsers: mockUsersList, xSkillsTestNumber: '8' });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
      expect(
        wrapper.find('.xskills-test-assignment-save-success__details-message').exists()
      ).toBeTruthy();
    });
  });
  describe('assignedButIncompleteUsersMsg', () => {
    it('does not any assigned But Incomplete users', () => {
      wrapper.setProps({ xSkillsTestNumber: '8' });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
      expect(
        wrapper.find('.xskills-test-assignment-save-success__details-message').exists()
      ).toBeFalsy();
    });

    it('does have users who are assigned but incomplete', () => {
      wrapper.setProps({ assignedButIncompleteUsers: mockUsersList, xSkillsTestNumber: '8' });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
      expect(
        wrapper.find('.xskills-test-assignment-save-success__details-message').exists()
      ).toBeTruthy();
    });
  });

  describe('unenrolledUsersMsg', () => {
    it('does not have any users unenrolled in xSkills Tests', () => {
      wrapper.setProps({ xSkillsTestNumber: '8' });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
      expect(
        wrapper.find('.xskills-test-assignment-save-success__details-message').exists()
      ).toBeFalsy();
    });

    describe('nesxt,', () => {
      beforeEach(() => {
        wrapper.setProps({ unenrolledUsers: mockUsersList, xSkillsTestNumber: '8' });
      });
      it('does have users who are not enrolled in xSkills Tests', () => {
        wrapper.setProps({ unenrolledUsers: mockUsersList, xSkillsTestNumber: '8' });
        expect(shallowToJson(wrapper)).toMatchSnapshot();
        expect(
          wrapper.find('.xskills-test-assignment-save-success__details-message').exists()
        ).toBeTruthy();
      });
    });
  });
  describe('renderCloseButton', () => {
    it('should have SAM Link button for returning to roster', () => {
      wrapper.setProps({ redirectToRoster: true });
      expect(wrapper.find(SAMLinkButton).exists()).toBeTruthy();
      expect(wrapper.find(SAMButton).exists()).toBeFalsy();
    });

    it('should have SAM Button when redirectToRoster is false', () => {
      wrapper.setProps({ redirectToRoster: false });
      expect(wrapper.find(SAMButton).exists()).toBeTruthy();
      expect(wrapper.find(SAMLinkButton).exists()).toBeFalsy();
    });
  });
});
