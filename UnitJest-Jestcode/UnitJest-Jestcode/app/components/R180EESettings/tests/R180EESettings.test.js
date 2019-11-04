import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';

import { COHORT_TYPE } from 'containers/App/constants';

import R180EESettings from '../index';

describe('<R180EESettings />', () => {
  let wrapper = null;
  let wrapperInstance = null;

  let mockCohortObj = null;
  let mockEnrollmentDetails = null;
  let mockHandleSave = null;
  let mockHandleTopicSave = null;
  let mockR180EESettingsContainerRequest = null;
  let mockSetStage = null;
  let mockShowModal = null;

  beforeEach(() => {
    mockCohortObj = {
      cohortType: COHORT_TYPE.District,
    };

    mockEnrollmentDetails = [
      {
        applicationId: 'R180_A',
        enrollmentCount: 10,
      },
      {
        applicationId: 'R180_A_Upsell',
        enrollmentCount: 0,
      },
      {
        applicationId: 'R180_B',
        enrollmentCount: 20,
      },
      {
        applicationId: 'R180_B_Upsell',
        enrollmentCount: 0,
      },
      {
        applicationId: 'R180_C',
        enrollmentCount: 2,
      },
      {
        applicationId: 'R180_C_Upsell',
        enrollmentCount: 0,
      },
    ];

    mockHandleSave = jest.fn();
    mockHandleTopicSave = jest.fn();
    mockR180EESettingsContainerRequest = jest.fn();
    mockSetStage = jest.fn();
    mockShowModal = jest.fn();

    wrapper = shallow(
      <R180EESettings
        cohortObj={mockCohortObj}
        enrollmentCount={0}
        enrollmentDetails={mockEnrollmentDetails}
        handleSave={mockHandleSave}
        handleTopicSave={mockHandleTopicSave}
        isLoading={false}
        r180EESettingsContainerRequest={mockR180EESettingsContainerRequest}
        setStage={mockSetStage}
        settings={fromJS({})}
        showModal={mockShowModal}
        topicManager={fromJS({ installedStages: [] })}
      />
    );

    wrapperInstance = wrapper.instance();
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('setIsolateTab', () => {
    it('set isolateTab to true', () => {
      wrapperInstance.setIsolateTab(true);
      expect(wrapper.state('isolateTab')).toBeTruthy();
    });

    it('set isolateTab to false', () => {
      wrapperInstance.setIsolateTab(false);
      expect(wrapper.state('isolateTab')).toBeFalsy();
    });
  });

  describe('selectedCohType is District', () => {
    beforeEach(() => {
      mockCohortObj = {
        cohortType: COHORT_TYPE.District,
      };
      wrapper.setProps({ cohortObj: mockCohortObj });
    });

    describe('enrollmentCount is 0', () => {
      beforeEach(() => {
        wrapper.setProps({ enrollmentCount: 0 });
      });

      it('renderSettingTab', () => {
        expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
      });

      it('renderTopicManagerTab', () => {
        expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
      });
    });

    describe('enrollmentCount is 10', () => {
      beforeEach(() => {
        wrapper.setProps({ enrollmentCount: 10 });
      });

      describe('isLoading is true', () => {
        beforeEach(() => {
          wrapper.setProps({ isLoading: true });
        });

        it('renderSettingTab', () => {
          expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
        });

        it('renderTopicManagerTab', () => {
          expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
        });
      });

      describe('isLoading is false', () => {
        beforeEach(() => {
          wrapper.setProps({ isLoading: false });
        });

        describe('setting size is 0, installedStages size is 0, and topics size is 0', () => {
          beforeEach(() => {
            wrapper.setProps({
              settings: fromJS({}),
              topicManager: fromJS({ installedStages: [], topics: [] }),
            });
          });

          it('renderSettingTab', () => {
            expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
          });

          it('renderTopicManagerTab', () => {
            expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
          });
        });

        describe('setting size is not 0, installedStages size is not 0, and topics size is not 0', () => {
          beforeEach(() => {
            wrapper.setProps({
              settings: fromJS({ data: 'mockData' }),
              topicManager: fromJS({ installedStages: [1, 2], topics: [1, 2] }),
            });
          });

          it('renderSettingTab', () => {
            expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
          });

          it('renderTopicManagerTab', () => {
            expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
          });
        });
      });
    });
  });

  describe('selectedCohType is School', () => {
    beforeEach(() => {
      mockCohortObj = {
        cohortType: COHORT_TYPE.School,
      };
      wrapper.setProps({ cohortObj: mockCohortObj });
    });

    describe('enrollmentCount is 0', () => {
      beforeEach(() => {
        wrapper.setProps({ enrollmentCount: 0 });
      });

      it('renderSettingTab', () => {
        expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
      });

      it('renderTopicManagerTab', () => {
        expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
      });
    });

    describe('enrollmentCount is 10', () => {
      beforeEach(() => {
        wrapper.setProps({ enrollmentCount: 10 });
      });

      describe('isLoading is true', () => {
        beforeEach(() => {
          wrapper.setProps({ isLoading: true });
        });

        it('renderSettingTab', () => {
          expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
        });

        it('renderTopicManagerTab', () => {
          expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
        });
      });

      describe('isLoading is false', () => {
        beforeEach(() => {
          wrapper.setProps({ isLoading: false });
        });

        describe('setting size is 0, installedStages size is 0, and topics size is 0', () => {
          beforeEach(() => {
            wrapper.setProps({
              settings: fromJS({}),
              topicManager: fromJS({ installedStages: [], topics: [] }),
            });
          });

          it('renderSettingTab', () => {
            expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
          });

          it('renderTopicManagerTab', () => {
            expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
          });
        });

        describe('setting size is not 0, installedStages size is not 0, and topics size is not 0', () => {
          beforeEach(() => {
            wrapper.setProps({
              settings: fromJS({ data: 'mockData' }),
              topicManager: fromJS({ installedStages: [1, 2], topics: [1, 2] }),
            });
          });

          it('renderSettingTab', () => {
            expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
          });

          it('renderTopicManagerTab', () => {
            expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
          });
        });
      });
    });
  });

  describe('selectedCohType is Grade', () => {
    beforeEach(() => {
      mockCohortObj = {
        cohortType: COHORT_TYPE.Grade,
      };
      wrapper.setProps({ cohortObj: mockCohortObj });
    });

    describe('enrollmentCount is 0', () => {
      beforeEach(() => {
        wrapper.setProps({ enrollmentCount: 0 });
      });

      it('renderSettingTab', () => {
        expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
      });

      it('renderTopicManagerTab', () => {
        expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
      });
    });

    describe('enrollmentCount is 10', () => {
      beforeEach(() => {
        wrapper.setProps({ enrollmentCount: 10 });
      });

      describe('isLoading is true', () => {
        beforeEach(() => {
          wrapper.setProps({ isLoading: true });
        });

        it('renderSettingTab', () => {
          expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
        });

        it('renderTopicManagerTab', () => {
          expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
        });
      });

      describe('isLoading is false', () => {
        beforeEach(() => {
          wrapper.setProps({ isLoading: false });
        });

        describe('setting size is 0, installedStages size is 0, and topics size is 0', () => {
          beforeEach(() => {
            wrapper.setProps({
              settings: fromJS({}),
              topicManager: fromJS({ installedStages: [], topics: [] }),
            });
          });

          it('renderSettingTab', () => {
            expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
          });

          it('renderTopicManagerTab', () => {
            expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
          });
        });

        describe('setting size is not 0, installedStages size is not 0, and topics size is not 0', () => {
          beforeEach(() => {
            wrapper.setProps({
              settings: fromJS({ data: 'mockData' }),
              topicManager: fromJS({ installedStages: [1, 2], topics: [1, 2] }),
            });
          });

          it('renderSettingTab', () => {
            expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
          });

          it('renderTopicManagerTab', () => {
            expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
          });
        });
      });
    });
  });

  describe('selectedCohType is Teacher', () => {
    beforeEach(() => {
      mockCohortObj = {
        cohortType: COHORT_TYPE.Teacher,
      };
      wrapper.setProps({ cohortObj: mockCohortObj });
    });

    describe('enrollmentCount is 0', () => {
      beforeEach(() => {
        wrapper.setProps({ enrollmentCount: 0 });
      });

      it('renderSettingTab', () => {
        expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
      });

      it('renderTopicManagerTab', () => {
        expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
      });
    });

    describe('enrollmentCount is 10', () => {
      beforeEach(() => {
        wrapper.setProps({ enrollmentCount: 10 });
      });

      describe('isLoading is true', () => {
        beforeEach(() => {
          wrapper.setProps({ isLoading: true });
        });

        it('renderSettingTab', () => {
          expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
        });

        it('renderTopicManagerTab', () => {
          expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
        });
      });

      describe('isLoading is false', () => {
        beforeEach(() => {
          wrapper.setProps({ isLoading: false });
        });

        describe('setting size is 0, installedStages size is 0, and topics size is 0', () => {
          beforeEach(() => {
            wrapper.setProps({
              settings: fromJS({}),
              topicManager: fromJS({ installedStages: [], topics: [] }),
            });
          });

          it('renderSettingTab', () => {
            expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
          });

          it('renderTopicManagerTab', () => {
            expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
          });
        });

        describe('setting size is not 0, installedStages size is not 0, and topics size is not 0', () => {
          beforeEach(() => {
            wrapper.setProps({
              settings: fromJS({ data: 'mockData' }),
              topicManager: fromJS({ installedStages: [1, 2], topics: [1, 2] }),
            });
          });

          it('renderSettingTab', () => {
            expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
          });

          it('renderTopicManagerTab', () => {
            expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
          });
        });
      });
    });
  });

  describe('selectedCohType is Class', () => {
    beforeEach(() => {
      mockCohortObj = {
        cohortType: COHORT_TYPE.Class,
      };
      wrapper.setProps({ cohortObj: mockCohortObj });
    });

    describe('enrollmentCount is 0', () => {
      beforeEach(() => {
        wrapper.setProps({ enrollmentCount: 0 });
      });

      it('renderSettingTab', () => {
        expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
      });

      it('renderTopicManagerTab', () => {
        expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
      });
    });

    describe('enrollmentCount is 10', () => {
      beforeEach(() => {
        wrapper.setProps({ enrollmentCount: 10 });
      });

      describe('isLoading is true', () => {
        beforeEach(() => {
          wrapper.setProps({ isLoading: true });
        });

        it('renderSettingTab', () => {
          expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
        });

        it('renderTopicManagerTab', () => {
          expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
        });
      });

      describe('isLoading is false', () => {
        beforeEach(() => {
          wrapper.setProps({ isLoading: false });
        });

        describe('setting size is 0, installedStages size is 0, and topics size is 0', () => {
          beforeEach(() => {
            wrapper.setProps({
              settings: fromJS({}),
              topicManager: fromJS({ installedStages: [], topics: [] }),
            });
          });

          it('renderSettingTab', () => {
            expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
          });

          it('renderTopicManagerTab', () => {
            expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
          });
        });

        describe('setting size is not 0, installedStages size is not 0, and topics size is not 0', () => {
          beforeEach(() => {
            wrapper.setProps({
              settings: fromJS({ data: 'mockData' }),
              topicManager: fromJS({ installedStages: [1, 2], topics: [1, 2] }),
            });
          });

          it('renderSettingTab', () => {
            expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
          });

          it('renderTopicManagerTab', () => {
            expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
          });
        });
      });
    });
  });

  describe('selectedCohType is Group', () => {
    beforeEach(() => {
      mockCohortObj = {
        cohortType: COHORT_TYPE.Group,
      };
      wrapper.setProps({ cohortObj: mockCohortObj });
    });

    describe('enrollmentCount is 0', () => {
      beforeEach(() => {
        wrapper.setProps({ enrollmentCount: 0 });
      });

      it('renderSettingTab', () => {
        expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
      });

      it('renderTopicManagerTab', () => {
        expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
      });
    });

    describe('enrollmentCount is 10', () => {
      beforeEach(() => {
        wrapper.setProps({ enrollmentCount: 10 });
      });

      describe('isLoading is true', () => {
        beforeEach(() => {
          wrapper.setProps({ isLoading: true });
        });

        it('renderSettingTab', () => {
          expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
        });

        it('renderTopicManagerTab', () => {
          expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
        });
      });

      describe('isLoading is false', () => {
        beforeEach(() => {
          wrapper.setProps({ isLoading: false });
        });

        describe('setting size is 0, installedStages size is 0, and topics size is 0', () => {
          beforeEach(() => {
            wrapper.setProps({
              settings: fromJS({}),
              topicManager: fromJS({ installedStages: [], topics: [] }),
            });
          });

          it('renderSettingTab', () => {
            expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
          });

          it('renderTopicManagerTab', () => {
            expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
          });
        });

        describe('setting size is not 0, installedStages size is not 0, and topics size is not 0', () => {
          beforeEach(() => {
            wrapper.setProps({
              settings: fromJS({ data: 'mockData' }),
              topicManager: fromJS({ installedStages: [1, 2], topics: [1, 2] }),
            });
          });

          it('renderSettingTab', () => {
            expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
          });

          it('renderTopicManagerTab', () => {
            expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
          });
        });
      });
    });
  });

  describe('selectedCohType is Student', () => {
    beforeEach(() => {
      mockCohortObj = {
        cohortType: COHORT_TYPE.Student,
      };
      wrapper.setProps({ cohortObj: mockCohortObj });
    });

    describe('enrollmentCount is 0', () => {
      beforeEach(() => {
        wrapper.setProps({ enrollmentCount: 0 });
      });

      it('renderSettingTab', () => {
        expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
      });

      it('renderTopicManagerTab', () => {
        expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
      });
    });

    describe('enrollmentCount is 10', () => {
      beforeEach(() => {
        wrapper.setProps({ enrollmentCount: 10 });
      });

      describe('isLoading is true', () => {
        beforeEach(() => {
          wrapper.setProps({ isLoading: true });
        });

        it('renderSettingTab', () => {
          expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
        });

        it('renderTopicManagerTab', () => {
          expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
        });
      });

      describe('isLoading is false', () => {
        beforeEach(() => {
          wrapper.setProps({ isLoading: false });
        });

        describe('setting size is 0, installedStages size is 0, and topics size is 0', () => {
          beforeEach(() => {
            wrapper.setProps({
              settings: fromJS({}),
              topicManager: fromJS({ installedStages: [], topics: [] }),
            });
          });

          it('renderSettingTab', () => {
            expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
          });

          it('renderTopicManagerTab', () => {
            expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
          });
        });

        describe('setting size is not 0, installedStages size is not 0, and topics size is not 0', () => {
          beforeEach(() => {
            wrapper.setProps({
              settings: fromJS({ data: 'mockData', student_level: ['2'] }),
              topicManager: fromJS({ installedStages: [1, 2], topics: [1, 2] }),
            });
          });

          it('renderSettingTab', () => {
            expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
          });

          it('renderTopicManagerTab', () => {
            expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
          });
        });
      });
    });
  });
});
