/**
 *
 * Read180
 *
 */

import React from 'react';
import SAMModal from 'components/SAMModal';
import PropTypes from 'prop-types';
import Read180StudentworkContainer from 'containers/Read180StudentWorkContainer/Read180StudentWorkContainer';
import Read180NgContainer from 'containers/Read180NgContainer/Read180NgContainer';
import * as Constants from './constants';
import './Read180.scss';

class Read180 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: props.data.currentIndex,
      communityId: props.data && props.data.row && props.data.row.communityId,
    };
  }

  prevSerd = e => {
    e.preventDefault();
    if (this.state.currentIndex === 0) {
      return;
    }
    const prevInd = this.state.currentIndex - 1;
    const resultDetails = this.props.modalData;
    const prevRow = resultDetails[prevInd];
    const prevID = prevRow.communityId;

    this.setState({ currentIndex: prevInd, communityId: prevID });
    if (
      prevID === Constants.READ180_PROGRAM_ID &&
      prevRow.assignment === Constants.READ180_RESPOND_AND_WRITE
    ) {
      this.props.hideModal();
      this.props.showRead180RespondWriteModal(prevRow, 'StudentWorks', prevInd, resultDetails);
    } else {
      this.props.requestData(prevRow);
    }
  };

  nextSerd = e => {
    e.preventDefault();
    if (this.state.currentIndex === this.props.modalData.length - 1) {
      return;
    }
    const nextInd = this.state.currentIndex + 1 || null;
    const resultDetails = this.props.modalData;
    const nextRow = resultDetails[nextInd];
    const nextID = nextRow.communityId;
    this.setState({ currentIndex: nextInd, communityId: nextID });
    if (
      nextID === Constants.READ180_PROGRAM_ID &&
      nextRow.assignment === Constants.READ180_RESPOND_AND_WRITE
    ) {
      this.props.hideModal();
      this.props.showRead180RespondWriteModal(nextRow, 'StudentWorks', nextInd + 1, resultDetails);
    } else {
      this.props.requestData(nextRow);
    }
  };

  render() {
    const { isOpen } = this.props;
    return (
      <div>
        <SAMModal
          isOpen={isOpen}
          contentLabel="activate Quiz"
          modalClassModifier="modal-modal--read180ng-modal"
          id="r180"
        >
          {this.state.communityId === Constants.READ180_RSKILL_ID && (
            <Read180StudentworkContainer {...this.props} />
          )}
          {this.state.communityId === Constants.READ180_PROGRAM_ID && (
            <Read180NgContainer handleCancel={this.props.handleCancel} {...this.props} />
          )}
          <center>
            <div className="iread-modal-buttons-firstset">
              <div className="pager">
                <div className="pager-prev">
                  <a className="previous" href="" onClick={this.prevSerd}>
                    {' '}
                    &lt;{' '}
                  </a>
                </div>
                <div className="pager-nor"> {this.state.currentIndex + 1} </div>
                <div className="pager-nor"> of </div>
                <div className="pager-nor">
                  {' '}
                  {this.props.modalData && this.props.modalData.length}{' '}
                </div>
                <div className="pager-prev">
                  <a className="previous" href="" onClick={this.nextSerd}>
                    {' '}
                    &gt;{' '}
                  </a>
                </div>
              </div>
            </div>
          </center>
        </SAMModal>
      </div>
    );
  }
}
Read180.defaultProps = {
  isOpen: false,
};

Read180.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  requestData: PropTypes.func.isRequired,
  data: PropTypes.object,
  modalData: PropTypes.array,
  hideModal: PropTypes.func.isRequired,
  showRead180RespondWriteModal: PropTypes.func,
};

export default Read180;
