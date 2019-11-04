import React from 'react';
import PropTypes from 'prop-types';
import SAMModal from 'components/SAMModal';
import * as Constants from './constants';

const PreviousBehaviouralGoalsModal = ({
  data,
  showLastAssesmentModal,
  lastAssementDateBehaviouralGoal,
  previousAssesmentsData,
  handleOpenLastAssesment,
}) => {
  const pointsClassName = key =>
    key === 'Total Points Earned'
      ? 'recipients-table__class-individual-textdata--final'
      : 'recipients-table__class-individual--textdata';
  return (
    data.behaviour_goal !== Constants.NEEDS_ASSESSMENTS && (
      <SAMModal
        isOpen={showLastAssesmentModal}
        modalClassModifier="print-system44-modal__warning-heading-wrapper-last--assesment"
      >
        <div className="print-system44-modal__warning-heading-last--assessment">
          <div className="print-system44-modal__warning-heading-last-assessment--heading">
            {data.student_name}
          </div>
          <button
            className="print-system44-modal-warning-heading__button--close"
            onClick={handleOpenLastAssesment}
          >
            X
          </button>
        </div>
        <div className="print-system44-modal__warning-heading-last-assessment-display--content">
          <div className="print-system44-modal__warning-heading-last-assessment-display-content--paragraph">
            Last Behavioral Goals Assesment
            <ul className="print-system44__modal-list--style">
              <li>{lastAssementDateBehaviouralGoal}</li>
            </ul>
          </div>
          <div>
            <table className="print-system44__recipients--table">
              <thead className="print-system44__recipients-table--heading">
                <tr>
                  <th className="print-system44__recipients-table--class" />
                  <th className="print-system44__recipients-table--class">Responsibility</th>
                  <th className="print-system44__recipients-table--class">Respect</th>
                  <th className="print-system44__recipients-table--class">Effort</th>
                </tr>
              </thead>
              <tbody className="print-system44__recipients-table--body">
                {previousAssesmentsData &&
                  Object.keys(previousAssesmentsData).map(key => (
                    <tr className="print-system44__recipients-table-class--row" key={key}>
                      <td className={pointsClassName(key)}>{key}</td>
                      {previousAssesmentsData &&
                        previousAssesmentsData[key].map(score => (
                          <td key={key} className={pointsClassName(key)}>
                            {score}
                          </td>
                        ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </SAMModal>
    )
  );
};
PreviousBehaviouralGoalsModal.propTypes = {
  data: PropTypes.object,
  showLastAssesmentModal: PropTypes.bool.isRequired,
  lastAssementDateBehaviouralGoal: PropTypes.string,
  previousAssesmentsData: PropTypes.object,
  handleOpenLastAssesment: PropTypes.func.isRequired,
};

export default PreviousBehaviouralGoalsModal;
