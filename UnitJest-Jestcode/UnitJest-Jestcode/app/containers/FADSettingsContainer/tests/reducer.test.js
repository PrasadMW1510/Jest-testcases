import FADSettingsContainerReducer from '../reducer';
import * as Actions from '../actions';
import * as Constants from '../constants';
describe('FADSettingsContainerReducer', () => {
  it('should handle set settings request', () => {
    expect(
      FADSettingsContainerReducer(undefined, Actions.setSettingsRequest(false, false))
    ).toMatchSnapshot();
  });

  it('should handle set settings success', () => {
    expect(
      FADSettingsContainerReducer(undefined, Actions.setSettingsSuccess('result'))
    ).toMatchSnapshot();
  });

  it('should handle set settings failure', () => {
    expect(
      FADSettingsContainerReducer(undefined, Actions.setSettingsFailure('err'))
    ).toMatchSnapshot();
  });

  it('should handle get settings request', () => {
    expect(FADSettingsContainerReducer(undefined, Actions.getSettingsRequest())).toMatchSnapshot();
  });

  it('should handle get settings success', () => {
    expect(
      FADSettingsContainerReducer(undefined, Actions.getSettingsSuccess('result'))
    ).toMatchSnapshot();
  });

  it('should handle get settings failure', () => {
    expect(
      FADSettingsContainerReducer(undefined, Actions.getSettingsFailure('err'))
    ).toMatchSnapshot();
  });

  it('should handle default action', () => {
    expect(
      FADSettingsContainerReducer(undefined, { type: Constants.DEFAULT_ACTION })
    ).toMatchSnapshot();
  });

  it('should handle undefined action', () => {
    expect(FADSettingsContainerReducer(undefined, 'SOMETHING UNDEFINED')).toMatchSnapshot();
  });
});
