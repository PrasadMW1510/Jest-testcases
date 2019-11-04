import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import SearchResultsEditCell from '../SearchResultsEditCell';

describe('<SearchResultsEditCell />', () => {
  let wrapper = null;
  let mockhandleStudent = null;
  let mockItems = null;
  let mockclickHandler = null;
  beforeEach(() => {
    mockItems = {
      name: 'SAM Server',
      version: 'v1.1',
    };
    mockhandleStudent = jest.fn();
    mockclickHandler = jest.fn();
    wrapper = shallow(
      <SearchResultsEditCell
        rowData={mockItems}
        handleStudent={mockhandleStudent}
        clickHandler={mockclickHandler}
      />
    );
  });
  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  describe('handleshowMeClick', () => {
    it('on click', () => {
      wrapper
        .find('.search-results-table__result-td-cell a')
        .simulate('click', { preventDefault: () => {} });
    });
  });
});
