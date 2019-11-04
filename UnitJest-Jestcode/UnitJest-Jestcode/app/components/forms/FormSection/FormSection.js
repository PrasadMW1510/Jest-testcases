/**
 *
 * FormSection
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import './FormSection.scss';

function FormSection(props) {
  return (
    <section className={props.sectionClassModifier} style={props.sectionStyle}>
      <div className="form-section__callout form-section__callout--orange">
        <h4 className="form-section__callout-heading">{props.headerText}</h4>
        <div className="form-section__callout-body">{props.children}</div>
      </div>
    </section>
  );
}

FormSection.defaultProps = {
  headerText: '',
  sectionStyle: { display: 'block' },
  sectionClassModifier: '',
};

FormSection.propTypes = {
  children: PropTypes.node,
  headerText: PropTypes.string,
  sectionStyle: PropTypes.object,
  sectionClassModifier: PropTypes.string,
};

export default FormSection;
