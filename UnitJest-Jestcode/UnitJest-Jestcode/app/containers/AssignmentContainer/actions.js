/*
 *
 * AssignmentContainer actions
 *
 */

import * as Constants from './constants';

export function getClassesDataRequest() {
  return {
    type: Constants.GET_PORTFOLIO_ASSIGNMENT_CLASSES,
  };
}

export function setClassRequestSuccess(data, node) {
  const updTeacherObj = [];
  if (data && data.length > 0) {
    data.map(item => {
      const newItem = item;
      newItem.type = 'PfAsignment';
      newItem.data = [];
      newItem.data.push(node);
      updTeacherObj.push(item);
      return item;
    });
  }
  return {
    type: Constants.SET_PORTFOLIO_ASSIGNMENT_CLASSES,
    updTeacherObj,
  };
}

export function setInboxDataByCommunityId(data, id) {
  const newData = [];
  if (data.length > 0) {
    data.map(item => {
      if (id.indexOf(item.community_id) !== -1 && item.graded === 'false') {
        newData.push(item);
      }
      return item;
    });
  }
  return {
    type: Constants.SET_PORTFOLIO_ASSIGNMENT_CLASSES_ASS_LIST,
    newData,
  };
}

export function getClassAssignmentRequest(data, node, communityId) {
  const newGrid = [];
  if (node.length > 0) {
    node[0].map(item => {
      if (item.classId === data && item.createdForClass === data) {
        newGrid.push(item);
      }
      return item;
    });
  }
  return {
    type: Constants.GET_PORTFOLIO_ASSIGNMENT_CLASSES_ASS_LIST_TEMP,
    newGrid,
    communityId,
    data,
  };
}

export function setClassGridRequestSuccess(data) {
  const newData = data;
  return {
    type: Constants.SET_PORTFOLIO_ASSIGNMENT_CLASSES_ASS_LIST,
    newData,
  };
}
