import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import LoadingBar from 'components/LoadingBar';
import SAMLinkButton from 'components/SAMLinkButton';
import SAMButton from 'components/SAMButton';
import SAMTable from 'components/SAMTable';
import Pagination from 'react-js-pagination';
import SettingsSelectBox from 'components/SettingsSelectBox';

class TabQuizScoreRecordingTool extends Component {
  constructor() {
    super();
    this.state = {
      term: 'Title',
      order: 'asc',
      name: null,
      currentPage: 1,
    };
  }

  componentWillUnmount = () => {
    this.props.clearSearchedQuizzes();
  };

  columns = [
    {
      Header: () => <span onChange={this.handleChange}>Date</span>,
      id: 'date',
      accessor: 'date',
      width: 107,
    },
    {
      Header: () => <span onChange={this.handleChange}>Title</span>,
      id: 'title',
      accessor: 'title',
      width: 78,
    },
    {
      Header: () => <span onChange={this.handleChange}>Lexile&#174;</span>,
      id: 'lexile',
      accessor: 'lexile',
      width: 78,
    },
    {
      Header: () => <span onChange={this.handleChange}>RL</span>,
      id: 'rl',
      accessor: 'rl',
      width: 52,
    },
    {
      Header: () => <span onChange={this.handleChange}># Correct</span>,
      id: '# Correct',
      accessor: '# Correct',
      width: 100,
    },
    {
      Header: () => <span onChange={this.handleChange}># Questions</span>,
      id: '# Questions',
      accessor: '# Questions',
      width: 110,
    },
    {
      Header: () => <span onChange={this.handleChange}>Points</span>,
      id: 'points',
      accessor: 'points',
      width: 78,
    },
    {
      Header: () => <span onChange={this.handleDelete} />,
      id: 'remove',
      accessor: 'remove',
      width: 137,
    },
  ];

  newQuizColumns = [
    {
      Header: () => <span onChange={this.handleChange}>Title</span>,
      id: 'title',
      accessor: 'title',
      width: 180,
    },
    {
      Header: () => <span onChange={this.handleChange}>Author</span>,
      id: 'author',
      accessor: 'author',
      width: 180,
    },
    {
      Header: () => <span onChange={this.handleChange}>Lexile&#174;</span>,
      id: 'lexile',
      accessor: 'lexile',
      width: 95,
    },
    {
      Header: () => <span onChange={this.handleChange}>RL</span>,
      id: 'rl',
      accessor: 'rl',
      width: 95,
    },
    {
      Header: () => <span onChange={this.handleChange}>Points</span>,
      id: 'points',
      accessor: 'points',
      width: 95,
    },
    {
      Header: () => <span onChange={this.handleChange} />,
      id: 'remove',
      accessor: 'remove',
      width: 95,
    },
  ];

  handleChange = e => {
    if (e.target.type === 'text') {
      const newName = e.target.value;
      return this.setState({ name: newName });
    }
    const newTerm = e.target.value;
    return this.setState({ term: newTerm });
  };

  handlePageChange = newPageNumber => {
    const curPg = newPageNumber - 1;
    this.setState({ currentPage: newPageNumber }, () => {
      this.handleQuizSearch(curPg);
    });
  };

  handleQuizSearch = curPg => {
    const { term, order, name } = this.state;
    this.props.searchForQuizzesToAdd(term, order, name, curPg);
  };

  cancelOrSave = option => {
    const { saveRemovedQuizzesRequest, unIsolateTab, quizzesToRemove } = this.props;
    if (option === 'Save') {
      saveRemovedQuizzesRequest(quizzesToRemove);
    }
    unIsolateTab();
  };

  renderRemoveQuizScore = id => (
    <button
      id={id}
      className="src-quiz-remove_button"
      onClick={() => {
        this.removeQuizScore(id);
      }}
    >
      Remove
    </button>
  );

  renderSelectOptionsSearchTerms = () => (
    <Fragment>
      <option value="Title">Title</option>
      <option value="Author">Author</option>
    </Fragment>
  );

  renderLowestItemNum = () => {
    const { paginationData } = this.props;
    const lowestNumber = parseInt(paginationData.current_page, 10) * 250 + 1;
    return lowestNumber;
  };

  renderHighestItemNum = () => {
    const { paginationData, itemCount } = this.props;
    const highestNumber = parseInt(paginationData.current_page, 10) * 250 + 250;
    if (parseInt(itemCount, 10) < highestNumber) {
      return itemCount;
    }
    return highestNumber;
  };

