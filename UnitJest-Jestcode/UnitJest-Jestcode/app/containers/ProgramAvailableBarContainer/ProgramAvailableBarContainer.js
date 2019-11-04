/**
 *
 * ProgramAvailableBarContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import ProgramAvailableBar from 'components/ProgramAvailableBar/ProgramAvailableBar';
import { makeSelectProgramAvailableData } from 'containers/App/selectors';
// import * as Actions from 'containers/App/actions';

export class ProgramAvailableBarContainer extends React.Component {
  getProgramList = () =>
    this.props.global.map(item => ({ array: item.getIn(['$', 'community_id']) })).toJS();

  render() {
    return <ProgramAvailableBar items={this.getProgramList()} />;
  }
}

ProgramAvailableBarContainer.propTypes = {
  global: PropTypes.object.isRequired,
  // allActions: PropTypes.object.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    allActions: bindActionCreators(dispatch),
  };
}

const mapStateToProps = createStructuredSelector({
  global: makeSelectProgramAvailableData(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ProgramAvailableBarContainer);
