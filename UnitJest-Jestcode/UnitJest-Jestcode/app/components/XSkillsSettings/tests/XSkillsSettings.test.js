import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import React from 'react';

import { COHORT_TYPE } from 'containers/App/constants';

import XSkillsSettings from '../index';

describe('<XSkillsSettings />', () => {
  let wrapper = null;
  let wrapperInstance = null;
  const mockHandleTestAssignmentSave = jest.fn();
  const mockSettingsSave = jest.fn();
  let mockCohortObj = null;
  const mockStudentCohortObj = {
    cohortType: COHORT_TYPE.Student,
  };
  const mockTestsMeta = fromJS({
    test: [
      {
        test_number: '1',
        test_title: 'Test 1',
        test_description: 'test 1: Skills from Workshops 1',
      },
    ],
  });

  const mockProgramSettings = fromJS({
    audio_instructions: ['1'],
    show_correct_incorrect: ['1'],
    include_open_response: ['1'],
    include_writing_prompts: ['1'],
    ell_audio_instructions: ['0'],
  });

  beforeEach(() => {
    mockCohortObj = {
      cohortType: COHORT_TYPE.District,
    };

    wrapper = shallow(
      <XSkillsSettings
        cohortObj={mockCohortObj}
        enrollmentCount={0}
        handleSettingsSave={mockSettingsSave}
        handleTestAssignmentSave={mockHandleTestAssignmentSave}
        highestEnrolledCourse="XT_II"
        isLoadingSettings={false}
        isLoadingTestAssignment={false}
        settings={mockProgramSettings}
        testsMeta={mockTestsMeta}
      />
    );

    wrapperInstance = wrapper.instance();
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('loading properties are true', () => {
    beforeEach(() => {
      wrapper = shallow(
        <XSkillsSettings
          cohortObj={mockStudentCohortObj}
          enrollmentCount={10}
          handleSettingsSave={mockSettingsSave}
          handleTestAssignmentSave={mockHandleTestAssignmentSave}
          highestEnrolledCourse="XT_II"
          isLoadingSettings
          isLoadingTestAssignment
          settings={mockProgramSettings}
          testsMeta={mockTestsMeta}
        />
      );

      wrapperInstance = wrapper.instance();
    });

    it('should show loading bar when loadingTestAssignment', () => {
      expect(wrapperInstance.renderTestAssignmentTab()).toMatchSnapshot();
    });

    it('should show loading bar when loadingSettings', () => {
      expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
    });
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
