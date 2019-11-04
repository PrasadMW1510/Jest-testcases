import React from 'react';
import SAMModal from 'components/SAMModal';
import * as Constants from './constants';

export const okButton = (showGoalSaveSuccessModal, handleCloseSaveSuccessModal, savedItem) => (
  <SAMModal isOpen={showGoalSaveSuccessModal} modalClassModifier="system44-cancel-warning">
    <div>
      <div className="print-system44-modal__warning-heading-last--assessment" />
      <div className="print-system44__modal--content">{savedItem} Saved</div>
      <div className="print-system44__modal-save-status--buttons">
        <button
          className="print-system44__modal-save-status--button"
          onClick={handleCloseSaveSuccessModal}
        >
          Ok
        </button>
      </div>
    </div>
  </SAMModal>
);

export const onfirmOnLeaveButton = (unsavedData, closeStudentGoalModal) => (
  <SAMModal isOpen={unsavedData} modalClassModifier="print-system44-modal__cancel--warning">
    <div className="print-system44-modal__warning-heading-last--assessment">
      <div className="print-system44-modal__warning-heading-last--assessment">Warning </div>
      <div className="print-system44-modal__warning-heading-last-assessment--txt1">
        You have unsaved changes. Do you want to leave the screen without saving them?
      </div>
      <div className="print-system44-modal__buttons--firstset2">
        <button
          className="print-system44__modal-button--firstset print-system44__modal-button--yes"
          onClick={closeStudentGoalModal}
        >
          Yes
        </button>
        <button className="print-system44__modal-button--firstset print-system44__modal-button--no">
          No
        </button>
      </div>
    </div>
  </SAMModal>
);

export const getBehaviourControlState = () => [
  {
    goal_name: [Constants.RESPONSIBILITY],
    whole_group_score: [0],
    small_group_score: [0],
    independent_reading_score: [0],
    software_score: [0],
    total: 0,
  },
  {
    goal_name: [Constants.RESPECT],
    whole_group_score: [0],
    small_group_score: [0],
    independent_reading_score: [0],
    software_score: [0],
    total: 0,
  },
  {
    goal_name: [Constants.EFFORT],
    whole_group_score: [0],
    small_group_score: [0],
    independent_reading_score: [0],
    software_score: [0],
    total: 0,
  },
];

export const getSum = control =>
  control.whole_group_score[0] +
  control.small_group_score[0] +
  control.independent_reading_score[0] +
  control.software_score[0];

export const getObjectData = data => {
  const obj = {};
  if (data === Constants.DECODING) {
    obj.data = Constants.DECODING;
    obj.goalNameHeading = 'Decoding';
    obj.goalNameData = 'Progress Monitors indicate mastery of Topic skills';
  } else if (data === Constants.SPELLING) {
    obj.data = Constants.SPELLING;
    obj.goalNameHeading = 'Spelling';
    obj.goalNameData = 'Spelling Challenges assess current Topic words and review words';
  } else if (data === Constants.INDEPENDENT_READING) {
    obj.data = 'independent-reading';
    obj.goalNameHeading = 'Independent Reading';
    obj.goalNameData = 'SRC! Quizzes measure comprehension';
  }
  return obj;
};

