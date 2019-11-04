/**
 *
 * SearchModalContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import SearchModal from 'components/SearchModal/SearchModal';
import {
  hideModal,
  showWarningModal,
  showSearchClassAssignModal,
  showAccountDeleteModal,
} from 'containers/ModalController/actions';
import { openClassAssignModal } from 'containers/ClassAssignModalContainer/actions';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  getSearchMetaDataRequest,
  resetSearchMetaData,
  getSearchResultsRequest,
  resetForSearchByChange,
} from './actions';
import makeSelectSearchModalContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import { makeSelectLoginUserOrg, makeSelectProfileUserType } from '../App/selectors';

export class SearchModalContainer extends React.Component {
  componentDidMount() {
    this.props.getSearchMetaDataRequest();
  }

  getSearchContainer = () => this.props.searchModalContainer.toJS();

  appsMeta = [];
  classesMeta = [];
  gradesMeta = [];
  permissionsMeta = [];
  schoolsMeta = [];
  teachersMeta = [];

  /**
   * Component should not render until the async data has been returned from its Saga
   * this function checks the metaDataInitialized property from the redux state. That prop
   * is set at the successful completion of the Saga. Uses map.get for better performance.
   *
   * @returns {boolean}
   */
  isMetaDataInitialized = () => this.props.searchModalContainer.get('metaDataInitialized');

  parseMetaData = () => {
    const searchData = this.getSearchContainer();
    this.appsMeta = searchData.searchMeta.apps;
    this.classesMeta = searchData.searchMeta.classes;
    this.gradesMeta = searchData.searchMeta.grades;
    this.permissionsMeta = searchData.searchMeta.permissions;
    this.schoolsMeta = searchData.searchMeta.schools;
    this.teachersMeta = searchData.searchMeta.teachers;
  };

  handleClose = e => {
    e.preventDefault();
    this.props.resetSearchMetaData();
    this.props.hideModal();
  };
  handleSearch = opts => {
    this.props.getSearchResultsRequest(opts);
  };

  handleResetForSearchByChange = () => {
    this.props.resetForSearchByChange();
  };

  render() {
    if (!this.isMetaDataInitialized()) {
      return null;
    }
    this.parseMetaData();
    return (
      <SearchModal
        isOpen
        onClose={this.handleClose}
        onSearch={this.handleSearch}
        apps={this.appsMeta}
        classes={this.classesMeta}
        grades={this.gradesMeta}
        openClassAssignModal={this.props.openClassAssignModal}
        permissions={this.permissionsMeta}
        schools={this.schoolsMeta}
        teachers={this.teachersMeta}
        searchResults={this.getSearchContainer().searchResults}
        profileUserType={this.props.profileUserType}
        onResetForSearchByChange={this.handleResetForSearchByChange}
        loginUserOrg={this.props.loginUserOrg}
        showWarningModal={this.props.showWarningModal}
        showSearchClassAssignModal={this.props.showSearchClassAssignModal}
        showAccountDeleteModal={this.props.showAccountDeleteModal}
      />
    );
  }
}

SearchModalContainer.propTypes = {
  hideModal: PropTypes.func.isRequired,
  openClassAssignModal: PropTypes.func.isRequired,
  getSearchMetaDataRequest: PropTypes.func.isRequired,
  resetSearchMetaData: PropTypes.func.isRequired,
  searchModalContainer: PropTypes.object,
  getSearchResultsRequest: PropTypes.func.isRequired,
  profileUserType: PropTypes.string.isRequired,
  resetForSearchByChange: PropTypes.func.isRequired,
  loginUserOrg: PropTypes.string.isRequired,
  showWarningModal: PropTypes.func.isRequired,
  showSearchClassAssignModal: PropTypes.func.isRequired,
  showAccountDeleteModal: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  searchModalContainer: makeSelectSearchModalContainer(),
  profileUserType: makeSelectProfileUserType(),
  loginUserOrg: makeSelectLoginUserOrg(),
});

const withConnect = connect(mapStateToProps, {
  hideModal,
  getSearchMetaDataRequest,
  resetSearchMetaData,
  getSearchResultsRequest,
  resetForSearchByChange,
  openClassAssignModal,
  showWarningModal,
  showSearchClassAssignModal,
  showAccountDeleteModal,
});

const withReducer = injectReducer({ key: 'searchModalContainer', reducer });
const withSaga = injectSaga({ key: 'searchModalContainer', saga });

export default compose(withReducer, withSaga, withConnect)(SearchModalContainer);
