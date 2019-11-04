import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import DropdownControl from 'components/forms/DropdownControl';

describe('<DropdownControl />', () => {
  it('Should render correctly with a custom class', () => {
    const wrapper = shallow(
      <DropdownControl className="my-custom-class">dropdown control content</DropdownControl>
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render correctly with items', () => {
    const wrapper = shallow(<DropdownControl items={[1, 2, 3]} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render correctly with custom label formatting', () => {
    const wrapper = shallow(
      <DropdownControl items={[1, 2, 3]} formatLabel={label => `test: ${label}`} />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render correctly with required flag set', () => {
    const wrapper = shallow(<DropdownControl items={[1, 2, 3]} required />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render correctly with String input', () => {
    const wrapper = shallow(<DropdownControl items={[1, 'two', 3]} required />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render correctly when errors present', () => {
    const wrapper = shallow(
      <DropdownControl
        items={[1, 2, 3]}
        meta={{ error: 'Field has an error.', submitFailed: true }}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
