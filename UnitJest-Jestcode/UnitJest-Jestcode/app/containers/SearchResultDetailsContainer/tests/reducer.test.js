import { fromJS } from 'immutable';
import searchResultDetailsContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('search Result Details Container Reducer', () => {
  const initialState = fromJS({
    searchResultDetailsData: [],
    detailsID: '',
    data: {},
    showTeacherMadeQuizError: false,
  });
  it('returns the initial state', () => {
    expect(searchResultDetailsContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });
  it('should handle GET_SEARCH_RESULT_DETAILS_DATA_REQUEST', () => {
    expect(
      searchResultDetailsContainerReducer(undefined, Actions.getSearchResultDetailsDataRequest())
    ).toMatchSnapshot();
  });
  it('should handle GET_SEARCH_RESULT_DETAILS_DATA_REQUEST_SUCCESS', () => {
    const searchDetailsObj = {
      output_data: [
        {
          GetBookInfoResp: [{ BookInfo: [{}, {}] }],
        },
      ],
    };
    const updatedState = fromJS({
      searchResultDetailsData: {},
      detailsID: {},
      data: {},
      showTeacherMadeQuizError: false,
    });
    expect(
      searchResultDetailsContainerReducer(
        undefined,
        Actions.getSearchResultDetailsSuccess(searchDetailsObj)
      )
    ).toEqual(updatedState);
  });
  it('should handle GET_SEARCH_QUIZ_RESULT_DETAILS_DATA_REQUEST_SUCCESS', () => {
    const searchDetailsObj = {
      output_data: [
        {
          GetQuizWithQuestionsResp: [{ Book: [{}, {}] }],
        },
      ],
    };
    const updatedState = fromJS({
      searchResultDetailsData: {},
      detailsID: {},
      data: {},
      showTeacherMadeQuizError: false,
    });
    expect(
      searchResultDetailsContainerReducer(
        undefined,
        Actions.getSearchQuizResultsSuccess(searchDetailsObj)
      )
    ).toEqual(updatedState);
  });
  it('should handle GET_SEARCH_QUIZ_RESULT_DETAILS_DATA_REQUEST_SUCCESS', () => {
    const searchDetailsObj = {
      output_data: [
        {
          GetQuizWithQuestionsResp: [],
        },
      ],
    };
    const updatedState = fromJS({
      searchResultDetailsData: [],
      detailsID: '',
      data: {},
      showTeacherMadeQuizError: false,
    });
    expect(
      searchResultDetailsContainerReducer(
        undefined,
        Actions.getSearchQuizResultsSuccess(searchDetailsObj)
      )
    ).toEqual(updatedState);
  });
  it('should handle GET_SEARCH_RESULT_DETAILS_DATA_REQUEST_SUCCESS', () => {
    const searchDetailsObj = {
      output_data: [
        {
          GetBookInfoResp: [{ BookInfo: [] }],
        },
      ],
    };
    const updatedState = fromJS({
      searchResultDetailsData: [],
      detailsID: '',
      data: {},
      showTeacherMadeQuizError: false,
    });
    expect(
      searchResultDetailsContainerReducer(
        undefined,
        Actions.getSearchResultDetailsSuccess(searchDetailsObj)
      )
    ).toEqual(updatedState);
  });
  it('should handle GET_SEARCH_RESULT_DETAILS_DATA_REQUEST__FAILURE', () => {
    expect(
      searchResultDetailsContainerReducer(undefined, Actions.getSearchResultDetailsFailure())
    ).toMatchSnapshot();
  });
  it('should handle SAVE_SEARCH_RESULT_DETAILS_DATA_REQUEST__FAILURE', () => {
    expect(
      searchResultDetailsContainerReducer(undefined, Actions.saveSearchResultDetailsDataFailure())
    ).toMatchSnapshot();
  });
  it('should handle SAVE_SEARCH_RESULT_DETAILS_DATA_REQUEST__SUCCESS', () => {
    const searchDetailsObj = {
      output_data: [
        {
          GetBookInfoResp: [{ BookInfo: [{}, {}] }],
        },
      ],
    };
    const updatedState = fromJS({
      searchResultDetailsData: {},
      detailsID: '',
      data: {},
      showTeacherMadeQuizError: false,
    });
    expect(
      searchResultDetailsContainerReducer(
        undefined,
        Actions.saveSearchResultDetailsSuccess(searchDetailsObj)
      )
    ).toEqual(updatedState);
  });
});
