import React from 'react';
import PropTypes from 'prop-types';

function NavItem({ active, children, className, component: Component, hasErrors, ...props }) {
  const classes = `navbar__item ${active ? 'navbar__item--active' : ''} ${className}`;
  return (
    <Component className={classes} {...props}>
      <span className={`navbar__item-text ${hasErrors ? 'navbar__item-text--error' : ''}`}>
        {children}
      </span>
    </Component>
  );
}

NavItem.defaultProps = {
  active: false,
  className: '',
  component: 'button',
  hasErrors: false,
};

NavItem.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  hasErrors: PropTypes.bool.isRequired,
};

export default NavItem;
