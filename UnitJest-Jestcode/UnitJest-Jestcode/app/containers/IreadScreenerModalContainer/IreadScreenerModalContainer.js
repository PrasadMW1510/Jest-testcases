/**
 *
 * IreadScreenerModalContainer
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import SAMButton from 'components/SAMButton';
import SAMModal from 'components/SAMModal';
import { hideModal } from 'containers/ModalController/actions';

import './IreadScreenerModalContainer.scss';

export function IreadScreenerModalContainer(props) {
  const handleYes = () => {
    props.hideModal();
  };

  const handleCancel = () => {
    props.hideModal();
    props.data.setNewAdministrationFlag('0');
  };

  return (
    <SAMModal modalClassModifier="iread-screener-modal" isOpen>
      <div className="iread-screener-modal--header">Screener Administration</div>
      <div className="iread-screener-modal--body">
        <div className="iread-screener-modal--message">
          Enabling this checkbox will require the student to complete the screener and affect their
          placement in the scope and sequence. <br />
          <br />
          Are you sure you wish to proceed?
        </div>
        <SAMButton
          buttonClassModifier="iread-screener-modal--yes-button"
          isPrimaryButton
          onClickHandler={handleYes}
        >
          Yes
        </SAMButton>
        <SAMButton
          buttonClassModifier="iread-screener-modal--cancel-button"
          onClickHandler={handleCancel}
        >
          Cancel
        </SAMButton>
      </div>
    </SAMModal>
  );
}

IreadScreenerModalContainer.propTypes = {
  data: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
};

const withConnect = connect(null, { hideModal });

export default compose(withConnect)(IreadScreenerModalContainer);
