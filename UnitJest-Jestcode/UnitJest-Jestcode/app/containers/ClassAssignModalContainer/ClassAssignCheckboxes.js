import React from 'react';
import PropTypes from 'prop-types';

class ClassAssignCheckboxes extends React.Component {
  toggleClassCheckbox = e => {
    const classId = e.target.id;
    const isChecked = e.target.checked;
    this.props.toggleClassCheckbox(classId, isChecked);
  };

  toggleGroupCheckBox = e => {
    const groupId = e.target.id;
    const isChecked = e.target.checked;
    this.props.toggleGroupCheckbox(groupId, isChecked);
  };

  mapSAMGroupsToUI = groups => {
    if (groups && groups[0]) {
      return groups.map(currentGroup => (
        <div
          key={currentGroup.groupId}
          id={currentGroup.groupId}
          className="group-assign-modal__checkbox-row"
        >
          <input
            className="group-assign-modal__checkbox-row-input"
            id={currentGroup.groupId}
            type="checkbox"
            name={currentGroup.groupId}
            key={currentGroup.groupId}
            onChange={this.toggleGroupCheckBox}
            checked={currentGroup.checked}
          />
          <span className="group-assign-modal__checkbox-row-span">{currentGroup.groupName}</span>
        </div>
      ));
    }
    return <div className="group-assign-modal__checkbox-row" />;
  };

  render = () => {
    const classes = this.props.checkboxClassesAndGroups;
    const classesOutput = classes.map(currentClass => (
      <div
        className="class-assign-modal__checkbox-row"
        id={currentClass.classId}
        key={currentClass.classId}
      >
        <input
          className="class-assign-modal__checkbox-row-input"
          id={currentClass.classId}
          type="checkbox"
          onChange={this.toggleClassCheckbox}
          name={currentClass.classId}
          key={currentClass.classId}
          checked={currentClass.checked}
        />
        <span className="class-assign-modal__checkbox-row-span">{currentClass.className}</span>
        {this.mapSAMGroupsToUI(currentClass.groups)}
      </div>
    ));
    return (
      <div className="class-assign-modal__checkbox-list">
        <div>{classesOutput}</div>
      </div>
    );
  };
}

ClassAssignCheckboxes.propTypes = {
  checkboxClassesAndGroups: PropTypes.array.isRequired,
  toggleClassCheckbox: PropTypes.func.isRequired,
  toggleGroupCheckbox: PropTypes.func.isRequired,
};

export default ClassAssignCheckboxes;
