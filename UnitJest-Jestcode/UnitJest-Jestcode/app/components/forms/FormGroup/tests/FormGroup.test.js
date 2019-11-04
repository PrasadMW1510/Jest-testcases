import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import FormGroup from 'components/forms/FormGroup';

describe('<FormGroup />', () => {
  it('Should render correctly with a custom class', () => {
    const wrapper = shallow(<FormGroup className="my-custom-class">form group content</FormGroup>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render correctly with a custom props', () => {
    const wrapper = shallow(
      <FormGroup style={{ foo: 'test-if-custom-props-are-passed-on-to-dom-element' }}>
        form group content
      </FormGroup>
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render correctly with row flag set', () => {
    const wrapper = shallow(<FormGroup row>form group content</FormGroup>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
