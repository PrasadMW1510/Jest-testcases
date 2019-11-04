import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import UnSavedChangesModal from '../UnSavedChangesModal';

describe('<UnSavedChangesModal />', () => {
  let wrapper = null;
  const props = {
    cancelWarningModal: true,
    closeStudentGoalModal: jest.fn(),
    cancelWarningModalconClose: jest.fn(),
  };
  wrapper = shallow(<UnSavedChangesModal {...props} />);
  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
