/*
 *
 * RSkillsCCSettingContainer constants
 *
 */

export const RSKILLSCC_SETTINGS_URL = '/rSkillsNG/RTNGProductCtrls';

export const RSKILLSCC_SETTINGS_GET_COMMAND = 'get_rskills_settings';

export const RSKILLSCC_SETTINGS_SET_COMMAND = 'set_rskills_settings';

export const RSKILLSCC_DEFAULT_SETTINGS_COMMAND = 'get_rskills_restore_defaults';

export const RSKILLSCC_SETTINGS_CONTAINER_LOADING = 'RSKILLSCC_SETTINGS_CONTAINER_LOADING';

export const RSKILLSCC_SETTINGS_TEST_ASSIGNMENT_REQUEST =
  'RSKILLSCC_SETTINGS_TEST_ASSIGNMENT_REQUEST';

export const RSKILLSCC_SETTINGS_TEST_ASSIGNMENT_REQUEST_FAILURE =
  'RSKILLSCC_SETTINGS_TEST_ASSIGNMENT_REQUEST_FAILURE';

export const RSKILLSCC_SETTINGS_TEST_ASSIGNMENT_REQUEST_SUCCESS =
  'RSKILLSCC_SETTINGS_TEST_ASSIGNMENT_REQUEST_SUCCESS';

export const RSKILLSCC_DEFAULT_SETTINGS_REQUEST = 'RSKILLSCC_DEFAULT_SETTINGS_REQUEST';

export const RSKILLSCC_DEFAULT_SETTINGS_REQUEST_FAILURE =
  'RSKILLSCC_DEFAULT_SETTINGS_REQUEST_FAILURE';

export const RSKILLSCC_DEFAULT_SETTINGS_REQUEST_SUCCESS =
  'RSKILLSCC_DEFAULT_SETTINGS_REQUEST_SUCCESS';

export const RSKILLSCC_SETTINGS_SAVE_REQUEST = 'RSKILLSCC_SETTINGS_SAVE_REQUEST';

export const RSKILLSCC_SETTINGS_SAVE_REQUEST_FAILURE = 'RSKILLSCC_SETTINGS_SAVE_REQUEST_FAILURE';

export const RSKILLSCC_SETTINGS_SAVE_REQUEST_SUCCESS = 'RSKILLSCC_SETTINGS_SAVE_REQUEST_SUCCESS';

export const RSKILLS_TEST_ASSIGNMENT_SAVE_REQUEST = 'RSKILLS_TEST_ASSIGNMENT_SAVE_REQUEST';

export const RSKILLS_TEST_ASSIGNMENT_SAVE_REQUEST_FAILURE =
  'RSKILLS_TEST_ASSIGNMENT_SAVE_REQUEST_FAILURE';

export const RSKILLS_TEST_ASSIGNMENT_SAVE_REQUEST_SUCCESS =
  'RSKILLS_TEST_ASSIGNMENT_SAVE_REQUEST_SUCCESS';

export const RSKILLS_SAMPLE_RESPONSE_A = {
  output: {
    command_status: {
      timestamp: '5/21/2018 19:09',
      result_code: '0',
      error_data: { error_code: '0' },
    },
    item_count: '1',
    pagination_data: {
      paginate: 'false',
      page_count: '1',
      current_page: '0',
      items_per_page: '100',
    },
    output_data: {
      result: {
        success: '1',
        users_affected: {
          user: [
            {
              user_id: 'b4hec03d48r442hq13qhrdq5_2efa7f0',
              first_name: 'john',
              last_name: 'cusick',
            },
            {
              user_id: 'rt232egadp97c2qi5ud4io0d_2efa7f0',
              first_name: 'rSkillsCC01',
              last_name: 'SamPort',
            },
          ],
          below_grade_count: '0',
          grade_count: '2',
        },
      },
    },
  },
};
