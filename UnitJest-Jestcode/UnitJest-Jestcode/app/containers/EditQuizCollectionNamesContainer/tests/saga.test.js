import { takeLatest, call, put, select, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import defaultSaga, * as Saga from '../saga';
import * as Selectors from '../../App/selectors';
import * as Actions from '../actions';
import * as Request from '../request';
import * as Constants from '../constants';
/* eslint-disable redux-saga/yield-effects */
describe('EditQuizCollectionNamesContainer Saga', () => {
  let generator = null;
  let selectSelector = null;
  let mockEpochTime = null;

  beforeEach(() => {
    selectSelector = jest.fn();
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(selectSelector);
    mockEpochTime = 1516120801689;
    jest.spyOn(Date.prototype, 'getTime').mockReturnValue(mockEpochTime);
  });
  describe('getEditQuizCollectionNamesDataRequest', () => {
    let store = null;
    let err = null;

    beforeEach(() => {
      store = fromJS({
        login: {
          session_id: ['adsfadsf'],
          user_id: ['id1'],
        },
      });

      err = 'mock error';

      generator = Saga.getEditQuizCollectionNamesDataRequest();
    });

    it('getEditQuizCollectionNamesDataRequestSuccess', () => {
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next().value).toEqual(select(selectSelector));
      expect(generator.next(store.getIn(['session_id', 0])).value).toEqual(
        call(Request.getEditQuizCollectionNamesData, store.getIn(['session_id', 0]))
      );
      expect(generator.next().value).toEqual(
        put(Actions.getEditQuizCollectionNamesDataRequestSuccess())
      );
      expect(generator.next().value).toEqual(put(hideLoading()));
    });

    it('getEditQuizCollectionNamesDataRequestFailure', () => {
      expect(generator.next().value).toMatchSnapshot();
      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next().value).toEqual(select(selectSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.getEditQuizCollectionNamesDataRequestFailure(err))
      );
      expect(generator.next().value).toEqual(put(hideLoading()));
    });
  });
  describe('postEditQuizCollectionNamesDataRequest', () => {
    let err = null;
    const value = {
      nameObject: {
        oldName: '',
        newName: '',
      },
    };

    beforeEach(() => {
      err = 'mock error';
      generator = Saga.postEditQuizCollectionNamesDataRequest(value);
    });

    it('postEditQuizCollectionNamesRequest', () => {
      expect(generator.next().value).toEqual(put(showLoading()));
      const selectDescriptor = generator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
      const selectDescriptor1 = generator.next().value;
      expect(selectDescriptor1).toMatchSnapshot();
      const putDescriptor1 = generator.next(value).value;
      expect(putDescriptor1).toMatchSnapshot();
      const putDescriptor2 = generator.next(value).value;
      expect(putDescriptor2).toEqual(put(Actions.initializeClassFormResponseSuccess()));
      expect(generator.next().value).toEqual(put(hideLoading()));
    });

    it('getEditQuizCollectionNamesDataRequestFailure', () => {
      expect(generator.next().value).toEqual(put(showLoading()));
      expect(generator.next().value).toEqual(select(selectSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.saveEditQuizCollectionNamesFailure(err))
      );
      expect(generator.next().value).toEqual(put(hideLoading()));
    });
  });
  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });
    it('All calls are made', () => {
      expect(generator.next().value).toEqual(
        all([
          takeLatest(
            Constants.GET_EDITQUIZCOLLECTIONNAMESDATA_REQUEST,
            Saga.getEditQuizCollectionNamesDataRequest
          ),
          takeLatest(
            Constants.POST_EDIT_QUIZ_COLLECTION_NAMES_DATA_REQUEST,
            Saga.postEditQuizCollectionNamesDataRequest
          ),
        ])
      );
    });
  });
});
