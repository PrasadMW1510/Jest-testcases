/**
 *
 * AboutSamLinkContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { showAboutLinkModal } from 'containers/ModalController/actions';
import AboutSamLink from 'components/AboutSamLink';
import { makeSelectProgramAvailableData } from 'containers/App/selectors';
import { fromJS } from '../../../node_modules/immutable/dist/immutable';

export class AboutSamLinkContainer extends React.Component {
  getProductBuildDetails = () =>
    this.props.global
      .map(item => ({
        name: item.getIn(['$', 'name']),
        version: item.getIn(['$', 'customer_release_number']),
        Enabled: item.getIn(['$', 'enabled']),
        ServerBuildNumber: item.getIn(['$', 'version']),
        MediaBuildNumber: item.getIn(['$', 'product_media_version_number']),
        supernumber: item.getIn(['$', 'supernumber']),
      }))
      .toJS();

  handleAboutSAMClick = data => {
    this.props.showAboutLinkModal(data);
  };

  render() {
    return (
      <div>
        <title>AboutSamLinkContainer</title>
        <AboutSamLink
          onAboutSAMClick={this.handleAboutSAMClick}
          item={this.getProductBuildDetails()}
        />
      </div>
    );
  }
}
AboutSamLinkContainer.defaultProps = {
  global: fromJS({}),
};
AboutSamLinkContainer.propTypes = {
  global: PropTypes.object,
  showAboutLinkModal: PropTypes.func.isRequired,
};
const mapStateToProps = createStructuredSelector({
  global: makeSelectProgramAvailableData(),
});

const withConnect = connect(mapStateToProps, { showAboutLinkModal });

export default compose(withConnect)(AboutSamLinkContainer);
