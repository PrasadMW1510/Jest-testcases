import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import {
  SEARCH_STUDENT,
  SEARCH_TEACHER,
  UNINITIALIZED_ITEM_COUNT,
} from 'containers/SearchModalContainer/constants';
import { USER_TYPE, USER_ORG, COHORT_TYPE } from 'containers/App/constants';
import SearchModal from '../index';
import * as Constants from '../constants';

describe('<SearchModal />', () => {
  let wrapper = null;
  let wrapperInstance = null;
  let mockOnClose = jest.fn();
  let mockOnSearch = jest.fn();
  let mockResetForSearchByChange = jest.fn();
  let mockShowWarningModal = jest.fn();
  const mockShowSearchClassAssignModal = jest.fn();
  const mockShowAccountDeleteModal = jest.fn();

  const mockApps = [
    {
      $: {
        enabled: 'true',
        customer_release_number: '1.1',
        client_code_version_required: 'N/A',
        supernumber: '3.0.0.4',
        media_server_version_required: 'N/A',
        name: 'Common Core Code X',
        short_name: 'Common Core Code X',
        community_id: 'CDX',
        version: '3.0.0-4',
        is_deployed: 'true',
        product_media_version_number: '',
        description: 'Common Core Code X',
        client_loader_version_required: 'N/A',
      },
      subproducts: [
        {
          subproduct: [
            {
              $: {
                description: 'Common Core Code X Course I',
                name: 'Common Core Code X Course I',
                subproduct_id: 'CDX_CI',
              },
            },
            {
              $: {
                description: 'Common Core Code X Course II',
                name: 'Common Core Code X Course II',
                subproduct_id: 'CDX_CII',
              },
            },
            {
              $: {
                description: 'Common Core Code X Course III',
                name: 'Common Core Code X Course III',
                subproduct_id: 'CDX_CIII',
              },
            },
          ],
        },
      ],
    },
  ];
  const mockClasses = [
    {
      id: ['uhbmree8fuor7f4s537ftanl_2efa7f0'],
      name: ['12345678901234567890ABCDEFGHIJKLMNOPQRST'],
    },
    {
      id: ['ugjj1ij48rgsd2pgndhdsj0o_2efa7f0'],
      name: ['A Bats1215'],
    },
  ];
  const mockGrades = [];
  const mockTeachers = [
    {
      id: ['n36ocsk9fqdk1vbiuu03hcij_2efa7f0'],
      name: ['Teacher, Able'],
    },
    {
      id: ['491h056l72qq77dj2liilb5e_2efa7f0'],
      name: ['Teacher, Baker'],
    },
  ];
  const mockSchools = [
    { name: ['someSchool'], id: ['abc'] },
    { name: ['Other School'], id: ['def'] },
  ];
  const fakeEvent = { preventDefault: () => {} };

  beforeEach(() => {
    mockOnClose = jest.fn();
    mockOnSearch = jest.fn();
    mockResetForSearchByChange = jest.fn();
    mockShowWarningModal = jest.fn();

    wrapper = shallow(
      <SearchModal
        isOpen
        onClose={mockOnClose}
        onSearch={mockOnSearch}
        apps={mockApps}
        classes={mockClasses}
        grades={mockGrades}
        teachers={mockTeachers}
        schools={mockSchools}
        onResetForSearchByChange={mockResetForSearchByChange}
        showWarningModal={mockShowWarningModal}
        showSearchClassAssignModal={mockShowSearchClassAssignModal}
        showAccountDeleteModal={mockShowAccountDeleteModal}
      />
    );
  });

  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should handle lastName input change', () => {
    const lastNameInput = wrapper.find('#lastName');
    expect(wrapper.state('lastName')).toEqual('');
    lastNameInput.simulate('change', { target: { value: 'cus', name: 'lastName' } });
    expect(wrapper.state('lastName')).toEqual('cus');
  });

  it('Should handle firstName input change', () => {
    const firstNameInput = wrapper.find('#firstName');
    expect(wrapper.state('firstName')).toEqual('');
    firstNameInput.simulate('change', { target: { value: 'John', name: 'firstName' } });
    expect(wrapper.state('firstName')).toEqual('John');
  });

  describe('ResetOptionsButton', () => {
    let resetOptionsButton = null;
    beforeEach(() => {
      resetOptionsButton = wrapper.find('#resetOptionsBtn');
    });
    it('Should reset state on click', () => {
      const firstNameInput = wrapper.find('#firstName');
      expect(wrapper.state('firstName')).toEqual('');
      firstNameInput.simulate('change', { target: { value: 'John', name: 'firstName' } });
      expect(wrapper.state('firstName')).toEqual('John');
      expect(resetOptionsButton).not.toBeNull();
      resetOptionsButton.simulate('click', fakeEvent);
      expect(wrapper.state('firstName')).toEqual('');
    });
  });

  describe('Class Assign Option Select', () => {
    let cohortLabel = '';
    beforeEach(() => {
      wrapper.setState({ hasSearched: true }); // so that footer(DropDown and Go_Btn) are rendered
    });
    it('Should handleClassAssignOptionChange', () => {
      const mockEvent = {
        target: {
          value: 'gg',
        },
      };
      const setStateSpy = jest.fn();
      wrapper.instance().setState = setStateSpy;

      wrapper.instance().handleClassAssignOptionChange(mockEvent);
      expect(setStateSpy).toHaveBeenCalledWith({ classAssignOption: mockEvent.target.value });
    });

    it('Should open the class assign modal when the go button is pressed and a value is selected for AssignToAClass', () => {
      let goButton = wrapper.find('#goButton');
      expect(goButton.exists()).toBeTruthy();
      expect(goButton.props().disabled).toBeTruthy();
      wrapper.setState({ classAssignOption: Constants.ASSIGN_TO_A_CLASS_OPTION });
      goButton.props().onClickHandler();

      goButton = wrapper.find('#goButton');
      expect(goButton.props().disabled).toBeFalsy();
      expect(mockShowSearchClassAssignModal).toHaveBeenCalled();
      expect(shallowToJson(goButton)).toMatchSnapshot();
    });

    it('Should open the account delete modal when the go button is pressed and a value is selected for accountDelete', () => {
      let goButton = wrapper.find('#goButton');
      expect(goButton.props().disabled).toBeTruthy();
      wrapper.setState({ classAssignOption: Constants.ACCOUNT_DELETE_OPTION });
      goButton.props().onClickHandler();

      goButton = wrapper.find('#goButton');
      expect(goButton.props().disabled).toBeFalsy();
      expect(mockShowAccountDeleteModal).toHaveBeenCalled();
      expect(shallowToJson(goButton)).toMatchSnapshot();
    });

    describe('determine cohort type label for class assign student', () => {
      beforeEach(() => {
        wrapper.setState({ searchBy: SEARCH_STUDENT });
      });
      it('should have student label when search was for student', () => {
        cohortLabel = wrapper.instance().cohortTypeForAssignLabel();
        expect(cohortLabel).toEqual(COHORT_TYPE.Student);
      });
    });
    describe('determine cohort type label for class assign teacher', () => {
      beforeEach(() => {
        wrapper.setState({ searchBy: SEARCH_TEACHER });
      });
      it('should have student label when search was for teacher', () => {
        cohortLabel = wrapper.instance().cohortTypeForAssignLabel();
        expect(cohortLabel).toEqual(COHORT_TYPE.Teacher);
      });
    });

    describe('determine cohort type label for class assign is neither student nor teacher', () => {
      beforeEach(() => {
        wrapper.setState({ searchBy: 'fake Cohort' });
      });
      it('should have user label when search was not teacher nor student (edge case)', () => {
        cohortLabel = wrapper.instance().cohortTypeForAssignLabel();
        expect(cohortLabel).toEqual('user');
      });
    });
  });

  describe('SearchButton', () => {
    let searchButton = null;
    beforeEach(() => {
      searchButton = wrapper.find('#searchBtn');
    });
    it('Should handle SearchClick', () => {
      searchButton.simulate('click', fakeEvent);
      expect(mockOnSearch).toHaveBeenCalled();
      expect(searchButton).not.toBeNull();
    });
  });

  describe('SearchRefreshOnClassAssignSave', () => {
    it('Should handle the refresh on class Assign change', () => {
      wrapper.instance().refreshSearchOnClassAssignSave();
      expect(mockOnSearch).toHaveBeenCalled();
    });
  });

  describe('SearchButton with ALL_GRADES, ALL_TEACHERS, ALL_CLASSES, ALL_PRODUCTS options', () => {
    let searchButton = null;
    beforeEach(() => {
      searchButton = wrapper.find('#searchBtn');
      wrapper.setState({
        grade: Constants.ALL_GRADES,
        class: Constants.ALL_CLASSES,
        teacher: Constants.ALL_TEACHERS,
        product: Constants.ALL_PRODUCTS,
        school: Constants.ALL_SCHOOLS,
      });
    });
    it('Should handle SearchClick', () => {
      searchButton.simulate('click', fakeEvent);
      expect(mockOnSearch).toHaveBeenCalled();
      expect(searchButton).not.toBeNull();
    });
  });

  describe('SearchButton with teacher_search option', () => {
    let searchButton = null;
    beforeEach(() => {
      searchButton = wrapper.find('#searchBtn');
      wrapper.setState({ searchBy: SEARCH_TEACHER });
    });
    it('Should handle SearchClick when searching for teacher', () => {
      searchButton.simulate('click', fakeEvent);
      expect(mockOnSearch).toHaveBeenCalled();
      expect(searchButton).not.toBeNull();
    });
  });

  describe('RadioButtons for active and inactive Students', () => {
    let inactiveStudentRadio = null;
    let activeStudentRadio = null;
    beforeEach(() => {
      wrapper = shallow(
        <SearchModal
          isOpen
          onClose={mockOnClose}
          onSearch={mockOnSearch}
          apps={mockApps}
          classes={mockClasses}
          grades={mockGrades}
          teachers={mockTeachers}
          profileUserType={USER_TYPE.Administrator}
          schools={mockSchools}
          onResetForSearchByChange={mockResetForSearchByChange}
          loginUserOrg={USER_ORG.District}
          showWarningModal={mockShowWarningModal}
          showSearchClassAssignModal={mockShowSearchClassAssignModal}
          showAccountDeleteModal={mockShowAccountDeleteModal}
        />
      );
      wrapper.setState({ searchBy: SEARCH_STUDENT });
      inactiveStudentRadio = wrapper.find('#searchModal__student-radio--inactive');
      activeStudentRadio = wrapper.find('#searchModal__student-radio--active');
    });
    it('Should handle the active Student change', () => {
      expect(wrapper.state('activeStudents')).toEqual('true');
      expect(inactiveStudentRadio).not.toBeNull();
      inactiveStudentRadio.simulate('change', {
        target: { value: 'false', name: 'searchModal__student-radio--inactive' },
      });
      expect(wrapper.state('activeStudents')).toEqual('false');
      expect(activeStudentRadio).not.toBeNull();
      activeStudentRadio.simulate('change', {
        target: { value: 'true', name: 'searchModal__student-radio--active' },
      });
      expect(wrapper.state('activeStudents')).toEqual('true');
    });

    it('should NOT call the resetSearchOption when searchBy selection changed to same value of student', () => {
      const searchBySelector = wrapper.find('#searchBy');
      expect(wrapper.state('searchBy')).toEqual(SEARCH_STUDENT);
      searchBySelector.simulate('change', { target: { value: SEARCH_STUDENT, name: 'searchBy' } });
      expect(mockResetForSearchByChange).not.toHaveBeenCalled();
    });
    describe('shouldShowDeleteOption true when student searched', () => {
      const executedSearchOpts = { student_search: { filters: { active: 'false' } } };
      beforeEach(() => {
        wrapper.setState({ executedSearchOpts, hasSearched: true });
      });
      it('should have 3 options in the select drop down when inactive students searched', () => {
        const selOptions = wrapper.find('.search-modal__class-assign-select');
        expect(selOptions.exists()).toBeTruthy();
        expect(selOptions.find('option')).toHaveLength(3);
        let assignOption = wrapper
          .find('.search-modal__class-assign-select')
          .find('option')
          .at(0);
        expect(assignOption.text()).toContain('- Select an Option -');
        assignOption = wrapper
          .find('.search-modal__class-assign-select')
          .find('option')
          .at(1);
        expect(assignOption.text()).toContain('Assign to a Class');
        assignOption = wrapper
          .find('.search-modal__class-assign-select')
          .find('option')
          .at(2);
        expect(assignOption.text()).toContain('Delete');
      });
    });
    describe('shouldShowDeleteOption true when teacher searched', () => {
      const executedSearchOpts = { teacher_search: { filters: { active: 'false' } } };
      beforeEach(() => {
        wrapper.setState({ executedSearchOpts, hasSearched: true });
      });
      it('should have 3 options in the select drop down when inactive teacher searched', () => {
        const selOptions = wrapper.find('.search-modal__class-assign-select');
        expect(selOptions.exists()).toBeTruthy();
        expect(selOptions.find('option')).toHaveLength(3);
        let assignOption = wrapper
          .find('.search-modal__class-assign-select')
          .find('option')
          .at(0);
        expect(assignOption.text()).toContain('- Select an Option -');
        assignOption = wrapper
          .find('.search-modal__class-assign-select')
          .find('option')
          .at(1);
        expect(assignOption.text()).toContain('Assign to a Class');
        assignOption = wrapper
          .find('.search-modal__class-assign-select')
          .find('option')
          .at(2);
        expect(assignOption.text()).toContain('Delete');
      });
    });
    describe('shouldShowDeleteOption false when teacher searched', () => {
      const executedSearchOpts = { teacher_search: { filters: { active: 'true' } } };
      beforeEach(() => {
        wrapper.setState({ executedSearchOpts, hasSearched: true });
      });
      it('should have 2 options in the select drop down when active teacher searched', () => {
        const selOptions = wrapper.find('.search-modal__class-assign-select');
        expect(selOptions.exists()).toBeTruthy();
        expect(selOptions.find('option')).toHaveLength(2);
        let assignOption = wrapper
          .find('.search-modal__class-assign-select')
          .find('option')
          .at(0);
        expect(assignOption.text()).toContain('- Select an Option -');
        assignOption = wrapper
          .find('.search-modal__class-assign-select')
          .find('option')
          .at(1);
        expect(assignOption.text()).toContain('Assign to a Class');
      });
    });
  });

  describe('Reset Search Options', () => {
    beforeEach(() => {
      wrapper = shallow(
        <SearchModal
          isOpen
          onClose={mockOnClose}
          onSearch={mockOnSearch}
          apps={mockApps}
          classes={mockClasses}
          grades={mockGrades}
          teachers={mockTeachers}
          profileUserType={USER_TYPE.Administrator}
          schools={mockSchools}
          onResetForSearchByChange={mockResetForSearchByChange}
          showWarningModal={mockShowWarningModal}
          showSearchClassAssignModal={mockShowSearchClassAssignModal}
          showAccountDeleteModal={mockShowAccountDeleteModal}
        />
      );
      wrapper.setState({ searchBy: SEARCH_STUDENT });
    });

    it('should call the resetSearchOption when changing the searchBy selection', () => {
      const searchBySelector = wrapper.find('#searchBy');
      expect(wrapper.state('searchBy')).toEqual(SEARCH_STUDENT);
      searchBySelector.simulate('change', { target: { value: SEARCH_TEACHER, name: 'searchBy' } });
      expect(mockResetForSearchByChange).toHaveBeenCalled();
    });
  });

  describe('RadioButtons for active and inactive Teachers', () => {
    let inactiveTeacherRadio = null;
    let activeTeacherRadio = null;
    let searchButton = null;
    beforeEach(() => {
      wrapper = shallow(
        <SearchModal
          isOpen
          onClose={mockOnClose}
          onSearch={mockOnSearch}
          apps={mockApps}
          classes={mockClasses}
          grades={mockGrades}
          teachers={mockTeachers}
          profileUserType={USER_TYPE.Administrator}
          schools={mockSchools}
          onResetForSearchByChange={mockResetForSearchByChange}
          loginUserOrg={USER_ORG.District}
          showWarningModal={mockShowWarningModal}
          showSearchClassAssignModal={mockShowSearchClassAssignModal}
          showAccountDeleteModal={mockShowAccountDeleteModal}
        />
      );
      wrapper.setState({
        lastName: 'doe',
        firstName: 'john',
        userName: 'jd',
        school: 'foobar',
        grade: '3',
        product: 'R180NG',
        class: 'ugjj1ij48rgsd2pgndhdsj0o_2efa7f0',
        teacher: 'n36ocsk9fqdk1vbiuu03hcij_2efa7f0',
        studentId: 'qwerty',
        districtUserId: 'uiop',
        searchBy: SEARCH_TEACHER,
      });
      inactiveTeacherRadio = wrapper.find('#searchModal__teacher-radio--inactive');
      activeTeacherRadio = wrapper.find('#searchModal__teacher-radio--active');
      searchButton = wrapper.find('#searchBtn');
    });
    it('Should handle the active Teacher change', () => {
      expect(wrapper.state('activeTeachers')).toEqual('true');
      expect(inactiveTeacherRadio).not.toBeNull();
      inactiveTeacherRadio.simulate('change', {
        target: { value: 'false', name: 'searchModal__teacher-radio--inactive' },
      });
      expect(wrapper.state('activeTeachers')).toEqual('false');
      expect(activeTeacherRadio).not.toBeNull();
      activeTeacherRadio.simulate('change', {
        target: { value: 'true', name: 'searchModal__teacher-radio--active' },
      });
      expect(wrapper.state('activeTeachers')).toEqual('true');
    });

    it('Should handle SearchClick  when searchBy is teacher', () => {
      searchButton.simulate('click', fakeEvent);
      expect(mockOnSearch).toHaveBeenCalled();
      expect(searchButton).not.toBeNull();
    });
  });

  describe('HandlePaginatedSearch has been called', () => {
    const mockSearchResults = {
      itemCount: 1,
      paginationData: {
        page_count: [5],
        current_page: [1],
        items_per_page: [250],
      },
    };
    beforeEach(() => {
      wrapper = shallow(
        <SearchModal
          isOpen
          onClose={mockOnClose}
          onSearch={mockOnSearch}
          apps={mockApps}
          classes={mockClasses}
          grades={mockGrades}
          teachers={mockTeachers}
          profileUserType={USER_TYPE.Administrator}
          schools={mockSchools}
          searchResults={mockSearchResults}
          onResetForSearchByChange={mockResetForSearchByChange}
          showWarningModal={mockShowWarningModal}
          showSearchClassAssignModal={mockShowSearchClassAssignModal}
          showAccountDeleteModal={mockShowAccountDeleteModal}
        />
      );
      wrapper.setState({
        lastName: 'doe',
        firstName: 'john',
        userName: 'jd',
        school: 'abc',
        grade: '3',
        product: 'R180NG',
        class: 'xyz',
        teacher: 'asdfgh',
        studentId: 'qwerty',
        districtUserId: 'uiop',
        searchBy: SEARCH_STUDENT,
      });
      wrapperInstance = wrapper.instance();
    });

    it('Should update the curPage', () => {
      expect(wrapper.state('curPage')).toEqual(0);
      const setStateSpy = jest.fn();
      wrapperInstance.setState = setStateSpy;
      wrapperInstance.handlePaginateSearch(2);
      expect(setStateSpy).toHaveBeenCalledWith(
        { curPage: 2 },
        wrapperInstance.handlePaginatedSearchClick
      );
    });

    it('handlePaginatedSearchClick should call onSearch', () => {
      wrapperInstance.handlePaginatedSearchClick();
      expect(mockOnSearch).toHaveBeenCalled();
    });
  });

  describe('It should render count display CORRECTLY', () => {
    const mockSearchResults = {
      students: [{ user_id: '123' }],
      itemCount: 501,
      paginationData: {
        current_page: ['0'],
        items_per_page: ['250'],
        paginate: ['false'],
      },
    };

    beforeEach(() => {
      wrapper = shallow(
        <SearchModal
          isOpen
          onClose={mockOnClose}
          onSearch={mockOnSearch}
          apps={mockApps}
          classes={mockClasses}
          grades={mockGrades}
          teachers={mockTeachers}
          profileUserType={USER_TYPE.Administrator}
          schools={mockSchools}
          searchResults={mockSearchResults}
          onResetForSearchByChange={mockResetForSearchByChange}
          showWarningModal={mockShowWarningModal}
          showSearchClassAssignModal={mockShowSearchClassAssignModal}
          showAccountDeleteModal={mockShowAccountDeleteModal}
        />
      );
      wrapper.setState({ hasSearched: true });
    });

    it('should have the render count', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('Search Results Table checkbox features', () => {
    beforeEach(() => {
      wrapperInstance = wrapper.instance();
    });
    describe('handleRowCheckboxOnChange', () => {
      it('isChecked is true', () => {
        wrapperInstance.handleRowCheckboxOnChange(true, 999);
        expect(wrapper.state('searchResultsIdsChecked')).toEqual([999]);
      });

      it('isChecked is false', () => {
        wrapper.setState({ searchResultsIdsChecked: [999] });
        wrapperInstance.handleRowCheckboxOnChange(false, 999);
        expect(wrapper.state('searchResultsIdsChecked')).toEqual([]);
      });
    });
    describe('toggleAllCheckboxes', () => {
      it('isChecked is true', () => {
        const checkboxes = [123, 456];

        wrapperInstance.toggleAllCheckboxes(true, [123, 456]);
        expect(wrapper.state('searchResultsIdsChecked')).toEqual(checkboxes);
      });

      it('isChecked is false', () => {
        wrapper.setState({ searchResultsIdsChecked: [123] });
        wrapperInstance.toggleAllCheckboxes(false, []);
        expect(wrapper.state('searchResultsIdsChecked')).toEqual([]);
      });
    });

    describe('update of searchResults', () => {
      const checkboxes = [123];
      const mockSearchResults = {
        itemCount: 2,
        paginationData: {
          page_count: [5],
          current_page: [1],
          items_per_page: [250],
        },
      };
      const mockNewSearchResults = {
        itemCount: 1,
        paginationData: {
          page_count: [5],
          current_page: [1],
          items_per_page: [250],
        },
      };
      beforeEach(() => {
        wrapper.setProps({ searchResults: mockSearchResults });
        wrapper.setState({ searchResultsIdsChecked: [123] });
        wrapper.setState({ classAssignOption: Constants.ASSIGN_TO_A_CLASS_OPTION });
      });

      it('verify new searchresults props tclears checked and dropdown', () => {
        expect(wrapper.state('searchResultsIdsChecked')).toEqual(checkboxes);
        expect(wrapper.state('classAssignOption')).toEqual(Constants.ASSIGN_TO_A_CLASS_OPTION);
        wrapper.setProps({ searchResults: mockNewSearchResults });

        // should now be empty, and have default assign option
        expect(wrapper.state('searchResultsIdsChecked')).toEqual([]);
        expect(wrapper.state('classAssignOption')).toEqual(Constants.CLASS_ASSIGN_DEFAULT_OPTION);
      });
    });
  });

  describe('When search results are uninitialized', () => {
    const mockSearchResults = {
      students: [],
      teachers: [],
      itemCount: UNINITIALIZED_ITEM_COUNT,
      paginationData: {},
    };

    beforeEach(() => {
      wrapper = shallow(
        <SearchModal
          isOpen
          onClose={mockOnClose}
          onSearch={mockOnSearch}
          apps={mockApps}
          classes={mockClasses}
          grades={mockGrades}
          teachers={mockTeachers}
          profileUserType={USER_TYPE.Administrator}
          schools={mockSchools}
          searchResults={mockSearchResults}
          onResetForSearchByChange={mockResetForSearchByChange}
          showWarningModal={mockShowWarningModal}
          showSearchClassAssignModal={mockShowSearchClassAssignModal}
          showAccountDeleteModal={mockShowAccountDeleteModal}
        />
      );
    });

    it('should render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('When search results return empty', () => {
    const mockSearchResults = {
      students: [{}],
      teachers: [],
      itemCount: '0',
      paginationData: {},
    };

    beforeEach(() => {
      wrapper = shallow(
        <SearchModal
          isOpen
          onClose={mockOnClose}
          onSearch={mockOnSearch}
          apps={mockApps}
          classes={mockClasses}
          grades={mockGrades}
          teachers={mockTeachers}
          profileUserType={USER_TYPE.Administrator}
          schools={mockSchools}
          searchResults={mockSearchResults}
          onResetForSearchByChange={mockResetForSearchByChange}
          showWarningModal={mockShowWarningModal}
          showSearchClassAssignModal={mockShowSearchClassAssignModal}
          showAccountDeleteModal={mockShowAccountDeleteModal}
        />
      );
    });

    it('should render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('SearchBy is teacher', () => {
    let searchButton = null;
    beforeEach(() => {
      wrapper = shallow(
        <SearchModal
          isOpen
          onClose={mockOnClose}
          onSearch={mockOnSearch}
          apps={mockApps}
          classes={mockClasses}
          grades={mockGrades}
          teachers={mockTeachers}
          profileUserType={USER_TYPE.Administrator}
          schools={mockSchools}
          onResetForSearchByChange={mockResetForSearchByChange}
          showWarningModal={mockShowWarningModal}
          showSearchClassAssignModal={mockShowSearchClassAssignModal}
          showAccountDeleteModal={mockShowAccountDeleteModal}
        />
      );
      wrapper.setState({ searchBy: Constants.SEARCH_TEACHER });
      searchButton = wrapper.find('#searchBtn');
    });

    it('Should handle SearchClick  when searchBy is teacher', () => {
      searchButton.simulate('click', fakeEvent);
      expect(mockOnSearch).toHaveBeenCalled();
      expect(searchButton).not.toBeNull();
    });
  });
  describe('SearchCriteria warnings', () => {
    it('should call showWarning modal when SearchClick with no criteria for DistrictUser', () => {
      wrapper = shallow(
        <SearchModal
          isOpen
          onClose={mockOnClose}
          onSearch={mockOnSearch}
          apps={mockApps}
          classes={mockClasses}
          grades={mockGrades}
          teachers={mockTeachers}
          profileUserType={USER_TYPE.Administrator}
          schools={mockSchools}
          onResetForSearchByChange={mockResetForSearchByChange}
          loginUserOrg={USER_ORG.District}
          showWarningModal={mockShowWarningModal}
          showSearchClassAssignModal={mockShowSearchClassAssignModal}
          showAccountDeleteModal={mockShowAccountDeleteModal}
        />
      );
      const searchButton = wrapper.find('#searchBtn');
      searchButton.simulate('click', fakeEvent);
      expect(mockShowWarningModal).toHaveBeenCalled();
      expect(mockOnSearch).not.toHaveBeenCalled();
    });
  });

  it('should not call showWarning modal when SearchClick with no criteria for School', () => {
    wrapper = shallow(
      <SearchModal
        isOpen
        onClose={mockOnClose}
        onSearch={mockOnSearch}
        apps={mockApps}
        classes={mockClasses}
        grades={mockGrades}
        teachers={mockTeachers}
        profileUserType={USER_TYPE.Administrator}
        schools={mockSchools}
        onResetForSearchByChange={mockResetForSearchByChange}
        loginUserOrg={USER_ORG.School}
        showWarningModal={mockShowWarningModal}
        showSearchClassAssignModal={mockShowSearchClassAssignModal}
        showAccountDeleteModal={mockShowAccountDeleteModal}
      />
    );
    const searchButton = wrapper.find('#searchBtn');
    searchButton.simulate('click', fakeEvent);
    expect(mockShowWarningModal).not.toHaveBeenCalled();
    expect(mockOnSearch).toHaveBeenCalled();
  });
});
