import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import SmartBarTab from 'components/SmartBarTab';
import { COHORT_TYPE } from 'containers/App/constants';
import { GradesSmartTab } from '../GradesSmartTab';

describe('<GradesSmartTab />', () => {
  let wrapper = null;
  let mockedGlobalState = null;
  let mockedGradeSelection = null;
  let mockedSelections = null;
  let mockedLoginState = null;
  let mockedSchoolData = null;
  let mockActiveSelectedSchool = null;
  let mockActiveSelectedGrade = null;
  let mockActiveSelectedTeacher = null;
  let mockActiveSelectedClass = null;
  let mockActiveSelectedGroup = null;
  let mockActiveSelectedStudent = null;
  let mockSmartBarSelectedGradeId = null;
  let mockClickedSchoolId = null;
  let mockSmartbarSelectedUpdateData = null;
  let mockGradeStatus = null;

  beforeEach(() => {
    mockedGlobalState = fromJS([
      { full_name: ['grade one'], name: ['grade1'] },
      { full_name: ['grade two'], name: ['grade2'] },
    ]);
    mockActiveSelectedSchool = jest.fn();
    mockActiveSelectedGrade = jest.fn();
    mockActiveSelectedTeacher = jest.fn();
    mockActiveSelectedClass = jest.fn();
    mockActiveSelectedGroup = jest.fn();
    mockActiveSelectedStudent = jest.fn();
    mockSmartbarSelectedUpdateData = jest.fn();
    mockSmartBarSelectedGradeId = '';
    mockClickedSchoolId = 'randomSchool';

    mockedGradeSelection = jest.fn();
    mockedSelections = 'xzcvxzvasd';
    mockedLoginState = fromJS({
      user_org: [COHORT_TYPE.District],
      first_name: ['John'],
      last_name: ['Adams'],
    });
    mockedSchoolData = fromJS({
      name: ['grade two'],
    });
    mockGradeStatus = true;
    wrapper = shallow(
      <GradesSmartTab
        selectedGradeId={mockedSelections}
        grades={mockedGlobalState}
        gradeSelection={mockedGradeSelection}
        login={mockedLoginState}
        activeSelectedSchool={mockActiveSelectedSchool}
        activeSelectedGrade={mockActiveSelectedGrade}
        activeSelectedTeacher={mockActiveSelectedTeacher}
        activeSelectedClass={mockActiveSelectedClass}
        activeSelectedGroup={mockActiveSelectedGroup}
        activeSelectedStudent={mockActiveSelectedStudent}
        smartBarSelectedGradeId={mockSmartBarSelectedGradeId}
        clickedSchoolId={mockClickedSchoolId}
        smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
        gradeStatus={mockGradeStatus}
      />
    );
  });

  it('Expect to have a SmartBarTab for a district user', () => {
    expect(wrapper.find(SmartBarTab).exists()).toBeTruthy();
  });

  it('verify with the grade id is selected', () => {
    wrapper.setProps({ smartBarSelectedGradeId: 'xzcvxzvasd', selectedCohortType: 'Grade' });
    expect(mockActiveSelectedGrade).toHaveBeenCalled();
  });

  it('verify when the grade id is empty', () => {
    wrapper.setProps({ smartBarSelectedGradeId: '' });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to have a SmartBarTab for a school user', () => {
    mockedLoginState = mockedLoginState.setIn(['user_org', 0], COHORT_TYPE.School);
    wrapper = shallow(
      <GradesSmartTab
        selectedGradeId={mockedSelections}
        grades={mockedGlobalState}
        gradeSelection={mockedGradeSelection}
        login={mockedLoginState}
        activeSelectedSchool={mockActiveSelectedSchool}
        activeSelectedGrade={mockActiveSelectedGrade}
        activeSelectedTeacher={mockActiveSelectedTeacher}
        activeSelectedClass={mockActiveSelectedClass}
        activeSelectedGroup={mockActiveSelectedGroup}
        activeSelectedStudent={mockActiveSelectedStudent}
        smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
        gradeStatus={mockGradeStatus}
      />
    );
    expect(wrapper.find(SmartBarTab).exists()).toBeTruthy();
  });

  it('Expect to not display for teachers', () => {
    mockedLoginState = mockedLoginState.setIn(['user_org', 0], '');
    wrapper = shallow(
      <GradesSmartTab
        selectedGradeId={mockedSelections}
        grades={mockedGlobalState}
        gradeSelection={mockedGradeSelection}
        login={mockedLoginState}
        activeSelectedSchool={mockActiveSelectedSchool}
        activeSelectedGrade={mockActiveSelectedGrade}
        activeSelectedTeacher={mockActiveSelectedTeacher}
        activeSelectedClass={mockActiveSelectedClass}
        activeSelectedGroup={mockActiveSelectedGroup}
        activeSelectedStudent={mockActiveSelectedStudent}
        smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
        gradeStatus={mockGradeStatus}
      />
    );
    expect(wrapper.find(SmartBarTab).exists()).toBeFalsy();
  });

  it('Expect to have a SmartBarTab with the title Grades', () => {
    expect(wrapper.find(SmartBarTab).prop('title')).toEqual('Grades');
  });

  it('Expect to pass mocked global state classes to the SmartBarTab', () => {
    expect(wrapper.find(SmartBarTab).prop('items').size).toEqual(mockedGlobalState.length);
  });

  it('Expect to handle no grades', () => {
    wrapper = shallow(
      <GradesSmartTab
        selectedGradeId={mockedSelections}
        gradeSelection={mockedGradeSelection}
        login={mockedLoginState}
        activeSelectedSchool={mockActiveSelectedSchool}
        activeSelectedGrade={mockActiveSelectedGrade}
        activeSelectedTeacher={mockActiveSelectedTeacher}
        activeSelectedClass={mockActiveSelectedClass}
        activeSelectedGroup={mockActiveSelectedGroup}
        activeSelectedStudent={mockActiveSelectedStudent}
        smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
        gradeStatus={mockGradeStatus}
      />
    );
    expect(wrapper.find(SmartBarTab).prop('items')).toBeFalsy();
  });

  it('Expect to display school name as the for name', () => {
    wrapper = shallow(
      <GradesSmartTab
        selectedSchoolData={mockedSchoolData}
        selectedGradeId={mockedSelections}
        gradeSelection={mockedGradeSelection}
        login={mockedLoginState}
        activeSelectedSchool={mockActiveSelectedSchool}
        activeSelectedGrade={mockActiveSelectedGrade}
        activeSelectedTeacher={mockActiveSelectedTeacher}
        activeSelectedClass={mockActiveSelectedClass}
        activeSelectedGroup={mockActiveSelectedGroup}
        activeSelectedStudent={mockActiveSelectedStudent}
        smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
        gradeStatus={mockGradeStatus}
      />
    );
    expect(wrapper.find(SmartBarTab).prop('forName')).toMatchSnapshot();
  });

  it('Expect to display login first and last name as the for name', () => {
    expect(wrapper.find(SmartBarTab).prop('forName')).toMatchSnapshot();
  });

  it('Should pass dispatch to child element', () => {
    const smartBar = wrapper.find(SmartBarTab);
    smartBar.prop('onItemClick')();
    expect(mockedGradeSelection).toHaveBeenCalled();
  });
});
