import React from 'react';
import { shallow } from 'enzyme';
import TeacherMadeQuizList from '../TeacherMadeQuizList';

describe('<List/>', () => {
  let wrapper = null;
  let wrapper1 = null;
  let wrapper2 = null;
  const props = {
    data: [
      {
        Title: ['a'],
        QuizID: '1',
      },
      {
        name: 'Book 1',
        QuizID: '1',
        Title: ['b'],
      },
    ],
  };
  const props1 = {
    data: [
      {
        Title: ['b'],
        QuizID: '2',
      },
      {
        name: 'Book 1',
        QuizID: '2',
        Title: ['a'],
      },
    ],
  };
  const props2 = {
    data: [
      {
        Title: ['b'],
        QuizID: '3',
      },
      {
        name: 'Book 1',
        QuizID: '3',
        Title: ['b'],
      },
    ],
  };
  const mockcliclHandler = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<TeacherMadeQuizList {...props} key={[]} cliclHandler={mockcliclHandler} />);
    wrapper1 = shallow(
      <TeacherMadeQuizList {...props1} key={[]} cliclHandler={mockcliclHandler} />
    );
    wrapper2 = shallow(
      <TeacherMadeQuizList {...props2} key={[]} cliclHandler={mockcliclHandler} />
    );
  });
  it('Expect to render correctly', () => {
    wrapper
      .find('Link')
      .at(0)
      .simulate('click', { preventDefault: () => {} });
    expect(mockcliclHandler).toHaveBeenCalled();
    expect(wrapper1).toMatchSnapshot();
    expect(wrapper2).toMatchSnapshot();
  });
});
