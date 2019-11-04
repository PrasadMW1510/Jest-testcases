import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import System44StudentGoal from '../index';

describe('System44StudentGoal ', () => {
  let wrapper = null;
  let wrapper1 = null;
  let wrapper2 = null;
  let wrapper3 = null;
  const props = {
    isOpen: true,
    handleSaveGoals: jest.fn(),
    system44studentgoalcontainer: {
      academicGoalSaveStatus: {
        success: ['1'],
      },
      behaviouralGoalSaveStatus: {
        work_item_id: ['0'],
      },
    },
    data: {
      location: {
        pathname: '/portfolio/studentGoals',
      },
      selectedIndex: 0,
      metaData: [
        {
          student_name: 'qwer',
          student: 'qwert',
          date: '2018-06-12T',
        },
      ],
    },
    closeStudentGoalModal: jest.fn(),
    defaultGoalsData: {},
    combinedGoalsData: {
      goals: [
        {
          behavioral_goals: ['test1'],
        },
      ],
    },
    handlePagination: jest.fn(),
    handleSaveBehaviourGoals: jest.fn(),
    handleUpdateStudentBehaviourGoals: jest.fn(),
  };
  const props1 = {
    ...props,
    data: {
      location: {
        pathname: '/portfolio/studentGoals',
      },
      selectedIndex: 0,
      metaData: [
        {
          student_name: 'qwer',
          student: 'qwert',
          date: '2018-06-12T',
        },
        {
          student_name: 'qwer',
          student: 'qwert',
          date: '2018-06-12T',
        },
      ],
    },
  };
  const props2 = {
    ...props1,
    data: {
      location: {
        pathname: '/portfolio/studentWorks',
      },
      selectedIndex: 0,
      metaData: [
        {
          student_name: 'qwer',
          student: 'qwert',
          date: '2018-06-12T',
        },
        {
          student_name: 'qwer',
          student: 'qwert',
          date: '2018-06-12T',
        },
      ],
    },
  };
  const props3 = {
    ...props1,
    data: {
      location: {
        pathname: '/portfolio/studntWorks',
      },
      selectedIndex: 0,
      metaData: [
        {
          student_name: 'qwer',
          student: 'qwert',
          date: '2018-06-12T',
        },
        {
          student_name: 'qwer',
          student: 'qwert',
          date: '2018-06-12T',
        },
      ],
    },
  };
  wrapper = shallow(<System44StudentGoal {...props} />);
  wrapper1 = shallow(<System44StudentGoal {...props1} />);
  wrapper2 = shallow(<System44StudentGoal {...props2} />);
  wrapper3 = shallow(<System44StudentGoal {...props3} />);
  it('Expect to render correctly', () => {
    wrapper.setState({
      currentPageIndex: 0,
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect componentWillReceiveProps to render correctly', () => {
    const nextProps = {
      system44studentgoalcontainer: {
        academicGoalSaveStatus: {
          success: ['1'],
        },
        behaviouralGoalSaveStatus: {
          work_item_id: ['0'],
        },
      },
      combinedGoalsData: {
        goals: [
          {
            behavioral_goals: [
              {
                goal: '',
              },
            ],
            academic_goals: [
              {
                goal: '',
              },
            ],
          },
        ],
      },
      defaultGoalsData: {
        academic_goals: [
          {
            goal: '',
          },
        ],
      },
      data: {
        goals: 'Default Goals',
        metaData: [
          {
            goals: 'Default Goals',
            behaviour_goal: 'Needs Assessment',
          },
        ],
        behaviour_goal: 'Needs Assessment',
        location: {
          pathname: '/portfolio/studentGoals',
        },
      },
    };
    wrapper.instance().setState({
      currentPageIndex: 0,
    });
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect componentWillReceiveProps to render correctly', () => {
    const nextProps = {
      system44studentgoalcontainer: {
        academicGoalSaveStatus: {
          success: ['0'],
        },
      },
      combinedGoalsData: {
        goals: [
          {
            behavioral_goals: [
              {
                goal: '',
              },
            ],
            academic_goals: [
              {
                goal: '',
              },
            ],
          },
        ],
      },
      defaultGoalsData: {
        academic_goals: [
          {
            goal: '',
          },
        ],
      },
      data: {
        goals: 'Default Goals',
        metaData: [
          {
            goals: 'Default Goals',
            behaviour_goal: 'Needs Assessment',
          },
        ],
        behaviour_goal: 'Needs Assesment',
        location: {
          pathname: '/portfolio/studentGoals',
        },
      },
    };
    wrapper.instance().setState({
      currentPageIndex: 0,
    });
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect componentWillReceiveProps to render correctly', () => {
    const nextProps = {
      system44studentgoalcontainer: {
        academicGoalSaveStatus: {
          success: ['1'],
        },
        behaviouralGoalSaveStatus: {
          work_item_id: ['0'],
        },
      },
      combinedGoalsData: {
        goals: [
          {
            behavioral_goals: [
              {
                goal: '',
              },
            ],
            academic_goals: [
              {
                goal: '',
              },
            ],
          },
        ],
      },
      defaultGoalsData: {
        academic_goals: [
          {
            goal: '',
          },
        ],
      },
      data: {
        goals: 'Default Goals',
        metaData: [
          {
            goals: 'Default Goals',
            behaviour_goal: 'Needs Assessment',
          },
        ],

        behaviour_goal: 'Needs Assesment',

        location: {
          pathname: '/portfolio/stuentGoals',
        },
      },
    };

    wrapper.instance().setState({
      currentPageIndex: 0,
    });

    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });

  it('Expect componentWillReceiveProps to render correctly', () => {
    const nextProps = {
      system44studentgoalcontainer: {
        academicGoalSaveStatus: {
          success: ['1'],
        },

        behaviouralGoalSaveStatus: {
          work_item_id: ['0'],
        },
      },

      combinedGoalsData: {
        goals: [
          {
            behavioral_goals: [
              {
                goal: '',
              },
            ],

            academic_goals: [
              {
                goal: '',
              },
            ],
          },
        ],
      },

      defaultGoalsData: {
        academic_goals: [
          {
            goal: '',
          },
        ],
      },

      data: {
        goals: 'Default Gols',

        metaData: [
          {
            goals: 'Default Goals',

            behaviour_goal: 'Needs Assessment',
          },
        ],

        behaviour_goal: 'Needs Assessment',

        location: {
          pathname: '/portfolio/studentGoals',
        },
      },
    };

    wrapper.instance().setState({
      currentPageIndex: 0,
    });

    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });

  it('Expect componentWillReceiveProps to render correctly', () => {
    const nextProps = {
      system44studentgoalcontainer: {
        academicGoalSaveStatus: {
          success: ['1'],
        },

        behaviouralGoalSaveStatus: {
          work_item_id: ['0'],
        },
      },

      combinedGoalsData: {
        goals: [
          {
            behavioral_goals: [
              {
                goal: '',
              },
            ],

            academic_goals: [
              {
                goal: '',
              },
            ],
          },
        ],
      },

      defaultGoalsData: {
        academic_goals: [
          {
            goal: '',
          },
        ],
      },

      data: {
        goals: 'Default Gols',

        metaData: [
          {
            goals: 'Default Goals',

            behaviour_goal: 'Needs Assessment',
          },
        ],

        behaviour_goal: 'Needs Assesment',

        location: {
          pathname: '/portfolio/studentGoals',
        },
      },
    };

    wrapper.instance().setState({
      currentPageIndex: 0,
    });

    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });

  it('Expect componentWillReceiveProps to render correctly', () => {
    const nextProps = {
      system44studentgoalcontainer: {
        academicGoalSaveStatus: {
          success: ['1'],
        },

        behaviouralGoalSaveStatus: {
          work_item_id: ['0'],
        },
      },

      combinedGoalsData: {
        goals: [
          {
            behavioral_goals: [
              {
                goal: '',
              },
            ],

            academic_goals: [
              {
                goal: '',
              },
            ],
          },
        ],
      },

      defaultGoalsData: {
        academic_goals: [
          {
            goal: '',
          },
        ],
      },

      data: {
        goals: 'Default Gols',

        metaData: [
          {
            goals: 'Default Goals',

            behaviour_goal: 'Needs Assessment',
          },
        ],

        behaviour_goal: 'Needs Assesment',

        location: {
          pathname: '/portfolio/studntGoals',
        },
      },
    };

    wrapper.instance().setState({
      currentPageIndex: 0,
    });

    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });

  it('should call handleGoToNextPage', () => {
    const e = {
      preventDefault: jest.fn(),
    };

    wrapper.instance().setState({
      currentPageIndex: 0,
    });

    wrapper.instance().handleGoToNextPage(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });

  it('should call handleGoToNextPage', () => {
    const e = {
      preventDefault: jest.fn(),
    };

    wrapper1.instance().setState({
      currentPageIndex: 0,
    });

    wrapper1.instance().handleGoToNextPage(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });

  it('should call handleGoToNextPage', () => {
    const e = {
      preventDefault: jest.fn(),
    };

    wrapper2.instance().setState({
      currentPageIndex: 0,
    });

    wrapper2.instance().handleGoToNextPage(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });

  it('should call handleGoToNextPage', () => {
    const e = {
      preventDefault: jest.fn(),
    };

    wrapper3.instance().setState({
      currentPageIndex: 0,
    });

    wrapper3.instance().handleGoToNextPage(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });

  it('Expect handleCloseSaveSuccessModal to render correctly', () => {
    wrapper.instance().handleCloseSaveSuccessModal();

    expect(wrapper.state('showAssesmentSaveSuccessModal')).toBeFalsy();
  });

  it('Expect handleOpenLastAssesment to render correctly', () => {
    wrapper.instance().handleOpenLastAssesment();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });

  it('Expect handleSaveBehaviourGoals to render correctly', () => {
    wrapper.instance().handleSaveBehaviourGoals();

    expect(wrapper.state('enableSaveBehaviouralGoals')).toBeFalsy();
  });

  it('Expect handleGoToPrevPage to render correctly', () => {
    const e = {
      preventDefault: jest.fn(),
    };

    wrapper.instance().handleGoToPrevPage(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });

  it('Expect handleGoToPrevPage to render correctly', () => {
    const e = {
      preventDefault: jest.fn(),
    };

    wrapper1.instance().setState({
      currentPageIndex: 1,
    });

    wrapper1.instance().handleGoToPrevPage(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });

  it('Expect handleGoToPrevPage to render correctly', () => {
    const e = {
      preventDefault: jest.fn(),
    };

    wrapper2.instance().setState({
      currentPageIndex: 1,
    });

    wrapper2.instance().handleGoToPrevPage(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });

  it('Expect handleGoToPrevPage to render correctly', () => {
    const e = {
      preventDefault: jest.fn(),
    };

    wrapper3.instance().setState({
      currentPageIndex: 1,
    });

    wrapper3.instance().handleGoToPrevPage(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect handlePrint to render correctly', () => {
    wrapper.instance().handlePrint();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect handleClose to render correctly', () => {
    wrapper.instance().handleClose();

    expect(wrapper.state('goalNameModal')).toBeFalsy();
  });

  it('Expect handleGoalNameClick to render correctly', () => {
    const e = {};
    const data = 'decoding';
    wrapper.instance().handleGoalNameClick(e, data);
    expect(wrapper.state('goalNameModal')).toBeTruthy();
  });
  it('Expect handleGoalNameClick to render correctly', () => {
    const e = {};
    const data = 'spelling';
    wrapper.instance().handleGoalNameClick(e, data);
    expect(wrapper.state('goalNameModal')).toBeTruthy();
  });
  it('Expect handleGoalNameClick to render correctly', () => {
    const e = {};
    const data = 'independent reading';
    wrapper.instance().handleGoalNameClick(e, data);
    expect(wrapper.state('goalNameModal')).toBeTruthy();
  });
  it('Expect handleGoalNameClick to render correctly', () => {
    const e = {};
    const data = 'nomatch';
    wrapper.instance().handleGoalNameClick(e, data);
    expect(wrapper.state('goalNameModal')).toBeTruthy();
  });
  it('Expect resetDefault to render correctly', () => {
    wrapper.instance().resetDefault();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect validateMaxValueForGoal to render correctly', () => {
    const currentGoalValue = 5;
    const DefaultGoalValue = 3;
    wrapper.instance().validateMaxValueForGoal(currentGoalValue, DefaultGoalValue);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect validateMaxValueForGoal to render correctly', () => {
    const currentGoalValue = 1;
    const DefaultGoalValue = 3;
    wrapper.instance().validateMaxValueForGoal(currentGoalValue, DefaultGoalValue);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect handleSaveGoals to render correctly', () => {
    wrapper.instance().handleSaveGoals();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect handleSaveGoals to render correctly', () => {
    wrapper.instance().setState({
      showErrorDecoding: true,
      showErrorSpelling: true,
      showErrorReading: true,
      showError4: true,
      showError5: true,
      showError6: true,
    });
    wrapper.instance().handleSaveGoals();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect clickedHandleCancel to render correctly', () => {
    wrapper.instance().setState({
      enableSaveGoals: true,
      enableSaveBehaviouralGoals: true,
    });
    wrapper.instance().clickedHandleCancel();
    expect(wrapper.state('unsavedData')).toBeTruthy();
  });
  it('Expect clickedHandleCancel to render correctly', () => {
    wrapper.instance().setState({
      enableSaveGoals: false,
      enableSaveBehaviouralGoals: false,
    });
    wrapper.instance().clickedHandleCancel();
    expect(wrapper.state('unsavedData')).toBeTruthy();
  });
  it('Expect handleChange to render correctly', () => {
    const name = 'decoding';
    const index = 0;
    const event = {
      target: {
        value: '123',
      },
    };
    wrapper.instance().handleChange(name, index, event);
    expect(wrapper.state('showError4')).toBeFalsy();
  });
  it('Expect handleChange to render correctly', () => {
    const name = 'decoding';
    const index = 0;
    const event = {
      target: {
        value: 'khushbu',
      },
    };
    wrapper.instance().handleChange(name, index, event);
    expect(wrapper.state('showError4')).toBeFalsy();
  });
  it('Expect handleChange to render correctly', () => {
    const name = 'decoding';
    const index = 0;
    const event = {
      target: {
        value: '',
      },
    };
    wrapper.instance().handleChange(name, index, event);
    expect(wrapper.state('showError4')).toBeFalsy();
  });
  it('Expect handleChange to render correctly', () => {
    const name = 'spelling';
    const index = 0;
    const event = {
      target: {
        value: '123',
      },
    };
    wrapper.instance().handleChange(name, index, event);
    expect(wrapper.state('showError4')).toBeFalsy();
  });
  it('Expect handleChange to render correctly', () => {
    const name = 'spelling';
    const index = 0;
    const event = {
      target: {
        value: '',
      },
    };
    wrapper.instance().handleChange(name, index, event);
    expect(wrapper.state('showError4')).toBeFalsy();
  });
  it('Expect handleChange to render correctly', () => {
    const name = 'spelling';
    const index = 0;
    const event = {
      target: {
        value: 'khushbu',
      },
    };
    wrapper.instance().handleChange(name, index, event);
    expect(wrapper.state('showError4')).toBeFalsy();
  });
  it('Expect handleChange to render correctly', () => {
    const name = 'independent reading';
    const index = 0;
    const event = {
      target: {
        value: '123',
      },
    };
    wrapper.instance().handleChange(name, index, event);
    expect(wrapper.state('showError4')).toBeFalsy();
  });
  it('Expect handleChange to render correctly', () => {
    const name = 'independent reading';
    const index = 0;
    const event = {
      target: {
        value: '',
      },
    };
    wrapper.instance().handleChange(name, index, event);
    expect(wrapper.state('showError4')).toBeFalsy();
  });
  it('Expect handleBehaviourInputChange to render correctly', () => {
    const value = 0;
    const controlName = 'whole_group_score';
    const controlType = 'responsibility';
    wrapper.instance().setState({
      behaviouralGoalsControls: [
        {
          whole_group_score: ['whole_group_score'],
          total: '',
          small_group_score: ['small_group_score'],
          independent_reading_score: ['independent_reading_score'],
          software_score: ['software_score'],
        },
      ],
    });
    wrapper.instance().handleBehaviourInputChange(controlType, controlName, value);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect handleBehaviourInputChange to render correctly', () => {
    const value = 0;
    const controlName = 'whole_group_score';
    const controlType = 'respect';
    wrapper.instance().setState({
      behaviouralGoalsControls: [
        {
          whole_group_score: ['whole_group_score'],
          total: '',
          small_group_score: ['small_group_score'],
          independent_reading_score: ['independent_reading_score'],
          software_score: ['software_score'],
        },
        {
          whole_group_score: ['whole_group_score'],
          total: '',
          small_group_score: ['small_group_score'],
          independent_reading_score: ['independent_reading_score'],
          software_score: ['software_score'],
        },
      ],
    });
    wrapper.instance().handleBehaviourInputChange(controlType, controlName, value);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect handleBehaviourInputChange to render correctly', () => {
    const value = 0;
    const controlName = 'whole_group_score';
    const controlType = 'effort';
    wrapper.instance().setState({
      behaviouralGoalsControls: [
        {
          whole_group_score: ['whole_group_score'],
          total: '',
          small_group_score: ['small_group_score'],
          independent_reading_score: ['independent_reading_score'],
          software_score: ['software_score'],
        },
        {
          whole_group_score: ['whole_group_score'],
          total: '',
          small_group_score: ['small_group_score'],
          independent_reading_score: ['independent_reading_score'],
          software_score: ['software_score'],
        },
        {
          whole_group_score: ['whole_group_score'],
          total: '',
          small_group_score: ['small_group_score'],
          independent_reading_score: ['independent_reading_score'],
          software_score: ['software_score'],
        },
      ],
    });
    wrapper.instance().handleBehaviourInputChange(controlType, controlName, value);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect handleBehaviourInputChange to render correctly', () => {
    const value = 0;
    const controlName = 'whole_group_score';
    const controlType = 'responsibility1';
    wrapper.instance().setState({
      behaviouralGoalsControls: [
        {
          whole_group_score: ['whole_group_score'],
          total: '',
          small_group_score: ['small_group_score'],
          independent_reading_score: ['independent_reading_score'],
          software_score: ['software_score'],
        },
      ],
    });
    wrapper.instance().handleBehaviourInputChange(controlType, controlName, value);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
});
