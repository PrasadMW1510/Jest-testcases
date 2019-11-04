import moment from 'moment';

const REFERENCE = moment();
const A_WEEK_OLD = REFERENCE.clone()
  .subtract(7, 'days')
  .startOf('day');
function isWithinAWeek(momentDate) {
  return momentDate.isAfter(A_WEEK_OLD);
}
export const checkWeekData = item =>
  isWithinAWeek(moment(moment(`${item.date}`).format('YYYY-MM-DD')));
export const getNewThisWeek = (gridData, selectedKind) => {
  let newthisweekData = [];
  if (gridData.length > 0) {
    newthisweekData = gridData.filter(item => {
      if (item.kind === selectedKind && item.graded === 'false' && checkWeekData(item)) {
        return item;
      }
      return false;
    });
    return newthisweekData;
  }
  return newthisweekData;
};
export const getUnreadData = (gridData, selectedKind) => {
  let unreadData = [];
  if (gridData.length > 0) {
    unreadData = gridData.filter(item => {
      if (item.kind === selectedKind && item.graded === 'false' && item.read === 'false') {
        return item;
      }
      return false;
    });
    return unreadData;
  }
  return unreadData;
};
export const getInboxDataByCommunityId = (gridData, selectedKind, communityId) => {
  let softwareData = [];
  if (gridData.length > 0) {
    softwareData = gridData.filter(item => {
      if (
        item.kind === selectedKind &&
        item.graded === 'false' &&
        communityId.indexOf(item.community_id) !== -1
      ) {
        return item;
      }
      return false;
    });
    return softwareData;
  }
  return softwareData;
};
export const getInboxDataByCommunityName = (gridData, selectedKind, communityName) => {
  let classAssignment = [];
  if (gridData.length > 0) {
    classAssignment = gridData.filter(item => {
      if (
        item.kind === selectedKind &&
        item.graded === 'false' &&
        communityName.indexOf(item.className) !== -1
      ) {
        return item;
      }
      return false;
    });
    return classAssignment;
  }
  return classAssignment;
};
