/**
 *
 * ResourcesBrowseTab
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ResourcesModalView from 'components/ResourcesModalView';
import resourcesBrowsePostSchema from './resourcesBrowsePostSchema.json';

import './ResourcesBrowseTab.scss';

class ResourcesBrowseTab extends React.Component {
  constructor() {
    super();
    this.state = {
      resourceId: null,
    };
  }
  sortingPostCall = sortTerm => {
    resourcesBrowsePostSchema.resource_type = this.state.resourceId;
    resourcesBrowsePostSchema.sortTerms.sortTerm = sortTerm;
    this.props.postResourcesBasedOnId(resourcesBrowsePostSchema, 'advanced');
  };

  /**
   * Create a single list with the value to be displayed.
   * This is a nested resource needs to be made into a single list.
   */
  result = () => {
    const result = [];
    this.props.browseList.getIn(['resource_types', 0, 'resource_type']).forEach(resource => {
      const subType = resource.getIn(['resource_subtypes', 0, 'resource_subtype']);

      if (!subType) {
        result.push(resource);
      } else {
        const res = resource.remove('resource_subtypes');
        result.push(res);
        const resourceSubType = [...subType];
        result.push(...resourceSubType);
      }
    });
    return result;
  };

  itemSelect = (resourceId, event) => {
    event.preventDefault();
    this.setState({ resourceId });
    resourcesBrowsePostSchema.resource_type = resourceId;
    this.props.updateResourcesSearchModalStatus(true);
    this.props.postResourcesBasedOnId(resourcesBrowsePostSchema, 'advanced');
  };
  /**
   * Once we have the result, display the contents based on type_id or resource_subtype_id.
   * Note: type's also have to display description.
   */
  resourceContent = () => {
    const result = this.result();
    return result.map(browse => {
      if (browse.getIn(['resource_subtype_id', 0])) {
        return (
          <li key={browse.getIn(['resource_subtype_id', 0])} className="resources-browse__list">
            <button
              className="resources-browse__items resources-browse__items--subtype"
              onClick={event => this.itemSelect(browse.getIn(['resource_subtype_id', 0]), event)}
            >
              {browse.getIn(['resource_subtype_name', 0])}
            </button>
          </li>
        );
      }
      return (
        <span key={browse.getIn(['type_id', 0])}>
          <li className="resources-browse__list">
            <button
              className="resources-browse__items"
              onClick={event => this.itemSelect(browse.getIn(['type_id', 0]), event)}
            >
              {browse.getIn(['type_name', 0])}
            </button>
          </li>
          <li className="resources-browse__description">{browse.getIn(['type_description', 0])}</li>
        </span>
      );
    });
  };

  smiResourcesBrowse = () => (
    <span key="math_skills_database">
      <li className="resources-browse__list">
        <a
          className="resources-browse__items resources-browse__items--const-item"
          href="https://www.quantiles.com/tools/math-skills-database/keyword-search/"
          target="_blank"
        >
          Math Skills Database
        </a>
      </li>
      <li className="resources-browse__description">
        The database is designed to support differentiated instruction. It provides help to link
        assessment data to classroom practices.
      </li>
    </span>
  );

  /**
   * The app Id SMI stands for Math Inventory.
   * When the Math Inventory is selected the Browse tab must display 'Math Skills database' link which is not returned from the API.
   * @returns {*}
   */
  render() {
    return (
      <div className="resources-browse">
        <div
          className="resources-browse__header"
          key={this.props.browseList.getIn(['supertype_id', 0])}
        >
          {this.props.browseList.getIn(['supertype_name', 0])}
        </div>
        {this.props.appSelected === 'SMI' && this.smiResourcesBrowse()}
        {this.resourceContent()}
        {this.props.modalSearchStatus &&
          this.props.resourcesPostResponse && (
            <ResourcesModalView
              item={this.props.resourcesPostResponse}
              updateResourcesModalStatus={this.props.updateResourcesSearchModalStatus}
              modalStatus={this.props.modalSearchStatus}
              sortUpdater={this.sortingPostCall}
            />
          )}
      </div>
    );
  }
}

ResourcesBrowseTab.propTypes = {
  browseList: PropTypes.object.isRequired,
  postResourcesBasedOnId: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  resourcesPostResponse: PropTypes.object,
  updateResourcesSearchModalStatus: PropTypes.func,
  modalSearchStatus: PropTypes.bool,
  appSelected: PropTypes.string,
};

export default ResourcesBrowseTab;
