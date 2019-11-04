import { fromJS } from 'immutable';
import * as Selectors from '../selectors';

describe('RISettingContainer domain', () => {
  let riSettingContainer = null;
  let mockState = null;

  beforeEach(() => {
    riSettingContainer = fromJS({
      mockProp: null,
    });
    mockState = fromJS({
      riSettingContainer,
    });
  });

  it('should consistently return the riSettingContainer app state', () => {
    expect(Selectors.makeProgramSetting()(mockState)).toMatchSnapshot();
  });
});
