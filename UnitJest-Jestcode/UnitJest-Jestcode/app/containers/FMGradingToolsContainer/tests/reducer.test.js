import { fromJS } from 'immutable';
import fmGradingToolsContainerReducer from '../reducer';
import * as Actions from '../actions';

describe('FMGradingToolsContainer reducer', () => {
  let initialState = null;
  let mockFMGradingToolsContainerState = null;

  beforeEach(() => {
    initialState = fromJS({
      studentOperations: [
        {
          Students: '',
          Operation: '',
          FastFacts: '',
          FocusFacts: '',
        },
      ],
    });
    mockFMGradingToolsContainerState = fromJS(initialState);
  });

  it('returns the initial state', () => {
    expect(fmGradingToolsContainerReducer(undefined, {})).toEqual(mockFMGradingToolsContainerState);
  });

  it('should handle studentOperations requests correctly', () => {
    const mockStudentOperations = [
      {
        Students: '',
        Operation: '',
        FastFacts: '',
        FocusFacts: '',
      },
    ];
    const newState = initialState.set('studentOperations', fromJS(mockStudentOperations));
    expect(
      fmGradingToolsContainerReducer(
        undefined,
        Actions.FMStudentOperationRequestSuccess(mockStudentOperations)
      )
    ).toEqual(newState);
  });
});
