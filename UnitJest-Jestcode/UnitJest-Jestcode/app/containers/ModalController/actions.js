/*
 *
 * ModalController actions
 *
 */

import * as Constants from './constants';

/**
 * Opens a modal window, which prevents the user from interacting with any other part of the page,
 * until the modal is closed.
 *
 * @param modalType The type of the modal, defined and mapped in the ./constants module.
 * @param data Any dynamic data needed by the modal
 * @returns {{type, modalType: string, data: {}}}
 */
export function showModal(modalType = '', data = {}) {
  return {
    type: Constants.SHOW_MODAL,
    modalType,
    data,
  };
}

/**
 * Hides a modal
 *
 * NOTE:  The parameters passed here are not used internally to identify
 * the modal to close.  Rather, they are specifically informational
 * to the reducers that want to determine which modal just closed.  As an
 * example, some components might wish to focus a specific input field
 * when a warning-type modal closes.  Its reducer could hook into this
 * action and use the parameters accordingly.
 *
 * @param modalType
 * @param data
 * @returns {{type, modalType: string, data: {}}}
 */
export function hideModal(modalType = '', data = {}) {
  return {
    type: Constants.HIDE_MODAL,
    modalType,
    data,
  };
}

/*
  Show a About Link Modal
 */
export function showAboutLinkModal(data = {}) {
  return showModal(Constants.ABOUT_LINK_MODAL, data);
}

/*
  Show a Class Form Modal
 */
export function showClassFormModal(data = {}) {
  return showModal(Constants.CLASS_FORM_MODAL, data);
}

/*
  Show a Student Form Modal
 */
export function showStudentFormModal(data = {}) {
  return showModal(Constants.STUDENT_FORM_MODAL, data);
}

/*
  Show a Deactivate Modal
 */
export function showDeactivateUserModal(data = {}) {
  return showModal(Constants.DEACTIVATE_USER_MODAL, data);
}

/*
  Show a Deactivate success Modal
 */
export function showDeactivateUserSuccessModal(data = {}) {
  return showModal(Constants.DEACTIVATE_USER_SUCCESS_MODAL, data);
}

/*
  Show a Deactivate Group Modal
 */
export function showDeactivateGroupModal(data = {}) {
  return showModal(Constants.DEACTIVATE_GROUP_MODAL, data);
}

/*
  Show a Deactivate Group success Modal
 */
export function showDeactivateGroupSuccessModal(data = {}) {
  return showModal(Constants.DEACTIVATE_GROUP_SUCCESS_MODAL, data);
}

/*
  Show the Edit Admin Modal Warning
 */
export function showEditAdminModalWarning(data = {}) {
  return showModal(Constants.EDIT_ADMIN_MODAL_WARNING, data);
}

/*
  Show a logout Modal
 */
export function showLogoutModal() {
  return showModal(Constants.LOGOUT_MODAL);
}

/*
  Show a message log modal
 */
export function showMessageLogModal(data = {}) {
  return showModal(Constants.MESSAGE_LOG_MODAL, data);
}

/*
  Show a Program Setting SetStudent Level Modal
 */
export function showProgramSettingSetStudentLevelModal(data = {}) {
  return showModal(Constants.PROGRAM_SETTING_SET_STUDENT_LEVEL_MODAL, data);
}

/*
Show r180ng topics stage selection modal
 */
export function showR180NGTopicsStageModal(data = {}) {
  return showModal(Constants.R180NG_TOPICS_STAGE_MODAL, data);
}

/*
Show r180ng topics skip topic modal
 */
export function showR180NGTopicsSkipModal(data = {}) {
  return showModal(Constants.R180NG_TOPICS_SKIP_MODAL, data);
}

/*
Show r180ng topics skip Segment  modal
 */
export function showR180NGSkipSegmentModal(data = {}) {
  return showModal(Constants.R180NG_SKIP_SEGMENT_MODAL, data);
}

/*
  Show the School Form Modal
 */
export function showSchoolFormModal() {
  return showModal(Constants.SCHOOL_FORM_MODAL);
}

/*
 Show a search Modal.
 */
export function showSearchModal() {
  return showModal(Constants.SEARCH_MODAL);
}

/*
  Show the teacher form modal
 */
export function showTeacherFormModal(data = {}) {
  return showModal(Constants.TEACHER_FORM_MODAL, data);
}

/*
  Show a warning modal
 */
