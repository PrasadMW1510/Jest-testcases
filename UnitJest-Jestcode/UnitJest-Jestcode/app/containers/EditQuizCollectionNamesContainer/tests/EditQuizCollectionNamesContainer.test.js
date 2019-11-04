import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { EditQuizCollectionNames } from 'components/EditQuizCollectionNames';
import {
  EditQuizCollectionNamesContainer,
  mapDispatchToProps,
} from '../EditQuizCollectionNamesContainer';

describe('EditQuizCollectionNamesContainer', () => {
  let wrapper = null;
  const mockgetEditQuizCollectionNamesDataRequest = jest.fn();
  const mockinitializeQuizNameRequest = jest.fn();
  beforeEach(() => {
    const props = {
      fetchSuccess: true,
      handleSave: jest.fn(),
      handleCancel: jest.fn(),
      mockDispatch: jest.fn(),
      editQuizCollectionNamesContainer: {
        editQuizCollectionNamesData: [{ Name: ['', 'cc', 'All Collections'] }],
        saveSuccess: true,
      },
    };
    wrapper = shallow(
      <EditQuizCollectionNamesContainer
        getEditQuizCollectionNamesDataRequest={mockgetEditQuizCollectionNamesDataRequest}
        initializeQuizNameRequest={mockinitializeQuizNameRequest}
        {...props}
      />
    );
  });
  it('to render', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('', () => {
    const mockObject = jest.fn;
    const mapDispatchToPropscomp = mapDispatchToProps(mockObject);
    expect(mapDispatchToPropscomp.handleCancel().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.handleSave().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.initializeQuizNameRequest().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.getEditQuizCollectionNamesDataRequest().mock.calls.length).toBe(
      0
    );
  });
});
describe('EditQuizCollectionNamesContainer', () => {
  let wrapper = null;
  const mockgetEditQuizCollectionNamesDataRequest = jest.fn();
  const mockinitializeQuizNameRequest = jest.fn();
  beforeEach(() => {
    const props = {
      handleSave: jest.fn(),
      handleCancel: jest.fn(),
      mockDispatch: jest.fn(),
      editQuizCollectionNamesContainer: {
        editQuizCollectionNamesData: [],
        saveSuccess: true,
      },
    };
    wrapper = shallow(
      <EditQuizCollectionNamesContainer
        getEditQuizCollectionNamesDataRequest={mockgetEditQuizCollectionNamesDataRequest}
        initializeQuizNameRequest={mockinitializeQuizNameRequest}
        {...props}
      />
    );
  });
  it('to render', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(shallowToJson(EditQuizCollectionNames)).toMatchSnapshot();
  });
  it('', () => {
    const mockObject = jest.fn;
    const mapDispatchToPropscomp = mapDispatchToProps(mockObject);
    expect(mapDispatchToPropscomp.handleCancel().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.handleSave().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.initializeQuizNameRequest().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.getEditQuizCollectionNamesDataRequest().mock.calls.length).toBe(
      0
    );
  });
});
