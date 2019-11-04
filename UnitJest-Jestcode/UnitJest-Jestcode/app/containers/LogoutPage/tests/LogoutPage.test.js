import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';

import { LogoutPage } from '../';

describe('<LogoutPage />', () => {
  let wrapper = null;
  let mockGlobal = null;
  let mockHistory = null;
  let mockLogoutRequest = null;

  beforeEach(() => {
    mockHistory = { push: jest.fn() };
    mockLogoutRequest = jest.fn();
  });

  describe('User is already logged in', () => {
    beforeEach(() => {
      mockGlobal = fromJS({
        currentUser: true,
      });
      wrapper = shallow(
        <LogoutPage global={mockGlobal} history={mockHistory} logoutRequest={mockLogoutRequest} />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Should logout the user', () => {
      expect(mockLogoutRequest).toHaveBeenCalled();
    });
  });

  describe('User is already logged out', () => {
    beforeEach(() => {
      mockGlobal = fromJS({
        currentUser: false,
      });
      wrapper = shallow(
        <LogoutPage global={mockGlobal} history={mockHistory} logoutRequest={mockLogoutRequest} />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Should redirect the user to the login page', () => {
      expect(mockHistory.push).toHaveBeenCalledWith('/login');
    });
  });
});
