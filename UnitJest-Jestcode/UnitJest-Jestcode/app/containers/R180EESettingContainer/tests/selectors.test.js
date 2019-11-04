import { fromJS } from 'immutable';
import { makeSelectR180EESettingContainer, getSelectedStage } from '../selectors';

describe('selectR180EESettingContainerDomain', () => {
  let r180EESettingContainer = null;
  let mockState = null;

  beforeEach(() => {
    r180EESettingContainer = fromJS({
      loading: false,
      settings: {},
      topicManager: {
        selectedStage: 'mockSelectedStage',
      },
    });
    mockState = fromJS({
      r180EESettingContainer,
    });
  });

  it('should consistently return the r180EESettingContainer app state', () => {
    expect(makeSelectR180EESettingContainer()(mockState)).toMatchSnapshot();
  });

  it('should consistently return the getSelectedStage value', () => {
    expect(getSelectedStage()(mockState)).toMatchSnapshot();
  });
});
