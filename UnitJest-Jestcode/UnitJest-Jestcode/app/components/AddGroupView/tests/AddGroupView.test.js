import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';

import AddGroupView from '../index';

describe('<AddGroupView />', () => {
  let wrapper = null;
  let mockClassesWithStudents = null;
  let mockHideModal = null;
  let mockPostGroup = null;
  let mockGroupFailure = null;
  let mockResetGroupStatus = null;
  let mockTitle = null;
  let mockGroupInfo = null;

  beforeEach(() => {
    mockClassesWithStudents = fromJS([
      {
        class_id: ['94849830'],
        display_name: ['test1'],
        students: [
          {
            user: ['8493839', '9303030'],
          },
        ],
      },
      {
        class_id: ['94849831'],
        display_name: ['test2'],
        students: [
          {
            user: ['9403930', '7493830'],
          },
        ],
      },
    ]);
    mockHideModal = jest.fn();
    mockPostGroup = jest.fn();
    mockGroupFailure = fromJS({
      name: 'test',
    });
    mockResetGroupStatus = jest.fn();
    mockTitle = 'Add a Group';
    mockGroupInfo = fromJS({
      group_id: ['7434739'],
      name: ['name'],
      users: [
        {
          user: [
            {
              user_id: ['323'],
            },
          ],
        },
      ],
    });

    wrapper = shallow(
      <AddGroupView
        classesWithStudents={mockClassesWithStudents}
        hideModal={mockHideModal}
        postGroup={mockPostGroup}
        groupPostFailure={mockGroupFailure}
        resetGroupStatus={mockResetGroupStatus}
        title={mockTitle}
        groupInfo={mockGroupInfo}
      />
    );
  });

  it('verify if renders itself', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('handle cancel', () => {
    wrapper.instance().handleCancel();
    expect(mockHideModal).toHaveBeenCalled();
  });

  it('handle save when name is empty', () => {
    wrapper.setState({ name: '' });
    wrapper.instance().handleSave();
    expect(wrapper.state('isSubmitFailure')).toBeTruthy();
  });

  it('handle save when name is not empty with classId selected value', () => {
    wrapper.setState({ name: 'test', classIdSelected: '94849830' });
    wrapper.instance().handleSave();
    expect(mockPostGroup).toHaveBeenCalled();
  });

  it('handle save when name is not empty with classId selected value is null', () => {
    wrapper.setState({ name: 'test', classIdSelected: null });
    wrapper.instance().handleSave();
    expect(mockPostGroup).toHaveBeenCalled();
  });

  it('update student event when classIdSelected in empty', () => {
    const event = {
      preventDefault: jest.fn(),
      target: { value: '94849831' },
    };
    wrapper.instance().updateStudent(event);
    expect(wrapper.state('isSelectAll')).toBeFalsy();
    expect(wrapper.state('classIdSelected')).toEqual('94849831');
  });

  it('verify list of students', () => {
    expect(wrapper.instance().listOfStudentTeacherView('94849831')).toHaveLength(2);
  });

  it('toggleAllCheckboxes', () => {
    const checkboxes = ['9403930', '7493830'];

    wrapper.instance().toggleAllCheckboxes(true, ['9403930', '7493830']);
    expect(wrapper.state('addGroupByIdCheckbox')).toEqual(checkboxes);
  });

  it('isChecked is true', () => {
    wrapper.instance().handleRowCheckboxOnChange(true, '9403930');
    expect(wrapper.state('addGroupByIdCheckbox')).toEqual(['9403930']);
  });

  it('isChecked is false', () => {
    wrapper.setState({ addGroupByIdCheckbox: ['9403930'], isSelectAll: true });
    wrapper.instance().handleRowCheckboxOnChange(false, '9403930');
    expect(wrapper.state('addGroupByIdCheckbox')).toEqual([]);
  });

  it('verify empty array is returned for listOfStudent', () => {
    mockClassesWithStudents = fromJS([
      {
        class_id: ['94849831'],
        display_name: ['test2'],
        students: [{}],
      },
    ]);
    wrapper.setProps({ classesWithStudents: mockClassesWithStudents });
    wrapper.setState({ classIdSelected: '94849831' });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('verify when the info is from class data', () => {
    mockClassesWithStudents = fromJS({
      display_name: ['sam port'],
      students: [
        {
          user: ['8494', '34343'],
        },
      ],
    });
    wrapper.setProps({ classesWithStudents: mockClassesWithStudents });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('verify when the info is from class data', () => {
    mockClassesWithStudents = fromJS({
      display_name: ['sam port'],
      students: [{}],
    });
    wrapper.setProps({ classesWithStudents: mockClassesWithStudents });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('verify input box', () => {
    const event = { preventDefault: jest.fn(), target: { value: 'test' } };
    wrapper.instance().handleInputBox(event);
    expect(wrapper.state('name')).toEqual('test');
  });

  it('verify list of student view', () => {
    mockClassesWithStudents = fromJS({
      display_name: ['sam port'],
      students: [
        {
          user: ['8494', '34343'],
        },
      ],
    });
    wrapper.setProps({ classesWithStudents: mockClassesWithStudents });
    const student = wrapper.instance().listOfStudentView();
    expect(student).toEqual(mockClassesWithStudents.getIn(['students', 0, 'user']).toJS());
  });

  it('verify with no error message', () => {
    mockGroupFailure = fromJS({ test: 'test' });
    wrapper.setProps({ groupPostFailure: mockGroupFailure });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('verify the component will get edit data', () => {
    mockGroupInfo = fromJS({
      group_id: ['7434739'],
      name: ['name'],
      users: [
        {
          user: [
            {
              user_id: ['323'],
            },
          ],
        },
        {
          user: [
            {
              user_id: ['123'],
            },
          ],
        },
      ],
    });
    wrapper.setProps({ groupInfo: mockGroupInfo });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('verify the component will props with no data for users', () => {
    mockGroupInfo = fromJS({
      group_id: ['7434739'],
      name: ['name'],
      users: [''],
    });
    wrapper.setProps({ groupInfo: mockGroupInfo });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('verify the eidt save option', () => {
    mockGroupInfo = fromJS({
      group_id: ['7434739'],
      name: ['name'],
      users: [
        {
          user: [
            {
              user_id: ['323'],
            },
          ],
        },
        {
          user: [
            {
              user_id: ['123'],
            },
          ],
        },
      ],
    });
    mockTitle = 'Edit Group Profile';
    wrapper.setProps({ groupInfo: mockGroupInfo, title: mockTitle });
    wrapper.instance().handleSave();
    expect(mockPostGroup).toHaveBeenCalled();
  });

  it('verify when no name', () => {
    mockGroupInfo = fromJS({
      group_id: ['7434739'],
      users: [''],
    });
    wrapper.setProps({ groupInfo: mockGroupInfo });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('verify update group on change', () => {
    const event = {
      preventDefault: jest.fn(),
      target: { value: 'abc' },
    };
    mockGroupInfo = fromJS({
      owner_id: ['abc'],
      users: [''],
    });
    wrapper.setProps({ groupInfo: mockGroupInfo });
    wrapper.instance().updateGroupOnChange(event);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('verify update group on change when user exist', () => {
    const event = {
      preventDefault: jest.fn(),
      target: { value: 'abc' },
    };
    mockGroupInfo = fromJS({
      owner_id: ['abc'],
      users: [{ user: [{ user_id: ['232'] }, { user_id: ['123'] }] }],
    });
    wrapper.setProps({ groupInfo: mockGroupInfo });
    wrapper.instance().updateGroupOnChange(event);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('verify update group on change when there is not owner id', () => {
    const event = {
      preventDefault: jest.fn(),
      target: { value: 'abc' },
    };
    mockGroupInfo = fromJS({
      owner_id: ['2323'],
      users: [{ user: [{ user_id: ['232'] }, { user_id: ['123'] }] }],
    });
    wrapper.setProps({ groupInfo: mockGroupInfo });
    wrapper.instance().updateGroupOnChange(event);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('verify with class with student size is empty', () => {
    mockGroupInfo = fromJS({ display_name: ['2323'] });
    mockClassesWithStudents = fromJS([]);
    wrapper.setProps({ classWithStudents: mockClassesWithStudents, groupInfo: mockGroupInfo });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
