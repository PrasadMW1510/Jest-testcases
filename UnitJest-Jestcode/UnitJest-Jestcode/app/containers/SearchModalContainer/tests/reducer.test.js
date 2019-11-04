import { fromJS } from 'immutable';
import searchModalContainerReducer from '../reducer';
import * as Constants from '../constants';
import * as Actions from '../actions';

describe('searchModalContainerReducer', () => {
  const mockSchools = {
    school: [],
  };

  const mockGrades = {
    grade: [],
  };

  const mockTeachers = {
    teacher: [],
  };

  const mockClasses = {
    class: [],
  };

  // mockApps is in format that the server will return
  const mockApps = {
    application: [
      {
        $: {
          enabled: 'true',
          customer_release_number: '1.1',
          client_code_version_required: 'N/A',
          supernumber: '3.0.0.4',
          media_server_version_required: 'N/A',
          name: 'Common Core Code X',
          short_name: 'Common Core Code X',
          community_id: 'CDX',
          version: '3.0.0-4',
          is_deployed: 'true',
          product_media_version_number: '',
          description: 'Common Core Code X',
          client_loader_version_required: 'N/A',
        },
        subproducts: [
          {
            subproduct: [
              {
                $: {
                  description: 'Common Core Code X Course I',
                  name: 'Common Core Code X Course I',
                  subproduct_id: 'CDX_CI',
                },
              },
              {
                $: {
                  description: 'Common Core Code X Course II',
                  name: 'Common Core Code X Course II',
                  subproduct_id: 'CDX_CII',
                },
              },
              {
                $: {
                  description: 'Common Core Code X Course III',
                  name: 'Common Core Code X Course III',
                  subproduct_id: 'CDX_CIII',
                },
              },
            ],
          },
        ],
      },
      {
        $: {
          enabled: 'true',
          customer_release_number: '2.6.1',
          client_code_version_required: '0',
          supernumber: '3.0.0.20',
          media_server_version_required: '0',
          name: 'Progress Space',
          short_name: 'Progress Space',
          community_id: 'DTM',
          version: '3.0.0-20',
          is_deployed: 'true',
          product_media_version_number: '03611003',
          description: 'Progress Space',
          client_loader_version_required: '0',
        },
        subproducts: [
          {
            subproduct: [
              {
                $: {
                  description: 'Progress Space',
                  name: 'Progress Space',
                  subproduct_id: 'DTM_MODULE',
                },
              },
              {
                $: {
                  description: 'Do The Math Now!',
                  name: 'Do The Math Now!',
                  subproduct_id: 'DTM_NOW',
                },
              },
            ],
          },
        ],
      },
    ],
  };

  let initialState = null;
  let mockResults = null;
  let mockSearchModalContainer = null;
  beforeEach(() => {
    initialState = {
      error: false,
      loading: true,
      metaDataInitialized: false,
      searchMeta: {
        apps: [],
        classes: [],
        grades: [],
        schools: [],
        teachers: [],
      },
      searchResults: {
        loading: false,
        students: [],
        teachers: [],
        itemCount: Constants.UNINITIALIZED_ITEM_COUNT,
        paginationData: {},
      },
    };

    /**
     *
     * mock the results placed into the Action for GET_SEARCH_RESULTS_REQUEST_SUCCESS
     */
    mockResults = {
      item_count: ['0'],
      output_data: [
        {
          search_results: [
            {
              students: [{ student: [] }],
              teachers: [{ teacher: [] }],
            },
          ],
        },
      ],
      pagination_data: [
        {
          paginate: ['false'],
          page_count: ['1'],
          current_page: ['0'],
          items_per_page: ['250'],
        },
      ],
    };

    mockSearchModalContainer = fromJS(initialState);
  });

  it('returns the initial state', () => {
    expect(searchModalContainerReducer(undefined, {})).toEqual(mockSearchModalContainer);
  });

  it('should return initialState when resetSearchMetaData', () => {
    expect(searchModalContainerReducer(undefined, Actions.resetSearchMetaData())).toEqual(
      mockSearchModalContainer
    );
  });

  it('sets loading to true when a GET_SEARCH_META_DATA_REQUEST occurs', () => {
    expect(
      searchModalContainerReducer(undefined, { type: Constants.GET_SEARCH_META_DATA_REQUEST })
    ).toEqual(fromJS(mockSearchModalContainer));
  });

  it('sets loading to true with an Actions.getSearchMetaDataRequest', () => {
    expect(searchModalContainerReducer(undefined, Actions.getSearchMetaDataRequest)).toEqual(
      fromJS(mockSearchModalContainer)
    );
  });

  it('sets loading to false and MetaDataInitialized to true when a GET_SEARCH_META_DATA_REQUEST_SUCCESS occurs', () => {
    initialState.loading = false;
    initialState.metaDataInitialized = true;
    mockSearchModalContainer = fromJS(initialState);
    expect(
      searchModalContainerReducer(undefined, {
        type: Constants.GET_SEARCH_META_DATA_REQUEST_SUCCESS,
      })
    ).toEqual(fromJS(mockSearchModalContainer));
  });

  it('sets loading to true when a GET_SEARCH_META_DATA_REQUEST_FAILURE occurs', () => {
    const err = 'Testing error';
    initialState.loading = true;
    initialState.error = err;
    mockSearchModalContainer = fromJS(initialState);
    expect(
      searchModalContainerReducer(undefined, Actions.getSearchMetaDataRequestFailure(err))
    ).toEqual(fromJS(mockSearchModalContainer));
  });

  it('should getAppsForSearchRequest success', () => {
    const newState = initialState;
    newState.searchMeta.apps = mockApps.application;
    expect(
      searchModalContainerReducer(undefined, Actions.getAppsForSearchRequestSuccess(mockApps))
    ).toEqual(fromJS(newState));
  });

  it('should getClassesForSearchRequest success', () => {
    const newState = initialState;
    newState.searchMeta.classes = mockClasses.class;
    expect(
      searchModalContainerReducer(undefined, Actions.getClassesForSearchRequestSuccess(mockClasses))
    ).toEqual(fromJS(newState));
  });

  it('should getGradesForSearchRequest success', () => {
    const newState = initialState;
    newState.searchMeta.grades = mockGrades.grade;
    expect(
      searchModalContainerReducer(undefined, Actions.getGradesForSearchRequestSuccess(mockGrades))
    ).toEqual(fromJS(newState));
  });

  it('should getSchoolsForSearchRequest success', () => {
    const newState = initialState;
    newState.searchMeta.schools = mockSchools.school;
    expect(
      searchModalContainerReducer(undefined, Actions.getSchoolsForSearchRequestSuccess(mockSchools))
    ).toEqual(fromJS(newState));
  });

  it('should getTeacherForSearchRequest success', () => {
    const newState = initialState;
    newState.searchMeta.teachers = mockTeachers.teacher;
    expect(
      searchModalContainerReducer(
        undefined,
        Actions.getTeachersForSearchRequestSuccess(mockTeachers)
      )
    ).toEqual(fromJS(newState));
  });

  it('should return error in the state when an error action occurs', () => {
    const err = 'Testing error';
    initialState.loading = true;
    initialState.error = err;
    mockSearchModalContainer = fromJS(initialState);
    expect(
      searchModalContainerReducer(undefined, Actions.getAppsForSearchRequestFailure(err))
    ).toEqual(fromJS(mockSearchModalContainer));
    expect(
      searchModalContainerReducer(undefined, Actions.getClassesForSearchRequestFailure(err))
    ).toEqual(fromJS(mockSearchModalContainer));
    expect(
      searchModalContainerReducer(undefined, Actions.getGradesForSearchRequestFailure(err))
    ).toEqual(fromJS(mockSearchModalContainer));
    expect(
      searchModalContainerReducer(undefined, Actions.getSchoolsForSearchRequestFailure(err))
    ).toEqual(fromJS(mockSearchModalContainer));
    expect(
      searchModalContainerReducer(undefined, Actions.getTeachersForSearchRequestFailure(err))
    ).toEqual(fromJS(mockSearchModalContainer));
  });

  it('should return expected state when resetSearchResultsData action called', () => {
    const resetSearchResultsDataState = initialState;
    resetSearchResultsDataState.searchResults.loading = true;
    expect(searchModalContainerReducer(undefined, Actions.resetSearchResultsData())).toEqual(
      fromJS(resetSearchResultsDataState)
    );
  });

  it('should return expected state when resetForSearchByChange action called', () => {
    const resetForSearchByChangeState = initialState;
    expect(searchModalContainerReducer(undefined, Actions.resetForSearchByChange())).toEqual(
      fromJS(resetForSearchByChangeState)
    );
  });

  it('should return expected state when getSearchResultsRequestSuccess action called', () => {
    const searchResultsSuccess = initialState;
    searchResultsSuccess.searchResults.loading = false;
    // searchResultsSuccess.searchResults.students = mockResults.student;
    searchResultsSuccess.searchResults.students =
      mockResults.output_data[0].search_results[0].students[0].student;
    searchResultsSuccess.searchResults.teachers =
      mockResults.output_data[0].search_results[0].teachers[0].teacher;

    searchResultsSuccess.searchResults.paginationData = mockResults.pagination_data[0];
    searchResultsSuccess.searchResults.itemCount = mockResults.item_count[0];

    expect(
      searchModalContainerReducer(undefined, Actions.getSearchResultsRequestSuccess(mockResults))
    ).toEqual(fromJS(searchResultsSuccess));
  });

  it('should return expected state when getSearchResultsRequestSuccess action with student results only called', () => {
    const searchResultsSuccess = initialState;
    searchResultsSuccess.searchResults.loading = false;
    searchResultsSuccess.searchResults.students =
      mockResults.output_data[0].search_results[0].students[0].student;

    searchResultsSuccess.searchResults.teachers = [];

    searchResultsSuccess.searchResults.paginationData = mockResults.pagination_data[0];
    searchResultsSuccess.searchResults.itemCount = mockResults.item_count[0];

    // update mockResults to indicate empty teachers.
    mockResults.output_data[0].search_results[0].teachers = [];
    expect(
      searchModalContainerReducer(undefined, Actions.getSearchResultsRequestSuccess(mockResults))
    ).toEqual(fromJS(searchResultsSuccess));
  });

  it('should return expected state when getSearchResultsRequestSuccess action with teacher results only called', () => {
    const searchResultsSuccess = initialState;
    searchResultsSuccess.searchResults.loading = false;
    searchResultsSuccess.searchResults.teachers =
      mockResults.output_data[0].search_results[0].teachers[0].teacher;

    searchResultsSuccess.searchResults.students = [];

    searchResultsSuccess.searchResults.paginationData = mockResults.pagination_data[0];
    searchResultsSuccess.searchResults.itemCount = mockResults.item_count[0];

    // update mockResults to indicate empty students.
    mockResults.output_data[0].search_results[0].students = [];
    expect(
      searchModalContainerReducer(undefined, Actions.getSearchResultsRequestSuccess(mockResults))
    ).toEqual(fromJS(searchResultsSuccess));
  });
});
