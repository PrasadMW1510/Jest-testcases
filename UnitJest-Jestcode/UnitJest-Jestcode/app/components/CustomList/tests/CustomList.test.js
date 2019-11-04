import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import CustomList from '../index';

describe('<Custom />', () => {
  let wrapper = null;
  let mockgetselectedbookresults = null;
  let mockclearCustomList = null;
  let mocksearchresultsData = null;
  let mockSearchResultDetailsRequest = null;
  let mocksearchDetailModal = null;
  beforeEach(() => {
    mockgetselectedbookresults = jest.fn();
    mockclearCustomList = jest.fn();
    mockSearchResultDetailsRequest = jest.fn();
    mocksearchDetailModal = jest.fn();
    mocksearchresultsData = {
      searchResultsIdsChecked: ['111'],
      selectedItems: [
        {
          id: '_11111',
        },
      ],
    };
    wrapper = shallow(
      <CustomList
        searchresultsData={mocksearchresultsData}
        makeSelectedbookresults={mockgetselectedbookresults}
        clearCustomList={mockclearCustomList}
        searchResultDetailsRequest={mockSearchResultDetailsRequest}
        searchDetailModal={mocksearchDetailModal}
      />
    );
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render correctly componentDidMount when searchresultsData is undefined', () => {
    wrapper = shallow(
      <CustomList
        makeSelectedbookresults={mockgetselectedbookresults}
        clearCustomList={mockclearCustomList}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to call clearList ', () => {
    const setStateSpy = jest.fn();
    wrapper.instance().setState = setStateSpy;
    wrapper.instance().clearList();
    expect(setStateSpy).toHaveBeenCalledWith({ showDelete: true });
  });
  it('Expect to call deleteCustomList  ', () => {
    wrapper.instance().deleteCustomList();
    expect(wrapper.instance().props.clearCustomList).toBeCalled();
  });
  it('Expect to call escFunc', () => {
    const event = {
      keyCode: 27,
    };
    wrapper.setState({ showDelete: true });
    wrapper.instance().escFunc(event);
    expect(wrapper.state('showDelete')).toBeFalsy();
  });
  it('Expect to call escFunc', () => {
    const event = {
      keyCode: 26,
    };
    wrapper.setState({ showDelete: true });
    wrapper.instance().escFunc(event);
    expect(wrapper.state('showDelete')).toBeTruthy();
  });
  it('Expect to call removeDeleteBox  ', () => {
    const setStateSpy = jest.fn();
    wrapper.instance().setState = setStateSpy;
    wrapper.instance().removeDeleteBox();
    expect(wrapper.state('showDelete')).toBeFalsy();
  });
  it('Expect to call SearchResultDetailsRequest  ', () => {
    wrapper.instance().searchResultDetailsRequest();
    expect(wrapper.instance().props.searchResultDetailsRequest).toBeCalled();
  });
  it('Expect to call removeListRow', () => {
    const row = {
      ID: ['111'],
    };
    wrapper.instance().removeListRow(row);
    expect(wrapper.instance().props.searchresultsData.searchResultsIdsChecked).toEqual(['111']);
  });
  it('Expect to call escFunc', () => {
    const event = {
      keyCode: 27,
    };
    wrapper.setState({ showDelete: true });
    wrapper.instance().escFunc(event);
    expect(wrapper.state('showDelete')).toBeFalsy();
  });
  it('Expect to call escFunc', () => {
    const event = {
      keyCode: 26,
    };
    wrapper.setState({ showDelete: true });
    wrapper.instance().escFunc(event);
    expect(wrapper.state('showDelete')).toBeTruthy();
  });
  it('Expect to call removeListRow if', () => {
    const row = {
      ID: ['1'],
    };
    wrapper.instance().removeListRow(row);
    expect(wrapper.instance().props.searchresultsData.searchResultsIdsChecked).toEqual([]);
  });
  it('Expect to call getSelecedDataArrayIndex else', () => {
    const resultSet = ['1'];
    const dataID = ['11122'];
    const index = wrapper.instance().getSelecedDataArrayIndex(resultSet, dataID);
    expect(index).toEqual(-1);
  });
  it('Expect to call getSelecedDataArrayIndex if', () => {
    const resultSet = ['1'];
    const dataID = ['1'];
    const index = wrapper.instance().getSelecedDataArrayIndex(resultSet, dataID);
    expect(index).toEqual(0);
  });
});
