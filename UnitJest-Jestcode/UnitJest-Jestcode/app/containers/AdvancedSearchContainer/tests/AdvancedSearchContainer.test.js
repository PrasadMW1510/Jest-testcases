import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { AdvancedSearchContainer } from '../AdvancedSearchContainer';

describe('<AdvancedSearchContainer />', () => {
  let wrapper = null;
  let wrapper1 = null;
  const mockgetAwardsDataRequest = jest.fn();
  const mockgetComskillDataRequest = jest.fn();
  const mockgetCultureDataRequest = jest.fn();
  const mockgetInterestLevelDataRequest = jest.fn();
  const mockgetProgramSeriesDataRequest = jest.fn();
  const mockgetTopicsDataRequest = jest.fn();
  const mockgetThemesDataRequest = jest.fn();
  const mockgetGenreDataRequest = jest.fn();
  const mockgetInstalledQuizCountDataRequest = jest.fn();
  const mockgetAllTeacherMadeQuizDataRequest = jest.fn();
  const mockhistory = {
    push: () => '/books/quiz/results',
  };
  const mocksearchbookresult = '1';
  const mocksearchbookresult1 = '11';

  beforeEach(() => {
    wrapper = shallow(
      <AdvancedSearchContainer
        getAwardsDataRequest={mockgetAwardsDataRequest}
        getComskillDataRequest={mockgetComskillDataRequest}
        getCultureDataRequest={mockgetCultureDataRequest}
        getGenreDataRequest={mockgetGenreDataRequest}
        getInterestLevelDataRequest={mockgetInterestLevelDataRequest}
        getProgramSeriesDataRequest={mockgetProgramSeriesDataRequest}
        getTopicsDataRequest={mockgetTopicsDataRequest}
        getThemesDataRequest={mockgetThemesDataRequest}
        getInstalledQuizCountDataRequest={mockgetInstalledQuizCountDataRequest}
        getAllTeacherMadeQuizDataRequest={mockgetAllTeacherMadeQuizDataRequest}
        handleDisplayTeacher={jest.fn()}
        handleSearch={jest.fn()}
        handleSearchFilters={jest.fn()}
        handleMessageModal={jest.fn()}
        getBookResult={jest.fn()}
        getSearchResultsRequest={jest.fn()}
        getBookSearchFilters={jest.fn()}
        showMessageLogModal={jest.fn()}
        history={mockhistory}
        searchbookresult={mocksearchbookresult}
        clearSearchTerm={jest.fn()}
        clearSearchOptions={jest.fn()}
      />
    );
    wrapper1 = shallow(
      <AdvancedSearchContainer
        getAwardsDataRequest={mockgetAwardsDataRequest}
        getComskillDataRequest={mockgetComskillDataRequest}
        getCultureDataRequest={mockgetCultureDataRequest}
        getGenreDataRequest={mockgetGenreDataRequest}
        getInterestLevelDataRequest={mockgetInterestLevelDataRequest}
        getProgramSeriesDataRequest={mockgetProgramSeriesDataRequest}
        getTopicsDataRequest={mockgetTopicsDataRequest}
        getThemesDataRequest={mockgetThemesDataRequest}
        getInstalledQuizCountDataRequest={mockgetInstalledQuizCountDataRequest}
        getAllTeacherMadeQuizDataRequest={mockgetAllTeacherMadeQuizDataRequest}
        handleDisplayTeacher={jest.fn()}
        handleSearch={jest.fn()}
        handleSearchFilters={jest.fn()}
        handleMessageModal={jest.fn()}
        getBookResult={jest.fn()}
        getSearchResultsRequest={jest.fn()}
        getBookSearchFilters={jest.fn()}
        showMessageLogModal={jest.fn()}
        history={mockhistory}
        searchbookresult={mocksearchbookresult1}
        clearSearchTerm={jest.fn()}
        clearSearchOptions={jest.fn()}
      />
    );
  });

  describe('render', () => {
    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
      expect(shallowToJson(wrapper1)).toMatchSnapshot();
    });
    it('expect to call handleDisplayTeacher', () => {
      wrapper.instance().handleDisplayTeacher();
      expect(wrapper.instance().props.clearSearchTerm).toBeCalled();
    });
    it('expect to call handleSearch ', () => {
      const opts = {};
      const searchfilters = {};
      wrapper.instance().handleSearch(opts, searchfilters);
      expect(wrapper.instance().props.getSearchResultsRequest).toBeCalled();
    });
    it('expect to call handleSearchFilters  ', () => {
      const searchfilters = {};
      wrapper.instance().handleSearchFilters(searchfilters);
      expect(wrapper.instance().props.getBookSearchFilters).toBeCalled();
    });
    it('expect to call handleMessageModal   ', () => {
      const e = {};
      wrapper.instance().handleMessageModal(e);
      expect(wrapper.instance().props.showMessageLogModal).toBeCalled();
    });
  });
});
