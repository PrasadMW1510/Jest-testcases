import { fromJS } from 'immutable';

import advancedSearchContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('advancedSearchContainer reducer', () => {
  const initialState = fromJS({
    error: false,
    awards: [],
    comskill: [],
    culture: [],
    genre: [],
    interestLevel: [],
    programSeries: [],
    topics: [],
    themes: [],
    installedQuizCount: {},
    bookSearchFilters: {
      title: '',
      author: '',
      booktype: '',
      lang: '',
      accessibility: '',
      lexilemax: '',
      lexilemin: '',
      readinglevelmin: '',
      readinglevelmax: '',
      guidereadinglevelmin: '',
      guidereadinglevelmax: '',
      pointsrangemin: '',
      pointsrangemax: '',
      awardsinfo: [],
      comprehensionlist: [],
      culturelist: [],
      genrelist: [],
      interestlevellist: [],
      programserieslist: [],
      topicslist: [],
      themedatalist: [],
      searchbtnvalue: '',
    },
    bookSearch: false,
    bookResult: '0',
  });

  it('returns the initial state', () => {
    expect(advancedSearchContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });

  it('should handle GET_AWARDS_REQUEST_SUCCESS', () => {
    const updatedVal = 'a';
    const awardsObj = {
      output: {
        output_data: [{ items: [{ item: updatedVal }, { b: 'b' }] }],
      },
    };
    const updatedState = fromJS({
      ...initialState.toJS(),
      awards: updatedVal,
    });
    expect(
      advancedSearchContainerReducer(undefined, Actions.getAwardsRequestSuccess(awardsObj))
    ).toEqual(updatedState);
  });

  it('should handle GET_COMSKILL_REQUEST_SUCCESS', () => {
    const updatedVal = 'a';
    const comskillObj = {
      output: {
        output_data: [{ items: [{ item: updatedVal }, { b: 'b' }] }],
      },
    };
    const updatedState = fromJS({
      ...initialState.toJS(),
      comskill: updatedVal,
    });
    expect(
      advancedSearchContainerReducer(undefined, Actions.getComskillRequestSuccess(comskillObj))
    ).toEqual(updatedState);
  });

  it('should handle GET_CULTURE_REQUEST_SUCCESS', () => {
    const updatedVal = 'a';
    const cultureObj = {
      output: {
        output_data: [{ items: [{ item: updatedVal }, { b: 'b' }] }],
      },
    };
    const updatedState = fromJS({
      ...initialState.toJS(),
      culture: updatedVal,
    });
    expect(
      advancedSearchContainerReducer(undefined, Actions.getCultureRequestSuccess(cultureObj))
    ).toEqual(updatedState);
  });

  it('should handle GET_GENRE_REQUEST_SUCCESS', () => {
    const updatedVal = 'a';
    const genreObj = {
      output: {
        output_data: [{ items: [{ item: updatedVal }, { b: 'b' }] }],
      },
    };
    const updatedState = fromJS({
      ...initialState.toJS(),
      genre: updatedVal,
    });
    expect(
      advancedSearchContainerReducer(undefined, Actions.getGenreRequestSuccess(genreObj))
    ).toEqual(updatedState);
  });

  it('should handle GET_GENRE_REQUEST_SUCCESS', () => {
    const updatedVal = 'a';
    const genreObj = {
      output: {
        output_data: [{ items: [{ item: updatedVal }, { b: 'b' }] }],
      },
    };
    const updatedState = fromJS({
      ...initialState.toJS(),
      genre: updatedVal,
    });
    expect(
      advancedSearchContainerReducer(undefined, Actions.getGenreRequestSuccess(genreObj))
    ).toEqual(updatedState);
  });
  it('should handle GET_INTERESTLEVEL_REQUEST_SUCCESS', () => {
    const updatedVal = 'a';
    const interestLevelObj = {
      output: {
        output_data: [{ items: [{ item: updatedVal }, { b: 'b' }] }],
      },
    };
    const updatedState = fromJS({
      ...initialState.toJS(),
      interestLevel: updatedVal,
    });
    expect(
      advancedSearchContainerReducer(
        undefined,
        Actions.getInterestLevelRequestSuccess(interestLevelObj)
      )
    ).toEqual(updatedState);
  });

  it('should handle GET_PROGRAM_SERIES_REQUEST_SUCCESS', () => {
    const updatedVal = 'a';
    const programSeriesObj = {
      output: {
        output_data: [{ items: [{ item: updatedVal }, { b: 'b' }] }],
      },
    };
    const updatedState = fromJS({
      ...initialState.toJS(),
      programSeries: updatedVal,
    });
    expect(
      advancedSearchContainerReducer(
        undefined,
        Actions.getProgramSeriesRequestSuccess(programSeriesObj)
      )
    ).toEqual(updatedState);
  });

  it('should handle GET_TOPICS_REQUEST_SUCCESS', () => {
    const updatedVal = 'a';
    const topicsObj = {
      output: {
        output_data: [{ items: [{ item: updatedVal }, { b: 'b' }] }],
      },
    };
    const updatedState = fromJS({
      ...initialState.toJS(),
      topics: updatedVal,
    });
    expect(
      advancedSearchContainerReducer(undefined, Actions.getTopicsRequestSuccess(topicsObj))
    ).toEqual(updatedState);
  });

  it('should handle GET_THEMES_REQUEST_SUCCESS', () => {
    const updatedVal = 'a';
    const themesObj = {
      output: {
        output_data: [{ items: [{ item: updatedVal }, { b: 'b' }] }],
      },
    };
    const updatedState = fromJS({
      ...initialState.toJS(),
      themes: updatedVal,
    });
    expect(
      advancedSearchContainerReducer(undefined, Actions.getThemesRequestSuccess(themesObj))
    ).toEqual(updatedState);
  });

  it('should handle GET_INSTALLEDQUIZCOUNT_REQUEST_SUCCESS', () => {
    const updatedVal = {};
    const installedQuizCountObj = {
      output: {
        output_data: [{ GetInstalledQuizCountResp: [{}, {}] }],
      },
    };
    const updatedState = fromJS({
      ...initialState.toJS(),
      installedQuizCount: updatedVal,
    });
    expect(
      advancedSearchContainerReducer(
        undefined,
        Actions.getInstalledQuizCountRequestSuccess(installedQuizCountObj)
      )
    ).toEqual(updatedState);
  });
  it('should handle BOOK_SEARCH_FILTERS', () => {
    expect(
      advancedSearchContainerReducer(undefined, Actions.getBookSearchFilters())
    ).toMatchSnapshot();
  });
  it('should handle BOOK_RESULT', () => {
    expect(advancedSearchContainerReducer(undefined, Actions.getBookResult())).toMatchSnapshot();
  });
});
