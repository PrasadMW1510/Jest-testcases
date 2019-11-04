// import { fromJS } from 'immutable';
// import { selectModalControllerDomain } from '../selectors';

import { fromJS } from 'immutable';
import makeSelectModalController from '../selectors';

describe('selectModalControllerDomain', () => {
  it('should select the modal controller', () => {
    const modalController = 'logout';
    const mockedState = fromJS({
      modalController,
    });
    expect(makeSelectModalController()(mockedState)).toEqual(modalController);
  });
});
