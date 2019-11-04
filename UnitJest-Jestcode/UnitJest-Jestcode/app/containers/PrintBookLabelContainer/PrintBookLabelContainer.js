/**
 *
 * PrintCustomQuizList
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { hideModal } from 'containers/ModalController/actions';
import injectSaga from 'utils/injectSaga';
import PrintBookLabels from 'components/PrintBookLabels';
import PropTypes from 'prop-types';
import { printBookLabelRequest } from './actions';
import saga from './saga';

export class PrintBookLabelContainer extends React.Component {
  handlePreview = (opts, bookId) => {
    this.props.printBookLabelRequest(opts, bookId);
  };

  render() {
    const {
      hideModal: hideModalProp, // Avoid dup declaration
    } = this.props;

    return (
      <PrintBookLabels
        isOpen
        handleCancel={hideModalProp}
        onPreview={this.handlePreview}
        {...this.props}
      />
    );
  }
}

PrintBookLabelContainer.propTypes = {
  hideModal: PropTypes.func.isRequired,
  printBookLabelRequest: PropTypes.func.isRequired,
};

const withConnect = connect(null, { hideModal, printBookLabelRequest });
const withSaga = injectSaga({ key: 'printBookLabel', saga });

export default compose(withSaga, withConnect)(PrintBookLabelContainer);
