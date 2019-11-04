import { fromJS } from 'immutable';
import * as Selectors from '../selectors';

describe('selectResourcesProgram', () => {
  it('should consistently return the Resource Program', () => {
    const resourcesPage = fromJS({
      output: { name: 'test' },
    });
    const mockedState = fromJS({
      resourcesPage,
    });

    expect(Selectors.makeSelectResourcesPage()(mockedState)).toEqual(resourcesPage.get('output'));
  });

  it('should return build number form the api', () => {
    const resourcesPage = fromJS({
      buildInfo: {
        build_info: {
          build_number: ['2.2.2'],
        },
      },
    });
    const mockesState = fromJS({
      resourcesPage,
    });

    expect(Selectors.makeSelectSAMBuildVersion()(mockesState)).toEqual(
      resourcesPage.getIn(['buildInfo', 'build_info', 'build_number', 0])
    );
  });

  it('should consistently return modal quick status', () => {
    const resourcesPage = fromJS({
      modalQuickStatus: { name: 'test' },
    });
    const mockedState = fromJS({
      resourcesPage,
    });

    expect(Selectors.makeSelectResourceQuickModalStatus()(mockedState)).toEqual(
      resourcesPage.get('modalQuickStatus')
    );
  });

  it('should consistently return the quick search', () => {
    const resourcesPage = fromJS({
      quickSearch: { name: 'test' },
    });
    const mockedState = fromJS({
      resourcesPage,
    });

    expect(Selectors.makeSelectQuickSearch()(mockedState)).toEqual(
      resourcesPage.get('quickSearch')
    );
  });
});
