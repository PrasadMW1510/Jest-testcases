/**
 *
 * UserTitleText
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLoginUserOrg } from 'containers/App/selectors';
import { COHORT_TYPE } from 'containers/App/constants';
import { makeSelectSelectedCohortName } from 'containers/SmartBarContainer/selectors';

export class UserTitleText extends React.PureComponent {
  renderText = () => {
    // display most specific selected cohort
    if (this.props.selectedCohortName) {
      return this.props.selectedCohortName;
    }

    // if there is no selection, we show generic text
    switch (this.props.userOrg) {
      case COHORT_TYPE.District:
        return 'My District';
      case COHORT_TYPE.School:
        return 'My School';
      default:
        return 'My Classes';
    }
  };

  render() {
    return this.renderText();
  }
}

UserTitleText.defaultProps = {
  selectedCohortName: '',
};

UserTitleText.propTypes = {
  userOrg: PropTypes.string,
  selectedCohortName: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userOrg: makeSelectLoginUserOrg(),
  selectedCohortName: makeSelectSelectedCohortName(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(UserTitleText);
