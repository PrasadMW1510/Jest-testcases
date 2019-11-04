import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import FormSection from '../index';

describe('<FormSection />', () => {
  let wrapper = null;

  describe('renders with default sectionClassModifier and sectionStyle', () => {
    beforeEach(() => {
      wrapper = shallow(
        <FormSection headerText="Form section header">This is a form section</FormSection>
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('renders without default sectionClassModifier and sectionStyle', () => {
    beforeEach(() => {
      wrapper = shallow(
        <FormSection
          headerText="Form section header"
          sectionClassModifier="classModifier"
          sectionStyle={{ display: 'none' }}
        >
          This is a form section
        </FormSection>
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
