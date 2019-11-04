import React from 'react';

import AboutSamLinkModalContainer from 'containers/AboutSamLinkModalContainer';
import AccountDeleteModalContainer from 'containers/AccountDeleteModalContainer/Loadable';
import ReactivateSchoolModalContainer from 'containers/ReactivateSchoolModalContainer/Loadable';
import ReactivateClassModalContainer from 'containers/ReactivateClassModalContainer/Loadable';
import ActivateQuizContainer from 'containers/ActivateQuizContainer/Loadable';
import AddEditClass from 'containers/AddEditClass/Loadable';
import AddEditStudent from 'containers/AddEditStudent/Loadable';
import AddEditTeacher from 'containers/AddEditTeacher/Loadable';
import AddGroupContainer from 'containers/AddGroupContainer';
import AddSchoolContainer from 'containers/AddEditSchool/Loadable';
import AddDemographicModalContainer from 'containers/AddDemographicModalContainer';
import AddAssignmentContainer from 'containers/AddAssignmentContainer/Loadable';

import CancelCredentialsModal from 'containers/CancelCredentialsModal';
import ClassAssignModalContainer from 'containers/ClassAssignModalContainer/Loadable';
import ClearRosterModalContainer from 'containers/ClearRosterModalContainer';
import ClearRosterSuccessModalContainer from 'containers/ClearRosterSuccessModalContainer';
import CatchAllClassContainer from 'containers/CatchAllClassContainer/Loadable';

import DeactivateClassModalContainer from 'containers/DeactivateClassModalContainer/Loadable';
import DeactivateModalContainer from 'containers/DeactivateModalContainer/Loadable';
import DeactivateGroupModalContainer from 'containers/DeactivateGroupModalContainer/Loadable';
import DeactivateQuizContainer from 'containers/DeactivateQuizContainer/Loadable';
import DeactivateSchoolModalContainer from 'containers/DeactivateSchoolModalContainer/Loadable';
import DeactivateStudentModalContainer from 'containers/DeactivateStudentModalContainer/Loadable';
import DeactivateSuccessGroupModalContainer from 'containers/DeactivateSuccessGroupModalContainer/Loadable';
import DeactivateSuccessModalContainer from 'containers/DeactivateSuccessModalContainer/Loadable';
import DeactivateSuccessSchoolModalContainer from 'containers/DeactivateSuccessSchoolModalContainer/Loadable';
import DeactivateSuccessClassModalContainer from 'containers/DeactivateSuccessClassModalContainer/Loadable';
import DeactivateSuccessStudentModalContainer from 'containers/DeactivateSuccessStudentModalContainer/Loadable';
import DeleteInactiveSuccessModalContainer from 'containers/DeleteInactiveSuccessModalContainer/Loadable';

import EditAdminContainer from 'containers/EditAdminContainer/Loadable';
import EditAdminWarningContainer from 'containers/EditAdminWarningContainer';
import EditDistrictProfileContainer from 'containers/EditDistrictProfileContainer';
import EditQuizCollectionNamesContainer from 'containers/EditQuizCollectionNamesContainer/Loadable';
import ExportTeacherMadeQuizzesContainer from 'containers/ExportTeacherMadeQuizzesContainer/Loadable';

import IreadScreenerModalContainer from 'containers/IreadScreenerModalContainer/Loadable';

import LogoutModalContainer from 'containers/LogoutModalContainer/Loadable';

import MessageLogModalContainer from 'containers/MessageLogModalContainer';

import NoItemsSelectedModalContainer from 'containers/NoItemsSelectedModalContainer/Loadable';

import OkCancelModalContainer from 'containers/modals/OkCancelModalContainer';

import ProgramSettingSetStudentLevelModalContainer from 'containers/ProgramSettingSetStudentLevelModalContainer';
import PrintBookLabelContainer from 'containers/PrintBookLabelContainer/Loadable';
import PrintCustomQuizList from 'containers/PrintCustomQuizList/Loadable';
import PrintQuizAndAnswerKeyContainer from 'containers/PrintQuizAndAnswerKeyContainer/Loadable';

