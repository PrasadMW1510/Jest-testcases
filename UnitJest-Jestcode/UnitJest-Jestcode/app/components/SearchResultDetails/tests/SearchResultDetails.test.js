import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import SearchResultDetails from '../index';

describe('<SearchResultDetails />', () => {
  let wrapper = null;
  let wrapper1 = null;
  let wrapper2 = null;
  let wrapper4 = null;
  let wrapper5 = null;
  let wrapper6 = null;
  let wrapper7 = null;
  let wrapper8 = null;

  const propsy = {
    profileUserType: 'Teacher',
    changedInputVal: true,
    isOpen: true,
    hideModal: jest.fn(),
    detailsData: {
      Author: [
        {
          FirstName: 'FirstName',
          LastName: 'LastName',
        },
      ],
      IsFiction: ['1'],
      isSelected: true,
      Lexile: [''],
      LexileDisplay: ['0'],
    },
    prevSerd: jest.fn(),
    nextSerd: jest.fn(),
    changeQuizData: jest.fn(),
    removeSelItem: jest.fn(),
    changeFictionData: jest.fn(),
    addcustomItem: jest.fn(),
    saveQuizData: jest.fn(),
    saveTeacherMadeQuizData: jest.fn(),
    isEditable: true,
    isSelected: true,
    changeWordCountClassName: true,
    changeReadingLevelClassName: true,
    changePointsClassName: true,
    changeGRLClassName: true,
    data: {
      teacherMadeQuiz: ['true'],
      page: 'customList',
    },
  };
  const propsyy = {
    profileUserType: 'Teacher',
    isOpen: true,
    hideModal: jest.fn(),
    detailsData: {
      Author: [
        {
          FirstName: 'FirstName',
          LastName: 'LastName',
        },
      ],
      IsFiction: ['1'],
      isSelected: true,
      Lexile: [''],
      LexileDisplay: ['0'],
    },
    prevSerd: jest.fn(),
    nextSerd: jest.fn(),
    changeQuizData: jest.fn(),
    removeSelItem: jest.fn(),
    changeFictionData: jest.fn(),
    addcustomItem: jest.fn(),
    saveQuizData: jest.fn(),
    saveTeacherMadeQuizData: jest.fn(),
    isEditable: true,
    isSelected: true,
    changeWordCountClassName: true,
    changeReadingLevelClassName: true,
    changePointsClassName: true,
    changeGRLClassName: true,
    data: {
      teacherMadeQuiz: ['false'],
      page: 'customList',
    },
  };
  const props1 = {
    ...propsy,
    data: {
      teacherMadeQuiz: ['true'],
      page: 'searchResult',
    },
    changeWordCountClassName: false,
    changeReadingLevelClassName: false,
    changePointsClassName: false,
    changeGRLClassName: false,
  };
  const props2 = {
    ...propsy,
    isSelected: false,
    isEditable: false,
  };
  const props4 = {
    ...propsy,
    data: {
      teacherMadeQuiz: ['false'],
      page: 'customList',
    },
  };
  const props5 = {
    ...propsy,
    data: {
      teacherMadeQuiz: ['false'],
      page: 'customList',
    },
    isSelected: false,
    isEditable: false,
  };
  const props6 = {
    ...propsy,
    data: {
      teacherMadeQuiz: ['false'],
      page: 'customL',
    },
    isSelected: false,
  };
  const props7 = {
    ...propsy,
    detailsData: {
      Author: [
        {
          FirstName: 'FirstName',
          LastName: 'LastName',
        },
      ],
      IsFiction: ['1'],
      isSelected: true,
    },
  };
  wrapper = shallow(<SearchResultDetails {...propsy} />);
  wrapper1 = shallow(<SearchResultDetails {...props1} />);
  wrapper2 = shallow(<SearchResultDetails {...props2} />);
  wrapper4 = shallow(<SearchResultDetails {...props4} />);
  wrapper5 = shallow(<SearchResultDetails {...props5} />);
  wrapper6 = shallow(<SearchResultDetails {...props6} />);
  wrapper7 = shallow(<SearchResultDetails {...props7} />);
  wrapper8 = shallow(<SearchResultDetails {...propsyy} />);

  it('Expect to have unit tests specified', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(shallowToJson(wrapper1)).toMatchSnapshot();
    expect(shallowToJson(wrapper2)).toMatchSnapshot();
    expect(shallowToJson(wrapper4)).toMatchSnapshot();
    expect(shallowToJson(wrapper5)).toMatchSnapshot();
    expect(shallowToJson(wrapper6)).toMatchSnapshot();
    expect(shallowToJson(wrapper7)).toMatchSnapshot();
    expect(shallowToJson(wrapper8)).toMatchSnapshot();
  });
  it('should call onchange', () => {
    const onchange1 = wrapper.find('#words');
    onchange1.simulate('change');
    expect(wrapper.instance().props.changeQuizData).toBeCalled();
  });
  it('should call onchange', () => {
    const onchange2 = wrapper.find('#lexile');
    onchange2.simulate('change');
    expect(wrapper.instance().props.changeQuizData).toBeCalled();
  });
  it('should call onchange', () => {
    const onchange3 = wrapper.find('#readingLevel');
    onchange3.simulate('change');
    expect(wrapper.instance().props.changeQuizData).toBeCalled();
  });
  it('should call onchange', () => {
    const onchange4 = wrapper.find('#points');
    onchange4.simulate('change');
    expect(wrapper.instance().props.changeQuizData).toBeCalled();
  });
  it('should call onchange', () => {
    const onchange5 = wrapper.find('#GRL');
    onchange5.simulate('change');
    expect(wrapper.instance().props.changeQuizData).toBeCalled();
  });
  it('should call onchange', () => {
    const onchange6 = wrapper.find('#fiction');
    onchange6.simulate('change');
    expect(wrapper.instance().props.changeQuizData).toBeCalled();
  });
  it('should call onchange', () => {
    const onchange7 = wrapper.find('#non-fiction');
    onchange7.simulate('change');
    expect(wrapper.instance().props.changeQuizData).toBeCalled();
  });
  it('should call onchangeddddddddddddddddd', () => {
    const onchange8 = wrapper4.find('.search-result-details-text input').at(0);
    onchange8.simulate('change');
    expect(wrapper.instance().props.changeQuizData).toBeCalled();
  });
  it('should call onchangeddddddddddddddddd', () => {
    const onchange9 = wrapper4.find('.search-result-details-text input').at(1);
    onchange9.simulate('change');
    expect(wrapper.instance().props.changeQuizData).toBeCalled();
  });
});
