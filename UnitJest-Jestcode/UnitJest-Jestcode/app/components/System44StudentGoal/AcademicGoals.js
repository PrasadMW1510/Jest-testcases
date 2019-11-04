import React from 'react';
import PropTypes from 'prop-types';
import * as Constants from './constants';

const getDecodingGoals = (
  sChoice,
  handleChange,
  system44StudentGoalDecoding,
  showErrorDecoding,
  showErrorEmptyDecoding,
  showErrorProgressiveDecoding,
  defaultDecodingData
) => (
  <div className="print-system44__modal--optiondiv">
    <div className="print-system44__modal--paragraphdiv">
      <span className="print-system44__modal-annual--goal">
        <b>Annual Goal:</b>
      </span>
      The student will pass
      <input
        className="print-system44__modal-annual-goal--input"
        type="text"
        value={system44StudentGoalDecoding[3]}
        readOnly
      />
      <span>topics with 70% fluency.</span>
      {showErrorDecoding && (
        <p className="print-system44__studentgoal--errormessage">
          The values should be between {defaultDecodingData[0]} and {defaultDecodingData[3]}
        </p>
      )}
      {showErrorEmptyDecoding && (
        <p className="print-system44__studentgoal--errormessage">
          Please enter a value in all Academic Goal field(s)
        </p>
      )}
      {showErrorProgressiveDecoding && (
        <p className="print-system44__studentgoal--errormessage">
          Benchmarks must show cumulative progress toward annual goal.
        </p>
      )}
    </div>
    <div className="print-system44-modal-listdata-element1">
      <span className="print-system44__modal--listdata1"> Benchmark1: </span>
      <div className="print-system44__pull--right2">
        <input
          className="print-system44-modal__annual-academic-goal--input"
          type="text"
          maxLength="3"
          onChange={event => {
            handleChange(sChoice.goal_name[0], 0, event);
          }}
          value={system44StudentGoalDecoding[0]}
        />
        <span>topics</span>
      </div>
      <span className="print-system44__modal--listdata1"> Benchmark2: </span>
      <div className="print-system44__pull--right2">
        <input
          className="print-system44-modal__annual-academic-goal--input"
          type="text"
          maxLength="3"
          onChange={event => {
            handleChange(sChoice.goal_name[0], 1, event);
          }}
          value={system44StudentGoalDecoding[1]}
        />
        <span>topics</span>
      </div>
      <span className="print-system44__modal--listdata1"> Benchmark3: </span>
      <div className="print-system44__pull--right2">
        <input
          className="print-system44-modal__annual-academic-goal--input"
          type="text"
          maxLength="3"
          onChange={event => {
            handleChange(sChoice.goal_name[0], 2, event);
          }}
          value={system44StudentGoalDecoding[2]}
        />
        <span>topics</span>
      </div>
      <span className="print-system44__modal--listdata1"> Benchmark4: </span>
      <div className="print-system44__pull--right2">
        <input
          className="print-system44-modal__annual-academic-goal--input"
          type="text"
          maxLength="3"
          onChange={event => {
            handleChange(sChoice.goal_name[0], 3, event);
          }}
          value={system44StudentGoalDecoding[3]}
        />
        <span>topics</span>
      </div>
    </div>
  </div>
);

