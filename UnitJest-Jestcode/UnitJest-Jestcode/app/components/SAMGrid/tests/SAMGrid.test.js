import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import SAMGrid from '../index';

describe('<SAMGrid/>', () => {
  let wrapper;

  const mockProps = {
    cellRenderer: () => {},
    columnWidth: 10,
    columnCount: 10,
    fixedColumnCount: 2,
    fixedRowCount: 1,
    height: 100,
    rowHeight: () => 15,
    rowWidth: 100,
    rowCount: 10,
    width: 100,
  };

  beforeEach(() => {
    wrapper = shallow(<SAMGrid {...mockProps} />);
  });

  it('Should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
