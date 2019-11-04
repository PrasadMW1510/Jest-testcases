import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { StudentWorkProgramsContainer, mapDispatchToProps } from '../StudentWorkProgramsContainer';

describe('Student Work Programs Container', () => {
  let wrapper = null;
  const mockdata = [{}];
  const mockgetIreadStudentWorkData = jest.fn();
  const mockhideModal = jest.fn();
  const mockhandleSave = jest.fn();
  const mockhandleDelete = jest.fn();
  const mockshowDeleteModal = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <StudentWorkProgramsContainer
        data={mockdata}
        getIreadStudentWorkData={mockgetIreadStudentWorkData}
        hideModal={mockhideModal}
        handleSave={mockhandleSave}
        handleDelete={mockhandleDelete}
        showDeleteModal={mockshowDeleteModal}
      />
    );
  });
  it('Should render StudentWorkProgramsContainer', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('map Dispatch To Props', () => {
    const mockObject = jest.fn;
    const mapDispatchToPropscomp = mapDispatchToProps(mockObject);
    expect(mapDispatchToPropscomp.hideModal().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.getIreadStudentWorkData().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.handleSave().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.handleDelete().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.showDeleteModal().mock.calls.length).toBe(0);
  });
});
