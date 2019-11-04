/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import defaultSaga, * as Saga from '../saga';
import * as Constants from '../constants';
import * as Actions from '../actions';
import * as Request from '../request';
import * as Selectors from '../../App/selectors';

describe('SearchModalContainer Saga', () => {
  let generator = null;
  let err = null;
  let profileUserIdSelector = null;
  let profileSessionIdSelector = null;
  let store = null;
  beforeEach(() => {
    profileUserIdSelector = jest.fn();
    profileSessionIdSelector = jest.fn();
    err = 'mock error';
    store = fromJS({
      login: {
        session_id: ['adsfczas111'],
        user_id: ['user123'],
      },
      profile: {
        school_id: ['my_school'],
      },
    });
    jest.spyOn(Selectors, 'makeSelectProfileUserId').mockReturnValue(profileUserIdSelector);
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(profileSessionIdSelector);
  });

  afterEach(() => {
    expect(generator.next().done).toBeTruthy();
  });

  describe('getSeachMetaDataRequest', () => {
    beforeEach(() => {
      generator = Saga.getSearchMetaDataRequest();
    });

    it('should successfully run getSeachMetaDataRequest ', () => {
      expect(generator.next().value).toEqual(call(Saga.mainSearchMetaDataFlow));
    });

    it('should throw error mainSearchDataFlow ', () => {
      expect(generator.next().value).toEqual(call(Saga.mainSearchMetaDataFlow));
      expect(generator.throw(err).value).toEqual(put(Actions.getSearchMetaDataRequestFailure(err)));
    });
  });

  describe('defaultSaga', () => {
    beforeEach(() => {
      generator = defaultSaga();
    });

    it('Expects default Sagas are called ', () => {
      expect(generator.next().value).toEqual(
        all([
          takeLatest(Constants.GET_SEARCH_META_DATA_REQUEST, Saga.getSearchMetaDataRequest),
          takeLatest(Constants.GET_SEARCH_RESULTS_REQUEST, Saga.getSearchResultsRequest),
        ])
      );
    });
  });

  describe('mainSearchMetaDataFlow', () => {
    beforeEach(() => {
      generator = Saga.mainSearchMetaDataFlow();
    });

    it('should run the mainSearchMetaDataFlow', () => {
      expect(generator.next().value).toEqual(
        all([
          call(Saga.getSchoolsForSearchRequest),
          call(Saga.getGradesForSearchRequest),
          call(Saga.getTeachersForSearchRequest),
          call(Saga.getClassesForSearchRequest),
          call(Saga.getAppsForSearchRequest),
        ])
      );
      expect(generator.next().value).toEqual(put(Actions.getSearchMetaDataRequestSuccess()));
    });
  });

  describe('getSchoolsForSearchRequest', () => {
    beforeEach(() => {
      generator = Saga.getSchoolsForSearchRequest();
    });

    it('should run the getSchoolsForSearch', () => {
      const schoolList = [];
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.next(store.getIn(['login', 'session_id', 0])).value).toEqual(
        select(profileUserIdSelector)
      );
      expect(generator.next(store.getIn(['login', 'user_id', 0])).value).toEqual(
        call(
          Request.getSchoolListForSearch,
          store.getIn(['login', 'session_id', 0]),
          store.getIn(['login', 'user_id', 0])
        )
      );
      expect(generator.next().value).toEqual(
        put(Actions.getSchoolsForSearchRequestSuccess(schoolList))
      );
    });

    it('should fail the getSchoolsForSearch with error', () => {
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.getSchoolsForSearchRequestFailure(err))
      );
    });
  });

  describe('getGradesForSearchRequest', () => {
    beforeEach(() => {
      generator = Saga.getGradesForSearchRequest();
    });

    it('should run the getGradesForSearch', () => {
      const gradeList = [];
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.next(store.getIn(['login', 'session_id', 0])).value).toEqual(
        select(profileUserIdSelector)
      );
      expect(generator.next(store.getIn(['login', 'user_id', 0])).value).toEqual(
        call(
          Request.getGradesForSearch,
          store.getIn(['login', 'session_id', 0]),
          store.getIn(['login', 'user_id', 0])
        )
      );
      expect(generator.next().value).toEqual(
        put(Actions.getGradesForSearchRequestSuccess(gradeList))
      );
    });

    it('should fail the getGradesForSearch with error', () => {
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.getGradesForSearchRequestFailure(err))
      );
    });
  });

  describe('getTeachersForSearchRequest', () => {
    beforeEach(() => {
      generator = Saga.getTeachersForSearchRequest();
    });

    it('should run the getTeachersForSearch', () => {
      const teacherList = [];
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.next(store.getIn(['login', 'session_id', 0])).value).toEqual(
        select(profileUserIdSelector)
      );
      expect(generator.next(store.getIn(['login', 'user_id', 0])).value).toEqual(
        call(
          Request.getTeachersForSearch,
          store.getIn(['login', 'session_id', 0]),
          store.getIn(['login', 'user_id', 0])
        )
      );
      expect(generator.next().value).toEqual(
        put(Actions.getTeachersForSearchRequestSuccess(teacherList))
      );
    });

    it('should fail the getTeachersForSearch with error', () => {
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.getTeachersForSearchRequestFailure(err))
      );
    });
  });

  describe('getClassesForSearchRequest', () => {
    beforeEach(() => {
      generator = Saga.getClassesForSearchRequest();
    });

    it('should run the getClassesForSearch', () => {
      const classList = [];
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.next(store.getIn(['login', 'session_id', 0])).value).toEqual(
        select(profileUserIdSelector)
      );
      expect(generator.next(store.getIn(['login', 'user_id', 0])).value).toEqual(
        call(
          Request.getClassesForSearch,
          store.getIn(['login', 'session_id', 0]),
          store.getIn(['login', 'user_id', 0])
        )
      );
      expect(generator.next().value).toEqual(
        put(Actions.getClassesForSearchRequestSuccess(classList))
      );
    });

    it('should fail the getClassesForSearch with error', () => {
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.throw(err).value).toEqual(
        put(Actions.getClassesForSearchRequestFailure(err))
      );
    });
  });

  describe('getAppsForSearchRequest', () => {
    beforeEach(() => {
      generator = Saga.getAppsForSearchRequest();
    });

    it('should run the getAppsForSearch', () => {
      const appsList = [];
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.next(store.getIn(['login', 'session_id', 0])).value).toEqual(
        call(Request.getAppsForSearch, store.getIn(['login', 'session_id', 0]))
      );
      expect(generator.next().value).toEqual(put(Actions.getAppsForSearchRequestSuccess(appsList)));
    });

    it('should fail the getAppsForSearch with error', () => {
      expect(generator.next().value).toEqual(select(profileSessionIdSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.getAppsForSearchRequestFailure(err)));
    });
  });

  describe('getSearchResultsRequest', () => {
    describe('searching by teacher', () => {
      const searchOptions = {
        payload: {
          teacher_search: {
            filters: {
              schoolId: '',
              grade_id: 'PK',
              teacher_id: 'ukofq8qbu8e7mf0vekbcj8qi_2efa7f0',
              class_id: 'ugjj1ij48rgsd2pgndhdsj0o_2efa7f0',
              product_id: 'Common Core Code X',
              active: true,
            },
            search_terms: {
              last_name: 'Cusick',
              first_name: 'John',
              user_name: 'johncus',
              student_id: '123',
            },
            sort_by: 'name',
            sort_order: 'asc',
          },
          searchBy: 'teacher',
          itemsPerPage: 250,
          curPage: 0,
        },
      };

      beforeEach(() => {
        generator = Saga.getSearchResultsRequest(searchOptions);
      });
      it('Should run the getSearchResultsRequest for teacher successfully', () => {
        const searchResults = {};
        expect(generator.next().value).toEqual(put(Actions.resetSearchResultsData()));
        expect(generator.next().value).toEqual(select(profileSessionIdSelector));
        expect(generator.next(store.getIn(['login', 'session_id', 0])).value).toEqual(
          call(
            Request.getTeacherSearchResults,
            store.getIn(['login', 'session_id', 0]),
            searchOptions.payload.teacher_search,
            searchOptions.payload.itemsPerPage,
            searchOptions.payload.curPage
          )
        );

        expect(generator.next(searchResults).value).toEqual(
          put(Actions.getSearchResultsRequestSuccess(searchResults))
        );
      });

      it('should throw error getSearchResultsRequestFlow teacher', () => {
        expect(generator.next().value).toEqual(put(Actions.resetSearchResultsData()));
        expect(generator.next().value).toEqual(select(profileSessionIdSelector));
        expect(generator.throw(err).value).toEqual(
          put(Actions.getSearchResultsRequestFailure(err))
        );
      });
    });

    describe('searching by student', () => {
      const searchOptions = {
        payload: {
          student_search: {
            filters: {
              schoolId: '',
              grade_id: 'PK',
              teacher_id: 'ukofq8qbu8e7mf0vekbcj8qi_2efa7f0',
              class_id: 'ugjj1ij48rgsd2pgndhdsj0o_2efa7f0',
              product_id: 'Common Core Code X',
              active: true,
            },
            search_terms: {
              last_name: 'Cusick',
              first_name: 'John',
              user_name: 'johncus',
              student_id: '123',
            },
            sort_by: 'name',
            sort_order: 'asc',
          },
          searchBy: 'student',
          itemsPerPage: 250,
          curPage: 0,
        },
      };

      beforeEach(() => {
        generator = Saga.getSearchResultsRequest(searchOptions);
      });
      it('Should run the getSearchResultsRequest successfully', () => {
        const searchResults = {};
        expect(generator.next().value).toEqual(put(Actions.resetSearchResultsData()));
        expect(generator.next().value).toEqual(select(profileSessionIdSelector));
        expect(generator.next(store.getIn(['login', 'session_id', 0])).value).toEqual(
          call(
            Request.getStudentSearchResults,
            store.getIn(['login', 'session_id', 0]),
            searchOptions.payload.student_search,
            searchOptions.payload.itemsPerPage,
            searchOptions.payload.curPage
          )
        );

        expect(generator.next(searchResults).value).toEqual(
          put(Actions.getSearchResultsRequestSuccess(searchResults))
        );
      });

      it('should throw error getSearchResultsRequestFlow student', () => {
        expect(generator.next().value).toEqual(put(Actions.resetSearchResultsData()));
        expect(generator.next().value).toEqual(select(profileSessionIdSelector));
        expect(generator.throw(err).value).toEqual(
          put(Actions.getSearchResultsRequestFailure(err))
        );
      });
    });

    describe('searchBy value is not Teacher Or Student', () => {
      const searchOptions = {
        payload: {
          teacher_search: {
            filters: {
              schoolId: '',
              grade_id: 'PK',
              teacher_id: 'ukofq8qbu8e7mf0vekbcj8qi_2efa7f0',
              class_id: 'ugjj1ij48rgsd2pgndhdsj0o_2efa7f0',
              product_id: 'Common Core Code X',
              active: true,
            },
            search_terms: {
              last_name: 'Cusick',
              first_name: 'John',
              user_name: 'johncus',
              student_id: '123',
            },
            sort_by: 'name',
            sort_order: 'asc',
          },
          searchBy: 'invalid value',
          itemsPerPage: 250,
          curPage: 0,
        },
      };

      beforeEach(() => {
        generator = Saga.getSearchResultsRequest(searchOptions);
      });
      it('Should run the getSearchResultsRequest when searchBy value not valid', () => {
        const searchResults = {};
        expect(generator.next().value).toEqual(put(Actions.resetSearchResultsData()));
        expect(generator.next().value).toEqual(select(profileSessionIdSelector));
        expect(generator.next(searchResults).value).toEqual(
          put(Actions.getSearchResultsRequestSuccess(searchResults))
        );
      });

      it('should throw error getSearchResultsRequestFlow teacher', () => {
        expect(generator.next().value).toEqual(put(Actions.resetSearchResultsData()));
        expect(generator.next().value).toEqual(select(profileSessionIdSelector));
        expect(generator.throw(err).value).toEqual(
          put(Actions.getSearchResultsRequestFailure(err))
        );
      });
    });
  });
});
