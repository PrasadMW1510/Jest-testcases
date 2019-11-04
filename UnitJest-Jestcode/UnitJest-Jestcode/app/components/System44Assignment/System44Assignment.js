/**
 *
 * System44Assignment
 *
 */

import React from 'react';
import SAMModal from 'components/SAMModal';
import PropTypes from 'prop-types';
import './System44Assignment.scss';

class System44Assignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      checked1: false,
    };
  }

  handleChange = (index, event) => {
    const customquizchecked = event.target.checked;
    if (index === 1) {
      this.setState({
        checked: customquizchecked,
        checked1: customquizchecked,
      });
    } else if (index === 2) {
      this.setState({
        checked1: customquizchecked,
      });
    } else {
      this.setState({
        checked: false,
      });
    }
  };

  handlePreview = () => {
    this.props.onPreview(this.state.checked);
  };

  render() {
    const { isOpen } = this.props;
    return (
      <div>
        <SAMModal
          isOpen={isOpen}
          contentLabel="activate Quiz"
          modalClassModifier="print-system44__modal-system44--modal"
          id="pcq"
        >
          <div className="print-system44-modal__list--wrapper">
            <div className="print-system44-modal__list--purple">
              <div className="print-system44__modal--heading">System 44 Next Generation</div>
              <div>
                <button
                  className="print-system44-modal__button--close"
                  onClick={this.props.handleCancel}
                >
                  X
                </button>
              </div>
            </div>
            <div className="print-system44__modal--title">
              System 44 Next Generation
              <span className="print-system44__modal-title--span">
                Assignment Type:
                <select className="print-system44-modal-select">
                  <option value="quickwrites" selected>
                    Quick Writes
                  </option>
                  <option value="participation">Participation</option>
                  <option value="evidencebasedwriting">Evidence based Writing</option>
                  <option value="research">Research</option>
                  <option value="others">Others</option>
                </select>
              </span>
              <span className="print-system44__modal-title--span">
                Assignment Name
                <input
                  type="textbox"
                  className="print-system44-modal-input-textbox"
                  value="Test 1"
                />
              </span>
            </div>

            <div className="print-system44-modal__description--box">
              <div className="print-system44-modal-description-title">Description:</div>
              <div className="print-system44-modal__description--textarea">
                <textarea
                  className="print-system44-modal__description-textarea--text"
                  rows="3"
                  cols="75"
                />
              </div>
            </div>

            <div className="print-system44__modal-due--date">
              <div className="print-system44__modal-description--title">Due Date:</div>
              <div className="print-system44__modal-due-date--textarea">
                <div className="print-system44__modal-due-date--inbox">
                  <p className="print-system44__modal-due-date--content1">
                    Input a due date for the assignment or select a date from the calendar:
                  </p>
                  <input
                    className="print-system44__modal-due-date--input"
                    type="date"
                    value="2018-07-05"
                  />
                </div>
              </div>
            </div>

            <div className="print-system44-modal-assignment-roster-box">
              <div className="print-system44__modal-description--title">Assignment Roster:</div>
              <div className="print-system44-modal-assignment-roster-textarea1">
                <div className="print-system44-modal-assignment-roster-div-headers11">
                  <div className="print-system44-modal-assignment-roster-div-details">
                    Select students that will complete the assessment. If you would like to enter
                    grades, eneter percentages in the percentage fields below. You may also
                    calculate grades by entering the student&apos;s score and the total points
                    possible and clicking the equal button.
                  </div>
                  Students
                  <span className="print-system44-modal-assignment-span print-system44-modal-assignment-roster-grades">
                    Grades
                  </span>
                  <span className="print-system44-modal-assignment-span print-system44-modal-assignment-roster-comments">
                    Comments
                  </span>
                </div>
                <div className="print-system44-modal-assignment-wrapper1">
                  <div>
                    <input
                      name="selected"
                      type="checkbox"
                      onChange={event => {
                        this.handleChange(1, event);
                      }}
                      checked={this.state.checked}
                    />
                    Select All
                  </div>
                  <div>
                    <input
                      name="selected"
                      type="checkbox"
                      onChange={event => {
                        this.handleChange(2, event);
                      }}
                      checked={this.state.checked1}
                    />
                    System 44 Next Generation Student
                    <input type="textbox" className="print-system44-modal-assignment-textbox1" />
                    <span>/</span>
                    <input type="textbox" className="print-system44-modal-assignment-textbox2" />
                    <button className="print-system44-modal-button-equals">=</button>
                    <input type="textbox" className="print-system44-modal-assignment-textbox3" />
                    <span>%</span>
                    <input
                      type="textbox"
                      className="print-system44-modal-assignment-textbox-comment"
                    />
                  </div>
                  <div className="print-system44-modal-assignment-roster-inbox" />
                </div>
              </div>
            </div>

            <div className="show-system44-modal-line" />
            <div className="print-activate__quiz--buttons">
              <div className="print-activate-quiz__primary--button">
                <div className="print-system44-modal__buttons--firstset">
                  <button className="print-system44-modal-button-first-set print-system44-modal-button-print">
                    Print
                  </button>
                  <button
                    className="print-system44-modal-button-first-set print-system44-modal-button-cancel"
                    onClick={this.props.handleCancel}
                  >
                    Cancel
                  </button>
                </div>
                <div className="print-system44-modal__buttons--secondset">
                  <button className="print-system44-modal__button-second--set print-system44-modal__button--delete">
                    Delete
                  </button>
                  <button
                    className="print-system44-modal__button-second--set print-system44-modal__button--save"
                    onClick={this.props.handleCancel}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SAMModal>
      </div>
    );
  }
}

System44Assignment.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  onPreview: PropTypes.func.isRequired,
};

export default System44Assignment;
