import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import LoginBox from 'components/LoginBox';
import LoginErrorBox from 'components/LoginErrorBox';
import ConnectedLoginPage, { LoginPage } from '../index';

describe('<LoginPage />', () => {
  let wrapper = null;
  let mockLoginRequest = null;
  let mockHintRequest = null;
  let mockGlobal = null;
  let username = null;
  let password = null;
  let mockHistory = null;

  beforeEach(() => {
    mockLoginRequest = jest.fn();
    mockHintRequest = jest.fn();
    mockGlobal = fromJS({
      error: 'invalid login',
    });
    username = 'john';
    password = 'smith';

    mockHistory = { push: jest.fn() };

    wrapper = shallow(
      <LoginPage
        loginRequest={mockLoginRequest}
        passwordHintRequest={mockHintRequest}
        global={mockGlobal}
        history={mockHistory}
      />
    );
  });

  it('Should define a default export', () => {
    expect(ConnectedLoginPage).toBeDefined();
  });

  it('Should push the user to the homepage when the user is already logged in', () => {
    mockGlobal = mockGlobal.set('currentUser', true);
    wrapper = shallow(
      <LoginPage
        loginRequest={mockLoginRequest}
        passwordHintRequest={mockHintRequest}
        global={mockGlobal}
        history={mockHistory}
      />
    );
    expect(mockHistory.push).toHaveBeenCalledWith('/');
  });

  it('Should handle login requests', () => {
    const loginBoxElem = wrapper.find(LoginBox);
    loginBoxElem.prop('onSubmit')({ username, password });
    expect(mockLoginRequest).toHaveBeenCalledWith(username, password);
  });

  it('Should handle password hint requests', () => {
    const loginBoxElem = wrapper.find(LoginBox);
    loginBoxElem.prop('onPasswordHint')();
    expect(mockHintRequest).toHaveBeenCalled();
  });

  it('Should pass on global errors', () => {
    const loginErrorElem = wrapper.find(LoginErrorBox);
    expect(loginErrorElem.prop('error')).toBe(mockGlobal.get('error'));
  });
});
