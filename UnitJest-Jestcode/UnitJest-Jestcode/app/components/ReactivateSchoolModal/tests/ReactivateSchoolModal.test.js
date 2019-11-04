import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ReactivateSchoolModal from '../index';

describe('<ReactivateSchoolModal />', () => {
  let wrapper = null;
  const mockHideModal = jest.fn();
  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();
  const mockToReactivateCount = 2;
  beforeEach(() => {
    wrapper = shallow(
      <ReactivateSchoolModal
        hideModal={mockHideModal}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
        toReactivateCount={mockToReactivateCount}
      />
    );
  });
  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
