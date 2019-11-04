import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { USER_ORG, PASSWORD_TYPES } from 'containers/App/constants';
import * as AdminConstants from 'components/ManageAdminAccounts/constants';
import { TAB_1, TAB_2, DA_PERMISSIONS } from '../constants';

import EditAdminForm from '../index';
import { mockPermissions } from './mockData';

describe('<EditAdminForm />', () => {
  let wrapper = null;
  let wrapperInstance = null;
  const mockHandleCancel = jest.fn();
  const mockHandleSave = jest.fn();
  const mockData = { editMode: true, editingSameAccount: true };
  const mockHandleSubmit = jest.fn();
  const fakeEvent = { preventDefault: () => {} };
  const fakeHandleTabClickEvent = {
    currentTarget: {
      id: 'mockTab',
    },
  };
  const mockSubmitErrors = fromJS({
    password: true,
    confirm_password: 'Password and password confirmation must match.',
  });
  const mockValidateErrors = {
    user_name: 'username error',
  };

  const mockSchools = fromJS([
    { name: ['school1'], org_id: ['org1'] },
    { name: ['school2'], org_id: ['org2'] },
  ]);
  const mockSchool = fromJS({ name: ['school1'], org_id: ['org1'] });

  const mockPasswordConfigsArray = [
    {
      $: {
        id: PASSWORD_TYPES.Complex,
      },
    },
    {
      $: {
        id: PASSWORD_TYPES.Medium,
      },
    },
    {
      $: {
        id: PASSWORD_TYPES.Simple,
      },
    },
  ];

  describe('userOrg is District', () => {
    describe('no errors in form', () => {
      beforeEach(() => {
        wrapper = shallow(
          <EditAdminForm
            data={mockData}
            handleCancel={mockHandleCancel}
            handleSave={mockHandleSave}
            handleSubmit={mockHandleSubmit}
            permissions={fromJS(mockPermissions)}
            schools={mockSchools}
            school={mockSchool}
            passwordConfigsArray={mockPasswordConfigsArray}
            userOrg={USER_ORG.District}
          />
        );

        wrapperInstance = wrapper.instance();
      });

      it('Expect to render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      it('handleTabClick changes state', () => {
        wrapperInstance.handleTabClick(fakeHandleTabClickEvent);
        expect(wrapper.state('activeTab')).toEqual(fakeHandleTabClickEvent.currentTarget.id);
      });

      it('handleSave calls mockHandleSave with passed value', () => {
        wrapperInstance.handleSave('mockValue', DA_PERMISSIONS);
        expect(mockHandleSave).toHaveBeenCalledWith('mockValue', DA_PERMISSIONS);
      });

      describe('showSection', () => {
        let expectedObj = null;
        let actualObj = null;

        it('tabId is activeTab, returns display: block', () => {
          expectedObj = { display: 'block' };
          actualObj = wrapperInstance.showSection(TAB_1.id);

          expect(actualObj).toEqual(expectedObj);
        });

        it('tabId is not activeTab, returns display: none', () => {
          expectedObj = { display: 'none' };
          actualObj = wrapperInstance.showSection(TAB_2.id);

          expect(actualObj).toEqual(expectedObj);
        });
      });

      it('submitFailed is false, showNavBarError returns false for tab1', () => {
        expect(wrapperInstance.showNavBarError(TAB_1.id)).toBeFalsy();
      });

      it('submitFailed is false, showNavBarError returns false for tab2', () => {
        expect(wrapperInstance.showNavBarError(TAB_2.id)).toBeFalsy();
      });

      it('handleCancel is called', () => {
        const cancelButton = wrapper.find('SAMButton[isPrimaryButton=false]');
        cancelButton.prop('onClickHandler')(fakeEvent);
        expect(mockHandleCancel).toHaveBeenCalled();
      });
    });

    describe('submitFailed and there are only validationErrors', () => {
      beforeEach(() => {
        wrapper = shallow(
          <EditAdminForm
            data={mockData}
            handleCancel={mockHandleCancel}
            handleSave={mockHandleSave}
            handleSubmit={mockHandleSubmit}
            passwordConfigsArray={mockPasswordConfigsArray}
            permissions={fromJS(mockPermissions)}
            schools={mockSchools}
            school={mockSchool}
            submitFailed
            validationErrors={mockValidateErrors}
            userOrg={USER_ORG.District}
          />
        );

        wrapperInstance = wrapper.instance();
      });

      it('Expect to render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      it('submitFailed is true, showNavBarError returns true for tab1', () => {
        expect(wrapperInstance.showNavBarError(TAB_1.id)).toBeTruthy();
      });

      it('submitFailed is true, showNavBarError returns false for tab2', () => {
        expect(wrapperInstance.showNavBarError(TAB_2.id)).toBeFalsy();
      });
    });

    describe('submitFailed and there are only submitErrors', () => {
      beforeEach(() => {
        wrapper = shallow(
          <EditAdminForm
            data={mockData}
            handleCancel={mockHandleCancel}
            handleSave={mockHandleSave}
            handleSubmit={mockHandleSubmit}
            passwordConfigsArray={mockPasswordConfigsArray}
            permissions={fromJS(mockPermissions)}
            schools={mockSchools}
            school={mockSchool}
            submitErrors={mockSubmitErrors}
            submitFailed
            userOrg={USER_ORG.District}
          />
        );

        wrapperInstance = wrapper.instance();
      });

      it('Expect to render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      it('submitFailed is true, showNavBarError returns true for tab1', () => {
        expect(wrapperInstance.showNavBarError(TAB_1.id)).toBeTruthy();
      });

      it('submitFailed is true, showNavBarError returns false for tab2', () => {
        expect(wrapperInstance.showNavBarError(TAB_2.id)).toBeFalsy();
      });
    });

    describe('submitFailed and there are submitErrors and validationErrors', () => {
      beforeEach(() => {
        wrapper = shallow(
          <EditAdminForm
            data={mockData}
            handleCancel={mockHandleCancel}
            handleSave={mockHandleSave}
            handleSubmit={mockHandleSubmit}
            passwordConfigsArray={mockPasswordConfigsArray}
            permissions={fromJS(mockPermissions)}
            schools={mockSchools}
            school={mockSchool}
            submitErrors={mockSubmitErrors}
            submitFailed
            validationErrors={mockValidateErrors}
            userOrg={USER_ORG.District}
          />
        );
      });

      it('Expect to render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      it('submitFailed is true, showNavBarError returns true for tab1', () => {
        expect(wrapperInstance.showNavBarError(TAB_1.id)).toBeTruthy();
      });

      it('submitFailed is true, showNavBarError returns false for tab2', () => {
        expect(wrapperInstance.showNavBarError(TAB_2.id)).toBeFalsy();
      });
    });
  });

  describe('userOrg is School', () => {
    describe('no errors in form', () => {
      beforeEach(() => {
        wrapper = shallow(
          <EditAdminForm
            data={mockData}
            handleCancel={mockHandleCancel}
            handleSave={mockHandleSave}
            handleSubmit={mockHandleSubmit}
            permissions={fromJS(mockPermissions)}
            schools={mockSchools}
            school={mockSchool}
            passwordConfigsArray={mockPasswordConfigsArray}
            userOrg={USER_ORG.School}
          />
        );

        wrapperInstance = wrapper.instance();
      });

      it('Expect to render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      it('handleTabClick changes state', () => {
        wrapperInstance.handleTabClick(fakeHandleTabClickEvent);
        expect(wrapper.state('activeTab')).toEqual(fakeHandleTabClickEvent.currentTarget.id);
      });

      it('handleSave calls mockHandleSave with passed value', () => {
        wrapperInstance.handleSave('mockValue', DA_PERMISSIONS);
        expect(mockHandleSave).toHaveBeenCalledWith('mockValue', DA_PERMISSIONS);
      });

      describe('showSection', () => {
        let expectedObj = null;
        let actualObj = null;

        it('tabId is activeTab, returns display: block', () => {
          expectedObj = { display: 'block' };
          actualObj = wrapperInstance.showSection(TAB_1.id);

          expect(actualObj).toEqual(expectedObj);
        });

        it('tabId is not activeTab, returns display: none', () => {
          expectedObj = { display: 'none' };
          actualObj = wrapperInstance.showSection(TAB_2.id);

          expect(actualObj).toEqual(expectedObj);
        });
      });

      it('submitFailed is false, showNavBarError returns false for tab1', () => {
        expect(wrapperInstance.showNavBarError(TAB_1.id)).toBeFalsy();
      });

      it('submitFailed is false, showNavBarError returns false for tab2', () => {
        expect(wrapperInstance.showNavBarError(TAB_2.id)).toBeFalsy();
      });

      it('handleCancel is called', () => {
        const cancelButton = wrapper.find('SAMButton[isPrimaryButton=false]');
        cancelButton.prop('onClickHandler')(fakeEvent);
        expect(mockHandleCancel).toHaveBeenCalled();
      });
    });

    describe('submitFailed and there are only validationErrors', () => {
      beforeEach(() => {
        wrapper = shallow(
          <EditAdminForm
            data={mockData}
            handleCancel={mockHandleCancel}
            handleSave={mockHandleSave}
            handleSubmit={mockHandleSubmit}
            passwordConfigsArray={mockPasswordConfigsArray}
            permissions={fromJS(mockPermissions)}
            schools={mockSchools}
            school={mockSchool}
            submitFailed
            validationErrors={mockValidateErrors}
            userOrg={USER_ORG.School}
          />
        );

        wrapperInstance = wrapper.instance();
      });

      it('Expect to render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      it('submitFailed is true, showNavBarError returns true for tab1', () => {
        expect(wrapperInstance.showNavBarError(TAB_1.id)).toBeTruthy();
      });

      it('submitFailed is true, showNavBarError returns false for tab2', () => {
        expect(wrapperInstance.showNavBarError(TAB_2.id)).toBeFalsy();
      });
    });

    describe('submitFailed and there are only submitErrors', () => {
      beforeEach(() => {
        wrapper = shallow(
          <EditAdminForm
            data={mockData}
            handleCancel={mockHandleCancel}
            handleSave={mockHandleSave}
            handleSubmit={mockHandleSubmit}
            passwordConfigsArray={mockPasswordConfigsArray}
            permissions={fromJS(mockPermissions)}
            schools={mockSchools}
            school={mockSchool}
            submitErrors={mockSubmitErrors}
            submitFailed
            userOrg={USER_ORG.School}
          />
        );

        wrapperInstance = wrapper.instance();
      });

      it('Expect to render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      it('submitFailed is true, showNavBarError returns true for tab1', () => {
        expect(wrapperInstance.showNavBarError(TAB_1.id)).toBeTruthy();
      });

      it('submitFailed is true, showNavBarError returns false for tab2', () => {
        expect(wrapperInstance.showNavBarError(TAB_2.id)).toBeFalsy();
      });
    });

    describe('submitFailed and there are submitErrors and validationErrors', () => {
      beforeEach(() => {
        wrapper = shallow(
          <EditAdminForm
            data={mockData}
            handleCancel={mockHandleCancel}
            handleSave={mockHandleSave}
            handleSubmit={mockHandleSubmit}
            passwordConfigsArray={mockPasswordConfigsArray}
            permissions={fromJS(mockPermissions)}
            schools={mockSchools}
            school={mockSchool}
            submitErrors={mockSubmitErrors}
            submitFailed
            validationErrors={mockValidateErrors}
            userOrg={USER_ORG.School}
          />
        );

        wrapperInstance = wrapper.instance();
      });

      it('Expect to render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      it('submitFailed is true, showNavBarError returns true for tab1', () => {
        expect(wrapperInstance.showNavBarError(TAB_1.id)).toBeTruthy();
      });

      it('submitFailed is true, showNavBarError returns false for tab2', () => {
        expect(wrapperInstance.showNavBarError(TAB_2.id)).toBeFalsy();
      });
    });
  });
  describe('Edit Admin form, when editMode is false', () => {
    beforeEach(() => {
      const addData = { editMode: false, adminType: AdminConstants.DISTRICT };
      wrapper = shallow(
        <EditAdminForm
          data={addData}
          handleCancel={mockHandleCancel}
          handleSave={mockHandleSave}
          handleSubmit={mockHandleSubmit}
          permissions={fromJS(mockPermissions)}
          schools={mockSchools}
          school={mockSchool}
          passwordConfigsArray={mockPasswordConfigsArray}
          userOrg={USER_ORG.District}
        />
      );

      wrapperInstance = wrapper.instance();
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should filter permissions when checked is true', () => {
      const checked = true;
      const selectedId = 'aaa';
      const setStateSpy = jest.fn();

      wrapper.instance().setState = setStateSpy;
      wrapper.instance().state.permissionsChecked = [];

      wrapper.instance().filterPermissions(checked, selectedId);
      expect(setStateSpy).toHaveBeenCalledWith({
        permissionsChecked: [selectedId],
      });
    });

    it('should filter permissions when checked is false', () => {
      const checked = false;
      const selectedId = 'aaa';
      const setStateSpy = jest.fn();

      wrapper.instance().setState = setStateSpy;
      wrapper.instance().state.permissionsChecked = [selectedId];

      wrapper.instance().filterPermissions(checked, selectedId);
      expect(setStateSpy).toHaveBeenCalledWith({ permissionsChecked: [] });
    });

    it('Expect to render when adding a school admin', () => {
      const addData = { editMode: false, adminType: AdminConstants.SCHOOL_TECHNICAL };

      wrapper = shallow(
        <EditAdminForm
          data={addData}
          handleCancel={mockHandleCancel}
          handleSave={mockHandleSave}
          handleSubmit={mockHandleSubmit}
          permissions={fromJS(mockPermissions)}
          schools={mockSchools}
          school={mockSchool}
          passwordConfigsArray={mockPasswordConfigsArray}
          userOrg={USER_ORG.District}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Expect to render when adding a school admin with a School Admin', () => {
      const addData = { editMode: false, adminType: AdminConstants.SCHOOL_TECHNICAL };

      wrapper = shallow(
        <EditAdminForm
          data={addData}
          handleCancel={mockHandleCancel}
          handleSave={mockHandleSave}
          handleSubmit={mockHandleSubmit}
          permissions={fromJS(mockPermissions)}
          schools={mockSchools}
          school={mockSchool}
          passwordConfigsArray={mockPasswordConfigsArray}
          userOrg={USER_ORG.School}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
