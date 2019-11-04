import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';

import { IreadScreenerModalContainer } from '../index';

describe('<IreadScreenerModalContainer />', () => {
  let wrapper = null;

  let mockData = null;
  let mockHideModal = null;

  const fakeEvent = { preventDefault: () => {} };

  beforeEach(() => {
    mockData = {
      setNewAdministrationFlag: jest.fn(),
    };

    mockHideModal = jest.fn();

    wrapper = shallow(<IreadScreenerModalContainer data={mockData} hideModal={mockHideModal} />);
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('handleYes', () => {
    const yesButton = wrapper.find('SAMButton[isPrimaryButton=true]');
    yesButton.prop('onClickHandler')(fakeEvent);

    expect(mockHideModal).toHaveBeenCalled();
  });

  it('handleCancel', () => {
    const cancelButton = wrapper.find('SAMButton[isPrimaryButton=false]');
    cancelButton.prop('onClickHandler')(fakeEvent);

    expect(mockHideModal).toHaveBeenCalled();
    expect(mockData.setNewAdministrationFlag).toHaveBeenCalledWith('0');
  });
});
