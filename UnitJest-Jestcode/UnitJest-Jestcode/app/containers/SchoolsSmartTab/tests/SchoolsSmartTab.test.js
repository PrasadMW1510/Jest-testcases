import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import SmartBarTab from 'components/SmartBarTab';
import { COHORT_TYPE } from 'containers/App/constants';
import { SchoolsSmartTab } from '../SchoolsSmartTab';

describe('<SchoolsSmartTab />', () => {
  let wrapper = null;
  let mockedGlobalState = null;
  let mockedLoginState = null;
  let mockedSchoolSelection = null;
  let mockedSelections = null;
  let mockActiveSelectedSchool = null;
  let mockActiveSelectedGrade = null;
  let mockActiveSelectedTeacher = null;
  let mockActiveSelectedClass = null;
  let mockActiveSelectedGroup = null;
  let mockActiveSelectedStudent = null;
  let mockSmartBarSelectedSchoolId = null;
  let mockSmartbarSelectedUpdateData = null;
  let mockSchoolStatus = null;

  beforeEach(() => {
    mockedGlobalState = fromJS([
      { name: ['school1'], org_id: ['org1'] },
      { name: ['school2'], org_id: ['org2'] },
    ]);
    mockedSchoolSelection = jest.fn();
    mockedLoginState = fromJS({
      user_org: [COHORT_TYPE.District],
    });
    mockedSelections = 'wqeqweqwe';
    mockActiveSelectedSchool = jest.fn();
    mockActiveSelectedGrade = jest.fn();
    mockActiveSelectedTeacher = jest.fn();
    mockActiveSelectedClass = jest.fn();
    mockActiveSelectedGroup = jest.fn();
    mockActiveSelectedStudent = jest.fn();
    mockSmartbarSelectedUpdateData = jest.fn();
    mockSmartBarSelectedSchoolId = '';
    mockSchoolStatus = true;

    wrapper = shallow(
      <SchoolsSmartTab
        selectedSchoolId={mockedSelections}
        schools={mockedGlobalState}
        schoolSelection={mockedSchoolSelection}
        login={mockedLoginState}
        activeSelectedSchool={mockActiveSelectedSchool}
        activeSelectedGrade={mockActiveSelectedGrade}
        activeSelectedTeacher={mockActiveSelectedTeacher}
        activeSelectedClass={mockActiveSelectedClass}
        activeSelectedGroup={mockActiveSelectedGroup}
        activeSelectedStudent={mockActiveSelectedStudent}
        smartBarSelectedSchoolId={mockSmartBarSelectedSchoolId}
        smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
        schoolStatus={mockSchoolStatus}
      />
    );
  });

  it('Expect to have a SmartBarTab', () => {
    expect(wrapper.find(SmartBarTab).exists()).toBeTruthy();
  });

  it('verify with the selected value is the same', () => {
    wrapper.setProps({ smartBarSelectedSchoolId: 'wqeqweqwe', selectedCohortType: 'School' });
    expect(mockActiveSelectedSchool).toHaveBeenCalled();
  });

  it('verify with the value is not equal', () => {
    wrapper.setProps({ smartBarSelectedSchoolId: '' });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to have a SmartBarTab with the title Classes', () => {
    expect(wrapper.find(SmartBarTab).prop('title')).toEqual('Schools');
  });

  it('Expect to pass mocked global state classes to the SmartBarTab', () => {
    expect(wrapper.find(SmartBarTab).prop('items').size).toEqual(mockedGlobalState.length);
  });

  it('Expect to handle no schools', () => {
    wrapper = shallow(
      <SchoolsSmartTab
        selectedSchoolId={mockedSelections}
        schoolSelection={mockedSchoolSelection}
        login={mockedLoginState}
        activeSelectedSchool={mockActiveSelectedSchool}
        activeSelectedGrade={mockActiveSelectedGrade}
        activeSelectedTeacher={mockActiveSelectedTeacher}
        activeSelectedClass={mockActiveSelectedClass}
        activeSelectedGroup={mockActiveSelectedGroup}
        activeSelectedStudent={mockActiveSelectedStudent}
        smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
        schoolStatus={mockSchoolStatus}
      />
    );
    expect(wrapper.find(SmartBarTab).prop('items')).toBeFalsy();
  });

  it('Expect to handle teacher user with multiple schools', () => {
    mockedLoginState = fromJS({
      user_org: [],
    });
    wrapper = shallow(
      <SchoolsSmartTab
        selectedSchoolId={mockedSelections}
        schools={mockedGlobalState}
        schoolSelection={mockedSchoolSelection}
        login={mockedLoginState}
        activeSelectedSchool={mockActiveSelectedSchool}
        activeSelectedGrade={mockActiveSelectedGrade}
        activeSelectedTeacher={mockActiveSelectedTeacher}
        activeSelectedClass={mockActiveSelectedClass}
        activeSelectedGroup={mockActiveSelectedGroup}
        activeSelectedStudent={mockActiveSelectedStudent}
        smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
        schoolStatus={mockSchoolStatus}
      />
    );
    expect(wrapper.find(SmartBarTab).exists()).toBeTruthy();
  });

  it('Expect to not be visible when its a school admin', () => {
    mockedLoginState = fromJS({
      user_org: [COHORT_TYPE.School],
    });

    wrapper = shallow(
      <SchoolsSmartTab
        selectedSchoolId={mockedSelections}
        schools={mockedGlobalState}
        schoolSelection={mockedSchoolSelection}
        login={mockedLoginState}
        activeSelectedSchool={mockActiveSelectedSchool}
        activeSelectedGrade={mockActiveSelectedGrade}
        activeSelectedTeacher={mockActiveSelectedTeacher}
        activeSelectedClass={mockActiveSelectedClass}
        activeSelectedGroup={mockActiveSelectedGroup}
        activeSelectedStudent={mockActiveSelectedStudent}
        smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
        schoolStatus={mockSchoolStatus}
      />
    );
    expect(wrapper.find(SmartBarTab).exists()).toBeFalsy();
  });

  it('Expect to not be visible when its a teacher with only one school', () => {
    mockedLoginState = fromJS({
      user_org: [''],
    });

    mockedGlobalState = fromJS([{ name: ['school1'], org_id: ['org1'] }]);

    wrapper = shallow(
      <SchoolsSmartTab
        selectedSchoolId={mockedSelections}
        schools={mockedGlobalState}
        schoolSelection={mockedSchoolSelection}
        login={mockedLoginState}
        activeSelectedSchool={mockActiveSelectedSchool}
        activeSelectedGrade={mockActiveSelectedGrade}
        activeSelectedTeacher={mockActiveSelectedTeacher}
        activeSelectedClass={mockActiveSelectedClass}
        activeSelectedGroup={mockActiveSelectedGroup}
        activeSelectedStudent={mockActiveSelectedStudent}
        smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
        schoolStatus={mockSchoolStatus}
      />
    );
    expect(wrapper.find(SmartBarTab).exists()).toBeFalsy();
  });

  it('Should pass dispatch to child element', () => {
    const smartBar = wrapper.find(SmartBarTab);
    smartBar.prop('onItemClick')();
    expect(mockedSchoolSelection).toHaveBeenCalled();
  });
});
