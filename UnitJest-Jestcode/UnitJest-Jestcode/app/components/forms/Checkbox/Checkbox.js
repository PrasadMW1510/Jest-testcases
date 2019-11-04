import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Checkbox.scss';

class Checkbox extends Component {
  isChecked = () => {
    const { input, id } = this.props;
    return input && input.value && input.value.get(id);
  };

  handleClick = ev => {
    ev.preventDefault();
    const { input, id } = this.props;
    const map = input.value;
    const checkedItems = !map.get(id) ? map.set(id, true) : map.delete(id);
    input.onChange(checkedItems);
  };

  render = () => {
    const { checked, className, input, label, ...props } = this.props;
    return (
      <div
        className={`form-control__checkbox ${
          this.isChecked() ? 'form-control__checkbox--checked' : ''
        } ${className}`}
        {...props}
      >
        <button className="form-control__checkbox-icon" onClick={this.handleClick} />
        <span>{label}</span>
      </div>
    );
  };
}

Checkbox.defaultProps = {
  className: '',
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  input: PropTypes.object,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Checkbox;
