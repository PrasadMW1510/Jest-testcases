import { fromJS } from 'immutable';
import makeSelectClassAssignModalContainer from '../selectors';

describe('selectClassAssignModalContainer', () => {
  it('should select the class assign modal container domain', () => {
    const classAssignModal = fromJS({
      classAssignModal: { class: 'test' },
    });
    const mockedState = fromJS({
      classAssignModal,
    });

    expect(makeSelectClassAssignModalContainer()(mockedState)).toMatchSnapshot();
  });
});
