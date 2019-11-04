import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import CheckboxChangeModal from '../CheckboxChangeModal';

describe('<CheckboxChangeModal />', () => {
  let wrapper = null;
  const props = {
    closeStudentGoalModal: jest.fn(),
    handleShowSavedGradeModal: jest.fn(),
    showSavedGradeModal: true,
  };
  wrapper = shallow(<CheckboxChangeModal {...props} />);
  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
