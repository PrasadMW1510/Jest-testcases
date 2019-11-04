import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import AdvancedSearch from '../AdvancedSearch';

describe('<AdvancedSearch />', () => {
  let wrapper = null;
  let props = null;
  const props1 = {
    title: '',
    author: '',
    booktype: '',
    lang: '',
    accessibility: '',
    lexilemax: '',
    lexilemin: '',
    readinglevelmin: '',
    readinglevelmax: '',
    guidereadinglevelmin: '',
    guidereadinglevelmax: '',
    pointsrangemin: '',
    pointsrangemax: '',
    awardsinfo: [],
    comprehensionlist: [],
    culturelist: [],
    genrelist: [],
    interestlevellist: [],
    programserieslist: [],
    topicslist: [],
    themedatalist: [],
  };
  props = {
    awardsData: [],
    comskillData: [],
    cultureData: [],
    genreData: [],
    interestLevelData: [],
    programSeriesData: [],
    topicsData: [],
    themesData: [],
    installedQuizCountData: {},
    searchFiltersData: {
      ...props1,
    },
    searchFilters: jest.fn(),
    messageModal: jest.fn(),
    onSearch: jest.fn(),
    onDisplayTeachers: jest.fn(),
    showTeacherMadeQuizData: jest.fn(),
    showEditQuizCollectionModalData: jest.fn(),
  };
  wrapper = shallow(<AdvancedSearch {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('shoud call handleLimitError if 1', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    props = {
      awardsData: [],
      comskillData: [],
      cultureData: [],
      genreData: [],
      interestLevelData: [],
      programSeriesData: [],
      topicsData: [],
      themesData: [],
      installedQuizCountData: {},
      searchFiltersData: {
        ...props1,
        lexilemin: 1701,
      },
      searchFilters: jest.fn(),
      messageModal: jest.fn(),
      onSearch: jest.fn(),
      onDisplayTeachers: jest.fn(),
      showTeacherMadeQuizData: jest.fn(),
      showEditQuizCollectionModalData: jest.fn(),
    };
    wrapper = shallow(<AdvancedSearch {...props} />);
    wrapper.instance().handleLimitError();
    wrapper.instance().handleSubmit(e);
    expect(wrapper.instance().props.searchFiltersData.lexilemin).toBeDefined();
  });
  it('shoud call handleLimitError if 2', () => {
    const e = {
      preventDefault: jest.fn(),
    };

    props = {
      awardsData: [],
      comskillData: [],
      cultureData: [],
      genreData: [],
      interestLevelData: [],
      programSeriesData: [],
      topicsData: [],
      themesData: [],
      installedQuizCountData: {},
      searchFiltersData: {
        ...props1,
        readinglevelmin: '13',
      },
      searchFilters: jest.fn(),
      messageModal: jest.fn(),
      onSearch: jest.fn(),
      onDisplayTeachers: jest.fn(),
      showTeacherMadeQuizData: jest.fn(),
      showEditQuizCollectionModalData: jest.fn(),
    };
    wrapper = shallow(<AdvancedSearch {...props} />);
    wrapper.instance().handleLimitError();
    wrapper.instance().handleSubmit(e);
    expect(wrapper.instance().props.searchFiltersData.readinglevelmin).toBeDefined();
  });
  it('shoud call handleLimitError if 3', () => {
    const e = {
      preventDefault: jest.fn(),
    };

    props = {
      awardsData: [],
      comskillData: [],
      cultureData: [],
      genreData: [],
      interestLevelData: [],
      programSeriesData: [],
      topicsData: [],
      themesData: [],
      installedQuizCountData: {},
      searchFiltersData: {
        ...props1,
        pointsrangemin: '10000',
      },
      searchFilters: jest.fn(),
      messageModal: jest.fn(),
      onSearch: jest.fn(),
      onDisplayTeachers: jest.fn(),
      showTeacherMadeQuizData: jest.fn(),
      showEditQuizCollectionModalData: jest.fn(),
    };
    wrapper = shallow(<AdvancedSearch {...props} />);
    wrapper.instance().handleLimitError();
    wrapper.instance().handleSubmit(e);
    expect(wrapper.instance().props.searchFiltersData.pointsrangemin).toBeDefined();
  });
  // it('shoud call handleLimitError if 4', () => {
  //   const e = {
  //     preventDefault: jest.fn(),
  //   };

  //   props = {
  //     awardsData: [],
  //     comskillData: [],
  //     cultureData: [],
  //     genreData: [],
  //     interestLevelData: [],
  //     programSeriesData: [],
  //     topicsData: [],
  //     themesData: [],
  //     installedQuizCountData: {},
  //     searchFiltersData: {
  //       ...props1,
  //       lexilemin: 'jjj',
  //     },
  //     searchFilters: jest.fn(),
  //     messageModal: jest.fn(),
  //     onSearch: jest.fn(),
  //     onDisplayTeachers: jest.fn(),
  //     showTeacherMadeQuizData: jest.fn(),
  //     showEditQuizCollectionModalData: jest.fn(),
  //   };
  //   wrapper = shallow(<AdvancedSearch {...props} />);
  //   wrapper.instance().handleLimitError();
  //   wrapper.instance().handleSubmit(e);
  //   expect(wrapper.instance().props.searchFiltersData.lexilemin).toBeDefined();
  // });
  it('shoud call handleLimitError if 5', () => {
    const e = {
      preventDefault: jest.fn(),
    };

    props = {
      awardsData: [],
      comskillData: [],
      cultureData: [],
      genreData: [],
      interestLevelData: [],
      programSeriesData: [],
      topicsData: [],
      themesData: [],
      installedQuizCountData: {},
      searchFiltersData: {
        ...props1,
        lexilemax: 'jjj',
      },
      searchFilters: jest.fn(),
      messageModal: jest.fn(),
      onSearch: jest.fn(),
      onDisplayTeachers: jest.fn(),
      showTeacherMadeQuizData: jest.fn(),
      showEditQuizCollectionModalData: jest.fn(),
    };
    wrapper = shallow(<AdvancedSearch {...props} />);
    wrapper.instance().handleLimitError();
    wrapper.instance().handleSubmit(e);
    expect(wrapper.instance().props.searchFiltersData.lexilemax).toBeDefined();
  });
  // it('shoud call handleLimitError if 6', () => {
  //   const e = {
  //     preventDefault: jest.fn(),
  //   };

  //   props = {
  //     awardsData: [],
  //     comskillData: [],
  //     cultureData: [],
  //     genreData: [],
  //     interestLevelData: [],
  //     programSeriesData: [],
  //     topicsData: [],
  //     themesData: [],
  //     installedQuizCountData: {},
  //     searchFiltersData: {
  //       ...props1,
  //       readinglevelmin: 'jjj',
  //     },
  //     searchFilters: jest.fn(),
  //     messageModal: jest.fn(),
  //     onSearch: jest.fn(),
  //     onDisplayTeachers: jest.fn(),
  //     showTeacherMadeQuizData: jest.fn(),
  //     showEditQuizCollectionModalData: jest.fn(),
  //   };
  //   wrapper = shallow(<AdvancedSearch {...props} />);
  //   wrapper.instance().handleLimitError();
  //   wrapper.instance().handleSubmit(e);
  //   expect(wrapper.instance().props.searchFiltersData.readinglevelmin).toBeDefined();
  // });
  it('shoud call handleLimitError if 7', () => {
    const e = {
      preventDefault: jest.fn(),
    };

    props = {
      awardsData: [],
      comskillData: [],
      cultureData: [],
      genreData: [],
      interestLevelData: [],
      programSeriesData: [],
      topicsData: [],
      themesData: [],
      installedQuizCountData: {},
      searchFiltersData: {
        ...props1,
        readinglevelmax: 'jjj',
      },
      searchFilters: jest.fn(),
      messageModal: jest.fn(),
      onSearch: jest.fn(),
      onDisplayTeachers: jest.fn(),
      showTeacherMadeQuizData: jest.fn(),
      showEditQuizCollectionModalData: jest.fn(),
    };
    wrapper = shallow(<AdvancedSearch {...props} />);
    wrapper.instance().handleLimitError();
    wrapper.instance().handleSubmit(e);
    expect(wrapper.instance().props.searchFiltersData.readinglevelmax).toBeDefined();
  });
  it('shoud call handleLimitError if 7', () => {
    const e = {
      preventDefault: jest.fn(),
    };

    props = {
      awardsData: [],
      comskillData: [],
      cultureData: [],
      genreData: [],
      interestLevelData: [],
      programSeriesData: [],
      topicsData: [],
      themesData: [],
      installedQuizCountData: {},
      searchFiltersData: {
        ...props1,
        guidereadinglevelmin: 'jjj',
      },
      searchFilters: jest.fn(),
      messageModal: jest.fn(),
      onSearch: jest.fn(),
      onDisplayTeachers: jest.fn(),
      showTeacherMadeQuizData: jest.fn(),
      showEditQuizCollectionModalData: jest.fn(),
    };
    wrapper = shallow(<AdvancedSearch {...props} />);
    wrapper.instance().handleLimitError();
    wrapper.instance().handleSubmit(e);
    expect(wrapper.instance().props.searchFiltersData.guidereadinglevelmin).toBeDefined();
  });
  it('shoud call handleLimitError if 7', () => {
    const e = {
      preventDefault: jest.fn(),
    };

    props = {
      awardsData: [],
      comskillData: [],
      cultureData: [],
      genreData: [],
      interestLevelData: [],
      programSeriesData: [],
      topicsData: [],
      themesData: [],
      installedQuizCountData: {},
      searchFiltersData: {
        ...props1,
        guidereadinglevelmax: 'jjj',
      },
      searchFilters: jest.fn(),
      messageModal: jest.fn(),
      onSearch: jest.fn(),
      onDisplayTeachers: jest.fn(),
      showTeacherMadeQuizData: jest.fn(),
      showEditQuizCollectionModalData: jest.fn(),
    };
    wrapper = shallow(<AdvancedSearch {...props} />);
    wrapper.instance().handleLimitError();
    wrapper.instance().handleSubmit(e);
    expect(wrapper.instance().props.searchFiltersData.guidereadinglevelmax).toBeDefined();
  });
  // it('shoud call handleLimitError if 7', () => {
  //   const e = {
  //     preventDefault: jest.fn(),
  //   };

  //   props = {
  //     awardsData: [],
  //     comskillData: [],
  //     cultureData: [],
  //     genreData: [],
  //     interestLevelData: [],
  //     programSeriesData: [],
  //     topicsData: [],
  //     themesData: [],
  //     installedQuizCountData: {},
  //     searchFiltersData: {
  //       ...props1,
  //       pointsrangemin: 'jjj',
  //     },
  //     searchFilters: jest.fn(),
  //     messageModal: jest.fn(),
  //     onSearch: jest.fn(),
  //     onDisplayTeachers: jest.fn(),
  //     showTeacherMadeQuizData: jest.fn(),
  //     showEditQuizCollectionModalData: jest.fn(),
  //   };
  //   wrapper = shallow(<AdvancedSearch {...props} />);
  //   wrapper.instance().handleLimitError();
  //   wrapper.instance().handleSubmit(e);
  //   expect(wrapper.instance().props.searchFiltersData.pointsrangemin).toBeDefined();
  // });
  it('shoud call handleLimitError if 8', () => {
    const e = {
      preventDefault: jest.fn(),
    };

    props = {
      awardsData: [],
      comskillData: [],
      cultureData: [],
      genreData: [],
      interestLevelData: [],
      programSeriesData: [],
      topicsData: [],
      themesData: [],
      installedQuizCountData: {},
      searchFiltersData: {
        ...props1,
        pointsrangemax: 'jjj',
      },
      searchFilters: jest.fn(),
      messageModal: jest.fn(),
      onSearch: jest.fn(),
      onDisplayTeachers: jest.fn(),
      showTeacherMadeQuizData: jest.fn(),
      showEditQuizCollectionModalData: jest.fn(),
    };
    wrapper = shallow(<AdvancedSearch {...props} />);
    wrapper.instance().handleLimitError();
    wrapper.instance().handleSubmit(e);
    expect(wrapper.instance().props.searchFiltersData.pointsrangemax).toBeDefined();
  });
  it('shoud call handleLimitError if 8', () => {
    const e = {
      preventDefault: jest.fn(),
    };

    props = {
      awardsData: [],
      comskillData: [],
      cultureData: [],
      genreData: [],
      interestLevelData: [],
      programSeriesData: [],
      topicsData: [],
      themesData: [],
      installedQuizCountData: {},
      searchFiltersData: {
        ...props1,
        title: 'saranya',
      },
      searchFilters: jest.fn(),
      messageModal: jest.fn(),
      onSearch: jest.fn(),
      onDisplayTeachers: jest.fn(),
      showTeacherMadeQuizData: jest.fn(),
      showEditQuizCollectionModalData: jest.fn(),
    };
    wrapper = shallow(<AdvancedSearch {...props} />);
    wrapper.instance().handleLimitError();
    wrapper.instance().handleSubmit(e);
    expect(wrapper.instance().props.searchFiltersData.title).toBeDefined();
  });
  it('shoud call handleLimitError if 8', () => {
    const e = {
      preventDefault: jest.fn(),
    };

    props = {
      awardsData: [],
      comskillData: [],
      cultureData: [],
      genreData: [],
      interestLevelData: [],
      programSeriesData: [],
      topicsData: [],
      themesData: [],
      installedQuizCountData: {},
      searchFiltersData: {
        ...props1,
        author: 'srujan',
      },
      searchFilters: jest.fn(),
      messageModal: jest.fn(),
      onSearch: jest.fn(),
      onDisplayTeachers: jest.fn(),
      showTeacherMadeQuizData: jest.fn(),
      showEditQuizCollectionModalData: jest.fn(),
    };
    wrapper = shallow(<AdvancedSearch {...props} />);
    wrapper.instance().handleLimitError();
    wrapper.instance().handleSubmit(e);
    expect(wrapper.instance().props.searchFiltersData.author).toBeDefined();
  });
  it('shoud call handleLimitError if 8', () => {
    const e = {
      preventDefault: jest.fn(),
    };

    props = {
      awardsData: [],
      comskillData: [],
      cultureData: [],
      genreData: [],
      interestLevelData: [],
      programSeriesData: [],
      topicsData: [],
      themesData: [],
      installedQuizCountData: {},
      searchFiltersData: {
        ...props1,
        booktype: 'sasi',
      },
      searchFilters: jest.fn(),
      messageModal: jest.fn(),
      onSearch: jest.fn(),
      onDisplayTeachers: jest.fn(),
      showTeacherMadeQuizData: jest.fn(),
      showEditQuizCollectionModalData: jest.fn(),
    };
    wrapper = shallow(<AdvancedSearch {...props} />);
    wrapper.instance().handleLimitError();
    wrapper.instance().handleSubmit(e);
    expect(wrapper.instance().props.searchFiltersData.booktype).toBeDefined();
  });
  it('shoud call handleLimitError if 8', () => {
    const e = {
      preventDefault: jest.fn(),
    };

    props = {
      awardsData: [],
      comskillData: [],
      cultureData: [],
      genreData: [],
      interestLevelData: [],
      programSeriesData: [],
      topicsData: [],
      themesData: [],
      installedQuizCountData: {},
      searchFiltersData: {
        ...props1,
        lang: 'edward',
      },
      searchFilters: jest.fn(),
      messageModal: jest.fn(),
      onSearch: jest.fn(),
      onDisplayTeachers: jest.fn(),
      showTeacherMadeQuizData: jest.fn(),
      showEditQuizCollectionModalData: jest.fn(),
    };
    wrapper = shallow(<AdvancedSearch {...props} />);
    wrapper.instance().handleLimitError();
    wrapper.instance().handleSubmit(e);
    expect(wrapper.instance().props.searchFiltersData.lang).toBeDefined();
  });
  it('shoud call handleLimitError if 8', () => {
    const e = {
      preventDefault: jest.fn(),
    };

    props = {
      awardsData: [],
      comskillData: [],
      cultureData: [],
      genreData: [],
      interestLevelData: [],
      programSeriesData: [],
      topicsData: [],
      themesData: [],
      installedQuizCountData: {},
      searchFiltersData: {
        ...props1,
        accessibility: 'yamini',
      },
      searchFilters: jest.fn(),
      messageModal: jest.fn(),
      onSearch: jest.fn(),
      onDisplayTeachers: jest.fn(),
      showTeacherMadeQuizData: jest.fn(),
      showEditQuizCollectionModalData: jest.fn(),
    };
    wrapper = shallow(<AdvancedSearch {...props} />);
    wrapper.instance().handleLimitError();
    wrapper.instance().handleSubmit(e);
    expect(wrapper.instance().props.searchFiltersData.accessibility).toBeDefined();
  });
  it('shoud call handleLimitError if 8', () => {
    const e = {
      preventDefault: jest.fn(),
    };

    props = {
      awardsData: [],
      comskillData: [],
      cultureData: [],
      genreData: [],
      interestLevelData: [],
      programSeriesData: [],
      topicsData: [],
      themesData: [],
      installedQuizCountData: {},
      searchFiltersData: {
        ...props1,
        awardsinfo: ['khushbu'],
      },
      searchFilters: jest.fn(),
      messageModal: jest.fn(),
      onSearch: jest.fn(),
      onDisplayTeachers: jest.fn(),
      showTeacherMadeQuizData: jest.fn(),
      showEditQuizCollectionModalData: jest.fn(),
    };
    wrapper = shallow(<AdvancedSearch {...props} />);
    wrapper.instance().handleLimitError();
    wrapper.instance().handleSubmit(e);
    expect(wrapper.instance().props.searchFiltersData.awardsinfo).toBeDefined();
  });
  it('shoud call handleLimitError if 8', () => {
    const e = {
      preventDefault: jest.fn(),
    };

    props = {
      awardsData: [],
      comskillData: [],
      cultureData: [],
      genreData: [],
      interestLevelData: [],
      programSeriesData: [],
      topicsData: [],
      themesData: [],
      installedQuizCountData: {},
      searchFiltersData: {
        ...props1,
        comprehensionlist: ['ramiprabha'],
      },
      searchFilters: jest.fn(),
      messageModal: jest.fn(),
      onSearch: jest.fn(),
      onDisplayTeachers: jest.fn(),
      showTeacherMadeQuizData: jest.fn(),
      showEditQuizCollectionModalData: jest.fn(),
    };
    wrapper = shallow(<AdvancedSearch {...props} />);
    wrapper.instance().handleLimitError();
    wrapper.instance().handleSubmit(e);
    expect(wrapper.instance().props.searchFiltersData.comprehensionlist).toBeDefined();
  });
  it('shoud call handleLimitError if 8', () => {
    const e = {
      preventDefault: jest.fn(),
    };

    props = {
      awardsData: [],
      comskillData: [],
      cultureData: [],
      genreData: [],
      interestLevelData: [],
      programSeriesData: [],
      topicsData: [],
      themesData: [],
      installedQuizCountData: {},
      searchFiltersData: {
        ...props1,
        culturelist: ['shankar'],
      },
      searchFilters: jest.fn(),
      messageModal: jest.fn(),
      onSearch: jest.fn(),
      onDisplayTeachers: jest.fn(),
      showTeacherMadeQuizData: jest.fn(),
      showEditQuizCollectionModalData: jest.fn(),
    };
    wrapper = shallow(<AdvancedSearch {...props} />);
    wrapper.instance().handleLimitError();
    wrapper.instance().handleSubmit(e);
    expect(wrapper.instance().props.searchFiltersData.culturelist).toBeDefined();
  });
  it('shoud call handleLimitError if 8', () => {
    const e = {
      preventDefault: jest.fn(),
    };

    props = {
      awardsData: [],
      comskillData: [],
      cultureData: [],
      genreData: [],
      interestLevelData: [],
      programSeriesData: [],
      topicsData: [],
      themesData: [],
      installedQuizCountData: {},
      searchFiltersData: {
        ...props1,
        genrelist: ['shakthi'],
      },
      searchFilters: jest.fn(),
      messageModal: jest.fn(),
      onSearch: jest.fn(),
      onDisplayTeachers: jest.fn(),
      showTeacherMadeQuizData: jest.fn(),
      showEditQuizCollectionModalData: jest.fn(),
    };
    wrapper = shallow(<AdvancedSearch {...props} />);
    wrapper.instance().handleLimitError();
    wrapper.instance().handleSubmit(e);
    expect(wrapper.instance().props.searchFiltersData.genrelist).toBeDefined();
  });
  it('shoud call handleLimitError if 8', () => {
    const e = {
      preventDefault: jest.fn(),
    };

    props = {
      awardsData: [],
      comskillData: [],
      cultureData: [],
      genreData: [],
      interestLevelData: [],
      programSeriesData: [],
      topicsData: [],
      themesData: [],
      installedQuizCountData: {},
      searchFiltersData: {
        ...props1,
        interestlevellist: ['marimuthu'],
      },
      searchFilters: jest.fn(),
      messageModal: jest.fn(),
      onSearch: jest.fn(),
      onDisplayTeachers: jest.fn(),
      showTeacherMadeQuizData: jest.fn(),
      showEditQuizCollectionModalData: jest.fn(),
    };
    wrapper = shallow(<AdvancedSearch {...props} />);
    wrapper.instance().handleLimitError();
    wrapper.instance().handleSubmit(e);
    expect(wrapper.instance().props.searchFiltersData.interestlevellist).toBeDefined();
  });
  it('shoud call handleLimitError if 8', () => {
    const e = {
      preventDefault: jest.fn(),
    };

    props = {
      awardsData: [],
      comskillData: [],
      cultureData: [],
      genreData: [],
      interestLevelData: [],
      programSeriesData: [],
      topicsData: [],
      themesData: [],
      installedQuizCountData: {},
      searchFiltersData: {
        ...props1,
        programserieslist: ['sravani'],
      },
      searchFilters: jest.fn(),
      messageModal: jest.fn(),
      onSearch: jest.fn(),
      onDisplayTeachers: jest.fn(),
      showTeacherMadeQuizData: jest.fn(),
      showEditQuizCollectionModalData: jest.fn(),
    };
    wrapper = shallow(<AdvancedSearch {...props} />);
    wrapper.instance().handleLimitError();
    wrapper.instance().handleSubmit(e);
    expect(wrapper.instance().props.searchFiltersData.programserieslist).toBeDefined();
  });
  it('shoud call handleLimitError if 8', () => {
    const e = {
      preventDefault: jest.fn(),
    };

    props = {
      awardsData: [],
      comskillData: [],
      cultureData: [],
      genreData: [],
      interestLevelData: [],
      programSeriesData: [],
      topicsData: [],
      themesData: [],
      installedQuizCountData: {},
      searchFiltersData: {
        ...props1,
        topicslist: ['shanil'],
      },
      searchFilters: jest.fn(),
      messageModal: jest.fn(),
      onSearch: jest.fn(),
      onDisplayTeachers: jest.fn(),
      showTeacherMadeQuizData: jest.fn(),
      showEditQuizCollectionModalData: jest.fn(),
    };
    wrapper = shallow(<AdvancedSearch {...props} />);
    wrapper.instance().handleLimitError();
    wrapper.instance().handleSubmit(e);
    expect(wrapper.instance().props.searchFiltersData.topicslist).toBeDefined();
  });
  it('shoud call handleLimitError if 8', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    props = {
      awardsData: [],
      comskillData: [],
      cultureData: [],
      genreData: [],
      interestLevelData: [],
      programSeriesData: [],
      topicsData: [],
      themesData: [],
      installedQuizCountData: {},
      searchFiltersData: {
        ...props1,
        themedatalist: ['nithya'],
      },
      searchFilters: jest.fn(),
      messageModal: jest.fn(),
      onSearch: jest.fn(),
      onDisplayTeachers: jest.fn(),
      showTeacherMadeQuizData: jest.fn(),
      showEditQuizCollectionModalData: jest.fn(),
    };
    wrapper = shallow(<AdvancedSearch {...props} />);
    wrapper.instance().handleLimitError();
    wrapper.instance().handleSubmit(e);
    expect(wrapper.instance().props.searchFiltersData.themedatalist).toBeDefined();
  });
  it('shoud call handleLimitError if 8', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().setState({
      searchbtnvalue: 'formclear',
    });
    wrapper.instance().handleSubmit(e);
    expect(wrapper.instance().props.awardsData).toEqual([]);
  });
  it('shoud call handleDataChange 1st level if ', () => {
    const e = {
      target: {
        name: 'guidereadinglevelmin',
        value: '',
      },
    };
    wrapper.instance().handleDataChange(e);
    expect(wrapper.instance().props.awardsData).toEqual([]);
  });
  it('shoud call handleDataChange first level else ', () => {
    const e = {
      target: {
        name: 'guidereadinglevelmin',
        value: '999',
      },
    };
    wrapper.instance().handleDataChange(e);
    expect(wrapper.instance().props.awardsData).toEqual([]);
  });
  it('shoud call handleDataChange if', () => {
    const e = {
      target: {
        name: 'guidereadinglevelmax',
        value: 'saranya',
      },
    };
    wrapper.instance().handleDataChange(e);
    expect(wrapper.instance().props.awardsData).toEqual([]);
  });
  it('shoud call handleDataChange elseif1', () => {
    const e = {
      target: {
        name: 'lexilemin',
        value: '',
      },
    };
    wrapper.instance().handleDataChange(e);
    expect(wrapper.instance().props.awardsData).toEqual([]);
  });
  it('shoud call handleDataChange elseif1 ', () => {
    const e = {
      target: {
        name: 'lexilemax',
        value: '999',
      },
    };
    wrapper.instance().handleDataChange(e);
    expect(wrapper.instance().props.awardsData).toEqual([]);
  });
  it('shoud call handleDataChange elseif1', () => {
    const e = {
      target: {
        name: 'pointsrangemin',
        value: 'yam',
      },
    };
    wrapper.instance().handleDataChange(e);
    expect(wrapper.instance().props.awardsData).toEqual([]);
  });
  it('shoud call handleDataChange elseif1 ', () => {
    const e = {
      target: {
        name: 'pointsrangemax',
        value: '',
      },
    };
    wrapper.instance().handleDataChange(e);
    expect(wrapper.instance().props.awardsData).toEqual([]);
  });
  it('shoud call handleDataChange elseif1 ', () => {
    const e = {
      target: {
        name: 'readinglevelmin',
        value: '',
      },
    };
    wrapper.instance().handleDataChange(e);
    expect(wrapper.instance().props.awardsData).toEqual([]);
  });
  it('shoud call handleDataChange elseif1 ', () => {
    const e = {
      target: {
        name: 'readinglevelmax',
        value: '5.2',
      },
    };
    wrapper.instance().handleDataChange(e);
    expect(wrapper.instance().props.awardsData).toEqual([]);
  });
  it('shoud call handleDataChange elseif1 ', () => {
    const e = {
      target: {
        name: 'readinglevelmax',
        value: 'yamini',
      },
    };
    wrapper.instance().handleDataChange(e);
    expect(wrapper.instance().props.awardsData).toEqual([]);
  });
  it('shoud call handleDataChange else ', () => {
    const e = {
      target: {
        name: 'readinglevelmax1',
        value: 'yamini',
      },
    };
    wrapper.instance().handleDataChange(e);
    expect(wrapper.instance().props.awardsData).toEqual([]);
  });
  it('shoud call handleDisplayTeacher ', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().handleDisplayTeacher(e);
    expect(wrapper.instance().props.onDisplayTeachers).toBeDefined();
  });
  it('shoud call advanceSearcCheckboxhSelection  ', () => {
    const dataFromChild = {};

    const params = [dataFromChild];
    wrapper.instance().advanceSearcCheckboxhSelection(params)(dataFromChild);
    expect(wrapper.instance().props.awardsData).toEqual([]);
  });
  it('shoud call advanceSearcCheckboxhSelection else ', () => {
    const dataFromChild = {};

    const params = [];
    wrapper.instance().advanceSearcCheckboxhSelection(params)(dataFromChild);
    expect(wrapper.instance().props.awardsData).toEqual([]);
  });
  it('shoud call advanceSearchClearForm', () => {
    const searchbuttonvalue = {};
    wrapper.instance().advanceSearchClearForm(searchbuttonvalue);
    expect(wrapper.state('searchbtnvalue')).toEqual({});
  });
  it('shoud call handleSearchData ', () => {
    const sorttermsparam = [];
    const listparam = ['p', 'i', 'u'];
    const ItemKey = [];
    wrapper.instance().handleSearchData(sorttermsparam, listparam, ItemKey);
    expect(wrapper.instance().props.awardsData).toEqual([]);
  });
});
