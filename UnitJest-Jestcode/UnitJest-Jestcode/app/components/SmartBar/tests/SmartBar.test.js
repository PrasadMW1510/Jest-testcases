import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { COHORT_TYPE } from 'containers/App/constants';
import SmartBar from '../index';

describe('<SmartBar />', () => {
  let wrapper = null;
  let mockTitleClick = null;

  beforeEach(() => {
    mockTitleClick = jest.fn();
  });

  it('should handle title clicks', () => {
    wrapper = shallow(<SmartBar onTitleClick={mockTitleClick} userOrgType={COHORT_TYPE.Teacher} />);
    wrapper.find('button').simulate('click');
    expect(mockTitleClick).toHaveBeenCalled();
  });

  describe('Teacher view', () => {
    beforeEach(() => {
      wrapper = shallow(
        <SmartBar onTitleClick={mockTitleClick} userOrgType={COHORT_TYPE.Teacher} />
      );
    });

    it('should match snapshot', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should contain title text My Classes', () => {
      const titleButton = wrapper.find('.smart-bar-container__title');
      expect(titleButton).toBeTruthy();
      expect(titleButton.text()).toContain('My Classes');
      titleButton.simulate('click');
      expect(mockTitleClick).toHaveBeenCalled();
    });
  });

  describe('School admin view', () => {
    beforeEach(() => {
      wrapper = shallow(
        <SmartBar onTitleClick={mockTitleClick} userOrgType={COHORT_TYPE.School} />
      );
    });

    it('should match snapshot', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should contain title text My School', () => {
      const titleButton = wrapper.find('.smart-bar-container__title');
      expect(titleButton).toBeTruthy();
      expect(titleButton.text()).toContain('My School');
      titleButton.simulate('click');
      expect(mockTitleClick).toHaveBeenCalled();
    });
  });

  describe('District admin view', () => {
    beforeEach(() => {
      wrapper = shallow(
        <SmartBar onTitleClick={mockTitleClick} userOrgType={COHORT_TYPE.District} />
      );
    });

    it('should match snapshot', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should contain title text My District', () => {
      const titleButton = wrapper.find('.smart-bar-container__title');
      expect(titleButton).toBeTruthy();
      expect(titleButton.text()).toContain('My District');
      titleButton.simulate('click');
      expect(mockTitleClick).toHaveBeenCalled();
    });
  });
});
