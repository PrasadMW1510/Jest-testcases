import * as Actions from '../actions';

describe('initializeResources', () => {
  it('should return the correct constant for initializing the resources', () => {
    expect(Actions.getAppBasedResource()).toMatchSnapshot();
  });

  it('should return the correct constant for initializing the resources request', () => {
    expect(Actions.getAppBasedResourceSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for initializing the resources failure', () => {
    const err = 'invalid user';
    expect(Actions.getAppBasedResourceFailure(err)).toMatchSnapshot();
  });

  it('should return the correct constant for get Its', () => {
    expect(Actions.getITSApps()).toMatchSnapshot();
  });

  it('should return the correct constant for get Its request', () => {
    expect(Actions.getITSAppsSuccess()).toMatchSnapshot();
  });

  it('should return the correct constant for get Its failure', () => {
    const err = 'invalid user';
    expect(Actions.getITSAppsFailure(err)).toMatchSnapshot();
  });

  it('should return the updateAppSelected to redux', () => {
    const app = 'DTM';
    expect(Actions.updateAppSelected(app)).toMatchSnapshot();
  });

  it('should return the correct constant for get Its request', () => {
    const resource = { appId: '' };
    expect(Actions.postResourcesBasedOnId(resource)).toMatchSnapshot();
  });

  it('should return the correct constant for get Its request', () => {
    const resource = { appId: '' };
    expect(Actions.postResourcesBasedOnIdSuccess(resource)).toMatchSnapshot();
  });

  it('should return the correct constant for get Its request', () => {
    const errResourcesBased = 'error';
    expect(Actions.postResourcesBasedOnIdFailure(errResourcesBased)).toMatchSnapshot();
  });

  it('should return update resources search modal status ', () => {
    const status = true;
    expect(Actions.updateResourcesSearchModalStatus(status)).toMatchSnapshot();
  });
});
