import * as Actions from '../actions';

describe(' Get Product actions', () => {
  it('should return the correct constant for product list request', () => {
    expect(Actions.getProductList()).toMatchSnapshot();
  });
  it('should return the correct constant for product list request success', () => {
    expect(Actions.getProductListSuccess()).toMatchSnapshot();
  });
  it('should return the correct constant for product list request failure', () => {
    const err = 'invalid user';
    expect(Actions.getProductListFailure(err)).toMatchSnapshot();
  });
  it('should return the correct constant for build info', () => {
    expect(Actions.getBuildInfo()).toMatchSnapshot();
  });
  it('should return the correct constant for build info success', () => {
    expect(Actions.getBuildInfoSuccess()).toMatchSnapshot();
  });
  it('should return the correct constant for build info failure', () => {
    const err = 'invalid user';
    expect(Actions.getBuildInfoFailure(err)).toMatchSnapshot();
  });
  it('should update the status for modal status', () => {
    const status = true;
    expect(Actions.updateResourcesQuickModalStatus(status)).toMatchSnapshot();
  });
  it('should trigger the resources quick search', () => {
    const resource = 'value';
    expect(Actions.postResourcesQuickSearch(resource)).toMatchSnapshot();
  });
  it('should update resources quick search success output', () => {
    const resource = 'success';
    expect(Actions.postResourcesQuickSearchSuccess(resource)).toMatchSnapshot();
  });
  it('should update resources quick search failure', () => {
    const errResources = false;
    expect(Actions.postResourcesQuickSearchFailure(errResources)).toMatchSnapshot();
  });
});
