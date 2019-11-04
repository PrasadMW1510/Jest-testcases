import { fromJS } from 'immutable';

import studentWorksContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('studentWorksContainerReducer reducer', () => {
  const initialState = fromJS({
    treeData: [],
    selectedSchoolId: '',
    selectedGradeId: '',
    selectedTeacherId: '',
    selectedClassAssignments: [],
  });
  it('returns the initial state', () => {
    expect(studentWorksContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });

  it('should handle SET_SCHOOL_DATA', () => {
    const updatedVal = [];
    const classObj = {
      output_data: [{ organizations: [{ organization: updatedVal }, { b: 'b' }] }],
    };
    const updatedState = fromJS({
      ...initialState.toJS(),
      treeData: updatedVal,
    });
    expect(
      studentWorksContainerReducer(undefined, Actions.getSchoolDataRequestSuccess(classObj))
    ).toEqual(updatedState);
  });
  it('should handle SET_GRADE_DATA', () => {
    const updatedVal = [];
    const gradeObj = [];
    const updatedState = fromJS({
      ...initialState.toJS(),
      treeData: updatedVal,
    });
    expect(
      studentWorksContainerReducer(undefined, Actions.getGradeDataRequestSuccess(gradeObj))
    ).toEqual(updatedState);
  });
  it('should handle SET_GRADE_ID', () => {
    const updatedVal = [];
    const gradeId = [];
    const updatedState = fromJS({
      ...initialState.toJS(),
      selectedSchoolId: updatedVal,
    });
    expect(
      studentWorksContainerReducer(undefined, Actions.setGradeDataRequestSuccess(gradeId))
    ).toEqual(updatedState);
  });
  it('should handle SET_TEACHERS_DATA', () => {
    const updatedVal = [];
    const gradeObj = [];
    const updatedState = fromJS({
      ...initialState.toJS(),
      treeData: updatedVal,
    });
    expect(
      studentWorksContainerReducer(undefined, Actions.getTeacherDataRequestSuccess(gradeObj))
    ).toEqual(updatedState);
  });
  it('should handle SET_PORTFOLIO_GRADE_ID', () => {
    const updatedVal = [];
    const gradeId = [];
    const updatedState = fromJS({
      ...initialState.toJS(),
      selectedGradeId: updatedVal,
    });
    expect(
      studentWorksContainerReducer(undefined, Actions.setPortfolioSelectedGradeId(gradeId))
    ).toEqual(updatedState);
  });
  it('should handle SET_STUDENT_SUBMISSION_META_DATA', () => {
    const updatedVal = [];
    const gradeObj = [];
    const updatedState = fromJS({
      ...initialState.toJS(),
      treeData: updatedVal,
    });
    expect(
      studentWorksContainerReducer(undefined, Actions.setStudentRequestSuccess(gradeObj))
    ).toEqual(updatedState);
  });
  it('should handle SET_PORTFOLIO_TEACHER_ID', () => {
    const updatedVal = [];
    const data = [];
    const updatedState = fromJS({
      ...initialState.toJS(),
      selectedTeacherId: updatedVal,
    });
    expect(
      studentWorksContainerReducer(undefined, Actions.setPortfolioSelectedTeacherId(data))
    ).toEqual(updatedState);
  });
});
