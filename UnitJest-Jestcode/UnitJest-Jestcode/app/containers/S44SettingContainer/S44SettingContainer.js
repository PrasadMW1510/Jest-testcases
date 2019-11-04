/**
 *
 * S44SettingContainer
 *
 */

import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import S44Settings from 'components/S44Settings';
import { makeSelectEffectiveCohortObject } from 'containers/SmartBarContainer/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { s44SettingsContainerRequest, s44SettingsSave } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectS44SettingContainer } from './selectors';

export class S44SettingContainer extends React.Component {
  componentDidMount() {
    this.props.s44SettingsContainerRequest();
  }

  handleSave = updatedSettings => {
    this.props.s44SettingsSave(updatedSettings);
  };

  render() {
    return (
      <S44Settings
        cohortObj={this.props.cohortObj}
        enrollmentCount={this.props.enrollmentCount}
        handleSave={this.handleSave}
        isLoading={this.props.s44SettingData.get('loading')}
        settings={this.props.s44SettingData.get('settings')}
      />
    );
  }
}

S44SettingContainer.defaultProps = {
  enrollmentCount: 0,
  s44SettingsData: fromJS({
    settings: {},
    loading: false,
  }),
};

S44SettingContainer.propTypes = {
  s44SettingsContainerRequest: PropTypes.func.isRequired,
  s44SettingsSave: PropTypes.func.isRequired,
  cohortObj: PropTypes.object.isRequired,
  enrollmentCount: PropTypes.number,
  s44SettingData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  cohortObj: makeSelectEffectiveCohortObject(),
  s44SettingData: makeSelectS44SettingContainer(),
});

const withConnect = connect(mapStateToProps, { s44SettingsContainerRequest, s44SettingsSave });

const withReducer = injectReducer({ key: 's44SettingContainer', reducer });
const withSaga = injectSaga({ key: 's44SettingContainer', saga });

export default compose(withReducer, withSaga, withConnect)(S44SettingContainer);
