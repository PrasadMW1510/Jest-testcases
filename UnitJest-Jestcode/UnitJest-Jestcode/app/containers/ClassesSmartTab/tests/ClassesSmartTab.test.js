import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import SmartBarTab from 'components/SmartBarTab';
import { COHORT_TYPE } from 'containers/App/constants';
import { ClassesSmartTab } from '../ClassesSmartTab';

describe('<ClassesSmartTab />', () => {
  let wrapper = null;
  let mockedGlobalState = null;
  let mockedLoginState = null;
  let mockedClassSelection = null;
  let mockedSelections = null;
  let mockActiveSelectedSchool = null;
  let mockActiveSelectedGrade = null;
  let mockActiveSelectedTeacher = null;
  let mockActiveSelectedClass = null;
  let mockActiveSelectedGroup = null;
  let mockActiveSelectedStudent = null;
  let mockSmartBarSelectedClassId = null;
  let mockClickedSchoolId = null;
  let mockClickedGradeId = null;
  let mockClickedTeacherId = null;
  let mockSmartbarSelectedUpdateData = null;
  let mockClassStatus = null;

  beforeEach(() => {
    mockedGlobalState = fromJS([
      { display_name: ['class1'], class_id: ['cl1'] },
      { display_name: ['class2'], class_id: ['cl2'] },
      { display_name: ['class3'], class_id: ['cl3'] },
    ]);
    mockedClassSelection = jest.fn();
    mockedSelections = 'dsafa';
    mockedLoginState = fromJS({
      user_org: [COHORT_TYPE.District],
      first_name: ['Jane'],
      last_name: ['Doe'],
    });

    mockActiveSelectedSchool = jest.fn();
    mockActiveSelectedGrade = jest.fn();
    mockActiveSelectedTeacher = jest.fn();
    mockActiveSelectedClass = jest.fn();
    mockActiveSelectedGroup = jest.fn();
    mockActiveSelectedStudent = jest.fn();
    mockSmartbarSelectedUpdateData = jest.fn();
    mockSmartBarSelectedClassId = '';
    mockClickedSchoolId = 'random';
    mockClickedGradeId = 'random';
    mockClickedTeacherId = 'random';
    mockClassStatus = true;

    wrapper = shallow(
      <ClassesSmartTab
        selectedClass={mockedSelections}
        classes={mockedGlobalState}
        classSelection={mockedClassSelection}
        login={mockedLoginState}
        activeSelectedSchool={mockActiveSelectedSchool}
        activeSelectedGrade={mockActiveSelectedGrade}
        activeSelectedTeacher={mockActiveSelectedTeacher}
        activeSelectedClass={mockActiveSelectedClass}
        activeSelectedGroup={mockActiveSelectedGroup}
        activeSelectedStudent={mockActiveSelectedStudent}
        smartBarSelectedClassId={mockSmartBarSelectedClassId}
        clickedSchoolId={mockClickedSchoolId}
        clickedGradeId={mockClickedGradeId}
        clickedTeacherId={mockClickedTeacherId}
        smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
        classStatus={mockClassStatus}
      />
    );
  });

  it('Expect to have a SmartBarTab', () => {
    expect(wrapper.find(SmartBarTab).exists()).toBeTruthy();
  });

  it('verify with the classId selected is same', () => {
    wrapper.setProps({ smartBarSelectedClassId: 'dsafa', selectedCohortType: 'Class' });
    expect(mockActiveSelectedClass).toHaveBeenCalled();
  });

  it('verify classId selected negative scenario', () => {
    wrapper.setProps({ selectedClass: '' });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to have a SmartBarTab with the title Classes', () => {
    expect(wrapper.find(SmartBarTab).prop('title')).toEqual('Classes');
  });

  it('Expect to pass mocked global state classes to the SmartBarTab', () => {
    expect(wrapper.find(SmartBarTab).prop('items').size).toEqual(mockedGlobalState.length);
  });

  it('Expect to handle no classes', () => {
    wrapper = shallow(
      <ClassesSmartTab
        selectedClass={mockedSelections}
        classSelection={mockedClassSelection}
        login={mockedLoginState}
        activeSelectedSchool={mockActiveSelectedSchool}
        activeSelectedGrade={mockActiveSelectedGrade}
        activeSelectedTeacher={mockActiveSelectedTeacher}
        activeSelectedClass={mockActiveSelectedClass}
        activeSelectedGroup={mockActiveSelectedGroup}
        activeSelectedStudent={mockActiveSelectedStudent}
        smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
        classStatus={mockClassStatus}
      />
    );
    expect(wrapper.find(SmartBarTab).exists()).toBeTruthy();
  });

  it('Should pass dispatch to child element', () => {
    const smartBar = wrapper.find(SmartBarTab);
    smartBar.prop('onItemClick')();
    expect(mockedClassSelection).toHaveBeenCalled();
  });

  describe('For name', () => {
    let mockedTeacherData = null;
    let mockedGradeData = null;
    let mockedSchoolData = null;

    beforeEach(() => {
      mockedTeacherData = fromJS({
        first_name: ['John'],
        last_name: ['Smith'],
      });

      mockedGradeData = fromJS({
        full_name: ['Kindergarten'],
      });

      mockedSchoolData = fromJS({
        name: ['School 1'],
      });
    });

    it('Should display the logged in user name if no other data is present', () => {
      expect(wrapper.find(SmartBarTab).prop('forName')).toMatchSnapshot();
    });

    it('Should display the selected teacher name if present', () => {
      wrapper = shallow(
        <ClassesSmartTab
          selectedTeacherData={mockedTeacherData}
          selectedClass={mockedSelections}
          classSelection={mockedClassSelection}
          login={mockedLoginState}
          activeSelectedSchool={mockActiveSelectedSchool}
          activeSelectedGrade={mockActiveSelectedGrade}
          activeSelectedTeacher={mockActiveSelectedTeacher}
          activeSelectedClass={mockActiveSelectedClass}
          activeSelectedGroup={mockActiveSelectedGroup}
          activeSelectedStudent={mockActiveSelectedStudent}
          smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
          classStatus={mockClassStatus}
        />
      );
      expect(wrapper.find(SmartBarTab).prop('forName')).toMatchSnapshot();
    });

    it('Should display the selected grade name if present', () => {
      wrapper = shallow(
        <ClassesSmartTab
          selectedGradeData={mockedGradeData}
          selectedClass={mockedSelections}
          classSelection={mockedClassSelection}
          login={mockedLoginState}
          activeSelectedSchool={mockActiveSelectedSchool}
          activeSelectedGrade={mockActiveSelectedGrade}
          activeSelectedTeacher={mockActiveSelectedTeacher}
          activeSelectedClass={mockActiveSelectedClass}
          activeSelectedGroup={mockActiveSelectedGroup}
          activeSelectedStudent={mockActiveSelectedStudent}
          smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
          classStatus={mockClassStatus}
        />
      );
      expect(wrapper.find(SmartBarTab).prop('forName')).toMatchSnapshot();
    });

    it('Should display the selected school name if present', () => {
      wrapper = shallow(
        <ClassesSmartTab
          selectedSchoolData={mockedSchoolData}
          selectedClass={mockedSelections}
          classSelection={mockedClassSelection}
          login={mockedLoginState}
          activeSelectedSchool={mockActiveSelectedSchool}
          activeSelectedGrade={mockActiveSelectedGrade}
          activeSelectedTeacher={mockActiveSelectedTeacher}
          activeSelectedClass={mockActiveSelectedClass}
          activeSelectedGroup={mockActiveSelectedGroup}
          activeSelectedStudent={mockActiveSelectedStudent}
          smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
          classStatus={mockClassStatus}
        />
      );
      expect(wrapper.find(SmartBarTab).prop('forName')).toMatchSnapshot();
    });
  });

  describe('Default tab', () => {
    let mockedSchoolData = null;

    beforeEach(() => {
      mockedSchoolData = fromJS([{ id: 'school1' }]);
    });

    it('should be default for teachers with one school', () => {
      mockedLoginState = mockedLoginState.setIn(['user_org', 0], null);
      wrapper = shallow(
        <ClassesSmartTab
          schools={mockedSchoolData}
          selectedClass={mockedSelections}
          classes={mockedGlobalState}
          classSelection={mockedClassSelection}
          login={mockedLoginState}
          activeSelectedSchool={mockActiveSelectedSchool}
          activeSelectedGrade={mockActiveSelectedGrade}
          activeSelectedTeacher={mockActiveSelectedTeacher}
          activeSelectedClass={mockActiveSelectedClass}
          activeSelectedGroup={mockActiveSelectedGroup}
          activeSelectedStudent={mockActiveSelectedStudent}
          smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
          classStatus={mockClassStatus}
        />
      );
      expect(wrapper.find(SmartBarTab).prop('defaultChecked')).toBeTruthy();
    });
  });
});
