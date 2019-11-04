import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../Checkbox';
import FormControl from '../FormControl';
import FormLabel from '../FormLabel';
import FormGroup from '../FormGroup';

function CheckboxControl({
  className,
  formatLabel,
  getId,
  input,
  items: itemsProp,
  label: labelControl,
  meta,
  required,
  row,
}) {
  const items = itemsProp.map(item => {
    const label = formatLabel ? formatLabel(item) : item.label || item;
    const id = getId ? getId(item) : item.id || item;
    return (
      <Checkbox key={id} id={id} className="form-control__checkbox" label={label} input={input} />
    );
  });
  return (
    <FormControl className={className} error={meta.error && meta.submitFailed}>
      {labelControl && (
        <FormLabel>
          {labelControl}
          {required && <span className="form-control__label-required">*</span>}
        </FormLabel>
      )}
      <FormGroup row={row}>{items}</FormGroup>
    </FormControl>
  );
}

CheckboxControl.defaultProps = {
  className: '',
  items: [],
  meta: {},
  row: false,
};

CheckboxControl.propTypes = {
  className: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  formatLabel: PropTypes.func,
  getId: PropTypes.func,
  input: PropTypes.object,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  meta: PropTypes.object.isRequired, // Info on errors, dirty, submitFailed, touched, etc.
  required: PropTypes.bool,
  row: PropTypes.bool.isRequired,
};

export default CheckboxControl;
