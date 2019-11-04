/**
 *
 * ManageInactiveAccounts
 *
 */

import React from 'react';
import SAMButton from 'components/SAMButton';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import 'components/external_scss/Pagination.scss';
import { COHORT_TYPE, USER_TYPE } from 'containers/App/constants';
import { selectMiaOptionColumns } from 'containers/ManageInactiveAccountsContainer/selectors';
import { isUserTypeAdminOrTech } from 'utils/utilities';
import * as ModalConstants from 'containers/ModalController/constants';

import InactiveAccountsTable from './InactiveAccountsTable';

import './ManageInactiveAccounts.scss';
import {
  ACTION_SELECTION_CHOOSE_OPTION,
  ASSIGN_TO_A_CLASS_OPTION,
  ASSIGN_TO_A_DISTRICT_OPTION,
  ASSIGN_TO_A_SCHOOL_OPTION,
  ACCOUNT_DELETE_OPTION,
  UNENROLL,
  ITEMS_PER_PAGE,
  MIA_OPTIONS,
  USER_ORG_USER_TYPE_OPTIONS,
} from './constants';

class ManageInactiveAccounts extends React.Component {
  constructor(props) {
    super(props);
    this.isLoadingNewCohort = true;
    this.state = {
      actionSelection: ACTION_SELECTION_CHOOSE_OPTION,
      allSelected: false,
      checkedIds: [],
      // the page starts out with a 'Student' selection in the cohort selection dropdown
      cohortSelection: COHORT_TYPE.Student,
      currentPage: 1,
    };
  }

  // get the inactive students on initial page load
  componentDidMount = () => {
    const actionPayload = {
      // (the omitted params have default values)
      cohortType: COHORT_TYPE.Student,
      sortColumn: this.sortColumn,
    };
    this.props.getInactiveCohortMembersRequest(actionPayload);
  };

  componentWillReceiveProps = nextProps => {
    if (this.props.rowData !== nextProps.rowData && nextProps.isDataLoading) {
      this.toggleAllCheckboxes(false);
      this.isLoadingNewPageOrSort = true;
    }
  };

  componentWillUpdate = nextProps => {
    if (this.props.isDataLoading && !nextProps.isDataLoading) {
      this.isLoadingNewCohort = false;
      this.isLoadingNewPageOrSort = false;
    }
  };

  getActionForCohort = () => {
    let action;
    switch (this.state.cohortSelection) {
      case COHORT_TYPE.Student:
        action = ASSIGN_TO_A_CLASS_OPTION.toLowerCase();
        break;
      case COHORT_TYPE.School:
        action = ASSIGN_TO_A_DISTRICT_OPTION.toLowerCase();
        break;
      case COHORT_TYPE.Teacher:
        action = ASSIGN_TO_A_CLASS_OPTION.toLowerCase();
        break;
      case COHORT_TYPE.Class:
        action = ASSIGN_TO_A_SCHOOL_OPTION.toLowerCase();
        break;
      default:
        action = ASSIGN_TO_A_CLASS_OPTION.toLowerCase();
        break;
    }
    return action;
  };

  getSearchOptsForDelete = () => {
    const cohortType = this.state.cohortSelection;

    const currentPage = this.state.currentPage;
    const paginate = true;
    const isSortedAscending = true;
    const sortColumn = this.miaTableColumnIndex[cohortType].defaultSortColumn;

    const searchOpts = {
      cohortType,
      sortColumn,
      paginate,
      cur_page: currentPage,
      ipp: ITEMS_PER_PAGE,
      sort_ascending: isSortedAscending,
    };

    return searchOpts;
  };

  getCohortInfo = row => {
    let cohortInfo;
    switch (this.state.cohortSelection) {
      case COHORT_TYPE.Student:
        cohortInfo = {
          // eslint-disable-next-line no-underscore-dangle
          id: row.original._id,
          userName: row.original.userName,
          firstName: row.original.first_name,
          lastName: row.original.last_name,
          grade: row.original.grade,
          name: row.original.name,
        };
        break;
      default:
        cohortInfo = {};
        break;
    }
    return cohortInfo;
  };

