import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControl from '../FormControl';
import FormLabel from '../FormLabel';
import './DropdownControl.scss';

class DropdownControl extends Component {
  renderOption = (item, index) => {
    const { formatLabel } = this.props;
    const label = (formatLabel && formatLabel(item)) || item.label || item;
    const value = item.id || item.user_id || item.org_id || item;

    // Handle the case where just a label is needed
    if (typeof item === 'string')
      return (
        <option key={`option-${index}`} value={value}>
          {item}
        </option>
      );

    return (
      <option key={`option-${index}`} value={value}>
        {label}
      </option>
    );
  };

  render = () => {
    const {
      className,
      input,
      items: itemsProp,
      label,
      meta: { error: errorProp, submitFailed },
      required,
    } = this.props;
    const items = itemsProp.map(this.renderOption);
    const error = errorProp && submitFailed;
    return (
      <FormControl className={className} error={error}>
        <FormLabel error={error}>
          {label}
          {required && <span className="form-control__label-required">*</span>}
        </FormLabel>
        <div className="form-control__dropdown">
          <select className="form-control__dropdown-select" {...input}>
            {items}
          </select>
        </div>
      </FormControl>
    );
  };
}

DropdownControl.defaultProps = {
  className: '',
  items: [],
  meta: {},
};

DropdownControl.propTypes = {
  className: PropTypes.string,
  formatLabel: PropTypes.func,
  input: PropTypes.object,
  items: PropTypes.array.isRequired,
  label: PropTypes.string,
  meta: PropTypes.object,
  required: PropTypes.bool,
};

export default DropdownControl;
