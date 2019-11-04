import API, { getBaseUrlWithoutSlms } from '../../utils/request';

export const getSearchResults = (sessionId, searchOpts, itemsPerPage = 250, curPage = 0) =>
  API.post(`${getBaseUrlWithoutSlms()}/src/SrcSearch`, searchOpts, {
    params: {
      sid: sessionId,
      command: 'get_quizzes',
      paginate: true,
      cur_pg: curPage,
      ipp: itemsPerPage,
    },
  }).then(response => response.output_data[0]);
