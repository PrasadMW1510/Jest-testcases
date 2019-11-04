import React from 'react';
import PropTypes from 'prop-types';

const PrintSystem44StudentGoal = ({
  lastAssementDateAcademicGoal,
  system44StudentGoalDecoding,
  system44StudentGoalSpelling,
  system44StudentGoalReading,
  behaviouralGoalsControls,
  data,
  currentPageIndex,
}) => (
  <div>
    <div className="print-system44__print--here">
      <b>{data.student_name}</b>
      <div className="print-system44__modal--title">
        System 44 Next Generation{' '}
        <span className="print-system44__modal-title--span">
          {' '}
          Student Goals:{' '}
          {lastAssementDateAcademicGoal ||
            (data.metaData[currentPageIndex].date &&
              data.metaData[currentPageIndex].date
                .split('T')[0]
                .split('-')
                .reverse()
                .join('/'))}
        </span>
      </div>
      <div className="print-system44__here--border">
        <b>Academic Goals</b>

        <div className="print-system44__here--contents">
          <b className="print-system44__border-heading--first">Decoding</b>
          <div className="print-system44__here-middle--content">
            <b>Annual Goal:</b>
            <div>
              The student will pass {system44StudentGoalDecoding[3]} topics with 70% fluency.
            </div>
          </div>
          <div>
            <div className="print-system44__here--benchmarks">
              Banchmark1: {system44StudentGoalDecoding[0]}
            </div>
            <div className="print-system44__here--benchmarks">
              Banchmark2: {system44StudentGoalDecoding[1]}
            </div>
            <div className="print-system44__here--benchmarks">
              Banchmark3: {system44StudentGoalDecoding[2]}
            </div>
            <div className="print-system44__here--benchmarks">
              Banchmark4: {system44StudentGoalDecoding[3]}
            </div>
          </div>
        </div>

        <div className="print-system44__here--contents">
          <b className="print-system44__border-heading--first">Spelling</b>
          <div className="print-system44__here-middle--content">
            <b>Annual Goal:</b>
            <div>
              The student will pass {system44StudentGoalDecoding[3]} topics with 70% fluency.
            </div>
          </div>
          <div>
            <div className="print-system44__here--benchmarks">
              Banchmark1: {system44StudentGoalSpelling[0]}
            </div>
            <div className="print-system44__here--benchmarks">
              Banchmark2: {system44StudentGoalSpelling[1]}
            </div>
            <div className="print-system44__here--benchmarks">
              Banchmark3: {system44StudentGoalSpelling[2]}
            </div>
            <div className="print-system44__here--benchmarks">
              Banchmark4: {system44StudentGoalSpelling[3]}
            </div>
          </div>
        </div>
        <div className="print-system44__here--contents">
          <b className="print-system44__border-heading--first">Independent Reading</b>
          <div className="print-system44__here-middle--content">
            <b>Annual Goal:</b>
            <div>
              The student will pass {system44StudentGoalDecoding[3]} topics with 70% fluency.
            </div>
          </div>
          <div>
            <div className="print-system44__here--benchmarks">
              Banchmark1: {system44StudentGoalReading[0]}
            </div>
            <div className="print-system44__here--benchmarks">
              Banchmark2: {system44StudentGoalReading[1]}
            </div>
            <div className="print-system44__here--benchmarks">
              Banchmark3: {system44StudentGoalReading[2]}
            </div>
            <div className="print-system44__here--benchmarks">
              Banchmark4: {system44StudentGoalReading[3]}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="print-system44__print--here print-system44__here--margin">
      <div className="print-system44__here--border">
        <b>Behavioral Goals</b>
        <div>
          {behaviouralGoalsControls.map(control => (
            <div className="print-system44__here--contents" key={control.goal_name[0]}>
              <b className="print-system44__border-heading--first">
                {`${control.goal_name[0].charAt(0).toUpperCase()}${control.goal_name[0].slice(1)}`}
              </b>
              <div className="print-system44__here-middle--content">
                <div className="print-system44__here--benchmarks">
                  Whole Group: {control.whole_group_score[0] || '-'}
                </div>
                <div className="print-system44__here--benchmarks">
                  Small Group: {control.whole_group_score[0] || '-'}
                </div>
                <div className="print-system44__here--benchmarks">
                  Independent Reading: {control.whole_group_score[0] || '-'}
                </div>
                <div className="print-system44__here--benchmarks">
                  Software: {control.whole_group_score[0] || '-'}
                </div>
              </div>
              <div>Total points earned: {control.total || '-'}</div>
              <div className="clear" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

PrintSystem44StudentGoal.propTypes = {
  lastAssementDateAcademicGoal: PropTypes.string,
  system44StudentGoalDecoding: PropTypes.array,
  system44StudentGoalSpelling: PropTypes.array,
  system44StudentGoalReading: PropTypes.array,
  behaviouralGoalsControls: PropTypes.array,
  data: PropTypes.object,
  currentPageIndex: PropTypes.number,
};

export default PrintSystem44StudentGoal;
