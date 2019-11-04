import resourcesSelectorReducer from '../reducer';
import * as Actions from '../actions';

describe('resourcesSelectorReducer', () => {
  it('should handle Resources Program list request success actions', () => {
    const resource = [
      {
        $: {
          community_id: 'DTM2',
          description: 'Do The Math',
        },
      },
      {
        $: {
          community_id: 'FM',
          description: 'Fastt Math',
        },
      },
    ];
    expect(
      resourcesSelectorReducer(undefined, Actions.getAppBasedResourceSuccess(resource))
    ).toMatchSnapshot();
  });

  it('should handle Resources Program list request failure actions', () => {
    expect(
      resourcesSelectorReducer(undefined, Actions.getAppBasedResourceFailure('err'))
    ).toMatchSnapshot();
  });

  it('should handle list of ITS app', () => {
    const its = {
      appID: ['R180_A', 'R180_B'],
    };
    expect(resourcesSelectorReducer(undefined, Actions.getITSAppsSuccess(its))).toMatchSnapshot();
  });

  it('should handle ITS list failure', () => {
    expect(resourcesSelectorReducer(undefined, Actions.getITSAppsFailure('err'))).toMatchSnapshot();
  });

  it('returns the initial state', () => {
    expect(resourcesSelectorReducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle update resources app id selected', () => {
    const app = {
      appId: 'DTM',
    };
    expect(resourcesSelectorReducer(undefined, Actions.updateAppSelected(app))).toMatchSnapshot();
  });

  it('should handle post resources type success', () => {
    const resource = {
      resource_type: 'GEN100',
    };
    expect(
      resourcesSelectorReducer(undefined, Actions.postResourcesBasedOnIdSuccess(resource))
    ).toMatchSnapshot();
  });

  it('should handle post resources type failure', () => {
    expect(
      resourcesSelectorReducer(undefined, Actions.postResourcesBasedOnIdFailure('err'))
    ).toMatchSnapshot();
  });

  it('should update the resources search modal status', () => {
    expect(
      resourcesSelectorReducer(undefined, Actions.updateResourcesSearchModalStatus(true))
    ).toMatchSnapshot();
  });
});
