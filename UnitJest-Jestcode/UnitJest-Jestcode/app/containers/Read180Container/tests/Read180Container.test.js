import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { Read180Container, mapDispatchToProps } from '../Read180Container';

describe('<Read180Container  />', () => {
  let wrapper = null;
  const props = {
    studentworkscontainer: {},
    selectedClassAssignments: [],
  };
  wrapper = shallow(
    <Read180Container
      {...props}
      hideModal={jest.fn()}
      getRead180DataRequest={jest.fn()}
      getRead180StudentWorkRequest={jest.fn()}
      showread180RespondWriteModal={jest.fn()}
    />
  );
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render requestData ', () => {
    const row = {
      communityId: 'RTNG',
      studentId: 'stud',
    };
    wrapper.instance().requestData(row);
    expect(wrapper.instance().props.getRead180StudentWorkRequest).toBeCalled();
  });
  it('Expect to render requestData ', () => {
    const row = {
      communityId: 'RTNG',
      studentId: undefined,
    };
    wrapper.instance().requestData(row);
    expect(wrapper.instance().props.getRead180StudentWorkRequest).toBeCalled();
  });
  it('Expect to render requestData ', () => {
    const row = {
      communityId: 'R180NG',
      studentId: 'stud',
    };
    wrapper.instance().requestData(row);
    expect(wrapper.instance().props.getRead180DataRequest).toBeCalled();
  });
  it('Expect to render requestData ', () => {
    const row = {
      communityId: 'R180NG',
      studentId: undefined,
    };
    wrapper.instance().requestData(row);
    expect(wrapper.instance().props.getRead180DataRequest).toBeCalled();
  });

  it('map Dispatch To Props', () => {
    const mockObject = jest.fn;
    const mapDispatchToPropscomp = mapDispatchToProps(mockObject);
    expect(mapDispatchToPropscomp.hideModal().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.getRead180StudentWorkRequest().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.getRead180DataRequest().mock.calls.length).toBe(0);
  });
});
