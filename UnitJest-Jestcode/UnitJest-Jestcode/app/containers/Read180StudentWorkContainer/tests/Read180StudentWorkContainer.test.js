import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { Read180StudentWorkContainer } from '../Read180StudentWorkContainer';

describe('Read180StudentWorkContainer  ', () => {
  let wrapper = null;
  let wrapper1 = null;
  let wrapper2 = null;

  const props = {
    handleCancel: jest.fn(),
    getRead180StudentWorkRequest: jest.fn(),
    setRead180StudentWorkData: jest.fn(),
    read180studentworkcontainer: {},
    data: {
      row: {
        communityId: 'RTNG',
        id: 'id',
        studentId: 'stud',
      },
    },
  };
  const props1 = {
    ...props,
    data: {
      row: {
        communityId: 'RTNG',
        id: 'id',
        studentId: undefined,
      },
    },
  };
  const props2 = {
    ...props,
    data: {
      row: {
        communityId: 'lll',
        id: 'id',
        studentId: undefined,
      },
    },
  };

  beforeEach(() => {
    wrapper = shallow(<Read180StudentWorkContainer {...props} />);
    wrapper1 = shallow(<Read180StudentWorkContainer {...props1} />);
    wrapper2 = shallow(<Read180StudentWorkContainer {...props2} />);
  });
  it('Should render Read180NgContainer when data is present ', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(shallowToJson(wrapper1)).toMatchSnapshot();
    expect(shallowToJson(wrapper2)).toMatchSnapshot();
  });

  it('Should call componentWillReceiveProps ', () => {
    const nextProps = {
      read180studentworkcontainer: {
        read180Program: '',
      },
    };
    wrapper.instance().setState({
      isFetch: false,
    });
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.state('isFetch')).toBeTruthy();
  });

  it('Should call componentWillReceiveProps ', () => {
    const nextProps = {
      read180studentworkcontainer: {
        read180Program: '',
      },
    };
    wrapper.instance().setState({
      isFetch: true,
    });
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.state('isFetch')).toBeTruthy();
  });

  it('Should call handlePreview  ', () => {
    const opts = {};
    wrapper.instance().handlePreview(opts);
    expect(wrapper.instance().props.getRead180StudentWorkRequest).toMatchSnapshot();
  });

  it('Should call savePostAssesment ', () => {
    const type = '';
    const rubricType = '';
    const comment = '';
    const scoreead180Data = '';
    wrapper.instance().savePostAssesment(type, rubricType, comment, scoreead180Data);
    expect(wrapper.instance().props.setRead180StudentWorkData).toMatchSnapshot();
  });
});
