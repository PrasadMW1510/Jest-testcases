import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import FolderButton from 'components/FolderButton';
import { USER_TYPE } from 'containers/App/constants';
import { ITS_PDF_LINK } from 'utils/externalLinkConstants';
import FolderNavBar from '../index';

describe('<FolderNavBar />', () => {
  let wrapper = null;

  describe('profileUserType is Teacher', () => {
    beforeEach(() => {
      wrapper = shallow(<FolderNavBar profileUserType={USER_TYPE.Teacher} />);
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Should display five folders', () => {
      expect(wrapper.find(FolderButton).length).toEqual(5);
    });

    it('Should contain ITS button', () => {
      expect(wrapper.find('button')).toHaveLength(1);
    });

    it('click on ITS button', () => {
      jest.spyOn(window, 'open');
      wrapper.find('button').simulate('click', { preventDefault: () => {} });
      expect(window.open).toHaveBeenCalledWith(ITS_PDF_LINK);
      window.open.mockRestore();
    });
  });

  describe('profileUserType is not Teacher', () => {
    beforeEach(() => {
      wrapper = shallow(<FolderNavBar profileUserType={USER_TYPE.Administrator} />);
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Should display five folders', () => {
      expect(wrapper.find(FolderButton).length).toEqual(5);
    });

    it('Should not contain ITS button', () => {
      expect(wrapper.find('button')).toHaveLength(0);
    });
  });
});
