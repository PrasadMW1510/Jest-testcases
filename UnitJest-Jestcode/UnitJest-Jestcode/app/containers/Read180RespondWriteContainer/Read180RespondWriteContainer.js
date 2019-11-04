/**
 *
 * Read180RespondWriteContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import RespondWrite from 'components/RespondWrite';
import { hideModal, showRead180Modal } from 'containers/ModalController/actions';
import * as Constants from 'components/InBox/constants';
import { getRespondWriteRequest, saveRespondData } from './actions';
import makeSelectRead180RespondWriteContainer from './selectors';
import reducer from './reducer';
import saga from './saga';

export class Read180RespondWriteContainer extends React.Component {
  constructor(props) {
    super(props);
    this.dispatchAction = this.dispatchAction.bind(this);
  }
  componentDidMount() {
    this.props.getRespondWriteRequest(this.props.data);
  }
  dispatchAction(rowData, currentIndex) {
    const defaultValue = Constants.PROG_DEFAULT_VALUE;
    const mathvalue = [Constants.PROG_MATH_VALUE_1, Constants.PROG_MATH_VALUE_2];
    const read180Value = Constants.PROG_READ_VALUE;
    const rskillValue = Constants.PROG_RTNG_VALUE;
    this.props.hideModal();

    if (rowData.community_id.indexOf('R180NG') > -1 && rowData.assignment === 'Respond & Write') {
      this.props.showRead180RespondWriteModal(
        rowData,
        'StudentWorks',
        currentIndex,
        this.props.data.allData
      );
      return false;
    }

    if (rowData.assignment === 'Success Recording' || rowData.assignment === 'Final Recording') {
      this.props.showSystem44SuccessRecordModal(rowData, currentIndex);
    }
    if (rowData.communityId === defaultValue) {
      this.props.showSystem44Modal();
    } else if (rowData.communityId === Constants.IREAD_VALUE) {
      this.props.showIreadModal();
    }
    if (rowData.community_id === read180Value) {
      this.props.showRead180Modal(rowData, 'StudentWorks', currentIndex, this.props.data.allData);
    }
    if (mathvalue.findIndex(mvalue => mvalue === rowData.communityId) > -1) {
      this.props.showInboxProgram(
        rowData,
        'Inbox',
        currentIndex,
        this.props.InboxContainer.tempGridData
      );
    }
    if (rowData.community_id === rskillValue) {
      this.props.read180studentworkcontainer(rowData);
    }
    return true;
  }
  render() {
    const { read180respondwritecontainer, data } = this.props;
    return (
      <div>
        <RespondWrite
          isOpen
          hideCancel={this.props.hideModal}
          data={read180respondwritecontainer}
          saveRespondData={this.props.saveRespondData}
          tempGridData={data.allData}
          currentIndex={data.currentIndex}
          dispatchAction={this.dispatchAction}
        />
      </div>
    );
  }
}

Read180RespondWriteContainer.propTypes = {
  getRespondWriteRequest: PropTypes.func.isRequired,
  showRead180Modal: PropTypes.func.isRequired,
  read180respondwritecontainer: PropTypes.object,
  tempGridData: PropTypes.array,
  saveRespondData: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  read180studentworkcontainer: PropTypes.func,
  showInboxProgram: PropTypes.func,
  showIreadModal: PropTypes.func,
  showSystem44Modal: PropTypes.func,
  showSystem44SuccessRecordModal: PropTypes.func,
  showRead180RespondWriteModal: PropTypes.func,
  data: PropTypes.any,
  InboxContainer: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  read180respondwritecontainer: makeSelectRead180RespondWriteContainer(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getRespondWriteRequest: data => dispatch(getRespondWriteRequest(data)),
    hideModal: () => dispatch(hideModal()),
    saveRespondData: data => dispatch(saveRespondData(data)),
    showRead180Modal: (data, page, rowIndex, allRows) =>
      dispatch(showRead180Modal(data, page, rowIndex, allRows)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'read180RespondWriteContainer', reducer });
const withSaga = injectSaga({ key: 'read180RespondWriteContainer', saga });

export default compose(withReducer, withSaga, withConnect)(Read180RespondWriteContainer);
