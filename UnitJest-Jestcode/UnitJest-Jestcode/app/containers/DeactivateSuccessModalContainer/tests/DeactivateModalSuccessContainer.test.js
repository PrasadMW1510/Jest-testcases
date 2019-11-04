import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { USER_ORG, USER_TYPE } from 'containers/App/constants';
import { DeactivateModalSuccessContainer } from '../DeactivateModalSuccessContainer';

describe('<DeactivateModalSuccessContainer />', () => {
  let wrapper = null;
  let schoolRedirection = null;
  let schoolUserLoginFlowRequest = null;
  let mockHideModal = null;
  let profileUserType = null;
  let profileOrgType = null;
  let usageSummaryRequest = null;
  let activeSmartBarSchoolId = null;
  const mockEvent = { preventDefault: jest.fn() };

  beforeEach(() => {
    mockHideModal = jest.fn();
    schoolRedirection = jest.fn();
    profileUserType = USER_TYPE.Tech;
    profileOrgType = USER_ORG.School;
    schoolUserLoginFlowRequest = jest.fn();
    usageSummaryRequest = jest.fn();
    activeSmartBarSchoolId = '123456';

    wrapper = shallow(
      <DeactivateModalSuccessContainer
        hideModal={mockHideModal}
        schoolRedirection={schoolRedirection}
        schoolUserLoginFlowRequest={schoolUserLoginFlowRequest}
        usageSummaryRequest={usageSummaryRequest}
        profileUserType={profileUserType}
        profileOrgType={profileOrgType}
        activeSmartBarSchoolId={activeSmartBarSchoolId}
      />
    );
  });

  it('should have a DeactivateTeacherSuccessModal', () => {
    const modal = wrapper.find('DeactivateTeacherSuccessModal');
    expect(modal).toBeDefined();
  });

  it('should deactivate modal close when user agrees', () => {
    const modal = wrapper.find('DeactivateTeacherSuccessModal');
    modal.prop('onYes')(mockEvent);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should deactivate modal close when user agrees', () => {
    const modal = wrapper.find('DeactivateTeacherSuccessModal');
    modal.prop('onYes')(mockEvent);
    profileUserType = USER_TYPE.Tech;
    profileOrgType = USER_ORG.School;
    wrapper.setProps({ profileUserType: USER_TYPE.Tech, profileOrgType: USER_ORG.School });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
