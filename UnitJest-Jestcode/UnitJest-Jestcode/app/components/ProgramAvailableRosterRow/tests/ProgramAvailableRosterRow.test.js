import React from 'react';
import { shallow } from 'enzyme';
import { PROGRAM_LIST } from 'containers/App/constants';
import { shallowToJson } from 'enzyme-to-json';

import ProgramAvailableRosterRow from '../index';

describe('<ProgramAvailableRosterRow />', () => {
  let wrapper = null;

  describe('rowData message type is Unknown', () => {
    it('Should render correctly', () => {
      wrapper = shallow(<ProgramAvailableRosterRow />);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('rowData message type is not Unknown', () => {
    it('Should render correctly', () => {
      const mockRowData = {
        product_code: PROGRAM_LIST.SRI.code,
        settings: 'Settings',
        worksheets: 'Grading Tools',
        portfolio: '',
        certificates: '',
        display_image: '/c212d716ed7c102f439b6e66b719c2b1.png',
        display_name: 'The Reading Inventory',
      };

      wrapper = shallow(<ProgramAvailableRosterRow rowData={mockRowData} />);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('testing onCLick function', () => {
    let mockSelectProgram = null;
    it('onClick function to be called', () => {
      mockSelectProgram = jest.fn();
      const mockRowData = {
        product_code: PROGRAM_LIST.SRI.code,
        settings: 'Settings',
        worksheets: 'Grading Tools',
        portfolio: '',
        certificates: '',
        display_image: '/c212d716ed7c102f439b6e66b719c2b1.png',
        display_name: 'The Reading Inventory',
      };
      wrapper = shallow(
        <ProgramAvailableRosterRow rowData={mockRowData} onSelectProgram={mockSelectProgram} />
      );
      wrapper
        .find('.programs-body-table__link')
        .first()
        .simulate('click');
      expect(mockSelectProgram).toHaveBeenCalled();
    });
  });
});
