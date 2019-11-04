import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';

import { USER_TYPE, USER_ORG } from 'containers/App/constants';
import { UsageSummaryContainer } from '../UsageSummaryContainer';

describe('<UsageSummaryContainer />', () => {
  let wrapper = null;
  let mockUsageSummaryContainer = null;
  let mockedLoginDataState = null;
  let mockedSmartBarSelections = null;
  const mockUsageSummaryRequest = jest.fn();
  const tempApplications = [
    {
      application: [
        {
          $: {
            licensed: 'true',
            type: 'SUBPRODUCT',
          },
          name: ['Common Core Code X Course I'],
          app_id: ['CDX_CI'],
          seats: [
            {
              _: '1000',
              $: {
                type: 'purchased',
              },
            },
            {
              _: '0',
              $: {
                type: 'used_active',
              },
            },
          ],
        },
        {
          $: {
            licensed: 'true',
            type: 'SUBPRODUCT',
          },
          name: ['Common Core Code X Course II'],
          app_id: ['CDX_CII'],
          seats: [
            {
              _: '1000',
              $: {
                type: 'purchased',
              },
            },
            {
              _: '0',
              $: {
                type: 'used_active',
              },
            },
          ],
        },
        {
          $: {
            licensed: 'true',
            type: 'SUBPRODUCT',
          },
          name: ['Common Core Code X Course III'],
          app_id: ['CDX_CIII'],
          seats: [
            {
              _: '1000',
              $: {
                type: 'purchased',
              },
            },
            {
              _: '0',
              $: {
                type: 'used_active',
              },
            },
          ],
        },
      ],
    },
  ];

  describe('props.usageSummary is an empty array [ Administrator ]', () => {
    beforeEach(() => {
      mockedLoginDataState = fromJS({ user_type: [USER_TYPE.Teacher] });
      mockedSmartBarSelections = fromJS({ groupId: '1' });
      mockUsageSummaryContainer = fromJS({
        usageSummary: [],
      });
      wrapper = shallow(
        <UsageSummaryContainer
          usageSummary={mockUsageSummaryContainer}
          usageSummaryRequest={mockUsageSummaryRequest}
          loginData={mockedLoginDataState}
          smartBarSelections={mockedSmartBarSelections}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('props.user_type is empty, studentId selected from smartbar', () => {
    beforeEach(() => {
      mockedLoginDataState = fromJS({ user_type: [''] });
      mockedSmartBarSelections = fromJS({
        selectedCohType: 'Student',
        selectedStudentId: 'student01',
      });
      mockUsageSummaryContainer = fromJS({
        usageSummary: {
          applications: [
            {
              application: [
                {
                  $: {
                    enrolled: 'true',
                  },
                  name: ['MATH 180 Course I'],
                  datapoint: [
                    {
                      label: ['Date Started Math180'],
                      value: ['7/20/2017'],
                    },
                  ],
                },
              ],
            },
          ],
        },
        // ],
      });
      wrapper = shallow(
        <UsageSummaryContainer
          usageSummary={mockUsageSummaryContainer}
          usageSummaryRequest={mockUsageSummaryRequest}
          loginData={mockedLoginDataState}
          smartBarSelections={mockedSmartBarSelections}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('props.user_type is empty, groupId selected from smartbar', () => {
    beforeEach(() => {
      mockedLoginDataState = fromJS({ user_type: [''] });
      mockedSmartBarSelections = fromJS({ selectedCohType: 'Group' });
      mockUsageSummaryContainer = fromJS({
        usageSummary: {
          applications: tempApplications,
          students: [
            {
              student: [
                {
                  applications: [
                    {
                      application: [
                        {
                          'application.id': ['CDX_CII'],
                          $: {
                            id: 'CDX_CII',
                            used: 'false',
                          },
                        },
                        {
                          'application.id': ['CDX_CI'],
                          $: {
                            id: 'CDX_CI',
                            used: 'true',
                          },
                        },
                        {
                          'application.id': ['CDX_CIII'],
                          $: {
                            id: 'CDX_CIII',
                            used: 'false',
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      });
      wrapper = shallow(
        <UsageSummaryContainer
          usageSummary={mockUsageSummaryContainer}
          usageSummaryRequest={mockUsageSummaryRequest}
          loginData={mockedLoginDataState}
          smartBarSelections={mockedSmartBarSelections}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('props.user_type is empty, classId selected from smartbar', () => {
    beforeEach(() => {
      mockedLoginDataState = fromJS({ user_type: [''] });
      mockedSmartBarSelections = fromJS({ selectedCohType: 'Class' });
      mockUsageSummaryContainer = fromJS({
        usageSummary: {
          applications: tempApplications,
          students: [
            {
              student: [
                {
                  applications: [
                    {
                      application: [
                        {
                          $: {
                            id: 'CDX_CII',
                            used: 'false',
                          },
                        },
                        {
                          $: {
                            id: 'CDX_CI',
                            used: 'true',
                          },
                        },
                        {
                          $: {
                            id: 'CDX_CIII',
                            used: 'false',
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      });
      wrapper = shallow(
        <UsageSummaryContainer
          usageSummary={mockUsageSummaryContainer}
          usageSummaryRequest={mockUsageSummaryRequest}
          loginData={mockedLoginDataState}
          smartBarSelections={mockedSmartBarSelections}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('props.user_type is empty, classId selected from smartbar and no students', () => {
    beforeEach(() => {
      mockedLoginDataState = fromJS({ user_type: [''] });
      mockedSmartBarSelections = fromJS({ selectedCohType: 'Class' });
      mockUsageSummaryContainer = fromJS({
        usageSummary: {
          applications: tempApplications,
          students: [],
        },
      });
      wrapper = shallow(
        <UsageSummaryContainer
          usageSummary={mockUsageSummaryContainer}
          usageSummaryRequest={mockUsageSummaryRequest}
          loginData={mockedLoginDataState}
          smartBarSelections={mockedSmartBarSelections}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('props.user_type is teacher, teacherId selected from smartbar', () => {
    beforeEach(() => {
      mockedLoginDataState = fromJS({ user_type: [USER_TYPE.Teacher] });
      mockedSmartBarSelections = fromJS({ selectedCohType: 'Teacher' });
      mockUsageSummaryContainer = fromJS({
        usageSummary: {
          name: ['CA S44 Stage A Standalone'],
          applications: tempApplications,
          classes: [
            {
              class: [
                {
                  applications: [
                    {
                      application: [
                        {
                          name: ['Common Core Code X Course I'],
                          'application.id': ['CDX_CI'],
                          students: [
                            {
                              total: ['0'],
                            },
                          ],
                        },
                        {
                          name: ['Common Core Code X Course II'],
                          'application.id': ['CDX_CII'],
                          students: [
                            {
                              total: ['0'],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      });
      wrapper = shallow(
        <UsageSummaryContainer
          usageSummary={mockUsageSummaryContainer}
          usageSummaryRequest={mockUsageSummaryRequest}
          loginData={mockedLoginDataState}
          smartBarSelections={mockedSmartBarSelections}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('props.user_type is school admin, no selection from smartbar', () => {
    beforeEach(() => {
      mockedLoginDataState = fromJS({
        user_type: [USER_TYPE.Administrator],
        user_org: [USER_ORG.School],
      });
      mockedSmartBarSelections = fromJS({});
      mockUsageSummaryContainer = fromJS({
        usageSummary: {
          applications: tempApplications,
          classes: [
            {
              class: [
                {
                  teachers: [
                    {
                      teacher: [
                        {
                          name: [
                            {
                              // 'given.name': ['steve'],
                              // 'family.name': ['jobs'],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  applications: [
                    {
                      application: [
                        {
                          $: {
                            type: 'SUBPRODUCT',
                          },
                          name: ['Common Core Code X Course I'],
                          'application.id': ['CDX_CI'],
                          students: [
                            {
                              total: ['0'],
                            },
                          ],
                        },
                        {
                          $: {
                            type: 'SUBPRODUCT',
                          },
                          name: ['Common Core Code X Course II'],
                          'application.id': ['CDX_CII'],
                          students: [
                            {
                              total: ['0'],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      });

      wrapper = shallow(
        <UsageSummaryContainer
          usageSummary={mockUsageSummaryContainer}
          usageSummaryRequest={mockUsageSummaryRequest}
          loginData={mockedLoginDataState}
          smartBarSelections={mockedSmartBarSelections}
        />
      );
    });
    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Expect to call load function on mount', () => {
      expect(mockUsageSummaryRequest).toHaveBeenCalled();
    });
  });

  describe('props.user_type is school admin, no selection from smartbar empty teachers', () => {
    beforeEach(() => {
      mockedLoginDataState = fromJS({
        user_type: [USER_TYPE.Administrator],
        user_org: [USER_ORG.School],
      });
      mockedSmartBarSelections = fromJS({});
      mockUsageSummaryContainer = fromJS({
        usageSummary: {
          applications: tempApplications,
          classes: [
            {
              class: [
                {
                  teachers: [''],
                  applications: [
                    {
                      application: [
                        {
                          $: {
                            type: 'SUBPRODUCT',
                          },
                          name: ['Common Core Code X Course I'],
                          'application.id': ['CDX_CI'],
                          students: [
                            {
                              total: ['0'],
                            },
                          ],
                        },
                        {
                          $: {
                            type: 'SUBPRODUCT',
                          },
                          name: ['Common Core Code X Course II'],
                          'application.id': ['CDX_CII'],
                          students: [
                            {
                              total: ['0'],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      });

      wrapper = shallow(
        <UsageSummaryContainer
          usageSummary={mockUsageSummaryContainer}
          usageSummaryRequest={mockUsageSummaryRequest}
          loginData={mockedLoginDataState}
          smartBarSelections={mockedSmartBarSelections}
        />
      );
    });
    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Expect to call load function on mount', () => {
      expect(mockUsageSummaryRequest).toHaveBeenCalled();
    });
  });

  describe('props.user_type is school admin, no selection from smartbar with teacher name', () => {
    beforeEach(() => {
      mockedLoginDataState = fromJS({
        user_type: [USER_TYPE.Administrator],
        user_org: [USER_ORG.School],
      });
      mockedSmartBarSelections = fromJS({});
      mockUsageSummaryContainer = fromJS({
        usageSummary: {
          applications: tempApplications,
          classes: [
            {
              class: [
                {
                  teachers: [
                    {
                      teacher: [
                        {
                          name: [
                            {
                              'given.name': ['steve'],
                              'family.name': ['jobs'],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  applications: [
                    {
                      application: [
                        {
                          $: {
                            type: 'SUBPRODUCT',
                          },
                          name: ['Common Core Code X Course I'],
                          'application.id': ['CDX_CI'],
                          students: [
                            {
                              total: ['0'],
                            },
                          ],
                        },
                        {
                          $: {
                            type: 'SUBPRODUCT',
                          },
                          name: ['Common Core Code X Course II'],
                          'application.id': ['CDX_CII'],
                          students: [
                            {
                              total: ['0'],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      });

      wrapper = shallow(
        <UsageSummaryContainer
          usageSummary={mockUsageSummaryContainer}
          usageSummaryRequest={mockUsageSummaryRequest}
          loginData={mockedLoginDataState}
          smartBarSelections={mockedSmartBarSelections}
        />
      );
    });
    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Expect to call load function on mount', () => {
      expect(mockUsageSummaryRequest).toHaveBeenCalled();
    });
  });

  describe('props.user_type is administrator, gradeOd selected from smartbar', () => {
    beforeEach(() => {
      mockedLoginDataState = fromJS({
        user_type: [USER_TYPE.Administrator],
        user_org: [USER_ORG.District],
      });
      mockedSmartBarSelections = fromJS({ selectedCohType: 'Grade' });
      mockUsageSummaryContainer = fromJS({
        usageSummary: {
          applications: tempApplications,
          classes: [
            {
              class: [
                {
                  applications: [
                    {
                      application: [
                        {
                          name: ['Common Core Code X Course I'],
                          'application.id': ['Rap'],
                          students: [
                            {
                              total: ['0'],
                            },
                          ],
                        },
                        {
                          name: ['Common Core Code X Course III'],
                          'application.id': ['Pop'],
                          students: [
                            {
                              total: ['0'],
                            },
                          ],
                        },
                        {
                          $: {
                            type: 'SUBPRODUCT',
                          },
                          name: ['Common Core Code X Course II'],
                          'application.id': ['Rock'],

                          students: [
                            {
                              total: ['0'],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      });

      wrapper = shallow(
        <UsageSummaryContainer
          usageSummary={mockUsageSummaryContainer}
          usageSummaryRequest={mockUsageSummaryRequest}
          loginData={mockedLoginDataState}
          smartBarSelections={mockedSmartBarSelections}
        />
      );
    });
    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Expect to call load function on mount', () => {
      expect(mockUsageSummaryRequest).toHaveBeenCalled();
    });
  });

  describe('props.user_type is administrator, schoolId selected from smartbar', () => {
    beforeEach(() => {
      mockedLoginDataState = fromJS({
        user_type: [USER_TYPE.Administrator],
        user_org: [USER_ORG.District],
      });
      mockedSmartBarSelections = fromJS({ selectedCohType: 'School' });
      mockUsageSummaryContainer = fromJS({
        usageSummary: {
          applications: tempApplications,
          classes: [
            {
              class: [
                {
                  teachers: [
                    {
                      teacher: [
                        {
                          name: [
                            {
                              // 'given.name': ['steve'],
                              // 'family.name': ['jobs'],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  applications: [
                    {
                      application: [
                        {
                          $: {
                            type: 'SUBPRODUCT',
                          },
                          name: ['Common Core Code X Course I'],
                          'application.id': ['CDX_CI'],
                          students: [
                            {
                              total: ['0'],
                            },
                          ],
                        },
                        {
                          $: {
                            type: 'SUBPRODUCT',
                          },
                          name: ['Common Core Code X Course II'],
                          'application.id': ['CDX_CII'],
                          students: [
                            {
                              total: ['0'],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      });

      wrapper = shallow(
        <UsageSummaryContainer
          usageSummary={mockUsageSummaryContainer}
          usageSummaryRequest={mockUsageSummaryRequest}
          loginData={mockedLoginDataState}
          smartBarSelections={mockedSmartBarSelections}
        />
      );
    });
    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Expect to call load function on mount', () => {
      expect(mockUsageSummaryRequest).toHaveBeenCalled();
    });

    it('should handle onGridHeaderClick', () => {
      let mockRowClick = 0;
      let mockColumnClick = 0;

      const mockTableData = [
        { School: 'TestSchoolA', CourseA: 0, CourseB: 0 },
        { School: 'TestSchoolB', CourseA: 0, CourseB: 0 },
      ];

      const sortKey = 'School';
      const setStateSpy = jest.fn();

      wrapper.instance().setState = setStateSpy;

      wrapper.instance().onGridHeaderClick(mockTableData, mockRowClick, mockColumnClick, sortKey);

      expect(setStateSpy).toMatchSnapshot();
      wrapper.setState({ sortDescending: false });
      wrapper.instance().onGridHeaderClick(mockTableData, mockRowClick, mockColumnClick, sortKey);

      expect(setStateSpy).toMatchSnapshot();

      mockRowClick = 1;
      mockColumnClick = 1;
      expect(setStateSpy).toMatchSnapshot();
    });
  });

  describe('Component functions', () => {
    beforeEach(() => {
      mockedLoginDataState = fromJS({
        user_type: [USER_TYPE.Administrator],
        user_org: [USER_ORG.District],
      });
      mockedSmartBarSelections = fromJS({ selectedCohType: 'School' });
      mockUsageSummaryContainer = fromJS({
        usageSummary: {
          applications: tempApplications,
          classes: [
            {
              class: [
                {
                  name: ['r180uc'],
                  teachers: [
                    {
                      teacher: [
                        {
                          name: [
                            {
                              // 'given.name': ['steve'],
                              // 'family.name': ['jobs'],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  applications: [
                    {
                      application: [
                        {
                          $: {
                            type: 'SUBPRODUCT',
                          },
                          name: ['Common Core Code X Course I'],
                          'application.id': ['CDX_CI'],
                          students: [
                            {
                              total: ['0'],
                            },
                          ],
                        },
                        {
                          $: {
                            type: 'SUBPRODUCT',
                          },
                          name: ['Common Core Code X Course II'],
                          'application.id': ['CDX_CII'],
                          students: [
                            {
                              total: ['0'],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      });

      wrapper = shallow(
        <UsageSummaryContainer
          usageSummary={mockUsageSummaryContainer}
          usageSummaryRequest={mockUsageSummaryRequest}
          loginData={mockedLoginDataState}
          smartBarSelections={mockedSmartBarSelections}
        />
      );
    });

    it('should set state to default when cohort type changes', () => {
      const setStateSpy = jest.fn();
      wrapper.instance().setState = setStateSpy;

      const mockNextProps = {
        smartBarSelections: fromJS({ selectedCohType: 'Teacher' }),
      };

      wrapper.instance().componentWillReceiveProps(mockNextProps);
      expect(setStateSpy).toMatchSnapshot();
    });

    it('createColumnData', () => {
      const mockHeaders = [
        ['Common Core Code X Course I'],
        ['Common Core Code X Course II'],
        ['Common Core Code X Course III'],
      ];

      const mockRowKeys = [['TestSchool1'], ['TestSchool2'], ['TestSchool3']];

      const mockRowData = {
        TestSchool1: ['0', '0', '0'],
        TestSchool2: ['0', '0', '0'],
        TestSchool3: ['0', '0', '0'],
      };
      expect(
        wrapper.instance().createColumnData(mockHeaders, mockRowKeys, mockRowData)
      ).toMatchSnapshot();
    });

    it('should handle onGridHeaderClick', () => {
      let mockRowClick = 0;
      let mockColumnClick = 0;

      const mockTableData = [
        { School: 'TestSchoolA', CourseA: 0, CourseB: 0 },
        { School: 'TestSchoolB', CourseA: 0, CourseB: 0 },
      ];

      const sortKey = 'School';
      const setStateSpy = jest.fn();

      wrapper.instance().setState = setStateSpy;

      wrapper.instance().onGridHeaderClick(mockTableData, mockRowClick, mockColumnClick, sortKey);

      expect(setStateSpy).toMatchSnapshot();
      wrapper.setState({ sortDescending: false });
      wrapper.instance().onGridHeaderClick(mockTableData, mockRowClick, mockColumnClick, sortKey);

      expect(setStateSpy).toMatchSnapshot();

      mockRowClick = 1;
      mockColumnClick = 1;
      expect(setStateSpy).toMatchSnapshot();
    });
  });

  describe('props.user_type is administrator, schoolId selected from smartbar teacher name passed', () => {
    beforeEach(() => {
      mockedLoginDataState = fromJS({
        user_type: [USER_TYPE.Administrator],
        user_org: [USER_ORG.District],
      });
      mockedSmartBarSelections = fromJS({ selectedCohType: 'School' });
      mockUsageSummaryContainer = fromJS({
        usageSummary: {
          applications: tempApplications,
          classes: [
            {
              class: [
                {
                  teachers: [
                    {
                      teacher: [
                        {
                          name: [
                            {
                              'given.name': ['steve'],
                              'family.name': ['jobs'],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  applications: [
                    {
                      application: [
                        {
                          $: {
                            type: 'SUBPRODUCT',
                          },
                          name: ['Common Core Code X Course I'],
                          'application.id': ['CDX_CI'],
                          students: [
                            {
                              total: ['0'],
                            },
                          ],
                        },
                        {
                          $: {
                            type: 'SUBPRODUCT',
                          },
                          name: ['Common Core Code X Course II'],
                          'application.id': ['CDX_CII'],
                          students: [
                            {
                              total: ['0'],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      });

      wrapper = shallow(
        <UsageSummaryContainer
          usageSummary={mockUsageSummaryContainer}
          usageSummaryRequest={mockUsageSummaryRequest}
          loginData={mockedLoginDataState}
          smartBarSelections={mockedSmartBarSelections}
        />
      );
    });
    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Expect to call load function on mount', () => {
      expect(mockUsageSummaryRequest).toHaveBeenCalled();
    });
  });

  describe('props.user_type is administrator, schoolId selected from smartbar, no classes', () => {
    beforeEach(() => {
      mockedLoginDataState = fromJS({
        user_type: [USER_TYPE.Administrator],
        user_org: [USER_ORG.District],
      });
      mockedSmartBarSelections = fromJS({ selectedCohType: 'School' });
      mockUsageSummaryContainer = fromJS({
        usageSummary: {
          applications: tempApplications,
          classes: [
            {
              class: [],
            },
          ],
        },
      });

      wrapper = shallow(
        <UsageSummaryContainer
          usageSummary={mockUsageSummaryContainer}
          usageSummaryRequest={mockUsageSummaryRequest}
          loginData={mockedLoginDataState}
          smartBarSelections={mockedSmartBarSelections}
        />
      );
    });
    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Expect to call load function on mount', () => {
      expect(mockUsageSummaryRequest).toHaveBeenCalled();
    });
  });

  describe('props.user_type is teacher', () => {
    beforeEach(() => {
      mockedLoginDataState = fromJS({ user_type: [USER_TYPE.Teacher] });
      mockedSmartBarSelections = fromJS({});
      mockUsageSummaryContainer = fromJS({
        usageSummary: {
          applications: tempApplications,
          classes: [
            {
              class: [
                {
                  applications: [
                    {
                      application: [
                        {
                          name: ['Common Core Code X Course I'],
                          'application.id': ['CDX_CI'],
                          students: [
                            {
                              total: ['0'],
                            },
                          ],
                        },
                        {
                          name: ['Common Core Code X Course II'],
                          'application.id': ['CDX_CII'],
                          students: [
                            {
                              total: ['0'],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      });

      wrapper = shallow(
        <UsageSummaryContainer
          usageSummary={mockUsageSummaryContainer}
          usageSummaryRequest={mockUsageSummaryRequest}
          loginData={mockedLoginDataState}
          smartBarSelections={mockedSmartBarSelections}
        />
      );
    });
    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Expect to call load function on mount', () => {
      expect(mockUsageSummaryRequest).toHaveBeenCalled();
    });
  });

  describe('props.user_type is Administrator', () => {
    beforeEach(() => {
      mockedLoginDataState = fromJS({
        user_type: [USER_TYPE.Administrator],
        user_org: [USER_ORG.District],
      });
      mockedSmartBarSelections = fromJS({});
      mockUsageSummaryContainer = fromJS({
        usageSummary: {
          applications: tempApplications,
          schools: [
            {
              school: [
                {
                  school_name: ['School 1'],
                  applications: [
                    {
                      application: [
                        {
                          app_name: ['Common Core Code X Course I'],
                          seats: [
                            {
                              _: '0',
                              $: {
                                type: 'used',
                              },
                            },
                          ],
                        },
                        {
                          app_name: ['Common Core Code X Course II'],
                          seats: [
                            {
                              _: '0',
                              $: {
                                type: 'used',
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  school_name: ['School 2'],
                  applications: [
                    {
                      application: [
                        {
                          app_name: ['Common Core Code X Course I'],
                          seats: [
                            {
                              _: '0',
                              $: {
                                type: 'used',
                              },
                            },
                          ],
                        },
                        {
                          app_name: ['Common Core Code X Course II'],
                          seats: [
                            {
                              _: '0',
                              $: {
                                type: 'used',
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      });

      wrapper = shallow(
        <UsageSummaryContainer
          usageSummary={mockUsageSummaryContainer}
          usageSummaryRequest={mockUsageSummaryRequest}
          loginData={mockedLoginDataState}
          smartBarSelections={mockedSmartBarSelections}
        />
      );
    });
    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Expect to call load function on mount', () => {
      expect(mockUsageSummaryRequest).toHaveBeenCalled();
    });
  });

  describe('shouldComponentUpdate', () => {
    it('to verify the component will receive props', () => {
      mockedLoginDataState = fromJS({ user_type: [USER_TYPE.Teacher] });
      mockedSmartBarSelections = fromJS({});
      mockUsageSummaryContainer = fromJS({
        usageSummary: [],
      });
      const mockNextUsageSummaryContainer = fromJS({
        usageSummary: {
          applications: tempApplications,
          classes: [
            {
              class: [
                {
                  applications: [
                    {
                      application: [
                        {
                          name: ['Common Core Code X Course I'],
                          'application.id': ['CDX_CI'],
                          students: [
                            {
                              total: ['0'],
                            },
                          ],
                        },
                        {
                          name: ['Common Core Code X Course II'],
                          'application.id': ['CDX_CII'],
                          students: [
                            {
                              total: ['0'],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      });
      wrapper = shallow(
        <UsageSummaryContainer
          usageSummary={mockNextUsageSummaryContainer}
          usageSummaryRequest={mockUsageSummaryRequest}
          loginData={mockedLoginDataState}
          smartBarSelections={mockedSmartBarSelections}
        />
      );
      wrapper.setProps({ usageSummary: mockNextUsageSummaryContainer });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
