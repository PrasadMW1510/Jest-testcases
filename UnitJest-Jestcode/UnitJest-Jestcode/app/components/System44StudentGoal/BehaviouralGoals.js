import React from 'react';
import PropTypes from 'prop-types';
import * as Constants from './constants';

const BehaviouralGoals = ({
  data,
  behaviouralGoalsControls,
  handleOpenLastAssesment,
  enableSaveBehaviouralGoals,
  handleBehaviourInputChange,
  handleSaveBehaviourGoals,
}) => {
  const scoreClassName = (index, score, checkVal) =>
    behaviouralGoalsControls[index][score][0] === checkVal ? 'valu1 active' : 'valu1';
  return (
    <div className="print-system44-modal__description--box2">
      <div className="print-system44-modal__description--title">Behavioral Goals</div>
      <div className="print-system44__modal--boldtext">
        <p>
          <b> Assess Performance </b>
          {data.behaviour_goal !== Constants.NEEDS_ASSESSMENTS &&
            data.location.pathname === '/portfolio/studentGoals' && (
              <span className="print-system44__modal--span">
                <a
                  className="print-system44__hyper--link"
                  onClick={() => handleOpenLastAssesment()}
                  role="link"
                  tabIndex="0"
                >
                  View Last Assesment
                </a>
              </span>
            )}
        </p>
        <div className="row1">
          {behaviouralGoalsControls &&
            behaviouralGoalsControls.map((control, index) => (
              <div key={control.goal_name[0]}>
                <p>
                  {' '}
                  <b className="print-system44-modal__boldtext-assess--performance">
                    {control.goal_name[0].charAt(0).toUpperCase() + control.goal_name[0].slice(1)}
                  </b>
                </p>
                <div className="print-system44-modal__listdata--element">
                  <span className="print-system44__modal--listdata"> Whole Group </span>
                  <div className="print-system44__pull--right1">
                    <span
                      className={scoreClassName(index, 'whole_group_score', 1)}
                      onClick={() =>
                        handleBehaviourInputChange(control.goal_name[0], 'whole_group_score', 1)
                      }
                      role="link"
                      tabIndex="0"
                    >
                      1
                    </span>
                    <span
                      className={scoreClassName(index, 'whole_group_score', 2)}
                      onClick={() =>
                        handleBehaviourInputChange(control.goal_name[0], 'whole_group_score', 2)
                      }
                      role="link"
                      tabIndex="0"
                    >
                      2
                    </span>
                    <span
                      className={scoreClassName(index, 'whole_group_score', 3)}
                      onClick={() =>
                        handleBehaviourInputChange(control.goal_name[0], 'whole_group_score', 3)
                      }
                      role="link"
                      tabIndex="0"
                    >
                      3
                    </span>
                    <span
                      className={scoreClassName(index, 'whole_group_score', 4)}
                      onClick={() =>
                        handleBehaviourInputChange(control.goal_name[0], 'whole_group_score', 4)
                      }
                      role="link"
                      tabIndex="0"
                    >
                      4
                    </span>
                  </div>
                </div>
                <div className="print-system44-modal__listdata--element">
                  <span className="print-system44__modal--listdata"> Small Group </span>
                  <div className="print-system44__pull--right1">
                    <span
                      className={scoreClassName(index, 'small_group_score', 1)}
                      onClick={() =>
                        handleBehaviourInputChange(control.goal_name[0], 'small_group_score', 1)
                      }
                      role="link"
                      tabIndex="0"
                    >
                      1
                    </span>
                    <span
                      className={scoreClassName(index, 'small_group_score', 2)}
                      onClick={() =>
                        handleBehaviourInputChange(control.goal_name[0], 'small_group_score', 2)
                      }
                      role="link"
                      tabIndex="0"
                    >
                      2
                    </span>
                    <span
                      className={scoreClassName(index, 'small_group_score', 3)}
                      onClick={() =>
                        handleBehaviourInputChange(control.goal_name[0], 'small_group_score', 3)
                      }
                      role="link"
                      tabIndex="0"
                    >
                      3
                    </span>
                    <span
                      className={scoreClassName(index, 'small_group_score', 4)}
                      onClick={() =>
                        handleBehaviourInputChange(control.goal_name[0], 'small_group_score', 4)
                      }
                      role="link"
                      tabIndex="0"
                    >
                      4
                    </span>
                  </div>
                </div>
                <div className="print-system44-modal__listdata--element">
                  <span className="print-system44__modal--listdata"> Independent reading </span>
                  <div className="print-system44__pull--right1">
                    <span
                      className={scoreClassName(index, 'independent_reading_score', 1)}
                      onClick={() =>
                        handleBehaviourInputChange(
                          control.goal_name[0],
                          'independent_reading_score',
                          1
                        )
                      }
                      role="link"
                      tabIndex="0"
                    >
                      1
                    </span>
                    <span
                      className={scoreClassName(index, 'independent_reading_score', 2)}
                      onClick={() =>
                        handleBehaviourInputChange(
                          control.goal_name[0],
                          'independent_reading_score',
                          2
                        )
                      }
                      role="link"
                      tabIndex="0"
                    >
                      2
                    </span>
                    <span
                      className={scoreClassName(index, 'independent_reading_score', 3)}
                      onClick={() =>
                        handleBehaviourInputChange(
                          control.goal_name[0],
                          'independent_reading_score',
                          3
                        )
                      }
                      role="link"
                      tabIndex="0"
                    >
                      3
                    </span>
                    <span
                      className={scoreClassName(index, 'independent_reading_score', 4)}
                      onClick={() =>
                        handleBehaviourInputChange(
                          control.goal_name[0],
                          'independent_reading_score',
                          4
                        )
                      }
                      role="link"
                      tabIndex="0"
                    >
                      4
                    </span>
                  </div>
                </div>
                <div className="print-system44-modal__listdata--element">
                  <span className="print-system44__modal--listdata"> Software </span>
                  <div className="print-system44__pull--right1">
                    <span
                      className={scoreClassName(index, 'software_score', 1)}
                      onClick={() =>
                        handleBehaviourInputChange(control.goal_name[0], 'software_score', 1)
                      }
                      role="link"
                      tabIndex="0"
                    >
                      1
                    </span>
                    <span
                      className={scoreClassName(index, 'software_score', 2)}
                      onClick={() =>
                        handleBehaviourInputChange(control.goal_name[0], 'software_score', 2)
                      }
                      role="link"
                      tabIndex="0"
                    >
                      2
                    </span>
                    <span
                      className={scoreClassName(index, 'software_score', 3)}
                      onClick={() =>
                        handleBehaviourInputChange(control.goal_name[0], 'software_score', 3)
                      }
                      role="link"
                      tabIndex="0"
                    >
                      3
                    </span>
                    <span
                      className={scoreClassName(index, 'software_score', 4)}
                      onClick={() =>
                        handleBehaviourInputChange(control.goal_name[0], 'software_score', 4)
                      }
                      role="link"
                      tabIndex="0"
                    >
                      4
                    </span>
                  </div>
                  <span className="print-system44-modal__totalpoint--span">
                    {' '}
                    Total points earned:
                    <input
                      className="print-system44-modal__total--input"
                      type="text"
                      value={behaviouralGoalsControls[index].total || ''}
                      readOnly
                    />
                  </span>
                </div>
              </div>
            ))}
          <div className="print-system44-modal__inbox-remove--btn1 inbox-save-btn print-system44-modal__inbox-save--assesment">
            <button
              disabled={!enableSaveBehaviouralGoals}
              className="print-system44-modal__inbox-remove--btn2"
              onClick={handleSaveBehaviourGoals}
            >
              Save Assesment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

BehaviouralGoals.propTypes = {
  data: PropTypes.object,
  behaviouralGoalsControls: PropTypes.array,
  handleOpenLastAssesment: PropTypes.func.isRequired,
  enableSaveBehaviouralGoals: PropTypes.bool,
  handleBehaviourInputChange: PropTypes.func.isRequired,
  handleSaveBehaviourGoals: PropTypes.func.isRequired,
};

export default BehaviouralGoals;