export function showWarningModal(data = {}) {
  return showModal(Constants.WARNING_MODAL, data);
}

/*
  Show a search class assign modal
 */
export function showSearchClassAssignModal(data = {}) {
  return showModal(Constants.SEARCH_CLASS_ASSIGN_MODAL, data);
}

/*
 Show reactivate school moda (MIA)
 */
export function showReactivateSchoolModal(data = {}) {
  return showModal(Constants.MIA_REACTIVATE_SCHOOL_MODAL, data);
}

/*
 Show reactivate school moda (MIA)
 */
export function showReactivateClassModal(data = {}) {
  return showModal(Constants.MIA_REACTIVATE_CLASS_MODAL, data);
}

/*
  Show an account delete modal
 */
export function showAccountDeleteModal(data = {}) {
  return showModal(Constants.ACCOUNT_DELETE_MODAL, data);
}
/*
 * Show the Edit Quiz Collection Names Modal
 */
export function showEditQuizCollectionNames() {
  return showModal(Constants.EDIT_QUIZ_COLLECTION_NAMES_MODAL);
}
export function showPrintQuizModal(data = {}) {
  return showModal(Constants.PRINT_CUSTOM_QUIZ_MODAL, data);
}
export function showPrintBookLabelModal(data = {}) {
  return showModal(Constants.PRINT_BOOK_LABEL_MODAL, data);
}
export function showPrintQuizAndAnswerKeyModal(data = {}) {
  return showModal(Constants.PRINT_QUIZ_AND_ANSWER_KEY_MODAL, data);
}

/*
 * Show the Activate Quiz Modal
*/

export function activateQuizModal() {
  return showModal(Constants.ACTIVATE_QUIZ_MODAL);
}

/*
 * Show the Deactivate Quiz Modal
*/

export function deactivateQuizModal() {
  return showModal(Constants.DEACTIVATE_QUIZ_MODAL);
}

/*
 * Show the Teacher Made Quiz Modal
 */
export function showTeacherMadeQuiz() {
  return showModal(Constants.TEACHER_MADE_QUIZ_MODAL);
}

export function getSearchResultDetailsRequest(rowData, module, checkedIDLength) {
  const data = {
    id: rowData.ID,
    page: module,
    teacherMadeQuiz: rowData.QuizTeacherMade,
    checkedId: checkedIDLength,
  };
  return showModal(Constants.SEARCH_RESULT_DETAILS_MODAL, data);
}

export function handleExportTeacherQuizModal() {
  return showModal(Constants.HANDLE_EXPORT_TEACHER_QUIZ_MODAL);
}

export function showRead180Modal(rowData, rowPage, rowIndex, allRows) {
  const data = {
    row: rowData,
    page: rowPage,
    currentIndex: rowIndex,
    allData: allRows,
  };
  return showModal(Constants.READ_180_MODAL, data);
}

export function showCatchAllClassModal(data) {
  return showModal(Constants.CATCH_ALL_CLASS_MODAL, data);
}

export function showIreadAddModal(data) {
  return showModal(Constants.IREAD_ADD_MODAL, data);
}
export function showRead180NgAssaignmentModal(data) {
  return showModal(Constants.READ_180_NG_ASSAIGNMENT_MODAL, data);
}
export function showInboxProgram(rowData, rowPage, rowIndex, allRows) {
  const data = {
    row: rowData,
    page: rowPage,
    currentIndex: rowIndex,
    allData: allRows,
  };

  return showModal(Constants.PRINT_INBOX_PROGRAM, data);
}

export function showIreadModal(data) {
  return showModal(Constants.IREAD_MODAL, data);
}

export function showIReadStudentWorkModal(data) {
  return showModal(Constants.IREAD_STUDENT_WORK_MODAL, data);
}

export function showSystem44StudentGoalsModal(data) {
  return showModal(Constants.SYSTEM_44_STUDENT_GOALS_MODAL, data);
}

export function showRead180RespondWriteModal(rowData, rowPage, rowIndex, allRows) {
  const data = {
    row: rowData,
    page: rowPage,
    currentIndex: rowIndex,
    allData: allRows,
  };
  return showModal(Constants.READ_180_RESPOND_WRITE_MODAL, data);
}

export function showSystem44SuccessRecordModal(rowData, rowIndex, allRows) {
  const data = {
    rowData,
    rowIndex,
    allData: allRows,
  };
  return showModal(Constants.SYSTEM_44_SUCCESS_RECORD_MODAL, data);
}
