import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ProgramSettingsViewR180NG from 'components/R180NGSetting/ProgramSettingsViewR180NG';
// import { Link } from 'react-router-dom';
describe('<ProgramSettingsViewR180NG />', () => {
  let mockedPrograms = null;
  let mockHandleSubmit = null;
  let wrapper = null;
  let mockedsecondLangOptions = null;
  let mockonStudentLevelClick = null;
  let mockedstate = null;
  let mockedstateafter = null;
  let mockHandleTabReset = null;
  let mockHandleToggle = null;
  const fakeEvent = { preventDefault: () => {} };
  beforeEach(() => {
    mockonStudentLevelClick = jest.fn();
    mockHandleTabReset = jest.fn();
    mockHandleToggle = jest.fn();
    mockHandleSubmit = jest.fn();
    mockedsecondLangOptions = [
      { id: 0, name: 'None' },
      { id: 1, name: 'Spanish' },
      { id: 2, name: 'Haitian Creole' },
      { id: 3, name: 'Cantonese' },
      { id: 4, name: 'Vietnamese' },
      { id: 5, name: 'Hmong' },
    ];

    mockedstate = {
      alt_color_scheme: ['0'],
      auto_level: ['1'],
      button_rollover: ['0'],
      captioning: ['0'],
      computer_placement: ['0'],
      ereads_enabled: ['1'],
      ereads_level: ['1'],
      match_ereads_level_to_sw_reading_level: ['0'],
      pronunciation_tip: ['0'],
      reading_speed: ['3'],
      result: false,
      second_language_id: ['None'],
      student_level: ['1'],
      writing_zone_enabled: ['1'],
      writing_zone_frequency: ['every_other_segment'],
    };
    mockedstateafter = {
      alt_color_scheme: ['0'],
      auto_level: ['1'],
      button_rollover: ['0'],
      captioning: ['0'],
      computer_placement: ['0'],
      ereads_enabled: ['1'],
      ereads_level: ['1'],
      match_ereads_level_to_sw_reading_level: ['0'],
      pronunciation_tip: ['0'],
      reading_speed: ['3'],
      result: true,
      second_language_id: ['None'],
      student_level: ['1'],
      writing_zone_enabled: ['1'],
      writing_zone_frequency: ['every_other_segment'],
    };
    mockedPrograms = {
      alt_color_scheme: ['0'],
      auto_level: ['1'],
      button_rollover: ['0'],
      captioning: ['0'],
      computer_placement: ['0'],
      ereads_enabled: ['1'],
      ereads_level: ['1'],
      match_ereads_level_to_sw_reading_level: ['0'],
      pronunciation_tip: ['0'],
      reading_speed: ['3'],
      second_language_id: ['None'],
      student_level: ['1'],
      writing_zone_enabled: ['1'],
      writing_zone_frequency: ['every_other_segment'],
    };
    wrapper = shallow(
      <ProgramSettingsViewR180NG
        programs={mockedPrograms}
        programName={'READ 180 Next Generation'}
        state={mockedstate}
        secondLangOptions={mockedsecondLangOptions}
        onStudentLevelClick={mockonStudentLevelClick}
        onSubmit={mockHandleSubmit}
        handleTabReset={mockHandleTabReset}
        handleToggle={mockHandleToggle}
      />
    );
  });
  it('Expect to render correctly', () => {
    wrapper.setState({ mockedstate });
    wrapper.setProps({ programs: mockedPrograms });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('verify captioning checked true', () => {
    const e = {
      target: { type: 'checkbox', checked: true },
    };
    wrapper.setState(e);
    wrapper.instance().handleChange(e);
    expect(wrapper.state('captioning')).toEqual(['0']);
  });
  it('verify captioning checked false', () => {
    const e = {
      target: { type: 'checkbox', checked: false },
    };

    wrapper.instance().handleChange(e);
    expect(wrapper.state('captioning')).toEqual(['0']);
  });
  it('verify second language is spanish ', () => {
    const e = {
      target: { name: 'second_language_id', value: '1' },
    };

    wrapper.instance().handleChange(e);
    expect(wrapper.state('pronunciation_tip')).toEqual(['1']);
  });
  it('verify Writing_zone_enabled true', () => {
    const e = {
      target: { id: 'writing_zone_enabled', checked: true },
    };

    wrapper.instance().handleChange(e);
    expect(wrapper.state('writing_zone_frequency')).toEqual(['every_other_segment']);
  });
  it('verify Writing_zone_enabled false', () => {
    const e = {
      target: { id: 'writing_zone_enabled', checked: false, value: '0' },
    };
    wrapper.instance().handleChange(e);
    expect(wrapper.state('writing_zone_frequency')).toEqual(['-2']);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('verify student level changed', () => {
    const e = {
      target: { name: 'student_level', value: '2' },
    };

    wrapper.instance().handleChange(e);
    expect(wrapper.state('computer_placement')).toEqual(['0']);
  });
  it('verify eRead enabled false', () => {
    const e = {
      target: { id: 'ereads_enabled', checked: false },
    };
    wrapper.instance().handleChange(e);
    expect(wrapper.state('match_ereads_level_to_sw_reading_level')).toEqual(['-2']);
    expect(wrapper.state('ereads_level')).toEqual(['-2']);
    expect(wrapper.state('result')).toEqual(false);
  });
  it('verify eRead enabled true', () => {
    const e = {
      target: { id: 'ereads_enabled', checked: true },
    };
    wrapper.instance().handleChange(e);
    expect(wrapper.state('match_ereads_level_to_sw_reading_level')).toEqual(['1']);
    expect(wrapper.state('ereads_level')).toEqual(['-2']);
    expect(wrapper.state('result')).toEqual(false);
  });
  it('verify handle initial values', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().handleSetInitialValues(e);
    expect(wrapper.state()).toEqual(mockedstateafter);
  });
  it('verify handle restore default values', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    const mockedRestoreDefault = {
      alt_color_scheme: ['0'],
      auto_level: ['1'],
      button_rollover: ['0'],
      captioning: ['0'],
      computer_placement: [mockedPrograms.computer_placement[0]],
      ereads_enabled: ['1'],
      ereads_level: ['-2'],
      match_ereads_level_to_sw_reading_level: ['1'],
      pronunciation_tip: ['0'],
      reading_speed: ['3'],
      second_language_id: ['0'],
      student_level: [mockedPrograms.student_level[0]],
      writing_zone_enabled: ['1'],
      writing_zone_frequency: ['every_other_segment'],
    };
    wrapper.instance().handleRestoreDefault(e);
    expect(wrapper.state()).toEqual({ ...mockedRestoreDefault, result: false });
  });
  it('verify save changes values', () => {
    wrapper.instance().saveChanges();
    expect(wrapper.state()).toEqual(mockedstateafter);
  });
  it('verify handle student level change', () => {
    const e = {
      preventDefault: jest.fn(),
      target: { value: 1 },
    };
    wrapper.instance().handleSetStudentLevelChange(e);
    expect(wrapper.find('onStudentLevelClick').toBeCalled);
  });
  it('verify handle student level change', () => {
    const e = {
      preventDefault: jest.fn(),
      target: { value: -1 },
      level: '2',
    };
    wrapper.instance().setStudentLevel(e.level);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('verify handle Default Enable EreadMatchPlacementchange', () => {
    wrapper.instance().handleDefaultEnableEreadMatchPlacement();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('verify handle Default Enable EreadMatchPlacementchange', () => {
    wrapper.setProps({ programs: mockedPrograms });
    wrapper.instance().componentWillReceiveProps(mockedPrograms);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('verify handle hide save options', () => {
    wrapper.instance().hideSaveOptions();
    expect(wrapper.state('result')).toEqual(true);
  });
  it('verify handle show save options false', () => {
    wrapper.instance().showSaveOptions();
    expect(wrapper.state('result')).toEqual(false);
  });
  it('verify handle set eRead level', () => {
    mockedstate = {
      alt_color_scheme: ['0'],
      auto_level: ['1'],
      button_rollover: ['0'],
      captioning: ['0'],
      computer_placement: ['0'],
      ereads_enabled: ['1'],
      ereads_level: ['1'],
      match_ereads_level_to_sw_reading_level: ['0'],
      pronunciation_tip: ['0'],
      reading_speed: ['3'],
      result: false,
      second_language_id: ['None'],
      student_level: ['1'],
      writing_zone_enabled: ['1'],
      writing_zone_frequency: ['every_other_segment'],
    };
    wrapper.instance().handleSetEreadLevel();
    expect(wrapper.state()).toEqual(mockedstate);
  });
  it('verify handle set Writingzone level', () => {
    const e = {
      target: { value: '1' },
    };
    wrapper.instance().handleChangeWritingZone(e);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('verify handleDefaultSetEreadLevel', () => {
    const e = {
      target: { value: '1' },
    };
    wrapper.instance().handleDefaultSetEreadLevel(e);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('verify handlechangeEreadLevel', () => {
    const e = {
      target: { value: '1' },
    };
    wrapper.instance().handleChangeEreadLevelSelected(e);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('verify handle save', () => {
    const mockHandleSave = jest.fn();
    wrapper.setProps({
      handleSave: mockHandleSave,
      handleTabReset: mockHandleTabReset,
    });
    wrapper.instance().handleSaveAndReturn();
    expect(mockHandleSave).toHaveBeenCalled();
    expect(mockHandleTabReset).toHaveBeenCalled();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('verify handle save', () => {
    let event = null;
    wrapper.setProps({
      handleSave: jest.fn(),
    });
    event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().handleSubmit(event);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to render correctly when getEnglishLanguageLearnerOptions clicked', () => {
    mockedPrograms = {
      alt_color_scheme: ['0'],
      auto_level: ['1'],
      button_rollover: ['0'],
      captioning: ['0'],
      computer_placement: ['0'],
      ereads_enabled: ['1'],
      ereads_level: ['-2'],
      match_ereads_level_to_sw_reading_level: ['-2'],
      pronunciation_tip: ['0'],
      reading_speed: ['3'],
      second_language_id: ['None'],
      student_level: ['1'],
      writing_zone_enabled: ['1'],
      writing_zone_frequency: ['every_other_segment'],
    };
    wrapper = shallow(
      <ProgramSettingsViewR180NG
        programs={mockedPrograms}
        programName={'READ 180 Next Generation'}
        onStudentLevelClick={mockonStudentLevelClick}
        handleTabReset={mockHandleTabReset}
        handleToggle={mockHandleToggle}
        state={mockedstate}
      />
    );
    wrapper.setProps({ programs: mockedPrograms });
    wrapper.find('.program-settings--r180ng__quadrants');
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    it('Should contain a ProgramSettingsView', () => {
      expect(wrapper.find('.program-settings-r180ng-secondLangOption').exists()).toBeTruthy();
    });
    it('simulate Ok button click', () => {
      const okButton = wrapper.find('button[className="programsettings__btncancel"]');
      expect(okButton.exists()).toBeTruthy();
      okButton.prop('submit')(fakeEvent);
      expect(jest.fn()).toHaveBeenCalled();
    });
    it('simulate Ok button click', () => {
      const computerPlacement = wrapper.find(
        'input[className="program-settings-automaticplacement"]'
      );
      expect(computerPlacement.exists()).toBeTruthy();
      computerPlacement.prop('onChange')(fakeEvent);
      expect(jest.fn()).toHaveBeenCalled();
    });
    it('verify student level change', () => {
      event.target.value = '2';
      wrapper.instance().handleSetStudentLevelChange(event);
      const currentState = wrapper.setState({ writingzone: event.target.value });
      expect(currentState.writingzone).toEqual(event.target.value);
      expect('onStudentLevelClick').toBeCalled();
    });
    it('verify student level change', () => {
      event.target.value = '2';
      wrapper.instance().handleSubmit(event);
      const currentState = wrapper.setState({ writingzone: event.target.value });
      expect(currentState.writingzone).toEqual(event.target.value);
    });
    it('Should handle submit', () => {
      const ProgramBoxElem = wrapper.find(ProgramSettingsViewR180NG);
      wrapper.setProps({ handleSave: jest.fn() });
      ProgramBoxElem.find('onSubmit').simulate.click();
      expect(mockHandleSubmit).toHaveBeenCalledWith(mockedstate);
      expect('hideSaveOptions').toBeCalled();
    });
  });
  it('Expect to render correctly', () => {
    mockedPrograms = {
      alt_color_scheme: ['0'],
      auto_level: ['1'],
      button_rollover: ['0'],
      captioning: ['0'],
      computer_placement: ['0'],
      ereads_enabled: ['1'],
      ereads_level: ['-2'],
      match_ereads_level_to_sw_reading_level: ['-2'],
      pronunciation_tip: ['0'],
      reading_speed: ['3'],
      second_language_id: ['None'],
      student_level: ['1'],
      writing_zone_enabled: ['1'],
      writing_zone_frequency: ['every_other_segment'],
    };
    wrapper = shallow(
      <ProgramSettingsViewR180NG
        programs={mockedPrograms}
        programName={'READ 180 Next Generation'}
        onStudentLevelClick={mockonStudentLevelClick}
        handleTabReset={mockHandleTabReset}
        handleToggle={mockHandleToggle}
      />
    );
    it('on Submit', () => {
      wrapper.find('form').simulate('onSubmit', { preventDefault: () => {} });
      expect(jest.fn()).toBeCalled();
      expect(mockHandleSubmit).toBeCalledWith(mockedstate);
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
