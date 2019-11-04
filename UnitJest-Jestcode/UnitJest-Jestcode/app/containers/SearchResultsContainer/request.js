import API, { xmlToJSON, getBaseUrlWithoutSlms } from 'utils/request';
import axios from 'axios';

export const getAllTeacherMadeQuizData = (sessionId, searchOpts, itemsPerPage = 250, curPage = 0) =>
  API.post(`${getBaseUrlWithoutSlms()}/src/SrcSearch`, searchOpts, {
    params: {
      sid: sessionId,
      command: 'get_quizzes',
      paginate: true,
      cur_pg: curPage,
      ipp: itemsPerPage,
    },
  }).then(response => response);

export const getCollectionName = sessionId =>
  axios
    .get(`${getBaseUrlWithoutSlms()}/src/SrcQuizManager`, {
      params: {
        command: 'get_quiz_collection_names',
        sid: sessionId,
      },
    })
    .then(response => xmlToJSON(response.data));
