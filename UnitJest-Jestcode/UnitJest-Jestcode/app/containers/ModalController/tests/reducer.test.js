import modalControllerReducer from '../reducer';
import * as Actions from '../actions';

describe('modalControllerReducer', () => {
  it('returns the initial state', () => {
    expect(modalControllerReducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle show modal actions', () => {
    expect(
      modalControllerReducer(undefined, Actions.showModal('superModal', { mockData: 'test data' }))
    ).toMatchSnapshot();
  });

  it('should handle logout modal actions', () => {
    expect(modalControllerReducer(undefined, Actions.showLogoutModal())).toMatchSnapshot();
  });

  it('should handle hide modal actions', () => {
    expect(modalControllerReducer(undefined, Actions.hideModal())).toMatchSnapshot();
  });

  it('should handle search modal actions', () => {
    expect(modalControllerReducer(undefined, Actions.showSearchModal())).toMatchSnapshot();
  });

  it('should handle message log modal actions', () => {
    expect(
      modalControllerReducer(
        undefined,
        Actions.showMessageLogModal({ messageData: 'test message data' })
      )
    ).toMatchSnapshot();
  });

  it("shouldn't open a modal multiple times", () => {
    const firstTimeState = modalControllerReducer(undefined, Actions.showModal('superModal'));
    const secondTimeState = modalControllerReducer(firstTimeState, Actions.showModal('superModal'));
    expect(secondTimeState.get('openModals').size).toEqual(1);
  });
});
