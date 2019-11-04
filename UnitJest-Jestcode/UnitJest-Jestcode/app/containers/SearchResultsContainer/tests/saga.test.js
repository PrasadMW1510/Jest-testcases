import { takeLatest, call, put, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
/* eslint-disable redux-saga/yield-effects */
import defaultSaga, * as Saga from '../saga';
import * as Selectors from '../../App/selectors';
import * as Actions from '../actions';
import * as Request from '../request';
import * as Constants from '../constants';

describe('Search Results Container saga', () => {
  let generator = null;
  let selectSelector = null;
  let store = null;
  const err = 'mock error';

  beforeEach(() => {
    selectSelector = jest.fn();
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(selectSelector);
    store = fromJS({
      login: {
        session_id: ['adsfczas111'],
        user_id: ['user123'],
      },
      profile: {
        school_id: ['my_school'],
      },
    });
  });
  describe('getAllTeacherMadeQuizDataRequest as length less than 0 else condition', () => {
    const searchAction = {
      payload: [],
    };

    beforeEach(() => {
      generator = Saga.getAllTeacherMadeQuizDataRequest(searchAction);
    });

    it('getAllTeacherMadeQuizDataRequestSuccess', () => {
      expect(generator.next().value).toEqual(put(showLoading()));
      const selectDescriptor = generator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
      const selectDescriptor1 = generator.next().value;
      expect(selectDescriptor1).toMatchSnapshot();
      const putDescriptor1 = generator.next(searchAction).value;
      expect(putDescriptor1).toEqual(
        put(Actions.getAllTeacherMadeQuizDataRequestSuccess(searchAction))
      );
      expect(generator.next().value).toEqual(put(hideLoading()));
    });
    it('getAllTeacherMadeQuizDataRequestFailure', () => {
      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next().value).toEqual(select(selectSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.getAllTeacherMadeQuizDataRequestFailure(err))
      );
      expect(generator.next().value).toEqual(put(hideLoading()));
    });
  });
  describe('getAllTeacherMadeQuizDataRequest having payload', () => {
    it('getAllTeacherMadeQuizDataRequestSuccess', () => {
      const searchAction = {
        payload: {
          SrcSearchReq: {
            SortTerms: {
              curPage: '2',
            },
          },
        },
      };
      generator = Saga.getAllTeacherMadeQuizDataRequest(searchAction);
      expect(generator.next().value).toEqual(put(showLoading()));
      const selectDescriptor = generator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
      const selectDescriptor1 = generator.next().value;
      expect(selectDescriptor1).toMatchSnapshot();
      const putDescriptor1 = generator.next(searchAction).value;
      const putDescriptor2 = generator.next(searchAction).value;
      expect(putDescriptor1).toEqual(
        put(Actions.getAllTeacherMadeQuizDataRequestSuccess(searchAction))
      );
      expect(putDescriptor2).toEqual(
        put(Actions.putAllTeacherMadeQuizDataRequest(searchAction.payload))
      );
      expect(generator.next().value).toEqual(put(hideLoading()));
    });
    it('getAllTeacherMadeQuizDataRequestSuccess fails', () => {
      const searchAction = {
        payload: {
          SrcSearchReq: {
            SortTerms: undefined,
          },
        },
      };
      generator = Saga.getAllTeacherMadeQuizDataRequest(searchAction);
      expect(generator.next().value).toEqual(put(showLoading()));
      const selectDescriptor = generator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
      const selectDescriptor1 = generator.next().value;
      expect(selectDescriptor1).toMatchSnapshot();
      const putDescriptor1 = generator.next(searchAction).value;
      expect(putDescriptor1).toEqual(
        put(Actions.getAllTeacherMadeQuizDataRequestSuccess(searchAction))
      );
    });
    it('getAllTeacherMadeQuizDataRequestFailure', () => {
      const searchAction = {
        payload: {
          SrcSearchReq: {
            SortTerms: {
              curPage: '2',
            },
          },
        },
      };
      generator = Saga.getAllTeacherMadeQuizDataRequest(searchAction);
      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next().value).toEqual(select(selectSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.getAllTeacherMadeQuizDataRequestFailure(err))
      );
      expect(generator.next().value).toEqual(put(hideLoading()));
    });
  });
  describe('getChangeCollectionResultsRequest', () => {
    const collectionAction = {
      payload: 'abcd',
    };

    beforeEach(() => {
      generator = Saga.getChangeCollectionResultsRequest(collectionAction);
    });
    it('getChangeCollectionResultsRequestSuccess', () => {
      const putDescriptor1 = generator.next(collectionAction).value;
      expect(putDescriptor1).toEqual(
        put(Actions.getChangeCollectionResultsRequestSuccess(collectionAction.payload))
      );
    });
    it('getChangeCollectionResultsRequestFailure', () => {
      const selectDescriptor1 = generator.next().value;
      expect(selectDescriptor1).toMatchSnapshot();
      expect(generator.throw(err).value).toEqual(
        put(Actions.getChangeCollectionResultsRequestFailure(err))
      );
    });
  });

  describe('getCollectionsNameRequest', () => {
    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfadsf'],
          user_id: ['id1'],
        },
      });
      generator = Saga.getCollectionsNameRequest();
    });
    it('getCollectionsNameRequestSuccess', () => {
      expect(generator.next().value).toEqual(select(selectSelector));
      expect(generator.next(store.getIn(['session_id', 0])).value).toEqual(
        call(Request.getCollectionName, store.getIn(['session_id', 0]))
      );
      expect(generator.next().value).toEqual(put(Actions.getCollectionsNameRequestSuccess()));
    });

    it('getCollectionsNameRequestFailure', () => {
      expect(generator.next().value).toEqual(select(selectSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.getCollectionsNameRequestFailure(err))
      );
    });
  });
  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });
    it('Expects default Sagas are called', () => {
      expect(generator.next().value).toEqual(
        takeLatest(
          Constants.GET_ALL_TEACHER_MADE_QUIZ_DATA_REQUEST,
          Saga.getAllTeacherMadeQuizDataRequest
        )
      );
    });
    it('Expects default Sagas are called', () => {
      expect(generator.next().value).toEqual(
        takeLatest(Constants.GET_COLLECTIONSNAME_REQUEST, Saga.getCollectionsNameRequest)
      );
    });

    it('Expects default Sagas are called', () => {
      expect(generator.next().value).toEqual(
        takeLatest(
          Constants.GET_CHANGE_COLLECTION_RESULTS_REQUEST,
          Saga.getChangeCollectionResultsRequest
        )
      );
    });
  });
});
