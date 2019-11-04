/**
 *
 * S44NGSettingContainer
 *
 */

import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import S44NGSettings from 'components/S44NGSettings';
import { makeSelectEffectiveCohortObject } from 'containers/SmartBarContainer/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { s44NGSettingsContainerRequest, s44NGSettingsSave } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectS44NGSettingContainer } from './selectors';

export class S44NGSettingContainer extends React.Component {
  componentDidMount() {
    this.props.s44NGSettingsContainerRequest();
  }

  handleSave = updatedSettings => {
    this.props.s44NGSettingsSave(updatedSettings);
  };

  render() {
    return (
      <S44NGSettings
        cohortObj={this.props.cohortObj}
        handleSave={this.handleSave}
        settings={this.props.s44NGSettingsData.get('settings')}
        isLoading={this.props.s44NGSettingsData.get('loading')}
        enrollmentCount={this.props.enrollmentCount}
      />
    );
  }
}

S44NGSettingContainer.defaultProps = {
  enrollmentCount: 0,
  s44NGSettingsData: fromJS({
    settings: {},
    loading: false,
  }),
};

S44NGSettingContainer.propTypes = {
  s44NGSettingsContainerRequest: PropTypes.func.isRequired,
  s44NGSettingsSave: PropTypes.func.isRequired,
  cohortObj: PropTypes.object,
  enrollmentCount: PropTypes.number,
  s44NGSettingsData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  s44NGSettingsData: makeSelectS44NGSettingContainer(),
  cohortObj: makeSelectEffectiveCohortObject(),
});

const withConnect = connect(mapStateToProps, { s44NGSettingsContainerRequest, s44NGSettingsSave });

const withReducer = injectReducer({ key: 's44NGSettingContainer', reducer });
const withSaga = injectSaga({ key: 's44NGSettingContainer', saga });

export default compose(withReducer, withSaga, withConnect)(S44NGSettingContainer);
