import { fromJS } from 'immutable';
import { programSetting } from '../selectors';

describe('selectIreadSettingsContainerDomain', () => {
  it('should consistently return the ireadSettingsContainerData state', () => {
    const ireadSettingsContainerData = fromJS({
      ireadSettingsContainerData: 'mockData',
    });
    const mockState = fromJS({
      ireadSettingsContainerData,
    });
    expect(programSetting()(mockState)).toEqual(ireadSettingsContainerData);
  });
});