const getSpellingGoals = (
  sChoice,
  handleChange,
  system44StudentGoalSpelling,
  showErrorSpelling,
  defaultSpellingData,
  showErrorProgressiveSpelling,
  showErrorEmptySpelling
) => (
  <div className="print-system44-modal-optiondiv">
    <div className="print-system44__modal--paragraphdiv print-system44-modal-paragraphdiv1">
      <span className="print-system44__modal-annual--goal">
        <b>Annual Goal:</b>
      </span>
      The student will score 70% on
      <input
        className="print-system44__modal-annual-goal--input"
        type="text"
        value={system44StudentGoalSpelling[3]}
        readOnly
      />
      <span>spelling challenges.</span>
      {showErrorSpelling && (
        <p className="print-system44__studentgoal--errormessage">
          The values should be between {defaultSpellingData[0]} and {defaultSpellingData[3]}
        </p>
      )}
      {showErrorProgressiveSpelling && (
        <p className="print-system44__studentgoal--errormessage">
          Benchmarks must show cumulative progress toward annual goal.
        </p>
      )}
      {showErrorEmptySpelling && (
        <p className="print-system44__studentgoal--errormessage">
          Please enter a value in all Academic Goal field(s)
        </p>
      )}
    </div>

    <div className="print-system44-modal-listdata-element1">
      <span className="print-system44__modal--listdata1"> Benchmark1: </span>
      <div className="print-system44__pull--right2">
        <input
          className="print-system44-modal__annual-academic-goal--input"
          type="text"
          maxLength="3"
          onChange={event => {
            handleChange(sChoice.goal_name[0], 0, event);
          }}
          value={system44StudentGoalSpelling[0]}
        />
        <span>challenges</span>
      </div>

      <span className="print-system44__modal--listdata1"> Benchmark2: </span>
      <div className="print-system44__pull--right2">
        <input
          className="print-system44-modal__annual-academic-goal--input"
          type="text"
          maxLength="3"
          onChange={event => {
            handleChange(sChoice.goal_name[0], 1, event);
          }}
          value={system44StudentGoalSpelling[1]}
        />
        <span>challenges</span>
      </div>

      <span className="print-system44__modal--listdata1"> Benchmark3: </span>
      <div className="print-system44__pull--right2">
        <input
          className="print-system44-modal__annual-academic-goal--input"
          type="text"
          maxLength="3"
          onChange={event => {
            handleChange(sChoice.goal_name[0], 2, event);
          }}
          value={system44StudentGoalSpelling[2]}
        />
        <span>challenges</span>
      </div>

      <span className="print-system44__modal--listdata1"> Benchmark4: </span>
      <div className="print-system44__pull--right2">
        <input
          className="print-system44-modal__annual-academic-goal--input"
          type="text"
          maxLength="3"
          onChange={event => {
            handleChange(sChoice.goal_name[0], 3, event);
          }}
          value={system44StudentGoalSpelling[3]}
        />
        <span>challenges</span>
      </div>
    </div>
  </div>
);

const getIndependentGoals = (
  sChoice,
  handleChange,
  system44StudentGoalReading,
  showErrorReading,
  defaultReadingData,
  showErrorProgressiveReading,
  showErrorEmptyReading
) => (
  <div className="print-system44-modal-optiondiv last">
    <div className="print-system44__modal--paragraphdiv print-system44-modal-paragraphdiv2">
      <span className="print-system44-modal-annual-goal">
        <b>Annual Goal:</b>
      </span>
      The student will read
      <input
        className="print-system44__modal-annual-goal--input"
        type="text"
        value={system44StudentGoalReading[3]}
        readOnly
      />
      <span>
        leave-appropriate and non-fiction books and demonstrate comprehension of key ideas.
      </span>
      {showErrorReading && (
        <p className="print-system44__studentgoal--errormessage">
          The values should be between {defaultReadingData[0]} and {defaultReadingData[3]}
        </p>
      )}
      {showErrorProgressiveReading && (
        <p className="print-system44__studentgoal--errormessage">
          Benchmarks must show cumulative progress toward annual goal.
        </p>
      )}
      {showErrorEmptyReading && (
        <p className="print-system44__studentgoal--errormessage">
          Please enter a value in all Academic Goal field(s)
        </p>
      )}
    </div>

    <div className="print-system44-modal-listdata-element1">
      <span className="print-system44__modal--listdata1"> Benchmark1: </span>
      <div className="print-system44__pull--right2">
        <input
          className="print-system44-modal__annual-academic-goal--input"
          type="text"
          maxLength="3"
          onChange={event => {
            handleChange(sChoice.goal_name[0], 0, event);
          }}
          value={system44StudentGoalReading[0]}
        />
        <span>books</span>
      </div>

      <span className="print-system44__modal--listdata1"> Benchmark2: </span>
      <div className="print-system44__pull--right2">
        <input
          className="print-system44-modal__annual-academic-goal--input"
          type="text"
          maxLength="3"
          onChange={event => {
            handleChange(sChoice.goal_name[0], 1, event);
          }}
          value={system44StudentGoalReading[1]}
        />
        <span>books</span>
      </div>

      <span className="print-system44__modal--listdata1"> Benchmark3: </span>
      <div className="print-system44__pull--right2">
        <input
          className="print-system44-modal__annual-academic-goal--input"
          type="text"
          maxLength="3"
          onChange={event => {
            handleChange(sChoice.goal_name[0], 2, event);
          }}
          value={system44StudentGoalReading[2]}
        />
        <span>books</span>
      </div>

      <span className="print-system44__modal--listdata1"> Benchmark4: </span>
      <div className="print-system44__pull--right2">
        <input
          className="print-system44-modal__annual-academic-goal--input"
          type="text"
          maxLength="3"
          onChange={event => {
            handleChange(sChoice.goal_name[0], 3, event);
          }}
          value={system44StudentGoalReading[3]}
        />
        <span>books</span>
      </div>
    </div>
  </div>
);

