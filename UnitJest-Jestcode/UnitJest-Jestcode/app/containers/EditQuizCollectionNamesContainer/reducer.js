/*
 *
 * EditQuizCollectionNamesContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  error: false,
  editQuizCollectionNamesData: [],
  saveSuccess: false,
  fetchSuccess: false,
});

function editQuizCollectionNamesContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.INITIAL_REQUEST:
      return state.set('saveSuccess', false);
    case Constants.GET_EDITQUIZCOLLECTIONNAMESDATA_REQUEST_SUCCESS:
      return state
        .set(
          'editQuizCollectionNamesData',
          fromJS(
            action.editQuizCollectionNamesData.output.output_data[0].GetQuizCollectionNamesResp[0]
              .Collections[0].Collection
          )
        )
        .set('fetchSuccess', true);
    case Constants.INITIALIZE_CLASS_FORM_RESPONSE_SUCCESS:
      return state.set('saveSuccess', true);
    default:
      return state;
  }
}

export default editQuizCollectionNamesContainerReducer;
