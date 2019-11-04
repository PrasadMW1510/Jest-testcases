/**
 *
 * InstalledQuiz
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { INSTALL_QUIZ_URL } from 'utils/externalLinkConstants';

import './InstalledQuiz.scss';

class InstalledQuiz extends React.Component {
  onInstallQuizButtonClick = e => {
    e.preventDefault();
    window.open(INSTALL_QUIZ_URL);
  };

  onTeachClick = e => {
    this.props.callbackFromParent(e);
  };

  handleAddTeacherMadeQuiz = ev => {
    ev.preventDefault();
    this.props.quizModalData();
  };

  handleEditQuizCollectionNames = ev => {
    ev.preventDefault();
    this.props.editQuizCollectionModalData();
  };

  render() {
    let countVal = '';
    let countTeacherMadeCount = '';
    const { data } = this.props;

    if (data && data.Count && data.Count.length > 0) {
      countVal = data.Count[0];
      countTeacherMadeCount = data.TeacherMadeCount[0];
    }

    return (
      <section className="installed-quiz__wrapper">
        <h4 className="installed-quiz__wrapper-title">Installed Quizzes</h4>
        <p className="installed-quiz-para">
          {' '}
          You have {countVal} quizzes installed in your library.{' '}
        </p>
        <h4 className="installed-quiz__wrapper-title">Teacher Made Quizzes</h4>
        <p className="installed-quiz-para">
          You have {countTeacherMadeCount} teacher made quizzes installed in your library.{' '}
        </p>

        <h6 className="installed-quiz__wrapper-links">
          <Link to="/books/quiz/results" onClick={this.onTeachClick}>
            {' '}
            Display All Teacher Made Quizzes
          </Link>{' '}
          <br />
          <a
            href="button"
            className="installed-quiz-alink"
            onClick={event => {
              this.handleAddTeacherMadeQuiz(event);
            }}
          >
            Add/Edit Teacher Made Quizzes
          </a>
        </h6>

        <div className="installed-quiz__wrapper-box">
          <div className="installed-quiz__wrapper-title--box">Quiz Management</div>
          <div className="installed-quiz__wrapper-box-links">
            <Link to="#" onClick={this.onInstallQuizButtonClick}>
              <span className="installed-quiz-alink">Install Quizzes</span>
            </Link>
            <Link to="#" onClick={this.handleEditQuizCollectionNames}>
              <span className="installed-quiz-alink"> Edit Quiz Collection Names</span>
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

InstalledQuiz.propTypes = {
  data: PropTypes.object.isRequired,
  editQuizCollectionModalData: PropTypes.func.isRequired,
  quizModalData: PropTypes.func.isRequired,
  callbackFromParent: PropTypes.func.isRequired,
};

export default InstalledQuiz;
