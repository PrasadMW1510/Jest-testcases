/**
 *
 * EditQuizCollectionNames
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';
import './Editquizcollectionnames.scss';

class EditQuizCollectionNames extends React.Component {
  constructor(props) {
    super(props);
    this.nextName = this.nextName.bind(this);
    this.prevName = this.prevName.bind(this);
    this.nameValueChange = this.nameValueChange.bind(this);
    this.onCollectionNameChange = this.onCollectionNameChange.bind(this);
  }
  state = {
    editQuizCollectionNames: '',
    warningModal: false,
    quizNameChange: true,
    checkPrevNext: '',
    changednameVal: '',
    nameChange: false,
    navigate: false,
  };
  componentWillReceiveProps(nextProps) {
    const defaultData = nextProps.dropDowndata[0].Name;
    if (nextProps.fetchSuccess && nextProps.saveStatus) {
      this.setState({
        nameChange: false,
        editQuizCollectionNames: this.state.changednameVal,
        navigate: true,
      });
    } else {
      this.setState({
        nameChange: false,
        editQuizCollectionNames: defaultData,
        navigate: true,
      });
    }
  }
  onCollectionNameChange(e) {
    this.setState({
      navigate: false,
      editQuizCollectionNames: e.target.value,
    });
  }
  handleClick = e => {
    const selectedVal = e.target.value;
    this.setState({
      editQuizCollectionNames: selectedVal,
      changednameVal: '',
      navigate: false,
    });
  };
  handleSave = e => {
    e.preventDefault();
    const { changednameVal, editQuizCollectionNames } = this.state;
    const saveObj = {};
    saveObj.oldName = editQuizCollectionNames;
    saveObj.newName = changednameVal;
    this.props.handleSave(saveObj);
  };
  createNewWarningModal = () => {
    if (this.state.changednameVal !== '') {
      this.setState({
        warningModal: true,
      });
    }
    return 'modelOpened';
  };
  prevName = e => {
    e.preventDefault();
    this.setState({
      checkPrevNext: 'prev',
    });
    const { editQuizCollectionNames, changednameVal, nameChange } = this.state;
    let warningModelCheck = '';
    if (nameChange) {
      if (editQuizCollectionNames !== changednameVal) {
        warningModelCheck = this.createNewWarningModal();
      }
    }
    if (warningModelCheck === '' || this.props.saveStatus) {
      this.naviagtePrev();
    }
  };
  nextName = e => {
    e.preventDefault();
    this.setState({
      checkPrevNext: 'next',
    });
    let warningModelCheckopen = '';
    const { editQuizCollectionNames, changednameVal, nameChange } = this.state;
    if (nameChange) {
      if (editQuizCollectionNames !== changednameVal) {
        warningModelCheckopen = this.createNewWarningModal();
      }
    }
    if (warningModelCheckopen === '' || this.props.saveStatus) {
      this.navigateNext();
    }
  };
  naviagtePrev = () => {
    let curpos = 0;
    this.props.dropDowndata.map((item, i) => {
      if (item.Name[0] === this.state.editQuizCollectionNames) {
        curpos = i;
      }
      return curpos;
    });
    if (curpos === 0) {
      curpos = this.props.dropDowndata.length;
    }
    this.setState({
      editQuizCollectionNames: this.props.dropDowndata[curpos - 1].Name[0],
      navigate: true,
    });
  };
  navigateNext = () => {
    let curpos = 0;
    this.props.dropDowndata.map((item, i) => {
      if (item.Name[0] === this.state.editQuizCollectionNames) {
        curpos = i;
      }
      return curpos;
    });
    if (curpos === this.props.dropDowndata.length - 1) {
      curpos = -1;
    }
    this.setState({
      editQuizCollectionNames: this.props.dropDowndata[curpos + 1].Name[0],
      navigate: true,
    });
  };
  warningModalClose = () => {
    this.setState({
      warningModal: false,
      quizNameChange: false,
    });
  };
  warningModalProceed = () => {
    this.setState({
      warningModal: false,
      quizNameChange: true,
      nameChange: false,
    });
    if (this.state.checkPrevNext === 'prev') {
      this.naviagtePrev();
    }
    if (this.state.checkPrevNext === 'next') {
      this.navigateNext();
    }
  };
  nameValueChange(e) {
    const changedVal = e.target.value;
    this.setState({
      changednameVal: changedVal,
      nameChange: true,
    });
  }

  render() {
    const { isOpen } = this.props;
    const { editQuizCollectionNames, changednameVal, nameChange, navigate } = this.state;
    return (
      <div>
        <SAMModal
          isOpen={isOpen}
          contentLabel="Edit_Quiz_Collection_Names"
          modalClassModifier="modal--editquizcollection-form"
        >
          <div className="">
            <h5 className="edit-collection-heading">Edit Collection</h5>
            <form onSubmit={this.handleSave}>
              <div className="modal--editquizcollection-wrapper">
                <main className="modal-editquizcollection-container">
                  <div className="modal-editquizcollection-wrapper-content-main">
                    <p className="modal-editquizcollection-para">
                      Select a collection and enter a new name.
                    </p>
                    <div className="modal--editquizcollection-wrapper-quiz-form">
                      <div className="editquizcollection-quizlinkmain">
                        <div className="editquizcollection-prenext">
                          <div className="editquizcollection-previous">
                            <a href="" onClick={this.prevName}>
                              {' '}
                              &lt;&lt; Previous{' '}
                            </a>
                          </div>
                          <div>
                            <select
                              className="collection-names__list"
                              id="editCollectionNameList"
                              onChange={this.handleClick}
                              onFocus={this.onCollectionNameChange}
                              ref={select => (this.collectionName = select)}
                            >
                              {this.props.dropDowndata.map(item => (
                                <option
                                  className="collection-name-list__option"
                                  value={navigate ? editQuizCollectionNames : item.Name}
                                  key={item.Name}
                                >
                                  {navigate
                                    ? editQuizCollectionNames.toString().substring(0, 32)
                                    : item.Name[0].substring(0, 32)}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="editquizcollection-next">
                            <a href="" onClick={this.nextName}>
                              {' '}
                              Next &gt;&gt;
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal--editquizcollection-wrapper-content-main-form">
                      <div className="editquizcollection-prenext">
                        <div className="editquizcollection-edtquizcollectionnames">
                          <label className="collection-name__label" htmlFor="Enter new name :">
                            Enter new name:
                            <input
                              className="edit-quiz-name__input"
                              id="editquizname"
                              type="text"
                              name="name"
                              placeholder="All Collections"
                              value={nameChange ? changednameVal : editQuizCollectionNames}
                              onChange={this.nameValueChange}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="modal--editquizcollection-wrapper-action">
                      <SAMButton onClickHandler={this.props.handleCancel}>
                        <span className="action-button">Cancel</span>
                      </SAMButton>
                      <SAMButton isPrimaryButton buttonType="submit">
                        <span className="action-button">Save</span>
                      </SAMButton>
                    </div>
                  </div>
                </main>
              </div>
            </form>
          </div>
        </SAMModal>
        <SAMModal
          isOpen={this.state.warningModal}
          modalClassModifier="modal--editquizcollectionnames-warning"
        >
          <div className="modal--wrapper-warning">
            <p className="modal--wrapping-para">
              You must click Save to save any changes. Do you want to go to a different collection?
            </p>
            <div className="editquizcollection-innerpage-button">
              <SAMButton isPrimaryButton onClickHandler={this.warningModalProceed}>
                Yes
              </SAMButton>
              <SAMButton onClickHandler={this.warningModalClose}> No </SAMButton>
            </div>
          </div>
        </SAMModal>
      </div>
    );
  }
}

EditQuizCollectionNames.defaultProps = {
  isOpen: false,
};

EditQuizCollectionNames.propTypes = {
  handleCancel: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  dropDowndata: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  saveStatus: PropTypes.bool.isRequired,
  fetchSuccess: PropTypes.bool,
};

export default EditQuizCollectionNames;
