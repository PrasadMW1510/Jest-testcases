/*
 *
 * S44NGSettingContainer constants
 *
 */

import { fromJS } from 'immutable';

export const S44NG_SETTINGS_URL = '/S44NG/s44ngProductCtrls.cd';

export const S44NG_SETTINGS_CONTAINER = 'app/S44NGSettingContainer/S44NG_SETTINGS_CONTAINER';
export const S44NG_SETTINGS_CONTAINER_SUCCESS =
  'app/S44NGSettingContainer/S44NG_SETTINGS_CONTAINER_SUCCESS';
export const S44NG_SETTINGS_CONTAINER_FAILURE =
  'app/S44NGSettingContainer/S44NG_SETTINGS_CONTAINER_FAILURE';

export const S44NG_SETTINGS_SAVE = 'app/S44NGSettingContainer/S44NG_SETTINGS_SAVE';
export const S44NG_SETTINGS_SAVE_SUCCESS = 'app/S44NGSettingContainer/S44NG_SETTINGS_SAVE_SUCCESS';
export const S44NG_SETTINGS_SAVE_FAILURE = 'app/S44NGSettingContainer/S44NG_SETTINGS_SAVE_FAILURE';

export const S44NG_DEFAULT_SETTINGS = {
  generic: fromJS({
    captioning: ['0'],
    spanish_support: ['0'],
    writing_enabled: ['1'],
  }),
  student: fromJS({
    auto_placement: ['1'],
    captioning: ['0'],
    enable_fasttrack: ['1'],
    initial_placement: ['0'],
    spanish_support: ['0'],
    writing_enabled: ['1'],
  }),
};
