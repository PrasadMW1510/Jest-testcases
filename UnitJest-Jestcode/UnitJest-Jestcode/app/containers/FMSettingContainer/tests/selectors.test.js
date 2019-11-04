import { fromJS } from 'immutable';
import { makeSelectFMSettingContainer } from '../selectors';

describe('selectFMSettingContainerDomain', () => {
  let fmSettingContainer = null;
  let mockState = null;

  beforeEach(() => {
    fmSettingContainer = fromJS({
      loading: false,
      settings: {},
      advancedSettings: {},
    });
    mockState = fromJS({
      fmSettingContainer,
    });
  });

  it('should consistently return the makeSelectFMSettingContainer app state', () => {
    expect(makeSelectFMSettingContainer()(mockState)).toMatchSnapshot();
  });
});
