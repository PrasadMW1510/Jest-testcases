import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';

import S44PlacementAndLevelingOptions from '../index';

describe('<S44PlacementAndLevelingOptions />', () => {
  let wrapper = null;

  let mockCallBackFunc = null;
  let mockSettingObj = null;

  const fakeTrueEvent = {
    target: {
      checked: true,
    },
  };

  const fakeFalseEvent = {
    target: {
      checked: false,
    },
  };

  const testEnableFastTrack = () => {
    let enableFastTrackCheckbox = null;

    beforeEach(() => {
      enableFastTrackCheckbox = wrapper.find(
        'SettingsFourStateCheckbox[checkboxText="Enable Fast-Track between series"]'
      );
    });

    it('handles true click', () => {
      enableFastTrackCheckbox.prop('handleChangeCheckboxValue')(fakeTrueEvent);

      mockSettingObj.enable_fasttrack = ['1'];
      expect(mockCallBackFunc).toHaveBeenCalledWith(mockSettingObj);
    });

    it('handles false click', () => {
      enableFastTrackCheckbox.prop('handleChangeCheckboxValue')(fakeTrueEvent);
      enableFastTrackCheckbox.prop('handleChangeCheckboxValue')(fakeFalseEvent);

      mockSettingObj.enable_fasttrack = ['0'];
      expect(mockCallBackFunc).toHaveBeenCalledWith(mockSettingObj);
    });
  };

  beforeEach(() => {
    mockCallBackFunc = jest.fn();
  });

  describe('student hasnt started working', () => {
    describe('auto_placement is 0', () => {
      beforeEach(() => {
        mockSettingObj = {
          has_started_working: ['false'],
          auto_placement: ['0'],
          initial_placement: ['0'],
          enable_fasttrack: ['0'],
          spanish_support: ['0'],
          captioning: ['0'],
          writing_enabled: ['0'],
        };

        wrapper = shallow(
          <S44PlacementAndLevelingOptions
            callBackFunc={mockCallBackFunc}
            settingsObj={mockSettingObj}
          />
        );
      });

      it('Expect to render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      describe('Initial settings radio buttons', () => {
        let autoPlacementRadioButton = null;
        let setInitialRadioButton = null;

        beforeEach(() => {
          autoPlacementRadioButton = wrapper.find('input[id="autoPlacement"]');
          setInitialRadioButton = wrapper.find('input[id="setInitial"]');
        });

        describe('auto placement radio button', () => {
          it('auto_placement is set to 0', () => {
            autoPlacementRadioButton.simulate('change');

            mockSettingObj.auto_placement = ['1'];
            mockSettingObj.initial_placement = ['0'];
            expect(mockCallBackFunc).toHaveBeenCalledWith(mockSettingObj);
          });
        });

        describe('set initial radio button', () => {
          it('auto_placement is set to 0', () => {
            autoPlacementRadioButton.simulate('change');
            setInitialRadioButton.simulate('change');

            mockSettingObj.auto_placement = ['0'];
            expect(mockCallBackFunc).toHaveBeenCalledWith(mockSettingObj);
          });
        });
      });

      it('Initial value select on change', () => {
        const initialValueSelect = wrapper.find('select');
        initialValueSelect.simulate('change', { target: { value: '17' } });

        mockSettingObj.initial_placement = ['17'];
        expect(mockCallBackFunc).toHaveBeenCalledWith(mockSettingObj);
      });

      describe('Enable Fast Track checkbox', () => {
        testEnableFastTrack();
      });
    });

    describe('auto_placement is 1', () => {
      beforeEach(() => {
        mockSettingObj = {
          has_started_working: ['false'],
          auto_placement: ['1'],
          initial_placement: ['0'],
          enable_fasttrack: ['0'],
          spanish_support: ['0'],
          captioning: ['0'],
          writing_enabled: ['0'],
        };

        wrapper = shallow(
          <S44PlacementAndLevelingOptions
            callBackFunc={mockCallBackFunc}
            settingsObj={mockSettingObj}
          />
        );
      });

      it('Expect to render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      describe('Initial settings radio buttons', () => {
        let autoPlacementRadioButton = null;
        let setInitialRadioButton = null;

        beforeEach(() => {
          autoPlacementRadioButton = wrapper.find('input[id="autoPlacement"]');
          setInitialRadioButton = wrapper.find('input[id="setInitial"]');
        });

        describe('auto placement radio button', () => {
          it('auto_placement is set to 0', () => {
            autoPlacementRadioButton.simulate('change');

            mockSettingObj.auto_placement = ['1'];
            mockSettingObj.initial_placement = ['0'];
            expect(mockCallBackFunc).toHaveBeenCalledWith(mockSettingObj);
          });
        });

        describe('set initial radio button', () => {
          it('auto_placement is set to 0', () => {
            autoPlacementRadioButton.simulate('change');
            setInitialRadioButton.simulate('change');

            mockSettingObj.auto_placement = ['0'];
            expect(mockCallBackFunc).toHaveBeenCalledWith(mockSettingObj);
          });
        });
      });

      it('Initial value select on change', () => {
        const initialValueSelect = wrapper.find('select');
        initialValueSelect.simulate('change', { target: { value: '17' } });

        mockSettingObj.initial_placement = ['17'];
        expect(mockCallBackFunc).toHaveBeenCalledWith(mockSettingObj);
      });

      describe('Enable Fast Track checkbox', () => {
        testEnableFastTrack();
      });
    });
  });

  describe('student has started working', () => {
    describe('isS44NG is false', () => {
      beforeEach(() => {
        mockSettingObj = {
          has_started_working: ['true'],
          auto_placement: ['0'],
          initial_placement: ['0'],
          enable_fasttrack: ['0'],
          spanish_support: ['0'],
          captioning: ['0'],
          writing_enabled: ['0'],
        };

        wrapper = shallow(
          <S44PlacementAndLevelingOptions
            callBackFunc={mockCallBackFunc}
            settingsObj={mockSettingObj}
            isHalfHeight={false}
            isHalfWidth={false}
          />
        );
      });

      it('Expect to render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      describe('Enable Fast Track checkbox', () => {
        testEnableFastTrack();
      });
    });

    describe('isS44NG is true', () => {
      beforeEach(() => {
        mockSettingObj = {
          has_started_working: ['true'],
          auto_placement: ['0'],
          initial_placement: ['0'],
          enable_fasttrack: ['0'],
          spanish_support: ['0'],
          captioning: ['0'],
          writing_enabled: ['0'],
        };

        wrapper = shallow(
          <S44PlacementAndLevelingOptions
            callBackFunc={mockCallBackFunc}
            settingsObj={mockSettingObj}
            isHalfHeight={false}
            isHalfWidth={false}
            isS44NG
          />
        );
      });

      it('Expect to render correctly', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
      });

      describe('Enable Fast Track checkbox', () => {
        testEnableFastTrack();
      });
    });
  });
});
