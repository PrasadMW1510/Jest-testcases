// TODO: Uncomment any imports as required.

import { fromJS } from 'immutable';
import {
  makeSelectRCSettingContainer,
  // getSelectedStage,
} from '../selectors';

describe('selectRCSettingContainerDomain', () => {
  let rcSettingContainer = null;
  let mockState = null;

  beforeEach(() => {
    rcSettingContainer = fromJS({
      loading: false,
      settings: {},
      topicManager: {
        selectedStage: 'mockSelectedStage',
      },
    });
    mockState = fromJS({
      rcSettingContainer,
    });
  });

  it('should consistently return the rcSettingContainer app state', () => {
    expect(makeSelectRCSettingContainer()(mockState)).toMatchSnapshot();
  });

  // TODO: If your settings require selectina a subproduct (stage), uncomment below.

  /* it('should consistently return the getSelectedStage value', () => {
    expect(getSelectedStage()(mockState)).toMatchSnapshot();
  }); */
});
