import React from 'react';
import { shallow } from 'enzyme';

import { EditAdminWarningContainer } from '../index';

describe('<EditAdminWarningContainer />', () => {
  let wrapper = null;
  let mockData = null;
  let mockHideModal = null;
  let mockPostSaveAdminRequest = null;
  let mockPostSaveTeacherRequest = null;
  let modal = null;
  const fakeEvent = { preventDefault: () => {} };

  beforeEach(() => {
    mockHideModal = jest.fn();
    mockPostSaveAdminRequest = jest.fn();
    mockPostSaveTeacherRequest = jest.fn();
  });

  describe('isTeacher is true', () => {
    beforeEach(() => {
      mockData = { values: 'mockValues', isTeacher: true, permissionsChecked: ['100'] };

      wrapper = shallow(
        <EditAdminWarningContainer
          data={mockData}
          hideModal={mockHideModal}
          postSaveAdminRequest={mockPostSaveAdminRequest}
          postSaveTeacherRequest={mockPostSaveTeacherRequest}
        />
      );

      modal = wrapper.find('EditAdminWarning');
    });

    it('should have EditAdminWarning', () => {
      expect(modal).toBeDefined();
    });

    it('should close modal and save data on Ok clicked', () => {
      modal.prop('okOnClickHandler')(fakeEvent);
      expect(mockHideModal).toHaveBeenCalled();
      expect(mockPostSaveTeacherRequest).toHaveBeenCalledWith(
        mockData.values,
        mockData.permissionsChecked
      );
    });

    it('should close modal on cancel clicked', () => {
      modal.prop('cancelOnClickHandler')(fakeEvent);
      expect(mockHideModal).toHaveBeenCalled();
    });
  });

  describe('isTeacher is false', () => {
    beforeEach(() => {
      mockData = { values: 'mockValues', isTeacher: false, editingSameAccount: true };

      wrapper = shallow(
        <EditAdminWarningContainer
          data={mockData}
          hideModal={mockHideModal}
          postSaveAdminRequest={mockPostSaveAdminRequest}
          postSaveTeacherRequest={mockPostSaveTeacherRequest}
        />
      );

      modal = wrapper.find('EditAdminWarning');
    });

    it('should have EditAdminWarning', () => {
      expect(modal).toBeDefined();
    });

    it('should close modal and save data on Ok clicked', () => {
      modal.prop('okOnClickHandler')(fakeEvent);
      expect(mockHideModal).toHaveBeenCalled();
      expect(mockPostSaveAdminRequest).toHaveBeenCalledWith(mockData.values, [], true);
    });

    it('should close modal on cancel clicked', () => {
      modal.prop('cancelOnClickHandler')(fakeEvent);
      expect(mockHideModal).toHaveBeenCalled();
    });
  });
});
