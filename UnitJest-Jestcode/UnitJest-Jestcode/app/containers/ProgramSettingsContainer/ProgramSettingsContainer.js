/**
 *
 * ProgramSettingsContainer
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import ProgramSettingsView from 'components/ProgramSettingsView';
import makeSelectRosterPage from 'containers/RosterPage/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { programSettingsEnrollmentList } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectEnrollmentList } from './selectors';

export class ProgramSettingsContainer extends React.Component {
  componentDidMount() {
    this.props.programSettingsEnrollmentList();
  }

  render() {
    return (
      <ProgramSettingsView
        selectedProgram={this.props.rosterPage.selectedProgram}
        enrollmentList={this.props.enrollmentList}
      />
    );
  }
}

ProgramSettingsContainer.propTypes = {
  enrollmentList: PropTypes.object.isRequired,
  programSettingsEnrollmentList: PropTypes.func.isRequired,
  rosterPage: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  enrollmentList: makeSelectEnrollmentList(),
  rosterPage: makeSelectRosterPage(),
});

const withConnect = connect(mapStateToProps, { programSettingsEnrollmentList });

const withReducer = injectReducer({ key: 'programSettingsContainer', reducer });
const withSaga = injectSaga({ key: 'programSettingsContainer', saga });

export default compose(withReducer, withSaga, withConnect)(ProgramSettingsContainer);
