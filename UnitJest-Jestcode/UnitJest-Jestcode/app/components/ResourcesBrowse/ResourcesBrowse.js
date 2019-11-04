/**
 *
 * ResourcesBrowse
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ResourcesBrowseTab from 'components/ResourcesBrowseTab';

import './ResourcesBrowse.scss';

class ResourcesBrowse extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  /**
   * Create the number of browse Resources based on the number of resource_supertype.
   */
  displayResourceBrowseTab = () =>
    this.props.browseResource
      .get('resource_supertype')
      .map(browse => (
        <ResourcesBrowseTab
          key={browse.getIn(['supertype_id', 0])}
          browseList={browse}
          postResourcesBasedOnId={this.props.postResourcesBasedOnId}
          resourcesPostResponse={this.props.resourcesPostResponse}
          updateResourcesSearchModalStatus={this.props.updateResourcesSearchModalStatus}
          modalSearchStatus={this.props.modalSearchStatus}
          appSelected={this.props.appSelected}
        />
      ));

  /**
   * Verify the size and display component.
   */
  render() {
    return (
      <div className="resources-browse-container">
        {this.props.browseResource &&
          this.props.browseResource.get('resource_supertype') && (
            <div className="resources-browse-container__columns">
              {this.displayResourceBrowseTab()}
            </div>
          )}
      </div>
    );
  }
}

ResourcesBrowse.propTypes = {
  browseResource: PropTypes.object,
  postResourcesBasedOnId: PropTypes.func,
  resourcesPostResponse: PropTypes.object,
  updateResourcesSearchModalStatus: PropTypes.func,
  modalSearchStatus: PropTypes.bool,
  appSelected: PropTypes.string,
};

export default ResourcesBrowse;
