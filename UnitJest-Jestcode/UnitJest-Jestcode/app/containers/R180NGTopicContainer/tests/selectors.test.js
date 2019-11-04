import { fromJS } from 'immutable';
import { makeSelectR180NGTopicContainer } from '../selectors';

describe('selectProgramSetting', () => {
  it('makeSelectR180NGTopicContainer', () => {
    const r180NGTopicsData = fromJS({
      programSetting: { student_level: ['0'] },
      error: false,
      activeStage: '',
      r180ngActiveSelectedStage: '',
      r180ngTopics: { topic_cd: [] },
      r180ngTopicsInstalledStage: [{}],
    });
    const mockedState = fromJS({
      r180NGTopicsData,
    });
    expect(makeSelectR180NGTopicContainer()(mockedState)).toEqual(r180NGTopicsData);
  });
});
