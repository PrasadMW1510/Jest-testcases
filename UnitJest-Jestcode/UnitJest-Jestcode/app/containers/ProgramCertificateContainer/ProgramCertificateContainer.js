/**
 *
 * ProgramCertificateContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import ProgramCertificateView from 'components/ProgramCertificateView';
import ProgramCertificateFooterContainer from 'containers/ProgramCertificateFooterContainer';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectCertificateInfo from './selectors';
import reducer from './reducer';
import saga from './saga';

import { certificateInfoRequest } from './actions';

export class ProgramCertificateContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCertificate: '',
      lineOne: '',
      lineTwo: '',
      lineThree: '',
      lineFour: '',
      selectedClasses: [],
      isWorksheetUpdate: false,
    };
  }

  componentDidMount() {
    this.props.certificateInfoRequest();
  }

  getProgramCertificateContainer = props => props.certificateInfo && props.certificateInfo.toJS();

  getCertificateDetails = () => {
    const {
      selectedCertificate,
      lineOne,
      lineTwo,
      lineThree,
      lineFour,
      selectedClasses,
    } = this.state;
    const certificate_info = {}; // eslint-disable-line
    if (selectedCertificate) {
      certificate_info.certificate_id = selectedCertificate;
    }
    if (lineOne) {
      certificate_info.custom_message1 = lineOne;
    }
    if (lineTwo) {
      certificate_info.custom_message2 = lineTwo;
    }
    if (lineThree) {
      certificate_info.custom_message3 = lineThree;
    }
    if (lineFour) {
      certificate_info.custom_message4 = lineFour;
    }
    if (selectedClasses && selectedClasses.length > 0) {
      certificate_info.recipients = {
        recipient: selectedClasses,
      };
    }
    return { certificate_info };
  };

  toggleRowSelection = row => {
    const selectedClasses = this.state.selectedClasses.slice(0);
    const classIndex = selectedClasses.findIndex(item => item.id === row.id);
    if (classIndex === -1) {
      selectedClasses.push(row);
    } else {
      selectedClasses.splice(classIndex, 1);
    }
    this.setState({ selectedClasses, isWorksheetUpdate: true });
  };

  toggleRowsSelection = toBeChecked => {
    const certificateInfo = this.getProgramCertificateContainer(this.props);
    if (toBeChecked) {
      const selectedClasses =
        certificateInfo &&
        certificateInfo.certificateInfo.recipients[0].recipient.map(recipient => ({
          id: recipient.id[0],
          type: recipient.type[0],
          name: recipient.name[0],
        }));
      this.setState({ selectedClasses, isWorksheetUpdate: true });
    } else {
      this.setState({ selectedClasses: [], isWorksheetUpdate: true });
    }
  };

  handleChange = e => {
    const toBeUpdated = {
      isWorksheetUpdate: true,
    };
    toBeUpdated[e.target.name] = e.target.value;
    this.setState(toBeUpdated);
  };

  handleCancel = () => {
    this.setState({
      selectedCertificate: '',
      lineOne: '',
      lineTwo: '',
      lineThree: '',
      lineFour: '',
      selectedClasses: [],
      isWorksheetUpdate: false,
    });
  };

  render() {
    const certificateInfo = this.getProgramCertificateContainer(this.props);
    const {
      selectedCertificate,
      lineOne,
      lineTwo,
      lineThree,
      lineFour,
      selectedClasses,
      isWorksheetUpdate,
    } = this.state;
    return (
      <div className="roster-content-panel">
        <ProgramCertificateView
          certificateInfo={certificateInfo && certificateInfo.certificateInfo}
          handleChange={this.handleChange}
          selectedCertificate={selectedCertificate}
          lineOne={lineOne}
          lineTwo={lineTwo}
          lineThree={lineThree}
          lineFour={lineFour}
          selectedClasses={selectedClasses}
          toggleRowSelection={this.toggleRowSelection}
          toggleRowsSelection={this.toggleRowsSelection}
        />
        <ProgramCertificateFooterContainer
          handlePrintPdfClick={this.handlePrintPdfClick}
          onCancel={this.handleCancel}
          certificateInformation={this.getCertificateDetails()}
          isWorksheetUpdate={isWorksheetUpdate}
        />
      </div>
    );
  }
}

ProgramCertificateContainer.propTypes = {
  certificateInfoRequest: PropTypes.any,
  certificateInfo: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
};

const mapStateToProps = createStructuredSelector({
  certificateInfo: makeSelectCertificateInfo(),
});

const withConnect = connect(mapStateToProps, { certificateInfoRequest });

const withReducer = injectReducer({ key: 'certificateInfo', reducer });
const withSaga = injectSaga({ key: 'certificateInfo', saga });

export default compose(withConnect, withReducer, withSaga)(ProgramCertificateContainer);
