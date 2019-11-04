import * as SmartBarActions from 'containers/SmartBarContainer/actions';

import * as Actions from '../actions';
import ireadSettingsContainerReducer from '../reducer';

describe('ireadSettingsContainerReducer', () => {
  it('returns the initial state', () => {
    expect(ireadSettingsContainerReducer(undefined, {})).toMatchSnapshot();
  });

  describe('should set loading to true', () => {
    it('should handle IreadProgramSettingsRequest action', () => {
      expect(
        ireadSettingsContainerReducer(undefined, Actions.IreadProgramSettingsRequest())
      ).toMatchSnapshot();
    });

    it('should handle classSelectionSuccess action', () => {
      expect(
        ireadSettingsContainerReducer(undefined, SmartBarActions.classSelectionSuccess())
      ).toMatchSnapshot();
    });

    it('should handle groupSelectionSuccess action', () => {
      expect(
        ireadSettingsContainerReducer(undefined, SmartBarActions.groupSelectionSuccess())
      ).toMatchSnapshot();
    });

    it('should handle studentSelectionSuccess action', () => {
      expect(
        ireadSettingsContainerReducer(undefined, SmartBarActions.studentSelectionSuccess())
      ).toMatchSnapshot();
    });
  });

  it('should handle IreadSaveRequestSuccess action', () => {
    expect(
      ireadSettingsContainerReducer(undefined, Actions.IreadSaveRequestSuccess())
    ).toMatchSnapshot();
  });

  it('should handle IreadProgramSettingsRequestSuccess action', () => {
    expect(
      ireadSettingsContainerReducer(
        undefined,
        Actions.IreadProgramSettingsRequestSuccess('mockProgramSettings')
      )
    ).toMatchSnapshot();
  });

  it('should handle IreadProgramSettingsRequestFailure action', () => {
    expect(
      ireadSettingsContainerReducer(
        undefined,
        Actions.IreadProgramSettingsRequestFailure('mockFailure')
      )
    ).toMatchSnapshot();
  });
});
