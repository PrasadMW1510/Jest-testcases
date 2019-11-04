import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import CheckboxControl from 'components/forms/CheckboxControl';

describe('<CheckboxControl />', () => {
  it('Should render correctly with items', () => {
    const wrapper = shallow(<CheckboxControl items={[1, 2, { id: 3, label: 'three' }]} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should render correctly with `row` flag set', () => {
    const wrapper = shallow(<CheckboxControl items={[1, 2, 3]} row />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should render correctly with custom label formatting', () => {
    const wrapper = shallow(
      <CheckboxControl items={[1, 2, 3]} formatLabel={label => `test: ${label}`} />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should render correctly with custom id formatting', () => {
    const wrapper = shallow(
      <CheckboxControl
        items={[1, 2, { label: 'foo', bar: 123 }]}
        getId={item => item.bar || item.id || item}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should render correctly with required flag set', () => {
    const wrapper = shallow(<CheckboxControl items={[1, 2, 3]} required />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should render correctly when errors present', () => {
    const wrapper = shallow(
      <CheckboxControl
        items={[1, 2, 3]}
        meta={{ error: 'Field has an error.', submitFailed: true }}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should render correctly when label is provided and not required', () => {
    const wrapper = shallow(<CheckboxControl items={[1, 2, 3]} label="Dummy Label" />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should render correctly when label is provided and required', () => {
    const wrapper = shallow(<CheckboxControl items={[1, 2, 3]} label="Dummy Label" required />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
