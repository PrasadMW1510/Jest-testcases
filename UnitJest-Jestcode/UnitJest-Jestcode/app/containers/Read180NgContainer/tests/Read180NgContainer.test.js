import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { Read180NgContainer } from '../Read180NgContainer';

describe('Read180NgContainer ', () => {
  let wrapper = null;
  let wrapper1 = null;
  let wrapper2 = null;

  const mockgetRead180DataRequest = jest.fn();
  const mockread180NgContainer = {};
  const mockdata = {
    row: {
      communityId: 'R180NG',
      studentId: 'stud',
      workItemId: 'work',
    },
  };
  const mockdata1 = {
    row: {
      communityId: 'R180G',
      studentId: undefined,
    },
  };
  const mockdata2 = {
    row: {
      communityId: 'R180NG',
      studentId: undefined,
    },
  };
  const mockread180ngRequest = jest.fn();
  beforeEach(() => {
    wrapper = shallow(
      <Read180NgContainer
        getRead180DataRequest={mockgetRead180DataRequest}
        read180NgContainer={mockread180NgContainer}
        data={mockdata}
        read180ngRequest={mockread180ngRequest}
        setRead180NgData={jest.fn()}
        hideModal={jest.fn()}
        deleteAssignmentData={jest.fn()}
      />
    );
    wrapper1 = shallow(
      <Read180NgContainer
        getRead180DataRequest={mockgetRead180DataRequest}
        read180NgContainer={mockread180NgContainer}
        read180ngRequest={mockread180ngRequest}
        setRead180NgData={jest.fn()}
        hideModal={jest.fn()}
        data={mockdata1}
      />
    );
    wrapper2 = shallow(
      <Read180NgContainer
        getRead180DataRequest={mockgetRead180DataRequest}
        read180NgContainer={mockread180NgContainer}
        read180ngRequest={mockread180ngRequest}
        setRead180NgData={jest.fn()}
        hideModal={jest.fn()}
        data={mockdata2}
      />
    );
  });
  it('Should render Read180NgContainer when data is present ', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render Read180NgContainer when no data  ', () => {
    expect(shallowToJson(wrapper1)).toMatchSnapshot();
    expect(shallowToJson(wrapper2)).toMatchSnapshot();
  });
  it('Should call componentWillReceiveProps ', () => {
    const nextProps = {
      read180NgContainer: {
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
      read180NgContainer: {
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
    expect(wrapper.instance().props.read180ngRequest).toMatchSnapshot();
  });
  it('Should call postRead180NgDataSubmit   ', () => {
    const read180Data = {};
    wrapper.instance().postRead180NgDataSubmit(read180Data);
    expect(wrapper.instance().props.setRead180NgData).toMatchSnapshot();
  });
  it('Should call deleteAssignment', () => {
    wrapper.instance().deleteAssignment();
    expect(wrapper.instance().props.deleteAssignmentData).toMatchSnapshot();
  });
});
