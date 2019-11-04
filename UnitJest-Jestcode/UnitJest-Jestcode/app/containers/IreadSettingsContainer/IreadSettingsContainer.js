/**
 *
 * IreadSettingsContainer
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import IReadSettings from 'components/IReadSettings';
import { showModal } from 'containers/ModalController/actions';
import { makeSelectEffectiveCohortObject } from 'containers/SmartBarContainer/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { IreadProgramSettingsRequest, IreadSaveRequest } from './actions';
import reducer from './reducer';
import saga from './saga';
import { programSetting } from './selectors';

export class IreadSettingsContainer extends React.Component {
  componentDidMount() {
    this.props.IreadProgramSettingsRequest();
  }

  handleSave = settingsData => {
    this.props.IreadSaveRequest(settingsData);
  };

  render() {
    return (
      <IReadSettings
        cohortObj={this.props.cohortObj}
        enrollmentCount={this.props.enrollmentCount}
        handleSave={this.handleSave}
        isLoading={this.props.programSettingData.get('loading')}
        programSettingData={this.props.programSettingData.get('programSetting')}
        showModal={this.props.showModal}
      />
    );
  }
}

IreadSettingsContainer.propTypes = {
  cohortObj: PropTypes.object.isRequired,
  enrollmentCount: PropTypes.number.isRequired,
  IreadProgramSettingsRequest: PropTypes.func.isRequired,
  IreadSaveRequest: PropTypes.func.isRequired,
  programSettingData: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  programSettingData: programSetting(),
  cohortObj: makeSelectEffectiveCohortObject(),
});

const withConnect = connect(mapStateToProps, {
  IreadProgramSettingsRequest,
  IreadSaveRequest,
  showModal,
});

const withReducer = injectReducer({ key: 'ireadSettingsContainerData', reducer });
const withSaga = injectSaga({ key: 'ireadSettingsContainerData', saga });

export default compose(withReducer, withSaga, withConnect)(IreadSettingsContainer);
