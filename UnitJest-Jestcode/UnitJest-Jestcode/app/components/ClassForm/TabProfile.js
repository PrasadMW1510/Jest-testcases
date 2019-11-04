/**
 *
 * TabProfile
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormSection from 'components/forms/FormSection';
import IdentifyThisForm from './IdentifyThisForm';
import ManageApplications from './ManageApplications';
import { CLASS_FORM_HIDE } from './constants';

class TabProfile extends Component {
  render = () => {
    const { hide, metaData } = this.props;
    const cssClass = hide ? CLASS_FORM_HIDE : '';
    // Filter out any without subproducts (`sam server`)
    const metaApps =
      (metaData.applications && metaData.applications.filter(app => app.subproducts)) || [];
    return (
      <section className={cssClass}>
        <FormSection headerText="Identify This Class">
          <IdentifyThisForm grades={metaData.grades} teachers={metaData.teachers} />
        </FormSection>
        <FormSection
          sectionClassModifier="class-form__manage-applications"
          headerText="Manage Applications"
        >
          <ManageApplications applications={metaApps} />
        </FormSection>
      </section>
    );
  };
}

TabProfile.defaultProps = {
  hide: false,
  metaData: {},
};

TabProfile.propTypes = {
  hide: PropTypes.bool.isRequired,
  metaData: PropTypes.object.isRequired,
};

export default TabProfile;
