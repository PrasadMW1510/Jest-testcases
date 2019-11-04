/**
 *
 * TeacherMadeQuizQuestions
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMButton from 'components/SAMButton';
import { USER_TYPE } from 'containers/App/constants';
import './TeacherMadeQuizQuestions.scss';

class TeacherMadeQuizQuestions extends React.Component {
  constructor(props) {
    super(props);
    const QuesArray = [];
    if (this.props.stateData.questions.length > 0) {
      this.props.stateData.questions.map(item => {
        const ques = {};
        ques.Question = item.Question;
        ques.Answers = {};
        ques.Answers.CorrectAnswer = item.Answers.CorrectAnswer;
        ques.Answers.IncorrectAnswer1 = item.Answers.IncorrectAnswer1;
        ques.Answers.IncorrectAnswer2 = item.Answers.IncorrectAnswer2;
        ques.Answers.IncorrectAnswer3 = item.Answers.IncorrectAnswer3;
        QuesArray.push(ques);
        return true;
      });
    } else if (
      this.props.data.teacherMadeQuizContainer.installedQuizQuestionList.Quiz &&
      this.props.data.teacherMadeQuizContainer.installedQuizQuestionList.Quiz[0].TestItem &&
      this.props.data.teacherMadeQuizContainer.installedQuizQuestionList.Quiz[0].TestItem.length > 0
    ) {
      this.props.data.teacherMadeQuizContainer.installedQuizQuestionList.Quiz[0].TestItem.map(
        item => {
          const ques = {};
          ques.Question = item.Question[0];
          ques.Answers = {};
          ques.Answers.CorrectAnswer = item.Answers[0].CorrectAnswer[0];
          ques.Answers.IncorrectAnswer1 = item.Answers[0].IncorrectAnswer1[0];
          ques.Answers.IncorrectAnswer2 = item.Answers[0].IncorrectAnswer2[0];
          ques.Answers.IncorrectAnswer3 = item.Answers[0].IncorrectAnswer3[0];
          QuesArray.push(ques);
          return true;
        }
      );
    } else {
      const ques = {};
      ques.Question = ``;
      ques.Answers = {};
      ques.Answers.CorrectAnswer = ``;
      ques.Answers.IncorrectAnswer1 = ``;
      ques.Answers.IncorrectAnswer2 = ``;
      ques.Answers.IncorrectAnswer3 = ``;
      QuesArray.push(ques);
    }
    this.state = {
      questionItration: 0,
      questions: QuesArray,
      errors: {},
    };
    this.props.updateInititalState(QuesArray);
  }
  setQuestionState = event => {
    const field = event.target.name;
    const value = event.target.value;
    const items = this.state.questions;
    if (field === 'Question') {
      items[this.state.questionItration][field] = value;
    } else {
      items[this.state.questionItration].Answers[field] = value;
    }
    this.setState({
      items,
    });
    this.props.onchangeQuestions(event, this.state.questionItration);
  };
  decrement = () => {
    if (this.handleValidation()) {
      this.setState({
        questionItration: this.state.questionItration - 1,
      });
    }
  };
  increment = () => {
    if (this.handleValidation()) {
      const itrVal = this.state.questionItration + 1;
      if (this.state.questions[itrVal] === undefined) {
        this.setState({
          questionItration: this.state.questionItration + 1,
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
        this.props.updateIncrementalState();
      } else {
        this.setState({
          questionItration: this.state.questionItration + 1,
        });
      }
    }
  };
  handleValidation = () => {
    const errorsQuestion = {};
    let formIsValid = true;

    if (!this.state.questions[this.state.questionItration].Question) {
      formIsValid = false;
      errorsQuestion.Question = 'Cannot be empty';
    }
    if (!this.state.questions[this.state.questionItration].Answers.CorrectAnswer) {
      formIsValid = false;
      errorsQuestion.CorrectAnswer = 'Cannot be empty';
    }
    if (!this.state.questions[this.state.questionItration].Answers.IncorrectAnswer1) {
      formIsValid = false;
      errorsQuestion.IncorrectAnswer1 = 'Cannot be empty';
    }
    if (!this.state.questions[this.state.questionItration].Answers.IncorrectAnswer2) {
      formIsValid = false;
      errorsQuestion.IncorrectAnswer2 = 'Cannot be empty';
    }
    if (!this.state.questions[this.state.questionItration].Answers.IncorrectAnswer3) {
      formIsValid = false;
      errorsQuestion.IncorrectAnswer3 = 'Cannot be empty';
    }

    this.setState({ errors: errorsQuestion });
    return formIsValid;
  };
  deleteQuestion = () => {
    const qsArr = this.state.questions;
    qsArr.splice([this.state.questionItration], 1);
    this.setState({
      questionItration: this.state.questionItration - 1,
      questions: qsArr,
    });
    this.props.deleteQuestion(this.state.questionItration);
  };
  backToProfile = val => {
    if (this.handleValidation()) {
      this.props.handler(val, this.state.questions);
    }
  };
  handleValidationSubmit = () => {
    const valid = this.handleValidation();
    if (valid) {
      this.props.submitFromQuestion();
    }
  };
  render() {
    return (
      <div className="modal__wrapper-question-form teacher-made-questions">
        {Object.keys(this.state.errors).length !== 0 && this.state.errors.constructor === Object ? (
          <div className="th-made-qz-error-msg">Please fill in missing fields.</div>
        ) : null}
        <div className="teacher-made-title">
          {this.props.quizTitle || 'New Quiz'} Question # {this.state.questionItration + 1} /{' '}
          {this.state.questions.length}
        </div>
        <div className="teachermade-field-text">
          Enter the question and answers in the fields below.
        </div>

        <div className="modal__wrapper-content-main-form padding-md ">
          <div className="form-control">
            <label
              htmlFor="Question"
              className={
                this.state.errors.Question
                  ? 'form-control__label label-error-trqz-qn '
                  : 'form-control__label'
              }
            >
              Question:
            </label>
            <textarea
              className="textarea"
              name="Question"
              onChange={event => {
                this.setQuestionState(event);
              }}
              value={this.state.questions[this.state.questionItration].Question}
            />
          </div>
          <div className="form-control">
            <label
              htmlFor="Correct Answer"
              className={
                this.state.errors.CorrectAnswer
                  ? 'form-control__label label-error-trqz-qn '
                  : 'form-control__label'
              }
            >
              Correct Answer:
            </label>
            <textarea
              className="textarea"
              name="CorrectAnswer"
              onChange={event => {
                this.setQuestionState(event);
              }}
              value={this.state.questions[this.state.questionItration].Answers.CorrectAnswer}
            />
          </div>
          <div className="form-control">
            <label
              htmlFor="Incorrect"
              className={
                this.state.errors.IncorrectAnswer1
                  ? 'form-control__label label-error-trqz-qn '
                  : 'form-control__label'
              }
            >
              Incorrect:
            </label>
            <textarea
              className="textarea"
              name="IncorrectAnswer1"
              onChange={event => {
                this.setQuestionState(event);
              }}
              value={this.state.questions[this.state.questionItration].Answers.IncorrectAnswer1}
            />
          </div>
          <div className="form-control">
            <label
              htmlFor="Incorrect"
              className={
                this.state.errors.IncorrectAnswer2
                  ? 'form-control__label label-error-trqz-qn '
                  : 'form-control__label'
              }
            >
              Incorrect:
            </label>
            <textarea
              className="textarea"
              name="IncorrectAnswer2"
              onChange={event => {
                this.setQuestionState(event);
              }}
              value={this.state.questions[this.state.questionItration].Answers.IncorrectAnswer2}
            />
          </div>
          <div className="form-control">
            <label
              htmlFor="Incorrect"
              className={
                this.state.errors.IncorrectAnswer3
                  ? 'form-control__label label-error-trqz-qn '
                  : 'form-control__label'
              }
            >
              Incorrect:
            </label>
            <textarea
              className="textarea"
              name="IncorrectAnswer3"
              onChange={event => {
                this.setQuestionState(event);
              }}
              value={this.state.questions[this.state.questionItration].Answers.IncorrectAnswer3}
            />
          </div>
        </div>
        <div className="tmq-btn">
          {this.state.questionItration > 0 ? (
            <button type="button" className="btn-gray tmq-pad3" onClick={this.decrement}>
              &lt;&lt; Previous Question
            </button>
          ) : (
            <button
              type="button"
              onClick={event => {
                this.backToProfile(event);
              }}
              className="btn-gray"
            >
              &lt;&lt; Edit Profile
            </button>
          )}

          <button type="button" className="btn-gray" onClick={this.deleteQuestion}>
            {' '}
            Delete Question
          </button>
          {this.state.questions.length === this.state.questionItration + 1 ? (
            <button
              type="button"
              className="btn-gray float-right teacher-new-qs"
              onClick={this.increment}
            >
              {' '}
              Add New Question &gt;&gt;
            </button>
          ) : (
            <button
              type="button"
              className="btn-gray tmq-pad3 tmq-width-edit"
              onClick={this.increment}
            >
              {''}
              Edit Next Question &gt;&gt;
            </button>
          )}
        </div>
        <div className="modal__wrapper-action modal__wrapper-action-quizform">
          {this.props.quizId && this.props.profileType !== USER_TYPE.Teacher ? (
            <SAMButton
              className="modal__wrapper-action-delete"
              isPrimaryButton
              onClickHandler={this.props.deleteWarning}
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
            onClickHandler={this.handleValidationSubmit}
            isPrimaryButton
            buttonType="button"
          >
            Save
          </SAMButton>
        </div>
      </div>
    );
  }
}

TeacherMadeQuizQuestions.propTypes = {
  data: PropTypes.object.isRequired,
  handler: PropTypes.func.isRequired,
  stateData: PropTypes.object.isRequired,
  updateInititalState: PropTypes.func.isRequired,
  submitFromQuestion: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  updateIncrementalState: PropTypes.func.isRequired,
  onchangeQuestions: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  quizTitle: PropTypes.string,
  profileType: PropTypes.string,
  deleteWarning: PropTypes.func,
  quizId: PropTypes.string,
};

export default TeacherMadeQuizQuestions;
