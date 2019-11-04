/**
 *
 * FastMathGradingToolsContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import FMGradingTools from 'components/FMGradingTools';
import SettingsMessage from 'components/SettingsMessage';
import ProgramSettingsNavBar from 'components/ProgramSettingsNavBar';

import { COHORT_TYPE } from 'containers/App/constants';
import { makeSelectEffectiveCohortObject } from 'containers/SmartBarContainer/selectors';
import { makeSelectProfileUserType } from 'containers/App/selectors';

import { makeSelectFMStudentOperations } from './selectors';
import * as Actions from './actions';
import * as Constants from './constants';
import reducer from './reducer';
import saga from './saga';

export class FMGradingToolsContainer extends React.Component {
  componentDidMount = () => {
    this.props.FMStudentOperationRequest();
  };

  columns = [
    {
      Header: () => <span className="fs-worksheet__table-header">Students</span>,
      id: 'Students',
      accessor: 'Students',
      width: 310,
    },
    {
      Header: () => <span>Operation</span>,
      id: 'Operation',
      accessor: 'Operation',
      width: 150,
    },
    {
      Header: () => <span>Fast Facts</span>,
      id: 'FastFacts',
      accessor: 'FastFacts',
      width: 150,
    },
    {
      Header: () => <span>Focus Facts</span>,
      id: 'FocusFacts',
      accessor: 'FocusFacts',
      width: 150,
    },
  ];

  renderInvalidCohortTab = () => <SettingsMessage message1={Constants.INVALID_COHORT_MESSAGE} />;

  renderNoEnrollment = () => {
    const { selectedCohort } = this.props;
    switch (selectedCohort.cohortType) {
      case COHORT_TYPE.Teacher:
        return <SettingsMessage message1={Constants.ENROLLMENT_COUNT_ERROR_MESSAGE_TEACHER} />;
      case COHORT_TYPE.Class:
        return <SettingsMessage message1={Constants.ENROLLMENT_COUNT_ERROR_MESSAGE_CLASS} />;
      case COHORT_TYPE.Group:
        return <SettingsMessage message1={Constants.ENROLLMENT_COUNT_ERROR_MESSAGE_GROUP} />;
      case COHORT_TYPE.Student:
        return <SettingsMessage message1={Constants.ENROLLMENT_COUNT_ERROR_MESSAGE_STUDENT} />;
      default:
        return null;
    }
  };

  render() {
    const { studentOperations, selectedCohort, enrollmentCount, FMGeneratePdfReport } = this.props;
    if (
      selectedCohort.cohortType === COHORT_TYPE.District ||
      selectedCohort.cohortType === COHORT_TYPE.School ||
      selectedCohort.cohortType === COHORT_TYPE.Grade
    ) {
      const tabs = [
        {
          renderFunction: this.renderInvalidCohortTab,
          ...Constants.TAB_SETTINGS,
        },
      ];
      return (
        <div className="fs-grading-tools-invalid-cohort">
          <ProgramSettingsNavBar tabs={tabs} />
        </div>
      );
    }

    if (enrollmentCount === 0) {
      const tabs = [
        {
          renderFunction: this.renderNoEnrollment,
          ...Constants.TAB_SETTINGS,
        },
      ];
      return (
        <div className="fs-grading-tools-invalid-cohort">
          <ProgramSettingsNavBar tabs={tabs} />
        </div>
      );
    }

    return (
      <FMGradingTools
        FMGeneratePdfReport={FMGeneratePdfReport}
        studentOperations={studentOperations}
        columns={this.columns}
        selectedCohort={selectedCohort}
      />
    );
  }
}

FMGradingToolsContainer.propTypes = {
  enrollmentCount: PropTypes.number.isRequired,
  studentOperations: PropTypes.array.isRequired,
  selectedCohort: PropTypes.object.isRequired,
  FMStudentOperationRequest: PropTypes.func.isRequired,
  FMGeneratePdfReport: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loggedInUserType: makeSelectProfileUserType(),
  selectedCohort: makeSelectEffectiveCohortObject(),
  studentOperations: makeSelectFMStudentOperations(),
});

const withConnect = connect(mapStateToProps, {
  FMStudentOperationRequest: Actions.FMStudentOperationRequest,
  FMGeneratePdfReport: Actions.FMGeneratePdfReport,
});
const withReducer = injectReducer({ key: 'fmGradingTools', reducer });
const withSaga = injectSaga({ key: 'fmGradingTools', saga });

export default compose(withReducer, withSaga, withConnect)(FMGradingToolsContainer);
