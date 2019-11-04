import { fromJS } from 'immutable';
import * as Selectors from '../selectors';

describe('selectResourcesActivityDomain', () => {
  it('should return the makeSamResourceAppInfo', () => {
    const resourcesActivity = fromJS({
      SamResources: {
        resource: {},
      },
    });
    const mockedState = fromJS({
      resourcesActivity,
    });
    expect(Selectors.makeSamResourceAppInfo()(mockedState)).toEqual(
      resourcesActivity.get('SamResources')
    );
  });

  it('should return the makeITSAppInfo', () => {
    const resourcesActivity = fromJS({
      ITSApps: {
        resource: {},
      },
    });
    const mockedState = fromJS({
      resourcesActivity,
    });
    expect(Selectors.makeITSAppInfo()(mockedState)).toEqual(resourcesActivity.get('ITSApps'));
  });

  it('should return the AppId', () => {
    const resourcesActivity = fromJS({
      AppId: 'DTM',
    });
    const mockedState = fromJS({
      resourcesActivity,
    });
    expect(Selectors.makeSelectAppSelected()(mockedState)).toEqual(resourcesActivity.get('AppId'));
  });

  it('should return resources modal data', () => {
    const resourcesActivity = fromJS({
      resourcesObject: 'DTM',
    });
    const mockedState = fromJS({
      resourcesActivity,
    });
    expect(Selectors.makeSelectResourcesModal()(mockedState)).toEqual(
      resourcesActivity.get('resourcesObject')
    );
  });

  it('should return modal search status', () => {
    const resourcesActivity = fromJS({
      modalSearchStatus: false,
    });
    const mockedState = fromJS({
      resourcesActivity,
    });
    expect(Selectors.makeSelectModalSearchStatus()(mockedState)).toEqual(
      resourcesActivity.get('modalSearchStatus')
    );
  });
});
