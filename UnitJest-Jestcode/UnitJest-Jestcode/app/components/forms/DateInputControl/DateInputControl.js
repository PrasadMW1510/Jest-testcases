/**
 *
 * DateInputControl
 *
 */

import React from 'react';

import PropTypes from 'prop-types';

import DatePicker from 'react-datepicker';
import { SLMS_DATE_FORMAT } from 'containers/App/constants';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import FormControl from '../FormControl';
import FormLabel from '../FormLabel';
import './DateInputControl.scss';

/**
 * This is the react-datepicker widget customized to work with redux-form.
 *
 * ~~~ Event Handling ~~~
 *
 * onChange:  If the user is typing directly into the text field, this event will be triggered
 * on the DatePicker AS SOON AS any valid calendar value is recognized (even before losing focus).
 * If the user types in an invalid value and then navigates out of the text field, this event will also
 * be triggered with a value of 'null' immediately FOLLOWING the onBlur event:  This is because
 * we clear the input during the onBlur event if we detect an invalid value (see 'handleBlur').
 * If the user selects a date from the DatePicker pop-up instead of typing directly in the
 * text field, this event will be triggered, and then the text field will receive focus.
 *
 * Any triggered onChange event will also invoke the redux-form onChange action for the
 * new value.  Any defined onChange handler on the redux-form <Field> will be passed a free-form
 * object with 'moment' properties describing the current calendar value.
 *
 *
 * onBlur:  This event will be triggered any time the user navigates out of the text field.  If
 * an invalid value is in the text field at the time, an additional onChange event will occur
 * thereafter, setting the value to 'null', as described above.
 *
 * No corresponding redux-form onBlur action will be invoked here:  This is deliberate, as
 * redux-form's propagation of its onBlur event internally updates the form field value in
 * the Redux store (to a string), which is undesirable in this case.  Instead, if users wish
 * to act on the onBlur event of the DatePicker, they should define an onDateBlur prop on the
 * redux-form <Field>, which takes a handler function; this function would be passed an event
 * object for the DatePicker text field.
 *
 *
 *
 * ~~~ Ref Methods ~~~
 *
 * If a parent component defines a 'ref' for a <Field component={DateInputControl}> element
 * ( see the 'withRef' description here: https://redux-form.com/7.3.0/docs/api/field.md/ ), then
 * it can make use of the following methods on this component:
 *
 * focus():  programmatically focuses the DatePicker text field (and opens the calendar popup
 * by default).
 *
 * clearInput():  triggers the onChange event on the DatePicker with a value of 'null' (and clears the
 * text field in the process).  This will also propagate to the redux-form's onChange handler for this
 * DatePicker field (i.e. simulates a user changing the value), which makes it a preferable choice to
 * produce a change, as opposed to simply dispatching the redux-form change action.
 *
 */
class DateInputControl extends React.Component {
  // if datePickerClassModifier was passed in, then use it for styling the DatePicker
  getDatePickerClassName = () => this.props.datePickerClassModifier || '';

  toMomentDate = val => {
    if (val) {
      return moment(val, SLMS_DATE_FORMAT, true).isValid() ? val : null;
    }
    return null;
  };
  datePickerRef = null;

  assignRef = ref => (this.datePickerRef = ref);
  focus = () => this.datePickerRef.input.focus();
  clearInput = () => this.datePickerRef.onClearClick();

  handleBlur = ev => {
    // react-datepicker's onBlur handler doesn't receive a wrapped 'moment' object value as a param (as opposed
    // to the onChange handler); therefore, we must initialize a 'moment' object ourselves from a string
    if (this.props.onDateBlur) {
      this.props.onDateBlur(ev);
    }
    const newValue = ev.currentTarget.value;
    if (newValue) {
      const newDate = moment(newValue, SLMS_DATE_FORMAT, true);
      // if the date is invalid, clear the input field (which in turn, kicks off an onChange event)
      if (!newDate.isValid()) {
        this.clearInput();
      }
    }
  };

  handleChange = newValue => this.props.input.onChange(moment(newValue));

  render = () => {
    const { className, input, label, meta: { submitFailed }, required } = this.props;
    const hasError = !input.value && submitFailed;
    return (
      <FormControl className={className}>
        {label && (
          <FormLabel error={hasError}>
            {label}
            {required && <span className="form-control__label-required">*</span>}
          </FormLabel>
        )}
        {/* NOTE: DatePicker's 'selected' value always expects a 'moment' object, not a string.
          redux-form can sometimes provide a string value (e.g. when resetting the form's values),
          so we always ensure an object is initialized here when possible. */}
        {/* We cherry-pick the props individually here to pass on to DatePicker, so there's
            no accidental collision of DatePicker and redux-form props. */}
        <DatePicker
          className={this.getDatePickerClassName()}
          fixedHeight={this.props.fixedHeight}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          readOnly={this.props.readOnly}
          ref={this.assignRef}
          selected={this.toMomentDate(input.value)}
          showYearDropdown={this.props.showYearDropdown}
        />
      </FormControl>
    );
  };
}

DateInputControl.defaultProps = {
  className: '',
  datePickerClassModifier: '',
  fixedHeight: true,
  label: '',
  meta: {},
  readOnly: false,
  required: false,
  showYearDropdown: true,
};

DateInputControl.propTypes = {
  className: PropTypes.string.isRequired,
  datePickerClassModifier: PropTypes.string.isRequired,
  fixedHeight: PropTypes.bool.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  onDateBlur: PropTypes.func,
  readOnly: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
  showYearDropdown: PropTypes.bool.isRequired,
};

export default DateInputControl;
