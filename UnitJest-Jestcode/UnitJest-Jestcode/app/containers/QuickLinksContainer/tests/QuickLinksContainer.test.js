import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import QuickLinks from 'components/QuickLinks';
import { HELP_PAGE_URL } from 'utils/externalLinkConstants';
import { USER_TYPE } from 'containers/App/constants';
import * as ModalConstants from 'containers/ModalController/constants';
import { QuickLinksContainer } from '../QuickLinksContainer';

describe('<QuickLinksContainer />', () => {
  let wrapper = null;
  let mockHistory = null;
  let mockShowModal;
  let mockShowLogoutModal = null;
  let mockShowSearchModal = null;
  let mockShowTeacherFormModal = null;
  const fakeEvent = { preventDefault: () => {} };

  beforeEach(() => {
    jest.spyOn(window, 'open');
    mockHistory = { push: jest.fn() };
    mockShowModal = jest.fn();
    mockShowLogoutModal = jest.fn();
    mockShowSearchModal = jest.fn();
    mockShowTeacherFormModal = jest.fn();
  });

  afterEach(() => {
    window.open.mockRestore();
  });

  describe('user type is admin', () => {
    beforeEach(() => {
      wrapper = shallow(
        <QuickLinksContainer
          history={mockHistory}
          profileUserType={USER_TYPE.Administrator}
          showModal={mockShowModal}
          showLogoutModal={mockShowLogoutModal}
          showSearchModal={mockShowSearchModal}
          showTeacherFormModal={mockShowTeacherFormModal}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Should handle the help click', () => {
      const quickLinks = wrapper.find(QuickLinks);
      quickLinks.prop('onHelpClick')(fakeEvent);
      expect(window.open).toHaveBeenCalledWith(HELP_PAGE_URL);
    });

    it('Should handle the home click', () => {
      const quickLinks = wrapper.find(QuickLinks);
      quickLinks.prop('onHomeClick')(fakeEvent);
      expect(mockHistory.push).toHaveBeenCalled();
    });

    it('Should handle logout', () => {
      const quickLinks = wrapper.find(QuickLinks);
      quickLinks.prop('onLogoutClick')(fakeEvent);
      expect(mockShowLogoutModal).toHaveBeenCalled();
    });

    it('Should handle the Search Click', () => {
      const quickLinks = wrapper.find(QuickLinks);
      quickLinks.prop('onSearchClick')(fakeEvent);
      expect(mockShowSearchModal).toHaveBeenCalled();
    });

    it('Should handle the profile click', () => {
      const quickLinks = wrapper.find(QuickLinks);
      quickLinks.prop('onProfileClick')(fakeEvent);
      const modalData = { editMode: true, editingSameAccount: true };
      expect(mockShowModal.mock.calls[0][0]).toEqual(ModalConstants.EDIT_ADMIN_MODAL);
      expect(mockShowModal.mock.calls[0][1]).toEqual(modalData);
      expect(mockShowTeacherFormModal).not.toHaveBeenCalled();
    });
  });

  describe('user type is tech', () => {
    beforeEach(() => {
      wrapper = shallow(
        <QuickLinksContainer
          history={mockHistory}
          profileUserType={USER_TYPE.Tech}
          showModal={mockShowModal}
          showLogoutModal={mockShowLogoutModal}
          showSearchModal={mockShowSearchModal}
          showTeacherFormModal={mockShowTeacherFormModal}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Should handle the help click', () => {
      const quickLinks = wrapper.find(QuickLinks);
      quickLinks.prop('onHelpClick')(fakeEvent);
      expect(window.open).toHaveBeenCalledWith(HELP_PAGE_URL);
    });

    it('Should handle logout', () => {
      const quickLinks = wrapper.find(QuickLinks);
      quickLinks.prop('onLogoutClick')(fakeEvent);
      expect(mockShowLogoutModal).toHaveBeenCalled();
    });

    it('Should handle the Search Click', () => {
      const quickLinks = wrapper.find(QuickLinks);
      quickLinks.prop('onSearchClick')(fakeEvent);
      expect(mockShowSearchModal).toHaveBeenCalled();
    });

    it('Should handle the profile click', () => {
      const quickLinks = wrapper.find(QuickLinks);
      quickLinks.prop('onProfileClick')(fakeEvent);
      const modalData = { editMode: true, editingSameAccount: true };
      expect(mockShowModal.mock.calls[0][0]).toEqual(ModalConstants.EDIT_ADMIN_MODAL);
      expect(mockShowModal.mock.calls[0][1]).toEqual(modalData);
      expect(mockShowTeacherFormModal).not.toHaveBeenCalled();
    });
  });

  describe('user type is teacher', () => {
    beforeEach(() => {
      wrapper = shallow(
        <QuickLinksContainer
          history={mockHistory}
          profileUserType={USER_TYPE.Teacher}
          showModal={mockShowModal}
          showLogoutModal={mockShowLogoutModal}
          showSearchModal={mockShowSearchModal}
          showTeacherFormModal={mockShowTeacherFormModal}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Should handle the help click', () => {
      const quickLinks = wrapper.find(QuickLinks);
      quickLinks.prop('onHelpClick')(fakeEvent);
      expect(window.open).toHaveBeenCalledWith(HELP_PAGE_URL);
    });

    it('Should handle logout', () => {
      const quickLinks = wrapper.find(QuickLinks);
      quickLinks.prop('onLogoutClick')(fakeEvent);
      expect(mockShowLogoutModal).toHaveBeenCalled();
    });

    it('Should handle the Search Click', () => {
      const quickLinks = wrapper.find(QuickLinks);
      quickLinks.prop('onSearchClick')(fakeEvent);
      expect(mockShowSearchModal).toHaveBeenCalled();
    });

    it('Should handle the profile click', () => {
      const quickLinks = wrapper.find(QuickLinks);
      quickLinks.prop('onProfileClick')(fakeEvent);
      expect(mockShowTeacherFormModal).toHaveBeenCalled();
      expect(mockShowModal).not.toHaveBeenCalled();
    });
  });

  describe('user type is not valid user type', () => {
    beforeEach(() => {
      wrapper = shallow(
        <QuickLinksContainer
          history={mockHistory}
          profileUserType="mockFakeUserType"
          showModal={mockShowModal}
          showLogoutModal={mockShowLogoutModal}
          showSearchModal={mockShowSearchModal}
          showTeacherFormModal={mockShowTeacherFormModal}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Should handle the help click', () => {
      const quickLinks = wrapper.find(QuickLinks);
      quickLinks.prop('onHelpClick')(fakeEvent);
      expect(window.open).toHaveBeenCalledWith(HELP_PAGE_URL);
    });

    it('Should handle logout', () => {
      const quickLinks = wrapper.find(QuickLinks);
      quickLinks.prop('onLogoutClick')(fakeEvent);
      expect(mockShowLogoutModal).toHaveBeenCalled();
    });

    it('Should handle the Search Click', () => {
      const quickLinks = wrapper.find(QuickLinks);
      quickLinks.prop('onSearchClick')(fakeEvent);
      expect(mockShowSearchModal).toHaveBeenCalled();
    });

    it('Should handle the profile click', () => {
      const quickLinks = wrapper.find(QuickLinks);
      quickLinks.prop('onProfileClick')(fakeEvent);
      expect(mockShowTeacherFormModal).not.toHaveBeenCalled();
      expect(mockShowModal).not.toHaveBeenCalled();
    });
  });
});
