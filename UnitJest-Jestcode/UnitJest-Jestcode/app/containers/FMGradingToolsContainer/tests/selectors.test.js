import { fromJS } from 'immutable';
import * as Selectors from '../selectors';

describe('FMGradingToolsContainer domain', () => {
  let fmGradingTools = null;
  let mockState = null;

  beforeEach(() => {
    fmGradingTools = fromJS({ studentOperations: [] });
    mockState = fromJS({
      fmGradingTools,
    });
  });

  it('should consistently return the FMGradingTools slice of state', () => {
    expect(Selectors.selectFMGradingTools(mockState)).toMatchSnapshot();
  });

  it('should consistently return the FMGradingTools studentOperations field', () => {
    expect(Selectors.makeSelectFMStudentOperations()(mockState)).toMatchSnapshot();
  });
});
