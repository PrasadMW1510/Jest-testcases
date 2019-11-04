import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import EditAdminWarning from '../index';

describe('<EditAdminWarning />', () => {
  let wrapper = null;
  let mockOkOnClickHandler = null;
  let mockCancelOnClickHandler = null;
  const fakeEvent = { preventDefault: () => {} };

  beforeEach(() => {
    mockOkOnClickHandler = jest.fn();
    mockCancelOnClickHandler = jest.fn();

    wrapper = shallow(
      <EditAdminWarning
        isOpen
        okOnClickHandler={mockOkOnClickHandler}
        cancelOnClickHandler={mockCancelOnClickHandler}
      />
    );
  });

  it('Expect to match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('simulate Ok button click', () => {
    const okButton = wrapper.find('SAMButton[buttonClassModifier="edit-admin-warning--ok-button"]');
    expect(okButton.exists()).toBeTruthy();
    okButton.prop('onClickHandler')(fakeEvent);
    expect(mockOkOnClickHandler).toHaveBeenCalled();
  });

  it('simulate cancel button click', () => {
    const cancelButton = wrapper.find(
      'SAMButton[buttonClassModifier="edit-admin-warning--cancel-button"]'
    );
    expect(cancelButton.exists()).toBeTruthy();
    cancelButton.prop('onClickHandler')(fakeEvent);
    expect(mockCancelOnClickHandler).toHaveBeenCalled();
  });
});