const AcademicGoals = ({
  resetDefault,
  handleGoalNameClick,
  handleSaveGoals,
  handleChange,
  academicGoalsControls,
  system44StudentGoalDecoding,
  system44StudentGoalSpelling,
  system44StudentGoalReading,
  defaultDecodingData,
  defaultSpellingData,
  defaultReadingData,
  showErrorDecoding,
  showErrorEmptyDecoding,
  showErrorProgressiveDecoding,
  showErrorSpelling,
  showErrorProgressiveSpelling,
  showErrorEmptySpelling,
  showErrorReading,
  showErrorProgressiveReading,
  showErrorEmptyReading,
  enableSaveGoals,
}) => (
  <div className="print-system44-modal__description--box1">
    <div className="print-system44-modal__description--title">Academic Goals</div>
    <div className="print-system44__modal--boldtext">
      <p>
        <b>Adjust Goals and Adjust benchmarks*</b>
        <span className="print-system44__modal--span">
          <a
            className="print-system44__hyper--link"
            onClick={resetDefault}
            role="link"
            tabIndex="0"
          >
            Reset Default Values
          </a>
        </span>
      </p>
      <div className="row">
        {academicGoalsControls &&
          academicGoalsControls.map(sChoice => (
            <div key={sChoice.goal_name[0]}>
              <div>
                <a
                  className="print-system44__modal--link"
                  onClick={e => handleGoalNameClick(e, sChoice.goal_name)}
                  role="link"
                  tabIndex="0"
                >
                  {sChoice.goal_name[0].charAt(0).toUpperCase() + sChoice.goal_name[0].slice(1)}
                </a>
              </div>
              {sChoice.goal_name[0] === Constants.DECODING &&
                getDecodingGoals(
                  sChoice,
                  handleChange,
                  system44StudentGoalDecoding,
                  showErrorDecoding,
                  showErrorEmptyDecoding,
                  showErrorProgressiveDecoding,
                  defaultDecodingData
                )}

              {sChoice.goal_name[0] === Constants.SPELLING &&
                getSpellingGoals(
                  sChoice,
                  handleChange,
                  system44StudentGoalSpelling,
                  showErrorSpelling,
                  defaultSpellingData,
                  showErrorProgressiveSpelling,
                  showErrorEmptySpelling
                )}

              {sChoice.goal_name[0] === Constants.INDEPENDENT_READING &&
                getIndependentGoals(
                  sChoice,
                  handleChange,
                  system44StudentGoalReading,
                  showErrorReading,
                  defaultReadingData,
                  showErrorProgressiveReading,
                  showErrorEmptyReading
                )}
            </div>
          ))}
        <div className="print-system44-modal__inbox-remove--btn1 inbox-save-btn">
          <span className="print-system44-modal__button-italic--text">
            *Benchmark values show cumulative progress toward annual goal
          </span>
          <button
            disabled={!enableSaveGoals}
            className="print-system44-modal__inbox-remove--btn2"
            onClick={handleSaveGoals}
          >
            Save Goals
          </button>
        </div>
      </div>
    </div>
  </div>
);
AcademicGoals.propTypes = {
  resetDefault: PropTypes.func.isRequired,
  handleGoalNameClick: PropTypes.func.isRequired,
  handleSaveGoals: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  academicGoalsControls: PropTypes.array,
  system44StudentGoalDecoding: PropTypes.array,
  system44StudentGoalSpelling: PropTypes.array,
  system44StudentGoalReading: PropTypes.array,
  defaultDecodingData: PropTypes.array,
  defaultSpellingData: PropTypes.array,
  defaultReadingData: PropTypes.array,
  showErrorDecoding: PropTypes.bool,
  showErrorEmptyDecoding: PropTypes.bool,
  showErrorProgressiveDecoding: PropTypes.bool,
  showErrorSpelling: PropTypes.bool,
  showErrorProgressiveSpelling: PropTypes.bool,
  showErrorEmptySpelling: PropTypes.bool,
  showErrorReading: PropTypes.bool,
  showErrorProgressiveReading: PropTypes.bool,
  showErrorEmptyReading: PropTypes.bool,
  enableSaveGoals: PropTypes.bool,
};

export default AcademicGoals;
