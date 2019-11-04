/**
 *
 * SearchResultDetails
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';
import { USER_TYPE } from 'containers/App/constants';
import './SearchResultDetails.scss';

class SearchResultDetails extends React.Component {
  render() {
    const {
      isOpen,
      detailsData,
      prevSerd,
      nextSerd,
      hideModal,
      changeQuizData,
      saveQuizData,
      changeFictionData,
      saveTeacherMadeQuizData,
      isSelected,
      removeSelItem,
      addcustomItem,
      data,
      changeWordCountClassName,
      changeReadingLevelClassName,
      changePointsClassName,
      changeGRLClassName,
      changedInputVal,
    } = this.props;

    const rowClass =
      detailsData.Title && String(detailsData.Title).length <= 12
        ? 'search-result-details-row-2'
        : 'search-result-details-row';

    const lexileVal =
      detailsData.Lexile && detailsData.Lexile[0] === ''
        ? detailsData.LexileDisplay[0]
        : detailsData.Lexile;
    const teacherLogin = this.props.profileUserType === USER_TYPE.Teacher;
    const adminLogin = this.props.profileUserType === USER_TYPE.Administrator;
    const renderLibraryCopies = () => {
      if (!teacherLogin || this.props.data.page === 'customList') {
        return (
          <input
            type="text"
            id="srd2"
            className="library-copy__input"
            value={detailsData.LibraryCopies || ''}
            name="LibraryCopies"
            onChange={event => changeQuizData(event)}
            maxLength="3"
            pattern="[0-9]*"
          />
        );
      }
      return detailsData.LibraryCopies;
    };
    const renderQuizData = () => {
      if (!teacherLogin || this.props.data.page === 'customList') {
        return (
          <input
            type="text"
            id="srd1"
            className="library-copy__input"
            value={detailsData.QuizPointValue || ''}
            name="QuizPointValue"
            onChange={event => changeQuizData(event)}
            maxLength="3"
            pattern="[0-9]*"
          />
        );
      }
      return detailsData.QuizPointValue;
    };

    const renderAddRemoveCustomListBtn = () => {
      if (isSelected === true) {
        return (
          <a onClick={removeSelItem} href="button" className="ser-left-txt">
            Remove from Custom list
          </a>
        );
      }
      return (
        <a onClick={addcustomItem} href="button" className="ser-left-txt">
          Add to Custom list
        </a>
      );
    };

    const renderPreviousNextBtn = () => (
      <div className="ser-links">
        <a onClick={prevSerd} className="previous" href="">
          {' '}
          Previous{''}
        </a>
        &nbsp;&nbsp;
        <a href="" onClick={nextSerd} className="next">
          {''}
          Next{''}
        </a>
      </div>
    );
    const renderSaveButton = quizType => (
      <SAMButton
        isPrimaryButton
        id="onclick_save"
        onClickHandler={event =>
          quizType === 'teacherMade' ? saveTeacherMadeQuizData(event) : saveQuizData(event)
        }
      >
        Save
      </SAMButton>
    );

    const renderDetailsFooter = quizType => (
      <div>
        {data.page === 'searchResults' && (
          <div className="ser-left-txt"> {renderAddRemoveCustomListBtn()} </div>
        )}
        <div className="search-result-close-button">
          <SAMButton onClickHandler={hideModal}>Close</SAMButton>
          {quizType === 'teacherMade'
            ? (adminLogin || this.props.data.page === 'customList') && renderSaveButton(quizType)
            : (!teacherLogin || this.props.data.page === 'customList') &&
              renderSaveButton(quizType)}
        </div>
      </div>
    );

    const renderWordCount = () => {
      if (adminLogin || this.props.data.page === 'customList') {
        return (
          <input
            className="word-count__input"
            type="text"
            id="words"
            value={detailsData.WordCount || ''}
            name="WordCount"
            onChange={event => changeQuizData(event)}
            pattern="[0-9]*"
          />
        );
      }
      return detailsData.WordCount;
    };
    const renderLexileLevel = () => {
      if (adminLogin || this.props.data.page === 'customList') {
        return (
          <input
            className="word-count__input"
            type="text"
            id="lexile"
            value={lexileVal}
            name="Lexile"
            onChange={event => changeQuizData(event)}
            pattern="[0-9]*"
          />
        );
      }
      return lexileVal;
    };
    const renderReadingLevel = () => {
      if (adminLogin || this.props.data.page === 'customList') {
        return (
          <input
            className="word-count__input"
            type="text"
            id="readingLevel"
            value={detailsData.ReadingLevel || ''}
            name="ReadingLevel"
            onChange={event => changeQuizData(event)}
            pattern="[0-9]*"
          />
        );
      }
      return detailsData.ReadingLevel;
    };
    const renderPoints = () => {
      if (adminLogin || this.props.data.page === 'customList') {
        return (
          <input
            className="word-count__input"
            type="text"
            id="points"
            value={detailsData.Points || ''}
            name="Points"
            onChange={event => changeQuizData(event)}
            pattern="[0-9]*"
          />
        );
      }
      return detailsData.Points;
    };
    const renderGRL = () => {
      if (adminLogin || this.props.data.page === 'customList') {
        return (
          <input
            className="word-count__input"
            type="text"
            id="GRL"
            value={detailsData.GRL || ''}
            name="GRL"
            onChange={event => changeQuizData(event)}
            pattern="[A-Za-z]*"
          />
        );
      }
      return detailsData.GRL;
    };
    return (
      <div>
        {data.teacherMadeQuiz[0] === 'true' ? (
          <SAMModal
            isOpen={isOpen}
            contentLabel="Book Info"
            modalClassModifier="modal--searchresult-form"
          >
            <div>
              <div className="ser-title-row">
                <div className="ser-modal-title"> Teacher-Made Quiz Info</div>
                {renderPreviousNextBtn()}
              </div>
              {changeWordCountClassName ||
              changeReadingLevelClassName ||
              changePointsClassName ||
              changeGRLClassName ? (
                <div className="empty-fields__warning">Please fill in missing fields.</div>
              ) : (
                ''
              )}
              <div className="search-result-details-row-content">
                <div className="search-result-details-row-content-one">
                  <div className="search-result-details-row-content-one-data">
                    <div className={rowClass}>
                      <div className="search-result-details-label-teacher__made">Title:</div>
                      <div className="search-result-details-text"> {detailsData.Title}</div>
                    </div>

                    <div className="search-result-details-row">
                      <div className="search-result-details-label-teacher__made">
                        Author First Name:
                      </div>
                      <div className="search-result-details-text">
                        {detailsData &&
                          detailsData.Author &&
                          detailsData.Author[0] &&
                          detailsData.Author[0].FirstName}
                      </div>
                    </div>
                    <div className="search-result-details-row">
                      <div className="search-result-details-label-teacher__made">
                        Author Last Name:
                      </div>
                      <div className="search-result-details-text">
                        {detailsData &&
                          detailsData.Author &&
                          detailsData.Author[0] &&
                          detailsData.Author[0].LastName}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="search-result-details-row-content-bg-width">
                  <div className="search-result-details-row-content-bg-width-data">
                    <div className="search-result-details-row">
                      <div
                        className={
                          changeWordCountClassName
                            ? 'label-word-count__warning'
                            : 'search-result-details-label-teacher__made'
                        }
                      >
                        Number of Words:
                      </div>
                      <div className="search-result-details-text-botom-box">
                        {renderWordCount()}
                      </div>
                    </div>
                    <div className="search-result-details-row">
                      <div className="search-result-details-label-teacher__made">Lexile Level:</div>
                      <div className="search-result-details-text-botom-box">
                        {renderLexileLevel()}
                      </div>
                    </div>
                    <div className="search-result-details-row">
                      <div
                        className={
                          changeReadingLevelClassName
                            ? 'label-rl-warning'
                            : 'search-result-details-label-teacher__made'
                        }
                      >
                        Reading Level:
                      </div>
                      <div className="search-result-details-text-botom-box">
                        {renderReadingLevel()}
                      </div>
                    </div>
                    <div className="search-result-details-row">
                      <div
                        className={
                          changePointsClassName
                            ? 'label-points__warning'
                            : 'search-result-details-label-teacher__made'
                        }
                      >
                        <span className="txt-right"> Points:</span>
                      </div>
                      <div className="search-result-details-text-botom-box">{renderPoints()}</div>
                    </div>
                    <div className="search-result-details-row">
                      <div
                        className={
                          changeGRLClassName
                            ? 'label-grl-warning'
                            : 'search-result-details-label-teacher__made'
                        }
                      >
                        GRL:
                      </div>
                      <div className="search-result-details-text-botom-box">{renderGRL()}</div>
                    </div>
                  </div>
                  <div className="search-result-details-row fiction">
                    <div className="search-result-details-label-teacher__made">Type:</div>
                    <div className="search-result-details-text-botom-box-radio">
                      <input
                        type="radio"
                        id="fiction"
                        name="IsFiction"
                        className="is-fiction"
                        checked={detailsData.IsFiction && detailsData.IsFiction[0] === '1'}
                        onChange={event => changeFictionData(event, 'fiction')}
                        disabled={!adminLogin && this.props.data.page === 'searchResults'}
                      />
                      Fiction
                    </div>
                  </div>
                  <div className="search-result-details-row non-fiction">
                    <div className="search-result-details-label-teacher__made" />
                    <div className="search-result-details-text-botom-box">
                      <input
                        type="radio"
                        id="non-fiction"
                        name="IsFiction"
                        className="is-non-fiction"
                        checked={detailsData.IsFiction && detailsData.IsFiction[0] === '0'}
                        onChange={event => changeFictionData(event, 'non')}
                        disabled={!adminLogin && this.props.data.page === 'searchResults'}
                      />
                      Non Fiction
                    </div>
                  </div>
                  {(adminLogin || this.props.data.page === 'customList') && (
                    <p className="save-message__quiz">Click Save to update the SAM database.</p>
                  )}
                </div>
              </div>
              <div className="search-result-details-row-content-bot">
                {renderDetailsFooter('teacherMade')}
              </div>
            </div>
          </SAMModal>
        ) : (
          <SAMModal
            isOpen={isOpen}
            contentLabel="Book Info"
            modalClassModifier="modal--searchresult-form-no-teacher"
          >
            <div className="">
              <div className="ser-title-row">
                <div className="ser-modal-title"> Book Info</div>
                {renderPreviousNextBtn()}
              </div>

              <div className="search-result-details-row-content-two">
                <div className="search-result-details-row">
                  <div className="search-result-details-label">Title:</div>
                  <div className="search-result-details-text"> {detailsData.Title}</div>
                </div>

                <div className="search-result-details-row">
                  <div className="search-result-details-label">Author:</div>
                  <div className="search-result-details-text">{detailsData.Author}</div>
                </div>
                <div className="search-result-details-row">
                  <div className="search-result-details-label">Lexile:</div>
                  <div className="search-result-details-text">{lexileVal}</div>
                </div>
                <div className="search-result-details-row">
                  <div className="search-result-details-label">Points:</div>
                  <div className="search-result-details-text">{detailsData.Points} </div>
                </div>
                <div className="search-result-details-row">
                  <div className="search-result-details-label">Reading Level:</div>
                  <div className="search-result-details-text">{detailsData.ReadingLevel} </div>
                </div>
                <div className="search-result-details-row">
                  <div className="search-result-details-label">GRL:</div>
                  <div className="search-result-details-text">{detailsData.GRL} </div>
                </div>
                <div className="search-result-details-row">
                  <div className="search-result-details-label">Language:</div>
                  <div className="search-result-details-text">{detailsData.Language} </div>
                </div>
                <div className="search-result-details-row">
                  <div className="search-result-details-label">Word Count:</div>
                  <div className="search-result-details-text">{detailsData.WordCount} </div>
                </div>
                <div className="search-result-details-row">
                  <div className="search-result-details-label">Interest Level:</div>
                  <div className="search-result-details-text">{detailsData.InterestLevel} </div>
                </div>
                <div className="search-result-details-row">
                  <div className="search-result-details-label">Award:</div>
                  <div className="search-result-details-text">{detailsData.Award} </div>
                </div>
                <div className="search-result-details-row">
                  <div className="search-result-details-label">Comprehension Skill:</div>
                  <div className="search-result-details-text">
                    {detailsData.ComprehensionSkill}{' '}
                  </div>
                </div>
                <div className="search-result-details-row">
                  <div className="search-result-details-label">Culture:</div>
                  <div className="search-result-details-text">{detailsData.Culture} </div>
                </div>
                <div className="search-result-details-row">
                  <div className="search-result-details-label">Genre:</div>
                  <div className="search-result-details-text">{detailsData.Genre} </div>
                </div>
                <div className="search-result-details-row">
                  <div className="search-result-details-label">Program/Series:</div>
                  <div className="search-result-details-text">{detailsData.ProgramSeries} </div>
                </div>
                <div className="search-result-details-row">
                  <div className="search-result-details-label">Theme:</div>
                  <div className="search-result-details-text">{detailsData.Themes} </div>
                </div>
                <div className="search-result-details-row">
                  <div className="search-result-details-label">Topic:</div>
                  <div className="search-result-details-text">{detailsData.Topics} </div>
                </div>
                <div className="search-result-details-row">
                  <div className="search-result-details-label">Description:</div>
                  <div className="search-result-details-text">{detailsData.Description} </div>
                </div>
              </div>

              <div className="search-result-details-row-content-bg">
                <div className="search-result-details-row">
                  <div className="search-result-details-label">Number of Library Copies:</div>
                  <div className="search-result-details-text">{renderLibraryCopies()}</div>
                </div>
                <div className="search-result-details-row">
                  <div className="search-result-details-label">
                    <span className="txt-right"> Edit Quiz point value:</span>
                  </div>
                  <div className="search-result-details-text">
                    {renderQuizData()}{' '}
                    {(!teacherLogin || this.props.data.page === 'customList') &&
                      '(Authorized users only)'}
                  </div>
                </div>
                {changedInputVal ? (
                  <p className="save-message__quiz">Click Save to update the SAM Database.</p>
                ) : (
                  ''
                )}
              </div>
              <div className="search-result-details-row-content-bot">
                {renderDetailsFooter('nonTeacherMade')}
              </div>
            </div>
          </SAMModal>
        )}
      </div>
    );
  }
}

SearchResultDetails.defaultProps = {
  isOpen: false,
};

SearchResultDetails.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
  detailsData: PropTypes.object,
  prevSerd: PropTypes.func,
  nextSerd: PropTypes.func,
  changeQuizData: PropTypes.func,
  changeFictionData: PropTypes.func,
  saveQuizData: PropTypes.func,
  saveTeacherMadeQuizData: PropTypes.func,
  data: PropTypes.object,
  isSelected: PropTypes.bool.isRequired,
  removeSelItem: PropTypes.func.isRequired,
  addcustomItem: PropTypes.func.isRequired,
  changeWordCountClassName: PropTypes.bool.isRequired,
  changeReadingLevelClassName: PropTypes.bool.isRequired,
  changePointsClassName: PropTypes.bool.isRequired,
  changeGRLClassName: PropTypes.bool.isRequired,
  changedInputVal: PropTypes.bool,
  profileUserType: PropTypes.string,
};

export default SearchResultDetails;
