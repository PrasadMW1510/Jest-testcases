import { fromJS } from 'immutable';
import * as Selectors from '../selectors';

describe('MISettingContainer domain', () => {
  let miSettingContainer = null;
  let mockState = null;

  beforeEach(() => {
    miSettingContainer = fromJS({
      mockProp: null,
    });
    mockState = fromJS({
      miSettingContainer,
    });
  });

  it('should consistently return the miSettingContainer app state', () => {
    expect(Selectors.makeProgramSetting()(mockState)).toMatchSnapshot();
  });
});
