/**
 *
 * ResourceSamKeyword
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ResourcesModalView from 'components/ResourcesModalView';
import resourcesSamKeywordPostData from './resourcesSamKeywordPostData.json';

import './ResourcesSamKeyword.scss';

class ResourcesSamKeyword extends React.Component {
  constructor() {
    super();
    this.state = {
      inputData: '',
    };
  }

  sortingPostCall = sortTerm => {
    resourcesSamKeywordPostData.keywords = this.state.inputData;
    const newApp = this.props.Apps.toJS();
    const app = newApp.map(a => a.app_id[0]);
    resourcesSamKeywordPostData.installed_apps = { app };
    resourcesSamKeywordPostData.sortTerms.sortTerm = sortTerm;
    this.props.postResourcesQuickSearch(resourcesSamKeywordPostData);
  };

  handleClick = event => {
    event.preventDefault();
    resourcesSamKeywordPostData.keywords = this.state.inputData;
    const newApp = this.props.Apps.toJS();
    const app = newApp.map(a => a.app_id[0]);
    resourcesSamKeywordPostData.installed_apps = { app };
    this.props.postResourcesQuickSearch(resourcesSamKeywordPostData);
    this.props.updateResourcesQuickModalStatus(true);
  };

  handleInputBox = event => {
    event.preventDefault();
    this.setState({ inputData: event.target.value });
  };

  render() {
    return (
      <div className="sam-keyword-container">
        <div className="sam-keyword">
          <div className="sam-keyword__text">
            Enter the Keyword of the Resource you are looking for.
          </div>
          <div>
            <span className="sam-keyword__search-text">SAM Keyword: </span>
            <input
              type="text"
              className="sam-keyword__search-box"
              value={this.state.inputData}
              onChange={this.handleInputBox}
            />
            <button type="button" className="sam-keyword__search-btn" onClick={this.handleClick}>
              GO
            </button>
          </div>
        </div>
        {this.props.modalQuickStatus &&
          this.props.responseQuickSearch && (
            <ResourcesModalView
              item={this.props.responseQuickSearch}
              updateResourcesModalStatus={this.props.updateResourcesQuickModalStatus}
              modalStatus={this.props.modalQuickStatus}
              sortUpdater={this.sortingPostCall}
            />
          )}
      </div>
    );
  }
}

ResourcesSamKeyword.propTypes = {
  Apps: PropTypes.object,
  postResourcesQuickSearch: PropTypes.func,
  updateResourcesQuickModalStatus: PropTypes.func,
  modalQuickStatus: PropTypes.bool,
  responseQuickSearch: PropTypes.object,
};

export default ResourcesSamKeyword;
