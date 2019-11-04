import { fromJS } from 'immutable';

import portfolioPageContainerReducer from '../reducer';
import * as Actions from '../actions';
import * as Constants from '../constants';

describe('PortfolioPageContainer reducer', () => {
  const initialState = fromJS({
    classData: [],
    selectedSchoolId: '',
    selectedGradeId: '',
    selectedClassAssignments: [],
    baseAssignmentData: [],
    programList: [],
    programListforTabs: [],
    rubricDefenitions: [],
    unReadPrograms: 0,
    submissionsCount: 0,
    newThisWeekCount: 0,
    assunReadPrograms: 0,
    asssubmissionsCount: 0,
    assnewThisWeekCount: 0,
    studentSubmissions: {
      loading: false,
      results: [],
      itemCount: Constants.UNINITIALIZED_ITEM_COUNT,
      paginationData: {},
    },
    communityClasses: {
      loading: false,
      results: [],
      itemCount: Constants.UNINITIALIZED_ITEM_COUNT,
      paginationData: {},
    },
  });

  it('returns the initial state', () => {
    expect(portfolioPageContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });

  it('should handle SET_PORTFOLIO_TEACHERS_DATA', () => {
    const updatedVal = [];
    const teacherObj = [];
    const updatedState = fromJS({
      ...initialState.toJS(),
      classData: updatedVal,
    });
    expect(
      portfolioPageContainerReducer(undefined, Actions.getClassDataRequestSuccess(teacherObj))
    ).toEqual(updatedState);
  });
  it('should handle SET_STUDENT_SUBMISSION_META_DATA', () => {
    const updatedVal = [];
    const data = [];
    const updatedState = fromJS({
      ...initialState.toJS(),
      selectedClassAssignments: updatedVal,
    });
    expect(
      portfolioPageContainerReducer(undefined, Actions.setStudentRequestSuccess(data))
    ).toEqual(updatedState);
  });
  it('should handle SET_PORTFOLIO_PROGRAM_LIST', () => {
    const updatedVal = [];
    const data = [];
    const updatedState = fromJS({
      ...initialState.toJS(),
      programList: updatedVal,
    });
    expect(portfolioPageContainerReducer(undefined, Actions.setProgramListSuccess(data))).toEqual(
      updatedState
    );
  });
  it('should handle SET_PORTFOLIO_PROGRAM_LIST_FOR_TABS', () => {
    const updatedVal = [];
    const data = [];
    const updatedState = fromJS({
      ...initialState.toJS(),
      programListforTabs: updatedVal,
    });
    expect(
      portfolioPageContainerReducer(undefined, Actions.setProgramListForTabSuccess(data))
    ).toEqual(updatedState);
  });
  it('should handle GET_STUDENT_SUBMISSION_META_DATA_COUNT', () => {
    const data = [];
    expect(
      portfolioPageContainerReducer(undefined, Actions.setStudentSetCount(data))
    ).toMatchSnapshot();
  });
  it('should handle SET_ASSIGNMENT_COUNT', () => {
    const data = [];
    expect(
      portfolioPageContainerReducer(undefined, Actions.setStudentAssignmentSetCount(data))
    ).toMatchSnapshot();
  });
  it('should handle SET_ASSIGNMENT_META_DATA', () => {
    const updatedVal = [];
    const data = [];
    const updatedState = fromJS({
      ...initialState.toJS(),
      baseAssignmentData: updatedVal,
    });
    expect(
      portfolioPageContainerReducer(undefined, Actions.setStudentAssignmentRequestSuccess(data))
    ).toEqual(updatedState);
  });
  it('should handle SET_RUBRIC_DEFENITIONS', () => {
    const updatedVal = '';
    const data = {
      output_data: [
        {
          rubrics: [
            {
              rubric: '',
            },
          ],
        },
      ],
    };
    const updatedState = fromJS({
      ...initialState.toJS(),
      rubricDefenitions: updatedVal,
    });
    expect(
      portfolioPageContainerReducer(undefined, Actions.getRubricDefenitionSuccess(data))
    ).toEqual(updatedState);
  });
  it('should handle GET_STUDENT_SUBMISSION_SUCCESS', () => {
    const updatedVal = [];
    const studentSubmissionsobj = {
      output_data: [
        {
          workItemsMetadata: [{ workItemMetadata: updatedVal }, { b: 'b' }],
        },
      ],
      pagination_data: [{}],
      item_count: [undefined],
    };
    const updatedState = fromJS({
      ...initialState.toJS(),
      studentSubmissions: {
        loading: false,
        results: [],
        itemCount: undefined,
        paginationData: {},
      },
    });
    expect(
      portfolioPageContainerReducer(
        undefined,
        Actions.getStudentSubmissionSuccess(studentSubmissionsobj)
      )
    ).toEqual(updatedState);
  });
  it('should handle GET_CLASS_COMMUNITY_SUCCESS', () => {
    const updatedVal = [];
    const studentSubmissionsobj = {
      output_data: [
        {
          classes: [{ class: updatedVal }, { b: 'b' }],
        },
      ],
      pagination_data: [{}],
      item_count: [undefined],
    };
    const updatedState = fromJS({
      ...initialState.toJS(),
      communityClasses: {
        loading: false,
        results: [],
        itemCount: undefined,
        paginationData: {},
      },
    });
    expect(
      portfolioPageContainerReducer(
        undefined,
        Actions.getClassCommunityDataSuccess(studentSubmissionsobj)
      )
    ).toEqual(updatedState);
  });
});
