/*
 *
 * StudentWorksContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  treeData: [],
  selectedSchoolId: '',
  selectedGradeId: '',
  selectedTeacherId: '',
  selectedClassAssignments: [],
});

function studentWorksContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.SET_SCHOOL_DATA:
      return state.set(
        'treeData',
        fromJS(action.classObj.output_data[0].organizations[0].organization)
      );
    case Constants.SET_GRADE_DATA:
      return state.set('treeData', fromJS(action.gradeObj));
    case Constants.SET_GRADE_ID:
      return state.set('selectedSchoolId', fromJS(action.gradeId));
    case Constants.SET_TEACHERS_DATA:
      return state.set('treeData', fromJS(action.teacherObj));
    case Constants.SET_PORTFOLIO_GRADE_ID:
      return state.set('selectedGradeId', fromJS(action.gradeId));
    case Constants.SET_STUDENT_SUBMISSION_META_DATA:
      return state.set('selectedClassAssignments', fromJS(action.data));
    case Constants.SET_PORTFOLIO_TEACHER_ID:
      return state.set('selectedTeacherId', fromJS(action.data));

    default:
      return state;
  }
}

export default studentWorksContainerReducer;
