import React from 'react';
import { shallow } from 'enzyme';
import Installedquiz from 'components/InstalledQuiz';

describe('<Installedquiz />', () => {
  const data = {
    Count: [2, 6],
    TeacherMadeCount: [4],
  };
  const props = {
    editQuizCollectionModalData: jest.fn(),
    quizModalData: jest.fn(),
    callbackFromParent: jest.fn(),
  };

  beforeEach(() => {
    jest.spyOn(window, 'open');
  });
  afterEach(() => {
    window.open.mockRestore();
  });

  it('Expect to render section correctly', () => {
    const wrapper = shallow(<Installedquiz data={data} {...props} />);
    expect(wrapper.find('.quizz').length).toBe(0);
  });
  it('Expect to render section correctly', () => {
    const data1 = { ...data, Count: [] };
    const wrapper = shallow(<Installedquiz data={data1} {...props} />);
    expect(wrapper.find('.quizz').length).toBe(0);
  });
  it('on Install Quiz Button Click', () => {
    const wrapper = shallow(<Installedquiz data={data} {...props} />);
    expect(wrapper.find('Link')).toHaveLength(3);
  });
  it('on Install Quiz Button Click', () => {
    const data2 = {
      Count: [2, 6],
      TeacherMadeCount: [4],
      preventDefault: jest.fn(),
    };
    const e = {
      preventDefault: jest.fn(),
    };
    const ev = {
      preventDefault: jest.fn(),
    };
    const wrapper = shallow(<Installedquiz data={data2} {...props} />);
    wrapper.instance().onInstallQuizButtonClick(e);
    wrapper.instance().handleEditQuizCollectionNames(ev);
    wrapper.instance().handleAddTeacherMadeQuiz(ev);
    wrapper.instance().onTeachClick(e);
    const onclick = wrapper.find('a');
    onclick.simulate('click', { preventDefault() {} });
  });
});
