import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';

import { USER_TYPE, USER_ORG } from 'containers/App/constants';
import { SearchModalContainer } from '../index';

describe('<SearchModalContainer />', () => {
  let wrapper = null;
  let mockSearchModalContainer = null;
  let mockHideModal = null;
  let mockSearchResultRequest = null;
  let mockSearchMetaDataRequest = null;
  let mockResetSearchMetaData = null;
  let mockedLoginDataState = null;
  let mockResetForSearchByChange = null;
  let mockOpenClassAssignModal;
  const mockShowWarningModal = jest.fn();
  const mockShowSeachClassAssignModal = jest.fn();
  const mockShowAccountDeleteModal = jest.fn();
  const mockEvent = { preventDefault: jest.fn() };

  beforeEach(() => {
    mockSearchModalContainer = fromJS({
      error: false,
      loading: true,
      metaDataInitialized: false,
      searchMeta: {
        apps: [],
        classes: [],
        grades: [],
        permissions: [],
        schools: [],
        teachers: [],
      },
    });

    mockHideModal = jest.fn();
    mockSearchMetaDataRequest = jest.fn();
    mockResetSearchMetaData = jest.fn();
    mockSearchResultRequest = jest.fn();
    mockResetForSearchByChange = jest.fn();
    mockedLoginDataState = fromJS({ user_type: ['Teacher'] });
    mockOpenClassAssignModal = jest.fn();
    wrapper = shallow(
      <SearchModalContainer
        hideModal={mockHideModal}
        getSearchMetaDataRequest={mockSearchMetaDataRequest}
        searchModalContainer={mockSearchModalContainer}
        resetSearchMetaData={mockResetSearchMetaData}
        openClassAssignModal={mockOpenClassAssignModal}
        getSearchResultsRequest={mockSearchResultRequest}
        loginData={mockedLoginDataState}
        profileUserType={USER_TYPE.Teacher}
        resetForSearchByChange={mockResetForSearchByChange}
        loginUserOrg={USER_ORG.School}
        showWarningModal={mockShowWarningModal}
        showSearchClassAssignModal={mockShowSeachClassAssignModal}
        showAccountDeleteModal={mockShowAccountDeleteModal}
      />
    );
  });

  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should have a SearchModal', () => {
    const modal = wrapper.find('SearchModal');
    expect(modal).toBeDefined();
  });

  describe('SearchModal meta Data has been initialized', () => {
    beforeEach(() => {
      mockSearchModalContainer = fromJS({
        error: false,
        loading: true,
        metaDataInitialized: true,
        searchMeta: {
          apps: [],
          classes: [],
          grades: [],
          permissions: [],
          schools: [],
          teachers: [],
        },
        searchResults: {
          students: [],
        },
      });
      wrapper = shallow(
        <SearchModalContainer
          hideModal={mockHideModal}
          getSearchMetaDataRequest={mockSearchMetaDataRequest}
          searchModalContainer={mockSearchModalContainer}
          openClassAssignModal={mockOpenClassAssignModal}
          resetSearchMetaData={mockResetSearchMetaData}
          getSearchResultsRequest={mockSearchResultRequest}
          loginData={mockedLoginDataState}
          profileUserType={USER_TYPE.Teacher}
          resetForSearchByChange={mockResetForSearchByChange}
          loginUserOrg={USER_ORG.District}
          showWarningModal={mockShowWarningModal}
          showSearchClassAssignModal={mockShowSeachClassAssignModal}
          showAccountDeleteModal={mockShowAccountDeleteModal}
        />
      );
    });

    it('should close the searchModal when user clicks Close', () => {
      const modal = wrapper.find('SearchModal');
      modal.prop('onClose')(mockEvent);
      expect(mockHideModal).toHaveBeenCalled();
    });

    it('should handle the search request', () => {
      const modal = wrapper.find('SearchModal');
      modal.prop('onSearch')(mockEvent);
      expect(mockSearchResultRequest).toHaveBeenCalled();
    });

    it('should handle the resetForSearchByChange request', () => {
      const modal = wrapper.find('SearchModal');
      modal.prop('onResetForSearchByChange')(mockEvent);
      expect(mockResetForSearchByChange).toHaveBeenCalled();
    });
  });
});
