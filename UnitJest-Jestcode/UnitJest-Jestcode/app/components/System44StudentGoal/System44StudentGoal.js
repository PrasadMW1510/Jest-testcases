/**
 *
 * System44StudentGoal
 *
 */

import React from 'react';
import SAMModal from 'components/SAMModal';
import PropTypes from 'prop-types';

import AcademicGoals from './AcademicGoals';
import BehaviouralGoals from './BehaviouralGoals';
import PreviousBehaviouralGoalsModal from './PreviousBehaviouralGoalsModal';
import PrintSystem44StudentGoal from './PrintSystem44StudentGoal';
import {
  okButton,
  onfirmOnLeaveButton,
  getBehaviourControlState,
  getSum,
  getObjectData,
  validateBehaviourControls,
  mapAcademicGoalDataModel,
  mapBehaviouralGoalDataModel,
  mapPreviousAssesmentsData,
  footerButton,
  getGoalsData,
  getFormattedDate,
} from './common';
import './System44StudentGoal.scss';
import * as Constants from './constants';

class System44StudentGoal extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      system44StudentGoalDecoding: [],
      system44StudentGoalSpelling: [],
      system44StudentGoalReading: [],
      enableSaveGoals: false,
      showErrorDecoding: false,
      showErrorReading: false,
      showErrorSpelling: false,
      defaultDecodingData: [],
      defaultSpellingData: [],
      defaultReadingData: [],
      showError4: false,
      showError5: false,
      showError6: false,
      showErrorProgressiveDecoding: false,
      showErrorProgressiveSpelling: false,
      showErrorProgressiveReading: false,
      goalNameModal: false,
      goalsData: {},
      behaviouralGoalsControls: getBehaviourControlState(),
      enableSaveBehaviouralGoals: false,
      showLastAssesmentModal: false,
      previousAssesmentsData: null,
      lastAssementDateAcademicGoal: null,
      unsavedData: false,
      showErrorEmptyDecoding: false,
      showErrorEmptySpelling: false,
      showErrorEmptyReading: false,
      currentPageIndex: this.props.data.selectedIndex,
    };
  }

  componentWillReceiveProps(nextProps) {
    let academicGoalData;
    let behaviourGoalData;
    let previousAssesmentData;
    let mappedDefaultGoalModel;
    let lastAssementDateAcademicGoal;
    let lastAssementDateBehaviouralGoal;
    if (
      nextProps.data.goals === Constants.DEFAULT_GOALS &&
      nextProps.data.behaviour_goal === Constants.NEEDS_ASSESSMENTS
    ) {
      academicGoalData =
        nextProps.defaultGoalsData && nextProps.defaultGoalsData.academic_goals[0].goal;
      behaviourGoalData = getBehaviourControlState();
      previousAssesmentData =
        nextProps.combinedGoalsData &&
        nextProps.combinedGoalsData.goals[0].behavioral_goals[0].goal;
    } else if (
      nextProps.data.goals === Constants.DEFAULT_GOALS &&
      nextProps.data.behaviour_goal !== Constants.NEEDS_ASSESSMENTS
    ) {
      academicGoalData =
        nextProps.defaultGoalsData && nextProps.defaultGoalsData.academic_goals[0].goal;
      if (nextProps.data.location.pathname === '/portfolio/studentGoals') {
        behaviourGoalData = getBehaviourControlState();
        previousAssesmentData =
          nextProps.combinedGoalsData &&
          nextProps.combinedGoalsData.goals[0].behavioral_goals[0].goal;
      } else {
        behaviourGoalData =
          nextProps.combinedGoalsData &&
          nextProps.combinedGoalsData.goals[0].behavioral_goals[0].goal;
      }
    } else if (
      nextProps.data.goals !== Constants.DEFAULT_GOALS &&
      nextProps.data.behaviour_goal === Constants.NEEDS_ASSESSMENTS
    ) {
      academicGoalData =
        nextProps.combinedGoalsData && nextProps.combinedGoalsData.goals[0].academic_goals[0].goal;
      behaviourGoalData = getBehaviourControlState();
      previousAssesmentData =
        nextProps.combinedGoalsData &&
        nextProps.combinedGoalsData.goals[0].behavioral_goals[0].goal;
    } else if (
      nextProps.data.goals !== Constants.DEFAULT_GOALS &&
      nextProps.data.behaviour_goal !== Constants.NEEDS_ASSESSMENTS
    ) {
      academicGoalData =
        nextProps.combinedGoalsData && nextProps.combinedGoalsData.goals[0].academic_goals[0].goal;
      if (nextProps.data.location.pathname === '/portfolio/studentGoals') {
        behaviourGoalData = getBehaviourControlState();
        previousAssesmentData =
          nextProps.combinedGoalsData &&
          nextProps.combinedGoalsData.goals[0].behavioral_goals[0].goal;
      } else {
        behaviourGoalData =
          nextProps.combinedGoalsData &&
          nextProps.combinedGoalsData.goals[0].behavioral_goals[0].goal;
      }
    }

    const mappedAcademicGoalModel = academicGoalData && mapAcademicGoalDataModel(academicGoalData);
    const mappedbehaviourGoalModel =
      behaviourGoalData && mapBehaviouralGoalDataModel(behaviourGoalData);
    const mappedPreviousAssesmentsModel =
      previousAssesmentData && mapBehaviouralGoalDataModel(previousAssesmentData);
    const mappedPreviousAssesmentsData =
      mappedPreviousAssesmentsModel && mapPreviousAssesmentsData(mappedPreviousAssesmentsModel);

    if (nextProps.defaultGoalsData && nextProps.defaultGoalsData.academic_goals[0].goal) {
      mappedDefaultGoalModel = mapAcademicGoalDataModel(
        nextProps.defaultGoalsData.academic_goals[0].goal
      );
    }
    if (nextProps.data.location.pathname === '/portfolio/studentGoals') {
      lastAssementDateAcademicGoal =
        nextProps.data.metaData[this.state.currentPageIndex].goals === Constants.DEFAULT_GOALS
          ? getFormattedDate(new Date())
          : getFormattedDate(
              new Date(
                nextProps.data.metaData[this.state.currentPageIndex].goals
                  .split(' ')[0]
                  .split('-')
                  .join('/')
              )
            );
      lastAssementDateBehaviouralGoal =
        nextProps.data.metaData[this.state.currentPageIndex].behaviour_goal ===
        Constants.NEEDS_ASSESSMENTS
          ? getFormattedDate(new Date())
          : getFormattedDate(
              new Date(
                nextProps.data.metaData[this.state.currentPageIndex].behaviour_goal
                  .split(' ')[0]
                  .split('-')
                  .join('/')
              )
            );
    } else {
      lastAssementDateAcademicGoal = nextProps.data.metaData[this.state.currentPageIndex].goals;
    }

    if (mappedAcademicGoalModel && mappedDefaultGoalModel && mappedbehaviourGoalModel) {
      if (
        nextProps.system44studentgoalcontainer.behaviouralGoalSaveStatus &&
        nextProps.system44studentgoalcontainer.behaviouralGoalSaveStatus.work_item_id[0]
      ) {
        this.setState(prevState => ({
          behaviouralGoalsControls: prevState.behaviouralGoalsControls,
        }));
      } else {
        this.setState({
          behaviouralGoalsControls: mappedbehaviourGoalModel,
        });
      }

      this.setState(prevState => {
        if (prevState.system44StudentGoalDecoding.length > 0) {
          return {
            system44StudentGoalDecoding: prevState.system44StudentGoalDecoding,
            system44StudentGoalSpelling: prevState.system44StudentGoalSpelling,
            system44StudentGoalReading: prevState.system44StudentGoalReading,
          };
        }
        return {
          system44StudentGoalDecoding: mappedAcademicGoalModel[0],
          system44StudentGoalSpelling: mappedAcademicGoalModel[1],
          system44StudentGoalReading: mappedAcademicGoalModel[2],
        };
      });

      if (nextProps.system44studentgoalcontainer.academicGoalSaveStatus) {
        this.setState({
          defaultDecodingData: mappedDefaultGoalModel[0],
          defaultSpellingData: mappedDefaultGoalModel[1],
          defaultReadingData: mappedDefaultGoalModel[2],
          previousAssesmentsData: mappedPreviousAssesmentsData,
          lastAssementDateAcademicGoal,
          lastAssementDateBehaviouralGoal,
        });
      } else {
        this.setState({
          defaultDecodingData: mappedDefaultGoalModel[0],
          defaultSpellingData: mappedDefaultGoalModel[1],
          defaultReadingData: mappedDefaultGoalModel[2],
          previousAssesmentsData: mappedPreviousAssesmentsData,
          lastAssementDateAcademicGoal,
          lastAssementDateBehaviouralGoal,
          academicGoalsControls: academicGoalData,
        });
      }
    }
    if (
      nextProps.system44studentgoalcontainer.academicGoalSaveStatus &&
      nextProps.system44studentgoalcontainer.academicGoalSaveStatus.success[0] === '1'
    ) {
      this.setState({ showGoalSaveSuccessModal: true });
    } else {
      this.setState({ showGoalSaveSuccessModal: false });
    }

    if (
      nextProps.system44studentgoalcontainer.behaviouralGoalSaveStatus &&
      nextProps.system44studentgoalcontainer.behaviouralGoalSaveStatus.work_item_id[0]
    ) {
      this.setState({ showAssesmentSaveSuccessModal: true });
    } else {
      this.setState({ showAssesmentSaveSuccessModal: false });
    }
  }

  handleClose = () => {
    this.setState({ goalNameModal: false });
  };

  handlePrint = () => {
    window.print();
  };

  handleGoalNameClick = (e, data) => {
    const obj = getObjectData(data);
    this.setState({ goalNameModal: true, goalsData: obj });
  };

  resetDefault = () => {
    const newSystem44StudentGoalDecoding = this.state.defaultDecodingData.slice();
    const newSystem44StudentGoalSpelling = this.state.defaultSpellingData.slice();
    const newSystem44StudentGoalReading = this.state.defaultReadingData.slice();

    this.setState({
      system44StudentGoalDecoding: newSystem44StudentGoalDecoding,
      system44StudentGoalSpelling: newSystem44StudentGoalSpelling,
      system44StudentGoalReading: newSystem44StudentGoalReading,
      enableSaveGoals: true,
      showErrorDecoding: false,
      showErrorSpelling: false,
      showErrorReading: false,
      showErrorProgressiveDecoding: false,
      showErrorProgressiveSpelling: false,
      showErrorProgressiveReading: false,
    });
  };

  validateMaxValueForGoal = (currentGoalValue, DefaultGoalValue) => {
    if (parseInt(currentGoalValue, 10) > parseInt(DefaultGoalValue, 10)) {
      return true;
    }
    return false;
  };

  handleSaveGoals = () => {
    const showErrorDecoding = this.validateMaxValueForGoal(
      this.state.system44StudentGoalDecoding[3],
      this.state.defaultDecodingData[3]
    );
    const showErrorSpelling = this.validateMaxValueForGoal(
      this.state.system44StudentGoalSpelling[3],
      this.state.defaultDecodingData[3]
    );
    const showErrorReading = this.validateMaxValueForGoal(
      this.state.system44StudentGoalReading[3],
      this.state.defaultReadingData[3]
    );
    this.setState(prevState => ({
      showErrorDecoding,
      showErrorSpelling,
      showErrorReading,
      showErrorProgressiveDecoding: prevState.showError4,
      showErrorProgressiveSpelling: prevState.showError5,
      showErrorProgressiveReading: prevState.showError6,
      enableSaveGoals: false,
    }));

    if (
      showErrorDecoding !== true &&
      showErrorSpelling !== true &&
      showErrorReading !== true &&
      this.state.showError4 !== true &&
      this.state.showError5 !== true &&
      this.state.showError6 !== true
    ) {
      const rootElm = {
        output: {
          output_data: {
            goals: {},
          },
        },
      };

      const getAllSampleArray = [];
      const getSystem44StudentGoalDecoding = {};
      getSystem44StudentGoalDecoding.goal_name = Constants.DECODING;
      getSystem44StudentGoalDecoding.benchmark1_value = this.state.system44StudentGoalDecoding[0];
      getSystem44StudentGoalDecoding.benchmark2_value = this.state.system44StudentGoalDecoding[1];
      getSystem44StudentGoalDecoding.benchmark3_value = this.state.system44StudentGoalDecoding[2];
      getSystem44StudentGoalDecoding.benchmark4_value = this.state.system44StudentGoalDecoding[3];
      getAllSampleArray.push(getSystem44StudentGoalDecoding);

      const getSystem44StudentGoalSpelling = {};
      getSystem44StudentGoalSpelling.goal_name = Constants.SPELLING;
      getSystem44StudentGoalSpelling.benchmark1_value = this.state.system44StudentGoalSpelling[0];
      getSystem44StudentGoalSpelling.benchmark2_value = this.state.system44StudentGoalSpelling[1];
      getSystem44StudentGoalSpelling.benchmark3_value = this.state.system44StudentGoalSpelling[2];
      getSystem44StudentGoalSpelling.benchmark4_value = this.state.system44StudentGoalSpelling[3];
      getAllSampleArray.push(getSystem44StudentGoalSpelling);

      const getSystem44StudentGoalReading = {};
      getSystem44StudentGoalReading.goal_name = Constants.INDEPENDENT_READING;
      getSystem44StudentGoalReading.benchmark1_value = this.state.system44StudentGoalReading[0];
      getSystem44StudentGoalReading.benchmark2_value = this.state.system44StudentGoalReading[1];
      getSystem44StudentGoalReading.benchmark3_value = this.state.system44StudentGoalReading[2];
      getSystem44StudentGoalReading.benchmark4_value = this.state.system44StudentGoalReading[3];
      getAllSampleArray.push(getSystem44StudentGoalReading);

      const mappedVal = getAllSampleArray.map(goalVal => ({
        goal_name: goalVal.goal_name,
        benchmark1_value: goalVal.benchmark1_value,
        benchmark2_value: goalVal.benchmark2_value,
        benchmark3_value: goalVal.benchmark3_value,
        benchmark4_value: goalVal.benchmark4_value,
      }));
      rootElm.output.output_data.goals.goal = mappedVal;
      this.props.handleSaveGoals(
        rootElm,
        this.props.data.metaData[this.state.currentPageIndex].studentId ||
          this.props.data.metaData[this.state.currentPageIndex].id
      );
    }
  };

  clickedHandleCancel = () => {
    if (this.state.enableSaveGoals || this.state.enableSaveBehaviouralGoals) {
      this.setState({ unsavedData: true });
    } else {
      this.props.closeStudentGoalModal();
    }
  };

  handleChange = (name, index, event) => {
    this.setState({
      showError4: false,
      showError5: false,
      showError6: false,
      showErrorDecoding: false,
      showErrorSpelling: false,
      showErrorReading: false,
      showErrorProgressiveDecoding: false,
      showErrorProgressiveSpelling: false,
      showErrorProgressiveReading: false,
    });

    const newSystem44StudentGoalDecoding = this.state.system44StudentGoalDecoding.slice();
    const newSystem44StudentGoalSpelling = this.state.system44StudentGoalSpelling.slice();
    const newSystem44StudentGoalReading = this.state.system44StudentGoalReading.slice();

    if (name === Constants.DECODING) {
      if (event.target.value.match(/^\d+$/) || event.target.value === '') {
        newSystem44StudentGoalDecoding[index] = event.target.value;
        if (event.target.value === '') {
          this.setState({
            system44StudentGoalDecoding: newSystem44StudentGoalDecoding,
            showErrorEmptyDecoding: true,
            enableSaveGoals: false,
          });
        } else {
          this.setState({
            system44StudentGoalDecoding: newSystem44StudentGoalDecoding,
            showErrorEmptyDecoding: false,
            enableSaveGoals: true,
          });
        }
      }
    }

    if (name === Constants.SPELLING) {
      if (event.target.value.match(/^\d+$/) || event.target.value === '') {
        newSystem44StudentGoalSpelling[index] = event.target.value;
        if (event.target.value === '') {
          this.setState({
            system44StudentGoalSpelling: newSystem44StudentGoalSpelling,
            showErrorEmptySpelling: true,
            enableSaveGoals: false,
          });
        } else {
          this.setState({
            system44StudentGoalSpelling: newSystem44StudentGoalSpelling,
            showErrorEmptySpelling: false,
            enableSaveGoals: true,
          });
        }
      }
    }

    if (name === Constants.INDEPENDENT_READING) {
      if (event.target.value.match(/^\d+$/) || event.target.value === '') {
        newSystem44StudentGoalReading[index] = event.target.value;
        if (event.target.value === '') {
          this.setState({
            system44StudentGoalReading: newSystem44StudentGoalReading,
            showErrorEmptyReading: true,
            enableSaveGoals: false,
          });
        } else {
          this.setState({
            system44StudentGoalReading: newSystem44StudentGoalReading,
            showErrorEmptyReading: false,
            enableSaveGoals: true,
          });
        }
      }
    }
    newSystem44StudentGoalDecoding.forEach((outerItem1, outerIndex1) => {
      const firstItem1 = parseInt(outerItem1, 10);
      newSystem44StudentGoalDecoding.forEach((itema, indexa) => {
        const secondItem1 = parseInt(itema, 10);
        if (indexa > outerIndex1 && firstItem1 > secondItem1) {
          this.setState({ showError4: true });
        }
      });
    });

    newSystem44StudentGoalSpelling.forEach((outerItem2, outerIndex2) => {
      const firstItem2 = parseInt(outerItem2, 10);
      newSystem44StudentGoalSpelling.forEach((itemb, indexb) => {
        const secondItem2 = parseInt(itemb, 10);
        if (indexb > outerIndex2 && firstItem2 > secondItem2) {
          this.setState({ showError5: true });
        }
      });
    });

    newSystem44StudentGoalReading.forEach((outerItem3, outerIndex3) => {
      const firstItem3 = parseInt(outerItem3, 10);
      newSystem44StudentGoalReading.forEach((itemc, indexc) => {
        const secondItem3 = parseInt(itemc, 10);
        if (indexc > outerIndex3) {
          if (firstItem3 > secondItem3) {
            this.setState({ showError6: true });
          }
        }
      });
    });
  };

  handleBehaviourInputChange = (controlType, controlName, value) => {
    const newBehaviouralGoalsControls = [...this.state.behaviouralGoalsControls];
    switch (controlType) {
      case Constants.RESPONSIBILITY:
        newBehaviouralGoalsControls[0][controlName][0] = value;
        newBehaviouralGoalsControls[0].total = getSum(newBehaviouralGoalsControls[0]);
        break;

      case Constants.RESPECT:
        newBehaviouralGoalsControls[1][controlName][0] = value;
        newBehaviouralGoalsControls[1].total = getSum(newBehaviouralGoalsControls[1]);
        break;

      case Constants.EFFORT:
        newBehaviouralGoalsControls[2][controlName][0] = value;
        newBehaviouralGoalsControls[2].total = getSum(newBehaviouralGoalsControls[2]);
        break;

      default:
        return;
    }
    const isValid = validateBehaviourControls(this.state.behaviouralGoalsControls);
    this.setState({
      behaviouralGoalsControls: newBehaviouralGoalsControls,
      enableSaveBehaviouralGoals: isValid,
    });
  };

  handleSaveBehaviourGoals = () => {
    this.setState({
      enableSaveBehaviouralGoals: false,
    });
    const rootElm = {
      output: {
        output_data: {
          goals: {},
        },
      },
    };
    const studentId = this.props.data.metaData[this.state.currentPageIndex].studentId;
    const combineBehavioralGoals = this.props.combinedGoalsData.goals[0].behavioral_goals[0];
    const requestMap = [];
    this.state.behaviouralGoalsControls.forEach(behaviour => {
      const mapData = {
        goal_name: behaviour.goal_name[0],
        whole_group_score: behaviour.whole_group_score[0],
        small_group_score: behaviour.small_group_score[0],
        independent_reading_score: behaviour.independent_reading_score[0],
        software_score: behaviour.software_score[0],
      };
      if (behaviour.goal_name[0] === Constants.RESPECT) requestMap[0] = mapData;
      else if (behaviour.goal_name[0] === Constants.EFFORT) requestMap[1] = mapData;
      else if (behaviour.goal_name[0] === Constants.RESPONSIBILITY) requestMap[2] = mapData;
    });
    rootElm.output.output_data.goals.goal = requestMap;

    if (
      this.props.system44studentgoalcontainer.behaviouralGoalSaveStatus &&
      this.props.data.location.pathname === '/portfolio/studentGoals'
    ) {
      this.props.handleUpdateStudentBehaviourGoals(
        rootElm,
        studentId,
        1,
        this.props.system44studentgoalcontainer.behaviouralGoalSaveStatus.work_item_id[0]
      );
    } else if (
      combineBehavioralGoals.$ &&
      combineBehavioralGoals.$.work_item_id &&
      this.props.data.location.pathname !== '/portfolio/studentGoals'
    ) {
      this.props.handleUpdateStudentBehaviourGoals(
        rootElm,
        studentId,
        1,
        combineBehavioralGoals.$.work_item_id
      );
    } else {
      this.props.handleSaveBehaviourGoals(rootElm, studentId, 0);
    }
  };

  handleOpenLastAssesment = () => {
    this.setState(prevState => ({
      showLastAssesmentModal: !prevState.showLastAssesmentModal,
    }));
  };

  handleCloseSaveSuccessModal = () => {
    this.setState({
      showAssesmentSaveSuccessModal: false,
      showGoalSaveSuccessModal: false,
    });
  };

  handleGoToPrevPage = e => {
    e.preventDefault();
    if (this.state.currentPageIndex === 0) {
      return;
    }
    const prevRow = this.props.data.metaData[this.state.currentPageIndex - 1];
    this.setState({
      currentPageIndex: this.state.currentPageIndex - 1,
    });

    if (this.props.data.location.pathname === '/portfolio/studentWorks') {
      this.props.handlePagination(this.state.currentPageIndex - 1);
    } else if (this.props.data.location.pathname === '/portfolio/studentGoals') {
      this.props.handlePagination(prevRow.studentId);
    }
  };

  handleGoToNextPage = e => {
    e.preventDefault();
    if (this.state.currentPageIndex === this.props.data.metaData.length - 1) {
      return;
    }
    const nextRow = this.props.data.metaData[this.state.currentPageIndex + 1];
    this.setState({
      currentPageIndex: this.state.currentPageIndex + 1,
    });
    if (this.props.data.location.pathname === '/portfolio/studentWorks') {
      this.props.handlePagination(this.state.currentPageIndex + 1);
    } else if (this.props.data.location.pathname === '/portfolio/studentGoals') {
      this.props.handlePagination(nextRow.studentId);
    }
  };

  render() {
    const { isOpen } = this.props;
    const currentMetadata =
      this.props.data && this.props.data.metaData[this.state.currentPageIndex];
    return (
      <div>
        <div className="no-print">
          <SAMModal
            isOpen={isOpen}
            contentLabel="activate Quiz"
            modalClassModifier="system44-student-goal__modal-system44--modal"
            id="pcq"
          >
            <div className="print-system44__modal-list--wrapper">
              <div className="print-system44__modal-list--purple">
                <div className="print-system44__modal-list--heading">
                  {currentMetadata.student_name || currentMetadata.student}
                </div>
                <div>
                  <button
                    className="print-system44-modal__button--close"
                    onClick={this.clickedHandleCancel}
                  >
                    X
                  </button>
                </div>
              </div>
              <div className="print-system44__modal--title">
                System 44 Next Generation{' '}
                <span className="print-system44__modal-title--span">
                  {' '}
                  Student Goals:{' '}
                  {this.state.lastAssementDateAcademicGoal ||
                    (currentMetadata.date &&
                      currentMetadata.date
                        .split('T')[0]
                        .split('-')
                        .reverse()
                        .join('/'))}
                </span>
              </div>
              <AcademicGoals
                resetDefault={this.resetDefault}
                handleGoalNameClick={this.handleGoalNameClick}
                handleSaveGoals={this.handleSaveGoals}
                handleChange={this.handleChange}
                academicGoalsControls={this.state.academicGoalsControls}
                system44StudentGoalDecoding={this.state.system44StudentGoalDecoding}
                system44StudentGoalSpelling={this.state.system44StudentGoalSpelling}
                system44StudentGoalReading={this.state.system44StudentGoalReading}
                defaultDecodingData={this.state.defaultDecodingData}
                defaultSpellingData={this.state.defaultSpellingData}
                defaultReadingData={this.state.defaultReadingData}
                showErrorDecoding={this.state.showErrorDecoding}
                showErrorEmptyDecoding={this.state.showErrorEmptyDecoding}
                showErrorProgressiveDecoding={this.state.showErrorProgressiveDecoding}
                showErrorSpelling={this.state.showErrorSpelling}
                showErrorProgressiveSpelling={this.state.showErrorProgressiveSpelling}
                showErrorEmptySpelling={this.state.showErrorEmptySpelling}
                showErrorReading={this.state.showErrorReading}
                showErrorProgressiveReading={this.state.showErrorProgressiveReading}
                showErrorEmptyReading={this.state.showErrorEmptyReading}
                enableSaveGoals={this.state.enableSaveGoals}
              />

              <BehaviouralGoals
                data={this.props.data}
                handleOpenLastAssesment={this.handleOpenLastAssesment}
                behaviouralGoalsControls={this.state.behaviouralGoalsControls}
                enableSaveBehaviouralGoals={this.state.enableSaveBehaviouralGoals}
                handleBehaviourInputChange={this.handleBehaviourInputChange}
                handleSaveBehaviourGoals={this.handleSaveBehaviourGoals}
              />
              {footerButton(
                this.handlePrint,
                this.clickedHandleCancel,
                this.handleGoToPrevPage,
                this.state.currentPageIndex,
                this.props.data.metaData.length,
                this.handleGoToNextPage
              )}
              {onfirmOnLeaveButton(this.state.unsavedData, this.props.closeStudentGoalModal)}
              {getGoalsData(this.state.goalNameModal, this.state.goalsData, this.handleClose)}

              <PreviousBehaviouralGoalsModal
                data={this.props.data}
                showLastAssesmentModal={this.state.showLastAssesmentModal}
                lastAssementDateBehaviouralGoal={this.state.lastAssementDateBehaviouralGoal}
                previousAssesmentsData={this.state.previousAssesmentsData}
                handleOpenLastAssesment={this.handleOpenLastAssesment}
              />
              {okButton(
                this.state.showGoalSaveSuccessModal,
                this.handleCloseSaveSuccessModal,
                'Goals'
              )}
              {okButton(
                this.state.showAssesmentSaveSuccessModal,
                this.handleCloseSaveSuccessModal,
                'Assessment'
              )}
            </div>
          </SAMModal>
        </div>
        <PrintSystem44StudentGoal
          lastAssementDateAcademicGoal={this.state.lastAssementDateAcademicGoal}
          system44StudentGoalDecoding={this.state.system44StudentGoalDecoding}
          system44StudentGoalSpelling={this.state.system44StudentGoalDecoding}
          system44StudentGoalReading={this.state.system44StudentGoalReading}
          behaviouralGoalsControls={this.state.behaviouralGoalsControls}
          data={this.props.data}
          currentPageIndex={this.state.currentPageIndex}
        />
      </div>
    );
  }
}

System44StudentGoal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleSaveGoals: PropTypes.func.isRequired,
  system44studentgoalcontainer: PropTypes.object,
  data: PropTypes.object,
  closeStudentGoalModal: PropTypes.func.isRequired,
  defaultGoalsData: PropTypes.object,
  combinedGoalsData: PropTypes.any,
  handlePagination: PropTypes.func.isRequired,
  handleSaveBehaviourGoals: PropTypes.func.isRequired,
  handleUpdateStudentBehaviourGoals: PropTypes.func.isRequired,
};

export default System44StudentGoal;
