/**
 *
 * SAMModal
 * This is the generic modal that other modals extend over.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import './SAMModal.scss';

function SAMModal({ children, isOpen, modalClassModifier, overlayClassModifier, contentLabel }) {
  const getOverlayClass = () => {
    let className = 'overlay';

    if (overlayClassModifier) {
      className += ` ${overlayClassModifier}`;
    }

    return className;
  };

  const getModalClass = () => {
    let className = 'modal';

    if (modalClassModifier) {
      className += ` ${modalClassModifier}`;
    }

    return className;
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={getOverlayClass()}>
      <div role="dialog" aria-labelledby={contentLabel} className={getModalClass()}>
        {children}
      </div>
    </div>
  );
}

SAMModal.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.node,
  modalClassModifier: PropTypes.string,
  overlayClassModifier: PropTypes.string,
  contentLabel: PropTypes.string,
};

SAMModal.defaultProps = {
  contentLabel: 'SAM Modal',
};

export default SAMModal;
