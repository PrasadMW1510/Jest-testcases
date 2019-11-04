import React from 'react';

import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ProgramAvailableBar from 'components/ProgramAvailableBar';

import { ProgramAvailableBarContainer, mapDispatchToProps } from '../ProgramAvailableBarContainer';
import { fromJS } from '../../../../node_modules/immutable/dist/immutable';
// import { shallowToJson } from 'enzyme-to-json';

describe('<ProgramAvailableBarContainer />', () => {
  let wrapper = null;
  let mockedGlobalState = null;
  let mockedActions = null;
  let mockDispatchFn = null;

  beforeEach(() => {
    mockDispatchFn = jest.fn();
    //  mockedGlobalState = fromJS([{ community_id: 'DTM '}, { community_id: 'CDX' }, { community_id: 'E3D' }]);
    mockedGlobalState = fromJS([
      ['0:', { community_id: 'CDX' }],
      ['1:', { community_id: 'DTM' }],
      ['2:', { community_id: 'E3D' }],
    ]);
    // mockedGlobalState = fromJS([['$', 'CDX'], ['$', 'DTM'], ['$', 'E3D']]);
    mockedActions = { item: jest.fn() };
    wrapper = shallow(<ProgramAvailableBarContainer global={mockedGlobalState} />);
  });

  it('Should contain a ProgramAvailableBar', () => {
    expect(wrapper.find(ProgramAvailableBar).exists()).toBeTruthy();
  });
  it('Should contain a ProgramAvailableBar', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to pass mocked global state classes to ProgramAvailableBar', () => {
    expect(wrapper.find(ProgramAvailableBar).prop('items').size).toEqual(mockedGlobalState.length);
  });
  it('Expect to pass mocked action to the ProgramAvailableBar', () => {
    expect(wrapper.find(ProgramAvailableBar).prop('array')).toEqual(mockedActions.items);
  });
  it('Should pass dispatch to props', () => {
    const { allActions: actualDispatch } = mapDispatchToProps(mockDispatchFn);
    expect(actualDispatch).toBeDefined();
  });
});
