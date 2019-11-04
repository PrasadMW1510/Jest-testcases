import { fromJS } from 'immutable';
import makeSelectStudentWorksContainer, { schoolList } from '../selectors';

describe('Student Works Containerselector', () => {
  it('should select the student works', () => {
    const studentWorksContainer = fromJS({
      studentWorksContainer: { name: 'test' },
    });
    const mockedState = fromJS({
      studentWorksContainer,
    });
    expect(makeSelectStudentWorksContainer()(mockedState)).toEqual(studentWorksContainer.toJS());
  });
  it('should select the student works', () => {
    const studentWorksContainer = fromJS({
      studentWorksContainer: { name: 'test' },
    });
    const mockedState = fromJS({
      studentWorksContainer,
    });
    expect(schoolList()(mockedState)).toEqual(studentWorksContainer.toJS());
  });
});
