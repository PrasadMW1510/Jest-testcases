import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { shallowToJson } from 'enzyme-to-json';

import { AddGroupContainer } from '../AddGroupContainer';

describe('<AddGroupContainer />', () => {
  let wrapper = null;
  let mockClassWithStudents = null;
  let mockGetClassesWithStudentInfo = null;
  let mockHideModal = null;
  let mockPostGroup = null;
  let mockGroupPostFailure = null;
  let mockResetGroupStatus = null;
  let mockData = null;
  let mockGetGroupInfo = null;
  let mockGroupInfo = null;

  beforeEach(() => {
    mockClassWithStudents = fromJS({
      test: 'value',
    });
    mockGetClassesWithStudentInfo = jest.fn();
    mockHideModal = jest.fn();
    mockPostGroup = jest.fn();
    mockGroupPostFailure = { name: 'test' };
    mockResetGroupStatus = jest.fn();
    mockData = {
      edit: true,
    };
    mockGetGroupInfo = jest.fn();
    mockGroupInfo = fromJS({ name: 'test' });

    wrapper = shallow(
      <AddGroupContainer
        classesWithStudents={mockClassWithStudents}
        getClassesWithStudentInfo={mockGetClassesWithStudentInfo}
        hideModal={mockHideModal}
        postGroup={mockPostGroup}
        groupPostFailure={mockGroupPostFailure}
        resetGroupStatus={mockResetGroupStatus}
        data={mockData}
        getGroupInfo={mockGetGroupInfo}
        groupInfo={mockGroupInfo}
      />
    );
  });

  it('verify to match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('verify with data is false', () => {
    mockData = {
      edit: false,
    };
    wrapper = shallow(
      <AddGroupContainer
        classesWithStudents={mockClassWithStudents}
        getClassesWithStudentInfo={mockGetClassesWithStudentInfo}
        hideModal={mockHideModal}
        postGroup={mockPostGroup}
        groupPostFailure={mockGroupPostFailure}
        resetGroupStatus={mockResetGroupStatus}
        data={mockData}
        getGroupInfo={mockGetGroupInfo}
        groupInfo={mockGroupInfo}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
