/**
 *
 * ProgramAvailableRosterContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import ProgramsAvailableRoster from 'components/ProgramsAvailableRoster/ProgramsAvailableRoster';
import { makeSelectProgramAvailableData } from 'containers/App/selectors';
import { handleSelectProgram } from 'containers/RosterPage/actions';

export class ProgramAvailableRosterContainer extends React.Component {
  getProgramList = () =>
    this.props.global.map(item => ({ array: item.getIn(['$', 'community_id']) })).toJS();

  render() {
    return (
      <ProgramsAvailableRoster
        messages={this.getProgramList()}
        handleSelectProgram={this.props.handleSelectProgram}
      />
    );
  }
}

ProgramAvailableRosterContainer.propTypes = {
  global: PropTypes.object.isRequired,
  handleSelectProgram: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  global: makeSelectProgramAvailableData(),
});

const withConnect = connect(mapStateToProps, { handleSelectProgram });

export default compose(withConnect)(ProgramAvailableRosterContainer);
