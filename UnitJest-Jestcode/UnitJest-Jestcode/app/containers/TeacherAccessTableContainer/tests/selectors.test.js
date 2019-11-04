import { fromJS } from 'immutable';
import {
  makeSelectTeacherAccessTableContainer,
  selectLoading,
  selectTeacherAccess,
  selectPaginationData,
  selectSaveSuccess,
  makeSelectLoading,
  makeSelectAppLoading,
} from '../selectors';

describe('makeSelectTeacherAccessTableContainer selectors', () => {
  it('should select inactive members', () => {
    const teacherAccessInfo = fromJS({
      teachersEnrolled: ['member1', 'member2'],
    });
    expect(selectTeacherAccess(teacherAccessInfo)).toEqual(['member1', 'member2']);
  });

  it('should select pagination data', () => {
    const teacherAccessInfo = fromJS({
      teachersEnrolled: ['member1', 'member2'],
      itemCount: 5000,
      paginationData: {
        current_page: ['20'],
      },
    });
    expect(selectPaginationData(teacherAccessInfo)).toEqual({
      itemCount: 5000,
      current_page: ['20'],
    });
  });

  it('should select loading status', () => {
    const teacherAccessInfo = fromJS({
      loading: true,
    });
    expect(selectLoading(teacherAccessInfo)).toEqual(true);
  });

  it('should select save status', () => {
    const teacherAccessInfo = fromJS({
      saveSuccess: true,
    });
    expect(selectSaveSuccess(teacherAccessInfo)).toEqual(true);
  });

  it('should select the domain state', () => {
    const domainState = fromJS({
      teacherEnroll: {
        teachersEnrolled: ['member1', 'member2'],
        loading: true,
      },
    });
    const mockedState = fromJS({
      domainState,
    });
    expect(makeSelectTeacherAccessTableContainer()(mockedState)).toEqual(
      domainState.getIn('teacherEnroll')
    );
  });

  it('makeSelectLoading', () => {
    const messageContainer = fromJS({
      loading: false,
    });
    const mockedState = fromJS({
      messageContainer,
    });

    expect(makeSelectLoading()(mockedState)).toBeFalsy();
  });

  it('makeSelectAppLoading', () => {
    const messageContainer = fromJS({
      loadingApps: false,
    });
    const mockedState = fromJS({
      messageContainer,
    });

    expect(makeSelectAppLoading()(mockedState)).toBeFalsy();
  });
});
