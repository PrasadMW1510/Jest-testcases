import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import SmartBarTab from 'components/SmartBarTab';
import { COHORT_TYPE } from 'containers/App/constants';
import { GroupsSmartTab } from '../GroupsSmartTab';

describe('<GroupsSmartTab />', () => {
  let wrapper = null;
  let mockedGlobalState = null;
  let mockedGroupSelection = null;
  let mockedLoginState = null;
  let mockedSelections = null;
  let mockActiveSelectedSchool = null;
  let mockActiveSelectedGrade = null;
  let mockActiveSelectedTeacher = null;
  let mockActiveSelectedClass = null;
  let mockActiveSelectedGroup = null;
  let mockActiveSelectedStudent = null;
  let mockClickedSchoolId = null;
  let mockClickedGradeId = null;
  let mockClickedTeacherId = null;
  let mockClickedClassId = null;
  let mockSmartBarSelectedGroupId = null;
  let mockSmartbarSelectedUpdateData = null;
  let mockGroupStatus = null;

  beforeEach(() => {
    mockedGlobalState = fromJS([
      { display_name: ['class1'], group_id: ['group1'] },
      { display_name: ['class2'], group_id: ['group2'] },
      { display_name: ['class3'], group_id: ['group3'] },
    ]);
    mockedGroupSelection = jest.fn();
    mockedLoginState = fromJS({
      user_org: [COHORT_TYPE.District],
      first_name: ['John'],
      last_name: ['Smith'],
    });
    mockedSelections = 'asdfaza';
    mockActiveSelectedSchool = jest.fn();
    mockActiveSelectedGrade = jest.fn();
    mockActiveSelectedTeacher = jest.fn();
    mockActiveSelectedClass = jest.fn();
    mockActiveSelectedGroup = jest.fn();
    mockActiveSelectedStudent = jest.fn();
    mockSmartbarSelectedUpdateData = jest.fn();
    mockClickedSchoolId = 'randomSchool';
    mockClickedGradeId = 'randomGrade';
    mockClickedTeacherId = 'randomTeacher';
    mockClickedClassId = 'randomClass';
    mockSmartBarSelectedGroupId = '';
    mockGroupStatus = true;

    wrapper = shallow(
      <GroupsSmartTab
        selectedGroupId={mockedSelections}
        groupData={mockedGlobalState}
        groupSelection={mockedGroupSelection}
        login={mockedLoginState}
        activeSelectedSchool={mockActiveSelectedSchool}
        activeSelectedGrade={mockActiveSelectedGrade}
        activeSelectedTeacher={mockActiveSelectedTeacher}
        activeSelectedClass={mockActiveSelectedClass}
        activeSelectedGroup={mockActiveSelectedGroup}
        activeSelectedStudent={mockActiveSelectedStudent}
        clickedSchoolId={mockClickedSchoolId}
        clickedGradeId={mockClickedGradeId}
        clickedTeacherId={mockClickedTeacherId}
        clickedClassId={mockClickedClassId}
        smartBarSelectedGroupId={mockSmartBarSelectedGroupId}
        smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
        groupStatus={mockGroupStatus}
      />
    );
  });

  it('Expect to have a SmartBarTab', () => {
    expect(wrapper.find(SmartBarTab).exists()).toBeTruthy();
  });

  it('verify is the value is equal', () => {
    wrapper.setProps({ smartBarSelectedGroupId: 'asdfaza', selectedCohortType: 'Group' });
    expect(mockActiveSelectedGroup).toHaveBeenCalled();
  });

  it('verify when the selectedId is empty', () => {
    wrapper.setProps({ smartBarSelectedTeacherId: '' });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to handle no groups', () => {
    wrapper = shallow(
      <GroupsSmartTab
        selectedGroupId={mockedSelections}
        groupSelection={mockedGroupSelection}
        login={mockedLoginState}
        activeSelectedSchool={mockActiveSelectedSchool}
        activeSelectedGrade={mockActiveSelectedGrade}
        activeSelectedTeacher={mockActiveSelectedTeacher}
        activeSelectedClass={mockActiveSelectedClass}
        activeSelectedGroup={mockActiveSelectedGroup}
        activeSelectedStudent={mockActiveSelectedStudent}
        smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
        groupStatus={mockGroupStatus}
      />
    );
    expect(wrapper.find(SmartBarTab).prop('items')).toBeFalsy();
  });

  it('Expect to have a SmartBarTab with the title Classes', () => {
    expect(wrapper.find(SmartBarTab).prop('title')).toEqual('Groups');
  });

  it('Expect to pass mocked global state classes to the SmartBarTab', () => {
    expect(wrapper.find(SmartBarTab).prop('items').size).toEqual(mockedGlobalState.length);
  });

  it('Should pass dispatch to child element', () => {
    const smartBar = wrapper.find(SmartBarTab);
    smartBar.prop('onItemClick')();
    expect(mockedGroupSelection).toHaveBeenCalled();
  });

  describe('For name', () => {
    let mockedTeacherData = null;
    let mockedClassData = null;
    let mockedSchoolData = null;

    beforeEach(() => {
      mockedTeacherData = fromJS({
        first_name: ['Mary'],
        last_name: ['Smith'],
      });

      mockedClassData = fromJS({
        display_name: ['my class'],
      });

      mockedSchoolData = fromJS({
        name: ['School 1'],
      });
    });

    it('Should display the logged in user name if no other data is present', () => {
      expect(wrapper.find(SmartBarTab).prop('forName')).toMatchSnapshot();
    });

    it('Should display the selected class name if present', () => {
      wrapper = shallow(
        <GroupsSmartTab
          selectedClassData={mockedClassData}
          selectedGroupId={mockedSelections}
          groupData={mockedGlobalState}
          groupSelection={mockedGroupSelection}
          login={mockedLoginState}
          activeSelectedSchool={mockActiveSelectedSchool}
          activeSelectedGrade={mockActiveSelectedGrade}
          activeSelectedTeacher={mockActiveSelectedTeacher}
          activeSelectedClass={mockActiveSelectedClass}
          activeSelectedGroup={mockActiveSelectedGroup}
          activeSelectedStudent={mockActiveSelectedStudent}
          smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
          groupStatus={mockGroupStatus}
        />
      );
      expect(wrapper.find(SmartBarTab).prop('forName')).toMatchSnapshot();
    });

    it('Should display the selected teacher name if present', () => {
      wrapper = shallow(
        <GroupsSmartTab
          selectedTeacherData={mockedTeacherData}
          selectedGroupId={mockedSelections}
          groupData={mockedGlobalState}
          groupSelection={mockedGroupSelection}
          login={mockedLoginState}
          activeSelectedSchool={mockActiveSelectedSchool}
          activeSelectedGrade={mockActiveSelectedGrade}
          activeSelectedTeacher={mockActiveSelectedTeacher}
          activeSelectedClass={mockActiveSelectedClass}
          activeSelectedGroup={mockActiveSelectedGroup}
          activeSelectedStudent={mockActiveSelectedStudent}
          smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
          groupStatus={mockGroupStatus}
        />
      );
      expect(wrapper.find(SmartBarTab).prop('forName')).toMatchSnapshot();
    });

    it('Should display the selected school name if present', () => {
      wrapper = shallow(
        <GroupsSmartTab
          selectedSchoolData={mockedSchoolData}
          selectedGroupId={mockedSelections}
          groupData={mockedGlobalState}
          groupSelection={mockedGroupSelection}
          login={mockedLoginState}
          activeSelectedSchool={mockActiveSelectedSchool}
          activeSelectedGrade={mockActiveSelectedGrade}
          activeSelectedTeacher={mockActiveSelectedTeacher}
          activeSelectedClass={mockActiveSelectedClass}
          activeSelectedGroup={mockActiveSelectedGroup}
          activeSelectedStudent={mockActiveSelectedStudent}
          smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
          groupStatus={mockGroupStatus}
        />
      );
      expect(wrapper.find(SmartBarTab).prop('forName')).toMatchSnapshot();
    });
  });
});
