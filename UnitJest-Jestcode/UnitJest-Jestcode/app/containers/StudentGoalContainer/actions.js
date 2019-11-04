/*
 *
 * StudentGoalContainer actions
 *
 */

import * as Constants from './constants';

export function getSGClassesDataRequest() {
  return {
    type: Constants.GET_PORTFOLIO_SG_CLASSES,
  };
}

export function setSGClassRequestSuccess(data) {
  const updTeacherObj = [];
  if (data && data.length > 0) {
    data.map(item => {
      const newItem = item;
      newItem.type = 'PfStudentGoal';
      if (item.community_id.indexOf('S44NG') !== -1) {
        updTeacherObj.push(item);
      }
      return item;
    });
  }
  //  data = updTeacherObj;
  return {
    type: Constants.SET_PORTFOLIO_SG_CLASSES,
    updTeacherObj,
  };
}

export function getClassStudentGoalRequest(classid) {
  return {
    type: Constants.GET_PORTFOLIO_SG_CLASSES_GOAL_LIST,
    classid,
  };
}

export function setClassSGGridRequestSuccess(data) {
  return {
    type: Constants.SET_PORTFOLIO_SG_CLASSES_GOAL_LIST,
    data,
  };
}
