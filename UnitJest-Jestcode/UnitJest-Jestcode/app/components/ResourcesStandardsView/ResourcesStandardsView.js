/**
 *
 * ResourcesStandardsView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ResourcesModalStateView from 'components/ResourcesModalStateView';
import resourcesStandardPostSchema from './resourcesStandardPostSchema.json';
import { fastMathUrl, fasttMath, gradeOrder } from './constants';
import './ResourcesStandardsView.scss';

class ResourcesStandardsView extends React.Component {
  constructor() {
    super();
    this.state = {
      postData: { ...resourcesStandardPostSchema },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.appSelected !== nextProps.appSelected) {
      this.setState({
        postData: { ...resourcesStandardPostSchema },
      });
    }
  }

  stateHandleChange = event => {
    event.preventDefault();
    if (event.target.value !== 'locale') {
      this.setState({
        postData: {
          ...this.state.postData,
          state: event.target.value,
        },
      });
    } else {
      this.setState({
        postData: {
          ...this.state.postData,
          state: null,
        },
      });
    }
  };

  gradeHandleChange = event => {
    event.preventDefault();
    if (event.target.value !== 'grade') {
      this.setState({
        postData: {
          ...this.state.postData,
          grade: event.target.value,
        },
      });
    } else {
      this.setState({
        postData: {
          ...this.state.postData,
          grade: null,
        },
      });
    }
  };

  handleClick = event => {
    event.preventDefault();
    if (this.state.postData.grade || this.state.postData.state) {
      this.props.updateResourcesSearchModalStatus(true);
      this.props.postResourcesBasedOnId(this.state.postData, 'standard');
    }
  };

  /**
   * Assign the value for locale, grade is if the api sends back an list to render.
   * If there are no values to be displayed it would just display the default values.
   */
  localeDropDown = () =>
    this.props.standard.getIn(['available_standards', 0, 'locales', 0, 'locale']).map(locale => (
      <option key={locale} value={locale}>
        {locale}
      </option>
    ));

  gradeDropDown = () => {
    const grades = this.props.standard.getIn(['available_standards', 0, 'grades', 0, 'grade']);
    return gradeOrder.map(grade => {
      if (grades.includes(grade)) {
        return (
          <option key={grade} value={grade}>
            {grade}
          </option>
        );
      }
      return null;
    });
  };

  render() {
    return (
      <div className="resources-standards">
        {this.props.appSelected !== fasttMath &&
          this.props.standard.getIn(['available_standards', 0, 'locales', 0]) && (
            <div>
              Use the pull-down menus to select your state and grade.
              <div>
                <span className="resources-standards__text">Choose a state:</span>
                <select
                  className="resources-standards__search-box"
                  value={this.state.postData.state || ''}
                  onChange={this.stateHandleChange}
                >
                  {this.props.standard.getIn(['available_standards', 0, 'locales', 0]) && (
                    <option key="locale" value="locale">
                      {' '}
                    </option>
                  )}
                  {this.props.standard.getIn(['available_standards', 0, 'locales', 0]) &&
                    this.localeDropDown()}
                </select>
                <span className="resources-standards__text">Grade:</span>
                <select
                  className="resources-standards__search-box"
                  value={this.state.postData.grade || ''}
                  onChange={this.gradeHandleChange}
                >
                  {this.props.standard.getIn(['available_standards', 0, 'grades', 0]) && (
                    <option key="grade" value="grade">
                      {' '}
                    </option>
                  )}
                  {this.props.standard.getIn(['available_standards', 0, 'grades', 0]) &&
                    this.gradeDropDown()}
                </select>
                <button className="resources-standards__button" onClick={this.handleClick}>
                  GO
                </button>
                {this.props.modalSearchStatus &&
                  this.props.resourcesPostResponse && (
                    <ResourcesModalStateView
                      item={this.props.resourcesPostResponse}
                      modalStatus={this.props.modalSearchStatus}
                      updateResourcesModalStatus={this.props.updateResourcesSearchModalStatus}
                      itemGradeState={this.state.postData}
                      resourceName={this.props.resourceName}
                    />
                  )}
              </div>
            </div>
          )}
        {this.props.appSelected === fasttMath && (
          <div className="resources-standards__fastt-math">
            <a
              className="resources-standards__fastt-math--herf-link"
              href={fastMathUrl}
              target="_blank"
            >
              Click here to access FASTT Math Standards.
            </a>
          </div>
        )}
      </div>
    );
  }
}

ResourcesStandardsView.propTypes = {
  standard: PropTypes.object.isRequired,
  postResourcesBasedOnId: PropTypes.func,
  appSelected: PropTypes.string,
  resourcesPostResponse: PropTypes.object,
  updateResourcesSearchModalStatus: PropTypes.func,
  modalSearchStatus: PropTypes.bool,
  resourceName: PropTypes.string,
};

export default ResourcesStandardsView;
