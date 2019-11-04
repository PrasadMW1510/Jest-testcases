import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import SchoolForm from 'components/SchoolForm';
import * as Constants from '../constants';

describe('<SchoolForm />', () => {
  let mockChange = null;
  let mockHandleSubmit = null;
  let mockHandleCancel = null;
  let mockHandleSave = null;
  let mockShowWarningModal = null;
  let initialValues = null;
  let mockFormData = null;
  const fakeEvent = { preventDefault: () => {} };
  beforeEach(() => {
    initialValues = fromJS({
      grades: [],
      numGradingPeriods: 4,
      schoolTypes: [],
    });
    mockFormData = fromJS({
      numGradingPeriods: 3,
    });
    mockChange = jest.fn();
    mockHandleSave = jest.fn();
    mockHandleSubmit = jest.fn().mockReturnValue(mockHandleSave);
    mockHandleCancel = jest.fn();
    mockShowWarningModal = jest.fn();
  });
  it('Expect to render correctly', () => {
    const wrapper = shallow(
      <SchoolForm
        change={mockChange}
        handleSubmit={mockHandleSubmit}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSave}
        initialValues={initialValues}
        showWarningModal={mockShowWarningModal}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to correctly handle immutable data', () => {
    const wrapper = shallow(
      <SchoolForm
        change={mockChange}
        grades={fromJS([1, 2, 3])}
        handleSubmit={mockHandleSubmit}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSave}
        initialValues={initialValues}
        schoolTypes={fromJS([1, 2, 3])}
        showWarningModal={mockShowWarningModal}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render correctly with number of grading periods', () => {
    const wrapper = shallow(
      <SchoolForm
        change={mockChange}
        grades={fromJS([1, 2, 3])}
        handleSubmit={mockHandleSubmit}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSave}
        formData={mockFormData}
        schoolTypes={fromJS([1, 2, 3])}
        showWarningModal={mockShowWarningModal}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render validation errors', () => {
    const wrapper = shallow(
      <SchoolForm
        change={mockChange}
        handleSubmit={mockHandleSubmit}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSave}
        initialValues={initialValues}
        showWarningModal={mockShowWarningModal}
        submitFailed
        validationErrors={{
          schoolContactZip: 'zip validation error',
          schoolTypes: 'school types validation error',
        }}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render server returned errors', () => {
    const wrapper = shallow(
      <SchoolForm
        change={mockChange}
        handleSubmit={mockHandleSubmit}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSave}
        initialValues={initialValues}
        serverErrors={{ name: 'Custom server error.' }}
        showWarningModal={mockShowWarningModal}
        submitFailed
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render correctly when contact info tab clicked', () => {
    const wrapper = shallow(
      <SchoolForm
        change={mockChange}
        handleSubmit={mockHandleSubmit}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSave}
        initialValues={initialValues}
        showWarningModal={mockShowWarningModal}
      />
    );
    wrapper
      .find('NavItem')
      .at(1)
      .simulate('click', {
        currentTarget: { id: Constants.TAB_CONTACT },
        preventDefault: () => {},
      });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to render correctly when profile tab clicked', () => {
    const wrapper = shallow(
      <SchoolForm
        change={mockChange}
        handleSubmit={mockHandleSubmit}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSave}
        initialValues={initialValues}
        showWarningModal={mockShowWarningModal}
      />
    );
    wrapper
      .find('NavItem')
      .first()
      .simulate('click', {
        currentTarget: { id: Constants.TAB_PROFILE },
        preventDefault: () => {},
      });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to render correctly when demographics tab clicked', () => {
    const wrapper = shallow(
      <SchoolForm
        change={mockChange}
        handleSubmit={mockHandleSubmit}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSave}
        initialValues={initialValues}
        showWarningModal={mockShowWarningModal}
      />
    );
    wrapper
      .find('NavItem')
      .last()
      .simulate('click', {
        currentTarget: { id: Constants.TAB_DEMOGRAPHICS },
        preventDefault: () => {},
      });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to handleSave instance method to call handleSave prop', () => {
    const wrapper = shallow(
      <SchoolForm
        change={mockChange}
        handleSubmit={mockHandleSubmit}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSave}
        initialValues={initialValues}
        showWarningModal={mockShowWarningModal}
      />
    );
    wrapper.instance().handleSave();
    expect(mockHandleSave).toHaveBeenCalled();
  });

  it('Expect to handle successful form submission', () => {
    const wrapper = shallow(
      <SchoolForm
        change={mockChange}
        handleSubmit={mockHandleSubmit}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSave}
        initialValues={initialValues}
        showWarningModal={mockShowWarningModal}
      />
    );
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(mockHandleSubmit).toHaveBeenCalled();
    expect(mockHandleSave).toHaveBeenCalled();
  });

  it('Expect to handle a cancel btn click', () => {
    const wrapper = shallow(
      <SchoolForm
        change={mockChange}
        handleSubmit={mockHandleSubmit}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSave}
        initialValues={initialValues}
        showWarningModal={mockShowWarningModal}
      />
    );
    const cancelButton = wrapper.find('SAMButton[isPrimaryButton=false]');
    cancelButton.prop('onClickHandler')(fakeEvent);
    expect(mockHandleCancel).toHaveBeenCalled();
  });
});
