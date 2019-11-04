/**
 *
 * ProgramSettingsView
 *
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ProgramSettingsNavBar from 'components/ProgramSettingsNavBar';
import SettingsMessage from 'components/SettingsMessage/SettingsMessage';
import { PROGRAM_LIST } from 'containers/App/constants';
import PSSettingContainer from 'containers/PSSettingContainer/Loadable';
import FADSettingsContainer from 'containers/FADSettingsContainer/Loadable';
import FMSettingContainer from 'containers/FMSettingContainer/Loadable';
import IreadSettingsContainer from 'containers/IreadSettingsContainer/Loadable';
import MISettingContainer from 'containers/MISettingContainer/Loadable';
import PISettingContainer from 'containers/PISettingContainer/Loadable';
import R180EESettingContainer from 'containers/R180EESettingContainer/Loadable';
import R180NGSettingContainer from 'containers/R180NGSettingContainer/Loadable';
import RCSettingContainer from 'containers/RCSettingContainer/Loadable';
import RISettingContainer from 'containers/RISettingContainer/Loadable';
import RSkillsCCSettingContainer from 'containers/RSkillsCCSettingContainer/Loadable';
import S44NGSettingContainer from 'containers/S44NGSettingContainer/Loadable';
import S44SettingContainer from 'containers/S44SettingContainer/Loadable';
import XSkillsSettingContainer from 'containers/XSkillsSettingContainer/Loadable';
import {
  getEnrollmentCount,
  getEnrollmentCountDetails,
  getMaxEnrolledProduct,
} from 'utils/programSettingsUtils';

import * as Constants from './constants';
import './ProgramSettingsView.scss';

class ProgramSettingsView extends Component {
  renderProgramSettings = () => {
    const { enrollmentList } = this.props;
    // Keep these cases in alphabetical order
    switch (this.props.selectedProgram.product_code) {
      case PROGRAM_LIST.DTM.code: {
        const dtmEnrollmentCount = getEnrollmentCount(
          Constants.APPLICATIONS_IDS.dtm,
          enrollmentList
        );
        return <PSSettingContainer enrollmentCount={dtmEnrollmentCount} />;
      }
      case PROGRAM_LIST.FAD.code: {
        const fadEnrollmentCount = getEnrollmentCount(
          Constants.APPLICATIONS_IDS.fad,
          enrollmentList
        );
        return <FADSettingsContainer enrollmentCount={fadEnrollmentCount} />;
      }
      case PROGRAM_LIST.FM.code: {
        const fmEnrollmentCount = getEnrollmentCount(Constants.APPLICATIONS_IDS.fm, enrollmentList);
        return <FMSettingContainer enrollmentCount={fmEnrollmentCount} />;
      }
      case PROGRAM_LIST.R180.code: {
        const r180EEEnrollmentCount = getEnrollmentCount(
          Constants.APPLICATIONS_IDS.r180ee,
          enrollmentList
        );

        const r180EEEnrollmentDetails = getEnrollmentCountDetails(
          Constants.APPLICATIONS_IDS.r180ee,
          enrollmentList
        );
        return (
          <R180EESettingContainer
            enrollmentCount={r180EEEnrollmentCount}
            enrollmentDetails={r180EEEnrollmentDetails}
          />
        );
      }
      case PROGRAM_LIST.R180NG.code: {
        const r180NGEnrollmentCount = getEnrollmentCount(
          Constants.APPLICATIONS_IDS.r180ng,
          enrollmentList
        );
        return <R180NGSettingContainer enrollmentCount={r180NGEnrollmentCount} />;
      }
      case PROGRAM_LIST.RTNG.code: {
        const rSkillsCCEnrollmentList = getEnrollmentCount(
          Constants.APPLICATIONS_IDS.rtng,
          enrollmentList
        );
        return <RSkillsCCSettingContainer enrollmentCount={rSkillsCCEnrollmentList} />;
      }
      case PROGRAM_LIST.S44.code: {
        const s44EnrollmentCount = getEnrollmentCount(
          Constants.APPLICATIONS_IDS.s44,
          enrollmentList
        );
        return <S44SettingContainer enrollmentCount={s44EnrollmentCount} />;
      }
      case PROGRAM_LIST.S44JR.code: {
        const s44JREnrollmentCount = getEnrollmentCount(
          Constants.APPLICATIONS_IDS.s44jr,
          enrollmentList
        );
        return <IreadSettingsContainer enrollmentCount={s44JREnrollmentCount} />;
      }
      case PROGRAM_LIST.S44NG.code: {
        const s44NGEnrollmentCount = getEnrollmentCount(
          Constants.APPLICATIONS_IDS.s44ng,
          enrollmentList
        );
        return <S44NGSettingContainer enrollmentCount={s44NGEnrollmentCount} />;
      }
      case PROGRAM_LIST.SMI.code: {
        const smiEnrollmentCount = getEnrollmentCount(
          Constants.APPLICATIONS_IDS.smi,
          enrollmentList
        );
        return <MISettingContainer enrollmentCount={smiEnrollmentCount} />;
      }
      case PROGRAM_LIST.SPI.code: {
        const spiEnrollmentCount = getEnrollmentCount(
          Constants.APPLICATIONS_IDS.spi,
          enrollmentList
        );
        return <PISettingContainer enrollmentCount={spiEnrollmentCount} />;
      }
      case PROGRAM_LIST.SRC.code: {
        const srcEnrollmentCount = getEnrollmentCount(
          Constants.APPLICATIONS_IDS.src,
          enrollmentList
        );
        return <RCSettingContainer enrollmentCount={srcEnrollmentCount} />;
      }
      case PROGRAM_LIST.SRI.code: {
        const sriEnrollmentCount = getEnrollmentCount(
          Constants.APPLICATIONS_IDS.sri,
          enrollmentList
        );
        return <RISettingContainer enrollmentCount={sriEnrollmentCount} />;
      }
      case PROGRAM_LIST.XT.code: {
        const xSkillHighEnrollment = getMaxEnrolledProduct(
          Constants.APPLICATIONS_IDS.xt,
          enrollmentList
        );
        const xSkillsEnrollmentCount = getEnrollmentCount(
          Constants.APPLICATIONS_IDS.xt,
          enrollmentList
        );
        return (
          <XSkillsSettingContainer
            enrollmentCount={xSkillsEnrollmentCount}
            highestEnrolledCourse={xSkillHighEnrollment.applicationId}
          />
        );
      }
      default: {
        const tabs = [
          {
            renderFunction: () => <SettingsMessage message1={Constants.UNDER_CONSTRUCTION} />,
            ...Constants.TAB_SETTINGS,
          },
        ];

        return <ProgramSettingsNavBar tabs={tabs} />;
      }
    }
  };

  render() {
    const { selectedProgram, selectedProgram: { product_code } } = this.props;
    // TODO: relates to defect ISGTC-1115 selectedProgram is not always set,
    // this is a bandaid for the blank page problem. we will need fix this
    // eslint-disable-next-line camelcase
    const productClassName = product_code
      ? `${product_code.toLowerCase()}-settings-content-panel`
      : 'no-product-code';
    // eslint-disable-next-line camelcase
    const missingProductCodeClass = product_code
      ? 'program-settings__product-code--available'
      : 'program-settings__product-code--missing';
    // eslint-disable-next-line camelcase
    const programSettingsClassName = `program-settings-content-panel ${productClassName}`;
    return (
      <div className={programSettingsClassName}>
        <div className="program-settings-header">
          <span className="program-settings-header__name">
            {selectedProgram && selectedProgram.display_name} {'Program Settings'}
          </span>
          <span className={missingProductCodeClass}>
            {' '}
            productCode missing. click ReturnToProfile, ISGTC-1115
          </span>
          {selectedProgram &&
            selectedProgram.display_image_large && (
              <img
                className="program-settings-header__image"
                src={selectedProgram.display_image_large}
                alt={selectedProgram.display_name}
              />
            )}
          {this.renderProgramSettings()}
        </div>
      </div>
    );
  }
}

ProgramSettingsView.propTypes = {
  enrollmentList: PropTypes.object.isRequired,
  selectedProgram: PropTypes.object.isRequired,
};

export default ProgramSettingsView;
