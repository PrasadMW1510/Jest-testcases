/**
 *
 * ResourcesActivity
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import ResourcesActivityTab from 'components/ResourcesActivityTab';
import { makeSelectProfileSessionId } from 'containers/App/selectors';
import {
  makeSamResourceAppInfo,
  makeITSAppInfo,
  makeSelectResourcesModal,
  makeSelectModalSearchStatus,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getAppBasedResource,
  getITSApps,
  updateAppSelected,
  postResourcesBasedOnId,
  updateResourcesSearchModalStatus,
} from './actions';

export class ResourcesActivity extends React.Component {
  constructor() {
    super();
    this.state = {
      itsInfo: [],
    };
  }

  componentDidMount() {
    this.props.getAppBasedResource(this.props.appSelected);
    this.props.getITSApps();
    this.props.updateAppSelected(this.props.appSelected);
    this.props.updateResourcesSearchModalStatus(false);
  }

  /**
   * Trigger a API call to get the app information for the new app that's selected.
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.appSelected !== nextProps.appSelected) {
      this.props.getAppBasedResource(nextProps.appSelected);
      this.props.updateAppSelected(nextProps.appSelected);
      this.props.updateResourcesSearchModalStatus(false);
    }
    if (nextProps.ITSInfo.get('its_tab_text')) {
      this.verifyITSStatus(
        nextProps.appSelected,
        nextProps.ITSInfo.getIn(['its_tab_text', 0, 'text']).toJS()
      );
    }
  }

  /**
   * Check for the app ID and determine if the app selected has ITS information to be displayed.
   */
  verifyITSStatus = (appId, ITSapps) => {
    this.setState({ itsInfo: [] });
    const appITSInfo = [];
    ITSapps.forEach(app => {
      if (app.$.app === appId) {
        appITSInfo.push(app);
      }
    });
    this.setState({ itsInfo: appITSInfo });
  };

  render() {
    return (
      <ResourcesActivityTab
        resourcesAppInfo={this.props.resourceInfo}
        appITSInfo={this.state.itsInfo}
        postResourcesBasedOnId={this.props.postResourcesBasedOnId}
        appSelected={this.props.appSelected}
        resourcesPostResponse={this.props.resourcesPostResponse}
        updateResourcesSearchModalStatus={this.props.updateResourcesSearchModalStatus}
        modalSearchStatus={this.props.modalSearchStatus}
        sessionId={this.props.sessionId}
      />
    );
  }
}

ResourcesActivity.propTypes = {
  getAppBasedResource: PropTypes.func.isRequired,
  getITSApps: PropTypes.func.isRequired,
  appSelected: PropTypes.string.isRequired,
  resourceInfo: PropTypes.object.isRequired,
  ITSInfo: PropTypes.object.isRequired,
  updateAppSelected: PropTypes.func.isRequired,
  postResourcesBasedOnId: PropTypes.func.isRequired,
  resourcesPostResponse: PropTypes.object.isRequired,
  updateResourcesSearchModalStatus: PropTypes.func.isRequired,
  modalSearchStatus: PropTypes.bool.isRequired,
  sessionId: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  resourceInfo: makeSamResourceAppInfo(),
  ITSInfo: makeITSAppInfo(),
  resourcesPostResponse: makeSelectResourcesModal(),
  modalSearchStatus: makeSelectModalSearchStatus(),
  sessionId: makeSelectProfileSessionId(),
});

const withConnect = connect(mapStateToProps, {
  getAppBasedResource,
  getITSApps,
  updateAppSelected,
  postResourcesBasedOnId,
  updateResourcesSearchModalStatus,
});

const withReducer = injectReducer({ key: 'resourcesActivity', reducer });
const withSaga = injectSaga({ key: 'resourcesActivity', saga });

export default compose(withReducer, withSaga, withConnect)(ResourcesActivity);
