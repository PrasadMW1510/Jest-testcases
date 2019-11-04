import { fromJS } from 'immutable';
import r180NGTopicContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('r180NGTopicContainerReducer', () => {
  const initialState = fromJS({
    error: false,
    loading: false,
    r180ngTopics: [],
    r180ngTopicsInstalledStages: [],
    r180ngActiveSelectedStage: '',
  });
  const mockedR180ngTopics = { output: { output_data: [{ topic_cds: [{ topic_cd: [{}] }] }] } };
  it('returns the initial state', () => {
    expect(r180NGTopicContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });

  it('should handle R180NGTopic request success actions', () => {
    expect(
      r180NGTopicContainerReducer(undefined, Actions.R180NGTopicsRequestSuccess(mockedR180ngTopics))
    ).toMatchSnapshot();
  });

  it('should handle update R180NGTopic request success actions', () => {
    expect(
      r180NGTopicContainerReducer(
        undefined,
        Actions.updateR180NGTopicsRequestSuccess(mockedR180ngTopics)
      )
    ).toMatchSnapshot();
  });

  it('should handle R180NGTopic installed stage update  Info request success actions', () => {
    expect(
      r180NGTopicContainerReducer(
        undefined,
        Actions.updateR180NGTopicsSelectedStageRequestSuccess('stage')
      )
    ).toMatchSnapshot();
  });

  it('should handle R180NGTopicsInstalledStagesRequest Info request success actions', () => {
    expect(
      r180NGTopicContainerReducer(undefined, Actions.R180NGTopicsInstalledStagesRequestSuccess())
    ).toMatchSnapshot();
  });

  it('should handle R180NGProgramSettings request failure actions', () => {
    expect(
      r180NGTopicContainerReducer(undefined, Actions.R180NGTopicsRequestFailure('err'))
    ).toMatchSnapshot();
  });

  it('should handle R180NGTopicsSettings request failure actions', () => {
    expect(
      r180NGTopicContainerReducer(
        undefined,
        Actions.R180NGTopicsInstalledStagesRequestFailure('err')
      )
    ).toMatchSnapshot();
  });

  it('should handle R180NGTopicsSettings request failure actions', () => {
    expect(
      r180NGTopicContainerReducer(undefined, Actions.R180NGTopicsSaveRequestFailure('err'))
    ).toMatchSnapshot();
  });
});
