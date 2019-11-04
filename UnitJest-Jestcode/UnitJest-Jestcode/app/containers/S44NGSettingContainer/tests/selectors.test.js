import { fromJS } from 'immutable';
import * as Selectors from '../selectors';

describe('selectS44NGSettingContainerDomain', () => {
  let s44NGSettingContainer = null;
  let mockState = null;

  beforeEach(() => {
    s44NGSettingContainer = fromJS({
      mockProp: null,
    });
    mockState = fromJS({
      s44NGSettingContainer,
    });
  });

  it('should consistently return the s44NGSettingContainer app state', () => {
    expect(Selectors.makeSelectS44NGSettingContainer()(mockState)).toMatchSnapshot();
  });
});
