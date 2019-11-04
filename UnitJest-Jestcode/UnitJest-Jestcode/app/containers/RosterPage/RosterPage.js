/**
 *
 * RosterPage
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import ContentPanel from 'components/ContentPanel';

import ManageStudentsTeachers from 'components/ManageStudentsTeachers';
import { TAB } from 'components/ManageStudentsTeachers/constants';
import { USER_TYPE, USER_ORG } from 'containers/App/constants';
import {
  isGlobalLoading,
  makeSelectProfileUserType,
  makeSelectLoginUserOrg,
  makeSelectLoginData,
} from 'containers/App/selectors';
import AdvancedSettingsContainer from 'containers/AdvancedSettingsContainer';
import ManageAdminAccountsContainer from 'containers/ManageAdminAccountsContainer';
import { isManageAdminAccountsLoading } from 'containers/ManageAdminAccountsContainer/selectors';
import ManageInactiveAccountsContainer from 'containers/ManageInactiveAccountsContainer';
import ManageSmaContainer from 'containers/ManageSmaContainer';
import ProfilePageContainer from 'containers/ProfilePageContainer';
import ProgramAvailableRosterContainer from 'containers/ProgramAvailableRosterContainer';
import ProgramCertificateContainer from 'containers/ProgramCertificateContainer/Loadable';
import ProgramGradingContainer from 'containers/ProgramGradingContainer/Loadable';
import ProgramSettingsContainer from 'containers/ProgramSettingsContainer';
import { isProgramSettingsLoading } from 'containers/ProgramSettingsContainer/selectors';
import UsageSummaryContainer from 'containers/UsageSummaryContainer';
import { isUsageSummaryLoading } from 'containers/UsageSummaryContainer/selectors';
import * as TeacherAccessTableSelector from 'containers/TeacherAccessTableContainer/selectors';
import * as StudentEnrollmentTableSelector from 'containers/StudentEnrollmentTableContainer/selectors';
import UserTitleText from 'containers/UserTitleText';
import { isUserTypeAdminOrTech } from 'utils/utilities';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectSmartBarContainer,
  makeSelectCohortType,
} from 'containers/SmartBarContainer/selectors';

import { ROUTE_PATHS } from './constants';
import reducer from './reducer';
import saga from './saga';
import './RosterPage.scss';

export class RosterPage extends React.Component {
  /**
   * Used for if we want to show the Tab level loading.
   * Add to this function using '||'
   */
  isLoading = () => this.props.isGlobalLoading || this.isPagesLoading();

  /**
   * This will only show the loading based on the components of the current page.
   * If there is another component on the page, add it to the return using '||'.
   */
  isPagesLoading = () => {
    switch (this.props.location.pathname) {
      case ROUTE_PATHS.roster:
        return this.props.isUsageSummaryLoading;
      case ROUTE_PATHS.manageAdminAccounts:
        return this.props.isManageAdminAccountsLoading;
      case ROUTE_PATHS.programSettings:
        return this.props.isProgramSettingsLoading;
      case ROUTE_PATHS.manageStudentEnrollment:
        return (
          this.props.isStudentEnrollmentLoading ||
          this.props.isTeacherAccessLoading ||
          this.props.isTeacherAccessAppLoading
        );
      case ROUTE_PATHS.manageTeacherAccess:
        return (
          this.props.isStudentEnrollmentLoading ||
          this.props.isTeacherAccessLoading ||
          this.props.isTeacherAccessAppLoading
        );
      default:
        return false;
    }
  };

  renderRoster = () => (
    <div className="roster-content-panel">
      <ProfilePageContainer />
      <UsageSummaryContainer />
      <table className="roster-content-panel__bottom-table">
        <tbody>
          <tr>
            <td className="program-available__title-cell">Programs</td>
            {this.props.selectedCohortType === '' && (
              <td className="advanced-settings__title-cell">Advanced Settings</td>
            )}
          </tr>
          <tr>
            <td className="roster-content-panel__programs-available-cell">
              <ProgramAvailableRosterContainer />
            </td>
            {this.props.selectedCohortType === '' && (
              <td className="roster-content-panel__advanced-settings-cell">
                <AdvancedSettingsContainer profileUserType={this.props.profileUserType} />
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );

  render() {
    return (
      <span>
        <div className="roster-content-heading">
          <UserTitleText />
        </div>
        <ContentPanel loading={this.isLoading()}>
          <Route path={ROUTE_PATHS.programSettings} component={ProgramSettingsContainer} />
          <Route path={ROUTE_PATHS.programGrading} component={ProgramGradingContainer} />
          <Route path={ROUTE_PATHS.programCertificate} component={ProgramCertificateContainer} />
          <Route
            path={ROUTE_PATHS.manageStudentEnrollment}
            render={() => (
              <ManageStudentsTeachers
                loginData={this.props.loginData}
                smartBarSelections={this.props.smartBarSelections}
                tab={TAB.StudentEnrollment}
              />
            )}
          />
          <Route
            path={ROUTE_PATHS.manageStudentLicenses}
            render={() => (
              <ManageStudentsTeachers
                loginData={this.props.loginData}
                smartBarSelections={this.props.smartBarSelections}
                tab={TAB.StudentLicensing}
              />
            )}
          />
          <Route
            path={ROUTE_PATHS.manageTeacherLicenses}
            render={() => (
              <ManageStudentsTeachers
                loginData={this.props.loginData}
                smartBarSelections={this.props.smartBarSelections}
                tab={TAB.TeacherLicensing}
              />
            )}
          />
          <Route
            path={ROUTE_PATHS.manageTeacherAccess}
            render={() => (
              <ManageStudentsTeachers
                loginData={this.props.loginData}
                smartBarSelections={this.props.smartBarSelections}
                tab={TAB.TeacherAccess}
              />
            )}
          />
          <Route
            path={ROUTE_PATHS.manageInactiveAccounts}
            component={ManageInactiveAccountsContainer}
          />
          {(this.props.profileUserType === USER_TYPE.Administrator ||
            this.props.profileUserType === USER_TYPE.Tech) && (
            <Route
              path={ROUTE_PATHS.manageAdminAccounts}
              component={ManageAdminAccountsContainer}
            />
          )}
          {this.props.profileOrgType === USER_ORG.District &&
            isUserTypeAdminOrTech(this.props.profileUserType) && (
              <Route path={ROUTE_PATHS.manageSMA} component={ManageSmaContainer} />
            )}
          <Route
            exact
            path={ROUTE_PATHS.roster}
            className="rosterRoute"
            render={this.renderRoster}
          />
        </ContentPanel>
      </span>
    );
  }
}

RosterPage.propTypes = {
  isGlobalLoading: PropTypes.bool.isRequired,
  isProgramSettingsLoading: PropTypes.bool.isRequired,
  isUsageSummaryLoading: PropTypes.bool.isRequired,
  isManageAdminAccountsLoading: PropTypes.bool.isRequired,
  isTeacherAccessLoading: PropTypes.bool,
  isStudentEnrollmentLoading: PropTypes.bool,
  isTeacherAccessAppLoading: PropTypes.bool,
  profileUserType: PropTypes.string,
  profileOrgType: PropTypes.string,
  location: PropTypes.object,
  loginData: PropTypes.object.isRequired,
  smartBarSelections: PropTypes.object.isRequired,
  selectedCohortType: PropTypes.string.isRequired,
};

const withReducer = injectReducer({ key: 'rosterPage', reducer });
const withSaga = injectSaga({ key: 'rosterPage', saga });

const mapStateToProps = createStructuredSelector({
  isGlobalLoading: isGlobalLoading(),
  loginData: makeSelectLoginData(),
  isProgramSettingsLoading: isProgramSettingsLoading(),
  isUsageSummaryLoading: isUsageSummaryLoading(),
  isManageAdminAccountsLoading: isManageAdminAccountsLoading(),
  profileUserType: makeSelectProfileUserType(),
  profileOrgType: makeSelectLoginUserOrg(),
  isTeacherAccessLoading: TeacherAccessTableSelector.makeSelectLoading(),
  isTeacherAccessAppLoading: TeacherAccessTableSelector.makeSelectAppLoading(),
  isStudentEnrollmentLoading: StudentEnrollmentTableSelector.makeSelectLoading(),
  smartBarSelections: makeSelectSmartBarContainer(),
  selectedCohortType: makeSelectCohortType(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(withReducer, withSaga, withConnect)(RosterPage);
