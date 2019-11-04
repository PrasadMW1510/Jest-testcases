/**
 *
 * TeacherForm
 *
 */

import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { Field } from 'redux-form/immutable';

import { CheckboxControl, FormErrors, FormSection } from 'components/forms';
import NavBar, { NavItem } from 'components/NavBar';
import PermissionsGrantedTable from 'components/PermissionsGrantedTable';
import SAMAccountForm from 'components/SAMAccountForm';
import SAMButton from 'components/SAMButton';
import SAMModal from 'components/SAMModal';
import { USER_TYPE } from 'containers/App/constants';

import { TABS, TAB_1, TAB_2, TAB_3 } from './constants';
import './TeacherForm.scss';

class TeacherForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: TAB_1.id,
      selectedSchoolId: this.props.selectedSchoolId ? this.props.selectedSchoolId : null,
      permissionsChecked: this.props.permissionsChecked,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.permissionsChecked !== nextProps.permissionsChecked) {
      this.setState({ permissionsChecked: nextProps.permissionsChecked });
    }
  }

  getClassId = item => item && item.class_id && item.class_id[0];

  formatClassLabel = item => item && item.class_name && item.class_name[0];

  handleTabClick = ev => this.setState({ activeTab: ev.currentTarget.id });

  handleSave = values => {
    this.props.handleSave(values, this.state.permissionsChecked);
  };

  createNavBar = () =>
    TABS.map(({ label, ...tab }) => (
      <NavItem
        key={tab.id}
        {...tab}
        onClick={this.handleTabClick}
        hasErrors={this.showNavBarError(tab.id)}
      >
        {label}
      </NavItem>
    ));

  showSection = tabId => ({ display: this.state.activeTab === tabId ? 'block' : 'none' });

  handleSchoolSelectionOnChange = event => {
    this.setState({ selectedSchoolId: event.target.value });
  };

  filterPermissions = (checked, selectedId) => {
    if (checked) {
      this.setState({
        permissionsChecked: this.state.permissionsChecked.concat(selectedId),
      });
    } else {
      this.setState({
        permissionsChecked: this.state.permissionsChecked.filter(id => id !== selectedId),
      });
    }
  };

  showNavBarError = tabId => {
    const validationErrors = this.props.validationErrors;

    if (this.props.submitFailed) {
      switch (tabId) {
        case TAB_1.id:
          if (validationErrors && Object.keys(validationErrors).length === 1) {
            return validationErrors.classes === undefined;
          }

          return true;
        case TAB_2.id:
          if (validationErrors) {
            return validationErrors.classes !== undefined;
          }

          return false;
        default:
          return false;
      }
    }

    return false;
  };

  doesSchoolContainAssociatedClass = schoolItem =>
    schoolItem.classes[0].class.some(
      classItem =>
        classItem.class_id && this.props.associatedClasses.indexOf(classItem.class_id[0]) > -1
    );

  renderClasses = () => {
    let classesToRender = null;

    if (this.props.schoolsAndClassesData.school) {
      this.props.schoolsAndClassesData.school.forEach(schoolItem => {
        const selectedSchoolId = this.state.selectedSchoolId
          ? this.state.selectedSchoolId
          : this.props.schoolsAndClassesData.school[0].school_id[0];

        if (selectedSchoolId === schoolItem.school_id[0]) {
          const classItem = schoolItem.classes[0].class;
          if (classItem && classItem[0].class_id && classItem[0].class_id[0] !== '') {
            classesToRender = (
              <Field
                name="classes"
                component={CheckboxControl}
                getId={this.getClassId}
                items={classItem}
                formatLabel={this.formatClassLabel}
              />
            );
          }
        }
      });
    }
    return classesToRender;
  };

  renderSchoolDropDown = () =>
    this.props.schoolsAndClassesData.school &&
    this.props.schoolsAndClassesData.school.map(item => (
      <option key={item.school_id} value={item.school_id[0]}>
        {item.school_name}
      </option>
    ));

  renderSchoolsAndClasses = () => {
    if (this.props.userType === USER_TYPE.Teacher) {
      return this.props.schoolsAndClassesData.school.map(schoolItem => (
        <div key={schoolItem.school_id}>
          <div className="teacher-form__class-section-2-schools">{schoolItem.school_name}</div>
          <div>
            {schoolItem.classes[0].class.map(classItem => (
              <div key={classItem.class_id} className="teacher-form__class-section-2-classes">
                {classItem.class_name}
              </div>
            ))}
          </div>
        </div>
      ));
    }

    return (
      this.props.schoolsAndClassesData.school &&
      this.props.schoolsAndClassesData.school.map(schoolItem => {
        if (this.doesSchoolContainAssociatedClass(schoolItem)) {
          return (
            <div key={schoolItem.school_id}>
              <div className="teacher-form__class-section-2-schools">{schoolItem.school_name}</div>
              <div>
                {schoolItem.classes[0].class.map(classItem => (
                  <div key={classItem.class_id} className="teacher-form__class-section-2-classes">
                    {this.props.associatedClasses.indexOf(classItem.class_id[0]) > -1 &&
                      classItem.class_name}
                  </div>
                ))}
              </div>
            </div>
          );
        }
        return <div />;
      })
    );
  };

  renderHeading = () => {
    let heading;
    heading = <h2 className="teacher-form__heading">Edit {USER_TYPE.Teacher} Profile</h2>;
    if (!this.props.data.editMode) {
      heading = <h2 className="teacher-form__heading">Add a {USER_TYPE.Teacher}</h2>;
    }
    return heading;
  };

  render() {
    const { activeTab } = this.state;

    const { submitErrors, submitFailed, validationErrors, data } = this.props;
    const hasErrorsOnSave = submitFailed && !!(validationErrors || submitErrors);
    const editOrEnter = data.editMode ? 'Edit' : 'Enter';

    return (
      <SAMModal isOpen={this.props.isOpen} modalClassModifier="modal--teacher-form">
        <div className="teacher-form teacher-form--orange">
          {this.renderHeading()}
          <div className="teacher-form__intro">
            {editOrEnter} information about this Teacher account on the Profile, Schools &amp;
            Classes, and Permissions tabs. Items marked with an asterisk (*) are required. When you
            are done, click Save to finish.
          </div>
          <div className="teacher-form__navbar-bg">
            <NavBar
              className="teacher-form__nav-bar"
              activeItemId={activeTab}
              theme="tabs"
              palette="orange"
              inset
            >
              {this.createNavBar()}
            </NavBar>
          </div>
          <form onSubmit={this.props.handleSubmit(this.handleSave)}>
            <div className="teacher-form__body">
              <main className="teacher-form__body-main">
                <div className="teacher-form__error-message">
                  {hasErrorsOnSave && 'Please correct your entries as indicated.'}
                </div>
                <FormSection
                  sectionClassModifier="teacher-form__section"
                  headerText={TAB_1.sectionHeaderText}
                  sectionStyle={this.showSection(TAB_1.id)}
                >
                  <SAMAccountForm
                    editMode={this.props.data.editMode}
                    // userOrg={this.props.userOrg}
                    passwordConfigsArray={this.props.passwordConfigsArray}
                  />
                </FormSection>
                <div style={this.showSection(TAB_2.id)}>
                  <div className="teacher-form__school-name-div">
                    <select
                      onChange={this.handleSchoolSelectionOnChange}
                      className="teacher-form__school-name-select"
                      value={this.state.selectedSchoolId ? this.state.selectedSchoolId : ''}
                    >
                      {this.renderSchoolDropDown()}
                    </select>
                  </div>
                  <FormSection
                    sectionClassModifier={
                      data.editMode
                        ? 'teacher-form__class-section-1'
                        : 'teacher-form__class-section-1-full'
                    }
                    headerText={TAB_2.sectionHeaderText1}
                  >
                    {this.renderClasses()}
                  </FormSection>
                  <FormSection
                    sectionClassModifier="teacher-form__class-section-2"
                    headerText={TAB_2.sectionHeaderText2}
                    sectionStyle={data.editMode ? { display: 'block' } : { display: 'none' }}
                  >
                    {data.editMode ? this.renderSchoolsAndClasses() : null}
                  </FormSection>
                </div>
                <FormSection
                  sectionClassModifier="teacher-form__permissions-section"
                  headerText={TAB_3.sectionHeaderText}
                  sectionStyle={this.showSection(TAB_3.id)}
                >
                  <PermissionsGrantedTable
                    permissions={this.props.permissions.toJS()}
                    editMode={this.props.data.editMode}
                    editingSameAccount={this.props.editingSameAccount}
                    userOrg={USER_TYPE.Teacher}
                    permissionsChecked={this.state.permissionsChecked}
                    onCheckboxChange={this.filterPermissions}
                  />
                </FormSection>
              </main>
              <aside className="teacher-form__body-aside">
                <FormErrors
                  shouldShowErrors={hasErrorsOnSave}
                  submitErrors={submitErrors.toJS()}
                  validationErrors={validationErrors}
                />
                <div>
                  <SAMButton onClickHandler={this.props.handleCancel}>Cancel</SAMButton>
                  <SAMButton isPrimaryButton buttonType="submit">
                    Save
                  </SAMButton>
                </div>
              </aside>
            </div>
          </form>
        </div>
      </SAMModal>
    );
  }
}

TeacherForm.defaultProps = {
  isOpen: false,
  submitErrors: fromJS({}),
  submitFailed: false,
  validationErrors: null,
  data: { editMode: false },
  selectedSchoolId: null,
};

TeacherForm.propTypes = {
  data: PropTypes.object.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  passwordConfigsArray: PropTypes.array.isRequired,
  permissions: PropTypes.object.isRequired,
  permissionsChecked: PropTypes.array,
  schoolsAndClassesData: PropTypes.object.isRequired,
  userType: PropTypes.string.isRequired,
  associatedClasses: PropTypes.array,
  isOpen: PropTypes.bool,
  editingSameAccount: PropTypes.bool,
  submitErrors: PropTypes.object,
  submitFailed: PropTypes.bool,
  validationErrors: PropTypes.object,
  selectedSchoolId: PropTypes.string,
};

export default TeacherForm;
