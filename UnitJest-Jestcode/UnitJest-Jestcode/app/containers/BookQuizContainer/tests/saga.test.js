import { takeLatest, put, select, all } from 'redux-saga/effects';
/* eslint-disable redux-saga/yield-effects */
import { getAllTeacherMadeQuizDataRequest } from 'containers/SearchResultsContainer/actions';
import defaultSaga, * as Saga from '../saga';
import * as Selectors from '../../App/selectors';
import * as Actions from '../actions';
import * as Constants from '../constants';

describe('Search Results Container saga', () => {
  let generator = null;
  let selectSelector = null;
  const err = 'mock error';

  beforeEach(() => {
    selectSelector = jest.fn();
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(selectSelector);
  });
  describe('getAllTeacherMadeQuizDataRequest having payload', () => {
    const searchAction = {
      payload: 'abcd',
    };

    beforeEach(() => {
      generator = Saga.getSearchResultsRequest(searchAction);
    });

    it('getSearchResultsRequestSuccess', () => {
      const selectDescriptor = generator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
      const selectDescriptor1 = generator.next().value;
      expect(selectDescriptor1).toMatchSnapshot();
      // const searchActionResult = {
      //   payload: { payload: 'abcd' },
      // };
      const putDescriptor1 = generator.next(searchAction).value;
      expect(putDescriptor1).toEqual(put(getAllTeacherMadeQuizDataRequest(searchAction.payload)));
      const putDescriptor2 = generator.next(searchAction).value;
      expect(putDescriptor2).toEqual(put(Actions.getSearchResultsRequestSuccess(searchAction)));
    });

    it('getSearchResultsRequestFailure', () => {
      expect(generator.next().value).toEqual(select(selectSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.getSearchResultsRequestFailure(err)));
    });
  });
  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });
    it('All calls are made', () => {
      expect(generator.next().value).toEqual(
        all([takeLatest(Constants.GET_SEARCH_RESULTS_REQUEST, Saga.getSearchResultsRequest)])
      );
    });
  });
});
