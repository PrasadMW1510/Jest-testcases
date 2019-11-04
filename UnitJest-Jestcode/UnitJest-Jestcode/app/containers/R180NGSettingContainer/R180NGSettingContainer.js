/**
 *
 * R180NgsettingContainer
 *
 */

import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import R180NGSetting from 'components/R180NGSetting';
import { makeSelectLoginData, makeSelectUserOrgUserType } from 'containers/App/selectors';
import { showProgramSettingSetStudentLevelModal } from 'containers/ModalController/actions';
import {
  makeSelectSmartBarContainer,
  selectSmartBarContainerDomain,
} from 'containers/SmartBarContainer/selectors';
import makeSelectRosterPage from 'containers/RosterPage/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  R180NGProgramSettingsRequest,
  R180NGProgramSettingsEnrollmentRequest,
  R180NGSaveRequest,
} from './actions';
import { R180NG_ENROLLMENT_PROGRAMS } from './constants';
import reducer from './reducer';
import saga from './saga';
import { makeProgramSetting, makeEnrollmentSetting, selectProgramSetting } from './selectors';

export class R180NGSettingContainer extends React.Component {
  componentDidMount() {
    this.props.R180NGProgramSettingsRequest();
    this.props.R180NGProgramSettingsEnrollmentRequest();
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.programSettingData.get('programSetting') !==
        nextProps.programSettingData.get('programSetting') ||
      this.props.programSettingData.get('programEnrollmentSetting') !==
        nextProps.programSettingData.get('programEnrollmentSetting')
    );
  }

  getCohortType() {
    return this.props.smartBarSelections.getIn(['selectedCohType']);
  }

  getUserType() {
    return this.props.userType;
  }

  getEnroll() {
    return this.props.programEnrollmentCount && this.props.programEnrollmentCount.toJS();
  }

  getEnrollmentCount() {
    let items = this.getEnroll();
    items = items.programEnrollmentSetting;
    if (typeof items === 'undefined' || items.length === 0 || items === 'admin') {
      return 0;
    }

    const programEnrolledCount = items.filter(item =>
      Object.keys(item).some(
        k =>
          item[k] != null &&
          (item[k].toString().includes(R180NG_ENROLLMENT_PROGRAMS[0]) ||
            item[k].toString().includes(R180NG_ENROLLMENT_PROGRAMS[1]) ||
            item[k].toString().includes(R180NG_ENROLLMENT_PROGRAMS[2]))
      )
    );
    const total = programEnrolledCount.reduce(
      (prevVal, elem) => prevVal + Number(elem.students[0].total[0]),
      0
    );
    return total;
  }

  handleSaveClick = programsSettingChanged => {
    this.props.R180NGSaveRequest(programsSettingChanged);
  };

  handleSetStudentLevelClick = e => {
    this.props.showProgramSettingSetStudentLevelModal(e);
  };

  render() {
    return (
      <div>
        <R180NGSetting
          enrollmentData={this.props.enrollmentCount}
          programName={this.props.rosterPage.selectedProgram}
          programSettingData={this.props.programSettingData && this.props.programSettingData.toJS()}
          onStudentLevelClick={this.handleSetStudentLevelClick}
          handleSaveClick={this.handleSaveClick}
          smartBarSelections={this.getCohortType()}
          userType={this.getUserType()}
          isLoading={this.props.programSettingData.get('loading')}
        />
      </div>
    );
  }
}
R180NGSettingContainer.defaultProps = {
  enrollmentCount: 0,
  programSettingData: fromJS({
    loading: false,
    programSetting: {},
  }),
};

R180NGSettingContainer.propTypes = {
  showProgramSettingSetStudentLevelModal: PropTypes.func.isRequired,
  rosterPage: PropTypes.any,
  R180NGProgramSettingsRequest: PropTypes.any.isRequired,
  R180NGProgramSettingsEnrollmentRequest: PropTypes.any.isRequired,
  programSettingData: PropTypes.object.isRequired,
  programEnrollmentCount: PropTypes.any,
  R180NGSaveRequest: PropTypes.func,
  smartBarSelections: PropTypes.any,
  enrollmentCount: PropTypes.number,
  userType: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  loginData: makeSelectLoginData(),
  rosterPage: makeSelectRosterPage(),
  userType: makeSelectUserOrgUserType(),
  programSettingData: makeProgramSetting(),
  programEnrollmentCount: makeEnrollmentSetting(),
  smartBarSelections: makeSelectSmartBarContainer(),
});

const withConnect = connect(mapStateToProps, {
  selectProgramSetting,
  R180NGProgramSettingsRequest,
  R180NGSaveRequest,
  R180NGProgramSettingsEnrollmentRequest,
  showProgramSettingSetStudentLevelModal,
  selectSmartBarContainerDomain,
  makeSelectUserOrgUserType,
});

const withReducer = injectReducer({ key: 'r180NGProgramSettingData', reducer });
const withSaga = injectSaga({ key: 'r180NGProgramSettingData', saga });

export default compose(withRouter, withReducer, withSaga, withConnect)(R180NGSettingContainer);
