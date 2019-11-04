/**
 *
 * AddDemographicModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';
import './AddDemographicModal.scss';

class AddDemographicModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newDemographicName: props.demographicToEdit,
      nameTaken: false,
    };
  }
  handleTextChange = e => {
    e.preventDefault();

    this.setState({
      newDemographicName: e.target.value,
    });
  };

  handleSave = () => {
    const clickedIndex = this.props.demographicList.findIndex(
      listItem => listItem.name === this.props.demographicToEdit
    );
    this.props.onSave(this.state.newDemographicName, clickedIndex);
  };

  handleDelete = () => {
    const clickedIndex = this.props.demographicList.findIndex(
      listItem => listItem.name === this.props.demographicToDelete
    );
    this.props.onDelete(clickedIndex);
  };
  renderMessage = () => {
    let message;

    if (this.props.nameTaken) {
      message = 'This name is already taken. Please enter another.';
    } else {
      message = 'Enter the demographic name and click, Save to finish.';
    }
    return message;
  };
  render() {
    return (
      <SAMModal isOpen={this.props.isOpen} modalClassModifier="add-demographic-modal">
        {!this.props.deleteMode && (
          <React.Fragment>
            <div className="add-demographic-modal__message">{this.renderMessage()}</div>
            <div className="add-demographic-modal__input">
              <input
                type="text"
                onChange={this.handleTextChange}
                value={this.state.newDemographicName}
              />
            </div>

            <SAMButton
              id="add-demographic-modal__button--cancel"
              buttonClassModifier="add-demographic-modal__button--cancel"
              onClickHandler={this.props.onCancel}
            >
              Cancel
            </SAMButton>
            <SAMButton
              buttonClassModifier="add-demographic-modal__button--save"
              onClickHandler={this.handleSave}
            >
              Save
            </SAMButton>
          </React.Fragment>
        )}

        {this.props.deleteMode && (
          <React.Fragment>
            <div className="add-demographic-modal__message">
              Do you really want to delete {this.props.demographicToDelete}?
            </div>

            <SAMButton
              id="add-demographic-modal__button--cancel"
              buttonClassModifier="add-demographic-modal__button--yes"
              onClickHandler={this.handleDelete}
              isPrimaryButton
            >
              Yes
            </SAMButton>
            <SAMButton
              buttonClassModifier="add-demographic-modal__button--no"
              onClickHandler={this.props.onCancel}
            >
              No
            </SAMButton>
          </React.Fragment>
        )}
      </SAMModal>
    );
  }
}

AddDemographicModal.propTypes = {
  isOpen: PropTypes.bool,
  nameTaken: PropTypes.bool,
  deleteMode: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  demographicToEdit: PropTypes.string,
  demographicToDelete: PropTypes.string,
  demographicList: PropTypes.array,
};

export default AddDemographicModal;
