import { fromJS } from 'immutable';
import makeSelectSystem44StudentGoalContainer from '../selectors';

describe('System 44 Student Goal container selector', () => {
  it('should select the system44studentgoal', () => {
    const system44StudentGoalContainer = fromJS({
      system44StudentGoalContainer: { name: 'test' },
    });
    const mockedState = fromJS({
      system44StudentGoalContainer,
    });

    expect(makeSelectSystem44StudentGoalContainer()(mockedState)).toEqual(
      system44StudentGoalContainer.toJS()
    );
  });
});
