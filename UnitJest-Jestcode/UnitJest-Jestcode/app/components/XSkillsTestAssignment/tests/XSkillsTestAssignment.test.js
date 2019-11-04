import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';

import XSkillsTestAssignment from '../index';

describe('<XSkillsTestAssignment />', () => {
  let wrapper = null;
  let wrapperInstance = null;
  const mockHandleSave = jest.fn();
  const mockSetIsolateTab = jest.fn();
  const mockTestsMeta = fromJS({
    test: [
      {
        test_number: '1',
        test_title: 'Test 1',
        test_description: 'Test 1: Skills from Workshops 1',
      },
      {
        test_number: '2',
        test_title: 'Test 2',
        test_description: 'Test 2: Skills from Workshops 2',
      },
      {
        test_number: '3',
        test_title: 'Test 3',
        test_description: 'Test 3: Skills from Workshops 3',
      },
      {
        test_number: '4',
        test_title: 'Test 4',
        test_description: 'Test 4: Skills from Workshops 4',
      },
      {
        test_number: '5',
        test_title: 'Test 5',
        test_description: 'Test 5: Skills from Workshop 5',
      },
      {
        test_number: '6',
        test_title: 'Test 6',
        test_description: 'Test 6: Skills from Workshop 6',
      },
      {
        test_number: '7',
        test_title: 'Test 7',
        test_description: 'Test 7: Skills from Workshops 7',
      },
      {
        test_number: '8',
        test_title: 'Test 8',
        test_description: 'Test 8: Skills from Workshops 8',
      },
    ],
  });
  const emptyTestMeta = fromJS({});

  const preventDefaultEvent = {
    preventDefault: () => {},
  };

  beforeEach(() => {
    wrapper = shallow(
      <XSkillsTestAssignment
        handleSave={mockHandleSave}
        highestCourse="C1"
        isTabIsolated={false}
        setIsolateTab={mockSetIsolateTab}
        testsMeta={mockTestsMeta}
      />
    );
    wrapperInstance = wrapper.instance();
    jest.spyOn(window, 'open');
  });

  afterEach(() => {
    jest.resetAllMocks();
    window.open.mockRestore();
  });

  it('should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render as expected when testsMeta is empty', () => {
    wrapper = shallow(
      <XSkillsTestAssignment
        handleSave={mockHandleSave}
        highestCourse="C1"
        isTabIsolated={false}
        setIsolateTab={mockSetIsolateTab}
        testsMeta={emptyTestMeta}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should update state when xSkillsTest is selected', () => {
    expect(mockSetIsolateTab).not.toHaveBeenCalled();
    expect(wrapper.state('selectedXSkillsTest')).toEqual(['']);
    const xTestRadio1 = wrapper.find('#xskillsTestRadio_3');
    xTestRadio1.simulate('change', { target: { value: 3, name: 'xskillsTestRadio_3' } });
    expect(wrapper.state('selectedXSkillsTest')).toEqual(['3']);
    expect(mockSetIsolateTab).toHaveBeenCalled();
  });

  it('handleTestPreviewButtonClick', () => {
    wrapperInstance.handleTestPreviewButtonClick();
    expect(window.open).toHaveBeenCalled();
  });

  it('handleSetInitialValues', () => {
    wrapper.setState({ selectedXSkillsTest: ['3'] });
    wrapperInstance.handleSetInitialValues();
    expect(wrapper.state('selectedXSkillsTest')).toEqual(['']);
    expect(mockSetIsolateTab).toHaveBeenCalled();
  });

  it('handleSaveAndReturn', () => {
    wrapper.setState({ selectedXSkillsTest: ['2'] });
    wrapperInstance.handleSaveAndReturn();
    expect(mockHandleSave).toHaveBeenCalledWith('2', true);
  });

  it('handleSubmit', () => {
    wrapper.setState({ selectedXSkillsTest: ['2'] });
    wrapperInstance.handleSubmit(preventDefaultEvent);
    expect(mockHandleSave).toHaveBeenCalledWith('2', false);
    expect(mockSetIsolateTab).toHaveBeenCalledWith(false);
  });

  it('isTabIsolated', () => {
    wrapper.setState({ isTabIsolated: true });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
