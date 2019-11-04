import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
// import { shallowToJson } from 'enzyme-to-json';
import { TeacherAccessTableContainer } from '../TeacherAccessTableContainer';

describe('<TeacherAccessTableContainer />', () => {
  let wrapper;
  let props;
  let nextProps;
  let state;
  beforeEach(() => {
    props = {
      isDataLoading: true,
      initiateLoader: jest.fn(),
      terminateLoader: jest.fn(),
      handleTabState: jest.fn(),
      handleTabIsolate: jest.fn(),
      handleTabReset: jest.fn(),
      teacherAppsUsageRequest: jest.fn(),
      isolateTab: false,
      teacherEnrollRequest: jest.fn(),
      teacherAccessSaveRequest: jest.fn(),
      teacherAccessInfo: fromJS({
        error: false,
        itemCount: '0',
        loading: false,
        loadingApps: false,
        loadingTeachers: false,
        paginationData: {},
        teacherAppsUsage: {
          application: [],
        },
        teacherEnroll: [
          {
            name: [
              {
                first_name: ['foo'],
                last_name: ['bar'],
                user_id: ['user-id-123'],
              },
            ],
          },
        ],
      }),
    };
    nextProps = {};
    state = {
      teacherIDs: ['header', 'teacher-id-001'],
      gridFooters: [0, 100],
      gridHeaderIDs: ['header-1', 'header-2'],
      gridData: fromJS([
        [
          'Teachers',
          'Common Core Code X Course I Teacher',
          'Common Core Code X Course II Teacher',
          'Common Core Code X Course III Teacher',
        ],
        ['1, Editorial', true, true, true],
      ]),
      headers: [{ label: 'col one', checked: true }, { label: 'col two', checked: false }],
    };
  });

  describe('render', () => {
    it('Expect to render correctly', () => {
      // returns nothing with no data
      wrapper = shallow(<TeacherAccessTableContainer {...props} />);
      expect(wrapper).toMatchSnapshot();

      wrapper.setProps(nextProps);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('saving', () => {
    it('Expect to save correctly', () => {
      wrapper = shallow(<TeacherAccessTableContainer {...props} />);
      wrapper.instance().setState(state);
      wrapper.instance().handleTeacherAccessSave();
      expect(props.teacherAccessSaveRequest).toHaveBeenCalled();
    });
    it('Expect to cancel correctly', () => {
      wrapper = shallow(<TeacherAccessTableContainer {...props} />);
      wrapper.instance().handleCancel();
      expect(props.teacherEnrollRequest).toHaveBeenCalled();
      expect(props.handleTabReset).toHaveBeenCalled();
    });
    it('Expect to get grid header data correctly', () => {
      wrapper = shallow(<TeacherAccessTableContainer {...props} />);
      wrapper.instance().setState(state);
      const headers = wrapper.instance().getGridHeaders([{ name: ['my app'] }]);
      expect(headers).toEqual(['Teachers', 'my app']);
    });
    it('Expect to get teacher data correctly', () => {
      wrapper = shallow(<TeacherAccessTableContainer {...props} />);
      wrapper.instance().setState(state);
      expect(
        wrapper
          .instance()
          .getTeacherData(props, [{ name: ['my app'], application_id: ['app-id-123'] }])
      ).toEqual([['bar, foo', false]]);
    });
    it('Expect to get teacher id data correctly', () => {
      wrapper = shallow(<TeacherAccessTableContainer {...props} />);
      expect(wrapper.instance().setState(state));
      expect(wrapper.instance().getTeacherIds(props)).toEqual(['user-id-123']);
    });
    it('Expect to get sorted app data correctly', () => {
      wrapper = shallow(<TeacherAccessTableContainer {...props} />);
      wrapper.instance().setState(state);
      expect(wrapper.instance().getSortedApps(props)).toEqual([]);
    });
    it('Expect to toggle correctly for data item', () => {
      wrapper = shallow(<TeacherAccessTableContainer {...props} />);
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
    it('Expect to toggle correctly for header item', () => {
      wrapper = shallow(<TeacherAccessTableContainer {...props} />);
      wrapper.instance().setState(state);
      const total = wrapper.instance().handleToggle({
        target: {
          checked: false,
          dataset: {
            header: 'true',
            row: '0',
            column: '1',
          },
        },
      });
      expect(total).toBe(undefined);
      expect(props.handleTabIsolate).toHaveBeenCalled();
    });
  });
});
