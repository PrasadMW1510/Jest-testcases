/**
 *
 * StudentWorksContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import PortfolioTreeMenu from 'components/PortfolioTreeMenu';
import StudentWorks from 'components/StudentWorks';
import {
  makeSelectProfileUserType,
  makeSelectLoginUserOrg,
  makeSelectSchoolsDataMap,
  makeSelectGlobalUserData,
  makeSelectProfileDistrictId,
  makeSelectProfileUserId,
  makeSelectProfileUserOrgId,
} from 'containers/App/selectors';
import {
  showRead180Modal,
  showInboxProgram,
  showSystem44StudentGoalsModal,
  showIReadStudentWorkModal,
  showRead180RespondWriteModal,
  showSystem44SuccessRecordModal,
} from 'containers/ModalController/actions';
import makeSelectStudentWorksContainer from './selectors';
import * as Constants from './constants';
import reducer from './reducer';
import saga from './saga';
import {
  getSchoolDetailsRequest,
  getGradeDetailsRequest,
  getTeachersDetailsRequest,
  getPortfolioClassDetailsRequest,
  getStudentsSubmissionMetadataSW,
  getStudentEnrolment,
  getStudentsSubmissionTreeList,
  getStudentsSubmissionNodeList,
} from './actions';

export class StudentWorksContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      propsUser: this.props.profileUserType,
    };
  }
  componentDidMount() {
    if (
      (Constants.ADMINISTRATOR === this.state.propsUser ||
        Constants.TECH === this.state.propsUser) &&
      this.props.makeSelectLoginUserOrg === Constants.ORG_SCHOOL
    ) {
      const schoolid = {
        schoolid: [this.props.makeSelectProfileUserOrgId],
      };
      this.props.getGradeDetailsRequest(schoolid.schoolid, Constants.SCHOOL_USER);
    } else if (Constants.TEACHER_USER === this.state.propsUser) {
      const userId = [this.props.makeSelectProfileUserId]; // classid
      this.props.getPortfolioClassDetailsRequest(userId, Constants.TEACHER_USER);
    } else {
      this.props.getSchoolDetailsRequest(this.props.districtProfile);
    }
  }
  render() {
    return (
      <div className="student-work-page">
        <div className="student-work-leftpanel-container">
          <div className="student-work-header-block">
            <PortfolioTreeMenu
              {...this.props}
              schoolData={this.props.studentworkscontainer.treeData}
              userType={this.state.propsUser}
            />
          </div>
        </div>
        <div className="student-work-rightpanel-container">
          <StudentWorks
            data={this.props.studentworkscontainer.selectedClassAssignments}
            showRead180Modal={this.props.showRead180Modal}
            showInboxProgram={this.props.showInboxProgram}
            showIReadStudentWorkModal={this.props.showIReadStudentWorkModal}
            showSystem44StudentGoalsModal={this.props.showSystem44StudentGoalsModal}
            showRead180RespondWriteModal={this.props.showRead180RespondWriteModal}
            showSystem44SuccessRecordModal={this.props.showSystem44SuccessRecordModal}
            location={this.props.location}
          />
        </div>
      </div>
    );
  }
}

StudentWorksContainer.propTypes = {
  showRead180Modal: PropTypes.func,
  showInboxProgram: PropTypes.func.isRequired,
  showIReadStudentWorkModal: PropTypes.func.isRequired,
  showSystem44StudentGoalsModal: PropTypes.func.isRequired,
  profileUserType: PropTypes.string,
  makeSelectProfileUserId: PropTypes.string,
  makeSelectLoginUserOrg: PropTypes.string,
  showRead180RespondWriteModal: PropTypes.func,
  showSystem44SuccessRecordModal: PropTypes.func,
  studentworkscontainer: PropTypes.object,
  makeSelectProfileUserOrgId: PropTypes.string,
  getGradeDetailsRequest: PropTypes.func.isRequired,
  getPortfolioClassDetailsRequest: PropTypes.func.isRequired,
  getSchoolDetailsRequest: PropTypes.func.isRequired,
  location: PropTypes.object,
  districtProfile: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  studentworkscontainer: makeSelectStudentWorksContainer(),
  profileUserType: makeSelectProfileUserType(),
  profileSchoolId: makeSelectSchoolsDataMap(),
  profileUserData: makeSelectGlobalUserData(),
  districtProfile: makeSelectProfileDistrictId(),
  makeSelectLoginUserOrg: makeSelectLoginUserOrg(),
  makeSelectProfileUserId: makeSelectProfileUserId(),
  makeSelectProfileUserOrgId: makeSelectProfileUserOrgId(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getSchoolDetailsRequest: value => dispatch(getSchoolDetailsRequest(value)),
    getGradeDetailsRequest: (value, userType) => dispatch(getGradeDetailsRequest(value, userType)),
    getTeachersDetailsRequest: (value, userType, adminType) =>
      dispatch(getTeachersDetailsRequest(value, userType, adminType)),
    getPortfolioClassDetailsRequest: (value, userType, adminType) =>
      dispatch(getPortfolioClassDetailsRequest(value, userType, adminType)),
    getStudentsSubmissionMetadataSW: value => dispatch(getStudentsSubmissionMetadataSW(value)),
    getStudentEnrolment: value => dispatch(getStudentEnrolment(value)),
    getStudentsSubmissionTreeList: (value, userType, adminType) =>
      dispatch(getStudentsSubmissionTreeList(value, userType, adminType)),
    getStudentsSubmissionNodeList: value => dispatch(getStudentsSubmissionNodeList(value)),
    showRead180Modal: (data, page, rowIndex, allRows) =>
      dispatch(showRead180Modal(data, page, rowIndex, allRows)),
    showInboxProgram: (data, page, rowIndex, allRows) =>
      dispatch(showInboxProgram(data, page, rowIndex, allRows)),
    showIReadStudentWorkModal: data => dispatch(showIReadStudentWorkModal(data)),
    showSystem44StudentGoalsModal: data => dispatch(showSystem44StudentGoalsModal(data)),
    showRead180RespondWriteModal: (data, page, rowIndex, allRows) =>
      dispatch(showRead180RespondWriteModal(data, page, rowIndex, allRows)),
    showSystem44SuccessRecordModal: (data, rowIndex, allRows) =>
      dispatch(showSystem44SuccessRecordModal(data, rowIndex, allRows)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'studentWorksContainer', reducer });
const withSaga = injectSaga({ key: 'studentWorksContainer', saga });

export default compose(withRouter, withReducer, withSaga, withConnect)(StudentWorksContainer);
