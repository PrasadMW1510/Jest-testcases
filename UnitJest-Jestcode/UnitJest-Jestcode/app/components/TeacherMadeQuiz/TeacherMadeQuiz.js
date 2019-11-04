/**
 *
 * TeacherMadeQuiz
 *
 **/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';
import TeacherMadeQuizQuestions from 'components/TeacherMadeQuizQuestions';
import TeacherMadeQuizList from 'components/TeacherMadeQuizList';
import { USER_TYPE } from 'containers/App/constants';
import './TeacherMadeQuiz.scss';

class TeacherMadeQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        teacherMadeQuizTitle: ``,
        teacherMadeQuizAuthorFirstName: ``,
        teacherMadeQuizAuthorLastName: ``,
        teacherMadeQuizNumberOfWords: ``,
        teacherMadequizLexileLevel: ``,
        teacherMadequizReadingLevel: ``,
        teacherMadequizPoints: ``,
        teacherMadequizGRL: ``,
        teacherMadequizType: ``,
      },
      questions: [],
      errors: {},
      createQuiz: false,
      createQuizEmpty: true,
      warningModal: false,
      readingLevelValid: false,
      deleteWarningModal: false,
      quizId: '',
    };
  }
  componentWillReceiveProps(newProps) {
    if (
      newProps &&
      newProps.teacherMadeQuizContainer &&
      newProps.teacherMadeQuizContainer.installedQuizQuestionList &&
      newProps.teacherMadeQuizContainer.installedQuizQuestionList.Title
    ) {
      this.setState({
        profile: {
          teacherMadeQuizTitle:
            newProps.teacherMadeQuizContainer.installedQuizQuestionList.Title[0],
          teacherMadeQuizAuthorFirstName:
            newProps.teacherMadeQuizContainer.installedQuizQuestionList.Author[0].FirstName[0],
          teacherMadeQuizAuthorLastName:
            newProps.teacherMadeQuizContainer.installedQuizQuestionList.Author[0].LastName[0],
          teacherMadeQuizNumberOfWords:
            newProps.teacherMadeQuizContainer.installedQuizQuestionList.WordCount[0],
          teacherMadequizLexileLevel:
            newProps.teacherMadeQuizContainer.installedQuizQuestionList.Lexile[0],
          teacherMadequizReadingLevel:
            newProps.teacherMadeQuizContainer.installedQuizQuestionList.ReadingLevel[0],
          teacherMadequizPoints:
            newProps.teacherMadeQuizContainer.installedQuizQuestionList.Points[0],
          teacherMadequizGRL: newProps.teacherMadeQuizContainer.installedQuizQuestionList.GRL[0],
          teacherMadequizType:
            newProps.teacherMadeQuizContainer.installedQuizQuestionList.IsFiction[0],
        },
      });
    }
  }
  onChange = e => {
    const item = this.state.profile;
    item[e.target.name] = e.target.value;
    this.setState(item);
  };
  onChangeToUpper = e => {
    const item = this.state.profile;
    const chkString = e.target.validity.valid ? e.target.value : item[e.target.name];
    item[e.target.name] = chkString.toUpperCase();
    this.setState(item);
  };
  onchangeQuestions = (event, itrVal) => {
    const field = event.target.name;
    const value = event.target.value;
    const items = this.state.questions;
    if (field === 'Question') {
      items[itrVal][field] = value;
    } else {
      items[itrVal].Answers[field] = value;
    }
    this.setState({
      items,
    });
  };
  onChangeNumber = e => {
    const item = this.state.profile;
    const chkNumber = e.target.validity.valid ? e.target.value : item[e.target.name];
    item[e.target.name] = chkNumber;
    this.setState(item);
  };
  getPoints = () => {
    if (
      this.state.profile.teacherMadeQuizNumberOfWords &&
      this.state.profile.teacherMadequizLexileLevel
    ) {
      this.calcPointsVal();
    } else {
      this.setState({
        warningModal: true,
      });
    }
  };

  readingLevelModalClose = () => {
    this.setState({ readingLevelValid: false });
  };

  checkReadingLevel = () => {
    if (this.state.profile.teacherMadequizReadingLevel > 999) {
      this.setState({ readingLevelValid: true });
      return false;
    }
    return true;
  };

  handleValidation = () => {
    const errorsObj = {};
    let formIsValid = true;
    if (!this.state.profile.teacherMadeQuizTitle) {
      formIsValid = false;
      errorsObj.title = 'Cannot be empty';
    }
    if (!this.state.profile.teacherMadeQuizAuthorFirstName) {
      formIsValid = false;
      errorsObj.firstName = 'Cannot be empty';
    }
    if (!this.state.profile.teacherMadeQuizAuthorLastName) {
      formIsValid = false;
      errorsObj.lastName = 'Cannot be empty';
    }
    if (!this.state.profile.teacherMadequizLexileLevel) {
      formIsValid = false;
      errorsObj.lexical = 'Cannot be empty';
    }
    if (!this.state.profile.teacherMadequizReadingLevel) {
      formIsValid = false;
      errorsObj.reading = 'Cannot be empty';
    } else if (!this.checkReadingLevel()) {
      formIsValid = false;
      errorsObj.reading = 'Reading Value should be less that 1000';
    }
    if (!this.state.profile.teacherMadequizGRL) {
      formIsValid = false;
      errorsObj.grl = 'Cannot be empty';
    }
    if (this.state.profile.teacherMadequizPoints === '') {
      formIsValid = false;
      errorsObj.points = 'Cannot be empty';
    }

    if (!this.state.profile.teacherMadeQuizNumberOfWords) {
      formIsValid = false;
      errorsObj.wordcount = 'Cannot be empty';
    }
    if (!this.state.profile.teacherMadequizType) {
      formIsValid = false;
      errorsObj.type = 'Cannot be empty';
    }
    this.setState({ errors: errorsObj });
    return formIsValid;
  };
  handleSave = e => {
    if (e) {
      e.preventDefault();
    }

    if (this.handleValidation()) {
      const payload = {
        SrcQuizReq: {
          Book: {
            Title: this.state.profile.teacherMadeQuizTitle,
            Author: {
              FirstName: this.state.profile.teacherMadeQuizAuthorFirstName,
              LastName: this.state.profile.teacherMadeQuizAuthorLastName,
            },
            Lexile: this.state.profile.teacherMadequizLexileLevel,
            ReadingLevel: this.state.profile.teacherMadequizReadingLevel,
            GRL: this.state.profile.teacherMadequizGRL,
            WordCount: this.state.profile.teacherMadeQuizNumberOfWords,
            Points: this.state.profile.teacherMadequizPoints,
            IsFiction: this.state.profile.teacherMadequizType,
            Copies: '0',
            Quiz: {
              TestItem: [],
            },
          },
        },
      };

      if (this.state.quizId) {
        payload.SrcQuizReq.Book.Quiz.QuizID = this.state.quizId;
      }

      this.state.questions.map(item => {
        const question = {};
        question.Question = item.Question;
        question.Answers = {};
        question.Answers.CorrectAnswer = item.Answers.CorrectAnswer;
        question.Answers.IncorrectAnswer1 = item.Answers.IncorrectAnswer1;
        question.Answers.IncorrectAnswer2 = item.Answers.IncorrectAnswer2;
        question.Answers.IncorrectAnswer3 = item.Answers.IncorrectAnswer3;
        payload.SrcQuizReq.Book.Quiz.TestItem.push(question);
        return true;
      });
      this.props.handleSave(payload);
      this.setState({
        createQuizEmpty: true,
        createQuiz: false,
      });
    } else if (e === undefined) {
      this.setState({
        createQuiz: false,
        createQuizEmpty: false,
      });
    }
  };

  handleOptionChange = e => {
    this.setState({
      profile: {
        teacherMadequizType: e.target.value,
        teacherMadequizPoints: this.state.profile.teacherMadequizPoints,
        teacherMadeQuizTitle: this.state.profile.teacherMadeQuizTitle,
        teacherMadeQuizAuthorFirstName: this.state.profile.teacherMadeQuizAuthorFirstName,
        teacherMadeQuizAuthorLastName: this.state.profile.teacherMadeQuizAuthorLastName,
        teacherMadeQuizNumberOfWords: this.state.profile.teacherMadeQuizNumberOfWords,
        teacherMadequizLexileLevel: this.state.profile.teacherMadequizLexileLevel,
        teacherMadequizReadingLevel: this.state.profile.teacherMadequizReadingLevel,
        teacherMadequizGRL: this.state.profile.teacherMadequizGRL,
      },
    });
  };

  createNewQuestion = e => {
    e.preventDefault();
    this.setState({
      createQuiz: true,
      createQuizEmpty: false,
    });
  };

  createNewQuiz = e => {
    e.preventDefault();
    this.setState({
      createQuiz: false,
      profile: {
        teacherMadeQuizTitle: `New Quiz`,
        teacherMadeQuizAuthorFirstName: ``,
        teacherMadeQuizAuthorLastName: ``,
        teacherMadeQuizNumberOfWords: ``,
        teacherMadequizLexileLevel: ``,
        teacherMadequizReadingLevel: ``,
        teacherMadequizPoints: ``,
        teacherMadequizGRL: ``,
        teacherMadequizType: ``,
      },
      questions: [],
      createQuizEmpty: false,
    });
  };

  createNewQuizFromQues = (e, val) => {
    e.preventDefault();
    this.setState({
      createQuiz: false,
      questions: val,
    });
  };

  warningModalClose = () => {
    this.setState({
      warningModal: false,
    });
  };

  updateIncrementalState = () => {
    this.setState({
      questions: [
        ...this.state.questions,
        {
          Question: ``,
          Answers: {
            CorrectAnswer: ``,
            IncorrectAnswer1: ``,
            IncorrectAnswer2: ``,
            IncorrectAnswer3: ``,
          },
        },
      ],
    });
  };
  updateInititalState = val => {
    this.setState({
      questions: val,
    });
  };
  deleteQuestion = itr => {
    const qsArr = this.state.questions;
    qsArr.splice(itr, 1);
    if (itr === 0) {
      this.setState({
        questions: qsArr,
        createQuiz: false,
        createQuizEmpty: false,
      });
    } else {
      this.setState({
        questions: qsArr,
      });
    }
  };
  deleteWarning = () => {
    this.setState({
      deleteWarningModal: true,
    });
  };
  deleteModalClose = () => {
    this.setState({
      deleteWarningModal: false,
    });
  };
  loadQuiz = key => {
    this.setState({
      createQuiz: false,
      createQuizEmpty: false,
      quizId: key,
      errors: {},
    });
    this.props.loadQuizDetails(key);
    this.setState({ questions: [] });
  };
  calcPointsVal = () => {
    const pointsVal = Math.round(
      this.state.profile.teacherMadequizLexileLevel /
        100 *
        (this.state.profile.teacherMadeQuizNumberOfWords / 50000)
    );
    this.setState({
      profile: {
        teacherMadequizPoints: pointsVal,
        teacherMadeQuizTitle: this.state.profile.teacherMadeQuizTitle,
        teacherMadeQuizAuthorFirstName: this.state.profile.teacherMadeQuizAuthorFirstName,
        teacherMadeQuizAuthorLastName: this.state.profile.teacherMadeQuizAuthorLastName,
        teacherMadeQuizNumberOfWords: this.state.profile.teacherMadeQuizNumberOfWords,
        teacherMadequizLexileLevel: this.state.profile.teacherMadequizLexileLevel,
        teacherMadequizReadingLevel: this.state.profile.teacherMadequizReadingLevel,
        teacherMadequizGRL: this.state.profile.teacherMadequizGRL,
        teacherMadequizType: this.state.profile.teacherMadequizType,
      },
    });
  };
  submitFromQuestion = () => {
    this.handleSave();
  };

  deleteQuiz = () => {
    this.props.deleteQuiz(this.state.quizId);
    this.setState({
      createQuizEmpty: true,
      createQuiz: false,
      deleteWarningModal: false,
    });
  };

  render = () => {
    let questionCount = 0;
    if (
      this.props.teacherMadeQuizContainer.installedQuizQuestionList &&
      this.props.teacherMadeQuizContainer.installedQuizQuestionList.Quiz &&
      this.props.teacherMadeQuizContainer.installedQuizQuestionList.Quiz[0].TestItem
    ) {
      questionCount = this.props.teacherMadeQuizContainer.installedQuizQuestionList.Quiz[0].TestItem
        .length;
    }
    const { isOpen } = this.props;
    return (
      <div>
        <SAMModal
          isOpen={isOpen}
          contentLabel="Teacher-Made Quizzes"
          modalClassModifier="modal--teachermade-form"
          quizData={this.props.installedQuizData}
        >
          <div className="school-form school-form--orange">
            <div className="teacher-made-quiz-title">Teacher-Made Quizzes</div>
            <form
              noValidate
              id="teacher-made-quiz-profile-form"
              onSubmit={event => {
                this.handleSave(event);
              }}
            >
              <div className="modal__wrapper">
                <aside className="modal__wrapper-sidebar">
                  <div className="teacher-made-modal-title">Quiz Name</div>
                  <ul className="tmq-quiz-list tmq-quiz-list-scroll">
                    <li className="tmq-links">
                      <Link
                        to="#"
                        className="tmq-links-create-quiz"
                        onClick={event => {
                          this.createNewQuiz(event);
                        }}
                      >
                        Create a New Quiz
                      </Link>
                    </li>
                    <TeacherMadeQuizList
                      data={this.props.installedQuizData}
                      cliclHandler={this.loadQuiz}
                    />
                  </ul>
                </aside>
                <main className="modal__wrapper-content">
                  <div className="modal__wrapper-content__error-message" />

                  <div className="modal__wrapper-content-main">
                    {this.state.createQuizEmpty ? (
                      <div className="modal__wrapper-default-content">
                        <div className="teacher-made-quiz-choose">
                          Please choose a quiz to edit.
                        </div>
                      </div>
                    ) : null}
                    {!this.state.createQuizEmpty && this.state.createQuiz ? (
                      <TeacherMadeQuizQuestions
                        data={this.props}
                        stateData={this.state}
                        handler={this.createNewQuizFromQues}
                        updateInititalState={this.updateInititalState}
                        updateIncrementalState={this.updateIncrementalState}
                        onchangeQuestions={this.onchangeQuestions}
                        deleteQuestion={this.deleteQuestion}
                        submitFromQuestion={this.submitFromQuestion}
                        handleCancel={this.props.handleCancel}
                        quizTitle={this.state.profile.teacherMadeQuizTitle}
                        quizId={this.state.quizId}
                        profileType={this.props.profileUserType}
                        deleteWarning={this.deleteWarning}
                      />
                    ) : null}
                    {!this.state.createQuiz && !this.state.createQuizEmpty ? (
                      <div className="modal__wrapper-quiz-form">
                        {Object.keys(this.state.errors).length !== 0 &&
                        this.state.errors.constructor === Object ? (
                          <div className="th-made-qz-error-msg">
                            Please correct your entries as indicated.
                          </div>
                        ) : null}
                        <div className="teacher-made-quiz-sub-title">Create or Edit a Quiz</div>
                        <div className="teacher-made-question-content">
                          Enter information to create or edit a quiz
                        </div>

                        <div className="modal__wrapper-content-main-form">
                          <div className="teacher-made-wrapper-content-modal-title">
                            Quiz Information
                          </div>
                          <div className="form-control">
                            <span
                              className={
                                this.state.errors.title
                                  ? 'form-control__label label-error-tqform '
                                  : 'form-control__label'
                              }
                            >
                              Title
                              <span className="form-control__label-required">:</span>
                            </span>
                            <input
                              type="text"
                              className="form-control__input"
                              onChange={this.onChange}
                              name="teacherMadeQuizTitle"
                              value={this.state.profile.teacherMadeQuizTitle}
                              maxLength="40"
                            />
                          </div>
                          <div className="form-control">
                            <span
                              className={
                                this.state.errors.firstName
                                  ? 'form-control__label label-error-tqform '
                                  : 'form-control__label'
                              }
                            >
                              Author&#39;s First Name
                              <span className="form-control__label-required">:</span>
                            </span>
                            <input
                              type="text"
                              className="form-control__input"
                              onChange={this.onChange}
                              name="teacherMadeQuizAuthorFirstName"
                              value={this.state.profile.teacherMadeQuizAuthorFirstName}
                              maxLength="40"
                            />
                          </div>
                          <div className="form-control">
                            <span
                              className={
                                this.state.errors.lastName
                                  ? 'form-control__label label-error-tqform '
                                  : 'form-control__label'
                              }
                            >
                              Author&#39;s Last Name
                              <span className="form-control__label-required">:</span>
                            </span>
                            <input
                              type="text"
                              className="form-control__input"
                              onChange={this.onChange}
                              name="teacherMadeQuizAuthorLastName"
                              value={this.state.profile.teacherMadeQuizAuthorLastName}
                              maxLength="40"
                            />
                          </div>
                          <div className="form-control sm-field">
                            <span
                              className={
                                this.state.errors.wordcount
                                  ? 'form-control__label label-error-tqform '
                                  : 'form-control__label'
                              }
                            >
                              Number of words
                              <span className="form-control__label-required">:</span>
                            </span>
                            <input
                              type="text"
                              className="form-control__input"
                              onChange={event => {
                                this.onChangeNumber(event);
                              }}
                              name="teacherMadeQuizNumberOfWords"
                              value={this.state.profile.teacherMadeQuizNumberOfWords}
                              id="nOfWords"
                              maxLength="6"
                              pattern="[0-9]*"
                            />
                          </div>
                          <div className="form-control    sm-field">
                            <span
                              className={
                                this.state.errors.lexical
                                  ? 'form-control__label label-error-tqform '
                                  : 'form-control__label'
                              }
                            >
                              Lexile Level<span className="form-control__label-required">:</span>
                            </span>
                            <input
                              type="text"
                              className="form-control__input"
                              name="teacherMadequizLexileLevel"
                              onChange={event => {
                                this.onChangeNumber(event);
                              }}
                              value={this.state.profile.teacherMadequizLexileLevel}
                              id="lexLevel"
                              maxLength="4"
                              pattern="[0-9]*"
                            />
                          </div>
                          <div className="form-control    sm-field">
                            <span
                              className={
                                this.state.errors.reading
                                  ? 'form-control__label label-error-tqform '
                                  : 'form-control__label'
                              }
                            >
                              Reading Level<span className="form-control__label-required">:</span>
                            </span>
                            <input
                              type="text"
                              className="form-control__input"
                              name="teacherMadequizReadingLevel"
                              onChange={event => {
                                this.onChangeNumber(event);
                              }}
                              value={this.state.profile.teacherMadequizReadingLevel}
                              maxLength="4"
                              pattern="[0-9.]*"
                            />
                          </div>
                          <div className="col-2">
                            <div className="form-control points-field">
                              <span
                                className={
                                  this.state.errors.points
                                    ? 'form-control__label label-error-tqform '
                                    : 'form-control__label'
                                }
                              >
                                Points<span className="form-control__label-required">:</span>
                              </span>
                              <input
                                id="pointsId"
                                value={this.state.profile.teacherMadequizPoints}
                                type="text"
                                name="teacherMadequizPoints"
                                className="form-control__input"
                                pattern="[0-9]*"
                                onChange={event => {
                                  this.onChangeNumber(event);
                                }}
                                maxLength="4"
                              />
                            </div>
                            <button type="button" className="btn-gray" onClick={this.getPoints}>
                              Compute
                            </button>
                          </div>
                          <div className="form-control    sm-field">
                            <span
                              className={
                                this.state.errors.grl
                                  ? 'form-control__label label-error-tqform '
                                  : 'form-control__label'
                              }
                            >
                              GRL<span className="form-control__label-required">:</span>
                            </span>
                            <input
                              type="text"
                              className="form-control__input"
                              name="teacherMadequizGRL"
                              value={this.state.profile.teacherMadequizGRL}
                              onChange={event => {
                                this.onChangeToUpper(event);
                              }}
                              pattern="[A-Za-z]*"
                              maxLength="4"
                            />
                          </div>
                          <div className="form-control teacher-made-quiz-type">
                            <span
                              className={
                                this.state.errors.type
                                  ? 'form-control__label label-error-tqform '
                                  : 'form-control__label'
                              }
                            >
                              Type<span className="form-control__label-required">:</span>
                            </span>
                            <div className="tmt-left">
                              <label htmlFor="fiction" className="form-radio">
                                <input
                                  className="form-radio-fiction-button"
                                  type="radio"
                                  name="teacherMadequizType"
                                  value="1"
                                  checked={this.state.profile.teacherMadequizType === '1'}
                                  onChange={event => {
                                    this.handleOptionChange(event);
                                  }}
                                />
                                {''}
                                Fiction
                              </label>
                              <label htmlFor="nonfiction" className="form-radio">
                                <input
                                  className="form-radio-fiction-button"
                                  type="radio"
                                  name="teacherMadequizType"
                                  value="0"
                                  onChange={event => {
                                    this.handleOptionChange(event);
                                  }}
                                  checked={this.state.profile.teacherMadequizType === '0'}
                                />
                                Nonfiction
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="tmq-btn">
                          <button
                            type="button"
                            className="btn-gray float-right"
                            onClick={event => {
                              this.createNewQuestion(event);
                            }}
                          >
                            {questionCount > 0 ? 'Edit Questions >>' : 'Add New Question >>'}
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  {!this.state.createQuiz && !this.state.createQuizEmpty ? (
                    <div className="modal__wrapper-action modal__wrapper-action-quizform">
                      {this.state.quizId && this.props.profileUserType !== USER_TYPE.Teacher ? (
                        <SAMButton
                          className="modal__wrapper-action-delete"
                          isPrimaryButton
                          onClickHandler={this.deleteWarning}
                        >
                          Delete Quiz
                        </SAMButton>
                      ) : null}
                      <SAMButton
                        buttonClassModifier="modal__wrapper-action-close"
                        onClickHandler={this.props.handleCancel}
                      >
                        Close
                      </SAMButton>
                      <SAMButton
                        buttonClassModifier="modal__wrapper-action-save"
                        isPrimaryButton
                        buttonType="submit"
                      >
                        Save
                      </SAMButton>
                    </div>
                  ) : null}
                  {this.state.createQuizEmpty ? (
                    <div className="modal__wrapper-action">
                      <SAMButton
                        buttonClassModifier="modal__wrapper-action-close"
                        onClickHandler={this.props.handleCancel}
                      >
                        Close
                      </SAMButton>
                      <SAMButton
                        isPrimaryButton
                        buttonType="submit"
                        buttonClassModifier="modal__wrapper-action-save"
                      >
                        Save
                      </SAMButton>
                    </div>
                  ) : null}
                </main>
              </div>
            </form>
          </div>
        </SAMModal>
        <SAMModal
          isOpen={this.state.readingLevelValid}
          modalClassModifier="modal--teachermade-form-warning"
        >
          <div className="school-form-warning">
            <div>Reading Level must be less than 1000.</div>
            <SAMButton
              buttonClassModifier="school-form-warning-ok"
              isPrimaryButton
              onClickHandler={this.readingLevelModalClose}
            >
              Ok
            </SAMButton>
          </div>
        </SAMModal>
        <SAMModal
          isOpen={this.state.warningModal}
          modalClassModifier="modal--teachermade-form-warning"
        >
          <div className="school-form-warning">
            Please enter both a Lexile score and a Word Count to calculate the Point value.
            <SAMButton
              buttonClassModifier="school-form-warning-ok"
              isPrimaryButton
              onClickHandler={this.warningModalClose}
            >
              Ok
            </SAMButton>
          </div>
        </SAMModal>
        <SAMModal
          isOpen={this.state.deleteWarningModal}
          modalClassModifier="modal-teachermade-delete-warning"
          contentLabel="Delete Quiz"
        >
          <div className="modal-teachermade-delete-title">Delete Quiz</div>
          <div className="modal--wrapper-warning">
            <div className="delete-quiz-content">
              Are you sure you want to delete this quiz? This action can not be undone.
            </div>

            <div className="teacher-made-quiz-delete-button">
              <SAMButton
                buttonClassModifier="teacher-made-quiz-delete-warning-cancel"
                onClickHandler={this.deleteModalClose}
              >
                Cancel
              </SAMButton>
              <SAMButton
                isPrimaryButton
                buttonClassModifier="teacher-made-quiz-delete-warning-delete"
                onClickHandler={this.deleteQuiz}
              >
                Delete
              </SAMButton>
            </div>
          </div>
        </SAMModal>
      </div>
    );
  };
}

TeacherMadeQuiz.defaultProps = {
  isOpen: false,
};

TeacherMadeQuiz.propTypes = {
  handleCancel: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  installedQuizData: PropTypes.array.isRequired,
  loadQuizDetails: PropTypes.func.isRequired,
  deleteQuiz: PropTypes.func.isRequired,
  teacherMadeQuizContainer: PropTypes.any,
  profileUserType: PropTypes.string,
};

export default TeacherMadeQuiz;
