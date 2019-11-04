/**
 *
 * Class Assign Modal
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import 'components/ClassAssignModal/ClassAssignModal.scss';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';
import SelectClassMessage from 'components/SelectClassMessage';
import makeSelectClassAssignModalContainer from 'containers/ClassAssignModalContainer/selectors';
import reducer from 'containers/ClassAssignModalContainer/reducer';

import {
  getClassesAndGroupsRequest,
  postAssignToClassRequest,
  postAssignToClassMIARequest,
} from 'containers/ClassAssignModalContainer/actions';
import { SCHOOL_FILTER } from 'containers/ClassAssignModalContainer/constants';
import saga from 'containers/ClassAssignModalContainer/saga';

import ClassAssignCheckboxes from 'containers/ClassAssignModalContainer/ClassAssignCheckboxes';

// TODO some of this functionality should be moved to ClassAssignModalContainer
export class ClassAssignModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: Immutable.Map(),
      checkboxClasses: [],
      classSelected: true,
    };
  }
  componentDidMount() {
    this.props.getClassesAndGroupsRequest();
  }

  /*
  creates the request payload that is sent with the API call
  to assignToClass
   */
  createAssignToClassPayload = () => {
    let classSelected = false;
    const assignPayload = {};
    assignPayload.input = {};
    assignPayload.input.users = [{ user_id: [] }];
    assignPayload.input.classes = [{ class_id: [] }];
    assignPayload.input.groups = [{ group_id: [] }];
    this.props.cohortsToAssign.forEach(cohort => {
      assignPayload.input.users[0].user_id.push(cohort[0]);
    });

    const cbxClasses = this.state.checkboxClasses;
    cbxClasses.forEach(samClass => {
      if (samClass.checked) {
        classSelected = true;
        assignPayload.input.classes[0].class_id.push(samClass.classId);
        if (this.props.showGroups) {
          if (samClass.groups && samClass.groups[0]) {
            const cbxGroups = samClass.groups;
            cbxGroups.forEach(samGroup => {
              if (samGroup.checked) {
                assignPayload.input.groups[0].group_id.push(samGroup.groupId);
              }
            });
          }
        }
      }
    });
    this.setState({ classSelected });
    assignPayload.classSelected = classSelected;
    return assignPayload;
  };

  handleClose = hideModal => {
    if (hideModal) {
      this.setState(
        { classes: Immutable.Map(), checkboxClasses: [], classSelected: true },
        this.props.onClose()
      );
    } else {
      this.setState({ classes: Immutable.Map(), checkboxClasses: [], classSelected: true });
    }
  };

  handleCancelClick = () => {
    this.handleClose(true);
  };

  handleSaveClick = () => {
    const assignPayload = this.createAssignToClassPayload();
    if (!assignPayload.classSelected) {
      return;
    }
    // TODO:  using 'assignPayload.classSelected' seems 'hacky', maybe figure out async setState instead
    delete assignPayload.classSelected;
    if (this.props.isMIA) {
      this.props.postAssignToClassMIARequest(assignPayload, this.props.searchOpts);
    } else {
      this.props.postAssignToClassRequest(assignPayload);
      this.props.searchRefreshOnSave();
    }
    this.handleClose(false);
  };

  handleSchoolChange = event => {
    event.preventDefault();
    const classesAndGroups = this.props.classAssignModalContainer.get('classesAndGroups');
    const selectedSchool = classesAndGroups.find(
      school => school.getIn(['school_id', 0]) === event.target.value
    );

    const classes = selectedSchool.getIn(['classes', 0]);
    const checkboxClasses = this.createCheckBoxClassesAndGroups(classes);
    this.setState({
      classes,
      checkboxClasses,
      classSelected: true,
    });
  };

  handleToggleClassCheckbox = (classId, isChecked) => {
    const stateCheckboxes = this.state.checkboxClasses;
    for (let i = 0; i < stateCheckboxes.length; i += 1) {
      if (stateCheckboxes[i].classId === classId) {
        stateCheckboxes[i].checked = isChecked;

        // When the class is unChecked then also uncheck its children groups.
        if (this.props.showGroups) {
          if (!isChecked) {
            if (stateCheckboxes[i].groups[0]) {
              const groups = stateCheckboxes[i].groups;
              for (let j = 0; j < groups.length; j += 1) {
                groups[j].checked = false;
              }
            }
          }
        }
        break;
      }
    }
    this.setState({ checkboxClasses: stateCheckboxes });
  };

  handleToggleGroupCheckbox = (groupId, isChecked) => {
    let parentClassId = '';
    const stateCheckboxes = this.state.checkboxClasses;
    for (let i = 0; i < stateCheckboxes.length; i += 1) {
      if (stateCheckboxes[i].groups[0]) {
        const groups = stateCheckboxes[i].groups;
        for (let j = 0; j < groups.length; j += 1) {
          if (groups[j].groupId === groupId) {
            groups[j].checked = isChecked;
            parentClassId = stateCheckboxes[i].parentClassId;
            // is group isChecked, ensure its parent Class is checked.
            if (isChecked) {
              stateCheckboxes[i].checked = isChecked;
            }
            break;
          }
        }
        if (parentClassId !== '') {
          break;
        }
      }
    }
    this.setState({ checkboxClasses: stateCheckboxes });
  };

  createCheckBoxClassesAndGroups = pClasses => {
    // creates and array object of classes and their groups for keeping track of which are checked/unchecked.
    const checkboxClasses = [];
    const samClasses = pClasses.toJS();
    samClasses.class.forEach(currentClass => {
      const currClass = {
        classId: currentClass.class_id[0],
        className: currentClass.class_name[0],
        checked: false,
        groups: [],
      };
      if (this.props.showGroups) {
        if (currentClass.groups[0] && currentClass.groups[0].group) {
          currentClass.groups[0].group.forEach(currentGroup => {
            const grp = {
              groupId: currentGroup.group_id[0],
              groupName: currentGroup.group_name[0],
              checked: false,
              parentClassId: currentClass.class_id,
            };
            currClass.groups.push(grp);
          });
        }
      }
      checkboxClasses.push(currClass);
    });
    return checkboxClasses;
  };

  renderClassCheckboxList = () => {
    if (this.state.classes.size < 1) {
      return null;
    }

    return (
      <ClassAssignCheckboxes
        classes={this.state.classes}
        checkboxClassesAndGroups={this.state.checkboxClasses}
        toggleClassCheckbox={this.handleToggleClassCheckbox}
        toggleGroupCheckbox={this.handleToggleGroupCheckbox}
      />
    );
  };

  renderSchoolOptions = schools =>
    schools.map(school => (
      <option value={school.school_id[0]} key={school.school_id[0]}>
        {school.school_name[0]}
      </option>
    ));

  renderDirectionsOrCohortInfo = () => {
    if (this.props.cohortInfo) {
      return (
        <ul className="class-assign-modal__cohort-info">
          <li>
            <span className="class-assign-modal__item">Student Id: </span>
            <span className="class-assign-modal__item-value">{this.props.cohortInfo.id}</span>
          </li>
          <li>
            <span className="class-assign-modal__item">Username: </span>
            <span className="class-assign-modal__item-value">{this.props.cohortInfo.userName}</span>
          </li>
          <li>
            <span className="class-assign-modal__item">Last Name: </span>
            <span className="class-assign-modal__item-value">
              {this.props.cohortInfo.firstName}
            </span>
          </li>
          <li>
            <span className="class-assign-modal__item">First Name: </span>
            <span className="class-assign-modal__item-value">{this.props.cohortInfo.lastName}</span>
          </li>
          <li>
            <span className="class-assign-modal__item">Grade: </span>
            <span className="class-assign-modal__item-value">{this.props.cohortInfo.grade}</span>
          </li>
        </ul>
      );
    }

    const chosenCohortToAssignAmount = this.props.cohortsToAssign.length;
    return (
      <div>
        <div className="class-assign-modal__chosen-text">
          <span className="class-assign-modal__directions">
            You have chosen <strong>{chosenCohortToAssignAmount}</strong>{' '}
            {this.props.cohortTypeLabel.toLowerCase()}
            {chosenCohortToAssignAmount !== 1 ? 's' : ''} for assignment.
          </span>
        </div>

        <div className="class-assign-modal__select-text">
          <span className="class-assign-modal__directions">
            First select a school. Then assign {this.props.cohortTypeLabel.toLowerCase()}s to
            classes
          </span>
        </div>
      </div>
    );
  };

  renderTitle = () => {
    if (this.props.cohortInfo) {
      const text = `${this.props.cohortInfo.lastName}, ${this.props.cohortInfo.firstName}`;
      const charLimit = 60;
      const position = 'right';

      return (
        <div className="class-assign-modal__header">
          <h5 className="class-assign-modal__header-title">
            {this.renderStringWithToolTipPositioned(text, charLimit, position)}
          </h5>
        </div>
      );
    }
    return (
      <div className="class-assign-modal__header">
        <h5 className="class-assign-modal__header-title">Assign to a class</h5>
      </div>
    );
  };

  renderStringWithToolTipPositioned = (text, characterLimit, position) => {
    if (text.length > characterLimit) {
      return (
        <a className={`rt-td__tooltip rt-td__tooltip--${position}`} data-tip={text}>
          <div className="rt-td__truncated-block">{text}</div>
        </a>
      );
    }
    return text;
  };

  render() {
    const { classesAndGroups } = this.props.classAssignModalContainer.toJS();

    const schools = classesAndGroups || [];
    return (
      <SAMModal
        isOpen={this.props.isOpen}
        contentLabel="Assign To Class"
        modalClassModifier="class-assign-modal"
      >
        {this.renderTitle()}
        {this.renderDirectionsOrCohortInfo()}
        <select onChange={this.handleSchoolChange} className="class-assign-modal__select">
          <option value={SCHOOL_FILTER}>{SCHOOL_FILTER}</option>
          {this.renderSchoolOptions(schools)}
        </select>

        {this.renderClassCheckboxList()}
        {!this.state.classSelected && <SelectClassMessage visible />}
        <div className="class-assign-modal__button-group">
          <SAMButton id="class-assign-modal__cancel-btn" onClickHandler={this.handleCancelClick}>
            Cancel
          </SAMButton>
          <SAMButton
            id="class-assign-modal__save-btn"
            isPrimaryButton
            buttonType="submit"
            onClickHandler={this.handleSaveClick}
          >
            Save
          </SAMButton>
        </div>
      </SAMModal>
    );
  }
}
ClassAssignModal.defaultProps = {
  cohortsToAssign: [],
  cohortTypeLabel: 'user',
  isMIA: false,
  showGroups: true,
};

ClassAssignModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  getClassesAndGroupsRequest: PropTypes.func.isRequired,
  postAssignToClassRequest: PropTypes.func.isRequired,
  postAssignToClassMIARequest: PropTypes.func,
  classAssignModalContainer: PropTypes.object,
  cohortsToAssign: PropTypes.array,
  searchRefreshOnSave: PropTypes.func,
  cohortTypeLabel: PropTypes.string.isRequired,
  isMIA: PropTypes.bool,
  showGroups: PropTypes.bool,
  searchOpts: PropTypes.object,
  cohortInfo: PropTypes.object,
};
const mapStateToProps = createStructuredSelector({
  classAssignModalContainer: makeSelectClassAssignModalContainer(),
});

const withConnect = connect(mapStateToProps, {
  getClassesAndGroupsRequest,
  postAssignToClassRequest,
  postAssignToClassMIARequest,
});

const withReducer = injectReducer({ key: 'classAssignModalContainer', reducer });
const withSaga = injectSaga({ key: 'classAssignModalContainer', saga });

export default compose(withReducer, withSaga, withConnect)(ClassAssignModal);
