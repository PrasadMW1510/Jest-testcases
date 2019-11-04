import React from 'react';
import PropTypes from 'prop-types';
import './Tab.scss';

const Tab = ({ children, className, component: Component, ...props }) => {
  const classes = `tab-bar__tab ${className}`;
  return (
    <Component className={classes} {...props}>
      <span className="tab-bar__text">{children}</span>
    </Component>
  );
};

// By default uses a <button> as base component. Pass in another component if needed.
// Useful to pass in router <Link> or <NavLink> component here.
Tab.defaultProps = {
  className: '',
  component: 'button',
};

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

export default Tab;
