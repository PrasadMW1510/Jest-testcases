import { fromJS } from 'immutable';
import read180NgContainerReducer from '../reducer';
import * as Actions from '../actions';
import * as Constants from '../constants';

describe('Read180NgContainer reducer', () => {
  const initialState = fromJS({
    read180Program: {
      loading: false,
      results: [],
      itemCount: Constants.UNINITIALIZED_ITEM_COUNT,
      paginationData: {},
    },
    read180PostProgram: {
      loading: false,
      results: [],
      itemCount: Constants.UNINITIALIZED_ITEM_COUNT,
      paginationData: {},
    },
  });

  it('returns the initial state', () => {
    expect(read180NgContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });

  it('should handle READ_180_NG_DATA_REQUEST_SUCCESS', () => {
    const searchResultsobj = {
      output_data: [],
      pagination_data: [{}],
      item_count: [-1],
    };
    const updatedState = fromJS({
      read180Program: {
        loading: false,
        results: undefined,
        itemCount: -1,
        paginationData: {},
      },
      read180PostProgram: {
        loading: false,
        results: [],
        itemCount: Constants.UNINITIALIZED_ITEM_COUNT,
        paginationData: {},
      },
    });
    expect(
      read180NgContainerReducer(undefined, Actions.getRead180DataRequestSuccess(searchResultsobj))
    ).toEqual(updatedState);
  });

  it('should handle SET_180_NG_DATA_REQUEST_SUCCESS', () => {
    const searchResultsobj = {
      output_data: [],
      pagination_data: [{}],
      item_count: [-1],
    };
    const updatedState = fromJS({
      read180Program: {
        loading: false,
        results: [],
        itemCount: Constants.UNINITIALIZED_ITEM_COUNT,
        paginationData: {},
      },
      read180PostProgram: {
        loading: false,
        results: undefined,
        itemCount: -1,
        paginationData: {},
      },
    });
    expect(
      read180NgContainerReducer(undefined, Actions.setRead180DataRequestSuccess(searchResultsobj))
    ).toEqual(updatedState);
  });

  it('should handle DEFAULT_ACTION', () => {
    expect(read180NgContainerReducer(undefined, Actions.defaultAction())).toMatchSnapshot();
  });
});
