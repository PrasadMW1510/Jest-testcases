/**
 *
 * FMSettingContainer
 *
 */

import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import FMSettings from 'components/FMSettings';
import { makeSelectEffectiveCohortObject } from 'containers/SmartBarContainer/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { fmAdvancedSettingsSave, fmSettingsContainerRequest, fmSettingsSave } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectFMSettingContainer } from './selectors';

export class FMSettingContainer extends React.Component {
  componentDidMount() {
    this.props.fmSettingsContainerRequest();
  }

  handleSettingsSave = updatedSettings => {
    this.props.fmSettingsSave(updatedSettings);
  };

  handleAdvancedSettingsSave = updatedAdvancedSettings => {
    this.props.fmAdvancedSettingsSave(updatedAdvancedSettings);
  };

  render() {
    return (
      <FMSettings
        advancedSettings={this.props.fmSettingData.get('advancedSettings')}
        cohortObj={this.props.cohortObj}
        enrollmentCount={this.props.enrollmentCount}
        handleAdvancedSettingSave={this.handleAdvancedSettingsSave}
        handleSettingSave={this.handleSettingsSave}
        isLoading={this.props.fmSettingData.get('loading')}
        settings={this.props.fmSettingData.get('settings')}
      />
    );
  }
}

FMSettingContainer.defaultProps = {
  enrollmentCount: 0,
  fmSettingData: fromJS({
    loading: false,
    settings: {
      Defaults: [],
      Settings: [],
    },
    advancedSettings: {},
  }),
};

FMSettingContainer.propTypes = {
  cohortObj: PropTypes.object.isRequired,
  fmAdvancedSettingsSave: PropTypes.func.isRequired,
  fmSettingsContainerRequest: PropTypes.func.isRequired,
  fmSettingsSave: PropTypes.func.isRequired,
  enrollmentCount: PropTypes.number,
  fmSettingData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  cohortObj: makeSelectEffectiveCohortObject(),
  fmSettingData: makeSelectFMSettingContainer(),
});

const withConnect = connect(mapStateToProps, {
  fmAdvancedSettingsSave,
  fmSettingsContainerRequest,
  fmSettingsSave,
});

const withReducer = injectReducer({ key: 'fmSettingContainer', reducer });
const withSaga = injectSaga({ key: 'fmSettingContainer', saga });

export default compose(withReducer, withSaga, withConnect)(FMSettingContainer);
