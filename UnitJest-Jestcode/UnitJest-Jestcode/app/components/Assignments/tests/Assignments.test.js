import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Assignments from '../index';

describe('<Assignments />', () => {
  let wrapper = null;
  let wrapper1 = null;
  let wrapper2 = null;
  let wrappery = null;
  const props = {
    showIreadModal: jest.fn(),
    data: [
      {
        className: 'CLAS3Iread',
        community_id: 'R180NG',
      },
    ],
    showIreadAddModal: jest.fn(),
    showRead180NgAssaignmentModal: jest.fn(),
    assignmentcontainer: {
      communityId: 'S44JR',
      classId: '1adfp8k9nkpicco59aigb1b9_2efa7f0',
    },
    showCatchAllClassModal: jest.fn(),
    programList: [
      {
        class_id: '1adfp8k9nkpicco59aigb1b9_2efa7f0',
        grade_name: 'grade,test',
      },
    ],
  };
  const propsy = {
    showIreadModal: jest.fn(),
    data: [
      {
        className: 'CLAS3Iread',
        community_id: 'R180NG',
      },
    ],
    showIreadAddModal: jest.fn(),
    showRead180NgAssaignmentModal: jest.fn(),
    assignmentcontainer: {
      communityId: 'S44JR',
      // classId: '1adfp8k9nkpicco59aigb1b9_2efa7f0',
    },
    showCatchAllClassModal: jest.fn(),
    programList: [
      {
        class_id: '1adfp8k9nkpicco59aigb1b9_2efa7f0',
        grade_name: 'grade,test',
      },
    ],
  };
  const props1 = {
    showIreadModal: jest.fn(),
    data: [
      {
        className: 'CLAS3Iread',
        community_id: 'R180NG',
      },
    ],
    showIreadAddModal: jest.fn(),
    showRead180NgAssaignmentModal: jest.fn(),
    assignmentcontainer: {
      communityId: 'M180,M180Y2,S44JR,S44NG',
      classId: '1adfp8k9nkpicco59aigb1b9_2efa7f0',
    },
    showCatchAllClassModal: jest.fn(),
    programList: [
      {
        class_id: '1adfp8k9nkpicco59aigb1b9_2efa7f0',
        grade_name: 'grade,test',
      },
    ],
  };
  const props2 = {
    showIreadModal: jest.fn(),
    data: [
      {
        className: 'CLAS3Iread',
        community_id: 'R180NG',
      },
    ],
    showIreadAddModal: jest.fn(),
    showRead180NgAssaignmentModal: jest.fn(),
    assignmentcontainer: {
      communityId: 'S44NG',
      classId: '1adfp8k9nkpicco59aigb1b9_2efa7f0',
    },
    showCatchAllClassModal: jest.fn(),
    programList: [
      {
        class_id: '1adfp8k9nkpicco59aigb1b9_2efa7f0',
        grade_name: 'grade,test',
      },
    ],
  };
  wrapper = shallow(<Assignments {...props} />);
  wrapper1 = shallow(<Assignments {...props1} />);
  wrapper2 = shallow(<Assignments {...props2} />);
  wrappery = shallow(<Assignments {...propsy} />);

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(shallowToJson(wrapper1)).toMatchSnapshot();
    expect(shallowToJson(wrapper2)).toMatchSnapshot();
  });
  it('Expect to render handleNewAssignmentClick correctly', () => {
    let isEditable = null;
    isEditable = false;
    const index = 1;
    const clickedValue = {
      className: 'CLASS',
    };
    wrapper.instance().handleNewAssignmentClick(clickedValue, isEditable, index);
    expect(wrapper.instance().props.index).toMatchSnapshot();
  });
  it('Expect to render handleNewAssignmentClick correctly', () => {
    let isEditable = null;
    isEditable = false;
    const index = 1;
    const clickedValue = {
      className: 'CLASS',
    };
    wrapper1.instance().handleNewAssignmentClick(clickedValue, isEditable, index);
    expect(wrapper1.instance().props.index).toMatchSnapshot();
  });
  it('Expect to render handleNewAssignmentClick correctly', () => {
    let isEditable = null;
    isEditable = false;
    const index = 1;
    const clickedValue = {
      className: 'CLASS',
    };
    wrapper2.instance().handleNewAssignmentClick(clickedValue, isEditable, index);
    expect(wrapper2.instance().props.index).toMatchSnapshot();
  });
  it('Expect to render handleNewAssignmentClick correctly', () => {
    let isEditable = null;
    isEditable = false;
    const index = 1;
    const clickedValue = {
      className: 'CLASS',
    };
    wrappery.instance().handleNewAssignmentClick(clickedValue, isEditable, index);
    expect(wrappery.instance().props.index).toMatchSnapshot();
  });
  it('on click', () => {
    wrapper
      .find('.assignment-btn .assignments-add-btn')
      .at(0)
      .simulate('change', {
        target: {
          checked: false,
        },
      });
    expect(wrapper.find('.assignment-btn .assignments-add-btn')).toHaveLength(1);
  });
  it('Expect to render toggleAllCheckboxes correctly', () => {
    const isChecked = true;
    const itemIds = [];
    wrapper.instance().toggleAllCheckboxes(isChecked, itemIds);
    expect(wrapper.instance().props.isChecked).toMatchSnapshot();
  });
  it('Expect to render handleRowSelections correctly', () => {
    const isChecked = true;
    const itemId = [];
    const row = 1;
    wrapper.setState({
      searchResultsIdsChecked: [
        {
          itemId: 1,
        },
      ],
    });
    wrapper.instance().handleRowSelections(isChecked, itemId, row);
    expect(wrapper.instance().props.row).toMatchSnapshot();
  });
  it('Expect to render handleRowSelections correctly', () => {
    const isChecked = false;
    const itemId = [];
    const row = 1;
    wrapper.setState({
      searchResultsIdsChecked: [
        {
          itemId: 1,
        },
      ],
    });
    wrapper.instance().handleRowSelections(isChecked, itemId, row);
    expect(wrapper.instance().props.row).toMatchSnapshot();
  });
  it('Expect to render handleClick correctly', () => {
    const metaData = '';
    let isEditable = false;
    isEditable = false;
    const index = 1;
    const clickedValue = 1;
    wrapper.instance().handleClick(clickedValue, isEditable, index, metaData);
    expect(wrapper.instance().props.index).toMatchSnapshot();
  });
  // it('Expect to render handleNewAssignmentClick correctly', () => {
  //   let isEditable = null;
  //   isEditable = false;
  //   const index = 1;
  //   const clickedValue = {
  //     className: 'CLAS3Iread',
  //   };
  //   wrapper.instance().handleNewAssignmentClick(clickedValue, isEditable, index);
  //   expect(wrapper.instance().props.index).toMatchSnapshot();
  // });
  it('Expect to render closeAssignmentUpdate correctly', () => {
    wrapper.instance().closeAssignmentUpdate();
    expect(wrapper.state('showAssignmentUpdate')).toBeFalsy();
  });
  it('Expect to render closeGradeWarning correctly', () => {
    wrapper.instance().closeGradeWarning();
    expect(wrapper.state('isGradeValidForAssignment')).toBeTruthy();
  });
  // it('on click', () => {
  //   wrapper.find('.assignments-add-btn').simulate('click', {});
  // });
});
describe('<Assignments />', () => {
  let wrapper1 = null;
  const props1 = {
    showIreadModal: jest.fn(),
    data: [
      {
        className: undefined,
      },
    ],
    // selectedClass: true,
    showIreadAddModal: jest.fn(),
    showRead180NgAssaignmentModal: jest.fn(),
    assignmentcontainer: {
      communityId: 'R180NG',
    },
    programList: {},
  };
  wrapper1 = shallow(<Assignments {...props1} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper1)).toMatchSnapshot();
  });
  it('Expect to render handleNewAssignmentClick correctly', () => {
    let isEditable = null;
    isEditable = false;
    const index = 1;
    const clickedValue = {
      className: 'CLAS3Iread',
    };
    wrapper1.instance().handleNewAssignmentClick(clickedValue, isEditable, index);
    expect(wrapper1.instance().props.index).toMatchSnapshot();
  });

  it('Expect to render handleNewAssignmentClick correctly', () => {
    let isEditable = null;
    isEditable = false;
    const index = 1;
    const clickedValue = {
      className: 'CLASS',
    };
    wrapper1.instance().handleNewAssignmentClick(clickedValue, isEditable, index);
    expect(wrapper1.instance().props.index).toMatchSnapshot();
  });
});

describe('<Assignments />', () => {
  let wrapper2 = null;
  const props2 = {
    showIreadModal: jest.fn(),
    data: [],
    // selectedClass: true,
    showIreadAddModal: jest.fn(),
    showRead180NgAssaignmentModal: jest.fn(),
    assignmentcontainer: {
      communityId: 'M180Y2',
    },
    programList: {},
  };
  wrapper2 = shallow(<Assignments {...props2} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper2)).toMatchSnapshot();
  });
  it('Expect to render handleNewAssignmentClick correctly', () => {
    let isEditable = null;
    isEditable = false;
    const index = 1;
    const clickedValue = {
      className: 'CLASS',
    };
    wrapper2.instance().handleNewAssignmentClick(clickedValue, isEditable, index);
    expect(wrapper2.instance().props.index).toMatchSnapshot();
  });
});
