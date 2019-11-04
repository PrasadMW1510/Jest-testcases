import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { TeacherMadeQuizContainer, mapDispatchToProps } from '../TeacherMadeQuizContainer';

describe('Teacher Made Quiz Container', () => {
  let wrapper = null;
  const mockgetInstalledQuizDataRequest = jest.fn();
  const mockpostTeacherMadeQuizRequest = jest.fn();
  const mockgetTeacherMadeQuizDetailsRequest = jest.fn();
  const mockdeleteQuiz = jest.fn();
  beforeEach(() => {
    wrapper = shallow(
      <TeacherMadeQuizContainer
        getInstalledQuizDataRequest={mockgetInstalledQuizDataRequest}
        postTeacherMadeQuizRequest={mockpostTeacherMadeQuizRequest}
        getTeacherMadeQuizDetailsRequest={mockgetTeacherMadeQuizDetailsRequest}
        deleteQuiz={mockdeleteQuiz}
        handleCancel={jest.fn()}
        handleSave={jest.fn()}
        installedQuizData={[]}
        loadQuizDetails={jest.fn()}
        hideModal={jest.fn()}
      />
    );
  });
  it('Should render TeacherMadeQuizContainer', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('map Dispatch To Props', () => {
    const mockObject = jest.fn;
    const mapDispatchToPropscomp = mapDispatchToProps(mockObject);
    expect(mapDispatchToPropscomp.handleCancel().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.handleSave().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.getInstalledQuizDataRequest().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.loadQuizDetails().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.deleteQuiz().mock.calls.length).toBe(0);
  });
});
