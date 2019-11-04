import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import IdentifyThisForm from 'components/ClassForm/IdentifyThisForm';

describe('<IdentifyThisForm />', () => {
  it('Expect to render correctly', () => {
    const wrapper = shallow(
      <IdentifyThisForm
        teachers={[{ last_name: 'Foo', first_name: 'Bar' }]}
        grades={[{ full_name: ['my grade'] }]}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('gets custom grade ids correctly', () => {
    const wrapper = shallow(
      <IdentifyThisForm
        teachers={[{ last_name: 'Foo', first_name: 'Bar' }]}
        grades={[{ full_name: ['my grade'] }]}
      />
    );
    const id = wrapper.instance().getGradeId({ name: ['foo'] });
    expect(id).toBe('foo');
  });
  it('Expect to format grade labels correctly', () => {
    const wrapper = shallow(
      <IdentifyThisForm
        teachers={[{ last_name: 'Foo', first_name: 'Bar' }]}
        grades={[{ full_name: ['my grade'] }]}
      />
    );
    const label1 = wrapper.instance().formatGradeLabel({ full_name: ['my grade'] });
    expect(label1).toBe('my grade');
    const label2 = wrapper.instance().formatGradeLabel({ full_name: null });
    expect(label2).toBe('');
  });
  it('Expect to format teacher labels correctly', () => {
    const wrapper = shallow(
      <IdentifyThisForm
        teachers={[{ last_name: 'Foo', first_name: 'Bar' }]}
        grades={[{ full_name: ['my grade'] }]}
      />
    );
    const label = wrapper.instance().formatTeacherLabel({ last_name: 'Foo', first_name: 'Bar' });
    expect(label).toBe('Foo, Bar');
  });
});
