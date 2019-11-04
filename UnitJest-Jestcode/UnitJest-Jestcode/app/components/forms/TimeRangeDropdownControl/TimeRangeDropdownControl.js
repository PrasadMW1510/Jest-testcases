import React, { Component } from 'react';
import { Field } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import FormControl from '../FormControl';
import DropdownControl from '../DropdownControl';
import FormLabel from '../FormLabel';
import './TimeRangeDropdownControl.scss';
import { QUARTER_HOUR_LIST } from './constants';

class TimeRangeDropdownControl extends Component {
  render = () => {
    const { className, label, meta: { error: errorProp, submitFailed }, required } = this.props;
    const error = errorProp && submitFailed;
    return (
      <FormControl className={className} error={error}>
        <FormLabel error={error}>
          {label}
          {required && <span className="form-control__label-required">*</span>}
        </FormLabel>
        <Field
          name="start_of_day"
          component={DropdownControl}
          className="form-input-control"
          label="Start Time:"
          items={QUARTER_HOUR_LIST}
        />
        <Field
          name="end_of_day"
          component={DropdownControl}
          className="form-input-control"
          label="End Time:"
          items={QUARTER_HOUR_LIST}
        />
      </FormControl>
    );
  };
}

TimeRangeDropdownControl.defaultProps = {
  className: '',
  meta: {},
};

TimeRangeDropdownControl.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  meta: PropTypes.object,
  required: PropTypes.bool,
};

export default TimeRangeDropdownControl;
