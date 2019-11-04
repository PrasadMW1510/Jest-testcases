import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import { fromJS } from 'immutable';
import { COHORT_TYPE } from 'containers/App/constants';

import PSSettings from '../index';

describe('<PSSettings />', () => {
  let wrapper = null;
  let wrapperInstance = null;
  let mockCohortObj = null;
  let mockEnrollmentCount = null;
  let mockHandleSave = null;
  let mockIsLoading = null;
  let mockSettings = null;
  let mockPsTestAssignmentRequest = null;
  let mockTestAssignmentData = null;
  beforeEach(() => {
    mockCohortObj = {
      cohortType: COHORT_TYPE.District,
    };
    mockEnrollmentCount = 0;
    mockHandleSave = jest.fn();
    mockPsTestAssignmentRequest = jest.fn();
    mockIsLoading = false;
    mockSettings = fromJS({
      audio_instructions: '1',
      student_access_to_score: '1',
      include_sample_questions: '1',
      ell_audio_instructions: '0',
    });
    mockTestAssignmentData = fromJS({
      dtmModules: {},
      subproduct: {},
      dtmTests: {},
    });
    wrapper = shallow(
      <PSSettings
        cohortObj={mockCohortObj}
        enrollmentCount={mockEnrollmentCount}
        isLoading={mockIsLoading}
        handleSave={mockHandleSave}
        settings={mockSettings}
        psTestAssignmentRequest={mockPsTestAssignmentRequest}
        testAssignmentData={mockTestAssignmentData}
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

      it('renderTestAssignmentTab', () => {
        expect(wrapperInstance.renderTestAssignmentTab()).toMatchSnapshot();
      });
    });

    describe('enrollmentCount is 5', () => {
      beforeEach(() => {
        wrapper.setProps({ enrollmentCount: 5 });
      });

      describe('isLoading is true', () => {
        beforeEach(() => {
          wrapper.setProps({ isLoading: true });
        });

        it('renderSettingTab', () => {
          expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
        });

        it('renderTestAssignmentTab', () => {
          expect(wrapperInstance.renderTestAssignmentTab()).toMatchSnapshot();
        });
      });

      describe('isLoading is false', () => {
        beforeEach(() => {
          wrapper.setProps({ isLoading: false });
        });

        it('renderSettingTab', () => {
          expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
        });

        it('renderTestAssignmentTab', () => {
          expect(wrapperInstance.renderTestAssignmentTab()).toMatchSnapshot();
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

      it('renderTestAssignmentTab', () => {
        expect(wrapperInstance.renderTestAssignmentTab()).toMatchSnapshot();
      });
    });

    describe('enrollmentCount is 5', () => {
      beforeEach(() => {
        wrapper.setProps({ enrollmentCount: 5 });
      });

      describe('isLoading is true', () => {
        beforeEach(() => {
          wrapper.setProps({ isLoading: true });
        });

        it('renderSettingTab', () => {
          expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
        });

        it('renderTestAssignmentTab', () => {
          expect(wrapperInstance.renderTestAssignmentTab()).toMatchSnapshot();
        });
      });

      describe('isLoading is false', () => {
        beforeEach(() => {
          wrapper.setProps({ isLoading: false });
        });

        it('renderSettingTab', () => {
          expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
        });

        it('renderTestAssignmentTab', () => {
          expect(wrapperInstance.renderTestAssignmentTab()).toMatchSnapshot();
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

      it('renderTestAssignmentTab', () => {
        expect(wrapperInstance.renderTestAssignmentTab()).toMatchSnapshot();
      });
    });

    describe('enrollmentCount is 5', () => {
      beforeEach(() => {
        wrapper.setProps({ enrollmentCount: 5 });
      });

      describe('isLoading is true', () => {
        beforeEach(() => {
          wrapper.setProps({ isLoading: true });
        });

        it('renderSettingTab', () => {
          expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
        });

        it('renderTestAssignmentTab', () => {
          expect(wrapperInstance.renderTestAssignmentTab()).toMatchSnapshot();
        });
      });

      describe('isLoading is false', () => {
        beforeEach(() => {
          wrapper.setProps({ isLoading: false });
        });

        it('renderSettingTab', () => {
          expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
        });

        it('renderTestAssignmentTab', () => {
          expect(wrapperInstance.renderTestAssignmentTab()).toMatchSnapshot();
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

      it('renderTestAssignmentTab', () => {
        expect(wrapperInstance.renderTestAssignmentTab()).toMatchSnapshot();
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

        it('renderTestAssignmentTab', () => {
          expect(wrapperInstance.renderTestAssignmentTab()).toMatchSnapshot();
        });
      });

      describe('isLoading is false', () => {
        beforeEach(() => {
          wrapper.setProps({ isLoading: false });
        });

        it('renderSettingTab', () => {
          expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
        });

        it('renderTestAssignmentTab', () => {
          expect(wrapperInstance.renderTestAssignmentTab()).toMatchSnapshot();
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

      it('renderTestAssignmentTab', () => {
        expect(wrapperInstance.renderTestAssignmentTab()).toMatchSnapshot();
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

        it('renderTestAssignmentTab', () => {
          expect(wrapperInstance.renderTestAssignmentTab()).toMatchSnapshot();
        });
      });

      describe('isLoading is false', () => {
        beforeEach(() => {
          wrapper.setProps({ isLoading: false });
        });

        it('renderSettingTab', () => {
          expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
        });

        it('renderTestAssignmentTab', () => {
          expect(wrapperInstance.renderTestAssignmentTab()).toMatchSnapshot();
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

      it('renderTestAssignmentTab', () => {
        expect(wrapperInstance.renderTestAssignmentTab()).toMatchSnapshot();
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

        it('renderTestAssignmentTab', () => {
          expect(wrapperInstance.renderTestAssignmentTab()).toMatchSnapshot();
        });
      });

      describe('isLoading is false', () => {
        beforeEach(() => {
          wrapper.setProps({ isLoading: false });
        });

        it('renderSettingTab', () => {
          expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
        });

        it('renderTestAssignmentTab', () => {
          expect(wrapperInstance.renderTestAssignmentTab()).toMatchSnapshot();
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

      it('renderTestAssignmentTab', () => {
        expect(wrapperInstance.renderTestAssignmentTab()).toMatchSnapshot();
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

        it('renderTestAssignmentTab', () => {
          expect(wrapperInstance.renderTestAssignmentTab()).toMatchSnapshot();
        });
      });

      describe('isLoading is false', () => {
        beforeEach(() => {
          wrapper.setProps({ isLoading: false });
        });

        it('renderSettingTab', () => {
          expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
        });

        it('renderTestAssignmentTab', () => {
          expect(wrapperInstance.renderTestAssignmentTab()).toMatchSnapshot();
        });
      });
    });
  });
});
