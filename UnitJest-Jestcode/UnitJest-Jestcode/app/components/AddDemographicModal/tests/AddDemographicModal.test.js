import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import AddDemographicModal from '../index';

describe('<AddDemograpchicModal />', () => {
  let wrapper = null;

  const mockProps = {
    isOpen: true,
    nameTaken: false,
    deleteMode: false,
    onCancel: jest.fn(),
    onSave: jest.fn(),
    onDelete: jest.fn(),
    demographicToEdit: '',
    demographicToDelete: '',
    demographicList: [],
  };

  beforeEach(() => {
    wrapper = shallow(<AddDemographicModal {...mockProps} />);
  });

  it('Expect to match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
