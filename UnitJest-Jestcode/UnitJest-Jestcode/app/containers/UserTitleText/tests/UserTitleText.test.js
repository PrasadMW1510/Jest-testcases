import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import { COHORT_TYPE } from 'containers/App/constants';

import { UserTitleText } from '../index';

describe('<UserTitleText />', () => {
  let wrapper = null;

  describe('No selections', () => {
    it('Expect to render user title for teachers', () => {
      wrapper = shallow(<UserTitleText />);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Expect to render user title for school admins', () => {
      wrapper = shallow(<UserTitleText userOrg={COHORT_TYPE.School} />);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Expect to render user title for district admins', () => {
      wrapper = shallow(<UserTitleText userOrg={COHORT_TYPE.District} />);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('Selections', () => {
    let selectedStudentData;
    let selectedGroupData;
    let selectedClassData;
    let selectedTeacherData;
    let selectedGradeData;
    let selectedSchoolData;

    beforeEach(() => {
      selectedStudentData = fromJS({
        last_name: ['last_name'],
        first_name: ['first_name'],
      });
      selectedGroupData = fromJS({
        display_name: ['group_display_name'],
      });
      selectedClassData = fromJS({
        display_name: ['class_display_name'],
      });
      selectedTeacherData = fromJS({
        last_name: ['last_name'],
        first_name: ['first_name'],
      });
      selectedGradeData = fromJS({
        full_name: ['full_name'],
      });
      selectedSchoolData = fromJS({
        name: ['name'],
      });
    });
    it('Expect to render selected student', () => {
      wrapper = shallow(<UserTitleText selectedStudentData={selectedStudentData} />);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Expect to render selected group', () => {
      wrapper = shallow(<UserTitleText selectedGroupData={selectedGroupData} />);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Expect to render selected class', () => {
      wrapper = shallow(<UserTitleText selectedClassData={selectedClassData} />);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Expect to render selected teacher', () => {
      wrapper = shallow(<UserTitleText selectedTeacherData={selectedTeacherData} />);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Expect to render selected grade', () => {
      wrapper = shallow(<UserTitleText selectedGradeData={selectedGradeData} />);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Expect to render selected school', () => {
      wrapper = shallow(<UserTitleText selectedSchoolData={selectedSchoolData} />);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Expect to render when selectedCohortName', () => {
      wrapper = shallow(<UserTitleText selectedCohortName={'123School'} />);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
