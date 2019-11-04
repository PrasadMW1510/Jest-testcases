import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';

import { COHORT_TYPE } from 'containers/App/constants';

import { FADSettingsContainer } from '../index';

describe('<FADSettingsContainer />', () => {
  let wrapper = null;
  let wrapperInstance = null;

  let mockCohortObj = null;
  let mockEnrollmentCount = null;
  let mockFADSEttingsContainer = null;
  let mockGetSettingsRequest = null;
  let mockSetSettingsRequest = null;

  beforeEach(() => {
    mockCohortObj = {
      cohortType: COHORT_TYPE.Student,
      id: 'mockStudentId',
    };
    mockEnrollmentCount = 1;
    mockFADSEttingsContainer = { loading: true };
    mockGetSettingsRequest = jest.fn();
    mockSetSettingsRequest = jest.fn();

    wrapper = shallow(
      <FADSettingsContainer
        cohortObj={mockCohortObj}
        enrollmentCount={mockEnrollmentCount}
        FADSettingsContainer={mockFADSEttingsContainer}
        getSettingsRequest={mockGetSettingsRequest}
        setSettingsRequest={mockSetSettingsRequest}
      />
    );

    wrapperInstance = wrapper.instance();
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
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

      it('renderSettings', () => {
        expect(wrapperInstance.renderSettings()).toMatchSnapshot();
      });
    });

    describe('enrollment count is 10', () => {
      beforeEach(() => {
        wrapper.setProps({ enrollmentCount: 10 });
      });

      describe('state.settings is undefined', () => {
        beforeEach(() => {
          wrapper.setState({ settings: undefined });
        });

        it('renderSettings', () => {
          expect(wrapperInstance.renderSettings()).toMatchSnapshot();
        });
      });

      describe('state.settings is not undefined', () => {
        beforeEach(() => {
          wrapper.setState({ settings: '' });
        });

        it('renderSettings', () => {
          expect(wrapperInstance.renderSettings()).toMatchSnapshot();
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

      it('renderSettings', () => {
        expect(wrapperInstance.renderSettings()).toMatchSnapshot();
      });
    });

    describe('enrollment count is 10', () => {
      beforeEach(() => {
        wrapper.setProps({ enrollmentCount: 10 });
      });

      describe('state.settings is undefined', () => {
        beforeEach(() => {
          wrapper.setState({ settings: undefined });
        });

        it('renderSettings', () => {
          expect(wrapperInstance.renderSettings()).toMatchSnapshot();
        });
      });

      describe('state.settings is not undefined', () => {
        beforeEach(() => {
          wrapper.setState({ settings: '' });
        });

        it('renderSettings', () => {
          expect(wrapperInstance.renderSettings()).toMatchSnapshot();
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

      it('renderSettings', () => {
        expect(wrapperInstance.renderSettings()).toMatchSnapshot();
      });
    });

    describe('enrollment count is 10', () => {
      beforeEach(() => {
        wrapper.setProps({ enrollmentCount: 10 });
      });

      describe('state.settings is undefined', () => {
        beforeEach(() => {
          wrapper.setState({ settings: undefined });
        });

        it('renderSettings', () => {
          expect(wrapperInstance.renderSettings()).toMatchSnapshot();
        });
      });

      describe('state.settings is not undefined', () => {
        beforeEach(() => {
          wrapper.setState({ settings: '' });
        });

        it('renderSettings', () => {
          expect(wrapperInstance.renderSettings()).toMatchSnapshot();
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

      it('renderSettings', () => {
        expect(wrapperInstance.renderSettings()).toMatchSnapshot();
      });
    });

    describe('enrollment count is 10', () => {
      beforeEach(() => {
        wrapper.setProps({ enrollmentCount: 10 });
      });

      describe('state.settings is undefined', () => {
        beforeEach(() => {
          wrapper.setState({ settings: undefined });
        });

        it('renderSettings', () => {
          expect(wrapperInstance.renderSettings()).toMatchSnapshot();
        });
      });

      describe('state.settings is not undefined', () => {
        beforeEach(() => {
          wrapper.setState({ settings: '' });
        });

        it('renderSettings', () => {
          expect(wrapperInstance.renderSettings()).toMatchSnapshot();
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

      it('renderSettings', () => {
        expect(wrapperInstance.renderSettings()).toMatchSnapshot();
      });
    });

    describe('enrollment count is 10', () => {
      beforeEach(() => {
        wrapper.setProps({ enrollmentCount: 10 });
      });

      describe('state.settings is undefined', () => {
        beforeEach(() => {
          wrapper.setState({ settings: undefined });
        });

        it('renderSettings', () => {
          expect(wrapperInstance.renderSettings()).toMatchSnapshot();
        });
      });

      describe('state.settings is not undefined', () => {
        beforeEach(() => {
          wrapper.setState({ settings: '' });
        });

        it('renderSettings', () => {
          expect(wrapperInstance.renderSettings()).toMatchSnapshot();
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

      it('renderSettings', () => {
        expect(wrapperInstance.renderSettings()).toMatchSnapshot();
      });
    });

    describe('enrollment count is 10', () => {
      beforeEach(() => {
        wrapper.setProps({ enrollmentCount: 10 });
      });

      describe('state.settings is undefined', () => {
        beforeEach(() => {
          wrapper.setState({ settings: undefined });
        });

        it('renderSettings', () => {
          expect(wrapperInstance.renderSettings()).toMatchSnapshot();
        });
      });

      describe('state.settings is not undefined', () => {
        beforeEach(() => {
          wrapper.setState({ settings: '' });
        });

        it('renderSettings', () => {
          expect(wrapperInstance.renderSettings()).toMatchSnapshot();
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

      it('renderSettings', () => {
        expect(wrapperInstance.renderSettings()).toMatchSnapshot();
      });
    });

    describe('enrollment count is 10', () => {
      beforeEach(() => {
        wrapper.setProps({ enrollmentCount: 10 });
      });

      describe('state.settings is undefined', () => {
        beforeEach(() => {
          wrapper.setState({ settings: undefined });
        });

        it('renderSettings', () => {
          expect(wrapperInstance.renderSettings()).toMatchSnapshot();
        });
      });

      describe('state.settings is not undefined', () => {
        beforeEach(() => {
          wrapper.setState({ settings: '' });
        });

        it('renderSettings', () => {
          expect(wrapperInstance.renderSettings()).toMatchSnapshot();
        });
      });
    });
  });

  it('Expect to render correctly at Student cohort level with enrollment and final taken and loading done', () => {
    mockCohortObj = {
      cohortType: COHORT_TYPE.Student,
      id: 'mockStudentId',
    };
    wrapper.setProps({
      cohortObj: mockCohortObj,
      enrollmentCount: 1,
      FADSettingsContainer: {
        settings: { show_retake_final_assessment_option: [true] },
        loading: false,
      },
    });
    expect(wrapperInstance.renderSettings()).toMatchSnapshot();
  });

  it('handleRestoreDefaults', () => {
    wrapperInstance.handleRestoreDefaults();
    expect(wrapper.state('initAssmnt')).toBeFalsy();
    expect(wrapper.state('finalAssmnt')).toBeFalsy();
    expect(wrapper.state('isolateTab')).toBeTruthy();
  });

  describe('handleSave', () => {
    it('finalAssmnt and initAssmnt are true', () => {
      wrapper.setState({ finalAssmnt: true, initAssmnt: true });
      wrapperInstance.handleSave();
      expect(mockSetSettingsRequest).toHaveBeenCalledWith('1', '1');
      expect(wrapper.state('finalAssmnt')).toBeFalsy();
      expect(wrapper.state('initAssmnt')).toBeFalsy();
    });

    it('finalAssmnt and initAssmnt are false', () => {
      wrapper.setState({ finalAssmnt: false, initAssmnt: false });
      wrapperInstance.handleSave();
      expect(mockSetSettingsRequest).toHaveBeenCalledWith('0', '0');
      expect(wrapper.state('finalAssmnt')).toBeFalsy();
      expect(wrapper.state('initAssmnt')).toBeFalsy();
    });
  });

  describe('handleSubmit', () => {
    let mockEvent = null;
    beforeEach(() => {
      mockEvent = {
        preventDefault: jest.fn(),
      };
    });

    it('finalAssmnt and initAssmnt are true', () => {
      wrapper.setState({ finalAssmnt: true, initAssmnt: true });
      wrapperInstance.handleSubmit(mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockSetSettingsRequest).toHaveBeenCalledWith('1', '1');
      expect(wrapper.state('finalAssmnt')).toBeFalsy();
      expect(wrapper.state('initAssmnt')).toBeFalsy();
    });

    it('finalAssmnt and initAssmnt are false', () => {
      wrapper.setState({ finalAssmnt: false, initAssmnt: false });
      wrapperInstance.handleSubmit(mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockSetSettingsRequest).toHaveBeenCalledWith('0', '0');
      expect(wrapper.state('finalAssmnt')).toBeFalsy();
      expect(wrapper.state('initAssmnt')).toBeFalsy();
    });
  });

  describe('inputClick', () => {
    let mockEvent = null;
    describe('currentTargetId is fad-settings-init-assmnt-place', () => {
      it('checked is false', () => {
        mockEvent = {
          currentTarget: {
            id: 'fad-settings-init-assmnt-place',
            checked: false,
          },
        };

        wrapperInstance.inputClick(mockEvent);
        expect(wrapper.state('initAssmnt')).toBeFalsy();
        expect(wrapper.state('initAssmntModal')).toBeFalsy();
      });

      it('checked is true', () => {
        mockEvent = {
          currentTarget: {
            id: 'fad-settings-init-assmnt-place',
            checked: true,
          },
        };

        wrapperInstance.inputClick(mockEvent);
        expect(wrapper.state('initAssmnt')).toBeTruthy();
        expect(wrapper.state('initAssmntModal')).toBeTruthy();
      });
    });

    describe('currentTargetId is fad-settings-final-assmnt', () => {
      it('checked is false', () => {
        mockEvent = {
          currentTarget: {
            id: 'fad-settings-final-assmnt',
            checked: false,
          },
        };

        wrapperInstance.inputClick(mockEvent);
        expect(wrapper.state('finalAssmnt')).toBeFalsy();
        expect(wrapper.state('finalAssmntModal')).toBeFalsy();
      });

      it('checked is true', () => {
        mockEvent = {
          currentTarget: {
            id: 'fad-settings-final-assmnt',
            checked: true,
          },
        };

        wrapperInstance.inputClick(mockEvent);
        expect(wrapper.state('finalAssmnt')).toBeTruthy();
        expect(wrapper.state('finalAssmntModal')).toBeTruthy();
      });
    });
  });

  it('noInit is clicked', () => {
    wrapperInstance.noInit();
    expect(wrapper.state('initAssmntModal')).toBeFalsy();
    expect(wrapper.state('initAssmnt')).toBeFalsy();
  });

  it('yesInit is clicked', () => {
    wrapperInstance.yesInit();
    expect(wrapper.state('initAssmntModal')).toBeFalsy();
    expect(wrapper.state('finalAssmnt')).toBeFalsy();
    expect(wrapper.state('isolateTab')).toBeTruthy();
  });

  it('noFinal is clicked', () => {
    wrapperInstance.noFinal();
    expect(wrapper.state('finalAssmntModal')).toBeFalsy();
    expect(wrapper.state('finalAssmnt')).toBeFalsy();
  });

  it('yesFinal is clicked', () => {
    wrapperInstance.yesFinal();
    expect(wrapper.state('finalAssmntModal')).toBeFalsy();
    expect(wrapper.state('finalAssmnt')).toBeFalsy();
    expect(wrapper.state('isolateTab')).toBeTruthy();
  });

  it('resetInputs is clicked', () => {
    wrapperInstance.resetInputs();
    expect(wrapper.state('finalAssmnt')).toBeFalsy();
    expect(wrapper.state('initAssmnt')).toBeFalsy();
    expect(wrapper.state('isolateTab')).toBeFalsy();
  });

  it('Expect state change after inputClick called', () => {
    wrapperInstance.inputClick({
      currentTarget: { id: 'fad-settings-init-assmnt-place', checked: true },
    });
    wrapperInstance.inputClick({
      currentTarget: { id: 'fad-settings-final-assmnt', checked: true },
    });
    expect(wrapperInstance.state.initAssmnt).toBeTruthy();
    expect(wrapperInstance.state.initAssmntModal).toBeTruthy();
    expect(wrapperInstance.state.finalAssmnt).toBeTruthy();
    expect(wrapperInstance.state.finalAssmntModal).toBeTruthy();
  });

  it('show_retake_final_assessment_option is set to false', () => {
    wrapper.setState({ settings: { show_retake_final_assessment_option: 'false' } });
    expect(wrapperInstance.renderFinalAssessment()).toMatchSnapshot();
  });
});
