import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';

import S44CheckboxSection from '../index';

describe('<S44CheckboxSection />', () => {
  let wrapper = null;

  let mockHandleChangeCheckboxValue = null;

  const fakeEvent = {
    target: {
      checked: true,
    },
  };

  beforeEach(() => {
    mockHandleChangeCheckboxValue = jest.fn();
  });

  describe('isHalfHeight is true', () => {
    beforeEach(() => {
      wrapper = shallow(
        <S44CheckboxSection
          sectionTitle="mock section title"
          checkboxText="mock checkbox text"
          checkboxValue="0"
          handleChangeCheckboxValue={mockHandleChangeCheckboxValue}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('mockHandleChangeCheckboxValue is called on fakeEvent', () => {
      const settings = wrapper.find('SettingsFourStateCheckbox');
      settings.prop('handleChangeCheckboxValue')(fakeEvent);

      expect(mockHandleChangeCheckboxValue).toHaveBeenCalled();
    });
  });

  describe('isHalfHeight is false', () => {
    beforeEach(() => {
      wrapper = shallow(
        <S44CheckboxSection
          sectionTitle="mock section title"
          checkboxText="mock checkbox text"
          checkboxValue="0"
          handleChangeCheckboxValue={mockHandleChangeCheckboxValue}
          isHalfHeight={false}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('mockHandleChangeCheckboxValue is called on fakeEvent', () => {
      const settings = wrapper.find('SettingsFourStateCheckbox');
      settings.prop('handleChangeCheckboxValue')(fakeEvent);

      expect(mockHandleChangeCheckboxValue).toHaveBeenCalled();
    });
  });

  describe('isHalfWidth is true', () => {
    beforeEach(() => {
      wrapper = shallow(
        <S44CheckboxSection
          sectionTitle="mock section title"
          checkboxText="mock checkbox text"
          checkboxValue="0"
          handleChangeCheckboxValue={mockHandleChangeCheckboxValue}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('mockHandleChangeCheckboxValue is called on fakeEvent', () => {
      const settings = wrapper.find('SettingsFourStateCheckbox');
      settings.prop('handleChangeCheckboxValue')(fakeEvent);

      expect(mockHandleChangeCheckboxValue).toHaveBeenCalled();
    });
  });

  describe('isHalfWidth is false', () => {
    beforeEach(() => {
      wrapper = shallow(
        <S44CheckboxSection
          sectionTitle="mock section title"
          checkboxText="mock checkbox text"
          checkboxValue="0"
          handleChangeCheckboxValue={mockHandleChangeCheckboxValue}
          isHalfWidth={false}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('mockHandleChangeCheckboxValue is called on fakeEvent', () => {
      const settings = wrapper.find('SettingsFourStateCheckbox');
      settings.prop('handleChangeCheckboxValue')(fakeEvent);

      expect(mockHandleChangeCheckboxValue).toHaveBeenCalled();
    });
  });
});
