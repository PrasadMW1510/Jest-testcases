/**
 *
 * ResourcesActivityTab
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ResourcesITSView from 'components/ResourcesITSView';
import ResourcesStandardsView from 'components/ResourcesStandardsView';
import ResourcesAdvancedView from 'components/ResourcesAdvancedView';
import ResourcesBrowse from 'components/ResourcesBrowse';
import NavBar, { NavItem } from 'components/NavBar';
import { tab } from './constants';
import './ResourcesActivityTab.scss';

class ResourcesActivityTab extends React.Component {
  constructor() {
    super();
    this.state = {
      tabSelected: tab.ADVANCED,
      resource: [],
    };
  }

  /**
   * The setState is to reset the resource value every time a new app is selected.
   * Verify for the resource information every time api sends a response for the application selected.
   * Not all application has resources information, So reset and display nothing in the child component when there are no application based resources.
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    this.setState({ resource: [] });
    if (nextProps.resourcesAppInfo.getIn(['resource_supertypes', 0])) {
      this.updateResourcesAppInfo(
        nextProps.resourcesAppInfo.getIn(['resource_supertypes', 0]).toJS()
      );
    }
    if (this.state.tabSelected === tab.ITS) {
      if (!nextProps.appITSInfo.length) {
        this.setState({ tabSelected: tab.STANDARDS });
      }
    }
  }

  handleTabClick = ev => this.setState({ tabSelected: ev.currentTarget.id });

  traverse = data => {
    let result = [];
    const resType = data.resource_supertype || data.resource_type;
    const resTypes = data.resource_supertypes || data.resource_types;

    // base case
    if (!resType && !resTypes) {
      return result;
    }

    if (resType) {
      resType.forEach(obj => {
        const res = { ...obj };
        delete res.resource_supertypes;
        delete res.resource_types;

        if (!res.resource_supertypes && !res.supertype_name) {
          result.push(res);
        }
        result = result.concat(this.traverse(obj));
      });
    } else {
      resTypes.forEach(obj => {
        result = result.concat(this.traverse(obj));
      });
    }
    result = result.sort((a, b) => a.type_name[0].localeCompare(b.type_name[0]));
    return result;
  };

  /**
   * The api response has a undefined parent to child/ inner-child relationship. The data will change based on the application selected.
   * Converting the Api output to a single array so, the child components can have a single list.
   * @param app
   */
  updateResourcesAppInfo = app => {
    const resource = this.traverse(app);
    this.setState({ resource });
  };

  render() {
    return (
      <div>
        <div className="resources-activity-tab">
          <NavBar activeItemId={this.state.tabSelected} theme="tabs" palette="green">
            <NavItem
              id={tab.ADVANCED}
              className="resources-activity-tab--button"
              onClick={this.handleTabClick}
            >
              Advanced
            </NavItem>
            <NavItem
              id={tab.BROWSE}
              className="resources-activity-tab--button"
              onClick={this.handleTabClick}
            >
              Browse
            </NavItem>
            <NavItem
              id={tab.STANDARDS}
              className="resources-activity-tab--button"
              onClick={this.handleTabClick}
            >
              Standards
            </NavItem>
            {this.props.appITSInfo.length > 0 && (
              <NavItem
                id={tab.ITS}
                className="resources-activity-tab--button"
                onClick={this.handleTabClick}
              >
                ITS
              </NavItem>
            )}
          </NavBar>
        </div>
        <div className="resources-activity-content">
          {this.state.tabSelected === tab.ADVANCED && (
            <ResourcesAdvancedView
              advancedResource={this.state.resource}
              advancedSkill={this.props.resourcesAppInfo}
              postResourcesBasedOnId={this.props.postResourcesBasedOnId}
              appSelected={this.props.appSelected}
              resourcesPostResponse={this.props.resourcesPostResponse}
              updateResourcesSearchModalStatus={this.props.updateResourcesSearchModalStatus}
              modalSearchStatus={this.props.modalSearchStatus}
            />
          )}
          {this.state.tabSelected === tab.BROWSE && (
            <div className="resources-browse-header-text">
              <span className="resources-browse-header-text__text">
                Click a link to view Resources.
              </span>
              <ResourcesBrowse
                browseResource={this.props.resourcesAppInfo.getIn(['resource_supertypes', 0])}
                postResourcesBasedOnId={this.props.postResourcesBasedOnId}
                resourcesPostResponse={this.props.resourcesPostResponse}
                updateResourcesSearchModalStatus={this.props.updateResourcesSearchModalStatus}
                modalSearchStatus={this.props.modalSearchStatus}
                appSelected={this.props.appSelected}
              />
            </div>
          )}
          {this.state.tabSelected === tab.STANDARDS && (
            <ResourcesStandardsView
              standard={this.props.resourcesAppInfo}
              postResourcesBasedOnId={this.props.postResourcesBasedOnId}
              appSelected={this.props.appSelected}
              resourcesPostResponse={this.props.resourcesPostResponse}
              updateResourcesSearchModalStatus={this.props.updateResourcesSearchModalStatus}
              modalSearchStatus={this.props.modalSearchStatus}
              resourceName={this.props.resourcesAppInfo.getIn(['resource_program_name', 0])}
            />
          )}
          {this.state.tabSelected === tab.ITS &&
            this.props.appITSInfo.length > 0 && (
              <ResourcesITSView appInfo={this.props.appITSInfo} sessionId={this.props.sessionId} />
            )}
        </div>
      </div>
    );
  }
}

ResourcesActivityTab.propTypes = {
  resourcesAppInfo: PropTypes.object.isRequired,
  appITSInfo: PropTypes.array.isRequired,
  postResourcesBasedOnId: PropTypes.func,
  appSelected: PropTypes.string,
  resourcesPostResponse: PropTypes.object,
  updateResourcesSearchModalStatus: PropTypes.func,
  modalSearchStatus: PropTypes.bool,
  sessionId: PropTypes.string,
};

export default ResourcesActivityTab;
