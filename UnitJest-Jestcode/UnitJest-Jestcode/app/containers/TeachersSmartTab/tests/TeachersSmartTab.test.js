import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import SmartBarTab from 'components/SmartBarTab';
import { COHORT_TYPE } from 'containers/App/constants';
import { TeachersSmartTab } from '../TeachersSmartTab';

describe('<TeachersSmartTab />', () => {
  let wrapper = null;
  let mockedGlobalState = null;
  let mockedLoginState = null;
  let mockedTeacherSelection = null;
  let mockedSelections = null;
  let mockActiveSelectedSchool = null;
  let mockActiveSelectedGrade = null;
  let mockActiveSelectedTeacher = null;
  let mockActiveSelectedClass = null;
  let mockActiveSelectedGroup = null;
  let mockActiveSelectedStudent = null;
  let mockClickedGradeId = null;
  let mockClickedSchoolId = null;
  let mockSmartBarSelectedTeacherId = null;
  let mockSmartbarSelectedUpdateData = null;
  let mockTeacherStatus = null;

  beforeEach(() => {
    mockedGlobalState = fromJS([
      { user_id: ['teacher1'], first_name: ['john'], last_name: ['smith'] },
      { user_id: ['teacher2'], first_name: ['jane'], last_name: ['doe'] },
    ]);
    mockedLoginState = fromJS({
      user_org: [COHORT_TYPE.District],
      first_name: ['Sam'],
      last_name: ['Smith'],
    });

    mockActiveSelectedSchool = jest.fn();
    mockActiveSelectedGrade = jest.fn();
    mockActiveSelectedTeacher = jest.fn();
    mockActiveSelectedClass = jest.fn();
    mockActiveSelectedGroup = jest.fn();
    mockActiveSelectedStudent = jest.fn();
    mockSmartbarSelectedUpdateData = jest.fn();
    mockClickedSchoolId = 'randomSchool';
    mockClickedGradeId = 'randomGrade';
    mockSmartBarSelectedTeacherId = '';

    mockedTeacherSelection = jest.fn();
    mockedSelections = 'sadfasfas';
    mockTeacherStatus = true;
    wrapper = shallow(
      <TeachersSmartTab
        selectedTeacherId={mockedSelections}
        teachers={mockedGlobalState}
        teacherSelection={mockedTeacherSelection}
        login={mockedLoginState}
        activeSelectedSchool={mockActiveSelectedSchool}
        activeSelectedGrade={mockActiveSelectedGrade}
        activeSelectedTeacher={mockActiveSelectedTeacher}
        activeSelectedClass={mockActiveSelectedClass}
        activeSelectedGroup={mockActiveSelectedGroup}
        activeSelectedStudent={mockActiveSelectedStudent}
        clickedSchoolId={mockClickedSchoolId}
        clickedGradeId={mockClickedGradeId}
        smartBarSelectedTeacherId={mockSmartBarSelectedTeacherId}
        smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
        teacherStatus={mockTeacherStatus}
      />
    );
  });

  it('Expect to have a SmartBarTab', () => {
    expect(wrapper.find(SmartBarTab).exists()).toBeTruthy();
  });

  it('verify with the selected value is the same', () => {
    wrapper.setProps({ smartBarSelectedTeacherId: 'sadfasfas', selectedCohortType: 'Teacher' });
    expect(mockActiveSelectedTeacher).toHaveBeenCalled();
  });

  it('verify with the value is not equal', () => {
    wrapper.setProps({ smartBarSelectedTeacherId: '' });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to have a SmartBarTab for school users', () => {
    mockedLoginState = mockedLoginState.setIn(['user_org', 0], COHORT_TYPE.School);
    wrapper = shallow(
      <TeachersSmartTab
        selectedTeacherId={mockedSelections}
        teachers={mockedGlobalState}
        teacherSelection={mockedTeacherSelection}
        login={mockedLoginState}
        activeSelectedSchool={mockActiveSelectedSchool}
        activeSelectedGrade={mockActiveSelectedGrade}
        activeSelectedTeacher={mockActiveSelectedTeacher}
        activeSelectedClass={mockActiveSelectedClass}
        activeSelectedGroup={mockActiveSelectedGroup}
        activeSelectedStudent={mockActiveSelectedStudent}
        smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
        teacherStatus={mockTeacherStatus}
      />
    );
    expect(wrapper.find(SmartBarTab).exists()).toBeTruthy();
  });

  it('Expect to not display for teachers', () => {
    mockedLoginState = mockedLoginState.setIn(['user_org', 0], null);
    wrapper = shallow(
      <TeachersSmartTab
        selectedTeacherId={mockedSelections}
        teachers={mockedGlobalState}
        teacherSelection={mockedTeacherSelection}
        login={mockedLoginState}
        activeSelectedSchool={mockActiveSelectedSchool}
        activeSelectedGrade={mockActiveSelectedGrade}
        activeSelectedTeacher={mockActiveSelectedTeacher}
        activeSelectedClass={mockActiveSelectedClass}
        activeSelectedGroup={mockActiveSelectedGroup}
        activeSelectedStudent={mockActiveSelectedStudent}
        smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
        teacherStatus={mockTeacherStatus}
      />
    );
    expect(wrapper.find(SmartBarTab).exists()).toBeFalsy();
  });

  it('Expect to have a SmartBarTab with the title Classes', () => {
    expect(wrapper.find(SmartBarTab).prop('title')).toEqual('Teachers');
  });

  it('Expect to pass mocked global state classes to the SmartBarTab', () => {
    expect(wrapper.find(SmartBarTab).prop('items').size).toEqual(mockedGlobalState.length);
  });

  it('Expect to handle no teachers', () => {
    wrapper = shallow(
      <TeachersSmartTab
        selectedTeacherId={mockedSelections}
        teacherSelection={mockedTeacherSelection}
        login={mockedLoginState}
        activeSelectedSchool={mockActiveSelectedSchool}
        activeSelectedGrade={mockActiveSelectedGrade}
        activeSelectedTeacher={mockActiveSelectedTeacher}
        activeSelectedClass={mockActiveSelectedClass}
        activeSelectedGroup={mockActiveSelectedGroup}
        activeSelectedStudent={mockActiveSelectedStudent}
        smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
        teacherStatus={mockTeacherStatus}
      />
    );
    expect(wrapper.find(SmartBarTab).prop('items')).toBeFalsy();
  });

  it('Should pass dispatch to child element', () => {
    const smartBar = wrapper.find(SmartBarTab);
    smartBar.prop('onItemClick')();
    expect(mockedTeacherSelection).toHaveBeenCalled();
  });

  describe('For name', () => {
    let mockedGradeData = null;
    let mockedSchoolData = null;

    beforeEach(() => {
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

    it('Should display the selected grade name if present', () => {
      wrapper = shallow(
        <TeachersSmartTab
          selectedGradeData={mockedGradeData}
          selectedTeacherId={mockedSelections}
          teachers={mockedGlobalState}
          teacherSelection={mockedTeacherSelection}
          login={mockedLoginState}
          activeSelectedSchool={mockActiveSelectedSchool}
          activeSelectedGrade={mockActiveSelectedGrade}
          activeSelectedTeacher={mockActiveSelectedTeacher}
          activeSelectedClass={mockActiveSelectedClass}
          activeSelectedGroup={mockActiveSelectedGroup}
          activeSelectedStudent={mockActiveSelectedStudent}
          smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
          teacherStatus={mockTeacherStatus}
        />
      );
      expect(wrapper.find(SmartBarTab).prop('forName')).toMatchSnapshot();
    });

    it('Should display the selected school name if present', () => {
      wrapper = shallow(
        <TeachersSmartTab
          selectedSchoolData={mockedSchoolData}
          selectedTeacherId={mockedSelections}
          teachers={mockedGlobalState}
          teacherSelection={mockedTeacherSelection}
          login={mockedLoginState}
          activeSelectedSchool={mockActiveSelectedSchool}
          activeSelectedGrade={mockActiveSelectedGrade}
          activeSelectedTeacher={mockActiveSelectedTeacher}
          activeSelectedClass={mockActiveSelectedClass}
          activeSelectedGroup={mockActiveSelectedGroup}
          activeSelectedStudent={mockActiveSelectedStudent}
          smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
          teacherStatus={mockTeacherStatus}
        />
      );
      expect(wrapper.find(SmartBarTab).prop('forName')).toMatchSnapshot();
    });
  });
});
