import { fromJS } from 'immutable';
import { makeSelectPISettingContainer } from '../selectors';

describe('selectPISettingContainerDomain', () => {
  let piSettingContainer = null;
  let mockState = null;

  beforeEach(() => {
    piSettingContainer = fromJS({
      loading: false,
      setting: {},
    });
    mockState = fromJS({
      piSettingContainer,
    });
  });

  it('should consistently return the makeSelectPISettingContainer app state', () => {
    expect(makeSelectPISettingContainer()(mockState)).toMatchSnapshot();
  });
});
