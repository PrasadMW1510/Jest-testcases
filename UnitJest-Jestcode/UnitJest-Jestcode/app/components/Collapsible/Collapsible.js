/**
 *
 * Collapsible
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import './Collapsible.scss';

class Collapsible extends React.Component {
  state = {
    isExpanded: true,
  };

  handleToggle = e => {
    e.preventDefault();
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  };

  render() {
    const { title, children } = this.props;
    const { isExpanded } = this.state;

    return (
      <div
        className={`collapsible__wrapper ${isExpanded ? 'collapsible__wrapper--is-expanded' : ''}`}
      >
        <div
          className="collapsible__wrapper-heading"
          role="button"
          tabIndex={0}
          onClick={e => this.handleToggle(e)}
        >
          <h2
            className={`${
              isExpanded
                ? 'collapsible-title collapsible-icon collapsible-icon--down-arrow'
                : 'collapsible-title collapsible-icon collapsible-icon--right-arrow'
            }`}
          >
            {title}
          </h2>
        </div>
        <div className="collapsible__wrapper-collapse">
          <div className="collapsible__wrapper-body">{children}</div>
        </div>
      </div>
    );
  }
}

Collapsible.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Collapsible;
