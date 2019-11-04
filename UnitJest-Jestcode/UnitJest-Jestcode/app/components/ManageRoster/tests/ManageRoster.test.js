import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import React from 'react';

import { USER_ORG, USER_TYPE } from 'containers/App/constants';
import * as ModalConstants from 'containers/ModalController/constants';

import ManageRoster from '../index';

describe('<ManageRoster />', () => {
  let wrapper = null;
  let showModal = null;
  let showDeactivateUserModal = null;
  let showDeactivateGroupModal = null;
  let smartBarSelections = null;
  let showClassFormModal = null;
  let showStudentFormModal = null;
  let showTeacherFormModal = null;
  let profileUserType = null;
  let profile = null;
  let onClickAction = null;
  let profileOrgType = null;
  let showAddAGroup = null;

  beforeEach(() => {
    showModal = jest.fn();
    showDeactivateUserModal = jest.fn();
    showDeactivateGroupModal = jest.fn();
    showClassFormModal = jest.fn();
    showStudentFormModal = jest.fn();
    showTeacherFormModal = jest.fn();
    smartBarSelections = fromJS({});
    onClickAction = { preventDefault: jest.fn() };
    profileOrgType = '';
    showAddAGroup = jest.fn();
    profile = {
      permissions: [
        {
          permission: [
            {
              id: ['123'],
              name: ['Edit Own Profile'],
              display_name: ['Edit Own Profile'],
            },
            {
              id: ['343'],
              name: ['Deactivate Class'],
              display_name: ['Deactivate Class'],
            },
            {
              id: ['103'],
              name: ['Edit School Profile'],
              display_name: ['Edit School Profile'],
            },
            {
              id: ['013'],
              name: ['Deactivate Teacher'],
              display_name: ['Deactivate Teacher'],
            },
            {
              id: ['301'],
              name: ['Deactivate School'],
              display_name: ['Deactivate School'],
            },
            {
              id: ['981'],
              name: ['Edit District Profile'],
              display_name: ['Edit District Profile'],
            },
            {
              id: ['279'],
              name: ['Add Schools'],
              display_name: ['Add Schools'],
            },
            {
              id: ['270'],
              name: ['Add Teachers'],
              display_name: ['Add Teachers'],
            },
            {
              id: ['1000'],
              name: ['View Demographics'],
              display_name: ['View Demographics'],
            },
            {
              id: ['110'],
              name: ['View Student Profile'],
              display_name: ['View Student Profile'],
            },
            {
              id: ['1500'],
              name: ['Manage Student Applications Settings'],
              display_name: ['Manage Student Applications Settings'],
            },
            {
              id: ['1550'],
              name: ['Manage Student Enrollment'],
              display_name: ['Manage Student Enrollment'],
            },
            {
              id: ['1600'],
              name: ['NCLB Filter on Reports'],
              display_name: ['NCLB Filter on Reports'],
            },
            {
              id: ['200'],
              name: ['Edit Group Profile'],
              display_name: ['Edit Group Profile'],
            },
            {
              id: ['210'],
              name: ['View Group Profile'],
              display_name: ['View Group Profile'],
            },
            {
              id: ['300'],
              name: ['Edit Class Profile'],
              display_name: ['Edit Class Profile'],
            },
            {
              id: ['310'],
              name: ['View Class Profile'],
              display_name: ['View Class Profile'],
            },
            {
              id: ['620'],
              name: ['View Own Profile'],
              display_name: ['View Own Profile'],
            },
            {
              id: ['630'],
              name: ['Edit Own Profile'],
              display_name: ['Edit Own Profile'],
            },
            {
              id: ['640'],
              name: ['View Own Permissions'],
              display_name: ['View Own Permissions'],
            },
            {
              id: ['820'],
              name: ['Add Students'],
              display_name: ['Add Students'],
            },
            {
              id: ['825'],
              name: ['Add Groups'],
              display_name: ['Add Groups'],
            },
            {
              id: ['830'],
              name: ['Add Classes'],
              display_name: ['Add Classes'],
            },
            {
              id: ['850'],
              name: ['Deactivate Group'],
              display_name: ['Deactivate Group'],
            },
          ],
        },
      ],
    };

    wrapper = shallow(
      <ManageRoster
        profile={profile}
        profileUserType={profileUserType}
        profileOrgType={profileOrgType}
        showClassFormModal={showClassFormModal}
        showDeactivateUserModal={showDeactivateUserModal}
        showDeactivateGroupModal={showDeactivateGroupModal}
        showModal={showModal}
        showStudentFormModal={showStudentFormModal}
        showTeacherFormModal={showTeacherFormModal}
        smartBarSelections={smartBarSelections}
        showAddAGroup={showAddAGroup}
      />
    );
  });

  it('render Roster Details', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('renderDefaultLinks as a Teacher', () => {
    profileUserType = USER_TYPE.Teacher;
    profile = {
      permissions: [
        {
          permission: [
            {
              id: ['123'],
              name: ['Edit Own Profile'],
              display_name: ['Edit Own Profile'],
            },
            {
              id: ['981'],
              name: ['Edit District Profile'],
              display_name: ['Edit District Profile'],
            },
            {
              id: ['279'],
              name: ['Add Schools'],
              display_name: ['Add Schools'],
            },
            {
              id: ['1000'],
              name: ['View Demographics'],
              display_name: ['View Demographics'],
            },
            {
              id: ['110'],
              name: ['View Student Profile'],
              display_name: ['View Student Profile'],
            },
            {
              id: ['1500'],
              name: ['Manage Student Applications Settings'],
              display_name: ['Manage Student Applications Settings'],
            },
            {
              id: ['1550'],
              name: ['Manage Student Enrollment'],
              display_name: ['Manage Student Enrollment'],
            },
            {
              id: ['1600'],
              name: ['NCLB Filter on Reports'],
              display_name: ['NCLB Filter on Reports'],
            },
            {
              id: ['200'],
              name: ['Edit Group Profile'],
              display_name: ['Edit Group Profile'],
            },
            {
              id: ['210'],
              name: ['View Group Profile'],
              display_name: ['View Group Profile'],
            },
            {
              id: ['300'],
              name: ['Edit Class Profile'],
              display_name: ['Edit Class Profile'],
            },
            {
              id: ['310'],
              name: ['View Class Profile'],
              display_name: ['View Class Profile'],
            },
            {
              id: ['620'],
              name: ['View Own Profile'],
              display_name: ['View Own Profile'],
            },
            {
              id: ['630'],
              name: ['Edit Own Profile'],
              display_name: ['Edit Own Profile'],
            },
            {
              id: ['640'],
              name: ['View Own Permissions'],
              display_name: ['View Own Permissions'],
            },
            {
              id: ['820'],
              name: ['Add Students'],
              display_name: ['Add Students'],
            },
            {
              id: ['825'],
              name: ['Add Groups'],
              display_name: ['Add Groups'],
            },
            {
              id: ['830'],
              name: ['Add Classes'],
              display_name: ['Add Classes'],
            },
            {
              id: ['850'],
              name: ['Deactivate Group'],
              display_name: ['Deactivate Group'],
            },
          ],
        },
      ],
    };

    wrapper.setProps({ smartBarSelections, profile });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('renderDefaultLinks as a District Admin', () => {
    profileUserType = USER_TYPE.Tech;
    profileOrgType = USER_ORG.District;
    profile = {
      permissions: [
        {
          permission: [
            {
              id: ['123'],
              name: ['Edit Own Profile'],
              display_name: ['Edit Own Profile'],
            },
            {
              id: ['195'],
              name: ['Edit Student Profile'],
              display_name: ['Edit Student Profile'],
            },
            {
              id: ['175'],
              name: ['Edit Teacher Profile'],
              display_name: ['Edit Teacher Profile'],
            },
            {
              id: ['124'],
              name: ['Deactivate Student'],
              display_name: ['Deactivate Student'],
            },
            {
              id: ['103'],
              name: ['Edit School Profile'],
              display_name: ['Edit School Profile'],
            },
            {
              id: ['013'],
              name: ['Deactivate Teacher'],
              display_name: ['Deactivate Teacher'],
            },
            {
              id: ['301'],
              name: ['Deactivate School'],
              display_name: ['Deactivate School'],
            },
            {
              id: ['981'],
              name: ['Edit District Profile'],
              display_name: ['Edit District Profile'],
            },
            {
              id: ['279'],
              name: ['Add Schools'],
              display_name: ['Add Schools'],
            },
            {
              id: ['270'],
              name: ['Add Teachers'],
              display_name: ['Add Teachers'],
            },
            {
              id: ['1000'],
              name: ['View Demographics'],
              display_name: ['View Demographics'],
            },
            {
              id: ['110'],
              name: ['View Student Profile'],
              display_name: ['View Student Profile'],
            },
            {
              id: ['1500'],
              name: ['Manage Student Applications Settings'],
              display_name: ['Manage Student Applications Settings'],
            },
            {
              id: ['1550'],
              name: ['Manage Student Enrollment'],
              display_name: ['Manage Student Enrollment'],
            },
            {
              id: ['1600'],
              name: ['NCLB Filter on Reports'],
              display_name: ['NCLB Filter on Reports'],
            },
            {
              id: ['200'],
              name: ['Edit Group Profile'],
              display_name: ['Edit Group Profile'],
            },
            {
              id: ['210'],
              name: ['View Group Profile'],
              display_name: ['View Group Profile'],
            },
            {
              id: ['300'],
              name: ['Edit Class Profile'],
              display_name: ['Edit Class Profile'],
            },
            {
              id: ['310'],
              name: ['View Class Profile'],
              display_name: ['View Class Profile'],
            },
            {
              id: ['620'],
              name: ['View Own Profile'],
              display_name: ['View Own Profile'],
            },
            {
              id: ['630'],
              name: ['Edit Own Profile'],
              display_name: ['Edit Own Profile'],
            },
            {
              id: ['640'],
              name: ['View Own Permissions'],
              display_name: ['View Own Permissions'],
            },
            {
              id: ['820'],
              name: ['Add Students'],
              display_name: ['Add Students'],
            },
            {
              id: ['825'],
              name: ['Add Groups'],
              display_name: ['Add Groups'],
            },
            {
              id: ['830'],
              name: ['Add Classes'],
              display_name: ['Add Classes'],
            },
            {
              id: ['850'],
              name: ['Deactivate Group'],
              display_name: ['Deactivate Group'],
            },
          ],
        },
      ],
    };

    wrapper.setProps({ smartBarSelections, profile, profileUserType, profileOrgType });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('renderDefaultLinks as a Administrator', () => {
    profileUserType = USER_TYPE.Administrator;
    profile = {
      permissions: [
        {
          permission: [
            {
              id: ['123'],
              name: ['Edit Own Profile'],
              display_name: ['Edit Own Profile'],
            },
            {
              id: ['103'],
              name: ['Edit School Profile'],
              display_name: ['Edit School Profile'],
            },
            {
              id: ['013'],
              name: ['Deactivate Teacher'],
              display_name: ['Deactivate Teacher'],
            },
            {
              id: ['301'],
              name: ['Deactivate School'],
              display_name: ['Deactivate School'],
            },
            {
              id: ['981'],
              name: ['Edit District Profile'],
              display_name: ['Edit District Profile'],
            },
            {
              id: ['279'],
              name: ['Add Schools'],
              display_name: ['Add Schools'],
            },
            {
              id: ['270'],
              name: ['Add Teachers'],
              display_name: ['Add Teachers'],
            },
            {
              id: ['1000'],
              name: ['View Demographics'],
              display_name: ['View Demographics'],
            },
            {
              id: ['110'],
              name: ['View Student Profile'],
              display_name: ['View Student Profile'],
            },
            {
              id: ['1500'],
              name: ['Manage Student Applications Settings'],
              display_name: ['Manage Student Applications Settings'],
            },
            {
              id: ['1550'],
              name: ['Manage Student Enrollment'],
              display_name: ['Manage Student Enrollment'],
            },
            {
              id: ['1600'],
              name: ['NCLB Filter on Reports'],
              display_name: ['NCLB Filter on Reports'],
            },
            {
              id: ['200'],
              name: ['Edit Group Profile'],
              display_name: ['Edit Group Profile'],
            },
            {
              id: ['210'],
              name: ['View Group Profile'],
              display_name: ['View Group Profile'],
            },
            {
              id: ['300'],
              name: ['Edit Class Profile'],
              display_name: ['Edit Class Profile'],
            },
            {
              id: ['310'],
              name: ['View Class Profile'],
              display_name: ['View Class Profile'],
            },
            {
              id: ['620'],
              name: ['View Own Profile'],
              display_name: ['View Own Profile'],
            },
            {
              id: ['630'],
              name: ['Edit Own Profile'],
              display_name: ['Edit Own Profile'],
            },
            {
              id: ['640'],
              name: ['View Own Permissions'],
              display_name: ['View Own Permissions'],
            },
            {
              id: ['820'],
              name: ['Add Students'],
              display_name: ['Add Students'],
            },
            {
              id: ['825'],
              name: ['Add Groups'],
              display_name: ['Add Groups'],
            },
            {
              id: ['830'],
              name: ['Add Classes'],
              display_name: ['Add Classes'],
            },
            {
              id: ['850'],
              name: ['Deactivate Group'],
              display_name: ['Deactivate Group'],
            },
          ],
        },
      ],
    };

    wrapper.setProps({ smartBarSelections, profile });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('renderCategoryLinks with Group being called', () => {
    smartBarSelections = fromJS({ selectedCohType: 'Group' });
    profile = {
      permissions: [
        {
          permission: [
            {
              id: ['123'],
              name: ['Edit Own Profile'],
              display_name: ['Edit Own Profile'],
            },
            {
              id: ['103'],
              name: ['Edit School Profile'],
              display_name: ['Edit School Profile'],
            },
            {
              id: ['013'],
              name: ['Deactivate Teacher'],
              display_name: ['Deactivate Teacher'],
            },
            {
              id: ['301'],
              name: ['Deactivate School'],
              display_name: ['Deactivate School'],
            },
            {
              id: ['981'],
              name: ['Edit District Profile'],
              display_name: ['Edit District Profile'],
            },
            {
              id: ['279'],
              name: ['Add Schools'],
              display_name: ['Add Schools'],
            },
            {
              id: ['270'],
              name: ['Add Teachers'],
              display_name: ['Add Teachers'],
            },
            {
              id: ['1000'],
              name: ['View Demographics'],
              display_name: ['View Demographics'],
            },
            {
              id: ['110'],
              name: ['View Student Profile'],
              display_name: ['View Student Profile'],
            },
            {
              id: ['1500'],
              name: ['Manage Student Applications Settings'],
              display_name: ['Manage Student Applications Settings'],
            },
            {
              id: ['1550'],
              name: ['Manage Student Enrollment'],
              display_name: ['Manage Student Enrollment'],
            },
            {
              id: ['1600'],
              name: ['NCLB Filter on Reports'],
              display_name: ['NCLB Filter on Reports'],
            },
            {
              id: ['200'],
              name: ['Edit Group Profile'],
              display_name: ['Edit Group Profile'],
            },
            {
              id: ['210'],
              name: ['View Group Profile'],
              display_name: ['View Group Profile'],
            },
            {
              id: ['300'],
              name: ['Edit Class Profile'],
              display_name: ['Edit Class Profile'],
            },
            {
              id: ['310'],
              name: ['View Class Profile'],
              display_name: ['View Class Profile'],
            },
            {
              id: ['620'],
              name: ['View Own Profile'],
              display_name: ['View Own Profile'],
            },
            {
              id: ['630'],
              name: ['Edit Own Profile'],
              display_name: ['Edit Own Profile'],
            },
            {
              id: ['640'],
              name: ['View Own Permissions'],
              display_name: ['View Own Permissions'],
            },
            {
              id: ['820'],
              name: ['Add Students'],
              display_name: ['Add Students'],
            },
            {
              id: ['825'],
              name: ['Add Groups'],
              display_name: ['Add Groups'],
            },
            {
              id: ['830'],
              name: ['Add Classes'],
              display_name: ['Add Classes'],
            },
            {
              id: ['850'],
              name: ['Deactivate Group'],
              display_name: ['Deactivate Group'],
            },
          ],
        },
      ],
    };

    wrapper.setProps({ smartBarSelections, profile });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('renderCategoryLinks with Grade being called', () => {
    smartBarSelections = fromJS({ selectedCohType: 'Grade' });
    profile = {
      permissions: [
        {
          permission: [
            {
              id: ['123'],
              name: ['Edit Own Profile'],
              display_name: ['Edit Own Profile'],
            },
            {
              id: ['103'],
              name: ['Edit School Profile'],
              display_name: ['Edit School Profile'],
            },
            {
              id: ['013'],
              name: ['Deactivate Teacher'],
              display_name: ['Deactivate Teacher'],
            },
            {
              id: ['301'],
              name: ['Deactivate School'],
              display_name: ['Deactivate School'],
            },
            {
              id: ['981'],
              name: ['Edit District Profile'],
              display_name: ['Edit District Profile'],
            },
            {
              id: ['279'],
              name: ['Add Schools'],
              display_name: ['Add Schools'],
            },
            {
              id: ['270'],
              name: ['Add Teachers'],
              display_name: ['Add Teachers'],
            },
            {
              id: ['1000'],
              name: ['View Demographics'],
              display_name: ['View Demographics'],
            },
            {
              id: ['110'],
              name: ['View Student Profile'],
              display_name: ['View Student Profile'],
            },
            {
              id: ['1500'],
              name: ['Manage Student Applications Settings'],
              display_name: ['Manage Student Applications Settings'],
            },
            {
              id: ['1550'],
              name: ['Manage Student Enrollment'],
              display_name: ['Manage Student Enrollment'],
            },
            {
              id: ['1600'],
              name: ['NCLB Filter on Reports'],
              display_name: ['NCLB Filter on Reports'],
            },
            {
              id: ['200'],
              name: ['Edit Group Profile'],
              display_name: ['Edit Group Profile'],
            },
            {
              id: ['210'],
              name: ['View Group Profile'],
              display_name: ['View Group Profile'],
            },
            {
              id: ['300'],
              name: ['Edit Class Profile'],
              display_name: ['Edit Class Profile'],
            },
            {
              id: ['310'],
              name: ['View Class Profile'],
              display_name: ['View Class Profile'],
            },
            {
              id: ['620'],
              name: ['View Own Profile'],
              display_name: ['View Own Profile'],
            },
            {
              id: ['630'],
              name: ['Edit Own Profile'],
              display_name: ['Edit Own Profile'],
            },
            {
              id: ['640'],
              name: ['View Own Permissions'],
              display_name: ['View Own Permissions'],
            },
            {
              id: ['820'],
              name: ['Add Students'],
              display_name: ['Add Students'],
            },
            {
              id: ['825'],
              name: ['Add Groups'],
              display_name: ['Add Groups'],
            },
            {
              id: ['830'],
              name: ['Add Classes'],
              display_name: ['Add Classes'],
            },
            {
              id: ['850'],
              name: ['Deactivate Group'],
              display_name: ['Deactivate Group'],
            },
          ],
        },
      ],
    };

    wrapper.setProps({ smartBarSelections, profile });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('renderCategoryLinks with Class being called', () => {
    smartBarSelections = fromJS({ selectedCohType: 'Class' });
    profile = {
      permissions: [
        {
          permission: [
            {
              id: ['123'],
              name: ['Edit Own Profile'],
              display_name: ['Edit Own Profile'],
            },
            {
              id: ['343'],
              name: ['Deactivate Class'],
              display_name: ['Deactivate Class'],
            },
            {
              id: ['103'],
              name: ['Edit School Profile'],
              display_name: ['Edit School Profile'],
            },
            {
              id: ['013'],
              name: ['Deactivate Teacher'],
              display_name: ['Deactivate Teacher'],
            },
            {
              id: ['301'],
              name: ['Deactivate School'],
              display_name: ['Deactivate School'],
            },
            {
              id: ['981'],
              name: ['Edit District Profile'],
              display_name: ['Edit District Profile'],
            },
            {
              id: ['279'],
              name: ['Add Schools'],
              display_name: ['Add Schools'],
            },
            {
              id: ['270'],
              name: ['Add Teachers'],
              display_name: ['Add Teachers'],
            },
            {
              id: ['1000'],
              name: ['View Demographics'],
              display_name: ['View Demographics'],
            },
            {
              id: ['110'],
              name: ['View Student Profile'],
              display_name: ['View Student Profile'],
            },
            {
              id: ['1500'],
              name: ['Manage Student Applications Settings'],
              display_name: ['Manage Student Applications Settings'],
            },
            {
              id: ['1550'],
              name: ['Manage Student Enrollment'],
              display_name: ['Manage Student Enrollment'],
            },
            {
              id: ['1600'],
              name: ['NCLB Filter on Reports'],
              display_name: ['NCLB Filter on Reports'],
            },
            {
              id: ['200'],
              name: ['Edit Group Profile'],
              display_name: ['Edit Group Profile'],
            },
            {
              id: ['210'],
              name: ['View Group Profile'],
              display_name: ['View Group Profile'],
            },
            {
              id: ['300'],
              name: ['Edit Class Profile'],
              display_name: ['Edit Class Profile'],
            },
            {
              id: ['310'],
              name: ['View Class Profile'],
              display_name: ['View Class Profile'],
            },
            {
              id: ['620'],
              name: ['View Own Profile'],
              display_name: ['View Own Profile'],
            },
            {
              id: ['630'],
              name: ['Edit Own Profile'],
              display_name: ['Edit Own Profile'],
            },
            {
              id: ['640'],
              name: ['View Own Permissions'],
              display_name: ['View Own Permissions'],
            },
            {
              id: ['820'],
              name: ['Add Students'],
              display_name: ['Add Students'],
            },
            {
              id: ['825'],
              name: ['Add Groups'],
              display_name: ['Add Groups'],
            },
            {
              id: ['830'],
              name: ['Add Classes'],
              display_name: ['Add Classes'],
            },
            {
              id: ['850'],
              name: ['Deactivate Group'],
              display_name: ['Deactivate Group'],
            },
          ],
        },
      ],
    };

    wrapper.setProps({ smartBarSelections, profile });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('renderCategoryLinks with Teacher being called', () => {
    smartBarSelections = fromJS({ selectedCohType: 'Teacher' });
    profile = {
      permissions: [
        {
          permission: [
            {
              id: ['123'],
              name: ['Edit Own Profile'],
              display_name: ['Edit Own Profile'],
            },
            {
              id: ['103'],
              name: ['Edit School Profile'],
              display_name: ['Edit School Profile'],
            },
            {
              id: ['013'],
              name: ['Deactivate Teacher'],
              display_name: ['Deactivate Teacher'],
            },
            {
              id: ['301'],
              name: ['Deactivate School'],
              display_name: ['Deactivate School'],
            },
            {
              id: ['981'],
              name: ['Edit District Profile'],
              display_name: ['Edit District Profile'],
            },
            {
              id: ['279'],
              name: ['Add Schools'],
              display_name: ['Add Schools'],
            },
            {
              id: ['270'],
              name: ['Add Teachers'],
              display_name: ['Add Teachers'],
            },
            {
              id: ['1000'],
              name: ['View Demographics'],
              display_name: ['View Demographics'],
            },
            {
              id: ['110'],
              name: ['View Student Profile'],
              display_name: ['View Student Profile'],
            },
            {
              id: ['1500'],
              name: ['Manage Student Applications Settings'],
              display_name: ['Manage Student Applications Settings'],
            },
            {
              id: ['1550'],
              name: ['Manage Student Enrollment'],
              display_name: ['Manage Student Enrollment'],
            },
            {
              id: ['1600'],
              name: ['NCLB Filter on Reports'],
              display_name: ['NCLB Filter on Reports'],
            },
            {
              id: ['200'],
              name: ['Edit Group Profile'],
              display_name: ['Edit Group Profile'],
            },
            {
              id: ['210'],
              name: ['View Group Profile'],
              display_name: ['View Group Profile'],
            },
            {
              id: ['300'],
              name: ['Edit Class Profile'],
              display_name: ['Edit Class Profile'],
            },
            {
              id: ['310'],
              name: ['View Class Profile'],
              display_name: ['View Class Profile'],
            },
            {
              id: ['620'],
              name: ['View Own Profile'],
              display_name: ['View Own Profile'],
            },
            {
              id: ['630'],
              name: ['Edit Own Profile'],
              display_name: ['Edit Own Profile'],
            },
            {
              id: ['640'],
              name: ['View Own Permissions'],
              display_name: ['View Own Permissions'],
            },
            {
              id: ['820'],
              name: ['Add Students'],
              display_name: ['Add Students'],
            },
            {
              id: ['825'],
              name: ['Add Groups'],
              display_name: ['Add Groups'],
            },
            {
              id: ['830'],
              name: ['Add Classes'],
              display_name: ['Add Classes'],
            },
            {
              id: ['850'],
              name: ['Deactivate Group'],
              display_name: ['Deactivate Group'],
            },
          ],
        },
      ],
    };
    wrapper.setProps({ smartBarSelections, profile });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('renderCategoryLinks with School being called', () => {
    smartBarSelections = fromJS({ selectedCohType: 'School' });
    profile = {
      permissions: [
        {
          permission: [
            {
              id: ['123'],
              name: ['Edit Own Profile'],
              display_name: ['Edit Own Profile'],
            },
            {
              id: ['103'],
              name: ['Edit School Profile'],
              display_name: ['Edit School Profile'],
            },
            {
              id: ['013'],
              name: ['Deactivate Teacher'],
              display_name: ['Deactivate Teacher'],
            },
            {
              id: ['301'],
              name: ['Deactivate School'],
              display_name: ['Deactivate School'],
            },
            {
              id: ['981'],
              name: ['Edit District Profile'],
              display_name: ['Edit District Profile'],
            },
            {
              id: ['279'],
              name: ['Add Schools'],
              display_name: ['Add Schools'],
            },
            {
              id: ['270'],
              name: ['Add Teachers'],
              display_name: ['Add Teachers'],
            },
            {
              id: ['1000'],
              name: ['View Demographics'],
              display_name: ['View Demographics'],
            },
            {
              id: ['110'],
              name: ['View Student Profile'],
              display_name: ['View Student Profile'],
            },
            {
              id: ['1500'],
              name: ['Manage Student Applications Settings'],
              display_name: ['Manage Student Applications Settings'],
            },
            {
              id: ['1550'],
              name: ['Manage Student Enrollment'],
              display_name: ['Manage Student Enrollment'],
            },
            {
              id: ['1600'],
              name: ['NCLB Filter on Reports'],
              display_name: ['NCLB Filter on Reports'],
            },
            {
              id: ['200'],
              name: ['Edit Group Profile'],
              display_name: ['Edit Group Profile'],
            },
            {
              id: ['210'],
              name: ['View Group Profile'],
              display_name: ['View Group Profile'],
            },
            {
              id: ['300'],
              name: ['Edit Class Profile'],
              display_name: ['Edit Class Profile'],
            },
            {
              id: ['310'],
              name: ['View Class Profile'],
              display_name: ['View Class Profile'],
            },
            {
              id: ['620'],
              name: ['View Own Profile'],
              display_name: ['View Own Profile'],
            },
            {
              id: ['630'],
              name: ['Edit Own Profile'],
              display_name: ['Edit Own Profile'],
            },
            {
              id: ['640'],
              name: ['View Own Permissions'],
              display_name: ['View Own Permissions'],
            },
            {
              id: ['820'],
              name: ['Add Students'],
              display_name: ['Add Students'],
            },
            {
              id: ['825'],
              name: ['Add Groups'],
              display_name: ['Add Groups'],
            },
            {
              id: ['830'],
              name: ['Add Classes'],
              display_name: ['Add Classes'],
            },
            {
              id: ['850'],
              name: ['Deactivate Group'],
              display_name: ['Deactivate Group'],
            },
          ],
        },
      ],
    };

    wrapper.setProps({ smartBarSelections, profile });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('renderCategoryLinks with Student being called', () => {
    smartBarSelections = fromJS({ selectedCohType: 'Student' });
    profile = {
      permissions: [
        {
          permission: [
            {
              id: ['124'],
              name: ['Deactivate Student'],
              display_name: ['Deactivate Student'],
            },
            {
              id: ['123'],
              name: ['Edit Own Profile'],
              display_name: ['Edit Own Profile'],
            },
            {
              id: ['103'],
              name: ['Edit School Profile'],
              display_name: ['Edit School Profile'],
            },
            {
              id: ['195'],
              name: ['Edit Student Profile'],
              display_name: ['Edit Student Profile'],
            },
            {
              id: ['013'],
              name: ['Deactivate Teacher'],
              display_name: ['Deactivate Teacher'],
            },
            {
              id: ['301'],
              name: ['Deactivate School'],
              display_name: ['Deactivate School'],
            },
            {
              id: ['981'],
              name: ['Edit District Profile'],
              display_name: ['Edit District Profile'],
            },
            {
              id: ['279'],
              name: ['Add Schools'],
              display_name: ['Add Schools'],
            },
            {
              id: ['270'],
              name: ['Add Teachers'],
              display_name: ['Add Teachers'],
            },
            {
              id: ['1000'],
              name: ['View Demographics'],
              display_name: ['View Demographics'],
            },
            {
              id: ['110'],
              name: ['View Student Profile'],
              display_name: ['View Student Profile'],
            },
            {
              id: ['1500'],
              name: ['Manage Student Applications Settings'],
              display_name: ['Manage Student Applications Settings'],
            },
            {
              id: ['1550'],
              name: ['Manage Student Enrollment'],
              display_name: ['Manage Student Enrollment'],
            },
            {
              id: ['1600'],
              name: ['NCLB Filter on Reports'],
              display_name: ['NCLB Filter on Reports'],
            },
            {
              id: ['200'],
              name: ['Edit Group Profile'],
              display_name: ['Edit Group Profile'],
            },
            {
              id: ['210'],
              name: ['View Group Profile'],
              display_name: ['View Group Profile'],
            },
            {
              id: ['300'],
              name: ['Edit Class Profile'],
              display_name: ['Edit Class Profile'],
            },
            {
              id: ['310'],
              name: ['View Class Profile'],
              display_name: ['View Class Profile'],
            },
            {
              id: ['620'],
              name: ['View Own Profile'],
              display_name: ['View Own Profile'],
            },
            {
              id: ['630'],
              name: ['Edit Own Profile'],
              display_name: ['Edit Own Profile'],
            },
            {
              id: ['640'],
              name: ['View Own Permissions'],
              display_name: ['View Own Permissions'],
            },
            {
              id: ['820'],
              name: ['Add Students'],
              display_name: ['Add Students'],
            },
            {
              id: ['825'],
              name: ['Add Groups'],
              display_name: ['Add Groups'],
            },
            {
              id: ['830'],
              name: ['Add Classes'],
              display_name: ['Add Classes'],
            },
            {
              id: ['850'],
              name: ['Deactivate Group'],
              display_name: ['Deactivate Group'],
            },
          ],
        },
      ],
    };

    wrapper.setProps({ smartBarSelections, profile });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('renderCategoryLinks null condition', () => {
    wrapper.setProps({ categoryLinks: [], profile: {} });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('return null in switch', () => {
    smartBarSelections = fromJS({ selectedCohType: 'Group' });
    profile = {
      permissions: [
        {
          permission: [],
        },
      ],
    };

    wrapper.setProps({ smartBarSelections, profile });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('handleAddStudent', () => {
    wrapper.instance().handleAddStudent(onClickAction);
    expect(showStudentFormModal).toHaveBeenCalled();
  });

  it('handleAddTeacher', () => {
    wrapper.instance().handleAddTeacher(onClickAction);
    expect(showModal).toHaveBeenCalledWith(ModalConstants.TEACHER_FORM_MODAL, { editMode: false });
  });

  it('handleEditStudent', () => {
    wrapper.instance().handleEditStudent(onClickAction);
    expect(showStudentFormModal).toHaveBeenCalled();
  });

  it('handleAddClass', () => {
    wrapper.instance().handleAddClass(onClickAction);
    expect(showClassFormModal).toHaveBeenCalled();
  });

  it('handleEditClass', () => {
    wrapper.instance().handleEditClass(onClickAction);
    expect(showClassFormModal).toHaveBeenCalled();
  });

  it('handleAddSchool', () => {
    wrapper.instance().handleAddSchool(onClickAction);
    expect(showModal).toHaveBeenCalled();
  });

  it('handleClearRoster', () => {
    wrapper.instance().handleClearRoster(onClickAction);
    expect(showModal).toHaveBeenCalledWith(ModalConstants.CLEAR_ROSTER_MODAL);
  });

  it('handleEditSchool', () => {
    wrapper.instance().handleEditSchool(onClickAction);
    expect(showModal).toHaveBeenCalled();
  });

  it('handleDeactivateTeacher', () => {
    wrapper.instance().handleDeactivateTeacher(onClickAction);
    expect(showDeactivateUserModal).toHaveBeenCalled();
  });

  it('showDeactivateGroupModal', () => {
    wrapper.instance().handleDeactivateGroup(onClickAction);
    expect(showDeactivateGroupModal).toHaveBeenCalled();
  });

  it('showDeactivateSchoolModal', () => {
    wrapper.instance().handleDeactivateSchool(onClickAction);
    expect(showModal).toHaveBeenCalledWith(ModalConstants.DEACTIVATE_SCHOOL_MODAL);
  });

  it('showDeactivateClassModal', () => {
    wrapper.instance().handleDeactivateClass(onClickAction);
    expect(showModal).toHaveBeenCalledWith(ModalConstants.DEACTIVATE_CLASS_MODAL);
  });

  it('showDeactivateStudentModal', () => {
    wrapper.instance().handleDeactivateStudent(onClickAction);
    expect(showModal).toHaveBeenCalledWith(ModalConstants.DEACTIVATE_STUDENT_MODAL);
  });

  it('handleEditTeacherProfile', () => {
    wrapper.instance().handleEditTeacherProfile(onClickAction);
    expect(showTeacherFormModal).toHaveBeenCalled();
  });

  it('handleAddGroup', () => {
    wrapper.instance().handleAddGroup(onClickAction);
    expect(showModal).toHaveBeenCalled();
  });

  it('handleEditGroup', () => {
    wrapper.instance().handleEditGroup(onClickAction);
    expect(showModal).toHaveBeenCalled();
  });

  it('handleAdminEditTeacherProfile', () => {
    wrapper.instance().handleAdminEditTeacherProfile(onClickAction);
    expect(showTeacherFormModal).toHaveBeenCalled();
  });

  it('handleEditDistrict', () => {
    wrapper.instance().handleEditDistrict(onClickAction);
    expect(showModal).toHaveBeenCalled();
  });
});
