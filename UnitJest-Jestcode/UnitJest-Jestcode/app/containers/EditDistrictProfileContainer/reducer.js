/*
 *
 * EditDistrictProfileContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  customDemographics: [],
  timeZones: [],
});

function editDistrictProfileContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.GET_TIME_ZONES_REQUEST_SUCCESS:
      return state.set('timeZones', fromJS(action.timeZones));
    case Constants.GET_TIME_ZONES_REQUEST_FAILURE:
      return state.set('error', action.error);
    case Constants.UPDATE_CUSTOM_DEMOGRAPHICS:
      return state.set('customDemographics', action.demographics);
    default:
      return state;
  }
}

export default editDistrictProfileContainerReducer;
