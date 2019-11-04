import { fromJS } from 'immutable';
import makeSelectClearRosterModalContainer from '../selectors';

describe('selectClearRosterModalContainer', () => {
  it('should select the class assign modal container domain', () => {
    const clearRosterModalContainer = fromJS({
      clearRosterModalContainer: { class: 'test' },
    });
    const mockedState = fromJS({
      clearRosterModalContainer,
    });

    expect(makeSelectClearRosterModalContainer()(mockedState)).toMatchSnapshot();
  });
});
