import { takeLatest, put, select } from 'redux-saga/effects';
import defaultSaga, * as Saga from '../saga';
import * as Selectors from '../../App/selectors';
import * as Actions from '../actions';
import * as Constants from '../constants';
/* eslint-disable redux-saga/yield-effects */
describe('CustomListContainer Saga', () => {
  let generator = null;
  let selectSelector = null;
  let mockEpochTime = null;

  beforeEach(() => {
    selectSelector = jest.fn();
    jest.spyOn(Selectors, 'makeSelectProfileSessionId').mockReturnValue(selectSelector);
    mockEpochTime = 1516120801689;
    jest.spyOn(Date.prototype, 'getTime').mockReturnValue(mockEpochTime);
  });
  describe('exportCustomQuizRequest', () => {
    let err = null;
    const action = {
      quizListexportData: {
        oldName: '',
        newName: '',
      },
    };

    beforeEach(() => {
      err = 'mock error';
      generator = Saga.exportCustomQuizRequest(action);
    });

    it('getExportCustomQuizListDatasuccess', () => {
      const selectDescriptor = generator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
      const selectDescriptor1 = generator.next().value;
      expect(selectDescriptor1).toMatchSnapshot();
      const putDescriptor1 = generator.next(action).value;
      expect(putDescriptor1).toMatchSnapshot();
    });

    it('getExportDataFailure', () => {
      expect(generator.next().value).toEqual(select(selectSelector));
      expect(generator.throw(err).value).toEqual(put(Actions.getExportDataFailure(err)));
    });
  });
  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });
    it('Expects default Sagas are called', () => {
      expect(generator.next().value).toEqual(
        takeLatest(Constants.EXPORT_CUSTOM_QUIZ_LIST, Saga.exportCustomQuizRequest)
      );
    });
  });
});
