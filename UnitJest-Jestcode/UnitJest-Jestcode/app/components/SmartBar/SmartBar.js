/**
 *
 * SmartBar
 * - District admins can see everything
 * - School admins can see everything but schools
 * - Teachers don't see grades, or teachers
 */

import React from 'react';
import PropTypes from 'prop-types';
import GradesSmartTab from 'containers/GradesSmartTab';
import TeachersSmartTab from 'containers/TeachersSmartTab';
import SchoolsSmartTab from 'containers/SchoolsSmartTab';
import GroupsSmartTab from 'containers/GroupsSmartTab';
import ClassesSmartTab from 'containers/ClassesSmartTab';
import StudentsSmartTab from 'containers/StudentsSmartTab';
import { COHORT_TYPE } from 'containers/App/constants';
import './SmartBar.scss';

function SmartBar(props) {
  function renderTitleText() {
    switch (props.userOrgType) {
      case COHORT_TYPE.District:
        return 'My District';
      case COHORT_TYPE.School:
        return 'My School';
      default:
        return 'My Classes';
    }
  }

  return (
    <div className="smart-bar-container">
      <button className="smart-bar-container__title" onClick={props.onTitleClick}>
        {renderTitleText()}
      </button>

      <div className="tabs">
        <SchoolsSmartTab />
        <GradesSmartTab />
        <TeachersSmartTab />
        <ClassesSmartTab />
        <GroupsSmartTab />
        <StudentsSmartTab />
      </div>
    </div>
  );
}

SmartBar.propTypes = {
  userOrgType: PropTypes.string,
  onTitleClick: PropTypes.func.isRequired,
};

export default SmartBar;
