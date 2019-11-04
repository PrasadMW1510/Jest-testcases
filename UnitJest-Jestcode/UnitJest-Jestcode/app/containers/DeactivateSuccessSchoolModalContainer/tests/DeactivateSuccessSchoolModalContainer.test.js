import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { DeactivateSuccessSchoolModalContainer } from '../DeactivateSuccessSchoolModalContainer';

describe('<DeactivateSuccessSchoolModalContainer />', () => {
  let wrapper = null;
  let updateUserData = null;
  let resetSelections = null;
  let mockHideModal = null;
  let history = null;
  let usageSummaryRequest = null;
  let profilePage = null;
  const mockEvent = { preventDefault: jest.fn() };

  beforeEach(() => {
    profilePage = {
      classDetails: [],
      profileDetails: {
        birth_date: ['1/1/1970'],
        classes: [
          {
            class: [
              {
                class_id: ['d0mv04d4fla89s0c8gr22mnj_2efa7f0'],
                name: ['CA S44 Stage A Standalone'],
              },
              {
                class_id: ['d0mv04d4fla89s0c8gr22mnj_2efa7f1'],
                name: ['CA S44 Stage B Standalone'],
              },
            ],
          },
        ],
        district_user_id: [''],
        email: [''],
        enabled: ['true'],
        extended_user_data: [
          {
            attributes: [''],
            birth_country: [''],
            closed_captioning: ['false'],
            grade: [
              {
                full_name: ['Eighth grade'],
                name: ['8'],
              },
            ],
            guardian: [{}],
            lang_support: ['false'],
            language: [''],
            lexile_level: ['0'],
            preferred_name: [''],
            reading_speed: [''],
            sis_id: ['StageACAS44'],
            special_ed: ['false'],
            text_size: [''],
          },
        ],
        first_name: ['StageACAS44'],
        groups: [{}],
        last_name: ['StageACAS44'],
        middle_name: [''],
        organizations: [{}],
        password: ['Welcome1'],
        password_hint: [''],
        prefix: [''],
        sps_id: [''],
        ssn: [''],
        subgroupings: [''],
        suffix: [''],
        title: [''],
        user_id: ['g55fneif92at5f8usa82doo0_2efa7f0'],
        user_name: ['StageACAS44'],
        user_type: ['Student'],
      },
    };
    mockHideModal = jest.fn();
    updateUserData = jest.fn();
    history = { push: jest.fn() };
    resetSelections = jest.fn();
    usageSummaryRequest = jest.fn();

    wrapper = shallow(
      <DeactivateSuccessSchoolModalContainer
        hideModal={mockHideModal}
        profilePage={profilePage}
        updateUserData={updateUserData}
        resetSelections={resetSelections}
        usageSummaryRequest={usageSummaryRequest}
        history={history}
      />
    );
  });

  it('should have a DeactivateSchoolSuccessModal', () => {
    const modal = wrapper.find('DeactivateSchoolSuccessModal');
    expect(modal).toBeDefined();
  });

  it('should deactivate modal close when user agrees', () => {
    const modal = wrapper.find('DeactivateSchoolSuccessModal');
    modal.prop('onYes')(mockEvent);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
