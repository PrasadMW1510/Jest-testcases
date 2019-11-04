import API, { getBaseUrlWithoutSlms } from 'utils/request';

export const getSearchResultDetails = (sessionId, bookObj) =>
  API.post(`${getBaseUrlWithoutSlms()}/src/SrcBookExpert`, bookObj, {
    params: {
      command: 'get_book_info',
      sid: sessionId,
    },
  }).then(response => response);

export const getSearchResultQuizDetails = (sessionId, bookObj) =>
  API.post(`${getBaseUrlWithoutSlms()}/src/SrcQuizManager`, bookObj, {
    params: {
      command: 'get_quiz_with_questions',
      sid: sessionId,
    },
  }).then(response => response);

export const saveSearchResultDetails = (sessionId, bookObj) =>
  API.post(`${getBaseUrlWithoutSlms()}/src/SrcBookExpert`, bookObj, {
    params: {
      command: 'set_book_info',
      sid: sessionId,
    },
  }).then(response => response);

export const saveTeacherMadeQuiz = (sessionId, teacherMadeQuizObj) =>
  API.post(`${getBaseUrlWithoutSlms()}/src/SrcQuizManager`, teacherMadeQuizObj, {
    params: {
      command: 'set_quiz',
      sid: sessionId,
    },
  }).then(response => response);
