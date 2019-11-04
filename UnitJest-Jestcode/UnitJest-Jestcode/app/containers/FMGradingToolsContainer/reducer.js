import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({
  studentOperations: [
    {
      Students: '',
      Operation: '',
      FastFacts: '',
      FocusFacts: '',
    },
  ],
});

function FMGradingToolsReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.FM_STUDENT_OPERATION_REQUEST_SUCCESS:
      return state.set('studentOperations', fromJS(action.studentOperations));
    default:
      return state;
  }
}

export default FMGradingToolsReducer;
