/**
 *
 * AdvancedSearchControlButtons
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import './AdvancedSearchControlButtons.scss';
class AdvancedSearchControlButtons extends React.Component {
  handleClearForm = () => {
    this.props.callbackFromParent('formclear');
  };
  handleSearchForm = () => {
    this.props.callbackFromParent('formsearch');
  };
  render() {
    return (
      <div className="advanced-search-button__wrapper">
        <p className="advanced-search-button__para">
          Use these options to select criteria for your search. You must select at least one option;
          selecting more options will narrow your search.
        </p>
        <div className="advanced-search-button__wrapper-controls">
          <button className="button-clear" onClick={this.handleClearForm}>
            Clear
          </button>
          <button className="button-search" onClick={this.handleSearchForm}>
            Search
          </button>
        </div>
      </div>
    );
  }
}

AdvancedSearchControlButtons.propTypes = {
  callbackFromParent: PropTypes.func.isRequired,
};
export default AdvancedSearchControlButtons;
