/**
 *
 * ResourcesPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import ResourcesSamKeyword from 'components/ResourcesSamKeyword';
import ResourcesActivity from 'containers/ResourcesActivity';
import { excludeApps } from './constants';
import {
  makeSelectResourcesPage,
  makeSelectResourceQuickModalStatus,
  makeSelectQuickSearch,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getProductList,
  getBuildInfo,
  updateResourcesQuickModalStatus,
  postResourcesQuickSearch,
} from './actions';

import './ResourcesPage.scss';

export class ResourcesPage extends React.Component {
  constructor() {
    super();
    this.state = {
      name: [],
      appSelected: '',
    };
  }

  componentDidMount() {
    this.props.getProductList();
    this.props.getBuildInfo();
    if (this.props.Apps.get('menu_option')) {
      this.updateAppList(this.props.Apps.toJS());
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.Apps.get('menu_option')) {
      this.updateAppList(nextProps.Apps.toJS());
    }
  }

  updateAppList = appList => {
    const app = appList.menu_option;

    const name = [{ app_id: 'choose_a_program', name: 'choose a program' }];
    app.forEach(value => {
      if (!excludeApps.includes(value.name[0])) {
        name.push(value);
      }
    });

    this.setState({
      name,
    });
  };

  handleChange = event => {
    this.setState({ appSelected: event.target.value });
  };

  render() {
    let dropDown = <option>{'choose a program'}</option>;
    if (this.state.name.length > 0) {
      dropDown = this.state.name.map(app => (
        <option key={app.app_id} value={app.app_id}>
          {app.name}
        </option>
      ));
    }
    return (
      <div className="resources">
        <ResourcesSamKeyword
          Apps={this.props.Apps.get('menu_option')}
          postResourcesQuickSearch={this.props.postResourcesQuickSearch}
          updateResourcesQuickModalStatus={this.props.updateResourcesQuickModalStatus}
          modalQuickStatus={this.props.modalQuickStatus}
          responseQuickSearch={this.props.responseQuickSearch}
        />
        <div className="resources-page-container">
          <div className="resources-program">
            <div className="resources-program__header">
              To search for Resources, browse for Resources, look up Standards, or access the
              Interactive Teaching System, first choose a program.
            </div>
            <div className="resources-program__input-box">
              <b>Program: </b>
              <select
                id="appList"
                onChange={this.handleChange}
                className="resources-program__search-box"
              >
                {dropDown}
              </select>
              <div className="resources-program-activity">
                {this.state.appSelected !== '' && (
                  <ResourcesActivity appSelected={this.state.appSelected} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ResourcesPage.propTypes = {
  getProductList: PropTypes.func.isRequired,
  getBuildInfo: PropTypes.func.isRequired,
  Apps: PropTypes.object.isRequired,
  postResourcesQuickSearch: PropTypes.func,
  updateResourcesQuickModalStatus: PropTypes.func,
  modalQuickStatus: PropTypes.bool,
  responseQuickSearch: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  Apps: makeSelectResourcesPage(),
  modalQuickStatus: makeSelectResourceQuickModalStatus(),
  responseQuickSearch: makeSelectQuickSearch(),
});

const withConnect = connect(mapStateToProps, {
  getProductList,
  getBuildInfo,
  updateResourcesQuickModalStatus,
  postResourcesQuickSearch,
});

const withReducer = injectReducer({ key: 'resourcesPage', reducer });
const withSaga = injectSaga({ key: 'resourcesPage', saga });

export default compose(withReducer, withSaga, withConnect)(ResourcesPage);
