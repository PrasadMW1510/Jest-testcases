import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';

import { COHORT_TYPE } from 'containers/App/constants';

import S44NGSettings from '../index';

describe('<S44NGSettings />', () => {
  let wrapper = null;
  let wrapperInstance = null;

  let mockCohortObj = null;
  let mockHandleSave = null;
  let mockSettings = null;

  beforeEach(() => {
    mockHandleSave = jest.fn();
    mockSettings = { data: 'mockSettingData' };
  });

  describe('setIsolateTab', () => {
    beforeEach(() => {
      mockCohortObj = {
        cohortType: COHORT_TYPE.Teacher,
      };

      wrapper = shallow(
        <S44NGSettings
          cohortObj={mockCohortObj}
          handleSave={mockHandleSave}
          settings={mockSettings}
        />
      );

      wrapperInstance = wrapper.instance();
    });

    it('isDirty set to true, state isolate is set to true', () => {
      wrapperInstance.setIsolateTab(true);
      expect(wrapper.state('isolateTab')).toBeTruthy();
    });

    it('isDirty set to false, state isolate is set to false', () => {
      wrapperInstance.setIsolateTab(false);
      expect(wrapper.state('isolateTab')).toBeFalsy();
    });
  });

  describe('cohortType is District', () => {
    beforeEach(() => {
      mockCohortObj = {
        cohortType: COHORT_TYPE.District,
      };

      wrapper = shallow(
        <S44NGSettings
          cohortObj={mockCohortObj}
          handleSave={mockHandleSave}
          settings={mockSettings}
        />
      );

      wrapperInstance = wrapper.instance();
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('renderContent renders correctly', () => {
      expect(wrapperInstance.renderContent()).toMatchSnapshot();
    });
  });

  describe('cohortType is School', () => {
    beforeEach(() => {
      mockCohortObj = {
        cohortType: COHORT_TYPE.School,
      };

      wrapper = shallow(
        <S44NGSettings
          cohortObj={mockCohortObj}
          handleSave={mockHandleSave}
          settings={mockSettings}
        />
      );

      wrapperInstance = wrapper.instance();
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('renderContent renders correctly', () => {
      expect(wrapperInstance.renderContent()).toMatchSnapshot();
    });
  });

  describe('enrollmentCount is 0', () => {
    describe('cohortType is Grade', () => {
      beforeEach(() => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Grade,
        };

        wrapper = shallow(
          <S44NGSettings
            cohortObj={mockCohortObj}
            handleSave={mockHandleSave}
            settings={mockSettings}
          />
        );

        wrapperInstance = wrapper.instance();
      });

      it('Expect to render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      it('renderContent renders correctly', () => {
        expect(wrapperInstance.renderContent()).toMatchSnapshot();
      });
    });

    describe('cohortType is Teacher', () => {
      beforeEach(() => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Teacher,
        };

        wrapper = shallow(
          <S44NGSettings
            cohortObj={mockCohortObj}
            handleSave={mockHandleSave}
            settings={mockSettings}
          />
        );

        wrapperInstance = wrapper.instance();
      });

      it('Expect to render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      it('renderContent renders correctly', () => {
        expect(wrapperInstance.renderContent()).toMatchSnapshot();
      });
    });

    describe('cohortType is Class', () => {
      beforeEach(() => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Class,
        };

        wrapper = shallow(
          <S44NGSettings
            cohortObj={mockCohortObj}
            handleSave={mockHandleSave}
            settings={mockSettings}
          />
        );

        wrapperInstance = wrapper.instance();
      });

      it('Expect to render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      it('renderContent renders correctly', () => {
        expect(wrapperInstance.renderContent()).toMatchSnapshot();
      });
    });

    describe('cohortType is Group', () => {
      beforeEach(() => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Group,
        };

        wrapper = shallow(
          <S44NGSettings
            cohortObj={mockCohortObj}
            handleSave={mockHandleSave}
            settings={mockSettings}
          />
        );

        wrapperInstance = wrapper.instance();
      });

      it('Expect to render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      it('renderContent renders correctly', () => {
        expect(wrapperInstance.renderContent()).toMatchSnapshot();
      });
    });

    describe('cohortType is Student', () => {
      beforeEach(() => {
        mockCohortObj = {
          cohortType: COHORT_TYPE.Student,
        };

        wrapper = shallow(
          <S44NGSettings
            cohortObj={mockCohortObj}
            handleSave={mockHandleSave}
            settings={mockSettings}
          />
        );

        wrapperInstance = wrapper.instance();
      });

      it('Expect to render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      it('renderContent renders correctly', () => {
        expect(wrapperInstance.renderContent()).toMatchSnapshot();
      });
    });

    describe('cohortType is invalid', () => {
      beforeEach(() => {
        mockCohortObj = {
          cohortType: 'invalidSelectedCohType',
        };

        wrapper = shallow(
          <S44NGSettings
            cohortObj={mockCohortObj}
            handleSave={mockHandleSave}
            settings={mockSettings}
          />
        );

        wrapperInstance = wrapper.instance();
      });

      it('Expect to render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      it('renderContent renders correctly', () => {
        expect(wrapperInstance.renderContent()).toMatchSnapshot();
      });
    });
  });

  describe('enrollmentCount is more than 0', () => {
    beforeEach(() => {
      mockCohortObj = {
        cohortType: COHORT_TYPE.Student,
      };

      wrapper = shallow(
        <S44NGSettings
          cohortObj={mockCohortObj}
          handleSave={mockHandleSave}
          settings={mockSettings}
          enrollmentCount={10}
        />
      );

      wrapperInstance = wrapper.instance();
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('renderContent renders correctly', () => {
      expect(wrapperInstance.renderContent()).toMatchSnapshot();
    });
  });

  describe('isolate tab', () => {
    beforeEach(() => {
      mockCohortObj = {
        cohortType: COHORT_TYPE.Student,
      };

      wrapper = shallow(
        <S44NGSettings
          cohortObj={mockCohortObj}
          handleSave={mockHandleSave}
          settings={mockSettings}
          enrollmentCount={10}
        />
      );
      wrapper.setState({ isolateTab: true });

      wrapperInstance = wrapper.instance();
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('renderContent renders correctly', () => {
      expect(wrapperInstance.renderContent()).toMatchSnapshot();
    });
  });

  describe('isLoading is set to true', () => {
    beforeEach(() => {
      mockCohortObj = {
        cohortType: COHORT_TYPE.Student,
      };

      wrapper = shallow(
        <S44NGSettings
          cohortObj={mockCohortObj}
          handleSave={mockHandleSave}
          settings={mockSettings}
          enrollmentCount={10}
          isLoading
        />
      );

      wrapperInstance = wrapper.instance();
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('renderContent renders correctly', () => {
      expect(wrapperInstance.renderContent()).toMatchSnapshot();
    });
  });
});
