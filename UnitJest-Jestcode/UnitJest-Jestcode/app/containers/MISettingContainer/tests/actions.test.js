import * as Actions from '../actions';

describe('MISettingContainer Actions', () => {
  it('should cancel correctly', () => {
    expect(Actions.MICancel()).toMatchSnapshot();
  });

  describe('Get MI program settings', () => {
    it('should return the correct constant for MIProgramSettingsRequest', () => {
      expect(Actions.MIProgramSettingsRequest()).toMatchSnapshot();
    });

    it('should return the correct constant for MIProgramSettingsRequestSuccess with params', () => {
      const programSettings = {
        key1: 'value1',
      };
      const proficiencyBandData = {
        key1: 'value1',
      };
      expect(
        Actions.MIProgramSettingsRequestSuccess(programSettings, proficiencyBandData)
      ).toMatchSnapshot();
    });

    it('should return the correct constant for MIProgramSettingsRequestSuccess without params', () => {
      expect(Actions.MIProgramSettingsRequestSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for MIProgramSettingsRequestFailure', () => {
      const error = { type: 'my error' };
      expect(Actions.MIProgramSettingsRequestFailure(error)).toMatchSnapshot();
    });
  });

  describe('Save MI program settings', () => {
    it('should return the correct constant for MISaveRequest', () => {
      const programSettingsToSave = {
        key1: 'value1',
        key2: 'value2',
      };
      expect(Actions.MISaveRequest(programSettingsToSave)).toMatchSnapshot();
    });

    it('should return the correct constant for MISaveRequestSuccess', () => {
      expect(Actions.MISaveRequestSuccess()).toMatchSnapshot();
    });

    it('should return the correct constant for MISaveRequestFailure', () => {
      const error = { type: 'my error' };
      expect(Actions.MISaveRequestFailure(error)).toMatchSnapshot();
    });
  });
});
