import { fromJS } from 'immutable';
import * as Selectors from '../selectors';

describe('selectProgramSettingsContainerDomain', () => {
  let programSettingsContainer = null;
  let mockState = null;

  beforeEach(() => {
    programSettingsContainer = fromJS({
      enrollmentList: [],
    });
    mockState = fromJS({
      programSettingsContainer,
    });
  });

  it('should consistently return the programSettingsContainer app state', () => {
    expect(Selectors.makeSelectProgramSettingsContainer()(mockState)).toMatchSnapshot();
  });

  describe('isProgramSettingsLoading', () => {
    it('should return true if mockState is undefined', () => {
      programSettingsContainer = undefined;
      mockState = fromJS({
        programSettingsContainer,
      });

      expect(Selectors.isProgramSettingsLoading()(mockState)).toBeTruthy();
    });

    it('should return loading prop', () => {
      programSettingsContainer = fromJS({
        loading: false,
      });
      mockState = fromJS({
        programSettingsContainer,
      });

      expect(Selectors.isProgramSettingsLoading()(mockState)).toBeFalsy();
    });
  });

  it('should consistently return the programSettingsContainer app enrollmentList state', () => {
    expect(Selectors.makeSelectEnrollmentList()(mockState)).toMatchSnapshot();
  });
});
