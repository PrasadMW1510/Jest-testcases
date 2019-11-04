/**
 * Manage Inactive Accounts API requests
 */

import API from 'utils/request';

/**
 * Gets a page of inactive members of a given cohort.
 *
 * NOTE: As an old workaround for SAM, when a currentlyLoggedInUserId
 * for a school administrator or teacher is passed, ALL OF THE STUDENTS
 * IN THE DISTRICT are returned from this API call:  This is intentional and
 * allows these users to see students from other schools in the
 * district.
 *
 * @param sessionId
 * @param districtId
 */
export const getInactiveCohortMembers = (
  sessionId,
  currentlyLoggedInUserId,
  { cohortType, currentPage = 0, itemsPerPage = 250, shouldSortAscending = true, sortColumn }
) =>
  API.get('/SlmsDeactivation', {
    params: {
      cohort_type: cohortType.toLowerCase(),
      command: 'get_profile',
      cur_pg: currentPage,
      ipp: itemsPerPage,
      paginate: true,
      sid: sessionId,
      sort_ascending: shouldSortAscending,
      sort_column: sortColumn,
      user_id: currentlyLoggedInUserId,
    },
  }).then(response => response);
