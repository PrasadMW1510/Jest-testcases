import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';

import { OK_CANCEL_MODAL } from 'containers/ModalController/constants';

import * as Constants from '../constants';
import TopicManagerStudentViewR180EE from '../index';

describe('<TopicManagerStudentViewR180EE />', () => {
  let wrapper = null;
  let wrapperInstance = null;

  let mockHandleTopicSave = null;
  let mockSetIsolateTab = null;
  let mockShowModal = null;
  let mockTopicCd = null;
  let mockTopicManager = null;

  let mockEvent = null;

  beforeEach(() => {
    mockHandleTopicSave = jest.fn();
    mockSetIsolateTab = jest.fn();
    mockShowModal = jest.fn();

    mockTopicCd = [
      {
        enable: ['1'],
        cd_name: ['A01'],
        supplimental: ['0'],
        topic_name: ['Can You Believe it?'],
        current_segment: ['0'],
        segment1_name: ['Crazy Horse'],
        segment2_name: ['Polar Bears'],
        segment3_name: ['Art Cars'],
        segment4_name: ["I'm No Clown"],
        globally_enabled: ['1'],
      },
      {
        enable: ['0'],
        cd_name: ['A10'],
        supplimental: ['0'],
        topic_name: ['Mummies, Bones and Garbage'],
        current_segment: ['0'],
        segment1_name: ['The Great Dino Debate'],
        segment2_name: ['Mysteries of the Mummy'],
        segment3_name: ['Ancient Guards'],
        segment4_name: ['Tracing Trash'],
        globally_enabled: ['1'],
      },
      {
        enable: ['1'],
        cd_name: ['B01'],
        supplimental: ['0'],
        topic_name: ['Art Attack'],
        current_segment: ['1'],
        segment1_name: ['Crop Art'],
        segment2_name: ['Halls of Fame'],
        segment3_name: ['Young at Art'],
        segment4_name: ['STOMP'],
        globally_enabled: ['1'],
      },
    ];
  });

  describe('student_level is not set', () => {
    beforeEach(() => {
      mockTopicManager = fromJS({
        topics: {
          topic_cd: mockTopicCd,
        },
      });

      wrapper = shallow(
        <TopicManagerStudentViewR180EE
          handleTopicSave={mockHandleTopicSave}
          isTabIsolated={false}
          setIsolateTab={mockSetIsolateTab}
          showModal={mockShowModal}
          settingsStudentLevel={'2'}
          topicManager={mockTopicManager}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('noStudentLevel is true', () => {
      expect(wrapper.state('noStudentLevel')).toBeTruthy();
    });
  });

  describe('student_level is set', () => {
    describe('all current_segments are 0', () => {
      beforeEach(() => {
        mockTopicCd[2].current_segment = ['0'];
      });

      describe('student_level is 1', () => {
        beforeEach(() => {
          mockTopicManager = fromJS({
            topics: {
              student_level: ['1'],
              topic_cd: mockTopicCd,
            },
          });

          wrapper = shallow(
            <TopicManagerStudentViewR180EE
              handleTopicSave={mockHandleTopicSave}
              isTabIsolated={false}
              setIsolateTab={mockSetIsolateTab}
              showModal={mockShowModal}
              settingsStudentLevel={'2'}
              topicManager={mockTopicManager}
            />
          );
        });

        it('Expect to render correctly', () => {
          expect(shallowToJson(wrapper)).toMatchSnapshot();
        });

        it('state is set correctly', () => {
          const currentSegmentObj = mockTopicCd[0];
          expect(wrapper.state('noStudentLevel')).toBeFalsy();
          expect(wrapper.state('currentSegment')).toBe(currentSegmentObj.segment1_name[0]);
          expect(wrapper.state('currentSegmentId')).toBe('1');
          expect(wrapper.state('currentTopic')).toBe(currentSegmentObj.topic_name[0]);
          expect(wrapper.state('currentTopicId')).toBe('A01');
          expect(wrapper.state('skipLevel')).toBeFalsy();
        });
      });

      describe('student_level is => 2', () => {
        beforeEach(() => {
          mockTopicManager = fromJS({
            topics: {
              student_level: ['2'],
              topic_cd: mockTopicCd,
            },
          });

          wrapper = shallow(
            <TopicManagerStudentViewR180EE
              handleTopicSave={mockHandleTopicSave}
              isTabIsolated={false}
              setIsolateTab={mockSetIsolateTab}
              showModal={mockShowModal}
              settingsStudentLevel={'2'}
              topicManager={mockTopicManager}
            />
          );

          wrapperInstance = wrapper.instance();
        });

        it('Expect to render correctly', () => {
          expect(shallowToJson(wrapper)).toMatchSnapshot();
        });

        it('state is set correctly', () => {
          expect(wrapper.state('currentSegment')).toBeNull();
          expect(wrapper.state('currentSegmentId')).toBeNull();
          expect(wrapper.state('currentTopic')).toBe(Constants.STUDENT_CHOICE_TOPIC);
          expect(wrapper.state('currentTopicId')).toBeNull();
          expect(wrapper.state('noStudentLevel')).toBeFalsy();
          expect(wrapper.state('skipLevel')).toBeFalsy();
        });

        it('getStudentLevel', () => {
          expect(wrapperInstance.getStudentLevel()).toMatchSnapshot();
        });
      });

      describe('call topics are disabled', () => {
        beforeEach(() => {
          mockTopicCd = [
            {
              enable: ['0'],
              cd_name: ['A01'],
              supplimental: ['0'],
              topic_name: ['Can You Believe it?'],
              current_segment: ['0'],
              segment1_name: ['Crazy Horse'],
              segment2_name: ['Polar Bears'],
              segment3_name: ['Art Cars'],
              segment4_name: ["I'm No Clown"],
              globally_enabled: ['1'],
            },
            {
              enable: ['0'],
              cd_name: ['A10'],
              supplimental: ['0'],
              topic_name: ['Mummies, Bones and Garbage'],
              current_segment: ['0'],
              segment1_name: ['The Great Dino Debate'],
              segment2_name: ['Mysteries of the Mummy'],
              segment3_name: ['Ancient Guards'],
              segment4_name: ['Tracing Trash'],
              globally_enabled: ['1'],
            },
            {
              enable: ['0'],
              cd_name: ['B01'],
              supplimental: ['0'],
              topic_name: ['Art Attack'],
              current_segment: ['0'],
              segment1_name: ['Crop Art'],
              segment2_name: ['Halls of Fame'],
              segment3_name: ['Young at Art'],
              segment4_name: ['STOMP'],
              globally_enabled: ['1'],
            },
          ];

          mockTopicManager = fromJS({
            topics: {
              student_level: ['2'],
              topic_cd: mockTopicCd,
            },
          });

          wrapper = shallow(
            <TopicManagerStudentViewR180EE
              handleTopicSave={mockHandleTopicSave}
              isTabIsolated={false}
              setIsolateTab={mockSetIsolateTab}
              showModal={mockShowModal}
              settingsStudentLevel={'2'}
              topicManager={mockTopicManager}
            />
          );
        });

        it('Expect to render correctly', () => {
          expect(shallowToJson(wrapper)).toMatchSnapshot();
        });

        it('state is set correctly', () => {
          expect(wrapper.state('noStudentLevel')).toBeFalsy();
          expect(wrapper.state('currentSegment')).toBeNull();
          expect(wrapper.state('currentSegmentId')).toBeNull();
          expect(wrapper.state('currentTopic')).toBeNull();
          expect(wrapper.state('currentTopicId')).toBeNull();
          expect(wrapper.state('skipLevel')).toBeFalsy();
        });
      });
    });

    describe('current_segement is B01', () => {
      describe('student_level is 1', () => {
        beforeEach(() => {
          mockTopicManager = fromJS({
            topics: {
              student_level: ['1'],
              topic_cd: mockTopicCd,
            },
          });

          wrapper = shallow(
            <TopicManagerStudentViewR180EE
              handleTopicSave={mockHandleTopicSave}
              isTabIsolated={false}
              setIsolateTab={mockSetIsolateTab}
              showModal={mockShowModal}
              settingsStudentLevel={'2'}
              topicManager={mockTopicManager}
            />
          );
        });

        it('Expect to render correctly', () => {
          expect(shallowToJson(wrapper)).toMatchSnapshot();
        });

        it('state is set correctly', () => {
          const currentSegmentObj = mockTopicCd[2];
          expect(wrapper.state('noStudentLevel')).toBeFalsy();
          expect(wrapper.state('currentSegment')).toBe(currentSegmentObj.segment1_name[0]);
          expect(wrapper.state('currentSegmentId')).toBe('1');
          expect(wrapper.state('currentTopic')).toBe(currentSegmentObj.topic_name[0]);
          expect(wrapper.state('currentTopicId')).toBe('B01');
          expect(wrapper.state('skipLevel')).toBeTruthy();
        });
      });

      describe('student_level is => 2', () => {
        beforeEach(() => {
          mockTopicManager = fromJS({
            topics: {
              student_level: ['2'],
              topic_cd: mockTopicCd,
            },
          });

          wrapper = shallow(
            <TopicManagerStudentViewR180EE
              handleTopicSave={mockHandleTopicSave}
              isTabIsolated={false}
              setIsolateTab={mockSetIsolateTab}
              showModal={mockShowModal}
              settingsStudentLevel={'2'}
              topicManager={mockTopicManager}
            />
          );

          wrapperInstance = wrapper.instance();
        });

        it('Expect to render correctly', () => {
          expect(shallowToJson(wrapper)).toMatchSnapshot();
        });

        it('state is set correctly', () => {
          const currentSegmentObj = mockTopicCd[2];
          expect(wrapper.state('noStudentLevel')).toBeFalsy();
          expect(wrapper.state('currentSegment')).toBe(currentSegmentObj.segment1_name[0]);
          expect(wrapper.state('currentSegmentId')).toBe('1');
          expect(wrapper.state('currentTopic')).toBe(currentSegmentObj.topic_name[0]);
          expect(wrapper.state('currentTopicId')).toBe('B01');
          expect(wrapper.state('skipLevel')).toBeTruthy();
        });

        describe('handleCheckboxChange', () => {
          it('checkbox is checked', () => {
            mockEvent = { target: { id: 'A10', checked: true } };
            wrapperInstance.handleCheckboxChange(mockEvent);

            const topicState = wrapper.state('topics');
            const dataToSaveState = wrapper.state('dataToSave');
            expect(topicState.topic_cd[1].enable[0]).toBe('1');
            expect(dataToSaveState).toEqual([
              {
                cd_name: 'A10',
                cd_segment: '0',
                completed: '0',
                enable: '1',
                level: '2',
                manual_advance: '0',
              },
            ]);
            expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
          });

          it('checkbox is unchecked', () => {
            mockEvent = { target: { id: 'A01', checked: false } };
            wrapperInstance.handleCheckboxChange(mockEvent);

            const topicState = wrapper.state('topics');
            const dataToSaveState = wrapper.state('dataToSave');
            expect(topicState.topic_cd[0].enable[0]).toBe('0');
            expect(dataToSaveState).toEqual([
              {
                cd_name: 'A01',
                cd_segment: '0',
                completed: '0',
                enable: '0',
                level: '2',
                manual_advance: '0',
              },
            ]);
            expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
          });

          it('checkbox is unchecked, topic has already been added to dataToSave', () => {
            wrapper.setState({
              dataToSave: [
                {
                  cd_name: 'A01',
                  cd_segment: '0',
                  completed: '0',
                  enable: '1',
                  level: '2',
                  manual_advance: '0',
                },
              ],
            });

            mockEvent = { target: { id: 'A01', checked: false } };
            wrapperInstance.handleCheckboxChange(mockEvent);

            const topicState = wrapper.state('topics');
            const dataToSaveState = wrapper.state('dataToSave');
            expect(topicState.topic_cd[0].enable[0]).toBe('0');
            expect(dataToSaveState).toEqual([
              {
                cd_name: 'A01',
                cd_segment: '0',
                completed: '0',
                enable: '0',
                level: '2',
                manual_advance: '0',
              },
            ]);
            expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
          });
        });

        describe('handleTopicSkipClicked', () => {
          it('skip is clicked', () => {
            mockEvent = { preventDefault: jest.fn() };
            wrapperInstance.handleTopicSkipClicked(mockEvent);

            expect(mockEvent.preventDefault).toHaveBeenCalled();
            expect(mockShowModal).toHaveBeenCalledWith(OK_CANCEL_MODAL, {
              heading: 'Skip Topic CD',
              message: wrapperInstance.renderTopicModalMessage(),
              modalClassName: 'topic-manager-student-view__modal',
              headerClassName: 'topic-manager-student-view__modal-header',
              okLabel: 'Yes',
              cancelLabel: 'No',
              onOk: wrapperInstance.handleTopicSkipOnOK,
            });
          });

          it('message matches snapshot', () => {
            expect(wrapperInstance.renderTopicModalMessage()).toMatchSnapshot();
          });

          describe('Yes is clicked in modal', () => {
            let expectedTopics = null;

            beforeEach(() => {
              expectedTopics = {
                student_level: ['2'],
                topic_cd: [
                  {
                    cd_name: ['A01'],
                    current_segment: ['0'],
                    enable: ['1'],
                    globally_enabled: ['1'],
                    segment1_name: ['Crazy Horse'],
                    segment2_name: ['Polar Bears'],
                    segment3_name: ['Art Cars'],
                    segment4_name: ["I'm No Clown"],
                    supplimental: ['0'],
                    topic_name: ['Can You Believe it?'],
                  },
                  {
                    cd_name: ['A10'],
                    current_segment: ['0'],
                    enable: ['0'],
                    globally_enabled: ['1'],
                    segment1_name: ['The Great Dino Debate'],
                    segment2_name: ['Mysteries of the Mummy'],
                    segment3_name: ['Ancient Guards'],
                    segment4_name: ['Tracing Trash'],
                    supplimental: ['0'],
                    topic_name: ['Mummies, Bones and Garbage'],
                  },
                  {
                    cd_name: ['B01'],
                    current_segment: ['0'],
                    enable: ['1'],
                    globally_enabled: ['1'],
                    segment1_name: ['Crop Art'],
                    segment2_name: ['Halls of Fame'],
                    segment3_name: ['Young at Art'],
                    segment4_name: ['STOMP'],
                    supplimental: ['0'],
                    topic_name: ['Art Attack'],
                  },
                ],
              };
            });

            it('dataToSave is empty', () => {
              wrapperInstance.handleTopicSkipOnOK();

              expect(wrapper.state('currentSegment')).toBeNull();
              expect(wrapper.state('currentSegmentId')).toBeNull();
              expect(wrapper.state('currentTopic')).toBe(Constants.STUDENT_CHOICE_TOPIC);
              expect(wrapper.state('currentTopicId')).toBeNull();
              expect(wrapper.state('skipTopic')).toBeTruthy();
              expect(wrapper.state('skippedTopicId')).toBe('B01');
              expect(wrapper.state('topics')).toEqual(expectedTopics);
              expect(wrapper.state('dataToSave')).toEqual([
                {
                  cd_name: 'B01',
                  cd_segment: '0',
                  completed: '1',
                  enable: '1',
                  level: '2',
                  manual_advance: '1',
                },
              ]);
            });

            it('dataToSave is not empty', () => {
              wrapper.setState({
                dataToSave: [
                  {
                    cd_name: 'B01',
                    cd_segment: '0',
                    completed: '0',
                    enable: '1',
                    level: '2',
                    manual_advance: '1',
                  },
                ],
              });

              wrapperInstance.handleTopicSkipOnOK();

              expect(wrapper.state('currentSegment')).toBeNull();
              expect(wrapper.state('currentSegmentId')).toBeNull();
              expect(wrapper.state('currentTopic')).toBe(Constants.STUDENT_CHOICE_TOPIC);
              expect(wrapper.state('currentTopicId')).toBeNull();
              expect(wrapper.state('skipTopic')).toBeTruthy();
              expect(wrapper.state('skippedTopicId')).toBe('B01');
              expect(wrapper.state('topics')).toEqual(expectedTopics);
              expect(wrapper.state('dataToSave')).toEqual([
                {
                  cd_name: 'B01',
                  cd_segment: '0',
                  completed: '1',
                  enable: '1',
                  level: '2',
                  manual_advance: '1',
                },
              ]);
            });
          });
        });

        describe('handleSegmentSkipClicked', () => {
          it('skip is clicked', () => {
            mockEvent = { preventDefault: jest.fn() };
            wrapperInstance.handleSegmentSkipClicked(mockEvent);

            expect(mockEvent.preventDefault).toHaveBeenCalled();
            expect(mockShowModal).toHaveBeenCalledWith(OK_CANCEL_MODAL, {
              heading: 'Skip Segment',
              message: wrapperInstance.renderSegmentModalMessage(),
              modalClassName: 'topic-manager-student-view__modal',
              headerClassName: 'topic-manager-student-view__modal-header',
              okLabel: 'Yes',
              cancelLabel: 'No',
              onOk: wrapperInstance.handleSegmentSkipOnOk,
            });
          });

          it('message matches snapshot', () => {
            expect(wrapperInstance.renderSegmentModalMessage()).toMatchSnapshot();
          });

          describe('Yes is clicked in modal', () => {
            describe('dataToSave is empty', () => {
              it('topic is on segment 1', () => {
                const currentSegmentObj = mockTopicCd[2];
                const expectedTopics = {
                  student_level: ['2'],
                  topic_cd: [
                    {
                      cd_name: ['A01'],
                      current_segment: ['0'],
                      enable: ['1'],
                      globally_enabled: ['1'],
                      segment1_name: ['Crazy Horse'],
                      segment2_name: ['Polar Bears'],
                      segment3_name: ['Art Cars'],
                      segment4_name: ["I'm No Clown"],
                      supplimental: ['0'],
                      topic_name: ['Can You Believe it?'],
                    },
                    {
                      cd_name: ['A10'],
                      current_segment: ['0'],
                      enable: ['0'],
                      globally_enabled: ['1'],
                      segment1_name: ['The Great Dino Debate'],
                      segment2_name: ['Mysteries of the Mummy'],
                      segment3_name: ['Ancient Guards'],
                      segment4_name: ['Tracing Trash'],
                      supplimental: ['0'],
                      topic_name: ['Mummies, Bones and Garbage'],
                    },
                    {
                      cd_name: ['B01'],
                      current_segment: ['2'],
                      enable: ['1'],
                      globally_enabled: ['1'],
                      segment1_name: ['Crop Art'],
                      segment2_name: ['Halls of Fame'],
                      segment3_name: ['Young at Art'],
                      segment4_name: ['STOMP'],
                      supplimental: ['0'],
                      topic_name: ['Art Attack'],
                    },
                  ],
                };

                wrapperInstance.handleSegmentSkipOnOk();

                expect(wrapper.state('currentSegment')).toBe(currentSegmentObj.segment2_name[0]);
                expect(wrapper.state('currentSegmentId')).toBe('2');
                expect(wrapper.state('currentTopic')).toBe(currentSegmentObj.topic_name[0]);
                expect(wrapper.state('currentTopicId')).toBe('B01');
                expect(wrapper.state('skipTopic')).toBeFalsy();
                expect(wrapper.state('skippedTopicId')).toBe('B01');
                expect(wrapper.state('topics')).toEqual(expectedTopics);
                expect(wrapper.state('dataToSave')).toEqual([
                  {
                    cd_name: 'B01',
                    cd_segment: '2',
                    completed: '0',
                    enable: '1',
                    level: '2',
                    manual_advance: '1',
                  },
                ]);
              });

              it('topic is on segment 4', () => {
                wrapper.setState({
                  topics: {
                    student_level: ['2'],
                    topic_cd: [
                      {
                        cd_name: ['A01'],
                        current_segment: ['0'],
                        enable: ['1'],
                        globally_enabled: ['1'],
                        segment1_name: ['Crazy Horse'],
                        segment2_name: ['Polar Bears'],
                        segment3_name: ['Art Cars'],
                        segment4_name: ["I'm No Clown"],
                        supplimental: ['0'],
                        topic_name: ['Can You Believe it?'],
                      },
                      {
                        cd_name: ['A10'],
                        current_segment: ['0'],
                        enable: ['0'],
                        globally_enabled: ['1'],
                        segment1_name: ['The Great Dino Debate'],
                        segment2_name: ['Mysteries of the Mummy'],
                        segment3_name: ['Ancient Guards'],
                        segment4_name: ['Tracing Trash'],
                        supplimental: ['0'],
                        topic_name: ['Mummies, Bones and Garbage'],
                      },
                      {
                        cd_name: ['B01'],
                        current_segment: ['4'],
                        enable: ['1'],
                        globally_enabled: ['1'],
                        segment1_name: ['Crop Art'],
                        segment2_name: ['Halls of Fame'],
                        segment3_name: ['Young at Art'],
                        segment4_name: ['STOMP'],
                        supplimental: ['0'],
                        topic_name: ['Art Attack'],
                      },
                    ],
                  },
                });

                wrapperInstance.handleSegmentSkipOnOk();

                const expectedTopics = {
                  student_level: ['2'],
                  topic_cd: [
                    {
                      cd_name: ['A01'],
                      current_segment: ['0'],
                      enable: ['1'],
                      globally_enabled: ['1'],
                      segment1_name: ['Crazy Horse'],
                      segment2_name: ['Polar Bears'],
                      segment3_name: ['Art Cars'],
                      segment4_name: ["I'm No Clown"],
                      supplimental: ['0'],
                      topic_name: ['Can You Believe it?'],
                    },
                    {
                      cd_name: ['A10'],
                      current_segment: ['0'],
                      enable: ['0'],
                      globally_enabled: ['1'],
                      segment1_name: ['The Great Dino Debate'],
                      segment2_name: ['Mysteries of the Mummy'],
                      segment3_name: ['Ancient Guards'],
                      segment4_name: ['Tracing Trash'],
                      supplimental: ['0'],
                      topic_name: ['Mummies, Bones and Garbage'],
                    },
                    {
                      cd_name: ['B01'],
                      current_segment: ['0'],
                      enable: ['1'],
                      globally_enabled: ['1'],
                      segment1_name: ['Crop Art'],
                      segment2_name: ['Halls of Fame'],
                      segment3_name: ['Young at Art'],
                      segment4_name: ['STOMP'],
                      supplimental: ['0'],
                      topic_name: ['Art Attack'],
                    },
                  ],
                };

                expect(wrapper.state('currentSegment')).toBeNull();
                expect(wrapper.state('currentSegmentId')).toBeNull();
                expect(wrapper.state('currentTopic')).toBe(Constants.STUDENT_CHOICE_TOPIC);
                expect(wrapper.state('currentTopicId')).toBeNull();
                expect(wrapper.state('skipTopic')).toBeTruthy();
                expect(wrapper.state('skippedTopicId')).toBe('B01');
                expect(wrapper.state('topics')).toEqual(expectedTopics);
                expect(wrapper.state('dataToSave')).toEqual([
                  {
                    cd_name: 'B01',
                    cd_segment: '0',
                    completed: '1',
                    enable: '1',
                    level: '2',
                    manual_advance: '1',
                  },
                ]);
              });
            });

            describe('dataToSave is not empty', () => {
              it('topic is on segment 1', () => {
                wrapper.setState({
                  dataToSave: [
                    {
                      cd_name: 'B01',
                      cd_segment: '1',
                      completed: '0',
                      enable: '1',
                      level: '2',
                      manual_advance: '0',
                    },
                  ],
                });

                const currentSegmentObj = mockTopicCd[2];
                const expectedTopics = {
                  student_level: ['2'],
                  topic_cd: [
                    {
                      cd_name: ['A01'],
                      current_segment: ['0'],
                      enable: ['1'],
                      globally_enabled: ['1'],
                      segment1_name: ['Crazy Horse'],
                      segment2_name: ['Polar Bears'],
                      segment3_name: ['Art Cars'],
                      segment4_name: ["I'm No Clown"],
                      supplimental: ['0'],
                      topic_name: ['Can You Believe it?'],
                    },
                    {
                      cd_name: ['A10'],
                      current_segment: ['0'],
                      enable: ['0'],
                      globally_enabled: ['1'],
                      segment1_name: ['The Great Dino Debate'],
                      segment2_name: ['Mysteries of the Mummy'],
                      segment3_name: ['Ancient Guards'],
                      segment4_name: ['Tracing Trash'],
                      supplimental: ['0'],
                      topic_name: ['Mummies, Bones and Garbage'],
                    },
                    {
                      cd_name: ['B01'],
                      current_segment: ['2'],
                      enable: ['1'],
                      globally_enabled: ['1'],
                      segment1_name: ['Crop Art'],
                      segment2_name: ['Halls of Fame'],
                      segment3_name: ['Young at Art'],
                      segment4_name: ['STOMP'],
                      supplimental: ['0'],
                      topic_name: ['Art Attack'],
                    },
                  ],
                };

                wrapperInstance.handleSegmentSkipOnOk();

                expect(wrapper.state('currentSegment')).toBe(currentSegmentObj.segment2_name[0]);
                expect(wrapper.state('currentSegmentId')).toBe('2');
                expect(wrapper.state('currentTopic')).toBe(currentSegmentObj.topic_name[0]);
                expect(wrapper.state('currentTopicId')).toBe('B01');
                expect(wrapper.state('skipTopic')).toBeFalsy();
                expect(wrapper.state('skippedTopicId')).toBe('B01');
                expect(wrapper.state('topics')).toEqual(expectedTopics);
                expect(wrapper.state('dataToSave')).toEqual([
                  {
                    cd_name: 'B01',
                    cd_segment: '2',
                    completed: '0',
                    enable: '1',
                    level: '2',
                    manual_advance: '1',
                  },
                ]);
              });

              it('topic is on segment 4', () => {
                wrapper.setState({
                  dataToSave: [
                    {
                      cd_name: 'B01',
                      cd_segment: '4',
                      completed: '0',
                      enable: '1',
                      level: '2',
                      manual_advance: '0',
                    },
                  ],
                  topics: {
                    student_level: ['2'],
                    topic_cd: [
                      {
                        cd_name: ['A01'],
                        current_segment: ['0'],
                        enable: ['1'],
                        globally_enabled: ['1'],
                        segment1_name: ['Crazy Horse'],
                        segment2_name: ['Polar Bears'],
                        segment3_name: ['Art Cars'],
                        segment4_name: ["I'm No Clown"],
                        supplimental: ['0'],
                        topic_name: ['Can You Believe it?'],
                      },
                      {
                        cd_name: ['A10'],
                        current_segment: ['0'],
                        enable: ['0'],
                        globally_enabled: ['1'],
                        segment1_name: ['The Great Dino Debate'],
                        segment2_name: ['Mysteries of the Mummy'],
                        segment3_name: ['Ancient Guards'],
                        segment4_name: ['Tracing Trash'],
                        supplimental: ['0'],
                        topic_name: ['Mummies, Bones and Garbage'],
                      },
                      {
                        cd_name: ['B01'],
                        current_segment: ['4'],
                        enable: ['1'],
                        globally_enabled: ['1'],
                        segment1_name: ['Crop Art'],
                        segment2_name: ['Halls of Fame'],
                        segment3_name: ['Young at Art'],
                        segment4_name: ['STOMP'],
                        supplimental: ['0'],
                        topic_name: ['Art Attack'],
                      },
                    ],
                  },
                });

                wrapperInstance.handleSegmentSkipOnOk();

                const expectedTopics = {
                  student_level: ['2'],
                  topic_cd: [
                    {
                      cd_name: ['A01'],
                      current_segment: ['0'],
                      enable: ['1'],
                      globally_enabled: ['1'],
                      segment1_name: ['Crazy Horse'],
                      segment2_name: ['Polar Bears'],
                      segment3_name: ['Art Cars'],
                      segment4_name: ["I'm No Clown"],
                      supplimental: ['0'],
                      topic_name: ['Can You Believe it?'],
                    },
                    {
                      cd_name: ['A10'],
                      current_segment: ['0'],
                      enable: ['0'],
                      globally_enabled: ['1'],
                      segment1_name: ['The Great Dino Debate'],
                      segment2_name: ['Mysteries of the Mummy'],
                      segment3_name: ['Ancient Guards'],
                      segment4_name: ['Tracing Trash'],
                      supplimental: ['0'],
                      topic_name: ['Mummies, Bones and Garbage'],
                    },
                    {
                      cd_name: ['B01'],
                      current_segment: ['0'],
                      enable: ['1'],
                      globally_enabled: ['1'],
                      segment1_name: ['Crop Art'],
                      segment2_name: ['Halls of Fame'],
                      segment3_name: ['Young at Art'],
                      segment4_name: ['STOMP'],
                      supplimental: ['0'],
                      topic_name: ['Art Attack'],
                    },
                  ],
                };

                expect(wrapper.state('currentSegment')).toBeNull();
                expect(wrapper.state('currentSegmentId')).toBeNull();
                expect(wrapper.state('currentTopic')).toBe(Constants.STUDENT_CHOICE_TOPIC);
                expect(wrapper.state('currentTopicId')).toBeNull();
                expect(wrapper.state('skipTopic')).toBeTruthy();
                expect(wrapper.state('skippedTopicId')).toBe('B01');
                expect(wrapper.state('topics')).toEqual(expectedTopics);
                expect(wrapper.state('dataToSave')).toEqual([
                  {
                    cd_name: 'B01',
                    cd_segment: '0',
                    completed: '1',
                    enable: '1',
                    level: '2',
                    manual_advance: '1',
                  },
                ]);
              });
            });
          });
        });

        it('handleSaveAndReturn', () => {
          wrapper.setState({ dataToSave: ['mockDataToSave'] });
          wrapperInstance.handleSaveAndReturn();
          expect(mockHandleTopicSave).toHaveBeenCalledWith(wrapper.state('dataToSave'));
          expect(mockSetIsolateTab).toHaveBeenCalledWith(false);
        });

        it('handleSetInitialValues', () => {
          wrapperInstance.handleSetInitialValues();

          expect(wrapper.state()).toEqual({
            currentSegment: 'Crop Art',
            currentSegmentId: '1',
            currentTopic: 'Art Attack',
            currentTopicId: 'B01',
            dataToSave: [],
            noStudentLevel: false,
            skipLevel: true,
            skipTopic: false,
            skippedTopicId: null,
            topics: {
              student_level: ['2'],
              topic_cd: [
                {
                  cd_name: ['A01'],
                  current_segment: ['0'],
                  enable: ['1'],
                  globally_enabled: ['1'],
                  segment1_name: ['Crazy Horse'],
                  segment2_name: ['Polar Bears'],
                  segment3_name: ['Art Cars'],
                  segment4_name: ["I'm No Clown"],
                  supplimental: ['0'],
                  topic_name: ['Can You Believe it?'],
                },
                {
                  cd_name: ['A10'],
                  current_segment: ['0'],
                  enable: ['0'],
                  globally_enabled: ['1'],
                  segment1_name: ['The Great Dino Debate'],
                  segment2_name: ['Mysteries of the Mummy'],
                  segment3_name: ['Ancient Guards'],
                  segment4_name: ['Tracing Trash'],
                  supplimental: ['0'],
                  topic_name: ['Mummies, Bones and Garbage'],
                },
                {
                  cd_name: ['B01'],
                  current_segment: ['1'],
                  enable: ['1'],
                  globally_enabled: ['1'],
                  segment1_name: ['Crop Art'],
                  segment2_name: ['Halls of Fame'],
                  segment3_name: ['Young at Art'],
                  segment4_name: ['STOMP'],
                  supplimental: ['0'],
                  topic_name: ['Art Attack'],
                },
              ],
            },
          });

          expect(mockSetIsolateTab).toHaveBeenCalledWith(false);
        });

        it('handleSubmit', () => {
          wrapper.setState({ dataToSave: ['mockDataToSave'] });
          mockEvent = { preventDefault: jest.fn() };
          wrapperInstance.handleSubmit(mockEvent);

          expect(mockEvent.preventDefault).toHaveBeenCalled();
          expect(mockHandleTopicSave).toHaveBeenCalledWith(wrapper.state('dataToSave'));
          expect(mockSetIsolateTab).toHaveBeenCalledWith(false);
        });
      });
    });
  });

  describe('rerender based on topics being skipped', () => {
    beforeEach(() => {
      mockTopicCd = [
        {
          enable: ['1'],
          cd_name: ['A01'],
          supplimental: ['0'],
          topic_name: ['Can You Believe it?'],
          current_segment: ['0'],
          segment1_name: ['Crazy Horse'],
          segment2_name: ['Polar Bears'],
          segment3_name: ['Art Cars'],
          segment4_name: ["I'm No Clown"],
          globally_enabled: ['1'],
          topic_complete_levels: ['mockTopicCompleteLevels'],
        },
        {
          enable: ['1'],
          cd_name: ['A10'],
          supplimental: ['0'],
          topic_name: ['Mummies, Bones and Garbage'],
          current_segment: ['0'],
          segment1_name: ['The Great Dino Debate'],
          segment2_name: ['Mysteries of the Mummy'],
          segment3_name: ['Ancient Guards'],
          segment4_name: ['Tracing Trash'],
          globally_enabled: ['1'],
        },
        {
          enable: ['1'],
          cd_name: ['B01'],
          supplimental: ['0'],
          topic_name: ['Art Attack'],
          current_segment: ['0'],
          segment1_name: ['Crop Art'],
          segment2_name: ['Halls of Fame'],
          segment3_name: ['Young at Art'],
          segment4_name: ['STOMP'],
          globally_enabled: ['1'],
        },
      ];

      mockTopicManager = fromJS({
        topics: {
          topic_cd: mockTopicCd,
          student_level: ['1'],
        },
      });

      wrapper = shallow(
        <TopicManagerStudentViewR180EE
          handleTopicSave={mockHandleTopicSave}
          isTabIsolated={false}
          setIsolateTab={mockSetIsolateTab}
          showModal={mockShowModal}
          settingsStudentLevel={'2'}
          topicManager={mockTopicManager}
        />
      );
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
