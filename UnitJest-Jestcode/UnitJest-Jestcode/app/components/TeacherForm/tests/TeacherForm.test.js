import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import React from 'react';
import { Field } from 'redux-form/immutable';

import { mockPermissions } from 'components/EditAdminForm/tests/mockData';
import { CheckboxControl } from 'components/forms';
import { PASSWORD_TYPES, USER_TYPE } from 'containers/App/constants';

import { TAB_1, TAB_2, TAB_3, TEACHER_PERMISSIONS_DEFAULT } from '../constants';
import TeacherForm from '../index';

describe('<TeacherForm />', () => {
  let wrapper = null;
  let wrapperInstance = null;

  let mockData = null;
  let mockHandleCancel = null;
  let mockHandleSave = null;
  let mockHandleSubmit = null;
  let mockValidateErrors = null;
  const mockPermissionsChecked = TEACHER_PERMISSIONS_DEFAULT;
  const mockUserType = USER_TYPE.Teacher;
  const mockEditingSameAccount = true;
  const mockAssociatedClasses = null;

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

  const mockSchoolsAndClasses = {
    school: [
      {
        school_id: [1],
        school_name: ['mockSchool1'],
        classes: [
          {
            class: [
              {
                class_id: [1],
                class_name: ['mockClass1'],
              },
              {
                class_id: [2],
                class_name: ['mockClass2'],
              },
            ],
          },
        ],
      },
      {
        school_id: [2],
        school_name: ['mockSchool2'],
        classes: [
          {
            class: [
              {
                class_id: [3],
                class_name: ['mockClass3'],
              },
              {
                class_id: [4],
                class_name: ['mockClass4'],
              },
            ],
          },
        ],
      },
    ],
  };

  const mockSubmitErrors = fromJS({
    password: true,
    confirm_password: 'Password and password confirmation must match.',
  });

  const fakeEvent = { preventDefault: () => {} };
  const fakeHandleTabClickEvent = {
    currentTarget: {
      id: 'mockTab',
    },
  };

  beforeEach(() => {
    mockData = { editMode: true };
    mockHandleCancel = jest.fn();
    mockHandleSave = jest.fn();
    mockHandleSubmit = jest.fn();
  });

  describe('no errors in form', () => {
    beforeEach(() => {
      wrapper = shallow(
        <TeacherForm
          data={mockData}
          handleCancel={mockHandleCancel}
          handleSave={mockHandleSave}
          handleSubmit={mockHandleSubmit}
          passwordConfigsArray={mockPasswordConfigsArray}
          permissions={fromJS(mockPermissions)}
          permissionsChecked={mockPermissionsChecked}
          schoolsAndClassesData={mockSchoolsAndClasses}
          userType={mockUserType}
          associatedClasses={mockAssociatedClasses}
          isOpen
          editingSameAccount={mockEditingSameAccount}
        />
      );

      wrapperInstance = wrapper.instance();
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('getClassId returns class_id', () => {
      const mockItem = {
        class_id: [123],
      };

      expect(wrapperInstance.getClassId(mockItem)).toEqual(mockItem.class_id[0]);
    });

    it('formatClassLabel returns class_name', () => {
      const mockItem = {
        class_name: ['mockClassName'],
      };

      expect(wrapperInstance.formatClassLabel(mockItem)).toEqual(mockItem.class_name[0]);
    });

    it('handleTabClick changes state', () => {
      wrapperInstance.handleTabClick(fakeHandleTabClickEvent);
      expect(wrapper.state('activeTab')).toEqual(fakeHandleTabClickEvent.currentTarget.id);
    });

    it('handleSave calls mockHandleSave with passed value', () => {
      wrapperInstance.handleSave('mockValue', TEACHER_PERMISSIONS_DEFAULT);
      expect(mockHandleSave).toHaveBeenCalledWith('mockValue', TEACHER_PERMISSIONS_DEFAULT);
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

    it('handleSchoolSelectionOnChange sets selectedSchoolId in state', () => {
      wrapper.find('select').simulate('change', { target: { value: 'mockValue' } });
      expect(wrapper.state('selectedSchoolId')).toEqual('mockValue');
    });

    describe('showNavBarError', () => {
      it('TAB_1 returns false', () => {
        expect(wrapperInstance.showNavBarError(TAB_1.id)).toBeFalsy();
      });

      it('TAB_2 returns false', () => {
        expect(wrapperInstance.showNavBarError(TAB_2.id)).toBeFalsy();
      });

      it('TAB_3 returns false', () => {
        expect(wrapperInstance.showNavBarError(TAB_3.id)).toBeFalsy();
      });
    });

    describe('renderClasses', () => {
      it('selectedSchoolId is null', () => {
        wrapper.find('select').simulate('change', { target: { value: null } });
        expect(wrapperInstance.renderClasses()).toEqual(
          <Field
            component={CheckboxControl}
            formatLabel={wrapperInstance.formatClassLabel}
            getId={wrapperInstance.getClassId}
            items={mockSchoolsAndClasses.school[0].classes[0].class}
            name="classes"
          />
        );
      });

      it('selectedSchoolId is second school', () => {
        wrapper.find('select').simulate('change', { target: { value: 2 } });
        expect(wrapperInstance.renderClasses()).toEqual(
          <Field
            component={CheckboxControl}
            formatLabel={wrapperInstance.formatClassLabel}
            getId={wrapperInstance.getClassId}
            items={mockSchoolsAndClasses.school[1].classes[0].class}
            name="classes"
          />
        );
      });
    });

    it('handleCancel is called', () => {
      const cancelButton = wrapper.find('SAMButton[isPrimaryButton=false]');
      cancelButton.prop('onClickHandler')(fakeEvent);
      expect(mockHandleCancel).toHaveBeenCalled();
    });
  });

  describe('submitFailed and there are only validationErrors', () => {
    describe('there is only one validation error, it is not a classes error', () => {
      beforeEach(() => {
        mockValidateErrors = {
          user_name: 'mockUserNameError',
        };
        wrapper = shallow(
          <TeacherForm
            data={mockData}
            handleCancel={mockHandleCancel}
            handleSave={mockHandleSave}
            handleSubmit={mockHandleSubmit}
            passwordConfigsArray={mockPasswordConfigsArray}
            permissions={fromJS(mockPermissions)}
            schoolsAndClassesData={mockSchoolsAndClasses}
            isOpen
            submitFailed
            validationErrors={mockValidateErrors}
            userType={mockUserType}
          />
        );

        wrapperInstance = wrapper.instance();
      });

      it('Expect to render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      describe('showNavBarError', () => {
        it('TAB_1 returns true', () => {
          expect(wrapperInstance.showNavBarError(TAB_1.id)).toBeTruthy();
        });

        it('TAB_2 returns false', () => {
          expect(wrapperInstance.showNavBarError(TAB_2.id)).toBeFalsy();
        });

        it('TAB_3 returns false', () => {
          expect(wrapperInstance.showNavBarError(TAB_3.id)).toBeFalsy();
        });
      });
    });

    describe('there is only one validation error, it is a classes error', () => {
      beforeEach(() => {
        mockValidateErrors = {
          classes: 'mockClassesError',
        };
        wrapper = shallow(
          <TeacherForm
            data={mockData}
            handleCancel={mockHandleCancel}
            handleSave={mockHandleSave}
            handleSubmit={mockHandleSubmit}
            passwordConfigsArray={mockPasswordConfigsArray}
            permissions={fromJS(mockPermissions)}
            schoolsAndClassesData={mockSchoolsAndClasses}
            isOpen
            submitFailed
            validationErrors={mockValidateErrors}
            userType={mockUserType}
          />
        );

        wrapperInstance = wrapper.instance();
      });

      it('Expect to render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      describe('showNavBarError', () => {
        it('TAB_1 returns false', () => {
          expect(wrapperInstance.showNavBarError(TAB_1.id)).toBeFalsy();
        });

        it('TAB_2 returns true', () => {
          expect(wrapperInstance.showNavBarError(TAB_2.id)).toBeTruthy();
        });

        it('TAB_3 returns false', () => {
          expect(wrapperInstance.showNavBarError(TAB_3.id)).toBeFalsy();
        });
      });
    });

    describe('there are more than one validation error', () => {
      beforeEach(() => {
        mockValidateErrors = {
          classes: 'mockClassesError',
          user_name: 'mockUserNameError',
        };

        wrapper = shallow(
          <TeacherForm
            data={mockData}
            handleCancel={mockHandleCancel}
            handleSave={mockHandleSave}
            handleSubmit={mockHandleSubmit}
            passwordConfigsArray={mockPasswordConfigsArray}
            permissions={fromJS(mockPermissions)}
            schoolsAndClassesData={mockSchoolsAndClasses}
            isOpen
            submitFailed
            validationErrors={mockValidateErrors}
            userType={mockUserType}
          />
        );

        wrapperInstance = wrapper.instance();
      });

      it('Expect to render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      describe('showNavBarError', () => {
        it('TAB_1 returns true', () => {
          expect(wrapperInstance.showNavBarError(TAB_1.id)).toBeTruthy();
        });

        it('TAB_2 returns true', () => {
          expect(wrapperInstance.showNavBarError(TAB_2.id)).toBeTruthy();
        });

        it('TAB_3 returns false', () => {
          expect(wrapperInstance.showNavBarError(TAB_3.id)).toBeFalsy();
        });
      });
    });
  });

  describe('submitFailed and there are only submitErrors', () => {
    beforeEach(() => {
      wrapper = shallow(
        <TeacherForm
          data={mockData}
          handleCancel={mockHandleCancel}
          handleSave={mockHandleSave}
          handleSubmit={mockHandleSubmit}
          passwordConfigsArray={mockPasswordConfigsArray}
          permissions={fromJS(mockPermissions)}
          schoolsAndClassesData={mockSchoolsAndClasses}
          isOpen
          submitErrors={mockSubmitErrors}
          submitFailed
          userType={mockUserType}
        />
      );

      wrapperInstance = wrapper.instance();
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    describe('showNavBarError', () => {
      it('TAB_1 returns true', () => {
        expect(wrapperInstance.showNavBarError(TAB_1.id)).toBeTruthy();
      });

      it('TAB_2 returns false', () => {
        expect(wrapperInstance.showNavBarError(TAB_2.id)).toBeFalsy();
      });

      it('TAB_3 returns false', () => {
        expect(wrapperInstance.showNavBarError(TAB_3.id)).toBeFalsy();
      });
    });
  });

  describe('submitFailed and there are submitErrors and validationErrors', () => {
    beforeEach(() => {
      mockValidateErrors = {
        classes: 'mockClassesError',
        user_name: 'mockUserNameError',
      };

      wrapper = shallow(
        <TeacherForm
          data={mockData}
          handleCancel={mockHandleCancel}
          handleSave={mockHandleSave}
          handleSubmit={mockHandleSubmit}
          passwordConfigsArray={mockPasswordConfigsArray}
          permissions={fromJS(mockPermissions)}
          schoolsAndClassesData={mockSchoolsAndClasses}
          isOpen
          submitErrors={mockSubmitErrors}
          submitFailed
          validationErrors={mockValidateErrors}
          userType={mockUserType}
        />
      );

      wrapperInstance = wrapper.instance();
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    describe('showNavBarError', () => {
      it('TAB_1 returns true', () => {
        expect(wrapperInstance.showNavBarError(TAB_1.id)).toBeTruthy();
      });

      it('TAB_2 returns true', () => {
        expect(wrapperInstance.showNavBarError(TAB_2.id)).toBeTruthy();
      });

      it('TAB_3 returns false', () => {
        expect(wrapperInstance.showNavBarError(TAB_3.id)).toBeFalsy();
      });
    });
  });

  describe('TeacherForm for adding', () => {
    beforeEach(() => {
      mockData = { editMode: false };
      const mockSelectedSchoolId = 'schoolx';
      mockValidateErrors = null;

      wrapper = shallow(
        <TeacherForm
          data={mockData}
          handleCancel={mockHandleCancel}
          handleSave={mockHandleSave}
          handleSubmit={mockHandleSubmit}
          passwordConfigsArray={mockPasswordConfigsArray}
          permissions={fromJS(mockPermissions)}
          schoolsAndClassesData={mockSchoolsAndClasses}
          isOpen
          submitErrors={mockSubmitErrors}
          submitFailed
          validationErrors={mockValidateErrors}
          selectedSchoolId={mockSelectedSchoolId}
          userType={mockUserType}
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
  });
});
