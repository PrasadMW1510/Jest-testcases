import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { SearchResultDetailsContainer, mapDispatchToProps } from '../SearchResultDetailsContainer';

describe('SearchResultDetailsContainer', () => {
  let wrapper = null;
  const props = {
    getSearchResultDetailsDataRequest: jest.fn(),
    makeSelectedbookresults: jest.fn(),
    hideModal: jest.fn(),
    saveSearchResultDetailsDataRequest: jest.fn(),
    searchResultDetailsData: {},
    searchResultDetailsContainer: {
      detailsID: {
        id: ['14960'],
      },
      searchResultDetailsData: {},
    },
    searchResultsContainer: {
      searchResultsIdsChecked: [],
      searchResults: {
        results: [
          {
            ID: ['14960'],
          },
          {
            ID: [6],
          },
          {
            ID: [7],
          },
          {
            ID: [8],
          },
        ],
      },
      selectedItems: [
        {
          Author: [{}],
          CollectionName: ['Spring 2016 Complete Quiz Collection------- 3-5'],
          Copies: ['0'],
          GuidedReadingLevel: [''],
          ID: ['14960'],
          _id: ['14960'],
        },
        {
          Author: [{}],
          CollectionName: ['Spring 2016 Complete Quiz Collection------- 3-5'],
          Copies: ['0'],
          GuidedReadingLevel: [''],
          ID: ['14961'],
          _id: ['14960'],
        },
        {
          Author: [{}],
          CollectionName: ['Spring 2016 Complete Quiz Collection------- 3-5'],
          Copies: ['0'],
          GuidedReadingLevel: [''],
          ID: ['14962'],
          _id: ['14960'],
        },
      ],
    },
    data: {
      page: 'searchResults',
      id: ['14960'],
      teacherMadeQuiz: [],
    },
    searchresultsselectedData: jest.fn(),
    saveTeacherMadeQuizDataRequest: jest.fn(),
    showMessageLogModal: jest.fn(),
  };
  const propselse = {
    getSearchResultDetailsDataRequest: jest.fn(),
    makeSelectedbookresults: jest.fn(),
    hideModal: jest.fn(),
    saveSearchResultDetailsDataRequest: jest.fn(),
    searchResultDetailsData: {},
    searchResultDetailsContainer: {
      searchResultDetailsData: {},
    },
    searchResultsContainer: {
      searchResultsIdsChecked: [],
      searchResults: {
        results: [
          {
            ID: ['14960'],
          },
          {
            ID: [6],
          },
          {
            ID: [7],
          },
          {
            ID: [8],
          },
        ],
      },
      selectedItems: [
        {
          Author: [{}],
          CollectionName: ['Spring 2016 Complete Quiz Collection------- 3-5'],
          Copies: ['0'],
          GuidedReadingLevel: [''],
          ID: ['14960'],
          _id: ['14960'],
        },
        {
          Author: [{}],
          CollectionName: ['Spring 2016 Complete Quiz Collection------- 3-5'],
          Copies: ['0'],
          GuidedReadingLevel: [''],
          ID: ['14961'],
          _id: ['14960'],
        },
        {
          Author: [{}],
          CollectionName: ['Spring 2016 Complete Quiz Collection------- 3-5'],
          Copies: ['0'],
          GuidedReadingLevel: [''],
          ID: ['14962'],
          _id: ['14960'],
        },
      ],
    },
    data: {
      page: 'searchults',
      id: ['14960'],
      teacherMadeQuiz: [],
    },
    searchresultsselectedData: jest.fn(),
    saveTeacherMadeQuizDataRequest: jest.fn(),
    showMessageLogModal: jest.fn(),
  };
  const wrap = shallow(<SearchResultDetailsContainer {...propselse} />);
  beforeEach(() => {
    wrapper = shallow(<SearchResultDetailsContainer {...props} />);
  });
  it('Should render SearchResultDetailsContainer', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('should call componentWillReceiveProps if', () => {
    const nextProps = {
      searchResultDetailsContainer: {
        searchResultDetailsData: {},
        detailsID: {
          id: ['lll'],
        },
      },
      data: {
        page: 'searchResults',
        id: ['14960'],
        teacherMadeQuiz: [],
      },
      searchResultsContainer: {
        searchResults: {
          results: [
            {
              ID: ['14960'],
            },
          ],
        },
        searchResultsIdsChecked: ['hhh'],
      },
    };
    wrapper.instance().setState({
      isFetch: false,
    });
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.state('isFetch')).toBeTruthy();
  });
  it('should call componentWillReceiveProps else', () => {
    const nextProps = {
      searchResultDetailsContainer: {
        detailsID: {
          id: ['lll'],
        },
      },
      data: {
        page: 'searchResults',
        id: ['14960'],
        teacherMadeQuiz: [],
      },
      searchResultsContainer: {
        searchResults: {
          results: [
            {
              ID: ['14960'],
            },
          ],
        },
        searchResultsIdsChecked: ['hhh'],
      },
    };
    wrapper.instance().setState({
      isFetch: false,
    });
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.state('isFetch')).toBeTruthy();
  });
  it('should call componentWillReceiveProps if(else)', () => {
    const nextProps = {
      searchResultDetailsContainer: {
        searchResultDetailsData: {},
        detailsID: {
          id: ['lll'],
        },
      },
      searchResultsContainer: {
        searchResults: {
          results: [
            {
              ID: ['14960'],
            },
          ],
        },
        searchResultsIdsChecked: ['hhh'],
      },
    };
    wrapper.instance().setState({
      isFetch: true,
    });
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.state('isFetch')).toBeTruthy();
  });

  it('should show modal when showTeacherMadeQuizError is true', () => {
    const nextProps = {
      searchResultDetailsContainer: {
        searchResultDetailsData: {},
        detailsID: { id: ['lll'] },
        showTeacherMadeQuizError: true,
      },
      searchResultsContainer: {
        searchResults: { results: [{ ID: ['14960'] }] },
        searchResultsIdsChecked: ['hhh'],
      },
    };
    wrapper.instance().setState({
      isFetch: true,
    });
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.instance().props.showMessageLogModal).toBeCalled();
  });
  it('should call getDataArrayIndex if ', () => {
    const resultSet = [
      {
        ID: ['14960'],
      },
    ];
    const data = {
      page: 'searchResults',
      id: ['14960'],
    };
    wrapper.instance().getDataArrayIndex(resultSet, data);
    expect(wrapper.instance().props.searchResultsContainer.selectedItems).toMatchSnapshot();
  });
  it('should call getDataArrayIndex if (else) ', () => {
    const resultSet = [
      {
        ID: ['14960'],
      },
    ];
    const data = {
      page: 'searchResults',
      id: ['149'],
    };
    wrapper.instance().getDataArrayIndex(resultSet, data);
    expect(wrapper.instance().props.searchResultsContainer.selectedItems).toMatchSnapshot();
  });
  it('should call getDataArrayIndex else', () => {
    const resultSet = [
      {
        ID: ['14960'],
      },
    ];
    const data = {
      page: 'searchResu',
      id: ['14960'],
    };
    wrapper.instance().getDataArrayIndex(resultSet, data);
    expect(wrapper.instance().props.searchResultsContainer.selectedItems).toMatchSnapshot();
  });
  it('Expect to call getSelecedDataArrayIndex else', () => {
    const resultSet = ['14960'];
    const dataID = ['11122'];
    wrapper.instance().getSelecedDataArrayIndex(resultSet, dataID);
    expect(wrapper.instance().getSelecedDataArrayIndex(resultSet, dataID)).toEqual(-1);
  });
  it('Expect to call getSelecedDataArrayIndex if', () => {
    const resultSet = ['14960'];
    const dataID = ['14960'];
    wrapper.instance().getSelecedDataArrayIndex(resultSet, dataID);
    expect(wrapper.instance().getSelecedDataArrayIndex(resultSet, dataID)).toEqual(-1);
  });
  it('should call prevSerd if return', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().setState({
      currentIndex: 0,
    });
    wrapper.instance().prevSerd(e);
    expect(wrapper.instance().props.searchResultsContainer.selectedItems).toMatchSnapshot();
  });
  it('should call prevSerd else(if)', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().setState({
      currentIndex: 1,
    });
    wrapper.instance().prevSerd(e);
    expect(wrapper.instance().props.searchResultsContainer.selectedItems).toMatchSnapshot();
  });
  it('should call prevSerd  else(else)', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrap.instance().setState({
      currentIndex: 1,
    });
    wrap.instance().prevSerd(e);
    expect(wrapper.instance().props.searchResultsContainer.selectedItems).toMatchSnapshot();
  });
  it('should call nextSerd if and if', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().setState({
      currentIndex: 3,
    });
    wrapper.instance().nextSerd(e);
    expect(wrapper.instance().props.searchResultsContainer.selectedItems).toMatchSnapshot();
  });
  it('should call nextSerd if and else', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().setState({
      currentIndex: 2,
    });
    wrapper.instance().nextSerd(e);
    expect(wrapper.instance().props.searchResultsContainer.selectedItems).toMatchSnapshot();
  });
  it('should call nextSerd else and if', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrap.instance().setState({
      currentIndex: 2,
    });
    wrap.instance().nextSerd(e);
    expect(wrapper.instance().props.searchResultsContainer.selectedItems).toMatchSnapshot();
  });
  it('should call nextSerd else and else', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrap.instance().setState({
      currentIndex: 1,
    });
    wrap.instance().nextSerd(e);
    expect(wrapper.instance().props.searchResultsContainer.selectedItems).toMatchSnapshot();
  });
  it('should call nextSerd else and else and else', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrap.instance().nextSerd(e);
    expect(wrapper.instance().props.searchResultsContainer.selectedItems).toMatchSnapshot();
  });
  it('should call  changeQuizData', () => {
    const e = {
      target: {
        name: 'ya',
        value: '34',
        validity: {
          valid: true,
        },
      },
    };
    wrapper.instance().changeQuizData(e);
    expect(wrapper.state('detailsData')).toEqual({ IsFiction: '1', ya: '34' });
  });
  it('should call  changeQuizData', () => {
    const e = {
      target: {
        name: 'ya',
        value: '34',
        validity: {
          valid: false,
        },
      },
    };
    wrapper.instance().changeQuizData(e);
    expect(wrapper.state('detailsData')).toEqual({ IsFiction: '1', ya: '' });
  });
  it('should call  saveQuizData', () => {
    wrapper.instance().saveQuizData();
    expect(wrapper.instance().props.saveSearchResultDetailsDataRequest).toBeCalled();
  });

  it('should call  saveTeacherMadeQuizData if', () => {
    wrapper.setState({
      detailsData: {
        WordCount: '5',
        Lexile: 'lex',
        ReadingLevel: 'rf',
        Points: '2',
        GRL: 'grl',
      },
    });
    wrapper.instance().saveTeacherMadeQuizData();
    expect(wrapper.instance().props.saveTeacherMadeQuizDataRequest).toBeCalled();
  });
  it('should call  saveTeacherMadeQuizData', () => {
    wrapper.setState({
      detailsData: {
        WordCount: '',
        Lexile: 'ds',
        ReadingLevel: 'sd',
        Points: 'asd',
        GRL: 'ad',
      },
    });
    wrapper.instance().saveTeacherMadeQuizData();
    expect(wrapper.instance().props.saveTeacherMadeQuizDataRequest).toBeCalled();
  });
  it('should call  saveTeacherMadeQuizData', () => {
    wrapper.setState({
      detailsData: {
        WordCount: 'sda',
        Lexile: '',
        ReadingLevel: 'sd',
        Points: 'asd',
        GRL: 'ad',
      },
    });
    wrapper.instance().saveTeacherMadeQuizData();
    expect(wrapper.instance().props.saveTeacherMadeQuizDataRequest).toBeCalled();
  });
  it('should call  saveTeacherMadeQuizData', () => {
    wrapper.setState({
      detailsData: {
        WordCount: 'sda',
        Lexile: 'ws',
        ReadingLevel: '',
        Points: 'asd',
        GRL: 'ad',
      },
    });
    wrapper.instance().saveTeacherMadeQuizData();
    expect(wrapper.instance().props.saveTeacherMadeQuizDataRequest).toBeCalled();
  });
  it('should call  saveTeacherMadeQuizData', () => {
    wrapper.setState({
      detailsData: {
        WordCount: 'sda',
        Lexile: 'ws',
        ReadingLevel: 'qs',
        Points: '',
        GRL: 'ad',
      },
    });
    wrapper.instance().saveTeacherMadeQuizData();
    expect(wrapper.instance().props.saveTeacherMadeQuizDataRequest).toBeCalled();
  });
  it('should call  saveTeacherMadeQuizData', () => {
    wrapper.setState({
      detailsData: {
        WordCount: 'sda',
        Lexile: 'ws',
        ReadingLevel: 'qs',
        Points: 'eq',
        GRL: '',
      },
    });
    wrapper.instance().saveTeacherMadeQuizData();
    expect(wrapper.instance().props.saveTeacherMadeQuizDataRequest).toBeCalled();
  });
  it('should call  changeFictionData if', () => {
    const e = {
      target: {
        name: 'gdcfusd',
      },
    };
    const val = 'non';
    wrapper.instance().changeFictionData(e, val);
    expect(wrapper.state('detailsData')).toEqual({ IsFiction: '1', gdcfusd: '0' });
  });
  it('should call  changeFictionData else', () => {
    const e = {
      target: {
        name: 'gdcfusd',
      },
    };
    const val = 'none';
    wrapper.instance().changeFictionData(e, val);
    expect(wrapper.state('detailsData')).toEqual({ IsFiction: '1', gdcfusd: '1' });
  });
  it('should call  addcustomItem', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().setState({
      currentIndex: '',
      isSelected: false,
    });
    wrapper.instance().addcustomItem(e);
    expect(wrapper.instance().props.searchResultsContainer.selectedItems).toMatchSnapshot();
  });
  it('should call  addcustomItem else', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().setState({
      currentIndex: '',
      isSelected: true,
    });
    wrapper.instance().addcustomItem(e);
    expect(wrapper.instance().props.searchResultsContainer.selectedItems).toMatchSnapshot();
  });
  it('Should render SearchResultDetailsContainer else', () => {
    const props1 = {
      getSearchResultDetailsDataRequest: jest.fn(),
      hideModal: jest.fn(),
      saveSearchResultDetailsDataRequest: jest.fn(),
      makeSelectedbookresults: jest.fn(),
      searchResultDetailsData: {},
      searchResultDetailsContainer: {
        searchResultDetailsData: {},
      },
      searchResultsContainer: {
        searchResults: {
          results: [
            {
              ID: ['dataID'],
            },
          ],
        },
      },
      searchresultsselectedData: jest.fn(),
      saveTeacherMadeQuizDataRequest: jest.fn(),
      showMessageLogModal: jest.fn(),
    };
    wrapper = shallow(<SearchResultDetailsContainer {...props1} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('map Dispatch To Props', () => {
    const mockObject = jest.fn;
    const mapDispatchToPropscomp = mapDispatchToProps(mockObject);
    expect(mapDispatchToPropscomp.showMessageLogModal().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.hideModal().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.makeSelectedbookresults().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.saveTeacherMadeQuizDataRequest().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.getSearchResultDetailsDataRequest().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.saveSearchResultDetailsDataRequest().mock.calls.length).toBe(0);
  });
});
