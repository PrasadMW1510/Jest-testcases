/**
 *
 * StudentWorksContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Read180 from 'components/Read180';
import { hideModal } from 'containers/ModalController/actions';
import { getRead180DataRequest } from 'containers/Read180NgContainer/actions';
import { getRead180StudentWorkRequest } from 'containers/Read180StudentWorkContainer/actions';
import makeSelectStudentWorksContainer from '../StudentWorksContainer/selectors';

export class Read180Container extends React.PureComponent {
  requestData = row => {
    if (row.communityId === 'RTNG') {
      let xmlinput = '';
      let studentId = row.id;
      if (row.studentId !== undefined) {
        studentId = row.studentId;
      }
      xmlinput = `<workItemsSubset>
    <workItemInfo 
    workItemId='${row.workItemId}'
     communityId='${row.communityId}' 
      studentId='${studentId}' 
      assignment='${row.assignment}' kind='${row.kind}' />
  </workItemsSubset>`;
      this.props.getRead180StudentWorkRequest(xmlinput);
    }
    if (row.communityId === 'R180NG') {
      let xmlinput = '';
      let studentId = row.id;
      if (row.studentId !== undefined) {
        studentId = row.studentId;
      }
      xmlinput = `<workItemsSubset>
    <workItemInfo 
    workItemId='${row.workItemId}'
     communityId='${row.communityId}' 
      studentId='${studentId}' 
      assignment='${row.assignment}' kind='${row.kind}' />
  </workItemsSubset>`;
      this.props.getRead180DataRequest(xmlinput);
    }
  };

  render() {
    const { hideModal: hideModalProp } = this.props;
    return (
      <div>
        <Read180
          isOpen
          handleCancel={hideModalProp}
          modalData={this.props.studentworkscontainer.selectedClassAssignments}
          showRead180RespondWriteModal={this.props.showRead180RespondWriteModal}
          requestData={this.requestData}
          {...this.props}
        />
      </div>
    );
  }
}

Read180Container.propTypes = {
  hideModal: PropTypes.func.isRequired,
  getRead180DataRequest: PropTypes.func.isRequired,
  getRead180StudentWorkRequest: PropTypes.func.isRequired,
  studentworkscontainer: PropTypes.object.isRequired,
  selectedClassAssignments: PropTypes.array.isRequired,
  showRead180RespondWriteModal: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  studentworkscontainer: makeSelectStudentWorksContainer(),
});

export function mapDispatchToProps(dispatch) {
  return {
    hideModal: () => dispatch(hideModal()),
    getRead180StudentWorkRequest: data => dispatch(getRead180StudentWorkRequest(data)),
    getRead180DataRequest: data => dispatch(getRead180DataRequest(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Read180Container);
