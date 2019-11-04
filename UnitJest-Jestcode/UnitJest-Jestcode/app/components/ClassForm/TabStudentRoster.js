/**
 *
 * TabStudentRoster
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { Field } from 'redux-form/immutable';
import FormSection from 'components/forms/FormSection';
import StudentsTable from './StudentsTable';
import { CLASS_FORM_HIDE } from './constants';

class TabStudentRoster extends Component {
  state = { selectAll: false };

  // Format selected students into a structure for the SAMTable
  getSelectedStudents = () => {
    const { formData: { rosterStudents = {} } } = this.props;
    return Object.keys(rosterStudents);
  };

  // For Table display of students
  toggleAllCheckboxes = (isChecked, studentIds) => {
    const model = !isChecked ? {} : studentIds.reduce((sum, id) => ({ [id]: true, ...sum }), {});
    this.props.change('rosterStudents', fromJS(model));
    this.setState({
      selectAll: isChecked,
    });
  };

  handleToggleStudent = (isChecked, id) => {
    const { selectedStudents: immSelectedStudents } = this.props;
    const immSelectedItems = isChecked
      ? immSelectedStudents.set(id, true)
      : immSelectedStudents.delete(id);
    this.props.change('rosterStudents', immSelectedItems);
  };

  render = () => {
    const { hide, metaData } = this.props;
    const classes = hide ? CLASS_FORM_HIDE : '';
    const studentIdsChecked = this.getSelectedStudents();
    return (
      <section className={classes}>
        <div className="class-form__intro">
          Use the check boxes to select students to include in this class. Attention: Removing a
          student from the class roster may deactivate him or her. Students must be included in at
          least one class or they will not appear in the SmartBar. See the student profile window
          for enrollment information.
        </div>
        <FormSection
          sectionClassModifier="class-form__roster-students"
          headerText="Select Students"
        >
          <Field
            name="rosterStudents"
            component={StudentsTable}
            selectAll={this.state.selectAll}
            studentIdsChecked={studentIdsChecked}
            students={metaData.students}
            handleRowCheckboxOnChange={this.handleToggleStudent}
            toggleAllCheckboxes={this.toggleAllCheckboxes}
          />
        </FormSection>
      </section>
    );
  };
}

TabStudentRoster.defaultProps = {
  formData: {},
  hide: false,
  metaData: {},
};

TabStudentRoster.propTypes = {
  change: PropTypes.func.isRequired,
  formData: PropTypes.object,
  hide: PropTypes.bool.isRequired,
  metaData: PropTypes.object.isRequired,
  selectedStudents: PropTypes.object,
};

export default TabStudentRoster;
