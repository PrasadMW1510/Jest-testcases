import { fromJS } from 'immutable';
import printQuizAndAnswerKeyContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('printQuizAndAnswerKeyContainerReducer', () => {
  const initialState = fromJS({
    showError: false,
  });
  it('returns the initial state', () => {
    expect(printQuizAndAnswerKeyContainerReducer(undefined, {})).toEqual(fromJS(initialState));
  });
  it('should handle ', () => {
    expect(
      printQuizAndAnswerKeyContainerReducer(undefined, Actions.getPreviewDataFailure())
    ).toMatchSnapshot();
  });
  it('should handle ', () => {
    expect(
      printQuizAndAnswerKeyContainerReducer(undefined, Actions.printQuizAndAnswerKeyRequest())
    ).toMatchSnapshot();
  });
});
