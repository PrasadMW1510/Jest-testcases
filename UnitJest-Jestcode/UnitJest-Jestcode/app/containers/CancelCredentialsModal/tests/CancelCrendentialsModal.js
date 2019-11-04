import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { CancelCrendentialsModal } from 'containers/CancelCredentialsModal';

describe('<CancelCredentialsModal />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(
      <CancelCrendentialsModal isOpen hideModal={jest.fn()} logoutRequest={jest.fn()} />
    );
  });

  it('Expect to match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should handleYes', () => {
    wrapper.instance().handleYes();
    expect(wrapper.instance().props.hideModal).toBeCalled();
    expect(wrapper.instance().props.logoutRequest).toBeCalled();
  });

  it('should handleNo', () => {
    wrapper.instance().handleNo();
    expect(wrapper.instance().props.hideModal).toBeCalled();
  });
});
