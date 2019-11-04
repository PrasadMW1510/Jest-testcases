import React from 'react';
import { mount } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';
import LoginBox from '../index';

describe('<LoginBox />', () => {
  let wrapper = null;
  let mockOnSubmit = null;
  let mockOnPasswordHint = null;

  beforeEach(() => {
    mockOnSubmit = jest.fn();
    mockOnPasswordHint = jest.fn();
    wrapper = mount(<LoginBox onSubmit={mockOnSubmit} onPasswordHint={mockOnPasswordHint} />);
  });

  it('Expect to render correctly', () => {
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  it('Should handle form onSubmit', () => {
    wrapper.find('form').simulate('submit');
  });

  it('Should handle the change username', () => {
    const usernameInput = wrapper.find('#login__username-input');
    expect(wrapper.state('username')).toEqual('');
    usernameInput.simulate('change', { target: { value: 'new name' } });
    expect(wrapper.state('username')).toEqual('new name');
  });

  it('Should handle the change password', () => {
    const passwordInput = wrapper.find('#login__password-input');
    expect(wrapper.state('password')).toEqual('');
    passwordInput.simulate('change', { target: { value: 'new password' } });
    expect(wrapper.state('password')).toEqual('new password');
  });

  it('Should handle form onSubmit with username and password', () => {
    const usernameInput = wrapper.find('#login__username-input');
    usernameInput.simulate('change', { target: { value: 'new name' } });
    const passwordInput = wrapper.find('#login__password-input');
    passwordInput.simulate('change', { target: { value: 'new password' } });
    wrapper.find('form').simulate('submit');
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('Should not submit with missing username and password', () => {
    wrapper.find('form').simulate('submit');
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  describe('Password hint', () => {
    let hintButton = null;

    beforeEach(() => {
      hintButton = wrapper.find('.login__hint-text');
    });

    it('Should call password hint if username is present', () => {
      wrapper.setState({ username: 'asparagus' });
      hintButton.simulate('click');

      expect(mockOnPasswordHint).toHaveBeenCalled();
    });

    it('Should not call password hint if username is not present', () => {
      hintButton.simulate('click');

      expect(mockOnPasswordHint).not.toHaveBeenCalled();
    });
  });
});
