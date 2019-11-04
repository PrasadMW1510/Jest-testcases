import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Read180Ng from '../index';

describe('<Read180Ng />', () => {
  const props = {
    deleteAssignment: jest.fn(),
    handleCancel: jest.fn(),
    onPreview: jest.fn(),
    read180ngcontainer: {
      read180Program: {
        results: {
          workItems: [
            {
              classAssignmentWorkItem: [
                {
                  $: {
                    workItemId: '',
                  },
                  classAssignmentGroup: [
                    {
                      assignmentType: 'test',
                      assignmentName: 'test1',
                      dueDate: ['2018-07-07'],
                      $: {
                        wholeClass: '',
                      },
                      classAssignment: [
                        {
                          $: {
                            communityId: '',
                          },
                          studentAssignments: [
                            {
                              student: [
                                {
                                  userId: '1',
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    },
    postRead180NgDataSubmit: jest.fn(),
    data: {
      workItemId: '123',
    },
  };
  const wrapper = shallow(<Read180Ng {...props} />);
  it('Expect to render component', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to call handleChange if index is 1', () => {
    const index = 1;
    const event = {
      target: {
        checked: true,
      },
    };
    wrapper.instance().handleChange(index, event);
    expect(wrapper.instance().props.isOpen).toBeFalsy();
  });
  it('Expect to call handleChange if index is 2', () => {
    const index = 2;
    const event = {
      target: {
        checked: true,
      },
    };
    wrapper.instance().handleChange(index, event);
    expect(wrapper.instance().props.isOpen).toBeFalsy();
  });
  it('Expect to call handleChange if index is 3', () => {
    const index = 3;
    const event = {
      target: {
        checked: true,
      },
    };
    wrapper.instance().handleChange(index, event);
    expect(wrapper.instance().props.isOpen).toBeFalsy();
  });
  it('Expect to call handlePreview', () => {
    wrapper.instance().handlePreview();
    expect(wrapper.instance().props.isOpen).toBeFalsy();
  });
  it('Expect to call componentWillReceiveProps ', () => {
    const nextprops = {
      data: {
        currentIndex: 0,
        allData: [
          {
            student: 'student',
          },
        ],
      },
      read180ngcontainer: {
        read180Program: {
          results: {
            workItems: [
              {
                classAssignmentWorkItem: [
                  {
                    classAssignmentGroup: [
                      {
                        classAssignment: [
                          {
                            studentAssignments: [
                              {
                                student: [
                                  {
                                    score: 2,
                                    total: 3,
                                    average: 4,
                                    comment: '',
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      },
      portfolioPageContainer: {
        studentSubmissions: {
          results: [
            {
              $: {
                studentLastName: 'sinha',
                studentFirstName: 'khushbu',
              },
            },
          ],
        },
      },
    };
    wrapper.instance().componentWillReceiveProps(nextprops);
    expect(wrapper.instance().props.isOpen).toBeFalsy();
  });
  it('Expect to call createDeleteWarningModal ', () => {
    wrapper.setState({
      delWarningModal: true,
    });
    wrapper.instance().createDeleteWarningModal();
    expect(props.deleteAssignment.mock.calls.length).toBe(1);
  });
  it('Expect to call createSaveWarningModal ', () => {
    wrapper.setState({
      average: '',
      score: 1,
      total: 2,
    });
    wrapper.instance().createSaveWarningModal();
    expect(wrapper.instance().props.isOpen).toBeFalsy();
  });
  it('Expect to call createSaveWarningModal ', () => {
    wrapper.setState({
      average: 3,
      score: 2,
      total: '',
    });
    wrapper.instance().createSaveWarningModal();
    expect(wrapper.instance().props.isOpen).toBeFalsy();
  });
  it('Expect to call delWarningModalClose ', () => {
    wrapper.instance().delWarningModalClose();
    expect(wrapper.instance().props.isOpen).toBeFalsy();
  });
  it('Expect to call delWarningModalProceed  ', () => {
    wrapper.instance().delWarningModalProceed();
    expect(wrapper.instance().props.isOpen).toBeFalsy();
  });
  it('Expect to call saveWarningModalClose ', () => {
    wrapper.instance().saveWarningModalClose();
    expect(wrapper.instance().props.isOpen).toBeFalsy();
  });
  it('Expect to call saveWarningModalProceed ', () => {
    wrapper.instance().saveWarningModalProceed();
    expect(wrapper.instance().props.isOpen).toBeFalsy();
  });
  it('Expect to call withoutSaveWarningModalClose ', () => {
    wrapper.instance().withoutSaveWarningModalClose();
    expect(wrapper.instance().props.isOpen).toBeFalsy();
  });
  it('Expect to call closeModal ', () => {
    wrapper.setState({
      saveClass: true,
    });
    wrapper.instance().closeModal();
    expect(wrapper.instance().props.isOpen).toBeFalsy();
  });
  it('Expect to call closeModal ', () => {
    wrapper.setState({
      saveClass: false,
    });
    wrapper.instance().closeModal();
    expect(props.handleCancel.mock.calls.length).toBe(2);
  });
  it('Expect to call gradePercent ', () => {
    wrapper.setState({
      score: 20,
      total: 10,
    });
    wrapper.instance().gradePercent();
    expect(wrapper.instance().props.isOpen).toBeFalsy();
  });
  it('Expect to call gradePercent ', () => {
    wrapper.setState({
      score: '',
      total: '',
    });
    wrapper.instance().gradePercent();
    expect(wrapper.instance().props.isOpen).toBeFalsy();
  });
  it('Expect to call gradeChanges ', () => {
    const e = {
      target: {
        name: 'score',
        value: '12',
      },
    };
    wrapper.setState({
      score: 'a',
      total: 'b',
    });
    wrapper.instance().gradeChanges(e);
    expect(wrapper.instance().props.isOpen).toBeFalsy();
  });
  it('Expect to call gradeChanges ', () => {
    const e = {
      target: {
        name: 'average',
        value: '12',
      },
    };
    wrapper.setState({
      score: 'a',
      total: 'b',
    });
    wrapper.instance().gradeChanges(e);
    expect(wrapper.instance().props.isOpen).toBeFalsy();
  });
  it('Expect to call gradeChanges ', () => {
    const e = {
      target: {
        name: 'qwer',
        value: '123',
      },
    };
    wrapper.setState({
      score: 'a',
      total: 'b',
    });
    wrapper.instance().gradeChanges(e);
    expect(wrapper.instance().props.isOpen).toBeFalsy();
  });
  it('Expect to call gradeChanges ', () => {
    const e = {
      target: {
        value: 'asd',
      },
    };
    wrapper.setState({
      score: 'a',
      total: 'b',
    });
    wrapper.instance().gradeChanges(e);
    expect(wrapper.instance().props.isOpen).toBeFalsy();
  });
  it('Expect to simulate onChange event handler1', () => {
    const changeButton = wrapper.find('.print-read180ng-modal-assignment-wrapper input');
    wrapper
      .find('.print-read180ng-modal-assignment-wrapper input')
      .at(0)
      .simulate('change', {
        target: {
          checked: false,
        },
      });
    expect(changeButton.exists()).toBeTruthy();
  });
  it('Expect to simulate onChange event handler2', () => {
    const changeButton = wrapper.find('.print-read180ng-modal-assignment-wrapper input');
    wrapper
      .find('.print-read180ng-modal-assignment-wrapper input')
      .at(1)
      .simulate('change', {
        target: {
          checked: false,
        },
      });
    expect(changeButton.exists()).toBeTruthy();
  });
});
describe('<Read180Ng />', () => {
  const props = {
    deleteAssignment: jest.fn(),
    handleCancel: jest.fn(),
    onPreview: jest.fn(),
    read180ngcontainer: {
      read180Program: {
        results: {
          workItems: [
            {
              classAssignmentWorkItem: [
                {
                  $: {
                    workItemId: '',
                  },
                  classAssignmentGroup: [
                    {
                      assignmentType: 'test',
                      assignmentName: 'test1',
                      dueDate: ['2018-07-07'],
                      $: {
                        wholeClass: '',
                      },
                      classAssignment: [
                        {
                          $: {
                            communityId: '',
                          },
                          studentAssignments: [
                            {
                              student: [
                                {
                                  userId: '1',
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    },
    postRead180NgDataSubmit: jest.fn(),
    data: {
      workItemId: '123',
    },
  };
  const wrapper = shallow(<Read180Ng {...props} />);
  it('Expect to render component', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to call componentWillReceiveProps ', () => {
    const nextprops = {
      data: {
        currentIndex: 0,
        allData: [
          {
            student: 'student',
          },
        ],
      },
      read180ngcontainer: {
        read180Program: {
          results: {
            workItems: [
              {
                classAssignmentWorkItem: [
                  {
                    classAssignmentGroup: [
                      {
                        classAssignment: [
                          {
                            studentAssignments: [
                              {
                                student: [undefined],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      },
      portfolioPageContainer: {
        studentSubmissions: {
          results: [
            {
              $: {
                studentLastName: 'sinha',
                studentFirstName: 'khushbu',
              },
            },
          ],
        },
      },
    };
    wrapper.instance().componentWillReceiveProps(nextprops);
    expect(wrapper.instance().props.isOpen).toBeFalsy();
  });
});
