import { fromJS } from 'immutable';
import { makeSelectPSSettingContainer } from '../selectors';

describe('selectPSSettingContainerDomain', () => {
  let psSettingContainer = null;
  let mockState = null;

  beforeEach(() => {
    psSettingContainer = fromJS({
      loading: false,
      setting: {},
    });
    mockState = fromJS({
      psSettingContainer,
    });
  });

  it('should consistently return the makeSelectPSSettingContainer app state', () => {
    expect(makeSelectPSSettingContainer()(mockState)).toMatchSnapshot();
  });
});
