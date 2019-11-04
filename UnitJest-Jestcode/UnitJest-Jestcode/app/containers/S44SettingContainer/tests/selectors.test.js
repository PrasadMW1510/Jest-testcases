import { fromJS } from 'immutable';
import { makeSelectS44SettingContainer } from '../selectors';

describe('selectS44SettingContainerDomain', () => {
  let s44SettingContainer = null;
  let mockState = null;

  beforeEach(() => {
    s44SettingContainer = fromJS({
      mockProp: null,
    });
    mockState = fromJS({
      s44SettingContainer,
    });
  });

  it('should consistently return the s44SettingContainer app state', () => {
    expect(makeSelectS44SettingContainer()(mockState)).toMatchSnapshot();
  });
});
