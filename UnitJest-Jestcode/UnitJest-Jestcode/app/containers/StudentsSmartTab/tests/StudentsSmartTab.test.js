import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import SmartBarTab from 'components/SmartBarTab';
import { COHORT_TYPE } from 'containers/App/constants';
import { StudentsSmartTab } from '../StudentsSmartTab';

describe('<StudentsSmartTab />', () => {
  let wrapper = null;
  let mockedGlobalState = null;
  let mockedLoginState = null;
  let mockedStudentSelection = null;
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
  let mockClickedGroupId = null;
  let mockSmartBarSelectedStudentId = null;
  let mockSmartbarSelectedUpdateData = null;
  let mockStudentStatus = null;

  beforeEach(() => {
    mockedGlobalState = fromJS([
      { last_name: 'last1', first_name: ['first1'], user_id: ['user1'] },
      { last_name: 'last2', first_name: ['first2'], user_id: ['user2'] },
    ]);
    mockedStudentSelection = jest.fn();
    mockedLoginState = fromJS({
      user_org: [COHORT_TYPE.District],
      first_name: ['Teacher'],
      last_name: ['User'],
    });
    mockedSelections = 'adsfazasd';
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
    mockClickedGroupId = 'randomGroup';
    mockSmartBarSelectedStudentId = '';
    mockStudentStatus = true;

    wrapper = shallow(
      <StudentsSmartTab
        selectedStudentId={mockedSelections}
        students={mockedGlobalState}
        studentSelection={mockedStudentSelection}
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
        clickedGroupId={mockClickedGroupId}
        smartBarSelectedStudentId={mockSmartBarSelectedStudentId}
        smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
        studentStatus={mockStudentStatus}
      />
    );
  });

  it('Expect to have a SmartBarTab', () => {
    expect(wrapper.find(SmartBarTab).exists()).toBeTruthy();
  });

  it('verify is the value is equal', () => {
    wrapper.setProps({ smartBarSelectedStudentId: 'adsfazasd', selectedCohortType: 'Student' });
    expect(mockActiveSelectedGroup).toHaveBeenCalled();
  });

  it('verify when the selectedId is empty', () => {
    wrapper.setProps({ smartBarSelectedStudentId: '' });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to have a SmartBarTab with the title Classes', () => {
    expect(wrapper.find(SmartBarTab).prop('title')).toEqual('Students');
  });

  it('Expect to pass mocked global state classes to the SmartBarTab', () => {
    expect(wrapper.find(SmartBarTab).prop('items').size).toEqual(mockedGlobalState.length);
  });

  it('Expect to handle no students', () => {
    wrapper = shallow(
      <StudentsSmartTab
        selectedStudentId={mockedSelections}
        studentSelection={mockedStudentSelection}
        login={mockedLoginState}
        activeSelectedSchool={mockActiveSelectedSchool}
        activeSelectedGrade={mockActiveSelectedGrade}
        activeSelectedTeacher={mockActiveSelectedTeacher}
        activeSelectedClass={mockActiveSelectedClass}
        activeSelectedGroup={mockActiveSelectedGroup}
        activeSelectedStudent={mockActiveSelectedStudent}
        smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
        studentStatus={mockStudentStatus}
      />
    );
    expect(wrapper.find(SmartBarTab).prop('items')).toBeFalsy();
  });

  it('Should pass dispatch to child element', () => {
    const smartBar = wrapper.find(SmartBarTab);
    smartBar.prop('onItemClick')();
    expect(mockedStudentSelection).toHaveBeenCalled();
  });

  describe('For name', () => {
    let mockedTeacherData = null;
    let mockedClassData = null;
    let mockedSchoolData = null;
    let mockedGroupData = null;
    let mockedGradeData = null;

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

      mockedGroupData = fromJS({
        display_name: ['my group'],
      });

      mockedGradeData = fromJS({
        full_name: ['my grade'],
      });
    });

    it('Should display the logged in user name if no other data is present', () => {
      expect(wrapper.find(SmartBarTab).prop('forName')).toMatchSnapshot();
    });

    it('Should display the selected class name if present', () => {
      wrapper = shallow(
        <StudentsSmartTab
          selectedClassData={mockedClassData}
          selectedStudentId={mockedSelections}
          students={mockedGlobalState}
          studentSelection={mockedStudentSelection}
          login={mockedLoginState}
          activeSelectedSchool={mockActiveSelectedSchool}
          activeSelectedGrade={mockActiveSelectedGrade}
          activeSelectedTeacher={mockActiveSelectedTeacher}
          activeSelectedClass={mockActiveSelectedClass}
          activeSelectedGroup={mockActiveSelectedGroup}
          activeSelectedStudent={mockActiveSelectedStudent}
          smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
          studentStatus={mockStudentStatus}
        />
      );
      expect(wrapper.find(SmartBarTab).prop('forName')).toMatchSnapshot();
    });

    it('Should display the selected teacher name if present', () => {
      wrapper = shallow(
        <StudentsSmartTab
          selectedTeacherData={mockedTeacherData}
          selectedStudentId={mockedSelections}
          students={mockedGlobalState}
          studentSelection={mockedStudentSelection}
          login={mockedLoginState}
          activeSelectedSchool={mockActiveSelectedSchool}
          activeSelectedGrade={mockActiveSelectedGrade}
          activeSelectedTeacher={mockActiveSelectedTeacher}
          activeSelectedClass={mockActiveSelectedClass}
          activeSelectedGroup={mockActiveSelectedGroup}
          activeSelectedStudent={mockActiveSelectedStudent}
          smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
          studentStatus={mockStudentStatus}
        />
      );
      expect(wrapper.find(SmartBarTab).prop('forName')).toMatchSnapshot();
    });

    it('Should display the selected school name if present', () => {
      wrapper = shallow(
        <StudentsSmartTab
          selectedSchoolData={mockedSchoolData}
          selectedStudentId={mockedSelections}
          students={mockedGlobalState}
          studentSelection={mockedStudentSelection}
          login={mockedLoginState}
          activeSelectedSchool={mockActiveSelectedSchool}
          activeSelectedGrade={mockActiveSelectedGrade}
          activeSelectedTeacher={mockActiveSelectedTeacher}
          activeSelectedClass={mockActiveSelectedClass}
          activeSelectedGroup={mockActiveSelectedGroup}
          activeSelectedStudent={mockActiveSelectedStudent}
          smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
          studentStatus={mockStudentStatus}
        />
      );
      expect(wrapper.find(SmartBarTab).prop('forName')).toMatchSnapshot();
    });

    it('Should display the selected group name if present', () => {
      wrapper = shallow(
        <StudentsSmartTab
          selectedGroupData={mockedGroupData}
          selectedStudentId={mockedSelections}
          students={mockedGlobalState}
          studentSelection={mockedStudentSelection}
          login={mockedLoginState}
          activeSelectedSchool={mockActiveSelectedSchool}
          activeSelectedGrade={mockActiveSelectedGrade}
          activeSelectedTeacher={mockActiveSelectedTeacher}
          activeSelectedClass={mockActiveSelectedClass}
          activeSelectedGroup={mockActiveSelectedGroup}
          activeSelectedStudent={mockActiveSelectedStudent}
          smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
          studentStatus={mockStudentStatus}
        />
      );
      expect(wrapper.find(SmartBarTab).prop('forName')).toMatchSnapshot();
    });

    it('Should display the selected grade name if present', () => {
      wrapper = shallow(
        <StudentsSmartTab
          selectedGradeData={mockedGradeData}
          selectedStudentId={mockedSelections}
          students={mockedGlobalState}
          studentSelection={mockedStudentSelection}
          login={mockedLoginState}
          activeSelectedSchool={mockActiveSelectedSchool}
          activeSelectedGrade={mockActiveSelectedGrade}
          activeSelectedTeacher={mockActiveSelectedTeacher}
          activeSelectedClass={mockActiveSelectedClass}
          activeSelectedGroup={mockActiveSelectedGroup}
          activeSelectedStudent={mockActiveSelectedStudent}
          smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
          studentStatus={mockStudentStatus}
        />
      );
      expect(wrapper.find(SmartBarTab).prop('forName')).toMatchSnapshot();
    });

    it('Should be open for teachers with one school', () => {
      mockedLoginState = fromJS({
        user_org: [],
        first_name: ['Teacher'],
        last_name: ['User'],
      });
      const schools = fromJS([
        {
          id: 1,
        },
      ]);
      wrapper = shallow(
        <StudentsSmartTab
          selectedGradeData={mockedGradeData}
          selectedStudentId={mockedSelections}
          students={mockedGlobalState}
          studentSelection={mockedStudentSelection}
          login={mockedLoginState}
          schools={schools}
          activeSelectedSchool={mockActiveSelectedSchool}
          activeSelectedGrade={mockActiveSelectedGrade}
          activeSelectedTeacher={mockActiveSelectedTeacher}
          activeSelectedClass={mockActiveSelectedClass}
          activeSelectedGroup={mockActiveSelectedGroup}
          activeSelectedStudent={mockActiveSelectedStudent}
          smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
          studentStatus={mockStudentStatus}
        />
      );
      expect(wrapper.find(SmartBarTab).prop('defaultChecked')).toBeTruthy();
    });
  });
});
