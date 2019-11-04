/**
 *
 * AddDemographicModalContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { hideModal } from 'containers/ModalController/actions';
import AddDemographicModal from 'components/AddDemographicModal';
import { updateCustomDemographics } from 'containers/EditDistrictProfileContainer/actions';

export class AddDemographicModalContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      demographicList: [],
      nameTaken: false,
    };
  }
  handleCancel = () => {
    this.props.hideModal();
  };

  addDemographic = demographic => {
    const demographicData = {
      name: demographic,
      id: demographic,
    };
    const newDemographics = this.props.data.demographicList.concat(demographicData);
    this.props.updateCustomDemographics(newDemographics);
  };

  //   addDemographic= (demographic)=> {
  //    const newList =
  //   }
  handleSave = (demographic, clickedIndex) => {
    const demographicExist = this.props.data.demographicList.some(
      demographicItem => demographicItem.name === demographic
    );

    const originalIndex = this.props.data.demographicList.findIndex(
      item => item.name === demographic
    );
    const sameIndex = clickedIndex === originalIndex;

    if (demographicExist && !sameIndex) {
      this.setState({
        nameTaken: true,
      });
      return;
    }

    if (this.props.data.editMode) {
      const newDemographics = this.props.data.demographicList.slice();
      newDemographics[this.props.data.selectedIndex] = { name: demographic };
      this.props.updateCustomDemographics(newDemographics);
    } else {
      this.addDemographic(demographic);
    }
    this.props.hideModal();
  };

  handleDelete = clickedIndex => {
    const list = this.props.data.demographicList;
    const newDemographics = list.slice(0, clickedIndex).concat(list.slice(clickedIndex + 1));
    this.props.updateCustomDemographics(newDemographics);
    this.props.hideModal();
  };

  render() {
    return (
      <AddDemographicModal
        demographicList={this.props.data.demographicList}
        demographicToEdit={this.props.data.demographicToEdit}
        demographicToDelete={this.props.data.demographicToDelete}
        deleteMode={this.props.data.deleteMode}
        isOpen
        nameTaken={this.state.nameTaken}
        onSave={this.handleSave}
        onCancel={this.handleCancel}
        onDelete={this.handleDelete}
      />
    );
  }
}

AddDemographicModalContainer.defaultProps = {
  data: {
    editMode: false,
    demographicToEdit: null,
  },
};

AddDemographicModalContainer.propTypes = {
  data: PropTypes.object,
  hideModal: PropTypes.func.isRequired,
  updateCustomDemographics: PropTypes.func.isRequired,
};

const withConnect = connect(null, { hideModal, updateCustomDemographics });
// const withSaga = injectSaga({ key: 'AddDemographicModalContainer', saga });
// const withReducer = injectReducer({ key: 'AddDemographicModalContainer', reducer });

export default compose(withConnect)(AddDemographicModalContainer);
