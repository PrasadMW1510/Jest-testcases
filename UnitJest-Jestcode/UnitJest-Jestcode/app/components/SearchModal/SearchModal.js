/**
 *
 * SearchModal
 *
 */
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import SAMButton from 'components/SAMButton';
import SAMModal from 'components/SAMModal';
import SearchPaginator from 'components/SearchPaginator';
import SearchResultsTable from 'components/SearchResultsTable';
import { USER_ORG, USER_TYPE, COHORT_TYPE } from 'containers/App/constants';
import {
  SEARCH_STUDENT,
  SEARCH_TEACHER,
  UNINITIALIZED_ITEM_COUNT,
} from 'containers/SearchModalContainer/constants';
import { isUserTypeAdminOrTech } from 'utils/utilities';

import * as Constants from './constants';
import './SearchModal.scss';

class SearchModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classAssignOption: Constants.CLASS_ASSIGN_DEFAULT_OPTION,
      searchResultsIdsChecked: [],
      ...this.INITIAL_STATE,
    };
  }

  componentWillReceiveProps(nextProps) {
    // when search results change then empty the checked array and reset the dropdown to default
    if (nextProps.searchResults !== this.props.searchResults) {
      this.setState({
        searchResultsIdsChecked: [],
        classAssignOption: Constants.CLASS_ASSIGN_DEFAULT_OPTION,
      });
    }
  }

  determineInitialSchoolOption = () => {
    if (!isUserTypeAdminOrTech(this.props.profileUserType)) {
      return '';
    }
    return this.props.schools.length === 1 ? this.props.schools[0].id : '';
  };

  STR_TRUE = 'true';
  STR_FALSE = 'false';

  INITIAL_STATE = {
    searchBy: SEARCH_STUDENT,
    school: this.determineInitialSchoolOption(),
    grade: '',
    product: '',
    class: '',
    teacher: '',
    lastName: '',
    firstName: '',
    userName: '',
    studentId: '',
    districtUserId: '',
    sort_by: 'name',
    sort_order: 'asc',
    itemsPerPage: Constants.DEFAULT_ITEMS_PER_PAGE,
    curPage: Constants.PAGE_ZERO,
    activeStudents: this.STR_TRUE,
    activeTeachers: this.STR_TRUE,
    selectAll: false,
    showClassAssignModal: false,
    searchFilterInfo: '', // a string that displays what was Searched on to the user.
    hasSearched: false,
    executedSearchOpts: {}, // a snapshot of what Opts used for a search.
  };

  RESET_CUR_PAGE_TRUE = true;
  RESET_CUR_PAGE_FALSE = false;
  SEARCH_BY = 'searchBy';

  createSelectOptions = (items, valueLookup) =>
    items.map(i => (
      <option value={i[valueLookup]} key={i[valueLookup]}>
        {i.name}
      </option>
    ));

  createSchoolSelectOptions = () => {
    const allSchoolOption =
      this.props.schools.length > 1 ? (
        <option value={Constants.ALL_SCHOOLS} key={Constants.ALL_SCHOOLS}>
          {Constants.ALL_SCHOOLS}
        </option>
      ) : null;
    return (
      <Fragment>
        {allSchoolOption}
        {this.createSelectOptions(this.props.schools, 'id')}
      </Fragment>
    );
  };

  createProgramSelectOptions = items =>
    items.map(i => (
      <option value={i.$.name} key={i.$.name}>
        {i.$.name}
      </option>
    ));

  resetOptions = e => {
    e.preventDefault();
    const { searchBy, searchResultsIdsChecked, hasSearched, executedSearchOpts } = this.state;
    this.setState({
      ...this.INITIAL_STATE,
      searchBy,
      searchResultsIdsChecked,
      hasSearched,
      executedSearchOpts,
    });
  };

  handleChange = e => {
    const change = {};
    const targetVal = e.target.value;
    change[e.target.name] = e.target.value;
    if (e.target.name === this.SEARCH_BY) {
      this.handleSearchByChange(targetVal);
      return;
    }
    this.setState(change);
  };

  /**
   * when switching from Student to Teacher Search this will reset state and the selected Search Results.
   */
  handleSearchByChange(targetVal) {
    const stateSearchBy = this.state.searchBy;
    if (stateSearchBy !== targetVal) {
      this.setState(
        { ...this.INITIAL_STATE, searchBy: targetVal, searchResultsIdsChecked: [] },
        this.props.onResetForSearchByChange()
      );
    }
  }

  handleGoButtonClick = () => {
    let data = {};
    const optsForSearchRefresh = this.state.executedSearchOpts;
    const searchRefreshOnSave = this.refreshSearchOnClassAssignSave;
    const checkedCohorts = this.state.searchResultsIdsChecked;
    const cohortTypeLabel = this.cohortTypeForAssignLabel();
    switch (this.state.classAssignOption) {
      case Constants.ASSIGN_TO_A_CLASS_OPTION:
        data = {
          searchRefreshOnSave,
          cohortsToAssign: checkedCohorts,
          cohortTypeLabel,
        };
        this.props.showSearchClassAssignModal(data);
        break;
      case Constants.ACCOUNT_DELETE_OPTION:
        data = {
          searchRefreshOnSave,
          cohortsToDelete: checkedCohorts,
          searchOpts: optsForSearchRefresh,
        };
        this.props.showAccountDeleteModal(data);
        break;
      // no default
    }
  };
  handleActiveStudentsChange = e => {
    const newVal = e.target.value;
    const school = this.determineInitialSchoolOption();
    const schoolState = school === '' ? Constants.ALL_SCHOOLS : school;
    if (newVal === this.STR_TRUE) {
      this.setState({ activeStudents: newVal });
    } else {
      this.setState({
        activeStudents: newVal,
        school: schoolState,
        teacher: Constants.ALL_TEACHERS,
        product: Constants.ALL_PRODUCTS,
      });
    }
  };

  handleActiveTeachersChange = e => {
    const newVal = e.target.value;
    const school = this.determineInitialSchoolOption();
    const schoolState = school === '' ? Constants.ALL_SCHOOLS : school;
    if (newVal === this.STR_TRUE) {
      this.setState({ activeTeachers: newVal });
    } else {
      this.setState({
        activeTeachers: newVal,
        school: schoolState,
        grade: Constants.ALL_GRADES,
        class: Constants.ALL_CLASSES,
      });
    }
  };

  shouldShowSearchCriteriaWarning = () => {
    if (this.props.loginUserOrg !== USER_ORG.District) {
      return false;
    }
    let criteria = 0;
    if (this.state.school !== Constants.ALL_SCHOOLS && this.state.school !== '') criteria += 1;
    if (this.state.grade !== Constants.ALL_GRADES && this.state.grade !== '') criteria += 1;
    if (this.state.teacher !== Constants.ALL_TEACHERS && this.state.teacher !== '') criteria += 1;
    if (this.state.class !== Constants.ALL_CLASSES && this.state.class !== '') criteria += 1;
    if (this.state.product !== Constants.ALL_PRODUCTS && this.state.product !== '') criteria += 1;
    if (this.state.lastName !== '') criteria += 1;
    if (this.state.firstName !== '') criteria += 1;
    if (this.state.userName !== '') criteria += 1;
    if (this.state.studentId !== '') criteria += 1;
    if (this.state.districtUserId !== '') criteria += 1;
    return criteria === 0;
  };

  createSearchFilters = resetCurPage => {
    const filters = {};
    filters.school_id = this.state.school !== Constants.ALL_SCHOOLS ? this.state.school : '';
    filters.grade_id = this.state.grade !== Constants.ALL_GRADES ? this.state.grade : '';
    filters.teacher_id = this.state.teacher !== Constants.ALL_TEACHERS ? this.state.teacher : '';
    filters.class_id = this.state.class !== Constants.ALL_CLASSES ? this.state.class : '';
    filters.product_id = this.state.product !== Constants.ALL_PRODUCTS ? this.state.product : '';

    const searchTerms = {};
    searchTerms.last_name = this.state.lastName;
    searchTerms.first_name = this.state.firstName;
    searchTerms.user_name = this.state.userName;

    let cohortSearch = '';
    if (this.state.searchBy === SEARCH_STUDENT) {
      cohortSearch = 'student_search';
      searchTerms.student_id = this.state.studentId;
      filters.active = this.state.activeStudents;
    } else if (this.state.searchBy === SEARCH_TEACHER) {
      cohortSearch = 'teacher_search';
      searchTerms.district_user_id = this.state.districtUserId;
      filters.active = this.state.activeTeachers;
    }
    const searchFilters = {};
    searchFilters[cohortSearch] = {};
    searchFilters[cohortSearch].filters = filters;
    searchFilters[cohortSearch].search_terms = searchTerms;
    searchFilters[cohortSearch].sort_by = this.state.sort_by;
    searchFilters[cohortSearch].sort_order = this.state.sort_order;
    searchFilters.itemsPerPage = this.state.itemsPerPage;
    searchFilters.curPage = resetCurPage ? Constants.PAGE_ZERO : this.state.curPage;
    searchFilters.searchBy = this.state.searchBy;

    this.renderSearchInfo(filters, searchTerms);
    this.setState({ executedSearchOpts: searchFilters });
    return searchFilters;
  };

  handleRowCheckboxOnChange = (isChecked, itemId) => {
    this.setState(previousState => {
      let searchResultsIdsChecked = previousState.searchResultsIdsChecked;

      if (isChecked) {
        searchResultsIdsChecked.push(itemId);
      } else {
        searchResultsIdsChecked = searchResultsIdsChecked.filter(element => element !== itemId);
      }
      if (searchResultsIdsChecked.length === 0) {
        this.updClassAssignOptionState(Constants.CLASS_ASSIGN_DEFAULT_OPTION);
      }
      return { searchResultsIdsChecked };
    });
  };

  toggleAllCheckboxes = (isChecked, itemIds) => {
    if (!isChecked) {
      this.setState({
        searchResultsIdsChecked: itemIds,
        selectAll: isChecked,
        classAssignOption: Constants.CLASS_ASSIGN_DEFAULT_OPTION,
      });
    } else {
      this.setState({
        searchResultsIdsChecked: itemIds,
        selectAll: isChecked,
      });
    }
  };

  handlePaginateSearch = pageNum => {
    let i = pageNum;
    i = Math.min(Math.max(0, i), this.props.searchResults.paginationData.page_count[0] - 1);
    this.setState({ curPage: i }, this.handlePaginatedSearchClick);
  };

  handlePaginatedSearchClick = () => {
    const searchOpts = this.createSearchFilters(this.RESET_CUR_PAGE_FALSE);
    this.props.onSearch(searchOpts);
  };

  handleSearchClick = () => {
    if (this.shouldShowSearchCriteriaWarning()) {
      this.props.showWarningModal({ message: Constants.SEARCH_CRITERIA_MUST_BE_SELECTED });
      return;
    }

    this.setState({
      curPage: Constants.PAGE_ZERO,
      hasSearched: true,
      searchResultsIdsChecked: [],
      classAssignOption: Constants.CLASS_ASSIGN_DEFAULT_OPTION,
    });
    const searchOpts = this.createSearchFilters(this.RESET_CUR_PAGE_TRUE);
    this.props.onSearch(searchOpts);
  };

  refreshSearchOnClassAssignSave = () => {
    this.handleSearchClick();
  };

  /**
   * creates the input options for when the logged in user is a Teacher searching for students
   * @returns {*}
   */
  createTeacherSearchForStudentFilters = () => (
    <div>
      <div className="search-modal__message">Search</div>
      <button className="search-modal__close class-form__btn--default" onClick={this.props.onClose}>
        X
      </button>
      <div className="search-modal__search-for">
        Search for
        <select
          value={this.state.searchBy}
          name={this.SEARCH_BY}
          id={this.SEARCH_BY}
          onChange={this.handleChange}
          className="search-modal__select"
        >
          <option value="student">Students</option>
        </select>
      </div>
      <div className="search-modal__instruction">
        Use the options below to search for students in your school. Selecting more options will
        narrow your search.
      </div>
      <div className="search-modal__dropdowns">
        <div className="search-modal__div-select">
          Grade:<select
            name="grade"
            className="search-modal__select"
            onChange={this.handleChange}
            value={this.state.grade}
          >
            <option value={Constants.ALL_GRADES} key={Constants.ALL_GRADES}>
              {Constants.ALL_GRADES}
            </option>
            {this.createSelectOptions(this.props.grades, 'name')}
          </select>
        </div>
        <div className="search-modal__div-select">
          Teacher:
          <select
            name="teacher"
            className="search-modal__select"
            onChange={this.handleChange}
            value={this.state.teacher}
          >
            <option value={Constants.ALL_TEACHERS} key={Constants.ALL_TEACHERS}>
              {Constants.ALL_TEACHERS}
            </option>
            {this.createSelectOptions(this.props.teachers, 'id')}
          </select>
        </div>
        <div className="search-modal__div-select">
          Class:
          <select
            name="class"
            className="search-modal__select"
            onChange={this.handleChange}
            value={this.state.class}
          >
            <option value={Constants.ALL_CLASSES} key={Constants.ALL_CLASSES}>
              {Constants.ALL_CLASSES}
            </option>
            {this.createSelectOptions(this.props.classes, 'id')}
          </select>
        </div>
        <div className="search-modal__div-select">
          Product:
          <select
            name="product"
            className="search-modal__select"
            onChange={this.handleChange}
            value={this.state.product}
          >
            <option value={Constants.ALL_PRODUCTS} key={Constants.ALL_PRODUCTS}>
              {Constants.ALL_PRODUCTS}
            </option>
            {this.createProgramSelectOptions(this.props.apps)}
          </select>
        </div>
      </div>
      <div className="search-modal__textinputs">
        <div className="search-modal__div-input">
          Last Name:<input
            name="lastName"
            id="lastName"
            className="search-modal__input"
            type="text"
            onChange={this.handleChange}
            value={this.state.lastName}
            maxLength={Constants.SEARCH_LAST_NAME_MAX_LEN}
          />
        </div>
        <div className="search-modal__div-input">
          First Name:<input
            name="firstName"
            id="firstName"
            className="search-modal__input"
            type="text"
            onChange={this.handleChange}
            value={this.state.firstName}
            maxLength={Constants.SEARCH_FIRST_NAME_MAX_LEN}
          />
        </div>
        <div className="search-modal__div-input">
          Username:<input
            name="userName"
            id="userName"
            className="search-modal__input"
            type="text"
            onChange={this.handleChange}
            value={this.state.userName}
            maxLength={Constants.SEARCH_USER_NAME_MAX_LEN}
          />
        </div>
        <div className="search-modal__div-input">
          Student ID:<input
            name="studentId"
            id="studentId"
            className="search-modal__input"
            type="text"
            onChange={this.handleChange}
            value={this.state.studentId}
            maxLength={Constants.SEARCH_STUDENT_ID_MAX_LEN}
          />
        </div>
        <div className="search-modal__div-input">
          <button
            id="searchBtn"
            className="class-form__btn class-form__btn--urgent"
            onClick={this.handleSearchClick}
          >
            Search
          </button>
        </div>
        <div className="search-modal__div-input">
          <button
            id="resetOptionsBtn"
            className="class-form__btn class-form__btn--default"
            onClick={this.resetOptions}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );

  /**
   * creates the input options for when the logged in user is an  Admin searching for students
   * @returns {*}
   */
  createAdminSearchForStudentFilters = () => (
    <div>
      <div className="search-modal__message">Search</div>
      <button className="search-modal__close class-form__btn--default" onClick={this.props.onClose}>
        X
      </button>
      <div className="search-modal__search-for">
        Search for
        <select
          value={this.state.searchBy}
          name={this.SEARCH_BY}
          id={this.SEARCH_BY}
          onChange={this.handleChange}
          className="search-modal__select"
        >
          <option value="student">Students</option>
          <option value="teacher">Teachers</option>
        </select>
      </div>
      <div className="search-modal__instruction">
        <span className="search-modal__instruction-text">
          Use the options below to search for students in your SAM installation. Selecting more
          options will narrow your search.
        </span>
        <label htmlFor="searchModal__student-radio--active" className="search-modal__radio-label">
          <input
            className="search-modal__radio"
            id="searchModal__student-radio--active"
            type="radio"
            value={this.STR_TRUE}
            checked={this.state.activeStudents === this.STR_TRUE}
            onChange={this.handleActiveStudentsChange}
          />
          Active Students
        </label>
        <label htmlFor="searchModal__student-radio--inactive" className="search-modal__radio-label">
          <input
            className="search-modal__radio"
            id="searchModal__student-radio--inactive"
            type="radio"
            value={this.STR_FALSE}
            checked={this.state.activeStudents === this.STR_FALSE}
            onChange={this.handleActiveStudentsChange}
          />
          Inactive Students
        </label>
      </div>
      <div className="search-modal__dropdowns">
        <div className="search-modal__div-select">
          School:
          <select
            name="school"
            className="search-modal__select"
            onChange={this.handleChange}
            value={this.state.school}
            disabled={this.state.activeStudents === this.STR_FALSE}
          >
            {this.createSchoolSelectOptions()}
          </select>
        </div>
        <div className="search-modal__div-select">
          Grade:<select
            name="grade"
            className="search-modal__select"
            onChange={this.handleChange}
            value={this.state.grade}
          >
            <option value={Constants.ALL_GRADES} key={Constants.ALL_GRADES}>
              {Constants.ALL_GRADES}
            </option>
            {this.createSelectOptions(this.props.grades, 'name')}
          </select>
        </div>
        <div className="search-modal__div-select">
          Teacher:
          <select
            name="teacher"
            className="search-modal__select"
            onChange={this.handleChange}
            value={this.state.teacher}
            disabled={this.state.activeStudents === this.STR_FALSE}
          >
            <option value={Constants.ALL_TEACHERS} key={Constants.ALL_TEACHERS}>
              {Constants.ALL_TEACHERS}
            </option>
            {this.createSelectOptions(this.props.teachers, 'id')}
          </select>
        </div>
        <div className="search-modal__div-select">
          Product:
          <select
            name="product"
            className="search-modal__select"
            onChange={this.handleChange}
            value={this.state.product}
            disabled={this.state.activeStudents === this.STR_FALSE}
          >
            <option value={Constants.ALL_PRODUCTS} key={Constants.ALL_PRODUCTS}>
              {Constants.ALL_PRODUCTS}
            </option>
            {this.createProgramSelectOptions(this.props.apps)}
          </select>
        </div>
      </div>
      <div className="search-modal__textinputs">
        <div className="search-modal__div-input">
          Last Name:<input
            name="lastName"
            id="lastName"
            className="search-modal__input"
            type="text"
            onChange={this.handleChange}
            value={this.state.lastName}
            maxLength={Constants.SEARCH_LAST_NAME_MAX_LEN}
          />
        </div>
        <div className="search-modal__div-input">
          First Name:<input
            name="firstName"
            id="firstName"
            className="search-modal__input"
            type="text"
            onChange={this.handleChange}
            value={this.state.firstName}
            maxLength={Constants.SEARCH_FIRST_NAME_MAX_LEN}
          />
        </div>
        <div className="search-modal__div-input">
          Username:<input
            name="userName"
            id="userName"
            className="search-modal__input"
            type="text"
            onChange={this.handleChange}
            value={this.state.userName}
            maxLength={Constants.SEARCH_USER_NAME_MAX_LEN}
          />
        </div>
        <div className="search-modal__div-input">
          Student ID:<input
            name="studentId"
            id="studentId"
            className="search-modal__input"
            type="text"
            onChange={this.handleChange}
            value={this.state.studentId}
            maxLength={Constants.SEARCH_STUDENT_ID_MAX_LEN}
          />
        </div>
        <div className="search-modal__div-input">
          <button
            id="searchBtn"
            className="class-form__btn class-form__btn--urgent"
            onClick={this.handleSearchClick}
          >
            Search
          </button>
        </div>
        <div className="search-modal__div-input">
          <button
            id="resetOptionsBtn"
            className="class-form__btn class-form__btn--default"
            onClick={this.resetOptions}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );

  /**
   * creates the input options for when the logged in user is an Admin searching for teachers
   * @returns {*}
   */
  createAdminSearchForTeacherFilter = () => (
    <div>
      <div className="search-modal__message">Search</div>
      <button className="search-modal__close class-form__btn--default" onClick={this.props.onClose}>
        X
      </button>
      <div className="search-modal__search-for">
        Search for
        <select
          value={this.state.searchBy}
          name={this.SEARCH_BY}
          id={this.SEARCH_BY}
          onChange={this.handleChange}
          className="search-modal__select"
        >
          <option value="student">Students</option>
          <option value="teacher">Teachers</option>
        </select>
      </div>
      <div className="search-modal__instruction">
        <span className="search-modal__instruction-text">
          Use the options below to search for teachers in your SAM installation. Selecting more
          options will narrow your search.
        </span>
        <label htmlFor="searchModal__teacher-radio--active" className="search-modal__radio-label">
          <input
            className="search-modal__radio"
            id="searchModal__teacher-radio--active"
            type="radio"
            value={this.STR_TRUE}
            checked={this.state.activeTeachers === this.STR_TRUE}
            onChange={this.handleActiveTeachersChange}
          />
          Active Teachers
        </label>
        <label htmlFor="searchModal__teacher-radio--inactive" className="search-modal__radio-label">
          <input
            className="search-modal__radio"
            id="searchModal__teacher-radio--inactive"
            type="radio"
            value={this.STR_FALSE}
            checked={this.state.activeTeachers === this.STR_FALSE}
            onChange={this.handleActiveTeachersChange}
          />
          Inactive Teachers
        </label>
      </div>
      <div className="search-modal__dropdowns">
        <div className="search-modal__div-select">
          School:
          <select
            name="school"
            className="search-modal__select"
            onChange={this.handleChange}
            value={this.state.school}
            disabled={this.state.activeTeachers === this.STR_FALSE}
          >
            {this.createSchoolSelectOptions()}
          </select>
        </div>
        <div className="search-modal__div-select">
          Grade:<select
            name="grade"
            className="search-modal__select"
            onChange={this.handleChange}
            value={this.state.grade}
            disabled={this.state.activeTeachers === this.STR_FALSE}
          >
            <option value={Constants.ALL_GRADES} key={Constants.ALL_GRADES}>
              {Constants.ALL_GRADES}
            </option>
            {this.createSelectOptions(this.props.grades, 'name')}
          </select>
        </div>
        <div className="search-modal__div-select">
          Class:
          <select
            name="class"
            className="search-modal__select"
            onChange={this.handleChange}
            value={this.state.class}
            disabled={this.state.activeTeachers === this.STR_FALSE}
          >
            <option value={Constants.ALL_CLASSES} key={Constants.ALL_CLASSES}>
              {Constants.ALL_CLASSES}
            </option>
            {this.createSelectOptions(this.props.classes, 'id')}
          </select>
        </div>
      </div>
      <div className="search-modal__textinputs">
        <div className="search-modal__div-input">
          Last Name:<input
            name="lastName"
            id="lastName"
            className="search-modal__input"
            type="text"
            onChange={this.handleChange}
            value={this.state.lastName}
            maxLength={Constants.SEARCH_LAST_NAME_MAX_LEN}
          />
        </div>
        <div className="search-modal__div-input">
          First Name:<input
            name="firstName"
            id="firstName"
            className="search-modal__input"
            type="text"
            onChange={this.handleChange}
            value={this.state.firstName}
            maxLength={Constants.SEARCH_FIRST_NAME_MAX_LEN}
          />
        </div>
        <div className="search-modal__div-input">
          Username:<input
            name="userName"
            id="userName"
            className="search-modal__input"
            type="text"
            onChange={this.handleChange}
            value={this.state.userName}
            maxLength={Constants.SEARCH_USER_NAME_MAX_LEN}
          />
        </div>
        <div className="search-modal__div-input">
          District ID:<input
            name="districtUserId"
            id="districtUserId"
            className="search-modal__input"
            type="text"
            onChange={this.handleChange}
            value={this.state.districtUserId}
            maxLength={Constants.SEARCH_DISTRICT_USER_ID_MAX_LEN}
          />
        </div>
        <div className="search-modal__div-input">
          <button
            id="searchBtn"
            className="class-form__btn class-form__btn--urgent"
            onClick={this.handleSearchClick}
          >
            Search
          </button>
        </div>
        <div className="search-modal__div-input">
          <button
            id="resetOptionsBtn"
            className="class-form__btn class-form__btn--default"
            onClick={this.resetOptions}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );

  /**
   * Creates the search filters that will display based on logged in UserType and the
   * cohort type searched for: student or teacher.
   * @returns {*}
   */
  createDisplayedSearchFilters = () => {
    let displayedSearchFilters = null;
    if (isUserTypeAdminOrTech(this.props.profileUserType)) {
      if (this.state.searchBy === SEARCH_STUDENT) {
        displayedSearchFilters = this.createAdminSearchForStudentFilters();
      } else {
        displayedSearchFilters = this.createAdminSearchForTeacherFilter();
      }
    } else {
      displayedSearchFilters = this.createTeacherSearchForStudentFilters();
    }
    return displayedSearchFilters;
  };

  cohortTypeForAssignLabel = () => {
    switch (this.state.searchBy) {
      case SEARCH_TEACHER:
        return COHORT_TYPE.Teacher;
      case SEARCH_STUDENT:
        return COHORT_TYPE.Student;
      default:
        return 'user';
    }
  };

  handleClassAssignOptionChange = event => {
    this.updClassAssignOptionState(event.target.value);
  };

  shouldShowDeleteOption = () => {
    let result = false;
    if (
      this.state.executedSearchOpts &&
      this.state.executedSearchOpts.student_search &&
      this.state.executedSearchOpts.student_search.filters.active === this.STR_FALSE
    )
      result = true;
    if (
      this.state.executedSearchOpts &&
      this.state.executedSearchOpts.teacher_search &&
      this.state.executedSearchOpts.teacher_search.filters.active === this.STR_FALSE
    )
      result = true;
    return result;
  };

  updClassAssignOptionState = value => {
    this.setState({
      classAssignOption: value,
    });
  };

  /**
   * places a string representing the filters selected for this search
   * into the local state.
   * @param filters
   * @param searchTerms
   */
  renderSearchInfo = (filters, searchTerms) => {
    let result = '';
    if (filters && filters.school_id && filters.school_id !== '') {
      const school = this.props.schools.find(pSchool => pSchool.id[0] === filters.school_id);
      if (school) {
        result += ` School: ${school.name};`;
      }
    }
    if (filters && filters.grade_id && filters.grade_id !== '') {
      result += ` Grade: ${filters.grade_id};`;
    }
    if (filters && filters.teacher_id && filters.teacher_id !== '') {
      const teacher = this.props.teachers.find(pTeacher => pTeacher.id[0] === filters.teacher_id);
      if (teacher) {
        result += ` Teacher: ${teacher.name};`;
      }
    }
    if (filters && filters.product_id && filters.product_id !== '') {
      result += ` Product: ${filters.product_id};`;
    }
    if (filters && filters.class_id && filters.class_id.len !== '') {
      const schoolClass = this.props.classes.find(pClass => pClass.id[0] === filters.class_id);
      if (schoolClass) {
        result += ` Class: ${schoolClass.name};`;
      }
    }

    if (searchTerms && searchTerms.last_name && searchTerms.last_name !== '') {
      result += ` Last Name: ${searchTerms.last_name};`;
    }
    if (searchTerms && searchTerms.first_name && searchTerms.first_name !== '') {
      result += ` First Name: ${searchTerms.first_name};`;
    }
    if (searchTerms && searchTerms.user_name && searchTerms.user_name !== '') {
      result += ` User Name: ${searchTerms.user_name};`;
    }
    if (searchTerms && searchTerms.student_id && searchTerms.student_id !== '') {
      result += ` StudentId: ${searchTerms.student_id};`;
    }
    if (searchTerms && searchTerms.district_user_id && searchTerms.district_user_id !== '') {
      result += ` DistrictUserId: ${searchTerms.district_user_id};`;
    }

    if (result !== '') {
      result = ` for ${result}`;
    }
    this.setState({ searchFilterInfo: result });
  };
  /**
   * writes the number of results to screen.
   * */
  renderCountInfo = () => {
    const cssClassName = 'search-modal__results-count';
    let result = <div className={cssClassName} />;
    let low = 0;
    let high = 0;
    let totalItems = 0;
    const searchedFilters = this.state.searchFilterInfo;
    if (this.props.searchResults.itemCount) {
      if (
        isNaN(this.props.searchResults.itemCount) ||
        Number(this.props.searchResults.itemCount) <= UNINITIALIZED_ITEM_COUNT
      ) {
        result = <div className={cssClassName} />;
      } else if (
        isNaN(this.props.searchResults.itemCount) ||
        Number(this.props.searchResults.itemCount) === 0
      ) {
        result = (
          <div
            className={cssClassName}
          >{`Displaying results ${low} - ${high} of ${totalItems} ${searchedFilters}`}</div>
        );
      } else {
        totalItems = Number(this.props.searchResults.itemCount);
        const curPage = Number(this.props.searchResults.paginationData.current_page);
        const ipp = Number(this.props.searchResults.paginationData.items_per_page);
        low = curPage * ipp + 1;
        high = (curPage + 1) * ipp > totalItems ? totalItems : (curPage + 1) * ipp;

        result = (
          <div
            className={cssClassName}
          >{`Displaying results ${low} - ${high} of ${totalItems} ${searchedFilters}`}</div>
        );
      }
    }
    return result;
  };

  renderFooterOptionsAndButton = () => {
    let delOption = null;
    if (this.shouldShowDeleteOption()) {
      delOption = <option value={Constants.ACCOUNT_DELETE_OPTION}>Delete</option>;
    }
    return (
      this.state.hasSearched && (
        <div className="search-modal__select-container">
          <select
            className="search-modal__class-assign-select"
            value={this.state.classAssignOption}
            onChange={this.handleClassAssignOptionChange}
            disabled={this.state.searchResultsIdsChecked.length === 0}
          >
            <option value={Constants.CLASS_ASSIGN_DEFAULT_OPTION}>
              {Constants.CLASS_ASSIGN_DEFAULT_OPTION}
            </option>
            <option value={Constants.ASSIGN_TO_A_CLASS_OPTION}>Assign to a Class</option>
            {delOption}
          </select>
          <SAMButton
            id="goButton"
            isPrimaryButton
            buttonClassModifier="search-modal__select-button"
            onClickHandler={this.handleGoButtonClick}
            disabled={this.state.classAssignOption === Constants.CLASS_ASSIGN_DEFAULT_OPTION}
          >
            Go
          </SAMButton>
        </div>
      )
    );
  };

  render() {
    return (
      <SAMModal
        isOpen={this.props.isOpen}
        contentLabel="Search Modal"
        modalClassModifier="search-modal"
      >
        {this.createDisplayedSearchFilters()}
        {this.renderCountInfo()}
        <div className="search-results__table-header-group">
          <SearchResultsTable
            searchResultsIdsChecked={this.state.searchResultsIdsChecked}
            searchResults={this.props.searchResults}
            profileUserType={this.props.profileUserType}
            resultsType={this.state.searchBy}
            handleRowCheckboxOnChange={this.handleRowCheckboxOnChange}
            toggleAllCheckboxes={this.toggleAllCheckboxes}
            selectAll={this.state.selectAll}
          />
        </div>
        <div className="search-modal__footer">
          {this.renderFooterOptionsAndButton()}
          <SearchPaginator
            data={this.props.searchResults.paginationData}
            handlePaginatedSearch={this.handlePaginateSearch}
          />
        </div>
      </SAMModal>
    );
  }
}

SearchModal.defaultProps = {
  apps: [],
  classes: [],
  grades: [],
  teachers: [],
  schools: [],
  profileUserType: USER_TYPE.Teacher,
  searchResults: {},
  loginUserOrg: USER_ORG.School,
};

SearchModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  apps: PropTypes.array,
  classes: PropTypes.array,
  grades: PropTypes.array,
  teachers: PropTypes.array,
  searchResults: PropTypes.object,
  profileUserType: PropTypes.string.isRequired,
  schools: PropTypes.array,
  onResetForSearchByChange: PropTypes.func.isRequired,
  loginUserOrg: PropTypes.string.isRequired,
  showAccountDeleteModal: PropTypes.func.isRequired,
  showWarningModal: PropTypes.func.isRequired,
  showSearchClassAssignModal: PropTypes.func.isRequired,
};

export default SearchModal;
