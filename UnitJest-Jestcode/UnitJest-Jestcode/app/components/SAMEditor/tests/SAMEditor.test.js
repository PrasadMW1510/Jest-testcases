import React from 'react';
import { shallow } from 'enzyme';
import { ContentState, convertFromHTML, EditorState } from 'draft-js';

import SAMEditor from '../index';

describe('<SAMEditor />', () => {
  let wrapper = null;
  let wrapperInstance = null;
  const mockData = '<p>A Description</p>';
  const mockNewData = '<p>A New Description</p>';
  const mockHandleChange = jest.fn();
  const mockReinitializeEditorComplete = jest.fn();
  const mockEditorIdObj = {};
  const readOnlyTrue = true;
  afterEach(() => {
    jest.resetAllMocks();
  });
  beforeEach(() => {
    wrapper = shallow(
      <SAMEditor
        data={mockData}
        editorIdObj={mockEditorIdObj}
        handleChange={mockHandleChange}
        isReadOnly={readOnlyTrue}
        reinitializeEditorComplete={mockReinitializeEditorComplete}
      />
    );
    wrapperInstance = wrapper.instance();
  });
  it('should call the props.handleChange when onChange occurs', () => {
    const newState = EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(mockNewData))
    );
    wrapperInstance.onChange(newState);
    expect(mockHandleChange).toHaveBeenCalledWith(mockNewData, mockEditorIdObj);
  });

  it('should not call the props.handleChange when onChange occurs with the same editorState', () => {
    const newState = EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(mockData))
    );
    wrapperInstance.onChange(newState);
    expect(mockHandleChange).toHaveBeenCalled();
  });
});
