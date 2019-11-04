import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { USER_TYPE, USER_ORG, PASSWORD_TYPES } from 'containers/App/constants';
import * as AdminConstants from 'components/ManageAdminAccounts/constants';

import SAMAccountForm from '../index';

describe('<SAMAccountForm />', () => {
  let wrapper = null;
  let wrapperInstance = null;
  const schoolFieldId = 'Field[name="school_name"]';

  const passwordConfigsArray = [
    {
      config: [
        {
          $: {
            id: PASSWORD_TYPES.Complex,
          },
          password_min_len: ['8'],
          password_max_len: ['16'],
          password_enforce_numeric: ['true'],
          password_enforce_special_chars: ['false'],
          password_enforce_mixed_case: ['true'],
        },
      ],
    },
  ];

  describe('userOrg is default value', () => {
    beforeEach(() => {
      wrapper = shallow(
        <SAMAccountForm passwordConfigsArray={passwordConfigsArray} editMode editingSameAccount />
      );
      wrapperInstance = wrapper.instance();
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('formatTypeOfAccount', () => {
      expect(wrapperInstance.formatTypeOfAccount(USER_TYPE.Administrator)).toEqual(
        USER_TYPE.Administrator
      );
    });

    it('school field is not there', () => {
      const schoolField = wrapper.find(schoolFieldId);
      expect(schoolField).toHaveLength(0);
    });
  });

  describe('userOrg is District', () => {
    beforeEach(() => {
      wrapper = shallow(
        <SAMAccountForm
          passwordConfigsArray={passwordConfigsArray}
          userOrg={USER_ORG.District}
          editMode
          editingSameAccount
        />
      );
      wrapperInstance = wrapper.instance();
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('formatTypeOfAccount', () => {
      expect(wrapperInstance.formatTypeOfAccount(USER_TYPE.Administrator)).toEqual(
        `${USER_ORG.District} ${USER_TYPE.Administrator}`
      );
    });

    it('school field is not there', () => {
      const schoolField = wrapper.find(schoolFieldId);
      expect(schoolField).toHaveLength(0);
    });
  });

  describe('userOrg is School', () => {
    beforeEach(() => {
      wrapper = shallow(
        <SAMAccountForm
          passwordConfigsArray={passwordConfigsArray}
          userOrg={USER_ORG.School}
          editMode
          editingSameAccount
        />
      );
      wrapperInstance = wrapper.instance();
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('formatTypeOfAccount', () => {
      expect(wrapperInstance.formatTypeOfAccount(USER_TYPE.Administrator)).toEqual(
        `${USER_ORG.School} ${USER_TYPE.Administrator}`
      );
    });

    it('school field is there', () => {
      const schoolField = wrapper.find(schoolFieldId);
      expect(schoolField).toHaveLength(1);
    });
  });

  describe('editMode is false', () => {
    let schools;
    beforeEach(() => {
      schools = [{ name: ['school1'], org_id: ['iii'] }];
      wrapper = shallow(
        <SAMAccountForm
          accountType={AdminConstants.DISTRICT_ADMINSTRATOR}
          passwordConfigsArray={passwordConfigsArray}
          userOrg={USER_ORG.School}
          editMode={false}
          isSchoolAdminForm
          schools={schools}
        />
      );
      wrapperInstance = wrapper.instance();
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('formatTypeOfAccount', () => {
      expect(wrapperInstance.formatTypeOfAccount(USER_TYPE.Administrator)).toEqual(
        AdminConstants.DISTRICT_ADMINSTRATOR
      );
    });

    it('formatSchool', () => {
      const mockSchool = {
        name: ['school1'],
      };
      expect(wrapperInstance.formatSchool(mockSchool)).toEqual(mockSchool.name[0]);
    });

    it('Expect to render correctly for DA adding an SA', () => {
      wrapper = shallow(
        <SAMAccountForm
          accountType={AdminConstants.SCHOOL_ADMINSTRATOR}
          passwordConfigsArray={passwordConfigsArray}
          userOrg={USER_ORG.District}
          editMode={false}
          isSchoolAdminForm
          schools={schools}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
