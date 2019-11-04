import * as Actions from '../actions';

describe('RISettingContainer Actions', () => {
  it('should cancel correctly', () => {
    expect(Actions.RICancel()).toMatchSnapshot();
  });

  describe('Get RI program settings', () => {
    it('should return the correct constant for RIProgramSettingsRequest', () => {
      expect(Actions.RIProgramSettingsRequest()).toMatchSnapshot();
    });

    it('should return the correct constant for RIProgramSettingsRequestSuccess with params', () => {
      const programSettings = {
        key1: 'value1',
      };
      const proficiencyBandData = {
        key1: 'value1',
      };
      expect(
        Actions.RIProgramSettingsRequestSuccess(programSettings, proficiencyBandData)
      ).toMatchSnapshot();
    });

    it('should return the correct constant for RIProgramSettingsRequestSuccess without params', () => {
      expect(Actions.RIProgramSettingsRequestSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for RIProgramSettingsRequestFailure', () => {
      const error = { type: 'my error' };
      expect(Actions.RIProgramSettingsRequestFailure(error)).toMatchSnapshot();
    });
  });

  describe('Save RI program settings', () => {
    it('should return the correct constant for RISaveRequest', () => {
      const programSettingsToSave = {
        key1: 'value1',
        key2: 'value2',
      };
      expect(Actions.RISaveRequest(programSettingsToSave)).toMatchSnapshot();
    });

    it('should return the correct constant for RISaveRequestSuccess', () => {
      expect(Actions.RISaveRequestSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for RISaveRequestFailure', () => {
      const error = { type: 'my error' };
      expect(Actions.RISaveRequestFailure(error)).toMatchSnapshot();
    });
  });
});
