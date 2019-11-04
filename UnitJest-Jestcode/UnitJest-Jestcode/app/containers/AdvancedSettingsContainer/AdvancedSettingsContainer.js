/**
 *
 * AdvancedSettingsContainer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import AdvancedSettings from 'components/AdvancedSettings';
import {
  makeSelectProfileDistrictId,
  makeSelectProfileSessionId,
  makeSelectProfileUserId,
  makeSelectLoginUserOrg,
  makeSelectProfileUserType,
} from 'containers/App/selectors';

export class AdvancedSettingsContainer extends React.Component {
  render() {
    return <AdvancedSettings {...this.props} />;
  }
}

const mapStateToProps = createStructuredSelector({
  profileDistrictId: makeSelectProfileDistrictId(),
  profileUserId: makeSelectProfileUserId(),
  profileSessionId: makeSelectProfileSessionId(),
  profileOrgType: makeSelectLoginUserOrg(),
  profileUserType: makeSelectProfileUserType(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(AdvancedSettingsContainer);
