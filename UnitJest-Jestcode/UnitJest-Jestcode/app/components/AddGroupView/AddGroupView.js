/**
 *
 * AddGroupView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMModal from 'components/SAMModal/SAMModal';
import SAMButton from 'components/SAMButton';
import AddGroupTable from 'components/AddGroupTable';
import { FormErrors } from 'components/forms';
import addGroup from './AddGroupPostSchema.json';

import './AddGroupView.scss';

class AddGroupView extends React.Component {
  constructor() {
    super();
    this.state = {
      addGroupByIdCheckbox: [],
      isSelectAll: false,
      classIdSelected: null,
      name: '',
      isSubmitFailure: false,
      errorMessage: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.classesWithStudents.getIn([0, 'class_id']) && !this.state.classIdSelected) {
      this.setState({ classIdSelected: nextProps.classesWithStudents.getIn([0, 'class_id', 0]) });
    }
    if (nextProps.groupPostFailure.get('name')) {
      this.setState({ isSubmitFailure: true, errorMessage: nextProps.groupPostFailure.toJS() });
    } else {
      this.setState({ isSubmitFailure: false, errorMessage: null });
    }
    if (nextProps.groupInfo.get('name')) {
      this.updateGroupInfoForEditStudent(nextProps.groupInfo);
    }
  }

  updateGroupInfoForEditStudent = data => {
    let students = [];
    if (data.getIn(['users', 0, 'user'])) {
      students = data
        .getIn(['users', 0, 'user'])
        .map(user => user.getIn(['user_id', 0]))
        .toJS();
    }
    this.setState({
      name: data.getIn(['name', 0]),
      addGroupByIdCheckbox: students,
      classIdSelected: data.getIn(['owner_id', 0]),
    });
  };

  toggleAllCheckboxes = (isChecked, studentId) => {
    this.setState({ isSelectAll: isChecked, addGroupByIdCheckbox: studentId });
  };

  handleRowCheckboxOnChange = (isChecked, studentId) => {
    if (this.state.isSelectAll) {
      this.setState({ isSelectAll: false });
    }
    this.setState(oldState => {
      let addGroupByIdCheckbox = oldState.addGroupByIdCheckbox;

      if (isChecked) {
        addGroupByIdCheckbox.push(studentId);
      } else {
        addGroupByIdCheckbox = addGroupByIdCheckbox.filter(element => element !== studentId);
      }

      return { addGroupByIdCheckbox };
    });
  };

  handleCancel = () => {
    this.props.resetGroupStatus();
    this.props.hideModal();
  };

  handleSave = () => {
    if (this.state.name === '') {
      this.setState({
        isSubmitFailure: true,
        errorMessage: { name: 'Please enter a "Group Name" ' },
      });
    } else {
      const group = { ...addGroup };
      group.users.user_id = this.state.addGroupByIdCheckbox;
      group.name = this.state.name;
      group.display_name = this.state.name;
      if (this.state.classIdSelected) {
        group.owner_id = this.state.classIdSelected;
      } else {
        group.owner_id = this.props.classesWithStudents.getIn(['class_id', 0]);
      }
      if (this.props.title.indexOf('Edit') !== -1) {
        group.group_id = this.props.groupInfo.getIn(['group_id', 0]);
      }
      this.props.postGroup({ group });
    }
  };

  updateStudent = event => {
    event.preventDefault();
    this.toggleAllCheckboxes(false, []);
    this.setState({ classIdSelected: event.target.value });
  };

  /**
   * @returns {*}
   */
  updateClassList = () =>
    this.props.classesWithStudents.map(classInfo => (
      <option key={classInfo.getIn(['class_id', 0])} value={classInfo.getIn(['class_id', 0])}>
        {classInfo.getIn(['display_name', 0])}
      </option>
    ));

  listOfStudentTeacherView = classId => {
    const users = this.props.classesWithStudents.filter(
      classInfo => classInfo.getIn(['class_id', 0]) === classId
    );

    if (users.getIn([0, 'students', 0, 'user'])) {
      const student = users.getIn([0, 'students', 0, 'user']).toJS();
      return student;
    }
    return [];
  };

  listOfStudentView = () => {
    if (this.props.classesWithStudents.getIn(['students', 0, 'user'])) {
      return this.props.classesWithStudents.getIn(['students', 0, 'user']).toJS();
    }
    return [];
  };

  handleInputBox = event => {
    event.preventDefault();
    this.setState({ name: event.target.value });
  };

  updateGroupOnChange = event => {
    event.preventDefault();
    if (event.target.value === this.props.groupInfo.getIn(['owner_id', 0])) {
      this.toggleAllCheckboxes(false, []);
      if (this.props.groupInfo.getIn(['users', 0])) {
        this.setState({
          classIdSelected: event.target.value,
          addGroupByIdCheckbox: this.props.groupInfo
            .getIn(['users', 0, 'user'])
            .map(user => user.getIn(['user_id', 0]))
            .toJS(),
        });
      } else {
        this.setState({
          classIdSelected: event.target.value,
          addGroupByIdCheckbox: [],
        });
      }
    } else {
      this.toggleAllCheckboxes(false, []);
      this.setState({ classIdSelected: event.target.value });
    }
  };

  render() {
    return (
      <SAMModal isOpen contentLabel="Add Group" modalClassModifier="add-group">
        <div className="add-group__header">{this.props.title}</div>
        <div className="add-group__header--text">
          Enter a new group name or use the check boxes to add or remove students from this group.
          Items marked with an asterisk (*) are required. When you are done, click Save to finish.
        </div>
        {this.state.isSubmitFailure && (
          <div className="add-group__header--error">Please correct your entries as indicated.</div>
        )}
        <div className="select-student">
          <div className="select-student__header">1. Name the Group</div>
          <div className="select-student__text">
            Group Name *
            {!this.state.isSubmitFailure && (
              <input
                className="select-student__input-box"
                type="text"
                value={this.state.name}
                onChange={this.handleInputBox}
              />
            )}
            {this.state.isSubmitFailure && (
              <input
                className="select-student__input-box select-student__input-box--error"
                type="text"
                value={this.state.name}
                onChange={this.handleInputBox}
              />
            )}
          </div>
          <div className="select-student__text select-student__text--of-class">
            Of Class
            {this.state.classIdSelected &&
              !this.props.groupInfo.get('display_name') &&
              this.props.classesWithStudents.size && (
                <select className="select-student__input-box" onChange={this.updateStudent}>
                  {this.updateClassList()}
                </select>
              )}
            {this.props.classesWithStudents.getIn(['display_name', 0]) && (
              <span className="select-student__for-class">
                {this.props.classesWithStudents.getIn(['display_name', 0])}
              </span>
            )}
            {this.props.groupInfo.get('display_name') &&
              !this.props.classesWithStudents.getIn(['display_name', 0]) &&
              this.props.classesWithStudents.size && (
                <select
                  className="select-student__input-box"
                  value={this.state.classIdSelected}
                  onChange={this.updateGroupOnChange}
                >
                  {this.updateClassList()}
                </select>
              )}
          </div>
          <div className="select-student__header">2. Select Students</div>
          {!this.props.classesWithStudents.getIn(['display_name', 0]) && (
            <AddGroupTable
              studentIdChecked={this.state.addGroupByIdCheckbox}
              selectAll={this.state.isSelectAll}
              toggleAllCheckboxes={this.toggleAllCheckboxes}
              handleRowCheckboxOnChange={this.handleRowCheckboxOnChange}
              students={this.listOfStudentTeacherView(this.state.classIdSelected)}
            />
          )}
          {this.props.classesWithStudents.getIn(['display_name', 0]) && (
            <AddGroupTable
              studentIdChecked={this.state.addGroupByIdCheckbox}
              selectAll={this.state.isSelectAll}
              toggleAllCheckboxes={this.toggleAllCheckboxes}
              handleRowCheckboxOnChange={this.handleRowCheckboxOnChange}
              students={this.listOfStudentView()}
            />
          )}
        </div>
        <aside className="add-group__buttons">
          <FormErrors
            shouldShowErrors={this.state.isSubmitFailure}
            submitErrors={this.state.errorMessage}
          />
          <div className="add-group__gap">
            <SAMButton onClickHandler={this.handleCancel}>Cancel</SAMButton>
            <SAMButton isPrimaryButton onClickHandler={this.handleSave}>
              Save
            </SAMButton>
          </div>
        </aside>
      </SAMModal>
    );
  }
}

AddGroupView.propTypes = {
  classesWithStudents: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
  postGroup: PropTypes.func.isRequired,
  groupPostFailure: PropTypes.object.isRequired,
  resetGroupStatus: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  groupInfo: PropTypes.object.isRequired,
};

export default AddGroupView;
