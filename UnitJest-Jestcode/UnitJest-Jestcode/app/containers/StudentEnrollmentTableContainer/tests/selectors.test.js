import { fromJS } from 'immutable';
import {
  makeSelectStudentEnrollTableContainer,
  selectLoading,
  selectPaginationData,
  makeSelectLoading,
  selectStudentEnroll,
} from '../selectors';

describe('makeSelectStudentEnrollTableContainer selectors', () => {
  it('should select pagination data', () => {
    const studentEnrollInfo = fromJS({
      studentEnrolled: ['member1', 'member2'],
      itemCount: 5000,
      paginationData: {
        current_page: ['20'],
      },
    });
    expect(selectPaginationData(studentEnrollInfo)).toEqual({
      itemCount: 5000,
      current_page: ['20'],
    });
  });

  it('should select inactive members', () => {
    const studentEnrollInfo = fromJS({
      studentsEnrolled: ['member1', 'member2'],
    });
    expect(selectStudentEnroll(studentEnrollInfo)).toEqual(['member1', 'member2']);
  });

  it('should select loading status', () => {
    const studentEnrollInfo = fromJS({
      loading: true,
    });
    expect(selectLoading(studentEnrollInfo)).toEqual(true);
  });

  it('should select the domain state', () => {
    const domainState = fromJS({
      studentEnroll: {
        studentEnrolled: ['member1', 'member2'],
        loading: true,
      },
    });
    const mockedState = fromJS({
      domainState,
    });
    expect(makeSelectStudentEnrollTableContainer()(mockedState)).toEqual(
      domainState.getIn('studentEnroll')
    );
  });

  it('makeSelectLoading', () => {
    const studentEnrollInfo = fromJS({
      loading: false,
    });
    const mockedState = fromJS({
      studentEnrollInfo,
    });

    expect(makeSelectLoading()(mockedState)).toBeFalsy();
  });
});
