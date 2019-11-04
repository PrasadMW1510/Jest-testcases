import { fromJS, List } from 'immutable';
import * as Selectors from '../selectors';

describe('selectProfilePageData', () => {
  it('should consistently return the global app schools data state', () => {
    const profilePage = fromJS({
      profilePage: { name: 'test' },
    });
    const mockedState = fromJS({
      profilePage,
    });
    expect(Selectors.makeSelectProfilePageData()(mockedState)).toEqual(profilePage);
  });

  it('should consistently return the profile page details', () => {
    const profilePage = fromJS([
      {
        profileDetails: [{ name: 'test' }],
      },
    ]);
    const mockedState = fromJS({
      profilePage,
    });
    expect(Selectors.makeSelectProfilePageDetails()(mockedState)).toEqual(
      profilePage.getIn(['profileDetails'])
    );
  });

  it('should consistently return the profile page details with classes', () => {
    const profilePage = fromJS([
      {
        profileDetails: [
          {
            classes: [{ name: 'test' }],
          },
        ],
      },
    ]);
    const mockedState = fromJS({
      profilePage,
    });
    expect(Selectors.makeSelectProfilePageClassesData()(mockedState)).toEqual(
      profilePage.getIn(['profileDetails', 'classes'])
    );
  });

  it('should consistently return the profile page details with permission', () => {
    const profilePage = fromJS([
      {
        profileDetails: [
          {
            permissions: [{ name: 'dont allow' }],
          },
        ],
      },
    ]);
    const mockedState = fromJS({
      profilePage,
    });
    expect(Selectors.makeSelectProfilePagePermissionsData()(mockedState)).toEqual(
      profilePage.getIn(['profileDetails', 'permissions'])
    );
  });

  it('should return the profile page details as undefined when its undefined', () => {
    const profilePage = undefined;
    const mockedState = fromJS({
      profilePage,
    });
    expect(Selectors.makeSelectProfilePageDetails()(mockedState)).toEqual(undefined);
    expect(Selectors.makeSelectProfilePageClassesData()(mockedState)).toEqual(undefined);
    expect(Selectors.makeSelectProfilePagePermissionsData()(mockedState)).toEqual(undefined);
  });

  it('should consistently return the profile page classes List', () => {
    const profilePage = fromJS({
      profileDetails: {
        classes: [{ name: 'test' }],
      },
    });
    const mockedState = fromJS({
      profilePage,
    });
    expect(Selectors.makeSelectProfilePageClassesData()(mockedState)).toEqual(
      List(profilePage.getIn(['profileDetails', 'classes']))
    );
  });

  it('should consistently return the profile page details with permission list', () => {
    const profilePage = fromJS({
      profileDetails: {
        permissions: [{ name: 'dont allow' }],
      },
    });
    const mockedState = fromJS({
      profilePage,
    });
    expect(Selectors.makeSelectProfilePagePermissionsData()(mockedState)).toEqual(
      List(profilePage.getIn(['profileDetails', 'permissions']))
    );
  });
});
