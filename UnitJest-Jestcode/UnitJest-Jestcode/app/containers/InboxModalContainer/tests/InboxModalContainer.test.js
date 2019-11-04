import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { InboxModalContainer } from '../InboxModalContainer';

describe('InboxModalContainer ', () => {
  let wrapper = null;
  let wrapper1 = null;
  let wrapper2 = null;

  const mockhideModal = jest.fn();
  const mockportfolioPageContainer = {};
  const mockdata = {
    allData: ['sdbdcjh', 'ahsbdxhah'],
    row: {
      id: 'jhjadgckha_Akjsjhbd',
      studentId: 'khkgkh_hgh',
    },
  };
  const mockdata1 = {
    allData: [],
    row: {
      id: 'jhjadgckha_Akjsjhbd',
      studentId: undefined,
    },
  };
  beforeEach(() => {
    wrapper = shallow(
      <InboxModalContainer
        hideModal={mockhideModal}
        data={mockdata}
        storeEvaluationUpdate={jest.fn()}
        getStudentProgramDetailsDataRequest={jest.fn()}
        portfolioPageContainer={mockportfolioPageContainer}
        getQuestion={jest.fn()}
      />
    );
    wrapper2 = shallow(
      <InboxModalContainer
        hideModal={mockhideModal}
        data={mockdata1}
        storeEvaluationUpdate={jest.fn()}
        getStudentProgramDetailsDataRequest={jest.fn()}
        portfolioPageContainer={mockportfolioPageContainer}
        getQuestion={jest.fn()}
      />
    );
    wrapper1 = shallow(
      <InboxModalContainer
        hideModal={mockhideModal}
        storeEvaluationUpdate={jest.fn()}
        getStudentProgramDetailsDataRequest={jest.fn()}
        portfolioPageContainer={mockportfolioPageContainer}
        getQuestion={jest.fn()}
      />
    );
  });
  it('Should render InboxModalContainer', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(shallowToJson(wrapper1)).toMatchSnapshot();
    expect(shallowToJson(wrapper2)).toMatchSnapshot();
  });
  it('Should render componentWillReceiveProps true', () => {
    const nextProps = {
      portfolioPageContainer: {
        searchResultDetailsData: [],
      },
    };
    wrapper.instance().setState({
      isFetch: false,
    });
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.state('isFetch')).toEqual(true);
  });
  it('Should render componentWillReceiveProps false', () => {
    const nextProps = {
      portfolioPageContainer: {
        searchResultDetailsData: [],
      },
    };
    wrapper.instance().setState({
      isFetch: true,
    });
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.state('isFetch')).toEqual(true);
  });
  it('Should render componentWillReceiveProps false', () => {
    const nextProps = {
      portfolioPageContainer: {},
    };
    wrapper.instance().setState({
      isFetch: true,
    });
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.state('isFetch')).toEqual(true);
  });

  it('Should render nextSerd if ', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().setState({
      currentIndex: 1,
    });
    wrapper.instance().nextSerd(e);
    expect(wrapper.instance().props.data).toMatchSnapshot();
  });
  it('Should render nextSerd else ', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().setState({
      currentIndex: 0,
    });
    wrapper.instance().nextSerd(e);
    expect(wrapper.instance().props.data).toMatchSnapshot();
  });
  it('Should render prevSerd if ', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().setState({
      currentIndex: 1,
    });
    wrapper.instance().prevSerd(e);
    expect(wrapper.instance().props.data).toMatchSnapshot();
  });
  it('Should render prevSerd else ', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().setState({
      currentIndex: 2,
    });
    wrapper.instance().prevSerd(e);
    expect(wrapper.instance().props.data).toMatchSnapshot();
  });
  it('Should render saveQuestion ', () => {
    const evaluationData = {
      submissionType: 'type',
      studentID: 'student',
      teacherID: 'teach',
      rubicType: 'rubic',
      workItemID: 'work',
      questionNum: 1,
      comment: 'hi',
      score: 'jsd',
    };
    wrapper.instance().saveQuestion(evaluationData);
  });
  it('Should render saveQuestion else', () => {
    const evaluationData = {
      submissionType: 'type',
      studentID: 'student',
      teacherID: 'teach',
      rubicType: 'rubic',
      workItemID: 'work',
      questionNum: 1,
      comment: '',
      score: '',
    };
    wrapper.instance().saveQuestion(evaluationData);
  });
});
