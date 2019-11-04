import React from 'react';
import Immutable from 'immutable';
import { USER_ORG, USER_TYPE } from 'containers/App/constants';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import UsageSummary from '../UsageSummary';

describe('<UsageSummary /> All Views', () => {
  let wrapper = null;
  let headers = null;
  let dataKeys = null;
  let smartBarSelections = null;
  let loginData = null;
  let data = null;
  let totals = null;
  let selectedCell;

  let tableData = null;

  beforeEach(() => {
    headers = [
      ['Common Core Code X Course I'],
      ['Common Core Code X Course II'],
      ['Common Core Code X Course III'],
    ];
    dataKeys = [
      ['CA S44 Stage A Standalone'],
      ['CA S44 Stage B Standalone'],
      ['CA S44 Stage C Standalone'],
    ];
    data = {
      'CA S44 Stage A Standalone': ['0', '0', '1'],
      'CA S44 Stage B Standalone': ['0', '0', '1'],
      'CA S44 Stage C Standalone': ['0', '0', '1'],
    };
    totals = [1, 2, 0];

    tableData = [
      {
        'Common Core Code X Course I': ['1'],
        _id: ['CA S44 Stage A Standalone'],
        'Common Core Code X Course II': ['0'],
        'Common Core Code X Course III': ['0'],
        School: ['CA S44 Stage A Standalone'],
        key: 'CA S44 Stage A Standalone',
      },
      {
        'Common Core Code X Course I': ['1'],
        _id: ['CA S44 Stage B Standalone'],
        'Common Core Code X Course II': ['0'],
        'Common Core Code X Course III': ['0'],
        School: ['CA S44 Stage B Standalone'],
        key: ['CA S44 Stage B Standalone'],
      },
      {
        'Common Core Code X Course I': ['1'],
        _id: ['CA S44 Stage C Standalone'],
        'Common Core Code X Course II': ['0'],
        'Common Core Code X Course III': ['0'],
        School: ['CA S44 Stage C Standalone'],
        key: ['CA S44 Stage C Standalone'],
      },
    ];

    smartBarSelections = Immutable.fromJS({
      selectedCohType: '',
    });

    loginData = Immutable.fromJS({});

    selectedCell = {
      rowIndex: 0,
      columnIndex: 0,
    };

    wrapper = mount(
      <UsageSummary
        title="Classes"
        headers={headers}
        dataKeys={dataKeys}
        data={data}
        selectedCell={selectedCell}
        smartBarSelections={smartBarSelections}
        loginData={loginData}
        onGridHeaderClick={jest.fn()}
        tableData={tableData}
        totals={totals}
      />
    );
  });

  it('Should render grid cells', () => {
    wrapper = mount(
      <UsageSummary
        title="Classes"
        headers={headers}
        dataKeys={dataKeys}
        data={data}
        selectedCell={selectedCell}
        smartBarSelections={smartBarSelections}
        loginData={loginData}
        tableData={tableData}
        totals={totals}
      />
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should update grid in componentWillReceiveProps', () => {
    const updateSpy = jest.fn();
    const recomputeGridSpy = jest.fn();
    wrapper.instance().Grid.forceUpdate = updateSpy;
    wrapper.instance().Grid.SAMGrid.recomputeGridSize = recomputeGridSpy;

    const nextProps = {
      tableData: [
        {
          'Common Core Code X Course I': ['1'],
          _id: ['01 SAM Port'],
          key: ['01 SAM Port'],
          'Common Core Code X Course II': ['0'],
          'Common Core Code X Course III': ['0'],
          School: ['01 SAM Port'],
        },
        {
          'Common Core Code X Course I': ['1'],
          _id: ['02 SAM Port'],
          key: ['02 SAM Port'],
          'Common Core Code X Course II': ['0'],
          'Common Core Code X Course III': ['0'],
          School: ['02 SAM Port'],
        },
        {
          'Common Core Code X Course I': ['1'],
          _id: ['03 SAM Port'],
          key: ['03 SAM Port'],
          'Common Core Code X Course II': ['0'],
          'Common Core Code X Course III': ['0'],
          School: ['03 SAM Port'],
        },
      ],
    };
    wrapper.instance().setState = jest.fn();
    wrapper.instance().componentWillReceiveProps(nextProps);
    wrapper.instance().componentDidUpdate(nextProps);

    expect(wrapper.instance().state).toMatchSnapshot();
    expect(updateSpy).toHaveBeenCalledTimes(2);
    expect(recomputeGridSpy).toHaveBeenCalled();
  });

  it('Should render body grid cells', () => {
    let columnIndex = 0;
    let key = 'School';
    let rowIndex = 0;
    let style = {};

    expect(
      wrapper.instance().cellRenderer({ columnIndex, key, rowIndex, style })
    ).toMatchSnapshot();

    columnIndex = 1;
    rowIndex = 1;
    key = 'Class';
    rowIndex = 0;
    style = {};

    expect(
      wrapper.instance().cellRenderer({ columnIndex, key, rowIndex, style })
    ).toMatchSnapshot();

    const districtAdminLogin = Immutable.fromJS({
      user_org: [USER_ORG.School],
      user_type: [USER_TYPE.Administrator],
    });

    wrapper.setProps({ loginData: districtAdminLogin });
    wrapper.instance().cellRenderer({ columnIndex, key, rowIndex, style });

    expect(
      wrapper.instance().cellRenderer({ columnIndex, key, rowIndex, style })
    ).toMatchSnapshot();

    wrapper.setProps({ tableData: [] });
    expect(
      wrapper.instance().cellRenderer({ columnIndex, key, rowIndex, style })
    ).toMatchSnapshot();
  });

  it('Should render footer grid cells', () => {
    let columnIndex = 0;
    let key = 'School';
    let rowIndex = 0;
    let style = {};
    expect(
      wrapper.instance().footerRenderer({ columnIndex, key, rowIndex, style })
    ).toMatchSnapshot();

    columnIndex = 1;
    rowIndex = 1;
    key = 'Class';
    rowIndex = 0;
    style = {};

    expect(
      wrapper.instance().footerRenderer({ columnIndex, key, rowIndex, style })
    ).toMatchSnapshot();

    wrapper.setProps({ totals: [] });

    expect(
      wrapper.instance().footerRenderer({ columnIndex, key, rowIndex, style })
    ).toMatchSnapshot();
  });

  it('should handleGridHeaderClick', () => {
    const header = wrapper.find('.usage-summary__grid-header--selected');
    header.simulate('click');

    expect(wrapper.instance().props.onGridHeaderClick).toHaveBeenCalled();
  });

  it('should render correcty for default view teacher', () => {
    const teacherLogin = Immutable.fromJS({
      user_type: [USER_TYPE.Teacher],
    });
    wrapper.setProps({ loginData: teacherLogin });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render correcty for default view district admin', () => {
    let districtAdminLogin = Immutable.fromJS({
      user_org: [USER_ORG.District],
      user_type: [USER_TYPE.Administrator],
    });

    wrapper.setProps({ loginData: districtAdminLogin });
    expect(shallowToJson(wrapper)).toMatchSnapshot();

    districtAdminLogin = Immutable.fromJS({
      user_org: [],
      user_type: [USER_TYPE.Administrator],
    });

    wrapper.setProps({ loginData: districtAdminLogin });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render correcty for default view school admin', () => {
    const schoolAdminLogin = Immutable.fromJS({
      user_org: [USER_ORG.School],
      user_type: [USER_TYPE.Administrator],
    });

    wrapper.setProps({ loginData: schoolAdminLogin });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render correcty when a a school is selected', () => {
    const schoolSelection = Immutable.fromJS({
      selectedCohType: 'School',
    });

    wrapper.setProps({ smartBarSelections: schoolSelection });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render correcty when a a grade is selected', () => {
    const gradeSelection = Immutable.fromJS({ selectedCohType: 'Grade' });

    wrapper.setProps({ smartBarSelections: gradeSelection });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render correcty when a a class is selected', () => {
    const classSelection = Immutable.fromJS({
      selectedCohType: 'Class',
    });

    wrapper.setProps({ smartBarSelections: classSelection });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render correcty when a a teacher is selected', () => {
    const teacherSelection = Immutable.fromJS({ selectedCohType: 'Teacher' });

    wrapper.setProps({ smartBarSelections: teacherSelection });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render correcty when a a group is selected', () => {
    const groupSelection = Immutable.fromJS({ selectedCohType: 'Group' });

    wrapper.setProps({ smartBarSelections: groupSelection });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe('<UsageSummary /> no table data', () => {
  let wrapper = null;
  let headers = null;
  let dataKeys = null;
  let smartBarSelections = null;
  let loginData = null;
  let data = null;
  let totals = null;
  let selectedCell;

  let tableData = null;

  beforeEach(() => {
    headers = [
      ['Common Core Code X Course I'],
      ['Common Core Code X Course II'],
      ['Common Core Code X Course III'],
    ];
    dataKeys = [
      ['CA S44 Stage A Standalone'],
      ['CA S44 Stage B Standalone'],
      ['CA S44 Stage C Standalone'],
    ];
    data = {
      'CA S44 Stage A Standalone': ['0', '0', '1'],
      'CA S44 Stage B Standalone': ['0', '0', '1'],
      'CA S44 Stage C Standalone': ['0', '0', '1'],
    };
    totals = [1, 2, 0];

    tableData = [];

    smartBarSelections = Immutable.fromJS({
      selectedCohType: '',
    });

    loginData = Immutable.fromJS({});

    selectedCell = {
      rowIndex: 0,
      columnIndex: 0,
    };

    wrapper = mount(
      <UsageSummary
        title="Classes"
        headers={headers}
        dataKeys={dataKeys}
        data={data}
        selectedCell={selectedCell}
        smartBarSelections={smartBarSelections}
        loginData={loginData}
        onGridHeaderClick={jest.fn()}
        tableData={tableData}
        totals={totals}
      />
    );
  });

  it('Should render grid cells', () => {
    wrapper = mount(
      <UsageSummary
        title="Classes"
        headers={headers}
        dataKeys={dataKeys}
        data={data}
        selectedCell={selectedCell}
        smartBarSelections={smartBarSelections}
        loginData={loginData}
        tableData={[]}
        totals={totals}
      />
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should handleGridHeaderClick', () => {
    const header = wrapper.find('.usage-summary__grid-header--selected');
    header.simulate('click');

    expect(wrapper.instance().props.onGridHeaderClick).toHaveBeenCalled();
  });
});

describe('<UsageSummary /> student view', () => {
  let wrapper = null;
  let headers = null;
  let dataKeys = null;
  let data = null;
  let studentView = null;
  let studentItems = null;
  const smartBarSelections = Immutable.fromJS({ selectedCohType: '' });

  beforeEach(() => {
    headers = [];
    dataKeys = [];
    data = {};
    studentView = 'student01';
    studentItems = [];

    wrapper = shallow(
      <UsageSummary
        title="Classes"
        headers={headers}
        dataKeys={dataKeys}
        data={data}
        tableData={[]}
        loginData={Immutable.fromJS({})}
        smartBarSelections={smartBarSelections}
        studentView={studentView}
        studentItems={studentItems}
      />
    );
  });

  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should update grid in componentWillReceiveProps', () => {
    const updateSpy = jest.fn();
    const nextProps = {
      tableData: [
        {
          'Common Core Code X Course I': ['1'],
          _id: ['01 SAM Port'],
          key: ['01 SAM Port'],
          'Common Core Code X Course II': ['0'],
          'Common Core Code X Course III': ['0'],
          School: ['01 SAM Port'],
        },
        {
          'Common Core Code X Course I': ['1'],
          _id: ['02 SAM Port'],
          key: ['02 SAM Port'],
          'Common Core Code X Course II': ['0'],
          'Common Core Code X Course III': ['0'],
          School: ['02 SAM Port'],
        },
        {
          'Common Core Code X Course I': ['1'],
          _id: ['03 SAM Port'],
          key: ['03 SAM Port'],
          'Common Core Code X Course II': ['0'],
          'Common Core Code X Course III': ['0'],
          School: ['03 SAM Port'],
        },
      ],
    };
    wrapper.instance().setState = jest.fn();
    wrapper.instance().componentWillReceiveProps(nextProps);
    wrapper.instance().componentDidUpdate(nextProps);

    expect(updateSpy).not.toHaveBeenCalled();
  });
});
