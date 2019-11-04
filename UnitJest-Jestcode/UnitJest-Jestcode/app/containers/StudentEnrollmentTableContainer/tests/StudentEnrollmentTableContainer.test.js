import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
// import { shallowToJson } from 'enzyme-to-json';
import { StudentEnrollmentTableContainer } from '../StudentEnrollmentTableContainer';

describe('<StudentEnrollmentTableContainer />', () => {
  let wrapper;
  let props;
  let nextProps;
  let state;
  beforeEach(() => {
    props = {
      isDataLoading: true,
      smartBarSelections: fromJS({}),
      studentEnrollRequest: jest.fn(),
      isolateTab: false,
      handleTabIsolate: jest.fn(),
      studentEnrollSaveRequest: jest.fn(),
      studentAppsUsageRequest: jest.fn(),
      studentGetListRequest: jest.fn(),
      studentViewEnrollSaveRequest: jest.fn(),
      handleTabReset: jest.fn(),
      studentEnrollInfo: fromJS({
        error: false,
        itemCount: '0',
        loading: false,
        loadingApps: false,
        loadingStudents: false,
        paginationData: {},
        studentAppsUsage: {
          applications: [
            {
              application: [
                {
                  app_id: ['12345'],
                },
              ],
            },
          ],
        },
        studentEnroll: [
          {
            student_first_name: ['foo'],
            student_last_name: ['bar'],
            student_id: ['user-id-123'],
          },
        ],
      }),
    };
    nextProps = {};
    state = {
      studentIDs: ['header', 'student-id-001'],
      gridFooters: [0, 100],
      gridHeaderIDs: ['header-1', 'header-2'],
      gridData: fromJS([
        [
          'Students',
          'Common Core Code X Course I',
          'Common Core Code X Course II',
          'Common Core Code X Course III',
        ],
        ['1, Editorial', true, true, true],
      ]),
      headers: [{ label: 'col one', checked: true }, { label: 'col two', checked: false }],
    };
  });

  describe('render', () => {
    it('Expect to render correctly', () => {
      // returns nothing with no data
      wrapper = shallow(<StudentEnrollmentTableContainer {...props} />);
      expect(wrapper).toMatchSnapshot();

      wrapper.setProps(nextProps);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('saving', () => {
    it('Expect to save correctly', () => {
      wrapper = shallow(<StudentEnrollmentTableContainer {...props} />);
      wrapper.instance().setState(state);
      wrapper.instance().handleStudentEnrollSave();
      expect(props.studentEnrollSaveRequest).toHaveBeenCalled();
    });
    it('Expect to cancel correctly', () => {
      wrapper = shallow(<StudentEnrollmentTableContainer {...props} />);
      wrapper.instance().handleCancel();
      expect(props.studentEnrollRequest).toHaveBeenCalled();
      expect(props.handleTabReset).toHaveBeenCalled();
    });
    it('Expect to get grid header data correctly', () => {
      wrapper = shallow(<StudentEnrollmentTableContainer {...props} />);
      wrapper.instance().setState(state);
      const headers = wrapper.instance().getGridHeaders([{ name: ['my app'] }]);
      expect(headers).toEqual(['Students', 'my app']);
    });
    it('Expect to get student id data correctly', () => {
      wrapper = shallow(<StudentEnrollmentTableContainer {...props} />);
      expect(wrapper.instance().setState(state));
      expect(wrapper.instance().getStudentIds(props)).toEqual(['user-id-123']);
    });
    it('Expect to get sorted app data correctly', () => {
      wrapper = shallow(<StudentEnrollmentTableContainer {...props} />);
      wrapper.instance().setState(state);
      expect(wrapper.instance().getSortedApps(props)).toEqual([]);
    });
    it('Expect to toggle correctly for data item', () => {
      wrapper = shallow(<StudentEnrollmentTableContainer {...props} />);
      expect(wrapper.instance().setState(state));

      wrapper.instance().handleToggle({
        target: {
          checked: true,
          dataset: {
            header: false,
            row: 0,
            column: 0,
          },
        },
      });
      expect(props.handleTabIsolate).toHaveBeenCalled();
    });
  });
});
