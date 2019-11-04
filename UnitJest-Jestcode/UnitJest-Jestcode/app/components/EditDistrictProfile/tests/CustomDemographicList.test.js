import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import SAMTable from 'components/SAMTable';
import CustomDemographicList from '../CustomDemographicList';

describe('<CustomDemographicList />', () => {
  let showModalSpy;
  beforeEach(() => {
    showModalSpy = jest.fn();
  });

  it('Should render correctly with no data', () => {
    const wrapper = mount(<CustomDemographicList demographics={[]} showModal={showModalSpy} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should populate the Custom Demographics Table with the right columns', () => {
    const mockData = {
      name: 'Test Demographics',
    };
    const mockRowData = {
      original: mockData,
    };
    const wrapper = shallow(
      <CustomDemographicList demographics={[mockData]} showModal={showModalSpy} />
    );
    const table = wrapper.find(SAMTable);
    const { columns } = table.props();

    const editColumn = columns.find(row => row.accessor === 'edit');
    const editColumnWrapper = shallow(editColumn.Cell(mockRowData));

    const deleteColumn = columns.find(row => row.accessor === 'delete');
    const deleteColumnWrapper = shallow(deleteColumn.Cell(mockRowData));

    expect(shallowToJson(editColumnWrapper)).toMatchSnapshot();
    expect(shallowToJson(deleteColumnWrapper)).toMatchSnapshot();
  });
});
