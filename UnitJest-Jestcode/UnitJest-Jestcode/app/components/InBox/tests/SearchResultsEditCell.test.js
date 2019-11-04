import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import SearchResultsEditCell from '../SearchResultsEditCell';

describe('<SearchResultsEditCell />', () => {
  let wrapper = null;
  const props = {
    rowData: {
      communityId: 'M180',
      assignment: 'Simulation',
    },
    handleStudent: jest.fn(),
  };
  wrapper = shallow(<SearchResultsEditCell {...props} />);
  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
describe('<SearchResultsEditCell />', () => {
  let wrapper = null;
  const props = {
    rowData: {
      communityId: 'M180Y2',
      assignment: 'Simulation',
    },
    handleStudent: jest.fn(),
  };
  wrapper = shallow(<SearchResultsEditCell {...props} />);
  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
describe('<SearchResultsEditCell />', () => {
  let wrapper = null;
  const props = {
    rowData: {
      communityId: 'M180',
      assignment: 'mSkills Assessment',
    },
    handleStudent: jest.fn(),
  };
  wrapper = shallow(<SearchResultsEditCell {...props} />);
  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
describe('<SearchResultsEditCell />', () => {
  let wrapper = null;
  const props = {
    rowData: {
      communityId: 'M180Y2',
      assignment: 'mSkills Assessment',
    },
    handleStudent: jest.fn(),
  };
  wrapper = shallow(<SearchResultsEditCell {...props} />);
  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
describe('<SearchResultsEditCell />', () => {
  let wrapper = null;
  const props = {
    rowData: {
      communityId: 'S44JR',
    },
    handleStudent: jest.fn(),
  };
  wrapper = shallow(<SearchResultsEditCell {...props} />);
  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
describe('<SearchResultsEditCell />', () => {
  let wrapper = null;
  const props = {
    rowData: {
      communityId: 'R180NG',
    },
    handleStudent: jest.fn(),
  };
  wrapper = shallow(<SearchResultsEditCell {...props} />);
  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
describe('<SearchResultsEditCell />', () => {
  let wrapper = null;
  const props = {
    rowData: {
      communityId: 'S44NG',
    },
    handleStudent: jest.fn(),
  };
  wrapper = shallow(<SearchResultsEditCell {...props} />);
  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
describe('<SearchResultsEditCell />', () => {
  let wrapper = null;
  const props = {
    rowData: {
      communityId: 'RTNG',
    },
    handleStudent: jest.fn(),
  };
  wrapper = shallow(<SearchResultsEditCell {...props} />);
  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
