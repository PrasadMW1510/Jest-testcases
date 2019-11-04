import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import SAMTable from 'components/SAMTable';
import StudentsTable from '../StudentsTable';

describe('<StudentsTable />', () => {
  const mockHandleRowCheckboxOnChange = jest.fn();
  const mockToggleAll = jest.fn();

  describe('rendering', () => {
    it('Should render correctly with no data', () => {
      const wrapper = mount(
        <StudentsTable
          students={[]}
          handleRowCheckboxOnChange={mockHandleRowCheckboxOnChange}
          toggleAllCheckboxes={mockToggleAll}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should populates the SAMTable with no data', () => {
      const wrapper = shallow(
        <StudentsTable
          students={[]}
          handleRowCheckboxOnChange={mockHandleRowCheckboxOnChange}
          toggleAllCheckboxes={mockToggleAll}
        />
      );
      const table = wrapper.find(SAMTable);
      const { data } = table.props();
      expect(data).toEqual([]);
    });

    it('Should render correctly with data', () => {
      const items = [
        {
          user_id: ['001'],
          first_name: 'foo',
          last_name: 'bar',
        },
      ];
      const wrapper = shallow(
        <StudentsTable
          students={items}
          handleRowCheckboxOnChange={mockHandleRowCheckboxOnChange}
          toggleAllCheckboxes={mockToggleAll}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
