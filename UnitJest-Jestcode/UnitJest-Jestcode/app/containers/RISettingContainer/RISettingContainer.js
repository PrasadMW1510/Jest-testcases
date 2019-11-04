/**
 *
 * RISettingContainer
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import RISetting from 'components/RISetting';
import {
  makeSelectEffectiveCohortObject,
  makeSelectSelectedCohortName,
} from 'containers/SmartBarContainer/selectors';
import { makeSelectProgramDisplayName } from 'containers/RosterPage/selectors';
import { makeSelectProfileUserType } from 'containers/App/selectors';
import { showModal } from 'containers/ModalController/actions';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { RICancel, RIProgramSettingsRequest, RISaveRequest } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeProgramSetting } from './selectors';
import { transformLexile } from './transformers';

export class RISettingContainer extends React.Component {
  componentDidMount() {
    this.props.RIProgramSettingsRequest();
  }

  handleSave = (activeTabId, programsSettingsToSave) => {
    this.props.RISaveRequest(activeTabId, programsSettingsToSave);
  };

  render() {
    // NOTE: 'showModal' cannot be destructured here as it conflicts with the import-level scope (eslint)
    const {
      enrollmentCount,
      immProgramSettingData,
      loggedInUserType,
      programDisplayName,
      selectedCohortName,
      selectedCohortTypeAndId: { cohortType },
    } = this.props;
    let cohortName = selectedCohortName;
    if (!cohortName) {
      cohortName = `this ${cohortType.toLowerCase()}`;
    }
    return (
      <div>
        <RISetting
          enrollmentCount={enrollmentCount}
          handleCancel={this.props.RICancel}
          handleSave={this.handleSave}
          immSettingData={immProgramSettingData}
          loggedInUserType={loggedInUserType}
          programName={programDisplayName}
          selectedCohortName={cohortName}
          selectedCohortType={cohortType}
          showModal={this.props.showModal}
          transformLexile={transformLexile}
        />
      </div>
    );
  }
}

RISettingContainer.defaultProps = {
  enrollmentCount: 0,
  selectedCohortName: '',
};

RISettingContainer.propTypes = {
  enrollmentCount: PropTypes.number,
  immProgramSettingData: PropTypes.object.isRequired,
  loggedInUserType: PropTypes.string.isRequired,
  programDisplayName: PropTypes.string.isRequired,
  RICancel: PropTypes.func.isRequired,
  RIProgramSettingsRequest: PropTypes.any.isRequired,
  RISaveRequest: PropTypes.func.isRequired,
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
  RICancel,
  RIProgramSettingsRequest,
  RISaveRequest,
  showModal,
});

const withReducer = injectReducer({ key: 'riProgramSettingData', reducer });
const withSaga = injectSaga({ key: 'riProgramSettingData', saga });

export default compose(withRouter, withReducer, withSaga, withConnect)(RISettingContainer);
