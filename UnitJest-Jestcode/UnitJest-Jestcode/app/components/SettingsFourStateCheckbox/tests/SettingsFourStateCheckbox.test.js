import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';

import SettingsFourStateCheckbox from '../index';

describe('<SettingsFourStateCheckbox />', () => {
  let wrapper = null;
  let mockHandleChangeCheckboxValue = null;

  beforeEach(() => {
    mockHandleChangeCheckboxValue = jest.fn();
  });

  describe('currentCheckboxValue is 1', () => {
    beforeEach(() => {
      wrapper = shallow(
        <SettingsFourStateCheckbox
          checkboxText="Value is 1"
          currentCheckboxValue="1"
          handleChangeCheckboxValue={mockHandleChangeCheckboxValue}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('currentCheckboxValue is 0', () => {
    beforeEach(() => {
      wrapper = shallow(
        <SettingsFourStateCheckbox
          checkboxText="Value is 0"
          currentCheckboxValue="0"
          handleChangeCheckboxValue={mockHandleChangeCheckboxValue}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('currentCheckboxValue is -1', () => {
    beforeEach(() => {
      wrapper = shallow(
        <SettingsFourStateCheckbox
          checkboxText="Value is -1"
          currentCheckboxValue="-1"
          handleChangeCheckboxValue={mockHandleChangeCheckboxValue}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('currentCheckboxValue is -2', () => {
    beforeEach(() => {
      wrapper = shallow(
        <SettingsFourStateCheckbox
          checkboxText="Value is -2"
          currentCheckboxValue="-2"
          handleChangeCheckboxValue={mockHandleChangeCheckboxValue}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('currentCheckboxValue is 2', () => {
    beforeEach(() => {
      wrapper = shallow(
        <SettingsFourStateCheckbox
          checkboxText="Value is 2"
          currentCheckboxValue="2"
          handleChangeCheckboxValue={mockHandleChangeCheckboxValue}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
