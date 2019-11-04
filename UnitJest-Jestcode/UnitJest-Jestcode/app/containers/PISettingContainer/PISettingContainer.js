/**
 *
 * PISettingContainer
 *
 */

import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PISettings from 'components/PISettings';
import { makeSelectEffectiveCohortObject } from 'containers/SmartBarContainer/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectPISettingContainer } from './selectors';
import { piSettingsContainerRequest, piSettingsSave } from './actions';
import reducer from './reducer';
import saga from './saga';

export class PISettingContainer extends React.Component {
  componentDidMount() {
    this.props.piSettingsContainerRequest();
  }

  handleSave = updatedSettings => {
    this.props.piSettingsSave(updatedSettings);
  };

  render() {
    return (
      <PISettings
        cohortObj={this.props.cohortObj}
        enrollmentCount={this.props.enrollmentCount}
        handleSave={this.handleSave}
        isLoading={this.props.piSettingData.get('loading')}
        settings={this.props.piSettingData.get('settings')}
      />
    );
  }
}

PISettingContainer.defaultProps = {
  enrollmentCount: 0,
  piSettingData: fromJS({
    loading: false,
    settings: {},
  }),
};

PISettingContainer.propTypes = {
  cohortObj: PropTypes.object.isRequired,
  piSettingsContainerRequest: PropTypes.func.isRequired,
  piSettingsSave: PropTypes.func.isRequired,
  enrollmentCount: PropTypes.number,
  piSettingData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  cohortObj: makeSelectEffectiveCohortObject(),
  piSettingData: makeSelectPISettingContainer(),
});

const withConnect = connect(mapStateToProps, {
  piSettingsContainerRequest,
  piSettingsSave,
  makeSelectPISettingContainer,
});

const withReducer = injectReducer({ key: 'piSettingContainer', reducer });
const withSaga = injectSaga({ key: 'piSettingContainer', saga });

export default compose(withReducer, withSaga, withConnect)(PISettingContainer);
