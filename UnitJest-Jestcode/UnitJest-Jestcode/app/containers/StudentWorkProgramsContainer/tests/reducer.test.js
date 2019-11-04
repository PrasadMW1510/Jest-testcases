import { fromJS } from 'immutable';
import studentWorkProgramsContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('studentWorkProgramsContainerReducer', () => {
  const initialState = fromJS({
    iReadStudentWorkData: [],
    openSaveSuccessModal: false,
    showDeleteModal: false,
  });
  it('returns the initial state', () => {
    expect(studentWorkProgramsContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });
  it('should handle GET_IREAD_STUDENT_WORK_DATA', () => {
    expect(
      studentWorkProgramsContainerReducer(undefined, Actions.getIreadStudentWorkData())
    ).toMatchSnapshot();
  });
  it('should handle POST_IREAD_STUDENT_WORK_DATA', () => {
    expect(
      studentWorkProgramsContainerReducer(undefined, Actions.postIReadStudentWorkData())
    ).toMatchSnapshot();
  });
  it('should handle SAVE_IREAD_STUDENT_WORK_DATA_REQUEST_SUCCESS', () => {
    expect(
      studentWorkProgramsContainerReducer(
        undefined,
        Actions.saveIReadStudentWorkDataRequestSuccess()
      )
    ).toMatchSnapshot();
  });
  it('should handle SAVE_IREAD_STUDENT_WORK_DATA_REQUEST_FAILURE', () => {
    expect(
      studentWorkProgramsContainerReducer(
        undefined,
        Actions.saveIReadStudentWorkDataRequestFailure()
      )
    ).toMatchSnapshot();
  });
  it('should handle SHOW_DELETE_MODAL', () => {
    expect(
      studentWorkProgramsContainerReducer(undefined, Actions.showDeleteModal())
    ).toMatchSnapshot();
  });
  it('should handle DELETE_IREAD_STUDENT_WORK_SUCCESS', () => {
    expect(
      studentWorkProgramsContainerReducer(undefined, Actions.delIReadStudentWorkDataSuccess())
    ).toMatchSnapshot();
  });
  it('should handle GET_IREAD_STUDENT_WORK_DATA_SUCCESS', () => {
    const updatedVal = 'abcd';
    const getAllStudentGoalsDataObj = {
      output_data: [
        {
          workItems: [
            {
              classAssignmentWorkItem: [
                {
                  classAssignmentGroup: [
                    {
                      classAssignment: [
                        {
                          studentAssignments: [
                            {
                              student: [updatedVal],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
    const updatedState = fromJS({
      ...initialState.toJS(),
      openSaveSuccessModal: true,
      iReadStudentWorkData: updatedVal,
    });
    expect(
      studentWorkProgramsContainerReducer(
        undefined,
        Actions.getIReadStudentWorkDataRequestSuccess(getAllStudentGoalsDataObj)
      )
    ).toEqual(updatedState);
  });
});