export const footerButton = (
  handlePrint,
  clickedHandleCancel,
  handleGoToPrevPage,
  currentPageIndex,
  totalRecords,
  handleGoToNextPage
) => (
  <div className="print-activate-quiz__buttons">
    <div className="print-activate-quiz__primary-button">
      <div className="print-system44-modal__buttons--firstset1">
        <button
          className="print-system44__modal-button--firstset print-system44-modal-button-print"
          onClick={handlePrint}
        >
          Print
        </button>
        <button
          className="print-system44__modal-button--firstset print-system44-modal-button-cancel"
          onClick={clickedHandleCancel}
        >
          Cancel
        </button>
        <div className="system44-pagination">
          <div className="pager">
            <div className="pager-prev">
              <a className="previous" href="" onClick={handleGoToPrevPage}>
                {' '}
                &lt;{' '}
              </a>
            </div>
            <div className="pager-nor"> {currentPageIndex + 1} </div>
            <div className="pager-nor"> of </div>
            <div className="pager-nor"> {totalRecords} </div>
            <div className="pager-prev">
              <a className="previous" href="" onClick={handleGoToNextPage}>
                {' '}
                &gt;{' '}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const mapAcademicGoalDataModel = academicGoalData => {
  const newStateArrayDecoding = [];
  const newStateArraySpelling = [];
  const newStateArrayReading = [];
  if (academicGoalData[0].goal_name[0] === Constants.DECODING) {
    newStateArrayDecoding.push(
      academicGoalData[0].benchmark1_value[0],
      academicGoalData[0].benchmark2_value[0],
      academicGoalData[0].benchmark3_value[0],
      academicGoalData[0].benchmark4_value[0]
    );
  }
  if (academicGoalData[1].goal_name[0] === Constants.SPELLING) {
    newStateArraySpelling.push(
      academicGoalData[1].benchmark1_value[0],
      academicGoalData[1].benchmark2_value[0],
      academicGoalData[1].benchmark3_value[0],
      academicGoalData[1].benchmark4_value[0]
    );
  }
  if (academicGoalData[2].goal_name[0] === Constants.INDEPENDENT_READING) {
    newStateArrayReading.push(
      academicGoalData[2].benchmark1_value[0],
      academicGoalData[2].benchmark2_value[0],
      academicGoalData[2].benchmark3_value[0],
      academicGoalData[2].benchmark4_value[0]
    );
  }
  return [newStateArrayDecoding, newStateArraySpelling, newStateArrayReading];
};

export const validateBehaviourControls = behaviouralGoalsControls => {
  let isValid = true;
  behaviouralGoalsControls.forEach(control => {
    isValid =
      control.whole_group_score[0] !== 0 &&
      control.small_group_score[0] !== 0 &&
      control.independent_reading_score[0] !== 0 &&
      control.software_score[0] !== 0 &&
      isValid;
  });
  return isValid;
};

export const mapBehaviouralGoalDataModel = behaviouralGoalData => {
  const goalStructure = [];
  behaviouralGoalData.forEach(data => {
    if (data.goal_name[0] === Constants.RESPECT) {
      goalStructure[1] = data;
    } else if (data.goal_name[0] === Constants.RESPONSIBILITY) {
      goalStructure[0] = data;
    } else if (data.goal_name[0] === Constants.EFFORT) {
      goalStructure[2] = data;
    }
  });

  return goalStructure.map(data => ({
    goal_name: [data.goal_name[0]],
    whole_group_score: [parseInt(data.whole_group_score[0], 10)],
    small_group_score: [parseInt(data.small_group_score[0], 10)],
    independent_reading_score: [parseInt(data.independent_reading_score[0], 10)],
    software_score: [parseInt(data.software_score[0], 10)],
    total:
      parseInt(data.whole_group_score[0], 10) +
        parseInt(data.small_group_score[0], 10) +
        parseInt(data.independent_reading_score[0], 10) +
        parseInt(data.software_score[0], 10) || 0,
  }));
};

export const getFormattedDate = date => {
  let month = String(date.getMonth() + 1);
  let day = String(date.getDate());
  const year = String(date.getFullYear());
  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;
  return `${day}/${month}/${year}`;
};

export const mapPreviousAssesmentsData = behaviouralGoalData => {
  const behaviourGoals = {
    [Constants.WHOLE_GROUP]: [],
    [Constants.SMALL_GROUP]: [],
    [Constants.INDEPENDENT_READ]: [],
    Software: [],
    [Constants.TOTAL_POINTS_EARNED]: [],
  };

  const modelKeys = {
    [Constants.WHOLE_GROUP]: Constants.WHOLE_GROUP_SCORE,
    [Constants.SMALL_GROUP]: Constants.SMALL_GROUP_SCORE,
    [Constants.INDEPENDENT_READ]: Constants.INDEPENDENT_READING_SCORE,
    Software: Constants.SOFTWARE_SCORE,
    [Constants.TOTAL_POINTS_EARNED]: Constants.TOTAL,
  };

  Object.keys(behaviourGoals).forEach(key => {
    if (key !== Constants.TOTAL_POINTS_EARNED) {
      behaviourGoals[key].push(behaviouralGoalData[0][modelKeys[key]][0]);
      behaviourGoals[key].push(behaviouralGoalData[1][modelKeys[key]][0]);
      behaviourGoals[key].push(behaviouralGoalData[2][modelKeys[key]][0]);
    } else {
      behaviourGoals[key].push(behaviouralGoalData[0].total);
      behaviourGoals[key].push(behaviouralGoalData[1].total);
      behaviourGoals[key].push(behaviouralGoalData[2].total);
    }
  });
  return behaviourGoals;
};

export const getGoalsData = (goalNameModal, goalsData, handleClose) => (
  <SAMModal
    isOpen={goalNameModal}
    modalClassModifier={`print-system44-modal-warning-heading-layout print-system44-modal-warning-heading-${
      goalsData.data
    }`}
  >
    <div>
      <div className="print-system44-modal__warning-heading--wrapper ">
        <div className="print-system44-modal__warning--heading">{goalsData.goalNameHeading} </div>
        <button
          className="print-system44-modal-warning-heading__button--close"
          onClick={handleClose}
        >
          X
        </button>
      </div>
      <div className="print-system44-modal-warning-heading__warning--txt">
        {goalsData.goalNameData}
      </div>
    </div>
  </SAMModal>
);

export const getSampleArray = (
  system44StudentGoalDecoding,
  system44StudentGoalSpelling,
  system44StudentGoalReading
) => {
  const getAllSampleArray = [];
  const getSystem44StudentGoalDecoding = {};
  getSystem44StudentGoalDecoding.goal_name = Constants.DECODING;
  getSystem44StudentGoalDecoding.benchmark1_value = system44StudentGoalDecoding[0];
  getSystem44StudentGoalDecoding.benchmark2_value = system44StudentGoalDecoding[1];
  getSystem44StudentGoalDecoding.benchmark3_value = system44StudentGoalDecoding[2];
  getSystem44StudentGoalDecoding.benchmark4_value = system44StudentGoalDecoding[3];
  getAllSampleArray.push(getSystem44StudentGoalDecoding);

  const getSystem44StudentGoalSpelling = {};
  getSystem44StudentGoalSpelling.goal_name = Constants.SPELLING;
  getSystem44StudentGoalSpelling.benchmark1_value = system44StudentGoalSpelling[0];
  getSystem44StudentGoalSpelling.benchmark2_value = system44StudentGoalSpelling[1];
  getSystem44StudentGoalSpelling.benchmark3_value = system44StudentGoalSpelling[2];
  getSystem44StudentGoalSpelling.benchmark4_value = system44StudentGoalSpelling[3];
  getAllSampleArray.push(getSystem44StudentGoalSpelling);

  const getSystem44StudentGoalReading = {};
  getSystem44StudentGoalReading.goal_name = Constants.INDEPENDENT_READING;
  getSystem44StudentGoalReading.benchmark1_value = system44StudentGoalReading[0];
  getSystem44StudentGoalReading.benchmark2_value = system44StudentGoalReading[1];
  getSystem44StudentGoalReading.benchmark3_value = system44StudentGoalReading[2];
  getSystem44StudentGoalReading.benchmark4_value = system44StudentGoalReading[3];
  getAllSampleArray.push(getSystem44StudentGoalReading);
  return getAllSampleArray;
};
