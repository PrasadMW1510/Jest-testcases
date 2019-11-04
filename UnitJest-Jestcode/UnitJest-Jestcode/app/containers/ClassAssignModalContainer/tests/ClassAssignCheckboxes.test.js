import React from 'react';
// import Immutable from 'immutable';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import ClassAssignCheckboxes from 'containers/ClassAssignModalContainer/ClassAssignCheckboxes';
describe('<ClassAssignCheckboxes />', () => {
  // class and group ID are guid styles in the SAM
  const mockToggleClassCheckbox = jest.fn();
  const mockToggleGroupCheckbox = jest.fn();
  const classesWithoutGroups2 = [
    {
      classId: '123',
      className: 'My Class A',
      checked: false,
      groups: [],
    },
    {
      classId: '343',
      className: 'My Class B',
      checked: false,
      groups: [],
    },
  ];
  const classesWithAndWithoutGroups2 = [
    {
      classId: ['123B'],
      className: ['Class 123 B'],
      groups: [''],
    },
    {
      classId: '343B',
      className: 'Class 343 B',
      groups: [
        {
          groupId: 'grp343_B_A',
          groupName: 'grpNAME_343_B_A',
        },
        {
          groupId: 'grp343_B_B',
          groupName: 'grpNAME_343_B_B',
        },
      ],
    },
  ];

  const classesWithGroups2 = [
    {
      classId: 'ugjj1ij48rgsd2pgndhdsj0o_2efa7f0',
      className: 'Class 123 C',
      checked: false,
      groups: [
        {
          groupId: '05jvgud8j45t7lm5thup1tpb_2efa7f0',
          groupName: 'grpNAME_ABC_C_A',
          checked: false,
        },
        {
          groupId: 'eqfpp6hrcj0tgco9mj545kh3_2efa7f0',
          groupName: 'grpNAME_XYZ_C_A',
          checked: false,
        },
      ],
    },
    {
      classId: '343C',
      className: 'Class 343 C',
      checked: false,
      groups: [
        {
          groupId: 'grp343A',
          groupName: 'grpNAME_343A',
          checked: false,
        },
        {
          groupId: 'grp343B',
          groupName: 'grpNAME_343B',
          checked: false,
        },
      ],
    },
  ];

  it('Expect it to render correctly', () => {
    const someClasses = classesWithoutGroups2;
    const wrapper = shallow(
      <ClassAssignCheckboxes
        checkboxClassesAndGroups={someClasses}
        toggleClassCheckbox={mockToggleClassCheckbox}
        toggleGroupCheckbox={mockToggleGroupCheckbox}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to render correctly when classes with Groups are passed', () => {
    const wrapper = shallow(
      <ClassAssignCheckboxes
        checkboxClassesAndGroups={classesWithGroups2}
        toggleClassCheckbox={mockToggleClassCheckbox}
        toggleGroupCheckbox={mockToggleGroupCheckbox}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('When new classes props are passed in', () => {
    it('Should render with new props', () => {
      const wrapper = shallow(
        <ClassAssignCheckboxes
          checkboxClassesAndGroups={classesWithoutGroups2}
          toggleClassCheckbox={mockToggleClassCheckbox}
          toggleGroupCheckbox={mockToggleGroupCheckbox}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
      const pClassWithGroups = fromJS(classesWithGroups2);
      wrapper.setProps({ classes: pClassWithGroups });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Should render when new props are same as existing props', () => {
      const someClasses = fromJS(classesWithoutGroups2);
      const wrapper = shallow(
        <ClassAssignCheckboxes
          checkboxClassesAndGroups={classesWithoutGroups2}
          toggleClassCheckbox={mockToggleClassCheckbox}
          toggleGroupCheckbox={mockToggleGroupCheckbox}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
      wrapper.setProps({ classes: someClasses });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('Checkbox Toggle behavior', () => {
    let wrapper = null;
    const CLS_CB_2 = 1; // 0 based
    beforeEach(() => {
      wrapper = shallow(
        <ClassAssignCheckboxes
          checkboxClassesAndGroups={classesWithGroups2}
          toggleClassCheckbox={mockToggleClassCheckbox}
          toggleGroupCheckbox={mockToggleGroupCheckbox}
        />
      );
    });
    it('Should render two checkboxes', () => {
      const classCheckbox = wrapper.find('.class-assign-modal__checkbox-row-input');
      expect(classCheckbox).toBeTruthy();
      expect(classCheckbox.length).toEqual(2);
    });

    it('When class checkbox is changed expect toggleClassCheckbox to have been called.', () => {
      const classCheckbox = wrapper.find('.class-assign-modal__checkbox-row-input').at(CLS_CB_2);
      classCheckbox.simulate('change', {
        target: { checked: true, id: '343C' },
      });
      expect(mockToggleClassCheckbox).toHaveBeenCalledTimes(1);
      classCheckbox.simulate('change', {
        target: { checked: false, id: '343C' },
      });
      expect(mockToggleClassCheckbox).toHaveBeenCalledTimes(2);
    });

    it('When group checkbox is changed expect toggleGroupCheckbox to have been called', () => {
      wrapper = shallow(
        <ClassAssignCheckboxes
          checkboxClassesAndGroups={classesWithAndWithoutGroups2}
          toggleClassCheckbox={mockToggleClassCheckbox}
          toggleGroupCheckbox={mockToggleGroupCheckbox}
        />
      );
      const GRP_TWO = 1; // 0 based
      const grpCheckbox = wrapper.find('.group-assign-modal__checkbox-row-input').at(GRP_TWO);
      grpCheckbox.simulate('change', {
        target: { checked: true, id: 'grp343_B_B' },
      });
      expect(mockToggleGroupCheckbox).toHaveBeenCalledTimes(1);
      // uncheck the second group checkbox
      grpCheckbox.simulate('change', {
        target: { checked: false, id: 'grp343_B_B' },
      });
      expect(mockToggleGroupCheckbox).toHaveBeenCalledTimes(2);
    });
  });
});
