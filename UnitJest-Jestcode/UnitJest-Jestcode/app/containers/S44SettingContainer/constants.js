/*
 *
 * S44SettingContainer constants
 *
 */

import { fromJS } from 'immutable';

export const S44_SETTINGS_URL = '/S44/s44ProductCtrls.cd';

export const S44_SETTINGS_CONTAINER = 'app/S44NGSettingContainer/S44_SETTINGS_CONTAINER';
export const S44_SETTINGS_CONTAINER_SUCCESS =
  'app/S44NGSettingContainer/S44_SETTINGS_CONTAINER_SUCCESS';
export const S44_SETTINGS_CONTAINER_FAILURE =
  'app/S44NGSettingContainer/S44_SETTINGS_CONTAINER_FAILURE';

export const S44_SETTINGS_SAVE = 'app/S44NGSettingContainer/S44_SETTINGS_SAVE';
export const S44_SETTINGS_SAVE_SUCCESS = 'app/S44NGSettingContainer/S44_SETTINGS_SAVE_SUCCESS';
export const S44_SETTINGS_SAVE_FAILURE = 'app/S44NGSettingContainer/S44_SETTINGS_SAVE_FAILURE';

export const S44_DEFAULT_SETTINGS = {
  generic: fromJS({
    captioning: ['0'],
    spanish_support: ['0'],
  }),
  student: fromJS({
    auto_placement: ['1'],
    captioning: ['0'],
    spanish_support: ['0'],
    enable_fasttrack: ['1'],
    initial_placement: ['0'],
  }),
};
