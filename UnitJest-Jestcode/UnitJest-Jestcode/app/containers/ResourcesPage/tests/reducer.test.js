import resourcesProgramReducer from '../reducer';
import * as Actions from '../actions';

describe('resourcesProgramReducer', () => {
  it('should handle Resources Program list request success actions', () => {
    const programs = [
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
      resourcesProgramReducer(undefined, Actions.getProductListSuccess(programs))
    ).toMatchSnapshot();
  });

  it('should handle Resources Program list request failure actions', () => {
    expect(
      resourcesProgramReducer(undefined, Actions.getProductListFailure('err'))
    ).toMatchSnapshot();
  });

  it('should handle build info success from action', () => {
    const build = {
      buildInfo: {
        build_info: {
          build_number: ['2.2.2'],
        },
      },
    };
    expect(
      resourcesProgramReducer(undefined, Actions.getBuildInfoSuccess(build))
    ).toMatchSnapshot();
  });

  it('should handle build info failure actions', () => {
    expect(
      resourcesProgramReducer(undefined, Actions.getBuildInfoFailure('err'))
    ).toMatchSnapshot();
  });

  it('returns the initial state', () => {
    expect(resourcesProgramReducer(undefined, {})).toMatchSnapshot();
  });

  it('verify update quick modal status', () => {
    expect(
      resourcesProgramReducer(undefined, Actions.updateResourcesQuickModalStatus(true))
    ).toMatchSnapshot();
  });

  it('post quick search post call success', () => {
    const resource = {
      program_id: 'DTM',
    };
    expect(
      resourcesProgramReducer(undefined, Actions.postResourcesQuickSearchSuccess(resource))
    ).toMatchSnapshot();
  });

  it('post quick search post call failure', () => {
    expect(
      resourcesProgramReducer(undefined, Actions.postResourcesQuickSearchFailure('errResources'))
    ).toMatchSnapshot();
  });
});
