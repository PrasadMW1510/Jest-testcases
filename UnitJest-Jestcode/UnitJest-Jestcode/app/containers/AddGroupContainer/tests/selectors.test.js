import { fromJS } from 'immutable';
import * as Selectors from '../selectors';

describe('selectAddGroupContainerDomain', () => {
  it('Should return the add group container', () => {
    const addGroupContainer = fromJS({
      classesWithStudents: {
        name: 'test',
      },
    });
    const mockedAddGroupContainer = fromJS({
      addGroupContainer,
    });
    expect(Selectors.makeSelectClassInfoWithStudent()(mockedAddGroupContainer)).toEqual(
      addGroupContainer.get('classesWithStudents')
    );
  });

  it('should return post group id', () => {
    const addGroupContainer = fromJS({
      postGroupId: [
        {
          name: '9494',
        },
      ],
    });
    const mockedStoredSchoolId = fromJS({
      addGroupContainer,
    });
    expect(Selectors.makeSelectPostGroupId()(mockedStoredSchoolId)).toEqual(
      addGroupContainer.getIn(['postGroupId', 0])
    );
  });

  it('return error for post group id', () => {
    const addGroupContainer = fromJS({
      errorPostGroupId: [
        {
          schoolId: '9494',
        },
      ],
    });
    const mockedStoredSchoolId = fromJS({
      addGroupContainer,
    });
    expect(Selectors.makeSelectPostGroupFailure()(mockedStoredSchoolId)).toEqual(
      addGroupContainer.getIn(['errorPostGroupId'])
    );
  });

  it('return get group info success', () => {
    const addGroupContainer = fromJS({
      getGroupInfoSuccess: [
        {
          group_id: ['123'],
        },
      ],
    });
    const mockedStoreSchoolId = fromJS({
      addGroupContainer,
    });
    expect(Selectors.makeSelectGroupInfo()(mockedStoreSchoolId)).toEqual(
      addGroupContainer.getIn(['getGroupInfoSuccess'])
    );
  });
});
