/**
 *
 * HeaderUserTextContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import HeaderUserText from 'components/HeaderUserText';
import { makeSelectLoginData } from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';

export class HeaderUserTextContainer extends React.Component {
  render() {
    return (
      <HeaderUserText
        firstName={this.props.global.getIn(['first_name', 0])}
        lastName={this.props.global.getIn(['last_name', 0])}
      />
    );
  }
}

HeaderUserTextContainer.propTypes = {
  global: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  global: makeSelectLoginData(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect)(HeaderUserTextContainer);
