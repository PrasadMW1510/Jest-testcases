import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { AddEditClass } from '../AddEditClass';

describe('<AddEditClass />', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      hideModal: jest.fn(),
      saveClassRequest: jest.fn(),
      saveClassMIARequest: jest.fn(),
      initializeClassFormRequest: jest.fn(),
    };
  });

  describe('render', () => {
    it('Expect to render correctly for "Add Class"', () => {
      wrapper = shallow(<AddEditClass {...props} />);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it('Expect to render correctly for "Edit Class"', () => {
      wrapper = shallow(<AddEditClass data={{ edit: true }} {...props} />);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
