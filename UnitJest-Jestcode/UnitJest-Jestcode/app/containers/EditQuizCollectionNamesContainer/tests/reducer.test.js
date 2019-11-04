import { fromJS } from 'immutable';
import EditQuizCollectionNamesContainer from '../reducer';
import * as Actions from '../actions';

describe('editQuizCollectionNamesContainerReducer reducer', () => {
  const initialState = fromJS({
    error: false,
    editQuizCollectionNamesData: [],
    saveSuccess: false,
    fetchSuccess: false,
  });
  it('returns the initial state', () => {
    expect(EditQuizCollectionNamesContainer(undefined, {})).toEqual(fromJS(initialState));
  });

  it('should handle GET_EDITQUIZCOLLECTIONNAMESDATA_REQUEST_SUCCESS', () => {
    const updatedVal = {};
    const editQuizCollectionNamesDataObj = {
      output: {
        output_data: [
          {
            GetQuizCollectionNamesResp: [{ Collections: [{ Collection: updatedVal }] }, { b: 'b' }],
          },
        ],
      },
    };
    const updatedState = fromJS({
      error: false,
      editQuizCollectionNamesData: updatedVal,
      saveSuccess: false,
      fetchSuccess: true,
    });
    expect(
      EditQuizCollectionNamesContainer(
        undefined,
        Actions.getEditQuizCollectionNamesDataRequestSuccess(editQuizCollectionNamesDataObj)
      )
    ).toEqual(updatedState);
  });
  it('updates loadingOpen to true for INITIALIZE_CLASS_FORM_RESPONSE_SUCCESS action', () => {
    const updatedState = fromJS({
      error: false,
      editQuizCollectionNamesData: [],
      saveSuccess: true,
      fetchSuccess: false,
    });

    expect(
      EditQuizCollectionNamesContainer(undefined, Actions.initializeClassFormResponseSuccess())
    ).toEqual(updatedState);
  });
  it('updates loadingOpen to true for INITIAL_REQUEST action', () => {
    expect(EditQuizCollectionNamesContainer(undefined, Actions.initialRequest())).toMatchSnapshot();
  });
});
