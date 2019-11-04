/*
**
*
* ProgramSettingSetStudentLevelModalContainer
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { hideModal } from 'containers/ModalController/actions';
import { PROGRAM_SETTING_SET_STUDENT_LEVEL_MODAL } from 'containers/ModalController/constants';
import ProgramSettingSetStudentLevelModal from 'components/ProgramSettingSetStudentLevelModal';
export class ProgramSettingSetStudentLevelModalContainer extends React.Component {
  handleNo = () => {
    this.props.hideModal();
    return false;
  };

  handleYes = () => {
    this.props.data.setLevel(Number(this.props.data.Level));
    this.props.hideModal(PROGRAM_SETTING_SET_STUDENT_LEVEL_MODAL, this.props.data.Level);
    return 'true';
  };

  render() {
    return (
      <ProgramSettingSetStudentLevelModal
        isOpen
        onNo={this.handleNo}
        onYes={this.handleYes}
        displayLevel={this.props.data}
      />
    );
  }
}

ProgramSettingSetStudentLevelModalContainer.propTypes = {
  hideModal: PropTypes.func.isRequired,
  data: PropTypes.any,
};

const withConnect = connect(null, { hideModal });

export default compose(withConnect)(ProgramSettingSetStudentLevelModalContainer);
