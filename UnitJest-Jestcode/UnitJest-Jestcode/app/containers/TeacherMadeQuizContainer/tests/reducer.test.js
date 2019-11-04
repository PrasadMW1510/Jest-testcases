import { fromJS } from 'immutable';
import TeacherMadeQuizContainer from '../reducer';
import * as Actions from '../actions';

describe('teacher Made Quiz Container Reducer', () => {
  const initialState = fromJS({
    error: false,
    installedQuizData: [],
    installedQuizQuestionList: [],
  });

  it('returns the initial state', () => {
    expect(TeacherMadeQuizContainer(undefined, {})).toEqual(fromJS(initialState));
  });

  it('should handle GET_INSTALLEDQUIZDATA_REQUEST_SUCCESS', () => {
    const updatedVal = {};
    const installedQuizDataObj = {
      output: {
        output_data: [
          {
            GetTeacherMadeQuizzesResp: [{ Book: updatedVal }, { b: 'b' }],
          },
        ],
      },
    };
    const updatedState = fromJS({
      error: false,
      installedQuizData: updatedVal,
      installedQuizQuestionList: [],
    });
    expect(
      TeacherMadeQuizContainer(
        undefined,
        Actions.getInstalledQuizDataRequestSuccess(installedQuizDataObj)
      )
    ).toEqual(updatedState);
  });

  it('should handle GET_ADD_TEACHERMADEQUIZ_DETAILS_REQUEST_SUCCESS', () => {
    const quizQuestionsObj = {
      output_data: [
        {
          GetQuizWithQuestionsResp: [{ Book: [{}, {}] }],
        },
      ],
    };
    const updatedState = fromJS({
      error: false,
      installedQuizData: [],
      installedQuizQuestionList: {},
    });
    expect(
      TeacherMadeQuizContainer(
        undefined,
        Actions.getInstalledQuizDetailDataRequestSuccess(quizQuestionsObj)
      )
    ).toEqual(updatedState);
  });
});
