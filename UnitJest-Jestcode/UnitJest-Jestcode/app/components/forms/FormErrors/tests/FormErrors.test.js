import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import FormErrors from '../index';

describe('<FormErrors />', () => {
  let wrapper = null;
  const mockValidationErrors = {
    password: true,
    user_name: 'username mock validation error',
  };
  const mockSubmitErrors = {
    password: true,
    email: 'email mock submit error',
  };
  const mockClassModifier = 'mockClassModifier';

  describe('default props are set', () => {
    beforeEach(() => {
      wrapper = shallow(<FormErrors />);
    });

    it('expect to match snapshot', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('shouldShowErrors behaves correctly', () => {
    it('prop provided as false matches snapshot', () => {
      wrapper = shallow(
        <FormErrors
          shouldShowErrors={false}
          submitErrors={mockSubmitErrors}
          classModifier={mockClassModifier}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('prop provided as true matches snapshot', () => {
      wrapper = shallow(
        <FormErrors
          shouldShowErrors
          submitErrors={mockSubmitErrors}
          classModifier={mockClassModifier}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('prop provided as undefined matches snapshot', () => {
      wrapper = shallow(
        <FormErrors
          shouldShowErrors={undefined}
          submitErrors={mockSubmitErrors}
          classModifier={mockClassModifier}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('submitErrors are set', () => {
    beforeEach(() => {
      wrapper = shallow(
        <FormErrors
          shouldShowErrors
          submitErrors={mockSubmitErrors}
          classModifier={mockClassModifier}
        />
      );
    });

    it('expect to match snapshot', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('validationErrors are set', () => {
    beforeEach(() => {
      wrapper = shallow(
        <FormErrors
          shouldShowErrors
          validationErrors={mockValidationErrors}
          classModifier={mockClassModifier}
        />
      );
    });

    it('expect to match snapshot', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('submitErrors and validationErrors are set', () => {
    beforeEach(() => {
      wrapper = shallow(
        <FormErrors
          shouldShowErrors
          submitErrors={mockSubmitErrors}
          validationErrors={mockValidationErrors}
          classModifier={mockClassModifier}
        />
      );
    });

    it('expect to match snapshot', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
