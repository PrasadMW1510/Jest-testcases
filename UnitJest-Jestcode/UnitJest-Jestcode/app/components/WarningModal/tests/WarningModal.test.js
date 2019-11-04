import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import WarningModal from '../index';

describe('<WarningModal />', () => {
  let wrapper = null;
  let mockOkOnClickHandler = null;
  const fakeEvent = { preventDefault: () => {} };

  beforeEach(() => {
    mockOkOnClickHandler = jest.fn();
    wrapper = shallow(<WarningModal isOpen okOnClickHandler={mockOkOnClickHandler} />);
  });

  it('Expect to match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('simulate Ok button click', () => {
    const okButton = wrapper.find('SAMButton');
    expect(okButton.exists()).toBeTruthy();
    okButton.prop('onClickHandler')(fakeEvent);
    expect(mockOkOnClickHandler).toHaveBeenCalled();
  });
});
