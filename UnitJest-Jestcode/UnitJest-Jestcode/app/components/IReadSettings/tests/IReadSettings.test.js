import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import React from 'react';

import { COHORT_TYPE } from 'containers/App/constants';

import IReadSettings from '../index';

describe('<IReadSettings />', () => {
  let wrapper = null;
  let wrapperInstance = null;

  let mockCohortObj = null;
  let mockHandleSave = null;
  let mockProgramSettingData = null;
  let mockShowModal = null;

  beforeEach(() => {
    mockHandleSave = jest.fn();
    mockProgramSettingData = fromJS({
      mockSettings: 'mockSettings',
    });
    mockShowModal = jest.fn();
  });

  describe('render incorrect cohort message', () => {
    describe('cohort type is District', () => {
      beforeEach(() => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.District,
        };

        wrapper = shallow(
          <IReadSettings
            cohortObj={mockCohortObj}
            enrollmentCount={0}
            handleSave={mockHandleSave}
            isLoading={false}
            programSettingData={mockProgramSettingData}
            showModal={mockShowModal}
          />
        );

        wrapperInstance = wrapper.instance();
      });

      it('Expect to render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      it('renderSettingsTab renders correctly', () => {
        expect(wrapperInstance.renderSettingsTab()).toMatchSnapshot();
      });
    });

    describe('cohort type is School', () => {
      beforeEach(() => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.School,
        };

        wrapper = shallow(
          <IReadSettings
            cohortObj={mockCohortObj}
            enrollmentCount={0}
            handleSave={mockHandleSave}
            isLoading={false}
            programSettingData={mockProgramSettingData}
            showModal={mockShowModal}
          />
        );

        wrapperInstance = wrapper.instance();
      });

      it('Expect to render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      it('renderSettingsTab renders correctly', () => {
        expect(wrapperInstance.renderSettingsTab()).toMatchSnapshot();
      });
    });

    describe('cohort type is Grade', () => {
      beforeEach(() => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Grade,
        };

        wrapper = shallow(
          <IReadSettings
            cohortObj={mockCohortObj}
            enrollmentCount={0}
            handleSave={mockHandleSave}
            isLoading={false}
            programSettingData={mockProgramSettingData}
            showModal={mockShowModal}
          />
        );

        wrapperInstance = wrapper.instance();
      });

      it('Expect to render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      it('renderSettingsTab renders correctly', () => {
        expect(wrapperInstance.renderSettingsTab()).toMatchSnapshot();
      });
    });

    describe('cohort type is Teacher', () => {
      beforeEach(() => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Teacher,
        };

        wrapper = shallow(
          <IReadSettings
            cohortObj={mockCohortObj}
            enrollmentCount={0}
            handleSave={mockHandleSave}
            isLoading={false}
            programSettingData={mockProgramSettingData}
            showModal={mockShowModal}
          />
        );

        wrapperInstance = wrapper.instance();
      });

      it('Expect to render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      it('renderSettingsTab renders correctly', () => {
        expect(wrapperInstance.renderSettingsTab()).toMatchSnapshot();
      });
    });
  });

  describe('enrollment count is 0', () => {
    describe('cohort type is Class', () => {
      beforeEach(() => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Class,
        };

        wrapper = shallow(
          <IReadSettings
            cohortObj={mockCohortObj}
            enrollmentCount={0}
            handleSave={mockHandleSave}
            isLoading={false}
            programSettingData={mockProgramSettingData}
            showModal={mockShowModal}
          />
        );

        wrapperInstance = wrapper.instance();
      });

      it('Expect to render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      it('renderSettingsTab renders correctly', () => {
        expect(wrapperInstance.renderSettingsTab()).toMatchSnapshot();
      });
    });

    describe('cohort type is Group', () => {
      beforeEach(() => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Group,
        };

        wrapper = shallow(
          <IReadSettings
            cohortObj={mockCohortObj}
            enrollmentCount={0}
            handleSave={mockHandleSave}
            isLoading={false}
            programSettingData={mockProgramSettingData}
            showModal={mockShowModal}
          />
        );

        wrapperInstance = wrapper.instance();
      });

      it('Expect to render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      it('renderSettingsTab renders correctly', () => {
        expect(wrapperInstance.renderSettingsTab()).toMatchSnapshot();
      });
    });

    describe('cohort type is Student', () => {
      beforeEach(() => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Student,
        };

        wrapper = shallow(
          <IReadSettings
            cohortObj={mockCohortObj}
            enrollmentCount={0}
            handleSave={mockHandleSave}
            isLoading={false}
            programSettingData={mockProgramSettingData}
            showModal={mockShowModal}
          />
        );

        wrapperInstance = wrapper.instance();
      });

      it('Expect to render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      it('renderSettingsTab renders correctly', () => {
        expect(wrapperInstance.renderSettingsTab()).toMatchSnapshot();
      });
    });

    describe('cohort type is invalid', () => {
      beforeEach(() => {
        mockCohortObj = {
          cohortType: 'invalidCohortType',
        };

        wrapper = shallow(
          <IReadSettings
            cohortObj={mockCohortObj}
            enrollmentCount={0}
            handleSave={mockHandleSave}
            isLoading={false}
            programSettingData={mockProgramSettingData}
            showModal={mockShowModal}
          />
        );

        wrapperInstance = wrapper.instance();
      });

      it('Expect to render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      it('renderSettingsTab renders correctly', () => {
        expect(wrapperInstance.renderSettingsTab()).toMatchSnapshot();
      });
    });
  });

  describe('renders null based on isLoading and programSettingData.size', () => {
    describe('isLoading is true', () => {
      beforeEach(() => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Student,
        };

        wrapper = shallow(
          <IReadSettings
            cohortObj={mockCohortObj}
            enrollmentCount={10}
            handleSave={mockHandleSave}
            isLoading
            programSettingData={mockProgramSettingData}
            showModal={mockShowModal}
          />
        );

        wrapperInstance = wrapper.instance();
      });

      it('Expect to render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      it('renderSettingsTab renders correctly', () => {
        expect(wrapperInstance.renderSettingsTab()).toMatchSnapshot();
      });
    });

    describe('isLoading is false, but programSettingData.size is 0', () => {
      beforeEach(() => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Student,
        };

        mockProgramSettingData = fromJS({});

        wrapper = shallow(
          <IReadSettings
            cohortObj={mockCohortObj}
            enrollmentCount={10}
            handleSave={mockHandleSave}
            isLoading={false}
            programSettingData={mockProgramSettingData}
            showModal={mockShowModal}
          />
        );

        wrapperInstance = wrapper.instance();
      });

      it('Expect to render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      it('renderSettingsTab renders correctly', () => {
        expect(wrapperInstance.renderSettingsTab()).toMatchSnapshot();
      });
    });
  });

  describe('should render ProgramSettingsViewIRead', () => {
    beforeEach(() => {
      mockCohortObj = {
        cohortType: COHORT_TYPE.Student,
      };

      wrapper = shallow(
        <IReadSettings
          cohortObj={mockCohortObj}
          enrollmentCount={10}
          handleSave={mockHandleSave}
          isLoading={false}
          programSettingData={mockProgramSettingData}
          showModal={mockShowModal}
        />
      );

      wrapperInstance = wrapper.instance();
    });

    it('should render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('renderSettingsTab renders correctly', () => {
      expect(wrapperInstance.renderSettingsTab()).toMatchSnapshot();
    });

    it('isolateTab is false by default', () => {
      expect(wrapper.state('isolateTab')).toEqual(false);
    });

    describe('setIsolateTab', () => {
      it('passed true, sets isolateTab to true', () => {
        wrapper.instance().setIsolateTab(true);
        expect(wrapper.state('isolateTab')).toEqual(true);
      });

      it('passed false, sets isolateTab to false', () => {
        wrapper.instance().setIsolateTab(false);
        expect(wrapper.state('isolateTab')).toEqual(false);
      });
    });
  });
});
