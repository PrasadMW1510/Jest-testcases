import axios from 'axios';
import API, { xmlToJSON, getBaseUrlWithoutSlms } from 'utils/request';

export const getInstalledQuizData = sessionId =>
  axios
    .get(`${getBaseUrlWithoutSlms()}/src/SrcQuizManager`, {
      params: {
        command: 'get_teacher_made_quizzes',
        sid: sessionId,
      },
    })
    .then(response => xmlToJSON(response.data));

export const postTeacherMadeQuizRequest = (sessionId, messageObject) =>
  API.post(`${getBaseUrlWithoutSlms()}/src/SrcQuizManager`, messageObject.quizObject, {
    params: {
      command: 'set_quiz',
      sid: sessionId,
    },
  }).then(response => response);

export const getQuizDetailData = (sessionId, quizObj) =>
  API.post(`${getBaseUrlWithoutSlms()}/src/SrcQuizManager`, quizObj, {
    params: {
      command: 'get_quiz_with_questions',
      sid: sessionId,
    },
  }).then(response => response);

export const deleteQuizDetailData = (sessionId, quizObjnew) =>
  API.post(`${getBaseUrlWithoutSlms()}/src/SrcQuizManager`, quizObjnew, {
    params: {
      command: 'delete_teacher_made_quiz',
      sid: sessionId,
    },
  }).then(response => response);
