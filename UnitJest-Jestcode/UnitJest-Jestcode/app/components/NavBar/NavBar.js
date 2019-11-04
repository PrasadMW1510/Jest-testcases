import React from 'react';
import PropTypes from 'prop-types';
import './NavBar.scss';

function NavBar({
  activeItemId,
  children: childrenProp,
  className,
  inset,
  palette: paletteProp,
  theme: themeProp,
  ...props
}) {
  // Setup classes
  const theme = themeProp && `navbar--theme-${themeProp}`;
  const palette = paletteProp && `navbar--palette-${paletteProp}`;
  // Set the appropriate nav item to `active`
  const children = React.Children.map(childrenProp, child => {
    if (!React.isValidElement(child)) {
      return null;
    }
    return React.cloneElement(child, {
      active: child.props.active || (child.props.id && child.props.id === activeItemId),
    });
  });
  return (
    <nav
      className={`navbar ${theme || ''} ${palette || ''} ${
        inset ? 'navbar--inset' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </nav>
  );
}

NavBar.defaultProps = {
  className: '',
  inset: false,
};

NavBar.propTypes = {
  // Set the active NavItem by including the id of the NavItem.
  activeItemId: PropTypes.string,
  children: PropTypes.node.isRequired,
  // Use this to override any styles needed
  className: PropTypes.string,
  // Set to true for modals. It removes the left vertical line on first NavItem.
  inset: PropTypes.bool.isRequired,
  // The color scheme to use ('orange' || 'green')
  palette: PropTypes.string,
  // The theme to use (only 'tabs' currently)
  theme: PropTypes.string,
};

export default NavBar;
