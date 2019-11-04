/**
 *
 * TeacherMadeQuizList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class TeacherMadeQuizList extends React.Component {
  orderQuizTitle = () => {
    const quizList = this.props.data;
    quizList.sort((a, b) => {
      const titleA = a.Title[0].toUpperCase();
      const titleB = b.Title[0].toUpperCase();
      if (titleA < titleB) {
        return -1;
      } else if (titleA > titleB) {
        return 1;
      }
      return 0;
    });
  };
  render() {
    this.orderQuizTitle();
    return (
      <ul className="tmq-quiz-list tmq-quiz-list2">
        {this.props.data.map(item => (
          <li key={item.QuizID} className="tmq-links">
            <Link
              to={`/${item.QuizID}`}
              key={item.QuizID}
              onClick={e => {
                e.preventDefault();
                this.props.cliclHandler(item.QuizID);
              }}
            >
              {item.Title}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

TeacherMadeQuizList.propTypes = {
  data: PropTypes.array.isRequired,
  cliclHandler: PropTypes.func.isRequired,
};

export default TeacherMadeQuizList;
