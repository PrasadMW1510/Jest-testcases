import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { AddEditStudent } from '../AddEditStudent';

describe('<AddEditStudent />', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      hideModal: jest.fn(),
      initializeStudentFormRequest: jest.fn(),
      saveStudentRequest: jest.fn(),
    };
  });

  describe('render', () => {
    it('Expect to render correctly for "Add Student"', () => {
      wrapper = shallow(<AddEditStudent {...props} />);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it('Expect to render correctly for "Edit Student"', () => {
      wrapper = shallow(<AddEditStudent data={{ edit: true }} {...props} />);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