  miaTableColumnIndex = selectMiaOptionColumns();
  sortColumn = this.miaTableColumnIndex[COHORT_TYPE.Student].defaultSortColumn;
  isSortedAscending = true;
  // in the UI, we distinguish slightly between loading data for a cohort, and loading
  // data for sorting:  The sorting reload doesn't erase the underlying data while it's
  // in progress (because no columns are changing); The cohort reload DOES erase the data
  // (because the columns are changing).  The only reason we do this is because it's
  // slightly more user-friendly.. that's it.
  isLoadingNewCohort = false;
  isLoadingNewPageOrSort = false;

  handleChangeCohortType = ev => {
    const cohortType = ev.target.value;
    const sortColumn = this.miaTableColumnIndex[cohortType].defaultSortColumn;
    const actionPayload = {
      // (the omitted params have default values)
      cohortType,
      sortColumn,
    };
    this.props.getInactiveCohortMembersRequest(actionPayload);
    this.isLoadingNewCohort = true;
    this.sortColumn = sortColumn;
    this.toggleAllCheckboxes(false);
    this.setState({ cohortSelection: cohortType, currentPage: 1 });
  };

  handleChangeActionType = ev => {
    this.setState({ actionSelection: ev.target.value });
  };

  handleNewSort = tableState => {
    if (tableState.sorted.length !== 0) {
      const sortDescriptor = tableState.sorted[0];
      const shouldSortAscending = !sortDescriptor.desc;
      const cohortType = this.state.cohortSelection;
      const sortColumn = this.miaTableColumnIndex[cohortType][sortDescriptor.id].queryParam;
      const actionPayload = {
        // (the omitted params have default values)
        cohortType,
        shouldSortAscending,
        sortColumn,
      };
      this.isLoadingNewPageOrSort = true;
      this.sortColumn = sortColumn;
      this.isSortedAscending = shouldSortAscending;
      this.setState({ currentPage: 1 });
      this.props.getInactiveCohortMembersRequest(actionPayload);
    }
  };

  handlePageChange = newPageNumber => {
    const cohortType = this.state.cohortSelection;
    const actionPayload = {
      // (the omitted params have default values)
      cohortType,
      currentPage: newPageNumber - 1,
      shouldSortAscending: this.isSortedAscending,
      sortColumn: this.sortColumn,
    };
    this.props.getInactiveCohortMembersRequest(actionPayload);
    this.isLoadingNewPageOrSort = true;
    this.setState({ currentPage: newPageNumber });
    this.toggleAllCheckboxes(false);
  };

  handleRowCheckboxOnChange = (isChecked, id) => {
    const { checkedIds } = this.state;
    this.setState({
      checkedIds: isChecked ? checkedIds.concat(id) : checkedIds.filter(elem => elem !== id),
    });
    if (!isChecked) {
      this.setState({ allSelected: false });
    }
  };

