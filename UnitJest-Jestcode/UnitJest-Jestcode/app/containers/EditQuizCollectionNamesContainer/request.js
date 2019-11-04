import { xmlToJSON, getBaseUrlWithoutSlms } from 'utils/request';
import axios from 'axios';

export const getEditQuizCollectionNamesData = sessionId =>
  axios
    .get(`${getBaseUrlWithoutSlms()}/src/SrcQuizManager`, {
      params: {
        command: 'get_quiz_collection_names',
        sid: sessionId,
      },
    })
    .then(response => xmlToJSON(response.data));
export const postEditQuizCollectionNamesData = (sessionId, nameObj) =>
  axios
    .post(`${getBaseUrlWithoutSlms()}/src/SrcQuizManager`, nameObj, {
      params: {
        command: 'rename_quiz_collection',
        sid: sessionId,
      },
    })
    .then(response => xmlToJSON(response.data));
