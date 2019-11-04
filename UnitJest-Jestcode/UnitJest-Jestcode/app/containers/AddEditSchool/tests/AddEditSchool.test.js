import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { AddEditSchool, mapDispatchToProps } from '../AddEditSchool';

describe('<AddEditSchool />', () => {
  let wrapper = null;
  let mockHandleCancel = null;
  let mockHandleSave = null;
  let mockInitializeSchoolFormRequest = null;
  let mockDispatch = null;
  beforeEach(() => {
    mockInitializeSchoolFormRequest = jest.fn();
    mockHandleCancel = jest.fn();
    mockHandleSave = jest.fn();
    mockDispatch = jest.fn();
    wrapper = shallow(
      <AddEditSchool
        initializeSchoolFormRequest={mockInitializeSchoolFormRequest}
        handleCancel={mockHandleCancel}
        handleSave={mockHandleSave}
        showWarningModal={jest.fn()}
      />
    );
  });

  describe('Handlers', () => {
    it('Expect to handle submit failure with message correctly', () => {
      const message = 'Please enter a start date';
      const mockShowWarningModal = jest.fn();
      const mockValidationErrors = {
        popupErrorFieldName: 'schoolYearStart',
        schoolYearStart: message,
      };
      wrapper = shallow(
        <AddEditSchool
          initializeSchoolFormRequest={mockInitializeSchoolFormRequest}
          handleCancel={mockHandleCancel}
          handleSave={mockHandleSave}
          showWarningModal={mockShowWarningModal}
          validationErrors={mockValidationErrors}
        />
      );
      wrapper.instance().handleSubmitFail();
      expect(mockShowWarningModal).toHaveBeenCalledWith(message);
    });

    it('Expect to handle submit failure without message correctly', () => {
      const message = 'Please enter a start date';
      const mockShowWarningModal = jest.fn();
      const mockValidationErrors = {
        schoolYearStart: message,
      };
      wrapper = shallow(
        <AddEditSchool
          initializeSchoolFormRequest={mockInitializeSchoolFormRequest}
          handleCancel={mockHandleCancel}
          handleSave={mockHandleSave}
          showWarningModal={mockShowWarningModal}
          validationErrors={mockValidationErrors}
        />
      );
      wrapper.instance().handleSubmitFail();
      expect(mockShowWarningModal).toHaveBeenCalledTimes(0);
    });
  });

  describe('render', () => {
    it('Expect to render correctly for Add School', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Expect to render correctly for Edit School', () => {
      const wrapperForEdit = shallow(
        <AddEditSchool
          data={{ edit: true }}
          initializeSchoolFormRequest={mockInitializeSchoolFormRequest}
          handleCancel={mockHandleCancel}
          handleSave={mockHandleSave}
          showWarningModal={jest.fn()}
        />
      );
      expect(shallowToJson(wrapperForEdit)).toMatchSnapshot();
    });
  });

  describe('mapDispatchToProps', () => {
    it('Expect initializeSchoolFormRequest to call dispatch', () => {
      const { initializeSchoolFormRequest } = mapDispatchToProps(mockDispatch);
      initializeSchoolFormRequest();
      expect(mockDispatch).toHaveBeenCalled();
    });

    // TODO - needs to be fixed
    // it('Expect handleSave to call dispatch', () => {
    //   const { handleSave } = mapDispatchToProps(mockDispatch);
    //   handleSave();
    //   expect(mockDispatch).toHaveBeenCalled();
    // });

    it('Expect handleCancel to call dispatch', () => {
      const { handleCancel } = mapDispatchToProps(mockDispatch);
      handleCancel({ preventDefault: () => null });
      expect(mockDispatch).toHaveBeenCalled();
    });

    it('Expect showWarningModal to call dispatch', () => {
      const { showWarningModal } = mapDispatchToProps(mockDispatch);
      showWarningModal({ preventDefault: () => null });
      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});
