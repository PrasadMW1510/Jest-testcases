/**
 *
 * FormFieldFocuser
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * This component provides automatic focusing for a Redux Form <Field> component.
 *
 * For examples of usage, see SchoolForm.js where 'SchoolProfile' and 'SchoolContactInfo' are used.
 * Usage looks like:
 *
 * <FormFieldFocuser focusOnToggleTrue={someBooleanCondition} focusOnMount>
 *   <SomeComponentContainingField ... />
 * </FormFieldFocuser>
 *
 * (focusOnMount is an optional prop)
 *
 * The <SomeComponentContainingField> component should itself render a <Field> element that defines
 * the following two properties:
 *
 * ref={this.props.refAssignFocusedField}
 * withRef
 *
 * Any time that the <FormFieldFocuser> component wrapper is re-rendered, it will evaluate the 'focusOnToggleTrue'
 * boolean condition:  If this condition was false during the LAST render and it's now true during THIS
 * render, then the <Field> that contains the 2 props above will automatically receive focus; otherwise,
 * no focusing will take place.
 *
 * Furthermore, if the focusOnMount prop is specified on the <FormFieldFocuser> component, then the initial
 * mounting of this <FormFieldFocuser> component will focus the <Field>.
 *
 * Note that a <FormFieldFocuser> component should only wrap a SINGLE child element.
 *
 */
class FormFieldFocuser extends Component {
  componentDidMount = () => {
    if (this.props.focusOnMount) {
      this.focusedField.getRenderedComponent().focus();
    }
  };

  componentDidUpdate = previousProps => {
    if (!previousProps.focusOnToggleTrue && this.props.focusOnToggleTrue) {
      this.focusedField.getRenderedComponent().focus();
    }
  };

  refAssignFocusedField = ref => (this.focusedField = ref);
  focusedField = null;

  render = () =>
    React.cloneElement(React.Children.only(this.props.children), {
      refAssignFocusedField: this.refAssignFocusedField,
    });
}

FormFieldFocuser.defaultProps = {
  focusOnMount: false,
};

FormFieldFocuser.propTypes = {
  children: PropTypes.object.isRequired,
  focusOnMount: PropTypes.bool.isRequired,
  focusOnToggleTrue: PropTypes.bool.isRequired,
};

export default FormFieldFocuser;
