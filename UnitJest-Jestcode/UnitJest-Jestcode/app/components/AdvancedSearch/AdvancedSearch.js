import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AdvancedSearchControlButtons from 'components/AdvancedSearchControlButtons';
import InstalledQuiz from 'components/InstalledQuiz';
import Collapsible from 'components/Collapsible';
import CollapsibleBook from 'components/CollapsibleBook';

import './AdvancedSearch.scss';

import * as Constants from './constants';

export default class AdvancedSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchBy: 'Title',
      order: 'asc',
      searchbtnvalue: '',
      title: this.props.searchFiltersData.title,
      author: this.props.searchFiltersData.author,
      booktype: this.props.searchFiltersData.booktype,
      lang: this.props.searchFiltersData.lang,
      accessibility: this.props.searchFiltersData.accessibility,
      lexilemax: this.props.searchFiltersData.lexilemax,
      lexilemin: this.props.searchFiltersData.lexilemin,
      readinglevelmin: this.props.searchFiltersData.readinglevelmin,
      readinglevelmax: this.props.searchFiltersData.readinglevelmax,
      guidereadinglevelmin: this.props.searchFiltersData.guidereadinglevelmin,
      guidereadinglevelmax: this.props.searchFiltersData.guidereadinglevelmax,
      pointsrangemin: this.props.searchFiltersData.pointsrangemin,
      pointsrangemax: this.props.searchFiltersData.pointsrangemax,
      awardsinfo: this.props.searchFiltersData.awardsinfo,
      comprehensionlist: this.props.searchFiltersData.comprehensionlist,
      culturelist: this.props.searchFiltersData.culturelist,
      genrelist: this.props.searchFiltersData.genrelist,
      interestlevellist: this.props.searchFiltersData.interestlevellist,
      programserieslist: this.props.searchFiltersData.programserieslist,
      topicslist: this.props.searchFiltersData.topicslist,
      themedatalist: this.props.searchFiltersData.themedatalist,
    };
    this.baseState = this.state;
  }

  handleDataChange = e => {
    const letters = /^[A-Za-z]+|[\b]+$/;
    const numbers = /^[0-9\b]+$/;
    const numberdecimal = /^[0-9.\b]+$/;

    const change = {};

    switch (e.target.name) {
      case 'guidereadinglevelmin':
      case 'guidereadinglevelmax': {
        if (e.target.value.match(letters) || e.target.value === '') {
          change[e.target.name] = e.target.value.toUpperCase();
          this.setState(change);
        }
        break;
      }
      case 'lexilemin':
      case 'lexilemax':
      case 'pointsrangemin':
      case 'pointsrangemax': {
        if (e.target.value.match(numbers) || e.target.value === '') {
          change[e.target.name] = e.target.value;
          this.setState(change);
        }
        break;
      }
      case 'readinglevelmin':
      case 'readinglevelmax': {
        if (e.target.value.match(numberdecimal) || e.target.value === '') {
          change[e.target.name] = e.target.value;
          this.setState(change);
        }
        break;
      }
      default:
        change[e.target.name] = e.target.value;
        this.setState(change);
        break;
    }
  };

  advanceSearcCheckboxhSelection = params => dataFromChild => {
    const index = params.findIndex(awardItem => awardItem === dataFromChild);
    if (index > Constants.INDEX_NEG) {
      params.splice(index, Constants.INDEX_POS);
    } else {
      params.push(dataFromChild);
    }
  };

  advanceSearchClearForm = searchbuttonvalue => {
    this.setState({ searchbtnvalue: searchbuttonvalue });
    return false;
  };

  handleSearchData = (sorttermsparam, listparam, ItemKey) => {
    const itemArrays = [];
    for (let i = 0; i < listparam.length; i += Constants.INDEX_POS) {
      const Itemsdata = {};
      Itemsdata[ItemKey] = listparam[i];
      itemArrays.push(Itemsdata);
    }
    sorttermsparam.push(itemArrays);
  };

  handleLimitError = () => {
    let displayText = '';

    switch (true) {
      case this.state.lexilemin > Constants.BOOK_LEXILE_MAX_RANGE_VALUE ||
        this.state.lexilemax > Constants.BOOK_LEXILE_MAX_RANGE_VALUE:
        displayText = `${displayText} ${Constants.BOOK_LEXILE_RANGE} \r\n`;
        break;

      case this.state.lexilemin > this.state.lexilemax: {
        this.state.lexilemin = this.state.lexilemax;
        this.lexileminValue.value = this.state.lexilemin;
        displayText = `${displayText} ${Constants.BOOK_LEXILE_MAX_MIN} \r\n`;
        break;
      }

      case this.state.readinglevelmin > Constants.BOOK_READING_RANGE_VALUE ||
        this.state.readinglevelmax > Constants.BOOK_READING_RANGE_VALUE:
        displayText = `${displayText} ${Constants.BOOK_READING_RANGE}\r\n`;
        break;

      case this.state.readinglevelmin > this.state.readinglevelmax: {
        this.state.readinglevelmin = this.state.readinglevelmax;
        this.readinglevelminValue.value = this.state.readinglevelmin;
        displayText = `${displayText} ${Constants.BOOK_LEXILE_MAX_MIN}\r\n`;
        break;
      }

      case this.state.pointsrangemin > Constants.BOOK_POINTS_RANGE_VALUE ||
        this.state.pointsrangemax > Constants.BOOK_POINTS_RANGE_VALUE:
        displayText = `${displayText} ${Constants.BOOK_POINTS_RANGE} \r\n`;
        break;

      case this.state.pointsrangemin > this.state.pointsrangemax: {
        this.pointsrangeminValue.value = this.state.pointsrangemax;
        displayText = `${displayText} ${Constants.BOOK_LEXILE_MAX_MIN} \r\n`;
        break;
      }

      case this.state.lexilemin.length > 0 && this.state.lexilemax.length === 0:
        displayText = `${displayText} ${Constants.BOOK_LEXILE_MAX_RANGE}\r\n`;
        break;

      case this.state.lexilemax.length > 0 && this.state.lexilemin.length === 0:
        displayText = `${displayText} ${Constants.BOOK_LEXILE_MIN_RANGE} \r\n`;
        break;

      case this.state.readinglevelmin.length > 0 && this.state.readinglevelmax.length === 0:
        displayText = `${displayText} ${Constants.BOOK_READING_MAX_RANGE}\r\n`;
        break;

      case this.state.readinglevelmax.length > 0 && this.state.readinglevelmin.length === 0:
        displayText = `${displayText} ${Constants.BOOK_READING_MIN_RANGE} \r\n`;
        break;

      case this.state.guidereadinglevelmin.length > 0 &&
        this.state.guidereadinglevelmax.length === 0:
        displayText = `${displayText} ${Constants.BOOK_GUIDEREADING_MAX} \r\n`;
        break;

      case this.state.guidereadinglevelmax.length > 0 &&
        this.state.guidereadinglevelmin.length === 0:
        displayText = `${displayText} ${Constants.BOOK_GUIDEREADING_MIN} \r\n`;
        break;

      case this.state.pointsrangemin.length > 0 && this.state.pointsrangemax.length === 0:
        displayText = `${displayText}  ${Constants.BOOK_POINTS_RANGE_MAX} \r\n`;
        break;

      case this.state.pointsrangemax.length > 0 && this.state.pointsrangemin.length === 0:
        displayText = `${displayText} ${Constants.BOOK_POINTS_RANGE_MIN} \r\n`;
        break;

      default:
        break;
    }

    const searchSortTerms = {};

    // Book Level
    const booklevel = {};

    // LexiLevel
    const lexileTerms = {};
    lexileTerms.Min = this.state.lexilemin.length > 0 ? this.state.lexilemin : '';
    lexileTerms.Max = this.state.lexilemax.length > 0 ? this.state.lexilemax : '';

    if (this.state.lexilemax.length > 0) {
      booklevel.LexileLevel = lexileTerms;
    }
    // Reading Level

    const readinglevelTerms = {};
    readinglevelTerms.Min = this.state.readinglevelmin.length > 0 ? this.state.readinglevelmin : '';
    readinglevelTerms.Max = this.state.readinglevelmax.length > 0 ? this.state.readinglevelmax : '';

    if (this.state.readinglevelmin.length > 0) {
      booklevel.ReadingLevel = readinglevelTerms;
    }

    // Guided Reading Level

    const guidedradingTerms = {};

    switch (true) {
      case this.state.guidereadinglevelmin.length > 0: {
        guidedradingTerms.Min = this.state.guidereadinglevelmin;
        booklevel.GuidedReadingLevel = guidedradingTerms;
        break;
      }
      case this.state.guidereadinglevelmax.length > 0:
        guidedradingTerms.Max = this.state.guidereadinglevelmax;
        booklevel.GuidedReadingLevel = guidedradingTerms;
        break;
      /* case this.state.guidereadinglevelmin.length > 0:
        booklevel.GuidedReadingLevel = guidedradingTerms;
        break;*/
      default:
        break;
    }

    const pointsrangeTerms = {};
    pointsrangeTerms.Min = this.state.pointsrangemin.length > 0 ? this.state.pointsrangemin : '';
    pointsrangeTerms.Max = this.state.pointsrangemax.length > 0 ? this.state.pointsrangemax : '';

    switch (true) {
      case this.state.pointsrangemax.length > 0:
        booklevel.PointLimit = pointsrangeTerms;
        break;

      case this.state.lexilemax.length > 0 ||
        this.state.readinglevelmax.length > 0 ||
        this.state.guidereadinglevelmax.length > 0 ||
        this.state.pointsrangemax.length > 0:
        searchSortTerms.BookLevel = booklevel;
        break;
      default:
        break;
    }
    searchSortTerms.BookLevel = booklevel;

    switch (true) {
      case displayText !== '': {
        const payloadData = displayText;
        this.props.messageModal({ payloadData });
        break;
      }
      default:
        break;
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchbtnvalue === 'formclear') {
      const searchFormFilters = {};
      searchFormFilters.title = this.setState({ title: '' });
      searchFormFilters.author = this.setState({ author: '' });
      searchFormFilters.booktype = this.setState({ booktype: '' });
      searchFormFilters.lang = this.setState({ lang: '' });
      searchFormFilters.accessibility = this.setState({ accessibility: '' });
      searchFormFilters.lexilemin = this.setState({ lexilemin: '' });
      searchFormFilters.lexilemax = this.setState({ lexilemax: '' });
      searchFormFilters.readinglevelmin = this.setState({ readinglevelmin: '' });
      searchFormFilters.readinglevelmax = this.setState({ readinglevelmax: '' });
      searchFormFilters.guidereadinglevelmin = this.setState({ guidereadinglevelmin: '' });
      searchFormFilters.guidereadinglevelmax = this.setState({ guidereadinglevelmax: '' });
      searchFormFilters.pointsrangemin = this.setState({ pointsrangemin: '' });
      searchFormFilters.pointsrangemax = this.setState({ pointsrangemax: '' });
      searchFormFilters.awardsinfo = this.setState({ awardsinfo: [] });
      searchFormFilters.comprehensionlist = this.setState({ comprehensionlist: [] });
      searchFormFilters.culturelist = this.setState({ culturelist: [] });
      searchFormFilters.genrelist = this.setState({ genrelist: [] });
      searchFormFilters.interestlevellist = this.setState({ interestlevellist: [] });
      searchFormFilters.programserieslist = this.setState({ programserieslist: [] });
      searchFormFilters.topicslist = this.setState({ topicslist: [] });
      searchFormFilters.themedatalist = this.setState({ themedatalist: [] });
      this.props.searchFilters(searchFormFilters);

      return;
    }

    let displayText = '';
    if (
      this.props.searchFiltersData.lexilemin > Constants.BOOK_LEXILE_MAX_RANGE_VALUE ||
      this.props.searchFiltersData.lexilemax > Constants.BOOK_LEXILE_MAX_RANGE_VALUE
    ) {
      displayText = `${displayText} ${Constants.BOOK_LEXILE_RANGE} \r\n`;
    } else if (
      this.props.searchFiltersData.readinglevelmin > Constants.BOOK_READING_RANGE_VALUE ||
      this.props.searchFiltersData.readinglevelmax > Constants.BOOK_READING_RANGE_VALUE
    ) {
      displayText = `${displayText} ${Constants.BOOK_READING_RANGE}\r\n`;
    } else if (
      this.props.searchFiltersData.pointsrangemin > Constants.BOOK_POINTS_RANGE_VALUE ||
      this.props.searchFiltersData.pointsrangemax > Constants.BOOK_POINTS_RANGE_VALUE
    ) {
      displayText = `${displayText} ${Constants.BOOK_POINTS_RANGE} \r\n`;
    } else if (
      this.props.searchFiltersData.lexilemin.length > 0 &&
      this.props.searchFiltersData.lexilemax.length === 0
    ) {
      displayText = `${displayText} ${Constants.BOOK_LEXILE_MAX_RANGE}\r\n`;
    } else if (
      this.props.searchFiltersData.lexilemax.length > 0 &&
      this.props.searchFiltersData.lexilemin.length === 0
    ) {
      displayText = `${displayText} ${Constants.BOOK_LEXILE_MIN_RANGE} \r\n`;
    } else if (
      this.props.searchFiltersData.readinglevelmin.length > 0 &&
      this.props.searchFiltersData.readinglevelmax.length === 0
    ) {
      displayText = `${displayText} ${Constants.BOOK_READING_MAX_RANGE}\r\n`;
    } else if (
      this.props.searchFiltersData.readinglevelmax.length > 0 &&
      this.props.searchFiltersData.readinglevelmin.length === 0
    ) {
      displayText = `${displayText} ${Constants.BOOK_READING_MIN_RANGE} \r\n`;
    } else if (
      this.props.searchFiltersData.guidereadinglevelmin.length > 0 &&
      this.props.searchFiltersData.guidereadinglevelmax.length === 0
    ) {
      displayText = `${displayText} ${Constants.BOOK_GUIDEREADING_MAX} \r\n`;
    } else if (
      this.props.searchFiltersData.guidereadinglevelmax.length > 0 &&
      this.props.searchFiltersData.guidereadinglevelmin.length === 0
    ) {
      displayText = `${displayText} ${Constants.BOOK_GUIDEREADING_MIN} \r\n`;
    } else if (
      this.props.searchFiltersData.pointsrangemin.length > 0 &&
      this.props.searchFiltersData.pointsrangemax.length === 0
    ) {
      displayText = `${displayText}  ${Constants.BOOK_POINTS_RANGE_MAX} \r\n`;
    } else if (
      this.props.searchFiltersData.pointsrangemax.length > 0 &&
      this.props.searchFiltersData.pointsrangemin.length === 0
    ) {
      displayText = `${displayText} ${Constants.BOOK_POINTS_RANGE_MIN} \r\n`;
    }

    const searchTerms = {};
    searchTerms.Term = this.state.searchBy;
    searchTerms.Order = this.state.order;

    const formTerms = {};

    if (this.state.title.length > 0) {
      formTerms.Title = this.state.title;
    }
    if (this.state.author.length > 0) {
      formTerms.Author = this.state.author;
    }
    if (this.state.booktype.length > 0) {
      formTerms.Type = this.state.booktype;
    }
    if (this.state.lang.length > 0) {
      formTerms.Language = this.state.lang;
    }
    if (this.state.accessibility.length > 0) {
      formTerms.Accessibility = this.state.accessibility;
    }
    const searchFilters = {};
    searchFilters.SortTerm = searchTerms;

    // Book Level
    const booklevel = {};

    // LexiLevel
    const lexileTerms = {};
    lexileTerms.Min = this.state.lexilemin.length > 0 ? this.state.lexilemin : '';
    lexileTerms.Max = this.state.lexilemax.length > 0 ? this.state.lexilemax : '';

    if (this.state.lexilemax.length > 0) {
      booklevel.LexileLevel = lexileTerms;
    }
    // Reading Level

    const readinglevelTerms = {};
    readinglevelTerms.Min = this.state.readinglevelmin.length > 0 ? this.state.readinglevelmin : '';
    readinglevelTerms.Max = this.state.readinglevelmax.length > 0 ? this.state.readinglevelmax : '';

    if (this.state.readinglevelmin.length > 0) {
      booklevel.ReadingLevel = readinglevelTerms;
    }

    // Guided Reading Level

    const guidedradingTerms = {};
    if (this.state.guidereadinglevelmin.length > 0 && this.state.guidereadinglevelmax.length > 0) {
      guidedradingTerms.Min = this.state.guidereadinglevelmin;
      guidedradingTerms.Max = this.state.guidereadinglevelmax;
      booklevel.GuidedReadingLevel = guidedradingTerms;
    }

    // Points Range
    const pointsrangeTerms = {};
    pointsrangeTerms.Min = this.state.pointsrangemin.length > 0 ? this.state.pointsrangemin : '';
    pointsrangeTerms.Max = this.state.pointsrangemax.length > 0 ? this.state.pointsrangemax : '';

    const searchSortTerms = {};
    searchSortTerms.SortTerms = searchFilters;
    searchSortTerms.BookInfo = formTerms;
    searchSortTerms.BookLevel = booklevel;

    if (displayText !== '') {
      const payloadData = displayText;
      this.props.messageModal({ payloadData });
      return;
    }
    // Awards
    if (this.state.awardsinfo.length > 0) {
      searchSortTerms.Awards = [];
      this.handleSearchData(searchSortTerms.Awards, this.state.awardsinfo, 'Award');
    }

    // ComprehensionSkills
    if (this.state.comprehensionlist.length > 0) {
      searchSortTerms.ComprehensionSkills = [];
      this.handleSearchData(
        searchSortTerms.ComprehensionSkills,
        this.state.comprehensionlist,
        'ComprehensionSkill'
      );
    }

    // Culture
    if (this.state.culturelist.length > 0) {
      searchSortTerms.Cultures = [];
      this.handleSearchData(searchSortTerms.Cultures, this.state.culturelist, 'Culture');
    }

    // Genre

    if (this.state.genrelist.length > 0) {
      searchSortTerms.Genres = [];
      this.handleSearchData(searchSortTerms.Genres, this.state.genrelist, 'Genre');
    }

    // Interest Levels

    if (this.state.interestlevellist.length > 0) {
      searchSortTerms.InterestLevels = [];
      this.handleSearchData(
        searchSortTerms.InterestLevels,
        this.state.interestlevellist,
        'InterestLevel'
      );
    }

    // Program Series
    if (this.state.programserieslist.length > 0) {
      searchSortTerms.Programs = [];
      this.handleSearchData(searchSortTerms.Programs, this.state.programserieslist, 'Program');
    }

    // Topics
    if (this.state.topicslist.length > 0) {
      searchSortTerms.Topics = [];
      this.handleSearchData(searchSortTerms.Topics, this.state.topicslist, 'Topic');
    }

    // Theme Data
    if (this.state.themedatalist.length > 0) {
      searchSortTerms.Themes = [];
      this.handleSearchData(searchSortTerms.Themes, this.state.themedatalist, 'Theme');
    }

    const rootElm = {};
    rootElm.SrcSearchReq = searchSortTerms;

    const searchFormFilters = {};
    searchFormFilters.title = this.state.title;
    searchFormFilters.author = this.state.author;
    searchFormFilters.booktype = this.state.booktype;
    searchFormFilters.lang = this.state.lang;
    searchFormFilters.accessibility = this.state.accessibility;
    searchFormFilters.lexilemin = this.state.lexilemin;
    searchFormFilters.lexilemax = this.state.lexilemax;
    searchFormFilters.readinglevelmin = this.state.readinglevelmin;
    searchFormFilters.readinglevelmax = this.state.readinglevelmax;
    searchFormFilters.guidereadinglevelmin = this.state.guidereadinglevelmin;
    searchFormFilters.guidereadinglevelmax = this.state.guidereadinglevelmax;
    searchFormFilters.pointsrangemin = this.state.pointsrangemin;
    searchFormFilters.pointsrangemax = this.state.pointsrangemax;
    searchFormFilters.awardsinfo = this.state.awardsinfo;
    searchFormFilters.comprehensionlist = this.state.comprehensionlist;
    searchFormFilters.culturelist = this.state.culturelist;
    searchFormFilters.genrelist = this.state.genrelist;
    searchFormFilters.interestlevellist = this.state.interestlevellist;
    searchFormFilters.programserieslist = this.state.programserieslist;
    searchFormFilters.topicslist = this.state.topicslist;
    searchFormFilters.themedatalist = this.state.themedatalist;

    this.props.onSearch(rootElm, searchFormFilters);
  };

  handleDisplayTeacher = e => {
    this.props.onDisplayTeachers(e);
  };
  render() {
    return (
      <form id="advanced_search_form" onSubmit={this.handleSubmit}>
        <div className="advanced-search__wrapper">
          <div className="advanced-search__collapsible">
            <div className="advanced-search__collapsible-group">
              <Collapsible title="Book Info">
                <div className="form-control">
                  <label className="label-control" htmlFor="title">
                    Title:
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    id="title"
                    name="title"
                    onChange={this.handleDataChange}
                    value={this.state.title}
                  />
                </div>
                <div className="form-control">
                  <label className="label-control" htmlFor="Author">
                    Author:
                  </label>
                  <input
                    type="text"
                    id="author"
                    className="form-input"
                    name="author"
                    onChange={this.handleDataChange}
                    value={this.state.author}
                  />
                </div>

                <div className="form-control">
                  <label className="label-control" htmlFor="BookType">
                    Book Type:
                  </label>
                  <span>
                    <input
                      className="form-control-book-info form-control--radio"
                      type="radio"
                      name="booktype"
                      value="Fiction"
                      checked={this.state.booktype === 'Fiction'}
                      onChange={this.handleDataChange}
                    />
                    Fiction Only{' '}
                  </span>
                  <span>
                    <input
                      className="form-control-book-info form-control--radio"
                      type="radio"
                      name="booktype"
                      value="Nonfiction"
                      checked={this.state.booktype === 'Nonfiction'}
                      onChange={this.handleDataChange}
                    />
                    Nonfiction Only{' '}
                  </span>
                  <span>
                    <input
                      className="form-control-book-info form-control--radio"
                      type="radio"
                      name="booktype"
                      value=""
                      checked={this.state.booktype === ''}
                      onChange={this.handleDataChange}
                    />
                    All{' '}
                  </span>
                </div>

                <div className="form-control">
                  <label className="label-control" htmlFor="Language">
                    Language:
                  </label>
                  <span>
                    <input
                      className="form-control-book-info form-control--radio"
                      type="radio"
                      name="lang"
                      value="english"
                      checked={this.state.lang === 'english'}
                      onChange={this.handleDataChange}
                    />
                    English Only{' '}
                  </span>
                  <span>
                    <input
                      className="form-control-book-info form-control--radio"
                      type="radio"
                      name="lang"
                      value="spanish"
                      checked={this.state.lang === 'spanish'}
                      onChange={this.handleDataChange}
                    />
                    Spanish Only{' '}
                  </span>
                  <span>
                    <input
                      className="form-control-book-info form-control--radio"
                      type="radio"
                      name="lang"
                      value=""
                      checked={this.state.lang === ''}
                      onChange={this.handleDataChange}
                    />
                    All{' '}
                  </span>
                </div>

                <div className="form-control">
                  <label className="label-control" htmlFor="Accessibility">
                    Accessibility:
                  </label>
                  <span>
                    <input
                      className="form-control-book-info form-control--radio"
                      type="radio"
                      name="accessibility"
                      value="Activated"
                      checked={this.state.accessibility === 'Activated'}
                      onChange={this.handleDataChange}
                    />
                    Activated{' '}
                  </span>
                  <span>
                    <input
                      className="form-control-book-info form-control--radio"
                      type="radio"
                      name="accessibility"
                      value="Deactivated"
                      checked={this.state.accessibility === 'Deactivated'}
                      onChange={this.handleDataChange}
                    />
                    Deactivated{' '}
                  </span>
                  <span>
                    <input
                      className="form-control-book-info form-control--radio"
                      type="radio"
                      name="accessibility"
                      value=""
                      checked={this.state.accessibility === ''}
                      onChange={this.handleDataChange}
                    />
                    All{' '}
                  </span>
                </div>
              </Collapsible>

              <Collapsible title="Book Level">
                <div className="form-control form-control-sm">
                  <label className="label-control label-control-lg" htmlFor="Lexilerange">
                    Lexile range:
                  </label>
                  <span>
                    <input
                      type="text"
                      id="lexilemin"
                      name="lexilemin"
                      onChange={this.handleDataChange}
                      value={this.state.lexilemin}
                      ref={input => {
                        this.lexileminValue = input;
                      }}
                    />
                  </span>
                  <span className="lexilemin--span">-</span>
                  <span>
                    <input
                      type="text"
                      id="lexilemax"
                      name="lexilemax"
                      value={this.state.lexilemax}
                      onChange={this.handleDataChange}
                      onBlur={this.handleLimitError}
                      ref={input => {
                        this.lexilemaxValue = input;
                      }}
                    />
                  </span>
                </div>

                <div className="form-control form-control-sm">
                  <label className="label-control label-control-lg" htmlFor="ReadingLevelRange">
                    Reading level range:
                  </label>
                  <span>
                    <input
                      type="text"
                      id="readinglevelmin"
                      name="readinglevelmin"
                      value={this.state.readinglevelmin}
                      onChange={this.handleDataChange}
                      ref={input => {
                        this.readinglevelminValue = input;
                      }}
                    />
                  </span>
                  <span className="lexilemin--span">-</span>
                  <span>
                    <input
                      type="text"
                      id="readinglevelmax"
                      name="readinglevelmax"
                      value={this.state.readinglevelmax}
                      onChange={this.handleDataChange}
                      onBlur={this.handleLimitError}
                      ref={input => {
                        this.readinglevelmaxValue = input;
                      }}
                    />
                  </span>
                </div>

                <div className="form-control form-control-sm">
                  <label
                    className="label-control label-control-lg"
                    htmlFor="GuidedReadingLevelRange"
                  >
                    Guided Reading level range:
                  </label>
                  <span>
                    <input
                      type="text"
                      id="guidereadinglevelmin"
                      name="guidereadinglevelmin"
                      value={this.state.guidereadinglevelmin}
                      onChange={this.handleDataChange}
                    />
                  </span>
                  <span className="lexilemin--span">-</span>
                  <span>
                    <input
                      type="text"
                      id="guidereadinglevelmax"
                      name="guidereadinglevelmax"
                      value={this.state.guidereadinglevelmax}
                      onChange={this.handleDataChange}
                      onBlur={this.handleLimitError}
                    />
                  </span>
                </div>

                <div className="form-control form-control-sm">
                  <label className="label-control label-control-lg" htmlFor="PointsRange">
                    Points range:
                  </label>
                  <span>
                    <input
                      type="text"
                      id="pointsrangemin"
                      name="pointsrangemin"
                      value={this.state.pointsrangemin}
                      onChange={this.handleDataChange}
                      ref={input => {
                        this.pointsrangeminValue = input;
                      }}
                    />
                  </span>
                  <span className="lexilemin--span">-</span>
                  <span>
                    <input
                      type="text"
                      id="pointsrangemax"
                      name="pointsrangemax"
                      value={this.state.pointsrangemax}
                      onChange={this.handleDataChange}
                      ref={input => {
                        this.pointsrangemaxValue = input;
                      }}
                      onBlur={this.handleLimitError}
                    />
                  </span>
                </div>
              </Collapsible>

              {this.props.awardsData && (
                <Collapsible title="Award">
                  <CollapsibleBook
                    data={this.props.awardsData}
                    selectedata={this.state.awardsinfo}
                    callbackFromParent={this.advanceSearcCheckboxhSelection(this.state.awardsinfo)}
                  />
                </Collapsible>
              )}

              {this.props.comskillData && (
                <Collapsible title="Comprehension Skill">
                  <CollapsibleBook
                    data={this.props.comskillData}
                    selectedata={this.state.comprehensionlist}
                    callbackFromParent={this.advanceSearcCheckboxhSelection(
                      this.state.comprehensionlist
                    )}
                  />
                </Collapsible>
              )}

              {this.props.cultureData && (
                <Collapsible title="Culture">
                  <CollapsibleBook
                    data={this.props.cultureData}
                    selectedata={this.state.culturelist}
                    callbackFromParent={this.advanceSearcCheckboxhSelection(this.state.culturelist)}
                  />
                </Collapsible>
              )}

              {this.props.genreData && (
                <Collapsible title="Genre">
                  <CollapsibleBook
                    data={this.props.genreData}
                    selectedata={this.state.genrelist}
                    callbackFromParent={this.advanceSearcCheckboxhSelection(this.state.genrelist)}
                  />
                </Collapsible>
              )}

              {this.props.interestLevelData && (
                <Collapsible title="Interest Level">
                  <CollapsibleBook
                    data={this.props.interestLevelData}
                    selectedata={this.state.interestlevellist}
                    callbackFromParent={this.advanceSearcCheckboxhSelection(
                      this.state.interestlevellist
                    )}
                  />
                </Collapsible>
              )}

              {this.props.programSeriesData && (
                <Collapsible title="Program/Series">
                  <CollapsibleBook
                    data={this.props.programSeriesData}
                    selectedata={this.state.programserieslist}
                    callbackFromParent={this.advanceSearcCheckboxhSelection(
                      this.state.programserieslist
                    )}
                  />
                </Collapsible>
              )}

              {this.props.topicsData && (
                <Collapsible title="Topics">
                  <CollapsibleBook
                    data={this.props.topicsData}
                    selectedata={this.state.topicslist}
                    callbackFromParent={this.advanceSearcCheckboxhSelection(this.state.topicslist)}
                  />
                </Collapsible>
              )}

              {this.props.themesData && (
                <Collapsible title="Themes">
                  <CollapsibleBook
                    data={this.props.themesData}
                    selectedata={this.state.themedatalist}
                    callbackFromParent={this.advanceSearcCheckboxhSelection(
                      this.state.themedatalist
                    )}
                  />
                </Collapsible>
              )}
            </div>
          </div>

          <div className="advanced-search-buttons advanced-search-buttons--control">
            <AdvancedSearchControlButtons callbackFromParent={this.advanceSearchClearForm} />
          </div>
          <div className="advanced-search-buttons">
            <InstalledQuiz
              data={this.props.installedQuizCountData}
              quizModalData={this.props.showTeacherMadeQuizData}
              editQuizCollectionModalData={this.props.showEditQuizCollectionModalData}
              callbackFromParent={this.handleDisplayTeacher}
            />
          </div>
        </div>
      </form>
    );
  }
}

AdvancedSearch.propTypes = {
  awardsData: PropTypes.array,
  comskillData: PropTypes.array,
  cultureData: PropTypes.array,
  genreData: PropTypes.array,
  interestLevelData: PropTypes.array,
  programSeriesData: PropTypes.array,
  topicsData: PropTypes.array,
  themesData: PropTypes.array,
  installedQuizCountData: PropTypes.object,
  searchFiltersData: PropTypes.object,
  searchFilters: PropTypes.func.isRequired,
  messageModal: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onDisplayTeachers: PropTypes.func.isRequired,
  showTeacherMadeQuizData: PropTypes.func,
  showEditQuizCollectionModalData: PropTypes.func,
};
