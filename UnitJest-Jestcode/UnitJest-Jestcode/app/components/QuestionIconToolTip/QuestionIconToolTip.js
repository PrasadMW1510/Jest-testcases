/**
 *
 * QuestionIconToolTip
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import './QuestionIconToolTip.scss';

function QuestionIconToolTip(props) {
  return (
    <span>
      <div className="question-icon" data-tip="" data-for="questionToolTip">
        &#63;
      </div>
      <ReactTooltip className="question-tool-tip" id="questionToolTip" effect="solid">
        {props.children}
      </ReactTooltip>
    </span>
  );
}

QuestionIconToolTip.propTypes = {
  children: PropTypes.node,
};

export default QuestionIconToolTip;
