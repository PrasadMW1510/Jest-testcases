import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import SearchResultsEditCell from '../ResultTableEditCell';

describe('<AboutSamLink />', () => {
  let wrapper = null;
  let mockOnAboutClick = null;
  let mockItems = null;
  beforeEach(() => {
    mockItems = {
      name: 'SAM Server',
      version: 'v1.1',
    };
    mockOnAboutClick = jest.fn();
    wrapper = shallow(
      <SearchResultsEditCell rowData={mockItems} onRemoveClick={mockOnAboutClick} />
    );
  });

  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('handleshowMeClick', () => {
    it('on click', () => {
      const clickButton = wrapper.find('.search-results-table__result-td-cell button');
      wrapper
        .find('.search-results-table__result-td-cell button')
        .simulate('click', { preventDefault() {} });
      expect(clickButton.exists()).toBeTruthy();
    });
  });
});
