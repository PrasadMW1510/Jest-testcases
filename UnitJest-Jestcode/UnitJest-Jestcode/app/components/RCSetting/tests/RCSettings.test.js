import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';

import { COHORT_TYPE, USER_TYPE } from 'containers/App/constants';

import RCSettings from '../index';

describe('<RCSettings />', () => {
  // TODO: Uncomment and rename mocks and props, when working on second tab
  let wrapper = null;
  let wrapperInstance = null;

  let mockCohortObj = null;
  let mockHandleSave = null;
  // let mockHandleTopicSave = null;
  let mockShowModal = null;

  beforeEach(() => {
    mockCohortObj = {
      cohortType: COHORT_TYPE.District,
    };

    mockHandleSave = jest.fn();
    // mockHandleTopicSave = jest.fn();
    mockShowModal = jest.fn();

    wrapper = shallow(
      <RCSettings
        cohortObj={mockCohortObj}
        enrollmentCount={0}
        handleSave={mockHandleSave}
        // handleTopicSave={mockHandleTopicSave}
        immSettings={fromJS({})}
        isLoading={false}
        loggedInUserType={USER_TYPE.Administrator}
        programName="Reading Counts!"
        showModal={mockShowModal}
        // topicManager={fromJS({})}
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

  /* describe('selectedCohType is District', () => {
    beforeEach(() => {
      mockCohortObj = {
        cohortType: COHORT_TYPE.District,
      };
      wrapper.setProps({ cohortObj: mockCohortObj });
    }); */

  describe('enrollmentCount is 0', () => {
    beforeEach(() => {
      wrapper.setProps({ enrollmentCount: 0 });
    });

    it('renderSettingTab', () => {
      expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
    });

    it('renderRestrictQuizzesTab', () => {
      expect(wrapperInstance.renderRestrictQuizzesTab()).toMatchSnapshot();
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

      it('renderRestrictQuizzesTab', () => {
        expect(wrapperInstance.renderRestrictQuizzesTab()).toMatchSnapshot();
      });
    });

    describe('isLoading is false', () => {
      beforeEach(() => {
        wrapper.setProps({ isLoading: false });
      });

      it('renderSettingTab', () => {
        expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
      });

      it('renderRestrictQuizzesTab', () => {
        expect(wrapperInstance.renderRestrictQuizzesTab()).toMatchSnapshot();
      });
    });
  });

  /* describe('selectedCohType is School', () => {
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

        it('renderSettingTab', () => {
          expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
        });

        it('renderTopicManagerTab', () => {
          expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
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

        describe('settings size is 0', () => {
          beforeEach(() => {
            wrapper.setProps({ settings: fromJS({}) });
          });

          it('renderSettingTab', () => {
            expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
          });

          it('renderTopicManagerTab', () => {
            expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
          });
        });

        describe('settings size is not 0', () => {
          beforeEach(() => {
            wrapper.setProps({ settings: fromJS({ data: 'mockData' }) });
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

        describe('settings size is 0', () => {
          beforeEach(() => {
            wrapper.setProps({ settings: fromJS({}) });
          });

          it('renderSettingTab', () => {
            expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
          });

          it('renderTopicManagerTab', () => {
            expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
          });
        });

        describe('settings size is not 0', () => {
          beforeEach(() => {
            wrapper.setProps({ settings: fromJS({ data: 'mockData' }) });
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

        describe('settings size is 0', () => {
          beforeEach(() => {
            wrapper.setProps({ settings: fromJS({}) });
          });

          it('renderSettingTab', () => {
            expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
          });

          it('renderTopicManagerTab', () => {
            expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
          });
        });

        describe('settings size is not 0', () => {
          beforeEach(() => {
            wrapper.setProps({ settings: fromJS({ data: 'mockData' }) });
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

        describe('settings size is 0', () => {
          beforeEach(() => {
            wrapper.setProps({ settings: fromJS({}) });
          });

          it('renderSettingTab', () => {
            expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
          });

          it('renderTopicManagerTab', () => {
            expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
          });
        });

        describe('settings size is not 0', () => {
          beforeEach(() => {
            wrapper.setProps({ settings: fromJS({ data: 'mockData' }) });
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

        describe('settings size is 0', () => {
          beforeEach(() => {
            wrapper.setProps({ settings: fromJS({}) });
          });

          it('renderSettingTab', () => {
            expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
          });

          it('renderTopicManagerTab', () => {
            expect(wrapperInstance.renderTopicManagerTab()).toMatchSnapshot();
          });
        });

        describe('settings size is not 0', () => {
          beforeEach(() => {
            wrapper.setProps({ settings: fromJS({ data: 'mockData' }) });
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
  }); */
});
