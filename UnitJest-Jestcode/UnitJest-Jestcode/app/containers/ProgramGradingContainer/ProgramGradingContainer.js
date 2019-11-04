/**
 *
 * ProgramGradingContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

// (see note below about imports from ProgramSettingsContainer)
import ProgramGradingView from 'components/ProgramGradingView';
import { programSettingsEnrollmentList } from 'containers/ProgramSettingsContainer/actions';
import reducer from 'containers/ProgramSettingsContainer/reducer';
import saga from 'containers/ProgramSettingsContainer/saga';
import { makeSelectEnrollmentList } from 'containers/ProgramSettingsContainer/selectors';
import makeSelectRosterPage from 'containers/RosterPage/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

/**
 * NOTE:  The ProgramGradingContainer is a peer of the Program Settings
 * and reuses a lot of the same data retrieval methods, e.g.
 * actions and selectors.  We opt to use the Program Settings as the
 * primary controller of such info (rather than Grading Tools).
 */
export class ProgramGradingContainer extends React.Component {
  componentDidMount() {
    this.props.programSettingsEnrollmentList();
  }
  render() {
    return (
      <div className="roster-content-panel">
        <ProgramGradingView
          selectedProgram={this.props.rosterPage.selectedProgram}
          enrollmentList={this.props.enrollmentList}
        />
      </div>
    );
  }
}

ProgramGradingContainer.propTypes = {
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

export default compose(withReducer, withSaga, withConnect)(ProgramGradingContainer);
