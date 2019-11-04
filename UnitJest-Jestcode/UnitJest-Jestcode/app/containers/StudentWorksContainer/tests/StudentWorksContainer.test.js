import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { StudentWorksContainer, mapDispatchToProps } from '../StudentWorksContainer';

describe('<StudentWorksContainer />', () => {
  let wrapper = null;
  let wrapper1 = null;
  let wrapper2 = null;
  let wrapper3 = null;
  const props = {
    showInboxProgram: jest.fn(),
    showMath180Modal: jest.fn(),
    showRead180NgModal: jest.fn(),
    showRead180StudentWorkModal: jest.fn(),
    showIReadStudentWorkModal: jest.fn(),
    profileUserType: 'Administrator',
    makeSelectProfileUserId: '',
    makeSelectLoginUserOrg: 'School',
    showSystem44StudentGoalsModal: jest.fn(),
    studentworkscontainer: {
      treeData: '',
    },
    makeSelectProfileUserOrgId: '',
    getGradeDetailsRequest: jest.fn(),
    getPortfolioClassDetailsRequest: jest.fn(),
    getSchoolDetailsRequest: jest.fn(),
    location: {},
    districtProfile: '',
  };
  const props1 = {
    ...props,
    profileUserType: 'Tech',
  };
  const props2 = {
    ...props,
    profileUserType: 'Teacher',
  };
  const props3 = {
    ...props,
    profileUserType: 'Tea',
  };
  wrapper = shallow(<StudentWorksContainer {...props} />);
  wrapper1 = shallow(<StudentWorksContainer {...props1} />);
  wrapper2 = shallow(<StudentWorksContainer {...props2} />);
  wrapper3 = shallow(<StudentWorksContainer {...props3} />);
  it('Expect to render correctly', () => {
    wrapper.instance().setState({
      propsUser: 'Administrator',
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render correctly', () => {
    wrapper1.instance().setState({
      propsUser: 'Tech',
    });
    expect(shallowToJson(wrapper1)).toMatchSnapshot();
  });
  it('Expect to render correctly', () => {
    wrapper2.instance().setState({
      propsUser: 'Teacher',
    });
    expect(shallowToJson(wrapper2)).toMatchSnapshot();
  });
  it('Expect to render correctly', () => {
    wrapper3.instance().setState({
      propsUser: 'Teacher',
    });
    expect(shallowToJson(wrapper3)).toMatchSnapshot();
  });
  it('map Dispatch To Props', () => {
    const mockObject = jest.fn;
    const mapDispatchToPropscomp = mapDispatchToProps(mockObject);
    expect(mapDispatchToPropscomp.getSchoolDetailsRequest().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.getGradeDetailsRequest().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.getTeachersDetailsRequest().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.getPortfolioClassDetailsRequest().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.getStudentEnrolment().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.getStudentsSubmissionTreeList().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.getStudentsSubmissionNodeList().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.showInboxProgram().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.getStudentsSubmissionMetadataSW().mock.calls.length).toBe(0);
  });
});
