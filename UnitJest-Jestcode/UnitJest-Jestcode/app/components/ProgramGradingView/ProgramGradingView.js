/**
 *
 * ProgramGradingView
 *
 */

import React from 'react';

import PropTypes from 'prop-types';
import { PROGRAM_LIST } from 'containers/App/constants';
import { getEnrollmentCount } from 'utils/programSettingsUtils';
import SettingsMessage from 'components/SettingsMessage';
import ProgramSettingsNavBar from 'components/ProgramSettingsNavBar';
import SRCGradingToolsContainer from 'containers/SRCGradingToolsContainer/Loadable';
import FMGradingToolsContainer from 'containers/FMGradingToolsContainer/Loadable';

import * as Constants from './constants';
import './ProgramGradingView.scss';

class ProgramGradingView extends React.Component {
  constructor(props) {
    super(props);

    this.headerName = '';
    this.productClassName = 'programgrading-header';
  }

  renderProgramSettings = () => {
    const { enrollmentList } = this.props;
    // Keep these cases in alphabetical order
    switch (this.props.selectedProgram.product_code) {
      // case PROGRAM_LIST.DTM.code: {
      //   const fadEnrollmentCount = this.getEnrollmentCount(Constants.APPLICATIONS_IDS.dtm);
      //   return <FADSettingsContainer enrollmentCount={fadEnrollmentCount} />;
      // }
      case PROGRAM_LIST.FM.code: {
        this.headerName = 'Worksheets';
        this.productClassName = 'programgrading-header__fm';
        const fmEnrollmentCount = getEnrollmentCount(Constants.APPLICATIONS_IDS.fm, enrollmentList);
        return <FMGradingToolsContainer enrollmentCount={fmEnrollmentCount} />;
      }
      // case PROGRAM_LIST.R180NG.code:
      //   return <R180NGSettingContainer />;
      // case PROGRAM_LIST.RTNG.code: {
      //   const rSkillsCCEnrollmentList = this.getEnrollmentCount(Constants.APPLICATIONS_IDS.rtng);
      //   return <RSkillsCCSettingContainer enrollmentCount={rSkillsCCEnrollmentList} />;
      // }
      // case PROGRAM_LIST.S44.code: {
      //   const s44EnrollmentCount = this.getEnrollmentCount(Constants.APPLICATIONS_IDS.s44);
      //   return <S44SettingContainer enrollmentCount={s44EnrollmentCount} />;
      // }
      // case PROGRAM_LIST.S44JR.code: {
      //   const s44JREnrollmentCount = this.getEnrollmentCount(Constants.APPLICATIONS_IDS.s44jr);
      //   return <IreadSettingsContainer enrollmentCount={s44JREnrollmentCount} />;
      // }
      // case PROGRAM_LIST.S44NG.code: {
      //   const s44NGEnrollmentCount = this.getEnrollmentCount(Constants.APPLICATIONS_IDS.s44ng);
      //   return <S44NGSettingContainer enrollmentCount={s44NGEnrollmentCount} />;
      // }
      // case PROGRAM_LIST.SMI.code: {
      //   const smiEnrollmentCount = this.getEnrollmentCount(Constants.APPLICATIONS_IDS.smi);
      //   return <MISettingContainer enrollmentCount={smiEnrollmentCount} />;
      // }
      // case PROGRAM_LIST.SRI.code: {
      //   const sriEnrollmentCount = this.getEnrollmentCount(Constants.APPLICATIONS_IDS.sri);
      //   return <RISettingContainer enrollmentCount={sriEnrollmentCount} />;
      // }
      case PROGRAM_LIST.SRC.code: {
        this.productClassName = 'programgrading-header__src';
        this.headerName = 'Points Usage and Quiz Score Recording Tools';
        const srcEnrollmentCount = getEnrollmentCount(
          Constants.APPLICATIONS_IDS.src,
          enrollmentList
        );
        return <SRCGradingToolsContainer enrollmentCount={srcEnrollmentCount} />;
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
    const { selectedProgram } = this.props;
    return (
      <div>
        <div className={this.productClassName}>
          <span className="programgrading-header__name">
            {selectedProgram.display_name} {` ${this.headerName}`}
          </span>
          <img
            className="programgrading-header__image"
            src={selectedProgram.display_image_large}
            alt={selectedProgram.display_name}
          />
          {this.renderProgramSettings()}
        </div>
      </div>
    );
  }
}

ProgramGradingView.propTypes = {
  enrollmentList: PropTypes.object.isRequired,
  selectedProgram: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default ProgramGradingView;
