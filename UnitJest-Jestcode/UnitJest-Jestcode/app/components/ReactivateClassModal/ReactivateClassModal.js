/**
 *
 * ReactivateClassModal
 *
 */
import PropTypes from 'prop-types';
import React from 'react';
import SAMButton from 'components/SAMButton';
import SAMModal from 'components/SAMModal';

import './ReactivateClassModal.scss';

class ReactivateClassModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSchoolId: this.props.schoolsData ? this.props.schoolsData[0].org_id[0] : '',
    };
  }

  handleSave = () => {
    this.props.onSave({
      editClassId: this.props.editClassId,
      selectedSchoolId: this.state.selectedSchoolId,
    });
  };

  handleSchoolSelectionOnChange = event => {
    this.setState({ selectedSchoolId: event.target.value });
  };

  renderSchoolDropDown = () =>
    this.props.schoolsData &&
    this.props.schoolsData.map(school => (
      <option key={school.org_id[0]} value={school.org_id[0]}>
        {school.name[0]}
      </option>
    ));

  renderMessage = () => {
    if (this.props.editClassId) {
      return (
        <div className="reactivate-class-modal__message">
          Use the pull-down menu to assign this class to a school.
        </div>
      );
    }
    return (
      <div className="reactivate-class-modal__message">
        You have chosen{' '}
        <span className="reactivate-class-modal--bold">{` ${this.props.toReactivateCount} `}</span>
        {this.props.toReactivateCount === 1 ? 'Class' : 'Classes'} for assignment. Select a school.
      </div>
    );
  };

  render() {
    return (
      <SAMModal
        isOpen={this.props.isOpen}
        contentLabel=""
        modalClassModifier="reactivate-class-modal"
      >
        <div className="reactivate-class-modal__header">
          <h5 className="reactivate-class-modal__header-title">
            {this.props.editClassId ? `Reactivate this class` : `Reactivate classes`}
          </h5>
        </div>
        {this.renderMessage()}
        <div className="reactivate-class-modal__school-name-div">
          <select
            onChange={this.handleSchoolSelectionOnChange}
            className="reactivate-class-modal__school-name-select"
            value={this.state.selectedSchoolId}
          >
            {this.renderSchoolDropDown()}
          </select>
        </div>

        <div className="reactivate-class-modal__button-group-container">
          <div className="reactivate-class-modal__button-group">
            <SAMButton
              id="reactivate-class-modal__no-btn"
              buttonClassModifier="reactivate-class-modal__button"
              buttonType="submit"
              onClickHandler={this.props.onCancel}
            >
              Cancel
            </SAMButton>
            <SAMButton
              id="reactivate-class-modal__yes-btn"
              buttonClassModifier="reactivate-class-modal__button"
              isPrimaryButton
              onClickHandler={this.handleSave}
            >
              {this.props.editClassId ? `Proceed` : `Save`}
            </SAMButton>
          </div>
        </div>
      </SAMModal>
    );
  }
}

ReactivateClassModal.propTypes = {
  isOpen: PropTypes.bool,
  toReactivateCount: PropTypes.number,
  schoolsData: PropTypes.array,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  editClassId: PropTypes.string,
};

export default ReactivateClassModal;