  render() {
    const {
      profileInfo,
      scoreData,
      quizSearchData,
      isolateTab,
      paginationData,
      itemCount,
      saveRemovedQuizzesRequest,
      quizzesToRemove,
      isLoading,
    } = this.props;
    if (isLoading) {
      return <LoadingBar />;
    }
    return (
      <div className="src-quiz-score__recording-tool-content">
        <span className="quiz-score__instruction-text"> Quiz History for </span>
        <span className="quiz-score__user-name">
          {profileInfo.first_name} {profileInfo.last_name}
        </span>
        <SAMTable
          className="src-quiz-hisory__table"
          columns={this.columns}
          data={scoreData}
          pageSize={scoreData.length}
          hasCheckboxes={false}
        />
        <span className="quiz-score__instruction-text">Add a New Quiz Score</span>
        <div className="quiz-score__search-quizzes-container">
          <span className="quiz-score__search-quizzes-instruction">Search quizzes by</span>
          <SettingsSelectBox
            fieldClass="quiz-score__search-quizzes-dropdown"
            fieldValue={this.state.term}
            onChange={this.handleChange}
            className="quiz-score__search-quizzes-dropdown"
          >
            {this.renderSelectOptionsSearchTerms()}
          </SettingsSelectBox>
          <span className="quiz-score__search-quizzes-instruction">for</span>
          <input
            type="text"
            className="quiz-score__search-quizzes-input"
            onChange={this.handleChange}
          />
          <button
            type="button"
            className="quiz-score__search-quizzes-btn"
            onClick={() => {
              this.handleQuizSearch(0);
            }}
          >
            GO
          </button>
          {itemCount === '-1' ? (
            <div className="quiz-score__page-item-count">Items 0 - 0 of 0</div>
          ) : (
            <div className="quiz-score__page-item-count">
              Items {this.renderLowestItemNum()} - {this.renderHighestItemNum()} of {itemCount}
            </div>
          )}
        </div>
        <SAMTable
          className="quiz-score__table"
          columns={this.newQuizColumns}
          data={quizSearchData}
          pageSize={quizSearchData.length}
          hasCheckboxes={false}
        />
        {itemCount === '-1' ? (
          <div className="empty-area__pagination" />
        ) : (
          <div className="area__pagination">
            <Pagination
              activePage={this.state.currentPage}
              firstPageText="first"
              itemsCountPerPage={parseInt(paginationData.items_per_page, 10)}
              lastPageText="last"
              nextPageText="next"
              onChange={this.handlePageChange}
              pageRangeDisplayed={10}
              prevPageText="prev"
              totalItemsCount={parseInt(itemCount, 10)}
            />
          </div>
        )}
        {isolateTab ? (
          <div className="quiz-score__button-container">
            <SAMButton
              id="cancel"
              buttonClassModifier="quiz-score__cancel-button-isolate"
              onClickHandler={() => {
                this.cancelOrSave('Cancel');
              }}
            >
              Cancel
            </SAMButton>
            <SAMLinkButton
              to="/roster"
              id="cancelAndReturn"
              buttonClassModifier="quiz-score__cancel-return-button-isolate"
            >
              Cancel & Return
            </SAMLinkButton>
            <SAMButton
              id="save"
              buttonClassModifier="quiz-score__save-button-isolate"
              onClickHandler={() => {
                this.cancelOrSave('Save');
              }}
            >
              Save
            </SAMButton>
            <SAMLinkButton
              to="/roster"
              id="saveAndReturn"
              buttonClassModifier="quiz-score__save-return-button-isolate"
              onClickHandler={() => {
                saveRemovedQuizzesRequest(quizzesToRemove);
              }}
            >
              Save & Return
            </SAMLinkButton>
          </div>
        ) : (
          <SAMLinkButton
            to="/roster"
            id="cancelAndReturn"
            buttonClassModifier="quiz-score__cancel-button"
          >
            Cancel & Return
          </SAMLinkButton>
        )}
      </div>
    );
  }
}

TabQuizScoreRecordingTool.defaultProps = {
  scoreData: [],
  quizSearchData: [],
};

TabQuizScoreRecordingTool.propTypes = {
  profileInfo: PropTypes.object.isRequired,
  scoreData: PropTypes.array.isRequired,
  quizSearchData: PropTypes.array.isRequired,
  searchForQuizzesToAdd: PropTypes.func.isRequired,
  clearSearchedQuizzes: PropTypes.func.isRequired,
  isolateTab: PropTypes.bool.isRequired,
  paginationData: PropTypes.object,
  itemCount: PropTypes.string,
  saveRemovedQuizzesRequest: PropTypes.func.isRequired,
  unIsolateTab: PropTypes.func.isRequired,
  quizzesToRemove: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default TabQuizScoreRecordingTool;
