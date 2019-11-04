/**
 *
 * ClassForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import SAMModal from 'components/SAMModal';
import Button from 'components/SAMButton';
import NavBar, { NavItem } from 'components/NavBar';
import TabProfile from './TabProfile';
import TabStudentRoster from './TabStudentRoster';
import {
  CLASS_NAVBAR_ERROR,
  TAB_PROFILE,
  TAB_STUDENT_ROSTER,
  TABS_STYLE,
  TAB_ITEMS,
} from './constants';
import './ClassForm.scss';

// <ClassForm /> handles top-level actions -- close modal, save, tab switching.
class ClassForm extends Component {
  state = { activeTab: TAB_PROFILE };

  handleTabClick = ev => this.setState({ activeTab: ev.currentTarget.id });

  handleSave = values => {
    const { data, handleSave } = this.props;
    // Forwards on info to saga on whether is an `Add` or `Edit`
    return handleSave(values, data);
  };

  render = () => {
    const {
      formData: immFormData,
      handleSubmit,
      isOpen,
      metaData: immMetaDataProps,
      serverErrors,
      submitFailed,
      title,
      validationErrors,
    } = this.props;

    // Save a reference to selected students immutable map (for SAMTable use).
    const immSelectedStudents = immFormData.get('rosterStudents');
    const formData = immFormData.toJS();
    const metaData = immMetaDataProps.toJS();
    const errors = submitFailed && (validationErrors || serverErrors);
    const { activeTab } = this.state;
    return (
      <SAMModal
        isOpen={isOpen}
        contentLabel={`${title} Modal`}
        modalClassModifier="modal--class-form"
      >
        <div className="class-form class-form--orange">
          <h2 className="class-form__heading">{title}</h2>
          <div className="class-form__intro">
            Enter information about this Class account on the Profile and Student Roster tabs. Items
            marked with an asterisk (*) are required. When you are done, click Save to finish.
          </div>
          <div className="class-form__navbar-bg">
            <NavBar
              className={errors ? CLASS_NAVBAR_ERROR : ''}
              activeItemId={activeTab}
              {...TABS_STYLE}
            >
              {TAB_ITEMS.map(({ label, ...tab }) => (
                <NavItem key={tab.id} {...tab} onClick={this.handleTabClick}>
                  {label}
                </NavItem>
              ))}
            </NavBar>
          </div>
          <form onSubmit={handleSubmit(this.handleSave)}>
            <div className={`class-form__body class-form__body--${activeTab}`}>
              <main className="class-form__body-main">
                <div className="class-form__error-message">
                  {errors && 'Please correct your entries as indicated.'}
                </div>
                {/* Inactive tabs are hidden (`display: none`) while still in the DOM to simplify the submission/validation logic. */}
                <TabProfile
                  hide={activeTab !== TAB_PROFILE}
                  formData={formData}
                  metaData={metaData}
                />
                <TabStudentRoster
                  change={this.props.change}
                  formData={formData}
                  hide={activeTab !== TAB_STUDENT_ROSTER}
                  metaData={metaData}
                  selectedStudents={immSelectedStudents}
                />
              </main>
              <aside className="class-form__body-aside">
                <ul className="class-form__error-list">
                  {errors &&
                    validationErrors &&
                    Object.keys(validationErrors).map(key => (
                      <li key={`error-${key}`} className="class-form__error-list-item">
                        {validationErrors[key]}
                      </li>
                    ))}
                  {serverErrors && <li key="server-errors">{serverErrors}</li>}
                </ul>
                <div>
                  <Button onClickHandler={this.props.handleCancel}>Cancel</Button>
                  {/* Save handled in next story. Disabled for now. */}
                  <Button buttonType="submit" isPrimaryButton>
                    Save
                  </Button>
                </div>
              </aside>
            </div>
          </form>
        </div>
      </SAMModal>
    );
  };
}

ClassForm.defaultProps = {
  data: {}, // Passed-in from ModalController
  formData: fromJS({}),
  isOpen: false,
  metaData: fromJS({}),
};

ClassForm.propTypes = {
  data: PropTypes.object,
  formData: PropTypes.object,
  handleCancel: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  metaData: PropTypes.object,
  serverErrors: PropTypes.string,
  title: PropTypes.string.isRequired,
  validationErrors: PropTypes.object,
  // Below props included by redux-form
  change: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitFailed: PropTypes.bool,
};

export default ClassForm;
