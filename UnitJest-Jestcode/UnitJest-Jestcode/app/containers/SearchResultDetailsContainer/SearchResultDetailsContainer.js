/**
 *
 * SearchResultDetailsContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import SearchResultDetails from 'components/SearchResultDetails';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { fromJS } from 'immutable';
import { hideModal, showMessageLogModal } from 'containers/ModalController/actions';
import PopupModal from 'components/SearchResultDetails/PopupModal';
import { makeSelectedbookresults } from 'containers/SearchResultsContainer/actions';
import { makeSelectProfileUserType } from 'containers/App/selectors';
import makeSelectSearchResultsContainer from 'containers/SearchResultsContainer/selectors';
import makeSelectSearchResultDetailsContainer from './selectors';

import {
  getSearchResultDetailsDataRequest,
  saveSearchResultDetailsDataRequest,
  saveTeacherMadeQuizDataRequest,
} from './actions';

import reducer from './reducer';
import saga from './saga';

export class SearchResultDetailsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetch: false,
      detailsData: { IsFiction: '1' },
      isEditable: true,
      selectedItemData: {},
      selectedItems: [],
      isSelected: false,
      searchResultsIdsChecked: [],
      currentIndex: '',
      changeWordCountClassName: false,
      changeGRLClassName: false,
      changePointsClassName: false,
      changeReadingLevelClassName: false,
      changedInputVal: false,
    };
    this.getDataArrayIndex = this.getDataArrayIndex.bind(this);
    this.getSelecedDataArrayIndex = this.getSelecedDataArrayIndex.bind(this);
    this.prevSerd = this.prevSerd.bind(this);
    this.nextSerd = this.nextSerd.bind(this);
    this.changeQuizData = this.changeQuizData.bind(this);
    this.changeFictionData = this.changeFictionData.bind(this);
    this.saveQuizData = this.saveQuizData.bind(this);
    this.addcustomItem = this.addcustomItem.bind(this);
    this.saveTeacherMadeQuizData = this.saveTeacherMadeQuizData.bind(this);
  }
  componentDidMount() {
    if (this.props && this.props.data) {
      this.props.getSearchResultDetailsDataRequest(
        this.props.data.id,
        this.props.data.teacherMadeQuiz
      );
    }
  }
  componentWillReceiveProps(nextProps) {
    const detailsData =
      (nextProps.searchResultDetailsContainer &&
        nextProps.searchResultDetailsContainer.searchResultDetailsData) ||
      {};
    if (!this.state.isFetch) {
      const currentIndex =
        nextProps.searchResultsContainer.searchResults.results.length > 0 &&
        this.getDataArrayIndex(
          nextProps.searchResultsContainer.searchResults.results,
          nextProps.data
        );
      this.setState({
        currentIndex,
        isFetch: true,
      });
    }
    const isSelected =
      nextProps.searchResultsContainer.searchResultsIdsChecked.length > 0 &&
      this.getSelecedDataArrayIndex(
        nextProps.searchResultsContainer.searchResultsIdsChecked,
        nextProps.searchResultDetailsContainer.detailsID.id
      ) > -1;

    this.setState({
      isSelected,
      detailsData,
    });
    const { showTeacherMadeQuizError } = nextProps.searchResultDetailsContainer;
    if (showTeacherMadeQuizError) {
      this.props.showMessageLogModal({
        payloadData: <PopupModal />,
      });
    }
  }
  getDataArrayIndex = (resultSet, data) => {
    if (data.page === 'searchResults') {
      let matchingID = -1;
      resultSet.map((item, i) => (item.ID[0] === data.id[0] ? (matchingID = i) : ''));
      return matchingID;
    }
    const selectedItemData = this.props.searchResultsContainer.selectedItems;
    const curpos = selectedItemData.findIndex(x => x.ID[0] === data.id[0]);
    return curpos;
  };
  getSelecedDataArrayIndex = (resultSet, dataID) => {
    let matchingID = -1;
    resultSet.map((item, i) => (item[0] === dataID[0] ? (matchingID = i) : -1));
    return matchingID;
  };

  prevSerd(e) {
    const { data } = this.props;
    e.preventDefault();
    const selectedItemData = this.props.searchResultsContainer.selectedItems;
    let prevInd;
    if (this.props && this.props.data.page === 'searchResults') {
      const resultDetails =
        this.props.searchResultsContainer &&
        this.props.searchResultsContainer.searchResults &&
        this.props.searchResultsContainer.searchResults.results;
      if (this.state.currentIndex === 0) {
        prevInd = resultDetails.length - 1;
      } else {
        prevInd = this.state.currentIndex - 1;
      }
      const prevRow = resultDetails[prevInd];
      const prevID = prevRow.ID;
      this.props.getSearchResultDetailsDataRequest(prevID, data.teacherMadeQuiz);
      this.setState({ currentIndex: prevInd });
    } else {
      if (this.state.currentIndex === 0) {
        prevInd = selectedItemData.length - 1;
      } else {
        prevInd = this.state.currentIndex - 1;
      }
      const prevRow = selectedItemData[prevInd];
      const prevID = prevRow.ID;
      this.props.getSearchResultDetailsDataRequest(prevID, data.teacherMadeQuiz);
      this.setState({ currentIndex: prevInd });
    }
  }

  nextSerd(e) {
    const { data } = this.props;
    e.preventDefault();
    const selectedItemData = this.props.searchResultsContainer.selectedItems;
    let nextInd;
    if (this.props && this.props.data.page === 'searchResults') {
      if (
        this.state.currentIndex ===
        this.props.searchResultsContainer.searchResults.results.length - 1
      ) {
        nextInd = 0;
      } else {
        nextInd = this.state.currentIndex + 1;
      }
      const nextID = this.props.searchResultsContainer.searchResults.results[nextInd].ID;
      this.props.getSearchResultDetailsDataRequest(nextID, data.teacherMadeQuiz);
      this.setState({ currentIndex: nextInd });
    } else {
      if (this.state.currentIndex === selectedItemData.length - 1) {
        nextInd = 0;
      } else {
        nextInd = this.state.currentIndex + 1;
      }
      const nextID = selectedItemData[nextInd].ID;
      this.props.getSearchResultDetailsDataRequest(nextID, data.teacherMadeQuiz);
      this.setState({ currentIndex: nextInd });
    }
  }

  addcustomItem(e) {
    e.preventDefault();
    const searchResultsContainerselectedrows = this.props.searchResultsContainer.selectedItems;
    const searchResultsIdsChecked = this.props.searchResultsContainer.searchResultsIdsChecked;

    const cIndex = this.state.currentIndex;
    const resultDetails =
      this.props.searchResultsContainer &&
      this.props.searchResultsContainer.searchResults &&
      this.props.searchResultsContainer.searchResults.results;
    const curRow = resultDetails[cIndex];

    if (!this.state.isSelected) {
      searchResultsContainerselectedrows.push(curRow);
      searchResultsIdsChecked.push(this.props.searchResultDetailsContainer.detailsID.id);
    } else {
      const IndexIdsChecked = this.getSelecedDataArrayIndex(
        searchResultsIdsChecked,
        this.props.searchResultDetailsContainer.detailsID.id
      );
      searchResultsIdsChecked.splice(IndexIdsChecked, 1);
      searchResultsContainerselectedrows.splice(IndexIdsChecked, 1);
    }
    this.props.makeSelectedbookresults(searchResultsContainerselectedrows, searchResultsIdsChecked);
  }

  changeQuizData(e) {
    const changeName = e.target.name;
    const data = this.state.detailsData;
    if (e.target.validity.valid) {
      data[changeName] = e.target.value;
      this.setState({ detailsData: data, changedInputVal: true });
    } else {
      data[changeName] = '';
      this.setState({ detailsData: data, changedInputVal: true });
    }
  }

  changeFictionData(e, val) {
    const changeName = e.target.name;
    const data = this.state.detailsData;
    data[changeName] = val === 'non' ? '0' : '1';
    this.setState({ detailsData: data });
  }

  saveQuizData() {
    this.state.detailsData.ID = this.props.data.id;
    this.props.saveSearchResultDetailsDataRequest(
      this.state.detailsData,
      this.props.data.teacherMadeQuiz
    );
    this.setState({
      changedInputVal: false,
    });
  }

  saveTeacherMadeQuizData() {
    this.state.detailsData.ID = this.props.data.id;
    const { detailsData } = this.state;
    if (
      detailsData.WordCount !== '' &&
      detailsData.Lexile !== '' &&
      detailsData.ReadingLevel !== '' &&
      detailsData.Points !== '' &&
      detailsData.GRL !== ''
    ) {
      this.props.saveTeacherMadeQuizDataRequest(
        this.state.detailsData,
        this.props.data.teacherMadeQuiz
      );
    } else {
      if (detailsData.WordCount === '') {
        this.setState({
          changeWordCountClassName: true,
        });
      } else {
        this.setState({
          changeWordCountClassName: false,
        });
      }
      if (detailsData.ReadingLevel === '') {
        this.setState({
          changeReadingLevelClassName: true,
        });
      } else {
        this.setState({
          changeReadingLevelClassName: false,
        });
      }
      if (detailsData.Points === '') {
        this.setState({
          changePointsClassName: true,
        });
      } else {
        this.setState({
          changePointsClassName: false,
        });
      }
      if (detailsData.GRL === '') {
        this.setState({
          changeGRLClassName: true,
        });
      } else {
        this.setState({
          changeGRLClassName: false,
        });
      }
    }
  }

  render() {
    return (
      <div>
        <SearchResultDetails
          isOpen
          detailsData={this.state.detailsData}
          arrayIndex={0}
          hideModal={this.props.hideModal}
          prevSerd={this.prevSerd}
          nextSerd={this.nextSerd}
          changeQuizData={this.changeQuizData}
          changeFictionData={this.changeFictionData}
          isEditable={this.state.isEditable}
          saveQuizData={this.saveQuizData}
          isSelected={this.state.isSelected}
          removeSelItem={this.addcustomItem}
          addcustomItem={this.addcustomItem}
          saveTeacherMadeQuizData={this.saveTeacherMadeQuizData}
          data={this.props.data}
          changeWordCountClassName={this.state.changeWordCountClassName}
          changeReadingLevelClassName={this.state.changeReadingLevelClassName}
          changePointsClassName={this.state.changePointsClassName}
          changeGRLClassName={this.state.changeGRLClassName}
          changedInputVal={this.state.changedInputVal}
          profileUserType={this.props.profileUserType}
        />
      </div>
    );
  }
}
SearchResultDetailsContainer.defaultProps = {
  searchResultDetailsContainer: fromJS({}),
};
SearchResultDetailsContainer.propTypes = {
  getSearchResultDetailsDataRequest: PropTypes.func.isRequired,
  searchResultDetailsData: PropTypes.object,
  searchResultDetailsContainer: PropTypes.object,
  searchResultsContainer: PropTypes.object,
  data: PropTypes.object,
  hideModal: PropTypes.func,
  saveSearchResultDetailsDataRequest: PropTypes.func.isRequired,
  saveTeacherMadeQuizDataRequest: PropTypes.func.isRequired,
  makeSelectedbookresults: PropTypes.func.isRequired,
  showMessageLogModal: PropTypes.func,
  profileUserType: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  searchResultDetailsContainer: makeSelectSearchResultDetailsContainer(),
  searchResultsContainer: makeSelectSearchResultsContainer(),
  profileUserType: makeSelectProfileUserType(),
});

export function mapDispatchToProps(dispatch) {
  return {
    hideModal: () => dispatch(hideModal()),
    showMessageLogModal: data => dispatch(showMessageLogModal(data)),
    makeSelectedbookresults: (selectedrows, searchResultsIdsChecked) =>
      dispatch(makeSelectedbookresults(selectedrows, searchResultsIdsChecked)),
    getSearchResultDetailsDataRequest: (data, id) =>
      dispatch(getSearchResultDetailsDataRequest(data, id)),
    saveSearchResultDetailsDataRequest: (data, id) =>
      dispatch(saveSearchResultDetailsDataRequest(data, id)),
    saveTeacherMadeQuizDataRequest: (data, flag) =>
      dispatch(saveTeacherMadeQuizDataRequest(data, flag)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'searchResultDetailsContainer', reducer });
const withSaga = injectSaga({ key: 'searchResultDetailsContainer', saga });

export default compose(withReducer, withSaga, withConnect)(SearchResultDetailsContainer);
