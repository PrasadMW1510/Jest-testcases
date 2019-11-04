/**
 *
 * MISettingContainer
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import MISetting from 'components/MISetting';
import {
  makeSelectEffectiveCohortObject,
  makeSelectSelectedCohortName,
} from 'containers/SmartBarContainer/selectors';
import { makeSelectProgramDisplayName } from 'containers/RosterPage/selectors';
import { makeSelectProfileUserType } from 'containers/App/selectors';
import { showModal } from 'containers/ModalController/actions';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { MICancel, MIProgramSettingsRequest, MISaveRequest } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeProgramSetting } from './selectors';
import { transformScore } from './transformers';

export class MISettingContainer extends React.Component {
  componentDidMount() {
    this.props.MIProgramSettingsRequest();
  }

  handleSave = (activeTabId, programsSettingsToSave) => {
    this.props.MISaveRequest(activeTabId, programsSettingsToSave);
  };

  render() {
    // NOTE: 'showModal' cannot be destructured here as it conflicts with the import-level scope (eslint)
    const {
      enrollmentCount,
      immProgramSettingData,
      loggedInUserType,
      programDisplayName,
      selectedCohortName,
      selectedCohortTypeAndId,
    } = this.props;
    let cohortName = selectedCohortName;
    if (!cohortName) {
      cohortName = `this ${selectedCohortTypeAndId.cohortType.toLowerCase()}`;
    }
    return (
      <div>
        <MISetting
          enrollmentCount={enrollmentCount}
          handleCancel={this.props.MICancel}
          handleSave={this.handleSave}
          immSettingData={immProgramSettingData}
          loggedInUserType={loggedInUserType}
          programName={programDisplayName}
          selectedCohortName={cohortName}
          selectedCohortTypeAndId={selectedCohortTypeAndId}
          showModal={this.props.showModal}
          transformScore={transformScore}
        />
      </div>
    );
  }
}

MISettingContainer.defaultProps = {
  enrollmentCount: 0,
  selectedCohortName: '',
};

MISettingContainer.propTypes = {
  enrollmentCount: PropTypes.number,
  immProgramSettingData: PropTypes.object.isRequired,
  loggedInUserType: PropTypes.string.isRequired,
  programDisplayName: PropTypes.string.isRequired,
  MICancel: PropTypes.func.isRequired,
  MIProgramSettingsRequest: PropTypes.any.isRequired,
  MISaveRequest: PropTypes.func.isRequired,
  selectedCohortName: PropTypes.string.isRequired,
  selectedCohortTypeAndId: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  immProgramSettingData: makeProgramSetting(),
  loggedInUserType: makeSelectProfileUserType(),
  programDisplayName: makeSelectProgramDisplayName(),
  selectedCohortName: makeSelectSelectedCohortName(),
  selectedCohortTypeAndId: makeSelectEffectiveCohortObject(),
});

const withConnect = connect(mapStateToProps, {
  MICancel,
  MIProgramSettingsRequest,
  MISaveRequest,
  showModal,
});

const withReducer = injectReducer({ key: 'miProgramSettingData', reducer });
const withSaga = injectSaga({ key: 'miProgramSettingData', saga });

export default compose(withRouter, withReducer, withSaga, withConnect)(MISettingContainer);
