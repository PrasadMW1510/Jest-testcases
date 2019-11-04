/**
 *
 * InboxProgram
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';
import SimulationProgram from 'components/SimulationProgram';
import SkillsAssestments from 'components/SkillsAssestments';
import myImage from 'images/portfolio-logo.png';
import * as Constants from './constants';
import './InboxProgram.scss';

class InboxProgram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: false,
      evaluationData: {},
      btnDisable: true,
      saveWarningModal: false,
      tabIndex: 0,
      selectedTabindex: 0,
      selectedQuestionTabindex: 0,
      modalOption: '',
      questionTabIndex: 0,
      previousDisable: false,
      nextDisable: false,
      resetStateData: false,
    };
  }

  toggle(e) {
    e.preventDefault();
    this.setState({
      shown: true,
    });
  }
  closeblock(e) {
    e.preventDefault();
    this.setState({
      shown: false,
    });
  }

  print = () => {
    window.print();
  };

  storeData = evUpdate => {
    this.setState({ evaluationData: evUpdate, btnDisable: false, resetStateData: false });
  };

  resetSaveButton = () => {
    this.setState({ btnDisable: true });
  };

  saveData = () => {
    this.props.saveQuestion(this.state.evaluationData);
    this.setState({ btnDisable: true });
  };

  saveWarningModalClose = () => {
    this.setState({
      saveWarningModal: false,
    });
  };

  saveWarningModalProceed = () => {
    this.resetSaveButton();
    this.setState({
      saveWarningModal: false,
    });
    if (this.state.modalOption === Constants.MODAL_OPTION_CANCEL || this.state.modalOption === '') {
      this.props.handleCancel();
    }
    if (this.state.modalOption === Constants.INBOX_PROGRAM_TABS) {
      this.setState({
        tabIndex: this.state.selectedTabindex,
        selectedQuestionTabindex: 0,
        questionTabIndex: 0,
        resetStateData: true,
      });
    } else if (this.state.modalOption === Constants.MODAL_OPTION_QUESTION_TABS) {
      this.setState({
        questionTabIndex: this.state.selectedQuestionTabindex,
        resetStateData: true,
      });
    } else if (this.state.modalOption === 'Previous') {
      this.setState({ resetStateData: true });
      this.props.prevSerd();
    } else if (this.state.modalOption === 'Next') {
      this.setState({ resetStateData: true });
      this.props.nextSerd();
    }
  };

  handleModalCancel = () => {
    this.setState({ modalOption: Constants.MODAL_OPTION_CANCEL });
    if (this.state.btnDisable === false) {
      this.showWarningModal(this.state.tabIndex);
    } else {
      this.props.handleCancel();
    }
  };

  showWarning = (tabIndex, tabOption) => {
    this.setState({ modalOption: tabOption });
    if (tabOption === Constants.INBOX_PROGRAM_TABS) this.setState({ selectedTabindex: tabIndex });
    if (tabOption === Constants.MODAL_OPTION_QUESTION_TABS)
      this.setState({ selectedQuestionTabindex: tabIndex });
    this.showWarningModal(tabIndex, tabOption);
  };

  showWarningModal = (tabIndex, tabOption) => {
    if (this.state.btnDisable === false) {
      this.setState({
        saveWarningModal: true,
      });
      return Constants.MODAL_OPENED;
    }
    if (tabOption === Constants.INBOX_PROGRAM_TABS) this.setState({ tabIndex });
    if (tabOption === Constants.MODAL_OPTION_QUESTION_TABS)
      this.setState({ questionTabIndex: tabIndex });

    return '';
  };

  handlePrevious = e => {
    e.preventDefault();
    this.setState({ modalOption: 'Previous' });
    if (this.state.btnDisable === false) {
      this.setState({
        saveWarningModal: true,
      });
      return Constants.MODAL_OPENED;
    }
    this.setState({ resetStateData: true });
    this.props.prevSerd(e);
    return '';
  };

  handleNext = e => {
    e.preventDefault();
    this.setState({ modalOption: 'Next' });
    if (this.state.btnDisable === false) {
      this.setState({
        saveWarningModal: true,
      });

      return Constants.MODAL_OPENED;
    }
    this.setState({ resetStateData: true });
    this.props.nextSerd(e);
    return '';
  };
  renderQuestion = path => {
    this.props.getQuestion(path);
  };
  render() {
    const { isOpen } = this.props;
    const math180saveclass = [
      'print-math180-modal-button-second-set print-math180-modal-button-save',
    ];
    if (!this.state.btnDisable) {
      math180saveclass.push('print-math180-modal-button-save-blue');
    }

    return (
      <div>
        <SAMModal
          isOpen={isOpen}
          contentLabel="Test"
          modalClassModifier="modal--inboxprogramlabel-quiz"
          id="pcq"
        >
          <div>
            <div className="inbox-program-logo-align">
              <img src={myImage} alt="SAM" />
            </div>
            <div className="inbox-program-centerpanel">
              <div className="inbox-show-label-quiz-list--orange">
                <div>{this.props.sName}</div>
                <div>
                  <button className="inboxprogram-button-close" onClick={this.handleModalCancel}>
                    X
                  </button>
                </div>
              </div>
              {this.props.assignment === 'Simulation' && (
                <SimulationProgram
                  storeData={this.storeData}
                  {...this.props}
                  editStatus={this.state.btnDisable}
                  resetSaveButton={this.resetSaveButton}
                  showWarning={this.showWarning}
                  tabIndex={this.state.tabIndex}
                  showQuestionWarning={this.showQuestionWarning}
                  questionTabIndex={this.state.questionTabIndex}
                  profileUserId={this.props.profileUserId}
                  resetStateData={this.state.resetStateData}
                />
              )}
              {this.props.assignment === 'mSkills Assessment' && (
                <SkillsAssestments
                  storeData={this.storeData}
                  {...this.props}
                  editStatus={this.state.btnDisable}
                  resetSaveButton={this.resetSaveButton}
                  showWarning={this.showWarning}
                  tabIndex={this.state.tabIndex}
                  showQuestionWarning={this.showQuestionWarning}
                  questionTabndex={this.questionTabndex}
                  resetStateData={this.state.resetStateData}
                  communityId={
                    this.props.data !== undefined &&
                    this.props.data.row !== undefined &&
                    this.props.data.row.communityId !== undefined
                      ? this.props.data.row.communityId
                      : ''
                  }
                />
              )}
              <div className="print-custom-booklabel__buttons">
                <button className="inbox-program-print" onClick={this.print}>
                  Print
                </button>
                <button className="inbox-program-cancel" onClick={this.handleModalCancel}>
                  Cancel
                </button>
                <div className="inbox-modal-buttons-firstset">
                  <div className="inbox-program-pager">
                    <div className="inbox-program-pager-prev">
                      <a
                        className={this.props.previousDisable}
                        href=""
                        onClick={this.handlePrevious}
                      >
                        &lt;
                      </a>
                    </div>
                    <div className="inbox-program-pager-normal"> {this.props.currIndex + 1} </div>
                    <div className="inbox-program-pager-normal"> of </div>
                    <div className="inbox-program-pager-normal">
                      {this.props.data.allData.length}
                    </div>
                    <div className="inbox-program-pager-prev">
                      <a className={this.props.nextDisable} href="" onClick={this.handleNext}>
                        &gt;
                      </a>
                    </div>
                  </div>
                </div>
                <div className="inbox-program-save">
                  <button
                    className={math180saveclass.join(' ')}
                    disabled={this.state.btnDisable}
                    onClick={this.saveData}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SAMModal>
        <SAMModal
          isOpen={this.state.saveWarningModal}
          modalClassModifier="modal--savescreen-warning"
        >
          <div className="modal--savewrapper-heading">Warning </div>
          <div className="modal--savewrapper-warning">
            you have unsaved changes.Do you want to leave this screen without saving them?
            <div className="read180ngsave-innerpage-button modal-okbtns">
              <SAMButton isPrimaryButton onClickHandler={this.saveWarningModalProceed}>
                OK
              </SAMButton>
              <SAMButton onClickHandler={this.saveWarningModalClose}> Cancel </SAMButton>
            </div>
          </div>
        </SAMModal>
      </div>
    );
  }
}

InboxProgram.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  sName: PropTypes.string,
  assignment: PropTypes.string,
  getQuestion: PropTypes.func.isRequired,
  saveQuestion: PropTypes.func.isRequired,
  data: PropTypes.object,
  currIndex: PropTypes.number,
  prevSerd: PropTypes.func,
  nextSerd: PropTypes.func,
  profileUserId: PropTypes.string,
  previousDisable: PropTypes.string,
  nextDisable: PropTypes.string,
};

export default InboxProgram;