  handleEdit = row => {
    let data = {};
    let checkedCohorts;
    let cohortInfo;

    if (row) {
      // eslint-disable-next-line no-underscore-dangle
      checkedCohorts = [[row.original._id]];
      cohortInfo = this.getCohortInfo(row);
    } else {
      checkedCohorts = this.state.checkedIds.map(id => [id]);
    }

    const actionToPerform = row
      ? this.getActionForCohort()
      : this.state.actionSelection.toLowerCase();
    if (checkedCohorts.length === 0) {
      this.props.showModal(ModalConstants.NO_ITEMS_SELECTED_MODAL, {
        type: this.state.cohortSelection.toLowerCase(),
      });
      return;
    }
    switch (actionToPerform) {
      case ACCOUNT_DELETE_OPTION.toLowerCase(): {
        const searchOpts = this.getSearchOptsForDelete();
        data = {
          searchOpts,
          cohortsToDelete: checkedCohorts,
          miaDelete: true,
        };
        this.props.showAccountDeleteModal(data);
        break;
      }
      case ASSIGN_TO_A_CLASS_OPTION.toLowerCase(): {
        if (this.state.cohortSelection === COHORT_TYPE.Teacher && row) {
          // eslint-disable-next-line no-underscore-dangle
          const editTeacherId = row.original._id;
          const searchOpts = this.getSearchOptsForDelete();
          data = {
            searchOpts,
            editMode: true,
            editTeacherId,
          };
          this.props.showModal(ModalConstants.TEACHER_FORM_MODAL, data);
        } else {
          const searchOpts = this.getSearchOptsForDelete();
          data = {
            searchOpts,
            cohortInfo,
            cohortsToAssign: checkedCohorts,
            cohortTypeLabel: this.state.cohortSelection,
            isMIA: true,
          };
          this.props.showSearchClassAssignModal(data);
        }
        break;
      }
      case ASSIGN_TO_A_DISTRICT_OPTION.toLowerCase(): {
        if (row) {
          // eslint-disable-next-line no-underscore-dangle
          const editSchoolId = row.original._id;
          const searchOpts = this.getSearchOptsForDelete();
          data = {
            searchOpts,
            edit: true,
            editSchoolId,
          };
          this.props.showModal(ModalConstants.SCHOOL_FORM_MODAL, data);
        } else {
          const searchOpts = this.getSearchOptsForDelete();
          data = {
            searchOpts,
            cohortsToReactivate: checkedCohorts,
            cohortTypeLabel: this.state.cohortSelection,
          };
          this.props.showReactivateSchoolModal(data);
        }
        break;
      }
      case ASSIGN_TO_A_SCHOOL_OPTION.toLowerCase(): {
        const searchOpts = this.getSearchOptsForDelete();
        if (row) {
          data = {
            searchOpts,
            cohortsToReactivate: checkedCohorts,
            cohortTypeLabel: this.state.cohortSelection,
            // eslint-disable-next-line no-underscore-dangle
            editClassId: row.original._id,
          };
        } else {
          data = {
            searchOpts,
            cohortsToReactivate: checkedCohorts,
            cohortTypeLabel: this.state.cohortSelection,
          };
        }
        if (row && this.props.userType === USER_TYPE.Teacher) {
          data = {
            edit: true,
            // eslint-disable-next-line no-underscore-dangle
            editClassId: row.original._id,
            searchOpts,
          };
          this.props.showClassFormModal(data);
        } else {
          this.props.showReactivateClassModal(data);
        }
        break;
      }
      case UNENROLL.toLowerCase(): {
        const searchOpts = this.getSearchOptsForDelete();
        data = {
          searchOpts,
          cohortsToUnenroll: checkedCohorts,
          cohortTypeLabel: this.state.cohortSelection,
          isUnenroll: true,
        };
        this.props.showAccountDeleteModal(data);
        break;
      }

      default:
        break;
    }
  };

  // distill tech administrators to just 'Administrator'
  basicUserType = isUserTypeAdminOrTech(this.props.userType)
    ? USER_TYPE.Administrator
    : USER_TYPE.Teacher;

  performAction = () => {
    this.handleEdit();
  };

  toggleAllCheckboxes = isChecked => {
    this.setState({
      allSelected: isChecked,
      // eslint-disable-next-line no-underscore-dangle
      checkedIds: isChecked ? this.props.rowData.map(row => row._id) : [],
    });
  };

  renderCohortTypeOptions = () => {
    const options = USER_ORG_USER_TYPE_OPTIONS[this.props.userOrg][this.basicUserType];
    return options.map(option => (
      <option key={option} value={option}>
        {option}
      </option>
    ));
  };

  renderActionTypeOptions = () => {
    const actionTypeOptions = new Array(
      (
        <option key={ACTION_SELECTION_CHOOSE_OPTION} value={ACTION_SELECTION_CHOOSE_OPTION}>
          - Select an Option -
        </option>
      )
    );
    const cohortActionTypes = MIA_OPTIONS[this.state.cohortSelection].Actions.map(action => (
      <option key={action.value} value={action.value}>
        {action.label}
      </option>
    ));
    actionTypeOptions.push(...cohortActionTypes);
    return actionTypeOptions;
  };

