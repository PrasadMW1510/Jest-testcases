/**
 *
 * ProfilePageContainer
 *
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { isUserTypeAdminOrTech } from 'utils/utilities';
import ManageRoster from 'components/ManageRoster';
import ProfilePage from 'components/ProfilePage';
import { COHORT_TYPE, USER_TYPE, USER_ORG } from 'containers/App/constants';
import {
  makeSelectLoginUserOrg,
  makeSelectProfileData,
  makeSelectProfileUserType,
} from 'containers/App/selectors';
import {
  showClassFormModal,
  showDeactivateUserModal,
  showDeactivateGroupModal,
  showModal,
  showStudentFormModal,
  showTeacherFormModal,
} from 'containers/ModalController/actions';
import {
  gradeRedirection,
  gradeSelection,
  classRedirectionInGroup,
  teacherRedirection,
} from 'containers/SmartBarContainer/actions';
import {
  makeSelectSchoolId,
  makeSelectSmartBarContainer,
} from 'containers/SmartBarContainer/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  profilePageClassRequest,
  profilePageForDistrictAdminRequest,
  profilePageForSchoolAdminRequest,
  profilePageGradeRequest,
  profilePageGroupRequest,
  profilePageRequest,
  profilePageSchoolRequest,
  profilePageStudentRequest,
  profilePageTeacherRequest,
} from './actions';
import reducer from './reducer';
import makeSelectProfilePageData from './selectors';
import saga from './saga';

export class ProfilePageContainer extends Component {
  componentDidMount() {
    const smartBarSelection = this.props.smartBarSelections;
    const selectedCohType = smartBarSelection.getIn(['selectedCohType']);

    switch (selectedCohType) {
      case COHORT_TYPE.Class:
        this.props.profilePageClassRequest(smartBarSelection.getIn(['activeClassId']));
        break;
      case COHORT_TYPE.Grade:
        this.props.profilePageGradeRequest(smartBarSelection.getIn(['activeGradeId']));
        break;
      case COHORT_TYPE.Group:
        this.props.profilePageGroupRequest(smartBarSelection.getIn(['activeGroupId']));
        break;
      case COHORT_TYPE.School:
        this.props.profilePageSchoolRequest(smartBarSelection.getIn(['activeSchoolId']));
        break;
      case COHORT_TYPE.Student:
        this.props.profilePageStudentRequest(smartBarSelection.getIn(['activeStudentId']));
        break;
      case COHORT_TYPE.Teacher:
        this.props.profilePageTeacherRequest(smartBarSelection.getIn(['activeTeacherId']));
        break;
      default:
        this.props.profilePageRequest();
        break;
    }

    this.props.profilePageForDistrictAdminRequest();
    this.props.profilePageForSchoolAdminRequest();
  }

  getDefaultProfile = () => {
    if (this.props.profileUserType === USER_TYPE.Teacher) {
      return this.getProfile();
    } else if (
      this.props.profileOrgType === USER_ORG.District &&
      isUserTypeAdminOrTech(this.props.profileUserType)
    ) {
      return this.getProfilePage().profileDetailsDistAdmin;
    }
    return this.getProfilePage().profileDetailsSchoolAdmin;
  };

  getProfile = () => this.props.profile.toJS();

  getProfilePage = () => this.props.profilePage.toJS();

  render() {
    const {
      profilePageClassRequest, // eslint-disable-line
      smartBarSelections,
      profileUserType,
      profileOrgType,
      gradeSelection, // eslint-disable-line
      teacherRedirection, // eslint-disable-line
      gradeRedirection, // eslint-disable-line
        classRedirectionInGroup, // eslint-disable-line
    } = this.props;
    return (
      <div className="profile-page__content">
        <ProfilePage
          profile={this.getDefaultProfile()}
          profilePage={this.getProfilePage()}
          profileUserType={profileUserType}
          profileOrgType={profileOrgType}
          profilePageClassRequest={profilePageClassRequest}
          smartBarSelections={smartBarSelections}
          gradeSelection={gradeSelection}
          teacherRedirection={teacherRedirection}
          gradeRedirection={gradeRedirection}
          classRedirectionInGroup={classRedirectionInGroup}
        />
        <ManageRoster {...this.props} profile={this.getProfile()} />
      </div>
    );
  }
}

/* eslint-disable react/no-unused-prop-types */
ProfilePageContainer.propTypes = {
  profile: PropTypes.any.isRequired,
  profilePage: PropTypes.object.isRequired,
  showClassFormModal: PropTypes.func.isRequired,
  showDeactivateUserModal: PropTypes.func.isRequired,
  showDeactivateGroupModal: PropTypes.func,
  showModal: PropTypes.func.isRequired,
  showStudentFormModal: PropTypes.func.isRequired,
  showTeacherFormModal: PropTypes.func.isRequired,
  smartBarSelections: PropTypes.object.isRequired,
  gradeRedirection: PropTypes.func,
  gradeSelection: PropTypes.func,
  classRedirectionInGroup: PropTypes.func,
  profilePageClassRequest: PropTypes.any,
  profilePageForDistrictAdminRequest: PropTypes.any,
  profilePageForSchoolAdminRequest: PropTypes.any,
  profilePageGradeRequest: PropTypes.any,
  profilePageGroupRequest: PropTypes.any,
  profilePageRequest: PropTypes.any,
  profilePageSchoolRequest: PropTypes.any,
  profilePageStudentRequest: PropTypes.any,
  profilePageTeacherRequest: PropTypes.any,
  profileOrgType: PropTypes.string,
  profileUserType: PropTypes.string,
  teacherRedirection: PropTypes.func,
};
/* eslint-enable react/no-unused-prop-types */

const mapStateToProps = createStructuredSelector({
  activeSmartBarSchoolId: makeSelectSchoolId(),
  profile: makeSelectProfileData(),
  profilePage: makeSelectProfilePageData(),
  profileOrgType: makeSelectLoginUserOrg(),
  profileUserType: makeSelectProfileUserType(),
  smartBarSelections: makeSelectSmartBarContainer(),
});

const withConnect = connect(mapStateToProps, {
  gradeRedirection,
  gradeSelection,
  classRedirectionInGroup,
  profilePageClassRequest,
  profilePageForDistrictAdminRequest,
  profilePageForSchoolAdminRequest,
  profilePageGradeRequest,
  profilePageGroupRequest,
  profilePageRequest,
  profilePageSchoolRequest,
  profilePageStudentRequest,
  profilePageTeacherRequest,
  showClassFormModal,
  showDeactivateUserModal,
  showDeactivateGroupModal,
  showModal,
  showStudentFormModal,
  showTeacherFormModal,
  teacherRedirection,
});

const withSaga = injectSaga({ key: 'profilePage', saga });
const withReducer = injectReducer({ key: 'profilePage', reducer });

export default compose(withReducer, withSaga, withConnect)(ProfilePageContainer);
