import Immutable from 'immutable';
import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { ClassAssignModal } from '../ClassAssignModal';

describe('<ClassAssignModal />', () => {
  let wrapper = null;
  const oneStudentCheckedOnSearch = ['studentId_ABC'];
  const threeStudentsCheckedOnSearch = ['studentId_ABC', 'studentId_DEF', 'studentId_XYZ'];
  const cohortLabel = 'Student';
  const mockGetClassesAndGroupRequest = jest.fn();
  const mockOnClose = jest.fn();
  const mockPostAssignToClassRequest = jest.fn();
  const mockSearchRefreshOnSave = jest.fn();
  const mockClassesAndGroups = Immutable.fromJS({
    classesAndGroups: [
      {
        school_id: ['testSchoolId'],
        school_name: ['testSchoolName'],
        classes: [
          {
            class: [
              {
                class_id: ['testClassA'],
                class_name: ['testClassNameA'],
                groups: [
                  { group: [{ group_id: ['testGroupAA'], group_name: ['testGroupNameAA'] }] },
                ],
              },
              {
                class_id: ['testClass'],
                class_name: ['testClassName'],
                groups: [{ group: [{ group_id: ['testGroup'], group_name: ['testGroupName'] }] }],
              },
            ],
          },
        ],
      },
    ],
  });

  const mockClassesNoGroups = Immutable.fromJS({
    classesAndGroups: [
      {
        school_id: ['testSchoolId'],
        school_name: ['testSchoolName'],
        classes: [
          {
            class: [
              {
                class_id: ['testClassWithoutGroupsId'],
                class_name: ['testClassWithoutGroupsName'],
                groups: [],
              },
            ],
          },
        ],
      },
    ],
  });

  const mockClassesWithAndWithoutGroups = Immutable.fromJS({
    classesAndGroups: [
      {
        school_id: ['testSchoolIdC'],
        school_name: ['testSchoolNameC'],
        classes: [
          {
            class: [
              {
                class_id: ['testClassC1'],
                class_name: ['testClassNameC1'],
                groups: [],
              },
              {
                class_id: ['testClassC2'],
                class_name: ['testClassNameC2'],
                groups: [
                  { group: [{ group_id: ['testGroupC2'], group_name: ['testGroupNameC2'] }] },
                ],
              },
              {
                class_id: ['testClassC3'],
                class_name: ['testClassNameC3'],
                groups: [
                  { group: [{ group_id: ['testGroupC3A'], group_name: ['testGroupNameC3A'] }] },
                ],
              },
            ],
          },
        ],
      },
    ],
  });

  beforeEach(() => {
    wrapper = shallow(
      <ClassAssignModal
        getClassesAndGroupsRequest={mockGetClassesAndGroupRequest}
        classAssignModalContainer={mockClassesAndGroups}
        onClose={mockOnClose}
        postAssignToClassRequest={mockPostAssignToClassRequest}
        searchRefreshOnSave={mockSearchRefreshOnSave}
        isOpen
        cohortTypeLabel={cohortLabel}
      />
    );
  });

  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should handleSchoolChange', () => {
    const selectEvent = { preventDefault: jest.fn(), target: { value: 'testSchoolId' } };
    const setStateSpy = jest.fn();
    wrapper.instance().setState = setStateSpy;
    wrapper.instance().handleSchoolChange(selectEvent);
    const selectedClass = mockClassesAndGroups.getIn(['classesAndGroups', 0, 'classes', 0]);
    const checkboxClasses = wrapper.instance().createCheckBoxClassesAndGroups(selectedClass);
    expect(setStateSpy).toHaveBeenCalledWith({
      classes: selectedClass,
      checkboxClasses,
      classSelected: true,
    });
  });

  it('should renderSchoolOptions', () => {
    const schools = [{ school_id: ['iii'], school_name: ['nnn'] }];
    expect(wrapper.instance().renderSchoolOptions(schools)).toMatchSnapshot();
  });

  it('should renderClassCheckboxlist', () => {
    const selectedClass = mockClassesAndGroups.getIn(['classesAndGroups', 0, 'classes', 0]);
    wrapper.setState({ classes: selectedClass });
    expect(wrapper.instance().renderClassCheckboxList()).toMatchSnapshot();
  });

  describe('Cancel and Save Buttons', () => {
    it('should close modal when cancel is pressed', () => {
      const cancelButton = wrapper.find('#class-assign-modal__cancel-btn');
      cancelButton.props().onClickHandler();

      expect(mockOnClose).toHaveBeenCalled();
    });

    it('should close modal when save is pressed', () => {
      const saveButton = wrapper.find('#class-assign-modal__save-btn');
      saveButton.props().onClickHandler();

      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  describe('When no data is pass', () => {
    it('should render as expected', () => {
      wrapper = shallow(
        <ClassAssignModal
          getClassesAndGroupsRequest={mockGetClassesAndGroupRequest}
          classAssignModalContainer={Immutable.Map()}
          onClose={mockOnClose}
          postAssignToClassRequest={mockPostAssignToClassRequest}
          searchRefreshOnSave={mockSearchRefreshOnSave}
          isOpen
          cohortTypeLabel={cohortLabel}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('When class data passed that has no groups', () => {
    it('should renderClassCheckboxlist that does not have groups', () => {
      wrapper = shallow(
        <ClassAssignModal
          getClassesAndGroupsRequest={mockGetClassesAndGroupRequest}
          classAssignModalContainer={mockClassesNoGroups}
          onClose={mockOnClose}
          postAssignToClassRequest={mockPostAssignToClassRequest}
          searchRefreshOnSave={mockSearchRefreshOnSave}
          isOpen
          cohortTypeLabel={cohortLabel}
        />
      );
      const selectedClass = mockClassesNoGroups.getIn(['classesAndGroups', 0, 'classes', 0]);
      wrapper.setState({ classes: selectedClass });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('When student(s) checked on SearchResults are passed to AssignToClass', () => {
    it('should have text 1 student when one checked student was passed', () => {
      wrapper = shallow(
        <ClassAssignModal
          getClassesAndGroupsRequest={mockGetClassesAndGroupRequest}
          classAssignModalContainer={mockClassesNoGroups}
          onClose={mockOnClose}
          postAssignToClassRequest={mockPostAssignToClassRequest}
          searchRefreshOnSave={mockSearchRefreshOnSave}
          isOpen
          cohortsToAssign={oneStudentCheckedOnSearch}
          cohortTypeLabel={cohortLabel}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
      const directions = wrapper.find('.class-assign-modal__directions').first();
      expect(directions.text()).toContain('1 student for');
    });

    it('should have text 3 student when three checked students was passed', () => {
      wrapper = shallow(
        <ClassAssignModal
          getClassesAndGroupsRequest={mockGetClassesAndGroupRequest}
          classAssignModalContainer={mockClassesNoGroups}
          onClose={mockOnClose}
          postAssignToClassRequest={mockPostAssignToClassRequest}
          searchRefreshOnSave={mockSearchRefreshOnSave}
          isOpen
          cohortsToAssign={threeStudentsCheckedOnSearch}
          cohortTypeLabel={cohortLabel}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
      const directions = wrapper.find('.class-assign-modal__directions').first();
      expect(directions.text()).toContain('3 students for');
    });
  });

  describe('class and group checkbox behaviors', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ClassAssignModal
          getClassesAndGroupsRequest={mockGetClassesAndGroupRequest}
          classAssignModalContainer={mockClassesAndGroups}
          onClose={mockOnClose}
          postAssignToClassRequest={mockPostAssignToClassRequest}
          searchRefreshOnSave={mockSearchRefreshOnSave}
          isOpen
          cohortsToAssign={threeStudentsCheckedOnSearch}
          cohortTypeLabel={cohortLabel}
        />
      );
      const selectEvent = { preventDefault: jest.fn(), target: { value: 'testSchoolId' } };
      wrapper.instance().handleSchoolChange(selectEvent);
    });
    it('should handle the class checkboxes toggle to checked', () => {
      const selectedClass = mockClassesAndGroups.getIn(['classesAndGroups', 0, 'classes', 0]);
      const constCheckboxClasses = wrapper.instance().createCheckBoxClassesAndGroups(selectedClass);
      wrapper.setState({ checkboxClasses: constCheckboxClasses });
      expect(wrapper.state('checkboxClasses')[1].checked).toBeFalsy();
      wrapper.instance().handleToggleClassCheckbox('testClass', true);
      expect(wrapper.state('checkboxClasses')[1].checked).toBeTruthy();
    });

    it('should handle the class checkboxes toggle to unchecked', () => {
      const selectedClass = mockClassesAndGroups.getIn(['classesAndGroups', 0, 'classes', 0]);
      const constCheckboxClasses = wrapper.instance().createCheckBoxClassesAndGroups(selectedClass);
      wrapper.setState({ checkboxClasses: constCheckboxClasses });
      wrapper.instance().handleToggleClassCheckbox('testClass', true);
      expect(wrapper.state('checkboxClasses')[1].checked).toBeTruthy();
      wrapper.instance().handleToggleClassCheckbox('testClass', false);
      expect(wrapper.state('checkboxClasses')[1].checked).toBeFalsy();
    });

    it('should handle the group checkboxes toggle to checked ', () => {
      const selectedClass = mockClassesAndGroups.getIn(['classesAndGroups', 0, 'classes', 0]);
      const constCheckboxClasses = wrapper.instance().createCheckBoxClassesAndGroups(selectedClass);
      wrapper.setState({ checkboxClasses: constCheckboxClasses });
      expect(wrapper.state('checkboxClasses')[1].groups[0].checked).toBeFalsy();
      expect(wrapper.state('checkboxClasses')[1].checked).toBeFalsy();
      wrapper.instance().handleToggleGroupCheckbox('testGroup', true);
      expect(wrapper.state('checkboxClasses')[1].groups[0].checked).toBeTruthy();
      expect(wrapper.state('checkboxClasses')[1].checked).toBeTruthy();
    });

    it('should handle the group checkboxes toggle to unchecked ', () => {
      const selectedClass = mockClassesAndGroups.getIn(['classesAndGroups', 0, 'classes', 0]);
      const constCheckboxClasses = wrapper.instance().createCheckBoxClassesAndGroups(selectedClass);
      wrapper.setState({ checkboxClasses: constCheckboxClasses });
      wrapper.instance().handleToggleGroupCheckbox('testGroup', true);
      expect(wrapper.state('checkboxClasses')[1].groups[0].checked).toBeTruthy();
      expect(wrapper.state('checkboxClasses')[1].checked).toBeTruthy();
      wrapper.instance().handleToggleGroupCheckbox('testGroup', false);
      expect(wrapper.state('checkboxClasses')[1].groups[0].checked).toBeFalsy();
      expect(wrapper.state('checkboxClasses')[1].checked).toBeTruthy();
    });

    it('should create payload for students with classes and groups', () => {
      wrapper = shallow(
        <ClassAssignModal
          getClassesAndGroupsRequest={mockGetClassesAndGroupRequest}
          classAssignModalContainer={mockClassesWithAndWithoutGroups}
          onClose={mockOnClose}
          postAssignToClassRequest={mockPostAssignToClassRequest}
          searchRefreshOnSave={mockSearchRefreshOnSave}
          isOpen
          cohortsToAssign={threeStudentsCheckedOnSearch}
          cohortTypeLabel={cohortLabel}
        />
      );
      const selectEvent = { preventDefault: jest.fn(), target: { value: 'testSchoolIdC' } };
      wrapper.instance().handleSchoolChange(selectEvent);
      const selectedClass = mockClassesWithAndWithoutGroups.getIn([
        'classesAndGroups',
        0,
        'classes',
        0,
      ]);
      const constCheckboxClasses = wrapper.instance().createCheckBoxClassesAndGroups(selectedClass);
      wrapper.setState({ checkboxClasses: constCheckboxClasses });
      wrapper.instance().handleToggleGroupCheckbox('testGroupC2', true);
      wrapper.instance().handleToggleClassCheckbox('testClassC1', true);
      wrapper.instance().handleToggleClassCheckbox('testClassC3', true);
      const payload = wrapper.instance().createAssignToClassPayload();
      expect(payload.input.users[0].user_id.length === 3).toBeTruthy();
    });

    describe('save Buttons when students to assign classes and groups selected', () => {
      it('should close modal when save is pressed', () => {
        const selectedClass = mockClassesAndGroups.getIn(['classesAndGroups', 0, 'classes', 0]);
        const constCheckboxClasses = wrapper
          .instance()
          .createCheckBoxClassesAndGroups(selectedClass);
        wrapper.setState({ checkboxClasses: constCheckboxClasses });
        wrapper.instance().handleToggleGroupCheckbox('testGroup', true);
        expect(wrapper.state('checkboxClasses')[1].groups[0].checked).toBeTruthy();
        expect(wrapper.state('checkboxClasses')[1].checked).toBeTruthy();
        const saveButton = wrapper.find('#class-assign-modal__save-btn');
        saveButton.props().onClickHandler();
        expect(mockOnClose).toHaveBeenCalled();
      });
    });
  });

  describe('with class without groups ', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ClassAssignModal
          getClassesAndGroupsRequest={mockGetClassesAndGroupRequest}
          classAssignModalContainer={mockClassesNoGroups}
          onClose={mockOnClose}
          postAssignToClassRequest={mockPostAssignToClassRequest}
          searchRefreshOnSave={mockSearchRefreshOnSave}
          isOpen
          cohortTypeLabel={cohortLabel}
        />
      );
      const selectEvent = { preventDefault: jest.fn(), target: { value: 'testSchoolId' } };
      wrapper.instance().handleSchoolChange(selectEvent);
    });
    it('should handle the class checkbox toggle', () => {
      const selectedClass = mockClassesNoGroups.getIn(['classesAndGroups', 0, 'classes', 0]);
      const constCheckboxClasses = wrapper.instance().createCheckBoxClassesAndGroups(selectedClass);
      wrapper.setState({ checkboxClasses: constCheckboxClasses });
      expect(wrapper.state('checkboxClasses')[0].checked).toBeFalsy();
      wrapper.instance().handleToggleClassCheckbox('testClassWithoutGroupsId', true);
      expect(wrapper.state('checkboxClasses')[0].checked).toBeTruthy();
      wrapper.instance().handleToggleClassCheckbox('testClassWithoutGroupsId', false);
      expect(wrapper.state('checkboxClasses')[0].checked).toBeFalsy();
    });
  });

  describe('classes with and without groups ', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ClassAssignModal
          getClassesAndGroupsRequest={mockGetClassesAndGroupRequest}
          classAssignModalContainer={mockClassesWithAndWithoutGroups}
          onClose={mockOnClose}
          postAssignToClassRequest={mockPostAssignToClassRequest}
          searchRefreshOnSave={mockSearchRefreshOnSave}
          isOpen
          cohortTypeLabel={cohortLabel}
        />
      );
      const selectEvent = { preventDefault: jest.fn(), target: { value: 'testSchoolIdC' } };
      wrapper.instance().handleSchoolChange(selectEvent);
    });
    it('should handle the group checkbox toggle', () => {
      const selectedClass = mockClassesWithAndWithoutGroups.getIn([
        'classesAndGroups',
        0,
        'classes',
        0,
      ]);
      const constCheckboxClasses = wrapper.instance().createCheckBoxClassesAndGroups(selectedClass);
      wrapper.setState({ checkboxClasses: constCheckboxClasses });

      // operates on the second class, first group in the array
      expect(wrapper.state('checkboxClasses')[1].groups[0].checked).toBeFalsy();
      expect(wrapper.state('checkboxClasses')[1].checked).toBeFalsy();
      wrapper.instance().handleToggleGroupCheckbox('testGroupC2', true);
      expect(wrapper.state('checkboxClasses')[1].groups[0].checked).toBeTruthy();
      expect(wrapper.state('checkboxClasses')[1].checked).toBeTruthy();
      wrapper.instance().handleToggleGroupCheckbox('testGroupC2', false);
      expect(wrapper.state('checkboxClasses')[1].groups[0].checked).toBeFalsy();
      expect(wrapper.state('checkboxClasses')[1].checked).toBeTruthy();
    });
  });
});
