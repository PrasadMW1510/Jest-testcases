/**
 *
 * IdentifyThisForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { CheckboxControl, DropdownControl, InputControl } from 'components/forms/';
import * as Constants from './constants';

class IdentifyThisForm extends Component {
  // Use `name` property as id
  getGradeId = item => item && item.name[0];

  formatGradeLabel = item => (item && item.full_name && item.full_name[0]) || '';

  formatTeacherLabel = teacher => `${teacher.last_name}, ${teacher.first_name}`;

  render() {
    const { grades, teachers: teachersProp } = this.props;
    const teachers = [Constants.SELECT_OPTION_NO_TEACHER].concat(teachersProp);
    return (
      <div className="class-form__form-identity">
        <Field
          name="name"
          type="text"
          maxLength={Constants.MAX_LENGTH_NAME}
          component={InputControl}
          label="Class Name"
          required
        />
        <Field name="serverErrors" type="hidden" component="input" />
        <Field
          name="teacher1"
          component={DropdownControl}
          formatLabel={this.formatTeacherLabel}
          items={teachers}
          label="Teacher 1"
        />
        <Field
          name="teacher2"
          component={DropdownControl}
          formatLabel={this.formatTeacherLabel}
          items={teachers}
          label="Teacher 2"
        />
        <Field
          name="grades"
          component={CheckboxControl}
          getId={this.getGradeId}
          items={grades}
          label="Grades"
          formatLabel={this.formatGradeLabel}
          required
          row
        />
      </div>
    );
  }
}

IdentifyThisForm.defaultProps = {
  grades: [],
  teachers: [],
};

IdentifyThisForm.propTypes = {
  grades: PropTypes.array.isRequired,
  teachers: PropTypes.array.isRequired,
};

export default IdentifyThisForm;
