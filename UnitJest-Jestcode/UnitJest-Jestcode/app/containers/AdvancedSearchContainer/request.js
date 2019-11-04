import { getBaseUrl, xmlToJSON, getBaseUrlWithoutSlms } from 'utils/request';
import axios from 'axios';

export const getAwardsData = epochTime =>
  axios
    .get(`${getBaseUrl()}/extensions/book_expert/Award.xml`, {
      params: {
        cb: epochTime,
      },
    })
    .then(response => xmlToJSON(response.data));

export const getComskillData = epochTime =>
  axios
    .get(`${getBaseUrl()}/extensions/book_expert/ComprehensionSkill.xml`, {
      params: {
        cb: epochTime,
      },
    })
    .then(response => xmlToJSON(response.data));

export const getCultureData = epochTime =>
  axios
    .get(`${getBaseUrl()}/extensions/book_expert/Culture.xml`, {
      params: {
        cb: epochTime,
      },
    })
    .then(response => xmlToJSON(response.data));

export const getGenreData = epochTime =>
  axios
    .get(`${getBaseUrl()}/extensions/book_expert/Genre.xml`, {
      params: {
        cb: epochTime,
      },
    })
    .then(response => xmlToJSON(response.data));

export const getInterestLevelData = epochTime =>
  axios
    .get(`${getBaseUrl()}/extensions/book_expert/InterestLevel.xml`, {
      params: {
        cb: epochTime,
      },
    })
    .then(response => xmlToJSON(response.data));

export const getProgramSeriesData = epochTime =>
  axios
    .get(`${getBaseUrl()}/extensions/book_expert/Program_Series.xml`, {
      params: {
        cb: epochTime,
      },
    })
    .then(response => xmlToJSON(response.data));

export const getTopicsData = epochTime =>
  axios
    .get(`${getBaseUrl()}/extensions/book_expert/Topics.xml`, {
      params: {
        cb: epochTime,
      },
    })
    .then(response => xmlToJSON(response.data));

export const getThemesData = epochTime =>
  axios
    .get(`${getBaseUrl()}/extensions/book_expert/Themes.xml`, {
      params: {
        cb: epochTime,
      },
    })
    .then(response => xmlToJSON(response.data));

export const getInstalledQuizCountData = sessionId =>
  axios
    .get(`${getBaseUrlWithoutSlms()}/src/SrcQuizManager`, {
      params: {
        command: 'get_installed_quiz_count',
        sid: sessionId,
      },
    })
    .then(response => xmlToJSON(response.data));
