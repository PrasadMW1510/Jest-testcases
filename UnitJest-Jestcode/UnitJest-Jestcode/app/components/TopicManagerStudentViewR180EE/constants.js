import { fromJS } from 'immutable';

export const STUDENT_CHOICE_TOPIC = 'Student Choice';
export const NO_STUDENT_LEVEL_MESSAGE =
  'This student must have a level assigned to them before you can use the Topic Manager.';

export const INITIAL_STATE = fromJS({
  currentSegment: null,
  currentSegmentId: null,
  currentTopic: null,
  currentTopicId: null,
  dataToSave: [],
  noStudentLevel: true,
  skipLevel: false,
  skipTopic: false,
  skippedTopicId: null,
});
