import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import AddSchoolContactInfo from 'components/SchoolForm/SchoolContactInfo';

describe('<SchoolContactInfo />', () => {
  it('Expect to render correctly', () => {
    const mockFunc = jest.fn();
    const wrapper = shallow(<AddSchoolContactInfo refAssignFocusedField={mockFunc} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
