import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import UnsavedChangesNavigationModal from '../UnsavedChangesNavigationModal';

describe('<UnsavedChangesNavigationModal />', () => {
  let wrapper = null;
  const props = {
    cancelWarningNavigationModal: true,
    cancelWarningModalconClose: jest.fn(),
  };
  wrapper = shallow(<UnsavedChangesNavigationModal {...props} />);
  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
