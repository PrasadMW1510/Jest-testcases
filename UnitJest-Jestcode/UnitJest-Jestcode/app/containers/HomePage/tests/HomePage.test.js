import React from 'react';
import { shallow } from 'enzyme';
import ContentPanel from 'components/ContentPanel';
import FolderNavBar from 'components/FolderNavBar';
import MessageContainer from 'containers/MessageContainer';
import AppBar from 'components/AppBar';
import { USER_TYPE } from 'containers/App/constants';

import { HomePage } from '../HomePage';

describe('<HomePage />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(
      <HomePage
        profileUserType={USER_TYPE.Teacher}
        isGlobalLoading={false}
        showModal={jest.fn()}
        resetCredentials="false"
        isMessageContainerLoading={false}
      />
    );
  });

  it('should contain a ContentPanel', () => {
    expect(wrapper.find(ContentPanel).length).toEqual(1);
  });

  it('should contain a FolderNavBar', () => {
    expect(wrapper.contains(<FolderNavBar profileUserType={USER_TYPE.Teacher} />)).toBeTruthy();
  });

  it('should contain a MessageContainer', () => {
    expect(wrapper.contains(<MessageContainer />)).toBeTruthy();
  });

  it('should contain a AppBar', () => {
    expect(wrapper.contains(<AppBar />)).toBeTruthy();
  });

  describe('isLoading', () => {
    describe('isGlobalLoading is false, isMessageContainerLoading is false', () => {
      beforeEach(() => {
        wrapper = shallow(
          <HomePage
            profileUserType={USER_TYPE.Teacher}
            isGlobalLoading={false}
            showModal={jest.fn()}
            resetCredentials="false"
            isMessageContainerLoading={false}
          />
        );
      });

      it('isLoading returns true', () => {
        expect(wrapper.instance().isLoading()).toBeFalsy();
      });
    });

    describe('isGlobalLoading is true, isMessageContainerLoading is false', () => {
      beforeEach(() => {
        wrapper = shallow(
          <HomePage
            profileUserType={USER_TYPE.Teacher}
            isGlobalLoading
            showModal={jest.fn()}
            resetCredentials="false"
            isMessageContainerLoading={false}
          />
        );
      });

      it('isLoading returns true', () => {
        expect(wrapper.instance().isLoading()).toBeTruthy();
      });
    });

    describe('isGlobalLoading is false, isMessageContainerLoading is true', () => {
      beforeEach(() => {
        wrapper = shallow(
          <HomePage
            profileUserType={USER_TYPE.Teacher}
            isGlobalLoading={false}
            showModal={jest.fn()}
            resetCredentials="false"
            isMessageContainerLoading
          />
        );
      });

      it('isLoading returns true', () => {
        expect(wrapper.instance().isLoading()).toBeTruthy();
      });
    });

    describe('isGlobalLoading is true, isMessageContainerLoading is true', () => {
      beforeEach(() => {
        wrapper = shallow(
          <HomePage
            profileUserType="Administrator"
            showModal={jest.fn()}
            isGlobalLoading
            resetCredentials="false"
            isMessageContainerLoading
          />
        );
      });

      it('isLoading returns true', () => {
        expect(wrapper.instance().isLoading()).toBeTruthy();
      });
    });

    describe('resetCredentials is true', () => {
      beforeEach(() => {
        wrapper = shallow(
          <HomePage
            profileUserType="Administrator"
            showModal={jest.fn()}
            isGlobalLoading
            resetCredentials="true"
            isMessageContainerLoading
          />
        );
      });

      it('should showModal when componentDidMount', () => {
        wrapper.instance().componentDidMount();
        expect(wrapper.instance().props.showModal).toBeCalled();
      });
    });
  });
});
