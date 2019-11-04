import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import {
  System44SuccessRecordContainer,
  mapDispatchToProps,
} from '../System44SuccessRecordContainer';

describe('<System44SuccessRecordContainer />', () => {
  let wrapper = null;
  let wrapper1 = null;
  let wrapper2 = null;
  let wrapper3 = null;
  const props = {
    clearState: jest.fn(),
    handleCancel: jest.fn(),
    getAssignmentSuccessRecordRequest: jest.fn(),
    showSystem44SuccessRecordModal: jest.fn(),
    data: {
      rowData: {
        community_id: 'S44JR',
      },
    },
    showInboxProgram: jest.fn(),
    showRead180NgModal: jest.fn(),
    tempGridData: [],
    system44successrecordcontainer: {
      getAssignmentSuccessRecordData: {
        workItems: [
          {
            iReadSuccessRecWorkItem: ['a'],
            sys44SuccessPassageRecWorkItem: ['b'],
            read180FluencyRecWorkItem: ['c'],
          },
        ],
      },
    },
    assignmentSuccessRecordSaveRequest: jest.fn(),
  };
  const props1 = {
    ...props,
    data: {
      rowData: {
        community_id: 'S44NG',
      },
    },
  };
  const props2 = {
    ...props,
    data: {
      rowData: {
        community_id: 'R180NG',
      },
    },
  };
  const props3 = {
    ...props,
    data: {
      rowData: {
        community_id: 'R180NG111',
      },
    },
  };
  wrapper = shallow(<System44SuccessRecordContainer {...props} />);
  wrapper1 = shallow(<System44SuccessRecordContainer {...props1} />);
  wrapper2 = shallow(<System44SuccessRecordContainer {...props2} />);
  wrapper3 = shallow(<System44SuccessRecordContainer {...props3} />);

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(shallowToJson(wrapper1)).toMatchSnapshot();
    expect(shallowToJson(wrapper2)).toMatchSnapshot();
    expect(shallowToJson(wrapper3)).toMatchSnapshot();
  });

  it('Expect to call  clearState and handleCancel methods atleast one time', () => {
    wrapper.instance().handleCloseModal();
    expect(wrapper.props().clearState.mock.calls.length).toBe(1);
    expect(wrapper.props().handleCancel.mock.calls.length).toBe(1);
  });

  it('Expect to call dispatchAction', () => {
    const currentIndex = 0;
    const rowData = {
      assignment: 'Success Recording',
      community_id: 'R180NG',
    };
    wrapper.instance().dispatchAction(rowData, currentIndex);
    expect(wrapper.props().showSystem44SuccessRecordModal.mock.calls.length).toBe(1);
  });

  it('Expect to call dispatchAction', () => {
    const currentIndex = 0;
    const rowData = {
      assignment: 'Final Recording',
      community_id: 'R180NG',
    };
    wrapper.instance().dispatchAction(rowData, currentIndex);
    expect(wrapper.props().showSystem44SuccessRecordModal.mock.calls.length).toBe(2);
  });

  it('Expect to call dispatchAction', () => {
    const currentIndex = 0;
    const rowData = {
      assignment: 'Success Recording',
      community_id: 'R180NG1',
    };
    wrapper.instance().dispatchAction(rowData, currentIndex);
    expect(wrapper.props().showSystem44SuccessRecordModal.mock.calls.length).toBe(3);
  });
  it('map Dispatch To Props', () => {
    const mockObject = jest.fn;
    const mapDispatchToPropscomp = mapDispatchToProps(mockObject);
    expect(mapDispatchToPropscomp.getAssignmentSuccessRecordRequest().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.assignmentSuccessRecordSaveRequest().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.handleCancel().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.showSystem44SuccessRecordModal().mock.calls.length).toBe(0);
  });
});
