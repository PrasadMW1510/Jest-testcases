import React from 'react';
import PropTypes from 'prop-types';
import myDisk from 'images/disk.png';
import myNoDisk from 'images/no-disk.png';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';
import ResultsTable from './ResultsTable';
import * as Constants from './constants';
import './CustomList.scss';

class CustomList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDelete: false,
      searchresultsData: {},
    };
  }

  componentDidMount() {
    if (this.props.searchresultsData !== undefined) {
      this.state.searchresultsData = this.props.searchresultsData;
    }
    document.addEventListener('keydown', this.escFunc, false);
  }

  getSelecedDataArrayIndex = (resultSet, dataID) => {
    let matchingID = -1;
    resultSet.map((item, i) => (item[0] === dataID[0] ? (matchingID = i) : -1));
    return matchingID;
  };

  escFunc = event => {
    if (event.keyCode === 27) {
      this.setState({
        showDelete: false,
      });
    }
  };

  clearList = () => {
    this.setState({
      showDelete: true,
    });
  };

  deleteCustomList = () => {
    this.props.clearCustomList();
    this.setState({
      showDelete: false,
    });
  };

  removeDeleteBox = () => {
    this.setState({
      showDelete: false,
    });
  };

  removeListRow = row => {
    const selectedItem = this.props.searchresultsData.selectedItems;
    const searchResultsIdsChecked = this.props.searchresultsData.searchResultsIdsChecked;

    const index = this.getSelecedDataArrayIndex(searchResultsIdsChecked, row.ID);
    if (index > -1) {
      selectedItem.splice(index, 1);
      searchResultsIdsChecked.splice(index, 1);
    }
    this.props.makeSelectedbookresults(selectedItem, searchResultsIdsChecked);
  };
  searchResultDetailsRequest = id => {
    this.props.searchResultDetailsRequest(id);
  };

  render() {
    const { IMG_WIDTH, LABEL } = Constants;
    return (
      <div>
        <div className="search-tabs-content advance-search__wrapper advance-search-custom-list__wrapper">
          <div className="custom-clear">
            <button
              className="custom-clear-link"
              id="custom-list-clear-link"
              onClick={this.clearList}
            >
              {LABEL.CLEAR_CUSTOM_LIST}
            </button>
          </div>
          <ResultsTable
            searchResults={this.props.searchresultsData}
            removeListRow={this.removeListRow}
            searchDetailModal={this.searchResultDetailsRequest}
          />
          <div className="search-items-count-install-quiz">
            <img style={{ width: IMG_WIDTH }} src={myDisk} alt="SAM" /> {LABEL.INSTALLED_QUIZ}{' '}
            <br />
            <img style={{ width: IMG_WIDTH }} src={myNoDisk} alt="SAM" />
            {LABEL.DEACTIVATED_QUIZ}
          </div>
        </div>

        <SAMModal
          isOpen={this.state.showDelete}
          modalClassModifier="modal--custom-list-form-warning"
        >
          <div className="custom-list-form-warning">
            <div className="custom-list-delete-quiz-content">{LABEL.DELETE_QUIZ_CONTENT}</div>
            <div className="custom-list-delete-button">
              <div className="custom-list-yes-button">
                <SAMButton
                  buttonClassModifier="custom-list-modal__button"
                  isPrimaryButton
                  onClickHandler={this.deleteCustomList}
                >
                  Yes
                </SAMButton>
              </div>
              <div className="custom-list-no-button">
                <SAMButton
                  buttonClassModifier="custom-list-modal__button"
                  onClickHandler={this.removeDeleteBox}
                >
                  No
                </SAMButton>
              </div>
            </div>
          </div>
        </SAMModal>
        <SAMModal
          isOpen={this.props.noDataToExportHTML}
          modalClassModifier="modal--custom-list-nohtmlexport-warning"
        >
          <div className="nohtmlexport-warning-title">
            <div className="delete-quiz-content">{LABEL.NO_SELECTED_TITLES_TO_PRINT}</div>
            <div className="custom-list-no-data-button">
              <div className="custom-list-no-data-yes-button">
                <SAMButton isPrimaryButton onClickHandler={this.props.closeNoTitlesToPrintModal}>
                  OK
                </SAMButton>
              </div>
            </div>
          </div>
        </SAMModal>
      </div>
    );
  }
}

CustomList.propTypes = {
  searchresultsData: PropTypes.object,
  makeSelectedbookresults: PropTypes.func,
  clearCustomList: PropTypes.func,
  searchResultDetailsRequest: PropTypes.func,
  noDataToExportHTML: PropTypes.bool,
  closeNoTitlesToPrintModal: PropTypes.func,
};

export default CustomList;