import R180NgTopicManagerSkipModalContainer from 'containers/R180NgTopicManagerSkipModalContainer';
import R180NgtopicsSkipSegmentModalContainer from 'containers/R180NgtopicSkipSegmentModalContainer';
import R180NgtopicsStageModalContainer from 'containers/R180NgtopicsStageModalContainer';
import RemoveAdminModalContainer from 'containers/RemoveAdminModalContainer';
import RSkillsCCTestAssignmentSaveSuccessModalContainer from 'containers/RSkillsCCTestAssignmentSaveSuccessModalContainer/Loadable';
import Read180NgAssaignmentContainer from 'containers/Read180NgAssaignmentContainer/Loadable';

import SearchModalContainer from 'containers/SearchModalContainer/Loadable';
import SearchResultDetailsContainer from 'containers/SearchResultDetailsContainer/Loadable';

import TeacherMadeQuizContainer from 'containers/TeacherMadeQuizContainer/Loadable';

import WarningModalContainer from 'containers/WarningModalContainer';
import Read180Container from 'containers/Read180Container/Loadable';
import InboxModalContainer from 'containers/InboxModalContainer/Loadable';
import EditAssignmentContainer from 'containers/EditAssignmentContainer/Loadable';
import StudentWorkProgramsContainer from 'containers/StudentWorkProgramsContainer/Loadable';
import System44StudentGoalContainer from 'containers/System44StudentGoalContainer/Loadable';

import XSkillsTestAssignmentSaveSuccessModalContainer from 'containers/XSkillsTestAssignmentSaveSuccessModalContainer/Loadable';
import Read180RespondWriteContainer from 'containers/Read180RespondWriteContainer/Loadable';
import System44SuccessRecordContainer from 'containers/System44SuccessRecordContainer/Loadable';

import * as Constants from './constants';

/**
 * All modal mappings should be defined here.  To add a new modal:
 *
 * (1) Create a new component for it (typically a container component).
 * (2) Define a new constant for it in the ./constants file, and map it to the component below.
 *     add new constants in Alphabetical order by constant name.
 * (3) Use the "showModal(modalType = '', data = {})" method in the ./actions module
 *     whenever the modal should be opened. (see that method for details)
 * (4) Use the "hideModal()" method in the ./actions module to close the top-most modal.
 *
 */