  render = () => {
    const { actionSelection, allSelected, checkedIds, cohortSelection, currentPage } = this.state;

    const { isDataLoading, paginationData: immPaginationData, rowData } = this.props;
    const paginatorItemClass = isDataLoading ? 'disabled' : '';
    const totalItemCount = immPaginationData.itemCount;
    const startItemNumber = ITEMS_PER_PAGE * (currentPage - 1) + 1;
    let endItemNumber = ITEMS_PER_PAGE * currentPage;
    if (endItemNumber > totalItemCount) {
      endItemNumber = totalItemCount;
    }
    return (
      <div className="mia-content-panel">
        <h4 className="mia-content-panel__heading">
          Manage Inactive Accounts: {cohortSelection.toUpperCase()}
        </h4>
        <div className="mia-content-panel__intro">
          Use this screen to view, assign, or delete accounts not in your SmartBar
        </div>
        <div className="mia-content-panel__cohort-selection">
          <select
            className="mia-content-panel__dropdown"
            disabled={isDataLoading}
            value={cohortSelection}
            onChange={this.handleChangeCohortType}
          >
            {this.renderCohortTypeOptions()}
          </select>
        </div>
        <InactiveAccountsTable
          allSelected={allSelected}
          checkedIds={checkedIds}
          cohortSelection={cohortSelection}
          handleFetchData={this.handleNewSort}
          handleRowCheckboxOnChange={this.handleRowCheckboxOnChange}
          isLoadingNewCohort={this.isLoadingNewCohort}
          isLoadingNewPageOrSort={this.isLoadingNewPageOrSort}
          rowData={rowData}
          toggleAllCheckboxes={this.toggleAllCheckboxes}
          showSearchClassAssignModal={this.props.showSearchClassAssignModal}
          onEdit={this.handleEdit}
        />
        <div>
          <div className="mia-content-panel__footer">
            <select
              className="mia-content-panel__dropdown"
              disabled={isDataLoading}
              onChange={this.handleChangeActionType}
              value={actionSelection}
            >
              {this.renderActionTypeOptions()}
            </select>
            <SAMButton disabled={isDataLoading} id="goButton" onClickHandler={this.performAction}>
              Go
            </SAMButton>
          </div>
          <div className="mia-content-panel__paginator">
            {totalItemCount >= 0 && (
              <div className="mia-content-panel__item-accumulator">
                {`Items ${startItemNumber} through ${endItemNumber} of ${totalItemCount}`}
              </div>
            )}
            <Pagination
              activePage={currentPage}
              firstPageText="first"
              // while data is loading, we add a 'disabled' itemClass to the page buttons
              itemClass={paginatorItemClass}
              itemsCountPerPage={ITEMS_PER_PAGE}
              lastPageText="last"
              nextPageText="next"
              onChange={this.handlePageChange}
              pageRangeDisplayed={7}
              prevPageText="prev"
              totalItemsCount={totalItemCount}
            />
          </div>
        </div>
      </div>
    );
  };
}

ManageInactiveAccounts.defaultProps = {
  isDataLoading: false,
  paginationData: {
    itemCount: 0,
  },
  rowData: [],
};

ManageInactiveAccounts.propTypes = {
  getInactiveCohortMembersRequest: PropTypes.func.isRequired,
  isDataLoading: PropTypes.bool.isRequired,
  paginationData: PropTypes.object.isRequired,
  rowData: PropTypes.array.isRequired,
  userOrg: PropTypes.string.isRequired,
  userType: PropTypes.string.isRequired,
  showAccountDeleteModal: PropTypes.func,
  showModal: PropTypes.func,
  showSearchClassAssignModal: PropTypes.func,
  showReactivateSchoolModal: PropTypes.func,
  showReactivateClassModal: PropTypes.func,
  showClassFormModal: PropTypes.func,
};

export default ManageInactiveAccounts;
