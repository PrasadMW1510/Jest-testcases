/*
 *
 * TeacherMadeQuizContainer reducer
 *
 */
import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  error: false,
  installedQuizData: [],
  installedQuizQuestionList: [],
});

function teacherMadeQuizContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.GET_INSTALLEDQUIZDATA_REQUEST_SUCCESS:
      return state.set(
        'installedQuizData',
        fromJS(action.installedQuizData.output.output_data[0].GetTeacherMadeQuizzesResp[0].Book)
      );
    case Constants.GET_ADD_TEACHERMADEQUIZ_DETAILS_REQUEST_SUCCESS:
      return state.set(
        'installedQuizQuestionList',
        fromJS(action.quizQuestions.output_data[0].GetQuizWithQuestionsResp[0].Book[0])
      );
    case Constants.DELETE_TEACHERMADEQUIZ_OLD_QUESTIONS:
      return state.set('installedQuizQuestionList', []);
    default:
      return state;
  }
}

export default teacherMadeQuizContainerReducer;
