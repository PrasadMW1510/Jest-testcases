import { fromJS } from 'immutable';
import inboxModalContainerReducer from '../reducer';
import * as Actions from '../actions';
import * as Constants from '../constants';

describe('inboxModalContainerReducer reducer', () => {
  const initialState = fromJS({
    error: false,
    studentProgram: {
      loading: false,
      results: [],
      itemCount: Constants.UNINITIALIZED_ITEM_COUNT,
      paginationData: {},
    },
    evaluationProgram: {
      loading: false,
      results: [],
      itemCount: Constants.UNINITIALIZED_ITEM_COUNT,
      paginationData: {},
    },
    question: [],
    studentfailure: '',
  });

  it('returns the initial state', () => {
    expect(inboxModalContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });

  it('should handle GET_STUDENT_PROGRAM_DETAIL_REQUEST_SUCCESS', () => {
    const resultsDataObj = {
      output_data: [
        {
          GetQuizCollectionNamesResp: [],
        },
      ],
      item_count: ['-1'],
      pagination_data: [{}],
    };
    expect(
      inboxModalContainerReducer(
        undefined,
        Actions.getStudentProgramDetailsDataSuccess(resultsDataObj)
      )
    ).toMatchSnapshot();
  });
  it('should handle SAVE_STUDENT_EVALUATION_DATA_SUCCESS', () => {
    const responseDataObj = {
      output_data: [
        {
          GetQuizCollectionNamesResp: [],
        },
      ],
      item_count: ['-1'],
      pagination_data: [{}],
    };
    expect(
      inboxModalContainerReducer(
        undefined,
        Actions.saveStudentEvalulationDataSuccess(responseDataObj)
      )
    ).toMatchSnapshot();
  });
  // it('should handle GET_STUDENT_SKILL_ASSESTMENT_QUESTION_FAILURE', () => {
  //   const responseDataObj = 'sdfsf';
  //   expect(
  //     inboxModalContainerReducer(undefined, Actions.getStudentQuestionDataFailure(responseDataObj))
  //   ).toMatchSnapshot();
  // });
  it('should handle GET_STUDENT_SKILL_ASSESTMENT_QUESTION_SUCCESS', () => {
    expect(
      inboxModalContainerReducer(undefined, Actions.getStudentQuestionDataSuccess())
    ).toMatchSnapshot();
  });
  it('should handle DEFAULT_ACTION', () => {
    expect(inboxModalContainerReducer(undefined, Actions.defaultAction())).toMatchSnapshot();
  });
});
