import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import EditQuizCollectionNames from 'components/EditQuizCollectionNames';
import { createStructuredSelector } from 'reselect';
import { hideModal } from 'containers/ModalController/actions';
import { fromJS } from 'immutable';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import makeSelecteditQuizCollectionNames from './selectors';
import {
  getEditQuizCollectionNamesDataRequest,
  initializeQuizNameRequest,
  postEditQuizCollectionNamesRequest,
} from './actions';
import saga from './saga';
import reducer from './reducer';

export class EditQuizCollectionNamesContainer extends Component {
  componentWillMount() {
    this.props.getEditQuizCollectionNamesDataRequest();
  }
  componentDidMount = () => this.props.initializeQuizNameRequest();
  render() {
    if (
      this.props.editQuizCollectionNamesContainer.editQuizCollectionNamesData[0] &&
      this.props.editQuizCollectionNamesContainer.editQuizCollectionNamesData[0].Name[0] === ''
    ) {
      const collectionNames = this.props.editQuizCollectionNamesContainer
        .editQuizCollectionNamesData;
      collectionNames.shift();
    }
    return (
      <div>
        <EditQuizCollectionNames
          isOpen
          {...this.props}
          dropDowndata={this.props.editQuizCollectionNamesContainer.editQuizCollectionNamesData}
          fetchSuccess={this.props.editQuizCollectionNamesContainer.fetchSuccess}
          saveStatus={this.props.editQuizCollectionNamesContainer.saveSuccess}
        />
      </div>
    );
  }
}

EditQuizCollectionNamesContainer.defaultProps = {
  editQuizCollectionNamesContainer: fromJS({}),
};

EditQuizCollectionNamesContainer.propTypes = {
  getEditQuizCollectionNamesDataRequest: PropTypes.func.isRequired,
  editQuizCollectionNamesContainer: PropTypes.object.isRequired,
  initializeQuizNameRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  editQuizCollectionNamesContainer: makeSelecteditQuizCollectionNames(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getEditQuizCollectionNamesDataRequest: () => dispatch(getEditQuizCollectionNamesDataRequest()),
    initializeQuizNameRequest: () => dispatch(initializeQuizNameRequest()),
    handleCancel: () => dispatch(hideModal()),
    handleSave: values => dispatch(postEditQuizCollectionNamesRequest(values)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'editQuizCollectionNamesContainer', reducer });
const withSaga = injectSaga({ key: 'editQuizCollectionNamesContainer', saga });
export default compose(withReducer, withSaga, withConnect)(EditQuizCollectionNamesContainer);
