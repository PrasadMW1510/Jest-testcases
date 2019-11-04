import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import { USER_ORG, USER_TYPE } from 'containers/App/constants';

import ProfilePage from '../index';

describe('<ProfilePage />', () => {
  let wrapper = null;
  let classRedirectionInGroup = null;
  let profilePage = null;
  let smartBarSelections = null;
  let profilePageClassRequest = null;
  let profile = null;
  let profileUserType = null;
  let profileOrgType = null;

  beforeEach(() => {
    profilePageClassRequest = jest.fn();
    classRedirectionInGroup = jest.fn();
    smartBarSelections = fromJS({});
    profileUserType = USER_TYPE.Teacher;
    profileOrgType = '';
    profile = {
      user_type: ['Administrator'],
      contact_person: [
        {
          first_name: ['StageACAS44'],
          last_name: ['StageACAS44'],
          title: ['Sr.Lead'],
        },
      ],
      contact_info: [
        {
          email_address1: ['abc@gmail.com'],
          phone_number1: ['123-456-7890'],
        },
      ],
      birth_date: [''],
      classes: [
        {
          class: [
            {
              class_id: 'd0mv04d4fla89s0c8gr22mnj_2efa7f0',
              name: 'CA S44 Stage A Standalone',
            },
            {
              class_id: 'sng6nsgdiqma82jgm1btjagd_2efa7f0',
              name: 'Stage A California',
            },
          ],
        },
      ],
      district_user_id: ['234098234'],
      email: ['me@me.com'],
      enabled: ['true'],
      first_name: ['Audrey'],
      last_name: ['Doepke'],
      middle_name: [''],
      organizations: [
        {
          organization: [
            {
              org_id: 'eh3uct8fcien0dcrmsj4dnhd_2efa7f0',
              parent_org_id: '6477EA8C2E3D11E6A9700A2175802BAF',
              name: 'Super School',
              type: 'school',
            },
          ],
        },
      ],
      password: ['Welcome1'],
      password_hint: [''],
      permissions: [
        {
          permission: [
            {
              id: '100',
              name: 'Edit Student Profile',
              display_name: 'Edit Student Profile',
            },
            {
              id: '1000',
              name: 'View Demographics',
              display_name: 'View Demographics',
            },
            {
              id: '110',
              name: 'View Student Profile',
              display_name: 'View Student Profile',
            },
            {
              id: '1500',
              name: 'Manage Student Applications Settings',
              display_name: 'Manage Student Applications Settings',
            },
            {
              id: '1550',
              name: 'Manage Student Enrollment',
              display_name: 'Manage Student Enrollment',
            },
            {
              id: '1600',
              name: 'NCLB Filter on Reports',
              display_name: 'NCLB Filter on Reports',
            },
            {
              id: '200',
              name: 'Edit Group Profile',
              display_name: 'Edit Group Profile',
            },
            {
              id: '210',
              name: 'View Group Profile',
              display_name: 'View Group Profile',
            },
            {
              id: '300',
              name: 'Edit Class Profile',
              display_name: 'Edit Class Profile',
            },
            {
              id: '310',
              name: 'View Class Profile',
              display_name: 'View Class Profile',
            },
            {
              id: '620',
              name: 'View Own Profile',
              display_name: 'View Own Profile',
            },
            {
              id: '630',
              name: 'Edit Own Profile',
              display_name: 'Edit Own Profile',
            },
            {
              id: '640',
              name: 'View Own Permissions',
              display_name: 'View Own Permissions',
            },
            {
              id: '820',
              name: 'Add Students',
              display_name: 'Add Students',
            },
            {
              id: '825',
              name: 'Add Groups',
              display_name: 'Add Groups',
            },
            {
              id: '830',
              name: 'Add Classes',
              display_name: 'Add Classes',
            },
            {
              id: '850',
              name: 'Deactivate Group',
              display_name: 'Deactivate Group',
            },
          ],
        },
      ],
      prefix: [''],
      sps_id: [''],
      ssn: [''],
      student_count: ['47'],
      suffix: [''],
      title: [''],
      user_id: ['1nlkrm06m1atq6eq5hpm0tmd_2efa7f0'],
      user_name: ['audrey'],
    };

    wrapper = shallow(
      <ProfilePage
        profile={profile}
        smartBarSelections={smartBarSelections}
        classRedirectionInGroup={classRedirectionInGroup}
        profilePageClassRequest={profilePageClassRequest}
        profileUserType={profileUserType}
        profileOrgType={profileOrgType}
      />
    );
  });

  it('render Profile Details', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('render Profile for District Admins', () => {
    wrapper.setProps({
      profileUserType: USER_TYPE.Tech,
      profileOrgType: USER_ORG.District,
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('render Profile for District Admins', () => {
    wrapper.setProps({
      profileUserType: USER_TYPE.Administrator,
      profileOrgType: USER_ORG.District,
    });
    const test = '';
    wrapper.instance().renderDefaultDetails(test);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('render Profile for School Admins', () => {
    wrapper.setProps({
      profileUserType: USER_TYPE.Administrator,
      profileOrgType: '',
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('render student details', () => {
    smartBarSelections = fromJS({ selectedCohType: 'Student' });
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
    wrapper.setProps({ profilePage, smartBarSelections });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Component will Receive Props', () => {
    smartBarSelections = fromJS({ selectedCohType: 'Group' });
    profilePage = {
      classDetails: [],
      profileDetails: {
        applications: [
          {
            application: [
              {
                community_id: 'E3D',
                name: 'English 3D',
              },
              {
                community_id: 'SRI',
                name: 'The Reading Inventory',
              },
            ],
          },
        ],
        class_id: ['d0mv04d4fla89s0c8gr22mnj_2efa7f0'],
        description: ['description'],
        display_name: ['CA S44 Stage A Standalone'],
        grades: [
          {
            grade: {
              name: '2',
              full_name: 'Second grade',
            },
          },
        ],
        name: ['CA S44 Stage A Standalone'],
        owner_id: ['eh3uct8fcien0dcrmsj4dnhd_2efa7f0'],
        owner_type_id: ['school'],
        student_count: ['1'],
        students: [
          {
            user: [
              {
                user_id: 'g55fneif92at5f8usa82doo0_2efa7f0',
                first_name: 'StageACAS44',
                last_name: 'StageACAS44',
                user_name: 'StageACAS44',
              },
            ],
          },
        ],
        teachers: [
          {
            user: [
              {
                user_id: '1nlkrm06m1atq6eq5hpm0tmd_2efa7f0',
                first_name: 'Audrey',
                last_name: 'Doepke',
                user_name: 'audrey',
              },
            ],
          },
        ],
      },
    };
    wrapper = shallow(
      <ProfilePage
        profilePage={profilePage}
        smartBarSelections={smartBarSelections}
        profilePageClassRequest={profilePageClassRequest}
      />
    );

    const mockNextProProfilePage = {
      classDetails: {
        applications: [
          {
            application: [
              {
                community_id: 'E3D',
                name: 'English 3D',
              },
              {
                community_id: 'SRI',
                name: 'The Reading Inventory',
              },
            ],
          },
        ],
        class_id: ['d0mv04d4fla89s0c8gr22123_2efa7f0'],
        description: ['description'],
        display_name: ['CA S44 Stage A Standalone'],
        grades: [
          {
            grade: {
              name: '2',
              full_name: 'Second grade',
            },
          },
        ],
        name: ['CA S44 Stage A Standalone'],
        owner_id: ['abcuct8fcien0dcrmsj4dnhd_123a7f0'],
        owner_type_id: ['school'],
        student_count: ['1'],
        students: [
          {
            user: [
              {
                user_id: 'g55fneif92at5f8usa82doo0_2efa7f0',
                first_name: 'StageACAS44',
                last_name: 'StageACAS44',
                user_name: 'StageACAS44',
              },
            ],
          },
        ],
        teachers: [
          {
            user: [
              {
                user_id: '1nlkrm06m1atq6eq5hpm0tmd_2efa7f0',
                first_name: 'Audrey',
                last_name: 'Doepke',
                user_name: 'audrey',
              },
            ],
          },
        ],
      },
      profileDetails: {
        description: ['bogus description'],
        display_name: ['Group A'],
        group_id: ['to6s3rj8e254qgfmo6gt09on_2efa7f0'],
        name: ['Group A'],
        owner_id: ['abcd04d4fla89s0c8gr22mnj_2efa7f0'],
        owner_type_id: ['class'],
        users: [
          {
            user: [
              {
                first_name: ['StageACAS44'],
                last_name: ['StageACAS44'],
                user_id: ['g55fneif92at5f8usa82doo0_2efa7f0'],
              },
            ],
          },
        ],
      },
    };
    wrapper.setProps({ profilePage: mockNextProProfilePage });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Component will Receive Props: else Condition', () => {
    smartBarSelections = fromJS({ selectedCohType: 'Student' });
    profilePage = {
      classDetails: [],
      profileDetails: {
        applications: [
          {
            application: [
              {
                community_id: 'E3D',
                name: 'English 3D',
              },
              {
                community_id: 'SRI',
                name: 'The Reading Inventory',
              },
            ],
          },
        ],
        class_id: ['d0mv04d4fla89s0c8gr22mnj_2efa7f0'],
        description: ['description'],
        display_name: ['CA S44 Stage A Standalone'],
        grades: [
          {
            grade: {
              name: '2',
              full_name: 'Second grade',
            },
          },
        ],
        name: ['CA S44 Stage A Standalone'],
        owner_id: ['eh3uct8fcien0dcrmsj4dnhd_2efa7f0'],
        owner_type_id: ['school'],
        student_count: ['1'],
        students: [
          {
            user: [
              {
                user_id: 'g55fneif92at5f8usa82doo0_2efa7f0',
                first_name: 'StageACAS44',
                last_name: 'StageACAS44',
                user_name: 'StageACAS44',
              },
            ],
          },
        ],
        teachers: [
          {
            user: [
              {
                user_id: '1nlkrm06m1atq6eq5hpm0tmd_2efa7f0',
                first_name: 'Audrey',
                last_name: 'Doepke',
                user_name: 'audrey',
              },
            ],
          },
        ],
      },
    };
    wrapper = shallow(
      <ProfilePage
        profilePage={profilePage}
        smartBarSelections={smartBarSelections}
        profilePageClassRequest={profilePageClassRequest}
      />
    );

    const mockNextProProfilePage = {
      classDetails: {
        applications: [
          {
            application: [
              {
                community_id: 'E3D',
                name: 'English 3D',
              },
              {
                community_id: 'SRI',
                name: 'The Reading Inventory',
              },
            ],
          },
        ],
        class_id: ['d0mv04d4fla89s0c8gr22123_2efa7f0'],
        description: ['description'],
        display_name: ['CA S44 Stage A Standalone'],
        grades: [
          {
            grade: {
              name: '2',
              full_name: 'Second grade',
            },
          },
        ],
        name: ['CA S44 Stage A Standalone'],
        owner_id: ['eh3uct8fcien0dcrmsj4dnhd_123a7f0'],
        owner_type_id: ['school'],
        student_count: ['1'],
        students: [
          {
            user: [
              {
                user_id: 'g55fneif92at5f8usa82doo0_2efa7f0',
                first_name: 'StageACAS44',
                last_name: 'StageACAS44',
                user_name: 'StageACAS44',
              },
            ],
          },
        ],
        teachers: [
          {
            user: [
              {
                user_id: '1nlkrm06m1atq6eq5hpm0tmd_2efa7f0',
                first_name: 'Audrey',
                last_name: 'Doepke',
                user_name: 'audrey',
              },
            ],
          },
        ],
      },
      profileDetails: {
        description: ['bogus description'],
        display_name: ['Group A'],
        group_id: ['to6s3rj8e254qgfmo6gt09on_2efa7f0'],
        name: ['Group A'],
        owner_id: ['d0mv04d4fla89s0c8gr22123_2efa7f0'],
        owner_type_id: ['class'],
        users: [
          {
            user: [
              {
                first_name: ['StageACAS44'],
                last_name: ['StageACAS44'],
                user_id: ['g55fneif92at5f8usa82doo0_2efa7f0'],
              },
            ],
          },
        ],
      },
    };
    wrapper.setProps({ profilePage: mockNextProProfilePage });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('onClassSelection', () => {
    smartBarSelections = fromJS({ selectedGroupId: 'to6s3rj8e254qgfmo6gt09on_2efa7f0' });
    profilePage = {
      classDetails: {
        class_id: ['d0mv04d4fla89s0c8gr22mnj_2efa7f0'],
        name: ['CA S44 Stage A Standalone'],
        display_name: 'CA S44 Stage A Standalone',
        description: 'description',
        owner_id: 'eh3uct8fcien0dcrmsj4dnhd_2efa7f0',
        owner_type_id: 'school',
        grades: [
          {
            grade: {
              name: '2',
              full_name: 'Second grade',
            },
          },
        ],
        teachers: [
          {
            user: {
              user_id: '1nlkrm06m1atq6eq5hpm0tmd_2efa7f0',
              first_name: 'Audrey',
              last_name: 'Doepke',
              user_name: 'audrey',
            },
          },
        ],
        student_count: '1',
        students: [
          {
            user: {
              user_id: 'g55fneif92at5f8usa82doo0_2efa7f0',
              first_name: 'StageACAS44',
              last_name: 'StageACAS44',
              user_name: 'StageACAS44',
            },
          },
        ],
        applications: [
          {
            application: [
              {
                community_id: 'S44NG',
                name: 'System 44 Next Generation',
              },
              {
                community_id: 'SRI',
                name: 'The Reading Inventory',
              },
            ],
          },
        ],
      },
      profileDetails: {
        group_id: 'to6s3rj8e254qgfmo6gt09on_2efa7f0',
        name: 'Group A',
        display_name: 'Group A',
        description: 'bogus description',
        owner_id: 'd0mv04d4fla89s0c8gr22mnj_2efa7f0',
        owner_type_id: 'class',
        users: [
          {
            user: [
              {
                length: 1,
                user_id: 'g55fneif92at5f8usa82doo0_2efa7f0',
                first_name: 'StageACAS44',
                last_name: 'StageACAS44',
              },
            ],
          },
        ],
      },
    };
    wrapper.setProps({ smartBarSelections, profilePage });
    wrapper.instance().onClassSelection();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('renderTeacherDetails being called', () => {
    smartBarSelections = fromJS({ selectedCohType: 'Teacher' });
    profilePage = {
      classDetails: {
        applications: [
          {
            application: [
              {
                community_id: 'E3D',
                name: 'English 3D',
              },
              {
                community_id: 'SRI',
                name: 'The Reading Inventory',
              },
            ],
          },
        ],
        class_id: ['d0mv04d4fla89s0c8gr22123_2efa7f0'],
        description: ['description'],
        display_name: ['CA S44 Stage A Standalone'],
        grades: [
          {
            grade: {
              name: '2',
              full_name: 'Second grade',
            },
          },
        ],
        name: ['CA S44 Stage A Standalone'],
        owner_id: ['eh3uct8fcien0dcrmsj4dnhd_123a7f0'],
        owner_type_id: ['school'],
        student_count: ['1'],
        students: [
          {
            user: [
              {
                user_id: 'g55fneif92at5f8usa82doo0_2efa7f0',
                first_name: 'StageACAS44',
                last_name: 'StageACAS44',
                user_name: 'StageACAS44',
              },
            ],
          },
        ],
        teachers: [
          {
            user: [
              {
                user_id: '1nlkrm06m1atq6eq5hpm0tmd_2efa7f0',
                first_name: 'Audrey',
                last_name: 'Doepke',
                user_name: 'audrey',
              },
            ],
          },
        ],
      },
      profileDetails: {
        description: ['bogus description'],
        display_name: ['Group A'],
        group_id: ['to6s3rj8e254qgfmo6gt09on_2efa7f0'],
        name: ['Group A'],
        owner_id: ['d0mv04d4fla89s0c8gr22mnj_2efa7f0'],
        owner_type_id: ['class'],
        users: [
          {
            user: [
              {
                first_name: ['StageACAS44'],
                last_name: ['StageACAS44'],
                user_id: ['g55fneif92at5f8usa82doo0_2efa7f0'],
              },
            ],
          },
        ],
      },
    };

    wrapper.setProps({ smartBarSelections, profilePage });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('renderGradeDetails being called', () => {
    smartBarSelections = fromJS({ selectedCohType: 'Grade' });
    profilePage = {
      classDetails: {
        applications: [
          {
            application: [
              {
                community_id: 'E3D',
                name: 'English 3D',
              },
              {
                community_id: 'SRI',
                name: 'The Reading Inventory',
              },
            ],
          },
        ],
        class_id: ['d0mv04d4fla89s0c8gr22123_2efa7f0'],
        description: ['description'],
        display_name: ['CA S44 Stage A Standalone'],
        grades: [
          {
            grade: {
              name: '2',
              full_name: 'Second grade',
            },
          },
        ],
        name: ['CA S44 Stage A Standalone'],
        owner_id: ['eh3uct8fcien0dcrmsj4dnhd_123a7f0'],
        owner_type_id: ['school'],
        student_count: ['1'],
        students: [
          {
            user: [
              {
                user_id: 'g55fneif92at5f8usa82doo0_2efa7f0',
                first_name: 'StageACAS44',
                last_name: 'StageACAS44',
                user_name: 'StageACAS44',
              },
            ],
          },
        ],
        teachers: [
          {
            user: [
              {
                user_id: '1nlkrm06m1atq6eq5hpm0tmd_2efa7f0',
                first_name: 'Audrey',
                last_name: 'Doepke',
                user_name: 'audrey',
              },
            ],
          },
        ],
      },
      profileDetails: {
        description: ['bogus description'],
        display_name: ['Group A'],
        group_id: ['to6s3rj8e254qgfmo6gt09on_2efa7f0'],
        name: ['Group A'],
        owner_id: ['d0mv04d4fla89s0c8gr22mnj_2efa7f0'],
        owner_type_id: ['class'],
        users: [
          {
            user: [
              {
                first_name: ['StageACAS44'],
                last_name: ['StageACAS44'],
                user_id: ['g55fneif92at5f8usa82doo0_2efa7f0'],
              },
            ],
          },
        ],
      },
    };

    wrapper.setProps({ smartBarSelections, profilePage });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('renderSchoolDetails being called', () => {
    smartBarSelections = fromJS({ selectedCohType: 'School' });
    profilePage = {
      classDetails: {
        applications: [
          {
            application: [
              {
                community_id: 'E3D',
                name: 'English 3D',
              },
              {
                community_id: 'SRI',
                name: 'The Reading Inventory',
              },
            ],
          },
        ],
        class_id: ['d0mv04d4fla89s0c8gr22123_2efa7f0'],
        description: ['description'],
        display_name: ['CA S44 Stage A Standalone'],
        grades: [
          {
            grade: {
              name: '2',
              full_name: 'Second grade',
            },
          },
        ],
        name: ['CA S44 Stage A Standalone'],
        owner_id: ['eh3uct8fcien0dcrmsj4dnhd_123a7f0'],
        owner_type_id: ['school'],
        student_count: ['1'],
        students: [
          {
            user: [
              {
                user_id: 'g55fneif92at5f8usa82doo0_2efa7f0',
                first_name: 'StageACAS44',
                last_name: 'StageACAS44',
                user_name: 'StageACAS44',
              },
            ],
          },
        ],
        teachers: [
          {
            user: [
              {
                user_id: '1nlkrm06m1atq6eq5hpm0tmd_2efa7f0',
                first_name: 'Audrey',
                last_name: 'Doepke',
                user_name: 'audrey',
              },
            ],
          },
        ],
      },
      profileDetails: {
        contact_person: [
          {
            first_name: ['StageACAS44'],
            last_name: ['StageACAS44'],
            title: ['Sr.Lead'],
          },
        ],
        contact_info: [
          {
            email_address1: ['abc@gmail.com'],
            phone_number1: ['123-456-7890'],
          },
        ],
        description: ['bogus description'],
        display_name: ['Group A'],
        group_id: ['to6s3rj8e254qgfmo6gt09on_2efa7f0'],
        name: ['Group A'],
        owner_id: ['d0mv04d4fla89s0c8gr22mnj_2efa7f0'],
        owner_type_id: ['class'],
        users: [
          {
            user: [
              {
                first_name: ['StageACAS44'],
                last_name: ['StageACAS44'],
                user_id: ['g55fneif92at5f8usa82doo0_2efa7f0'],
              },
            ],
          },
        ],
      },
    };

    wrapper.setProps({ smartBarSelections, profilePage });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('render grades', () => {
    const grades = [
      {
        grade: [
          {
            name: '2',
            full_name: 'Second grade',
          },
        ],
      },
    ];
    wrapper.instance().renderGrades(grades);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('render teacher', () => {
    const teachers = [
      {
        user: [
          {
            user_id: '1nlkrm06m1atq6eq5hpm0tmd_2efa7f0',
            first_name: 'Audrey',
            last_name: 'Doepke',
            user_name: 'audrey',
          },
        ],
      },
    ];
    wrapper.instance().renderTeachers(teachers);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('render Class grades', () => {
    const grades = [
      {
        grade: [
          {
            name: '2',
            full_name: 'Second grade',
          },
        ],
      },
    ];
    wrapper.instance().renderClassGrades(grades);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('render Class teacher', () => {
    const teachers = [
      {
        user: [
          {
            user_id: '1nlkrm06m1atq6eq5hpm0tmd_2efa7f0',
            first_name: 'Audrey',
            last_name: 'Doepke',
            user_name: 'audrey',
          },
        ],
      },
    ];
    wrapper.instance().renderClassTeachers(teachers);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('render grades with no value', () => {
    const grades = [];
    wrapper.instance().renderGrades(grades);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('render teacher', () => {
    const teachers = [];
    wrapper.instance().renderTeachers(teachers);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('renderClassDetails being called for Teacher', () => {
    smartBarSelections = fromJS({ selectedCohType: 'Class' });
    profilePage = {
      profileDetails: {
        group_id: 'to6s3rj8e254qgfmo6gt09on_2efa7f0',
        name: 'Group A',
        display_name: 'Group A',
        description: 'bogus description',
        owner_id: 'd0mv04d4fla89s0c8gr22mnj_2efa7f0',
        owner_type_id: 'class',
        users: [
          {
            user: [
              {
                length: 1,
                user_id: 'g55fneif92at5f8usa82doo0_2efa7f0',
                first_name: 'StageACAS44',
                last_name: 'StageACAS44',
              },
            ],
          },
        ],
      },
    };
    profileUserType = USER_TYPE.Teacher;
    wrapper.setProps({ smartBarSelections, profilePage, profileUserType });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('renderClassDetails being called for Administrator', () => {
    smartBarSelections = fromJS({ selectedCohType: 'Class' });
    profilePage = {
      profileDetails: {
        group_id: 'to6s3rj8e254qgfmo6gt09on_2efa7f0',
        name: 'Group A',
        display_name: 'Group A',
        description: 'bogus description',
        owner_id: 'd0mv04d4fla89s0c8gr22mnj_2efa7f0',
        owner_type_id: 'class',
        users: [
          {
            user: [
              {
                length: 1,
                user_id: 'g55fneif92at5f8usa82doo0_2efa7f0',
                first_name: 'StageACAS44',
                last_name: 'StageACAS44',
              },
            ],
          },
        ],
      },
    };

    profileUserType = USER_TYPE.Administrator;
    wrapper.setProps({ smartBarSelections, profilePage, profileUserType });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('renderGroupDetails being called', () => {
    smartBarSelections = fromJS({ selectedCohType: 'Group' });
    profilePage = {
      classDetails: {
        applications: [
          {
            application: [
              {
                community_id: 'E3D',
                name: 'English 3D',
              },
              {
                community_id: 'SRI',
                name: 'The Reading Inventory',
              },
            ],
          },
        ],
        class_id: ['d0mv04d4fla89s0c8gr22123_2efa7f0'],
        description: ['description'],
        display_name: ['CA S44 Stage A Standalone'],
        grades: [
          {
            grade: {
              name: '2',
              full_name: 'Second grade',
            },
          },
        ],
        name: ['CA S44 Stage A Standalone'],
        owner_id: ['eh3uct8fcien0dcrmsj4dnhd_123a7f0'],
        owner_type_id: ['school'],
        student_count: ['1'],
        students: [
          {
            user: [
              {
                user_id: 'g55fneif92at5f8usa82doo0_2efa7f0',
                first_name: 'StageACAS44',
                last_name: 'StageACAS44',
                user_name: 'StageACAS44',
              },
            ],
          },
        ],
        teachers: [
          {
            user: [
              {
                user_id: '1nlkrm06m1atq6eq5hpm0tmd_2efa7f0',
                first_name: 'Audrey',
                last_name: 'Doepke',
                user_name: 'audrey',
              },
            ],
          },
        ],
      },
      profileDetails: {
        description: ['bogus description'],
        display_name: ['Group A'],
        group_id: ['to6s3rj8e254qgfmo6gt09on_2efa7f0'],
        name: ['Group A'],
        owner_id: ['d0mv04d4fla89s0c8gr22mnj_2efa7f0'],
        owner_type_id: ['class'],
        users: [
          {
            user: [
              {
                first_name: ['StageACAS44'],
                last_name: ['StageACAS44'],
                user_id: ['g55fneif92at5f8usa82doo0_2efa7f0'],
              },
            ],
          },
        ],
      },
    };

    wrapper.setProps({ smartBarSelections, profilePage });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('smartBarSelections no correct value', () => {
    smartBarSelections = fromJS({
      testValue: 'CheckForReturnNull',
    });
    wrapper.setProps({ smartBarSelections });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('onGradeSelection', () => {
    const teacherRedirection = jest.fn();
    const gradeRedirection = jest.fn();
    smartBarSelections = fromJS({ selectedGradeId: 'to6s3rj8e254qgfmo6gt09on_2efa7f0' });
    wrapper = shallow(
      <ProfilePage
        profile={profile}
        smartBarSelections={smartBarSelections}
        teacherRedirection={teacherRedirection}
        gradeRedirection={gradeRedirection}
        profilePageClassRequest={profilePageClassRequest}
        profileUserType={profileUserType}
        profileOrgType={profileOrgType}
      />
    );
    profilePage = {
      classDetails: {
        class_id: ['d0mv04d4fla89s0c8gr22mnj_2efa7f0'],
        name: ['CA S44 Stage A Standalone'],
        display_name: 'CA S44 Stage A Standalone',
        description: 'description',
        owner_id: 'eh3uct8fcien0dcrmsj4dnhd_2efa7f0',
        owner_type_id: 'school',
        grades: [
          {
            grade: {
              name: '2',
              full_name: 'Second grade',
            },
          },
        ],
        teachers: [
          {
            user: {
              user_id: '1nlkrm06m1atq6eq5hpm0tmd_2efa7f0',
              first_name: 'Audrey',
              last_name: 'Doepke',
              user_name: 'audrey',
            },
          },
        ],
        student_count: '1',
        students: [
          {
            user: {
              user_id: 'g55fneif92at5f8usa82doo0_2efa7f0',
              first_name: 'StageACAS44',
              last_name: 'StageACAS44',
              user_name: 'StageACAS44',
            },
          },
        ],
        applications: [
          {
            application: [
              {
                community_id: 'S44NG',
                name: 'System 44 Next Generation',
              },
              {
                community_id: 'SRI',
                name: 'The Reading Inventory',
              },
            ],
          },
        ],
      },
      profileDetails: {
        group_id: 'to6s3rj8e254qgfmo6gt09on_2efa7f0',
        name: 'Group A',
        display_name: 'Group A',
        description: 'bogus description',
        owner_id: 'd0mv04d4fla89s0c8gr22mnj_2efa7f0',
        owner_type_id: 'class',
        users: [
          {
            user: [
              {
                length: 1,
                user_id: 'g55fneif92at5f8usa82doo0_2efa7f0',
                first_name: 'StageACAS44',
                last_name: 'StageACAS44',
              },
            ],
          },
        ],
      },
    };
    const e = {
      target: {
        getAttribute: () => 'gradeId',
      },
    };
    wrapper.setProps({ smartBarSelections, profilePage });
    wrapper.instance().onGradeSelection(e);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('onTeacherSelection', () => {
    const teacherRedirection = jest.fn();
    const gradeRedirection = jest.fn();
    smartBarSelections = fromJS({ selectedTeacherId: 'to6s3rj8e254qgfmo6gt09on_2efa7f0' });
    wrapper = shallow(
      <ProfilePage
        profile={profile}
        smartBarSelections={smartBarSelections}
        teacherRedirection={teacherRedirection}
        gradeRedirection={gradeRedirection}
        profilePageClassRequest={profilePageClassRequest}
        profileUserType={profileUserType}
        profileOrgType={profileOrgType}
      />
    );
    profilePage = {
      classDetails: {
        class_id: ['d0mv04d4fla89s0c8gr22mnj_2efa7f0'],
        name: ['CA S44 Stage A Standalone'],
        display_name: 'CA S44 Stage A Standalone',
        description: 'description',
        owner_id: 'eh3uct8fcien0dcrmsj4dnhd_2efa7f0',
        owner_type_id: 'school',
        grades: [
          {
            grade: {
              name: '2',
              full_name: 'Second grade',
            },
          },
        ],
        teachers: [
          {
            user: {
              user_id: '1nlkrm06m1atq6eq5hpm0tmd_2efa7f0',
              first_name: 'Audrey',
              last_name: 'Doepke',
              user_name: 'audrey',
            },
          },
        ],
        student_count: '1',
        students: [
          {
            user: {
              user_id: 'g55fneif92at5f8usa82doo0_2efa7f0',
              first_name: 'StageACAS44',
              last_name: 'StageACAS44',
              user_name: 'StageACAS44',
            },
          },
        ],
        applications: [
          {
            application: [
              {
                community_id: 'S44NG',
                name: 'System 44 Next Generation',
              },
              {
                community_id: 'SRI',
                name: 'The Reading Inventory',
              },
            ],
          },
        ],
      },
      profileDetails: {
        group_id: 'to6s3rj8e254qgfmo6gt09on_2efa7f0',
        name: 'Group A',
        display_name: 'Group A',
        description: 'bogus description',
        owner_id: 'd0mv04d4fla89s0c8gr22mnj_2efa7f0',
        owner_type_id: 'class',
        users: [
          {
            user: [
              {
                length: 1,
                user_id: 'g55fneif92at5f8usa82doo0_2efa7f0',
                first_name: 'StageACAS44',
                last_name: 'StageACAS44',
              },
            ],
          },
        ],
      },
    };
    const e = {
      target: {
        getAttribute: () => 'teacherId',
      },
    };
    wrapper.setProps({ smartBarSelections, profilePage });
    wrapper.instance().onTeacherSelection(e);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('onClassSelection', () => {
    const teacherRedirection = jest.fn();
    const gradeRedirection = jest.fn();
    smartBarSelections = fromJS({ selectedClassId: 'to6s3rj8e254qgfmo6gt09on_2efa7f0' });
    wrapper = shallow(
      <ProfilePage
        profile={profile}
        smartBarSelections={smartBarSelections}
        teacherRedirection={teacherRedirection}
        gradeRedirection={gradeRedirection}
        classRedirectionInGroup={classRedirectionInGroup}
        profilePageClassRequest={profilePageClassRequest}
        profileUserType={profileUserType}
        profileOrgType={profileOrgType}
      />
    );
    profilePage = {
      classDetails: {
        class_id: ['d0mv04d4fla89s0c8gr22mnj_2efa7f0'],
        name: ['CA S44 Stage A Standalone'],
        display_name: 'CA S44 Stage A Standalone',
        description: 'description',
        owner_id: 'eh3uct8fcien0dcrmsj4dnhd_2efa7f0',
        owner_type_id: 'school',
        grades: [
          {
            grade: {
              name: '2',
              full_name: 'Second grade',
            },
          },
        ],
        teachers: [
          {
            user: {
              user_id: '1nlkrm06m1atq6eq5hpm0tmd_2efa7f0',
              first_name: 'Audrey',
              last_name: 'Doepke',
              user_name: 'audrey',
            },
          },
        ],
        student_count: '1',
        students: [
          {
            user: {
              user_id: 'g55fneif92at5f8usa82doo0_2efa7f0',
              first_name: 'StageACAS44',
              last_name: 'StageACAS44',
              user_name: 'StageACAS44',
            },
          },
        ],
        applications: [
          {
            application: [
              {
                community_id: 'S44NG',
                name: 'System 44 Next Generation',
              },
              {
                community_id: 'SRI',
                name: 'The Reading Inventory',
              },
            ],
          },
        ],
      },
      profileDetails: {
        group_id: 'to6s3rj8e254qgfmo6gt09on_2efa7f0',
        name: 'Group A',
        display_name: 'Group A',
        description: 'bogus description',
        owner_id: 'd0mv04d4fla89s0c8gr22mnj_2efa7f0',
        owner_type_id: 'class',
        users: [
          {
            user: [
              {
                length: 1,
                user_id: 'g55fneif92at5f8usa82doo0_2efa7f0',
                first_name: 'StageACAS44',
                last_name: 'StageACAS44',
              },
            ],
          },
        ],
      },
    };
    const e = {
      target: {
        getAttribute: () => 'teacherId',
      },
    };
    wrapper.setProps({ smartBarSelections, profilePage });
    wrapper.instance().onClassSelection(e);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
