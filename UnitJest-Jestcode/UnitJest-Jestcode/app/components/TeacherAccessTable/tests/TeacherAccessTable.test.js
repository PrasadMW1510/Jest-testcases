import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import TeacherAccessTable from '../TeacherAccessTable';

describe('<TeacherAccessTable /> All Views', () => {
  let wrapper = null;
  let handleToggle = null;
  let gridList = null;
  let headers = null;
  let footers = null;
  let isDataInitialized = null;
  let isDataLoading = null;
  let paginationData = null;
  let teacherEnrollRequest = null;
  let isolateTab = null;
  let handleTabIsolate = null;
  let teacherAccessSaveRequest = null;
  let handleCancel = null;
  let handleTabReset = null;

  beforeEach(() => {
    headers = [
      ['Common Core Code X Course I'],
      ['Common Core Code X Course II'],
      ['Common Core Code X Course III'],
    ];
    isDataLoading = false;
    handleToggle = jest.fn();
    teacherEnrollRequest = jest.fn();
    teacherAccessSaveRequest = jest.fn();
    handleTabIsolate = jest.fn();
    handleCancel = jest.fn();
    handleTabReset = jest.fn();
    paginationData = {
      current_page: ['0'],
      itemCount: '2083',
      items_per_page: ['250'],
      page_count: ['9'],
      paginate: ['true'],
    };
    gridList = [
      [
        'Teachers',
        'Common Core Code X Course I Teacher',
        'Common Core Code X Course II Teacher',
        'Common Core Code X Course III Teacher',
      ],
      ['1, Editorial', true, true, true],
      ['1, Editorial2', false, true, true],
    ];
    footers = [386, 409, 665];
    isolateTab = false;
    isDataInitialized = true;

    wrapper = shallow(
      <TeacherAccessTable
        handleToggle={handleToggle}
        gridList={gridList}
        headers={headers}
        footers={footers}
        isDataInitialized={isDataInitialized}
        isDataLoading={isDataLoading}
        paginationData={paginationData}
        teacherEnrollRequest={teacherEnrollRequest}
        isolateTab={isolateTab}
        handleTabIsolate={handleTabIsolate}
        teacherAccessSaveRequest={teacherAccessSaveRequest}
        handleCancel={handleCancel}
        handleTabReset={handleTabReset}
      />
    );
  });

  it('Should match the snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
