/*
 *
 * SRCGradingToolsContainer transformer
 *
 */

// To transform data from search results for usage in reducer
import React from 'react';
import _ from 'lodash';
import { decodeHtml } from 'utils/utilities';

const CHARACTER_LIMIT_BEFORE_TOOLTIP_QUIZ_SCORE_TABLE = 11;
const CHARACTER_LIMIT_BEFORE_TOOLTIP_SEARCH_QUIZ_TABLE = 28;

const renderStringWithToolTipPositionedQuizScoreTable = (text, characterLimit, position) => {
  if (text.length > characterLimit) {
    return (
      <a className={`rt-td__tooltip rt-td__tooltip--${position}`} data-tip={text}>
        {characterLimit === CHARACTER_LIMIT_BEFORE_TOOLTIP_QUIZ_SCORE_TABLE ? (
          <div className="rt-td__truncated-block">{text.substr(0, 10)}...</div>
        ) : (
          <div className="rt-td__truncated-block">{text.substr(0, 27)}...</div>
        )}
      </a>
    );
  }
  return text;
};

export const transformSrcGradingToolsScores = payload => {
  const quizItems = payload.GetScoreResp[0].QuizHistory[0].QuizItem;
  const data = _.map(quizItems, item => ({
    date: item.Date[0],
    title: renderStringWithToolTipPositionedQuizScoreTable(
      decodeHtml(item.Title[0]),
      CHARACTER_LIMIT_BEFORE_TOOLTIP_QUIZ_SCORE_TABLE,
      'right'
    ),
    lexile: item.Lexile[0],
    rl: item.ReadingLevel[0],
    '# Correct': item.NumCorrect[0],
    '# Questions': item.NumQuestions[0],
    points: item.Points[0],
    remove: item.QuizID[0],
    id: item.QuizID[0],
    quizSequence: item.QuizSequence[0],
  }));
  return data;
};

export const transformSrcGradingToolsPoints = payload => {
  const data = {
    earnedToDate: payload.GetPointsResp[0].PointsSummary[0].EarnedToDate[0],
    usedToDate: payload.GetPointsResp[0].PointsSummary[0].UsedToDate[0],
    available: payload.GetPointsResp[0].PointsSummary[0].Available[0],
    pointsList: payload.GetPointsResp[0].PointsList[0],
  };
  return data;
};

export const transformSrcStudentQuizzes = payload => {
  const quizItems = payload.SrcSearchResp[0].Book;
  const data = _.map(quizItems, item => ({
    title: renderStringWithToolTipPositionedQuizScoreTable(
      decodeHtml(item.Title[0]),
      CHARACTER_LIMIT_BEFORE_TOOLTIP_SEARCH_QUIZ_TABLE,
      'right'
    ),
    author: `${item.Author[0].LastName[0]}, ${item.Author[0].FirstName[0]}`,
    lexile: item.Lexile[0],
    rl: item.ReadingLevel[0],
    points: item.Points[0],
  }));
  return data;
};

export const transformSrcStudentQuizPaginationData = payload => {
  const paginationData = payload.pagination_data[0];
  const data = {
    current_page: paginationData.current_page[0],
    items_per_page: paginationData.items_per_page[0],
    page_count: paginationData.page_count[0],
  };
  return data;
};

export const transformSrcStudentQuizItemCount = payload => payload.item_count[0];
