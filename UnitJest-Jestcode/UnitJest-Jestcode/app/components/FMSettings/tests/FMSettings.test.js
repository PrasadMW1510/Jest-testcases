import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import React from 'react';

import { COHORT_TYPE } from 'containers/App/constants';

import FMSettings from '../index';

describe('<FMSettings />', () => {
  let wrapper = null;
  let wrapperInstance = null;

  let mockCohortObj = null;
  let mockHandleSettingSave = null;
  let mockSettings = null;

  beforeEach(() => {
    mockCohortObj = {
      cohortType: COHORT_TYPE.District,
    };

    mockHandleSettingSave = jest.fn();

    mockSettings = fromJS({
      Default: ['mockDefault'],
      Settings: ['mockSettings'],
    });

    wrapper = shallow(
      <FMSettings
        cohortObj={mockCohortObj}
        enrollmentCount={0}
        handleSettingSave={mockHandleSettingSave}
        isLoading={false}
        settings={mockSettings}
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

      it('renderAdvancedSettingsTab', () => {
        expect(wrapperInstance.renderAdvancedSettingsTab()).toMatchSnapshot();
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

        it('renderAdvancedSettingsTab', () => {
          expect(wrapperInstance.renderAdvancedSettingsTab()).toMatchSnapshot();
        });
      });

      describe('isLoading is false', () => {
        beforeEach(() => {
          wrapper.setProps({ isLoading: false });
        });

        it('renderSettingTab', () => {
          expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
        });

        it('renderAdvancedSettingsTab', () => {
          expect(wrapperInstance.renderAdvancedSettingsTab()).toMatchSnapshot();
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

      it('renderAdvancedSettingsTab', () => {
        expect(wrapperInstance.renderAdvancedSettingsTab()).toMatchSnapshot();
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

        it('renderAdvancedSettingsTab', () => {
          expect(wrapperInstance.renderAdvancedSettingsTab()).toMatchSnapshot();
        });
      });

      describe('isLoading is false', () => {
        beforeEach(() => {
          wrapper.setProps({ isLoading: false });
        });

        it('renderSettingTab', () => {
          expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
        });

        it('renderAdvancedSettingsTab', () => {
          expect(wrapperInstance.renderAdvancedSettingsTab()).toMatchSnapshot();
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

      it('renderAdvancedSettingsTab', () => {
        expect(wrapperInstance.renderAdvancedSettingsTab()).toMatchSnapshot();
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

        it('renderAdvancedSettingsTab', () => {
          expect(wrapperInstance.renderAdvancedSettingsTab()).toMatchSnapshot();
        });
      });

      describe('isLoading is false', () => {
        beforeEach(() => {
          wrapper.setProps({ isLoading: false });
        });

        it('renderSettingTab', () => {
          expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
        });

        it('renderAdvancedSettingsTab', () => {
          expect(wrapperInstance.renderAdvancedSettingsTab()).toMatchSnapshot();
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

      it('renderAdvancedSettingsTab', () => {
        expect(wrapperInstance.renderAdvancedSettingsTab()).toMatchSnapshot();
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

        it('renderAdvancedSettingsTab', () => {
          expect(wrapperInstance.renderAdvancedSettingsTab()).toMatchSnapshot();
        });
      });

      describe('isLoading is false', () => {
        beforeEach(() => {
          wrapper.setProps({ isLoading: false });
        });

        it('renderSettingTab', () => {
          expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
        });

        it('renderAdvancedSettingsTab', () => {
          expect(wrapperInstance.renderAdvancedSettingsTab()).toMatchSnapshot();
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

      it('renderAdvancedSettingsTab', () => {
        expect(wrapperInstance.renderAdvancedSettingsTab()).toMatchSnapshot();
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

        it('renderAdvancedSettingsTab', () => {
          expect(wrapperInstance.renderAdvancedSettingsTab()).toMatchSnapshot();
        });
      });

      describe('isLoading is false', () => {
        beforeEach(() => {
          wrapper.setProps({ isLoading: false });
        });

        it('renderSettingTab', () => {
          expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
        });

        it('renderAdvancedSettingsTab', () => {
          expect(wrapperInstance.renderAdvancedSettingsTab()).toMatchSnapshot();
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

      it('renderAdvancedSettingsTab', () => {
        expect(wrapperInstance.renderAdvancedSettingsTab()).toMatchSnapshot();
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

        it('renderAdvancedSettingsTab', () => {
          expect(wrapperInstance.renderAdvancedSettingsTab()).toMatchSnapshot();
        });
      });

      describe('isLoading is false', () => {
        beforeEach(() => {
          wrapper.setProps({ isLoading: false });
        });

        it('renderSettingTab', () => {
          expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
        });

        it('renderAdvancedSettingsTab', () => {
          expect(wrapperInstance.renderAdvancedSettingsTab()).toMatchSnapshot();
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

      it('renderAdvancedSettingsTab', () => {
        expect(wrapperInstance.renderAdvancedSettingsTab()).toMatchSnapshot();
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

        it('renderAdvancedSettingsTab', () => {
          expect(wrapperInstance.renderAdvancedSettingsTab()).toMatchSnapshot();
        });
      });

      describe('isLoading is false', () => {
        beforeEach(() => {
          wrapper.setProps({ isLoading: false });
        });

        it('renderSettingTab', () => {
          expect(wrapperInstance.renderSettingTab()).toMatchSnapshot();
        });

        it('renderAdvancedSettingsTab', () => {
          expect(wrapperInstance.renderAdvancedSettingsTab()).toMatchSnapshot();
        });
      });
    });
  });
});
