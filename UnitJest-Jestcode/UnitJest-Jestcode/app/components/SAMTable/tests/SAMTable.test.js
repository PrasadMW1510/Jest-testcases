import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import SAMTable from '../index';

describe('<SAMTable />', () => {
  let wrapper;
  let wrapperInstance;

  const handleRowCheckboxOnChangeSpy = jest.fn();
  const toggleAllCheckboxesSpy = jest.fn();
  const renderEmptyTableSpy = jest.fn();

  const mockProps = {
    checkedIds: ['aaa', 'bbb'],
    className: 'msg-log-table',
    columns: [],
    data: [],
    hasCheckboxes: true,
    renderEmptyTable: renderEmptyTableSpy,
    handleRowCheckboxOnChange: handleRowCheckboxOnChangeSpy,
    toggleAllCheckboxes: toggleAllCheckboxesSpy,
    selectAll: false,
  };

  beforeEach(() => {
    wrapper = shallow(<SAMTable {...mockProps} />);
    wrapperInstance = wrapper.instance();

    // Mock checkboxTable methods
    wrapperInstance.checkboxTable = jest.fn(() => ({
      getWrappedInstance: jest.fn(() => ({
        sortedData: [{ _id: 'aaa' }],
      })),
    }));
  });

  it('Should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should return a react table without checkboxes correctly', () => {
    const mockData = {
      _id: 'aaa',
      title: 'ttt',
    };
    wrapper = shallow(<SAMTable {...mockProps} data={[mockData]} hasCheckboxes={false} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should toggle selection true when not in the checkedId array', () => {
    const mockRowId = 'ccc';
    wrapperInstance.toggleSelection(mockRowId);
    expect(handleRowCheckboxOnChangeSpy).toHaveBeenCalledWith(true, mockRowId);
  });

  it('should toggle selection false when in the checkedId array', () => {
    const mockRowId = 'aaa';
    wrapperInstance.toggleSelection(mockRowId);
    expect(handleRowCheckboxOnChangeSpy).toHaveBeenCalledWith(false, mockRowId);
  });

  it('should toggle all true when selectAll is false', () => {
    const mockRowIds = ['aaa', 'bbb', 'ccc'];
    const mockSortedData = [
      {
        _original: {
          _id: mockRowIds[0],
        },
      },
      {
        _original: {
          _id: mockRowIds[1],
        },
      },
      {
        _original: {
          _id: mockRowIds[2],
        },
      },
    ];

    wrapperInstance.checkboxTable.getWrappedInstance = jest.fn(() => ({
      getResolvedState: () => ({
        sortedData: mockSortedData,
      }),
    }));

    wrapperInstance.toggleAll();
    expect(toggleAllCheckboxesSpy).toHaveBeenCalledWith(true, mockRowIds);
  });

  it('should toggle all false when selectAll is true', () => {
    const selectAllWrapper = shallow(
      <SAMTable
        checkedIds={['aaa', 'bbb']}
        className="msg-log-table"
        columns={[]}
        data={[]}
        renderEmptyTable={renderEmptyTableSpy}
        hasCheckboxes
        handleRowCheckboxOnChange={handleRowCheckboxOnChangeSpy}
        toggleAllCheckboxes={toggleAllCheckboxesSpy}
        selectAll
      />
    );
    const selectAllWrapperInstance = selectAllWrapper.instance();

    selectAllWrapperInstance.toggleAll();
    expect(toggleAllCheckboxesSpy).toHaveBeenCalledWith(false, []);
  });

  it('should return isSelected true or false if the id is in checkboxIds prop', () => {
    expect(wrapperInstance.isSelected('aaa')).toBe(true);
    expect(wrapperInstance.isSelected('bbb')).toBe(true);
    expect(wrapperInstance.isSelected('ccc')).toBe(false);
  });

  it('should pass renderEmptyBody prop as a body when there is no data', () => {
    const checkboxTable = wrapper.find('RTSelectTable');
    const { TbodyComponent } = checkboxTable.props();

    expect(TbodyComponent).toEqual(wrapperInstance.props.renderEmptyTable);
  });

  it('should return a normal body when data has length', () => {
    const mockData = {
      _id: 'aaa',
      title: 'ttt',
    };
    wrapper = shallow(<SAMTable {...mockProps} data={[mockData]} />);
    const checkboxTable = wrapper.find('RTSelectTable');
    const { body } = checkboxTable.props();

    expect(shallowToJson(body)).toMatchSnapshot();
  });

  it('should have a defaultSortMethod that sorts correctly', () => {
    const table = wrapper.find('RTSelectTable');
    const { defaultSortMethod } = table.props();

    expect(defaultSortMethod(null, 'a')).toEqual(1);
    expect(defaultSortMethod('a', null)).toEqual(-1);
    expect(defaultSortMethod('a', 'A')).toEqual(defaultSortMethod('A', 'a'));
    expect(defaultSortMethod(['a'], ['A'])).toEqual(defaultSortMethod(['A'], ['a']));
  });
});
