/**
 *
 * Class Assign Modal
 *
 */

import React from 'react';
import ClassAssignModal from 'components/ClassAssignModal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { hideModal } from 'containers/ModalController/actions';
import { USER_TYPE } from 'containers/App/constants';

// TODO this container should get some of the functionality from ClassAssignModal.js
export class ClassAssignModalContainer extends React.Component {
  handleClose = () => {
    this.props.hideModal();
  };

  render() {
    const cohortsToAssign = this.props.data.cohortsToAssign;
    const searchRefreshOnSave = this.props.data.searchRefreshOnSave;
    const cohortTypeLabel = this.props.data.cohortTypeLabel;
    const showGroups = cohortTypeLabel === USER_TYPE.Student;
    const isMIA = this.props.data.isMIA;
    const cohortInfo = this.props.data.cohortInfo;
    const searchOpts = this.props.data.searchOpts;
    return (
      <ClassAssignModal
        isOpen
        onClose={this.handleClose}
        cohortsToAssign={cohortsToAssign}
        searchRefreshOnSave={searchRefreshOnSave}
        cohortTypeLabel={cohortTypeLabel}
        isMIA={isMIA}
        showGroups={showGroups}
        searchOpts={searchOpts}
        cohortInfo={cohortInfo}
      />
    );
  }
}

ClassAssignModalContainer.defaultProps = {
  data: {},
};

ClassAssignModalContainer.propTypes = {
  data: PropTypes.object,
  hideModal: PropTypes.func.isRequired,
};

const withConnect = connect(null, { hideModal });

export default compose(withConnect)(ClassAssignModalContainer);
