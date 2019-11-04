/**
 *
 * SAMEditor
 *
 */
import { ContentState, convertFromHTML, Editor, EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import PropTypes from 'prop-types';
import React from 'react';

import './SAMEditor.scss';

class SAMEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(convertFromHTML(props.data))
      ),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldReinitializeEditor === true) {
      this.reinitializeEditor(nextProps.data);
    }
  }

  onChange = newState => {
    const currentContentState = this.state.editorState.getCurrentContent();
    const newContentState = newState.getCurrentContent();
    if (currentContentState !== newContentState) {
      const newHtml = stateToHTML(newContentState);
      this.props.handleChange(newHtml, this.props.editorIdObj);
    }
    this.setState({ editorState: newState });
  };

  /**
   *  initialize the editor state with the props.data , then callback that reinitializeComplete
   */
  reinitializeEditor = data => {
    this.setState(
      {
        editorState: EditorState.createWithContent(
          ContentState.createFromBlockArray(convertFromHTML(data))
        ),
      },
      this.props.reinitializeEditorComplete
    );
  };

  render() {
    return (
      <Editor
        readOnly={this.props.isReadOnly}
        editorState={this.state.editorState}
        onChange={this.onChange}
      />
    );
  }
}

SAMEditor.defaultProps = {
  reinitialize: false,
};

SAMEditor.propTypes = {
  data: PropTypes.string.isRequired,
  editorIdObj: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  isReadOnly: PropTypes.bool.isRequired,
  reinitializeEditorComplete: PropTypes.func.isRequired,
  shouldReinitializeEditor: PropTypes.bool,
};

export default SAMEditor;
