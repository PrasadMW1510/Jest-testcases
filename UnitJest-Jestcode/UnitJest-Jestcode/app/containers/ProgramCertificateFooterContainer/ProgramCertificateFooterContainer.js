/**
 *
 * ProgramCertificateFooterContainer
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { getBaseUrl } from 'utils/request';
import ProgramCertificateFooter from 'components/ProgramCertificateFooter';

import { createStructuredSelector } from 'reselect';
import { certificatePrintRequest } from './actions';
import makeSelectCertificatePrintPdfContainer from './selectors';
import saga from './saga';
import reducer from './reducer';

export class ProgramCertificateFooterContainer extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (
      this.getCertificatePdfContainer(nextProps) &&
      this.getCertificatePdfContainer(nextProps).certificatePrint.length &&
      this.getCertificatePdfContainer(this.props).certificatePrint.length &&
      this.getCertificatePdfContainer(nextProps).certificatePrint[0].certificate_id[0] !==
        this.getCertificatePdfContainer(this.props).certificatePrint[0].certificate_id[0]
    ) {
      const baseURL = getBaseUrl();
      window.open(
        `${baseURL}/SlmsCertificatePdf/${
          this.getCertificatePdfContainer(nextProps).certificatePrint[0].certificate_id[0]
        }.pdf`
      );
    }
  }

  getCertificatePdfContainer = props => {
    if (props.certificatePrintPdfContainer) {
      return props.certificatePrintPdfContainer.toJS();
    }
    return null;
  };

  handlePrintPdfClick = e => {
    e.preventDefault();
    this.props.certificatePrintRequest(this.props.certificateInformation);
  };

  render = () => (
    <ProgramCertificateFooter
      onPrintPdfClick={this.handlePrintPdfClick}
      onCancel={this.props.onCancel}
      isWorksheetUpdate={this.props.isWorksheetUpdate}
    />
  );
}

ProgramCertificateFooterContainer.propTypes = {
  certificatePrintRequest: PropTypes.func,
  certificatePrintPdfContainer: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  handlePrintPdfClick: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  certificateInformation: PropTypes.object,
  isWorksheetUpdate: PropTypes.bool,
  onCancel: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  certificatePrintPdfContainer: makeSelectCertificatePrintPdfContainer(),
});

const withConnect = connect(mapStateToProps, { certificatePrintRequest });
const withSaga = injectSaga({ key: 'certificatePrint', saga });
const withReducer = injectReducer({ key: 'certificatePrint', reducer });

export default compose(withConnect, withReducer, withSaga)(ProgramCertificateFooterContainer);
