import { takeLatest, put, all } from 'redux-saga/effects';
import { hideModal } from 'containers/ModalController/actions';
import defaultSaga, * as Saga from '../saga';
import * as Selectors from '../../App/selectors';
import * as Actions from '../actions';
import * as Constants from '../constants';
/* eslint-disable redux-saga/yield-effects */
describe('PrintBookLabel Saga', () => {
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
      bookLabelPreviewData: {
        selectedOption: 'tallBook',
        checked: ['3', '1', '2', 'showReadingLevel'],
        labelVal: 'Label Value',
      },
      bookId: [
        {
          ID: ['ggg'],
        },
      ],
    };
    it('getPreviewDataSuccess', () => {
      generator = Saga.printBookLabelRequest(action);
      const selectDescriptor = generator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
      const selectDescriptor1 = generator.next('Session123').value;
      expect(selectDescriptor1).toMatchSnapshot();
      const putDescriptor2 = generator.next().value;
      expect(putDescriptor2).toEqual(put(hideModal()));
    });
    it('getPreviewDataSuccesselse', () => {
      const action1 = {
        bookLabelPreviewData: {
          selectedOption: 'iii',
          checked: ['3', '1', '2', 'showReadingLevel'],
          labelVal: 'Label Value',
        },
        bookId: [
          {
            ID: ['ggg'],
          },
        ],
      };
      generator = Saga.printBookLabelRequest(action1);
      const selectDescriptor = generator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
      const selectDescriptor1 = generator.next('Session123').value;
      expect(selectDescriptor1).toMatchSnapshot();
      const putDescriptor2 = generator.next().value;
      expect(putDescriptor2).toEqual(put(hideModal()));
    });
    it('getPreviewDataFailure', () => {
      const action1 = {
        bookLabelPreviewData: {
          selectedOption: '',
        },
        bookId: [
          {
            ID: ['ggg'],
          },
        ],
      };
      generator = Saga.printBookLabelRequest(action1);
      const selectDescriptor = generator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
      err = 'mock error';
      expect(generator.throw(err).value).toEqual(put(Actions.getPreviewDataFailure(err)));
    });
  });
  describe('defaultSaga', () => {
    beforeAll(() => {
      generator = defaultSaga();
    });
    it('All calls are made', () => {
      expect(generator.next().value).toEqual(
        all([takeLatest(Constants.PRINT_BOOK_LABEL, Saga.printBookLabelRequest)])
      );
    });
  });
});
