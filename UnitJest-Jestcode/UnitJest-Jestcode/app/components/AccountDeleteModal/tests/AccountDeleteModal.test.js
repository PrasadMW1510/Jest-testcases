import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import AccountDeleteModal from '../index';

describe('<AccountDeleteModal />', () => {
  let wrapper = null;
  const mockHideModal = jest.fn();
  const mockOnYes = jest.fn();
  const mockOnNo = jest.fn();
  const toDeleteCount = 1;
  beforeEach(() => {
    wrapper = shallow(
      <AccountDeleteModal
        hideModal={mockHideModal}
        onYes={mockOnYes}
        onNo={mockOnNo}
        toDeleteCount={toDeleteCount}
      />
    );
  });
  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
