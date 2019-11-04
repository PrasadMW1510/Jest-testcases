import { fromJS } from 'immutable';
import makeSelectLoadingController from '../selectors';

describe('selectLoadingControllerDomain', () => {
  it('should select the loading controller domain', () => {
    const loadingController = fromJS({
      loadingController: { loadingOpen: false },
    });
    const mockState = fromJS({
      loadingController,
    });

    expect(makeSelectLoadingController()(mockState)).toEqual(loadingController);
  });
});
