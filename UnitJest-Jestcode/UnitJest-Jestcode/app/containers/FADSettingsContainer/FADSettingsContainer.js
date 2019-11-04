/**
 *
 * FadsettingsContainer
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import FADRetakeModal from 'components/FADRetakeModal';
import FADresetModal from 'components/FADresetModal';
import LoadingModal from 'components/LoadingModal';
import ProgramSettingsButtons from 'components/ProgramSettingsButtons';
import ProgramSettingsNavBar from 'components/ProgramSettingsNavBar';
import SettingsMessage from 'components/SettingsMessage';
import SettingsNoEnrollmentsMessage from 'components/SettingsNoEnrollmentsMessage';
import { COHORT_TYPE, PROGRAM_LIST } from 'containers/App/constants';
import { makeSelectEffectiveCohortObject } from 'containers/SmartBarContainer/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { getSettingsRequest, setSettingsRequest } from './actions';
import * as Constants from './constants';
import reducer from './reducer';
import saga from './saga';
import makeSelectFADSettingsContainer from './selectors';

import './FADSettingsContainer.scss';

export class FADSettingsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: { show_retake_final_assessment_option: 'false' },
      newSettings: 0,
      initAssmnt: false,
      finalAssmnt: false,
      initAssmntModal: false,
      finalAssmntModal: false,
      loading: props.FADSettingsContainer.loading,
      cohortType: '',
      cohortId: '',
      isolateTab: false,
    };
  }

  componentDidMount() {
    this.props.getSettingsRequest();
  }

  componentWillReceiveProps(newprops) {
    this.setState({ finalAssmnt: false, initAssmnt: false });

    if (
      this.props.cohortObj.cohortType !== newprops.cohortObj.cohortType ||
      this.props.cohortObj.id !== newprops.cohortObj.id
    ) {
      this.setState({
        cohortType: newprops.cohortObj.cohortType,
        cohortId: newprops.cohortObj.id,
      });
      this.props.getSettingsRequest();
    }
    if (
      newprops.FADSettingsContainer &&
      newprops.FADSettingsContainer.settings &&
      newprops.FADSettingsContainer.settings.show_retake_final_assessment_option &&
      newprops.FADSettingsContainer.settings.show_retake_final_assessment_option[0] !==
        this.state.settings.show_retake_final_assessment_option
    ) {
      this.setState({
        settings: {
          show_retake_final_assessment_option:
            newprops.FADSettingsContainer.settings.show_retake_final_assessment_option[0],
        },
      });
    }
    if (
      newprops.FADSettingsContainer &&
      newprops.FADSettingsContainer.loading !== this.state.loading
    ) {
      this.setState({ loading: newprops.FADSettingsContainer.loading });
    }
  }

  handleRestoreDefaults = () => {
    this.setState({ initAssmnt: false, finalAssmnt: false, isolateTab: true });
  };

  handleSave = () => {
    this.setState({ loading: true }, () => {
      const retake = this.state.finalAssmnt ? '1' : '0';
      const reset = this.state.initAssmnt ? '1' : '0';
      this.props.setSettingsRequest(retake, reset);
      this.setState({ finalAssmnt: false, initAssmnt: false });
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.handleSave();
  };

  effectiveCohort() {
    return this.props.cohortObj.cohortType;
  }

  inputClick = e => {
    if (e.currentTarget.id === 'fad-settings-init-assmnt-place') {
      this.setState({
        initAssmnt: e.currentTarget.checked,
        initAssmntModal: e.currentTarget.checked,
      });
    }
    if (e.currentTarget.id === 'fad-settings-final-assmnt') {
      this.setState({
        finalAssmnt: e.currentTarget.checked,
        finalAssmntModal: e.currentTarget.checked,
      });
    }
  };

  noInit = () => {
    this.setState({ initAssmntModal: false, initAssmnt: false });
  };

  yesInit = () => {
    this.setState({ initAssmntModal: false, finalAssmnt: false, isolateTab: true });
  };

  noFinal = () => {
    this.setState({ finalAssmntModal: false, finalAssmnt: false });
  };

  yesFinal = () => {
    this.setState({ finalAssmntModal: false, initAssmnt: false, isolateTab: true });
  };

  resetInputs = () => {
    this.setState({ finalAssmnt: false, initAssmnt: false, isolateTab: false });
  };

  renderInitialAssessmentAndPlacement = () => (
    <div className="fad-settings__section">
      <div className="fad-settings__section-title">{Constants.INIT_ASSMNT_PLACE.TITLE}</div>
      <div className="fad-settings__section-content">
        <label htmlFor="fad-settings-init-assmnt-place" className="fad-settings__section-label">
          <input
            type="checkbox"
            id="fad-settings-init-assmnt-place"
            disabled={this.effectiveCohort() === COHORT_TYPE.Student ? '' : 'disabled'}
            onChange={this.inputClick}
            checked={this.state.initAssmnt}
          />
          {Constants.INIT_ASSMNT_PLACE.LABEL}
        </label>
        {this.effectiveCohort() !== COHORT_TYPE.Student && (
          <div className="fad-settings__section-error">{Constants.INIT_ASSMNT_PLACE.ERROR}</div>
        )}
      </div>
    </div>
  );

  renderFinalAssessment = () => (
    <div className="fad-settings__section">
      <div className="fad-settings__section-title">{Constants.FINAL_ASSMNT.TITLE}</div>
      <div className="fad-settings__section-content">
        <label htmlFor="fad-settings-final-assmnt" className="fad-settings__section-label">
          <input
            type="checkbox"
            id="fad-settings-final-assmnt"
            onChange={this.inputClick}
            checked={this.state.finalAssmnt}
            disabled={this.state.settings.show_retake_final_assessment_option !== '1'}
          />
          {Constants.FINAL_ASSMNT.LABEL}
        </label>
        {this.state.settings.show_retake_final_assessment_option === 'false' && (
          <div className="fad-settings__section-error">{Constants.FINAL_ASSMNT.ERROR}</div>
        )}
      </div>
    </div>
  );

  renderFAD = () => (
    <form onSubmit={this.handleSubmit}>
      <div className="fad-settings__content">
        {this.renderInitialAssessmentAndPlacement()}
        {this.renderFinalAssessment()}
        <ProgramSettingsButtons
          restoreDefaultHandler={this.handleRestoreDefaults}
          saveAndReturnHandler={this.handleSave}
          setInitialValuesHandler={this.resetInputs}
          stateResult={!this.state.isolateTab}
        />
      </div>
    </form>
  );

  renderSettings = () => {
    const selectedCohType = this.effectiveCohort();

    if (
      selectedCohType === COHORT_TYPE.District ||
      selectedCohType === COHORT_TYPE.School ||
      selectedCohType === COHORT_TYPE.Grade
    ) {
      return <SettingsMessage message1={Constants.ERRORS.COHORT} />;
    }

    if (this.props.enrollmentCount <= 0 || typeof this.state.settings === 'undefined') {
      return (
        <SettingsNoEnrollmentsMessage
          productName={PROGRAM_LIST.FAD.name}
          cohort={selectedCohType}
        />
      );
    }

    // return this.renderFAD();
    return this.renderFAD();
  };

  render() {
    const tabs = [
      {
        renderFunction: this.renderSettings,
        ...Constants.TAB_SETTINGS,
      },
    ];

    return (
      <div className="fad-settings__container-main">
        <ProgramSettingsNavBar tabs={tabs} isolateTab={this.state.isolateTab} />
        <FADresetModal
          isOpen={this.state.initAssmntModal}
          doYes={this.yesInit}
          doNo={this.noInit}
        />
        <FADRetakeModal
          isOpen={this.state.finalAssmntModal}
          doYes={this.yesFinal}
          doNo={this.noFinal}
        />
        <LoadingModal isOpen={this.state.loading} />
      </div>
    );
  }
}

FADSettingsContainer.propTypes = {
  cohortObj: PropTypes.object.isRequired,
  enrollmentCount: PropTypes.number.isRequired,
  FADSettingsContainer: PropTypes.object.isRequired,
  getSettingsRequest: PropTypes.func.isRequired,
  setSettingsRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  FADSettingsContainer: makeSelectFADSettingsContainer(),
  cohortObj: makeSelectEffectiveCohortObject(),
});

const withConnect = connect(mapStateToProps, {
  getSettingsRequest,
  setSettingsRequest,
});

const withReducer = injectReducer({ key: 'FADSettingsContainer', reducer });
const withSaga = injectSaga({ key: 'FADSettingsContainer', saga });

export default compose(withReducer, withSaga, withConnect)(FADSettingsContainer);