export const MODAL_ID_MAPPINGS = {
  [Constants.ABOUT_LINK_MODAL]: <AboutSamLinkModalContainer />,
  [Constants.ACCOUNT_DELETE_MODAL]: <AccountDeleteModalContainer />,
  [Constants.ACTIVATE_QUIZ_MODAL]: <ActivateQuizContainer />,
  [Constants.ADD_A_GROUP]: <AddGroupContainer />,
  [Constants.ADD_DEMOGRAPHIC_MODAL]: <AddDemographicModalContainer />,

  [Constants.MIA_REACTIVATE_SCHOOL_MODAL]: <ReactivateSchoolModalContainer />,
  [Constants.MIA_REACTIVATE_CLASS_MODAL]: <ReactivateClassModalContainer />,
  [Constants.CANCEL_CREDENTIALS_MODAL]: <CancelCredentialsModal />,
  [Constants.CLASS_FORM_MODAL]: <AddEditClass />,
  [Constants.CLEAR_ROSTER_MODAL]: <ClearRosterModalContainer />,
  [Constants.CLEAR_ROSTER_SUCCESS_MODAL]: <ClearRosterSuccessModalContainer />,
  [Constants.CATCH_ALL_CLASS_MODAL]: <CatchAllClassContainer />,

  [Constants.DEACTIVATE_CLASS_MODAL]: <DeactivateClassModalContainer />,
  [Constants.DEACTIVATE_CLASS_SUCCESS_MODAL]: <DeactivateSuccessClassModalContainer />,
  [Constants.DEACTIVATE_GROUP_MODAL]: <DeactivateGroupModalContainer />,
  [Constants.DEACTIVATE_GROUP_SUCCESS_MODAL]: <DeactivateSuccessGroupModalContainer />,
  [Constants.DEACTIVATE_QUIZ_MODAL]: <DeactivateQuizContainer />,
  [Constants.DEACTIVATE_SCHOOL_MODAL]: <DeactivateSchoolModalContainer />,
  [Constants.DEACTIVATE_SCHOOL_SUCCESS_MODAL]: <DeactivateSuccessSchoolModalContainer />,
  [Constants.DEACTIVATE_STUDENT_MODAL]: <DeactivateStudentModalContainer />,
  [Constants.DEACTIVATE_STUDENT_SUCCESS_MODAL]: <DeactivateSuccessStudentModalContainer />,
  [Constants.DEACTIVATE_USER_MODAL]: <DeactivateModalContainer />,
  [Constants.DEACTIVATE_USER_SUCCESS_MODAL]: <DeactivateSuccessModalContainer />,
  [Constants.DELETE_INACTIVE_SUCCESS_MODAL]: <DeleteInactiveSuccessModalContainer />,

  [Constants.EDIT_ADMIN_MODAL]: <EditAdminContainer />,
  [Constants.EDIT_ADMIN_MODAL_WARNING]: <EditAdminWarningContainer />,
  [Constants.EDIT_DISTRICT_PROFILE]: <EditDistrictProfileContainer />,
  [Constants.EDIT_QUIZ_COLLECTION_NAMES_MODAL]: <EditQuizCollectionNamesContainer />,

  [Constants.HANDLE_EXPORT_TEACHER_QUIZ_MODAL]: <ExportTeacherMadeQuizzesContainer />,

  [Constants.IREAD_SCREENER_MODAL]: <IreadScreenerModalContainer />,

  [Constants.LOGOUT_MODAL]: <LogoutModalContainer />,

  [Constants.MESSAGE_LOG_MODAL]: <MessageLogModalContainer />,

  [Constants.NO_ITEMS_SELECTED_MODAL]: <NoItemsSelectedModalContainer />,

  [Constants.OK_CANCEL_MODAL]: <OkCancelModalContainer />,

  [Constants.PRINT_BOOK_LABEL_MODAL]: <PrintBookLabelContainer />,
  [Constants.PRINT_CUSTOM_QUIZ_MODAL]: <PrintCustomQuizList />,
  [Constants.PRINT_QUIZ_AND_ANSWER_KEY_MODAL]: <PrintQuizAndAnswerKeyContainer />,
  [Constants.PROGRAM_SETTING_SET_STUDENT_LEVEL_MODAL]: (
    <ProgramSettingSetStudentLevelModalContainer />
  ),

  [Constants.R180NG_SKIP_SEGMENT_MODAL]: <R180NgtopicsSkipSegmentModalContainer />,
  [Constants.R180NG_TOPICS_SKIP_MODAL]: <R180NgTopicManagerSkipModalContainer />,
  [Constants.R180NG_TOPICS_STAGE_MODAL]: <R180NgtopicsStageModalContainer />,
  [Constants.REMOVE_ADMIN_MODAL]: <RemoveAdminModalContainer />,
  [Constants.RSKILLSCC_TEST_ASSIGNMENT_SAVE_SUCCESS_MODAL]: (
    <RSkillsCCTestAssignmentSaveSuccessModalContainer />
  ),
  [Constants.READ_180_NG_ASSAIGNMENT_MODAL]: <Read180NgAssaignmentContainer />,

  [Constants.SCHOOL_FORM_MODAL]: <AddSchoolContainer />,
  [Constants.SEARCH_CLASS_ASSIGN_MODAL]: <ClassAssignModalContainer />,
  [Constants.SEARCH_MODAL]: <SearchModalContainer />,
  [Constants.SEARCH_RESULT_DETAILS_MODAL]: <SearchResultDetailsContainer />,
  [Constants.STUDENT_FORM_MODAL]: <AddEditStudent />,

  [Constants.TEACHER_FORM_MODAL]: <AddEditTeacher />,
  [Constants.TEACHER_MADE_QUIZ_MODAL]: <TeacherMadeQuizContainer />,

  [Constants.WARNING_MODAL]: <WarningModalContainer />,
  [Constants.READ_180_MODAL]: <Read180Container />,
  [Constants.IREAD_ADD_MODAL]: <AddAssignmentContainer />,
  [Constants.PRINT_INBOX_PROGRAM]: <InboxModalContainer />,
  [Constants.IREAD_MODAL]: <EditAssignmentContainer />,
  [Constants.IREAD_STUDENT_WORK_MODAL]: <StudentWorkProgramsContainer />,
  [Constants.SYSTEM_44_STUDENT_GOALS_MODAL]: <System44StudentGoalContainer />,

  [Constants.XSKILLS_TEST_ASSIGNMENT_SAVE_SUCCESS_MODAL]: (
    <XSkillsTestAssignmentSaveSuccessModalContainer />
  ),
  [Constants.SYSTEM_44_SUCCESS_RECORD_MODAL]: <System44SuccessRecordContainer />,
  [Constants.READ_180_RESPOND_WRITE_MODAL]: <Read180RespondWriteContainer />,
};
