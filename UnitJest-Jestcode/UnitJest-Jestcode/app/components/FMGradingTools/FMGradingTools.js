import React from 'react';
import PropTypes from 'prop-types';

import SAMButton from 'components/SAMButton';
import SAMLinkButton from 'components/SAMLinkButton';
import SAMTable from 'components/SAMTable';

import './FMGradingTools.scss';

const initialState = {
  current: true,
  addition: false,
  subtraction: false,
  multiplication: false,
  division: false,
  answerKey: false,
  remainder: false,
  problemType: '1digit',
  orientation: 'horizontal',
};

export class FMGradingTools extends React.Component {
  state = initialState;
  componentDidUpdate = prevProps => {
    if (this.props.selectedCohort !== prevProps.selectedCohort) {
      this.setState(initialState);
    }
  };

  selectProblemType = e => {
    this.setState({
      problemType: e.target.value,
    });

    if (e.target.value !== '1digit') {
      this.setState({
        orientation: 'vertical',
      });
    }
  };

  selectOrientation = e => {
    this.setState({
      orientation: e.target.value,
    });
  };

  handleCheckBoxClick = fieldName => {
    this.setState({
      [fieldName]: !this.state[fieldName],
    });
  };

  handleGeneratePDFReport = () => {
    this.props.FMGeneratePdfReport(this.state);
  };

  renderOrientationDropdownItems = () => {
    if (this.state.problemType === '1digit') {
      return (
        <select onChange={this.selectOrientation}>
          <option value="horizontal">Horizontal (30 Facts)</option>
          <option value="vertical">Vertical (15 Facts)</option>
          <option value="mixed">Mixed (15 Facts)</option>
        </select>
      );
    }

    return (
      <select onChange={this.selectOrientation}>
        <option value="vertical">Vertical (15 Facts)</option>
      </select>
    );
  };

  renderPrintButton = () => {
    const { current, addition, multiplication, division, subtraction } = this.state;
    if (current || addition || multiplication || division || subtraction) {
      return (
        <SAMButton
          buttonClassModifier="print-pdf__button"
          buttonType="submit"
          onClickHandler={this.handleGeneratePDFReport}
        >
          Print Preview (PDF)
        </SAMButton>
      );
    }
    return null;
  };

  render() {
    const { studentOperations, columns } = this.props;
    return (
      <section className="fs-container-main">
        <div className="fs-grading-tools-description">
          <span>
            Define customized worksheets for student(s) shown in the table by selecting the options
            below. Selecting more than one operating type will generate worksheets with mixed
            problems.
          </span>
        </div>

        <div className="fs-grading-tools-operation-box">
          <div className="fs-grading-tools-content-title">Operation *</div>
          <div className="fs-grading-tools-operation-check-box-container">
            <div>
              <input
                type="checkbox"
                id="current"
                name="current"
                value="current"
                onChange={() => this.handleCheckBoxClick('current')}
                checked={this.state.current}
              />
              <label htmlFor="current">&nbsp;Current</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="addition"
                name="addition"
                value="addition"
                checked={this.state.addition}
                onChange={() => this.handleCheckBoxClick('addition')}
              />
              <label htmlFor="addition">&nbsp;Addition</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="subtraction"
                name="subtraction"
                value="subtraction"
                checked={this.state.subtraction}
                onChange={() => this.handleCheckBoxClick('subtraction')}
              />
              <label htmlFor="subtraction">&nbsp;Subtraction</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="multiplication"
                name="multiplication"
                value="multiplication"
                checked={this.state.multiplication}
                onChange={() => this.handleCheckBoxClick('multiplication')}
              />
              <label htmlFor="multiplication">&nbsp;Multiplication</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="division"
                name="division"
                value="division"
                checked={this.state.division}
                onChange={() => this.handleCheckBoxClick('division')}
              />
              <label htmlFor="division">&nbsp;Division</label>
            </div>
          </div>
          <div className="fs-grading-tools-operation-box-text">
            Worksheets with mixed problems will be generated from all selected operations up to and
            including the most advanced operation the student has been assigned to in FASTT Math.
          </div>
          <div className="fs-grading-tools-operation-box-text">* Required Field</div>
        </div>
        <div className="fs-grading-tools-flex">
          <div className="fs-grading-tools-problem-box">
            <div className="fs-grading-tools-content-title">Problem Type</div>
            <section>
              <select onChange={this.selectProblemType}>
                <option value="1digit">FASTT MATH Facts</option>
                <option value="2digit">2-digit facts (no regrouping)</option>
                <option value="2digitregroup">2-digit-facts (regrouping)</option>
                <option value="3digit">2-digit or more facts (no regrouping)</option>
                <option value="3digitregroup">2-digit or more facts (regrouping)</option>
              </select>

              <div className="ghost-div" />

              <div>
                <input
                  type="checkbox"
                  id="remainder"
                  name="remainder"
                  value="remainder"
                  checked={this.state.remainder}
                  onChange={() => this.handleCheckBoxClick('remainder')}
                />
                <label htmlFor="remainder">&nbsp;Remainder</label>
              </div>
            </section>
          </div>
          <div className="fs-grading-tools-problem-orientation-box">
            <div className="fs-grading-tools-content-title">Problem Orientation</div>

            <section>{this.renderOrientationDropdownItems()}</section>
          </div>
          <div className="fs-grading-tools-printing-option-box">
            <div className="fs-grading-tools-content-title">Printing Option</div>
            <section>
              <div>
                <input
                  type="checkbox"
                  id="answerKey"
                  name="answerKey"
                  value="answerKey"
                  checked={this.state.answerKey}
                  onChange={() => this.handleCheckBoxClick('answerKey')}
                />
                <label htmlFor="answerKey">&nbsp;Print Answer Key</label>
              </div>
            </section>
          </div>
        </div>
        <div className="fs-grading-tools-description">
          <div>Worksheets will be generated for all students listed below.</div>
        </div>
        <SAMTable
          className="fs-worksheet__table"
          columns={columns}
          data={studentOperations}
          pageSize={studentOperations.length}
          hasCheckBoxes={false}
        />
        <div className="grading-tools-button-container">
          <SAMLinkButton
            to="/roster"
            id="cancelAndReturn"
            buttonClassModifier="program-settings-buttons__button"
          >
            Cancel & Return
          </SAMLinkButton>

          {this.renderPrintButton()}
        </div>
      </section>
    );
  }
}

FMGradingTools.propTypes = {
  studentOperations: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  FMGeneratePdfReport: PropTypes.func.isRequired,
  selectedCohort: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default FMGradingTools;
