/*
 *
 * InboxContainer actions
 *
 */
import * as Constants from './constants';

export function getInboxClassesDataRequest() {
  return {
    type: Constants.GET_INBOX_CLASS_TREELIST,
  };
}

export function setInBoxGridRequestSuccess(newGridData) {
  return {
    type: Constants.SET_INBOX_CLASS_TREELIST,
    newGridData,
  };
}

export function setTempGridData(data) {
  const newData = data;
  return {
    type: Constants.SET_TEMP_GRIDDATA,
    newData,
  };
}

export function setGridData(data) {
  return {
    type: Constants.SET_STUDENT_SUBMISSION_META_DATA,
    data,
  };
}

export function getStudentsSubmissionMetadata(classId) {
  return {
    type: Constants.GET_STUDENT_SUBMISSION_META_DATA,
    classId,
  };
}

export function setStudentRequestSuccess(data) {
  return {
    type: Constants.SET_STUDENT_SUBMISSION_META_DATA,
    data,
  };
}

export function getClassStudentList() {
  return {
    type: Constants.GET_STUDENT_LIST_CLASS,
  };
}

export function setAssignmentClassSuccess(treeData, gridData) {
  return {
    type: Constants.SET_ASSIGNMENT_LIST_AND_TREE,
    treeData,
    gridData,
  };
}

export function setUnreadDataWithTree(newGridData) {
  return {
    type: Constants.SET_TEMP_GRIDDATA_WITH_TREE,
    newGridData,
  };
}

export function setInboxTreeData(newGridData) {
  return {
    type: Constants.SET_TEMP_GRIDDATA,
    newGridData,
  };
}

export function setInboxTreeDataWithTreeList(newGridData) {
  return {
    type: Constants.SET_TEMP_GRIDDATA_WITH_TREE,
    newGridData,
  };
}
