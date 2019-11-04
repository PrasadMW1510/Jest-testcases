import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import RSkillsCCTestAssignmentSaveSuccessModal from '../index';

describe('<RSkillsCCTestAssignmentSaveSuccessModal />', () => {
  let wrapper = null;
  const mockOnYes = jest.fn();
  const mockMessage = 'Placeholder Message';
  const mockRSkillsTestName = 'Workshop 1';
  const mockTitle = 'rBook Flex';

  it('should render correctly', () => {
    wrapper = shallow(
      <RSkillsCCTestAssignmentSaveSuccessModal
        affectedMessage={mockMessage}
        onYes={mockOnYes}
        rSkillsTestName={mockRSkillsTestName}
        title={mockTitle}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('when redirectToRoster is true', () => {
    const mockUnaffectedUsers = [{ user_id: '1', first_name: 'John', last_name: 'Doe' }];
    const mockUnenrolledUsers = [{ user_id: '2', first_name: 'Jane', last_name: 'Doe' }];
    it('should render correctly', () => {
      wrapper = shallow(
        <RSkillsCCTestAssignmentSaveSuccessModal
          affectedMessage={mockMessage}
          onYes={mockOnYes}
          redirectToRoster
          rSkillsTestName={mockRSkillsTestName}
          title={mockTitle}
          unaffectedUsers={mockUnaffectedUsers}
          unenrolledUsers={mockUnenrolledUsers}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
