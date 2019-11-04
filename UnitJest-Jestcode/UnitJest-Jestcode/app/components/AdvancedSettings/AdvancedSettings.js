/**
 *
 * Advanced Settings
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { isUserTypeAdminOrTech } from 'utils/utilities';
import { USER_ORG } from 'containers/App/constants';

import LinkToExternalSAMApp from 'components/LinkToExternalSAMApp';

import * as AdvancedSettingsConstants from './constants';
import './AdvancedSettings.scss';

function AdvancedSettings(props) {
  // query param mappings for external SAM app URL's
  const exportParams = [
    ['user_id', props.profileUserId],
    ['sid', props.profileSessionId],
    ['district_id', props.profileDistrictId],
  ];

  const importParams = [
    ['user_id', props.profileUserId],
    ['sid', props.profileSessionId],
    ['district_id', props.profileDistrictId],
  ];

  const importTeacherParams = [
    ['type', 'Teacher'],
    ['sid', props.profileSessionId],
    ['district_id', props.profileDistrictId],
  ];

  const importAdminParams = [
    ['type', 'Admin'],
    ['sid', props.profileSessionId],
    ['district_id', props.profileDistrictId],
  ];

  const manageStudentPromotionsParams = [
    ['user_id', props.profileUserId],
    ['sid', props.profileSessionId],
  ];

  const viewOutputFilesParams = [['user_id', props.profileUserId], ['sid', props.profileSessionId]];

  const renderRowForLinkToExternalSAMApp = (linkText, relativeUrlPath, queryParamList) => (
    <tr className="advanced-settings-table__tr">
      <td className="advanced-settings-table__td">
        <LinkToExternalSAMApp
          linkText={linkText}
          relativeUrlPath={relativeUrlPath}
          queryParamList={queryParamList}
        />
      </td>
    </tr>
  );

  return (
    <div className="advanced-settings">
      <table className="advanced-settings__table">
        <thead />
        <tbody className="advanced-settings-table__body">
          <tr className="advanced-settings-table__tr">
            <td className="advanced-settings-table__td">
              <Link to="/roster/manageStudentLicenses">Manage Student Licenses</Link>
            </td>
          </tr>
          <tr className="advanced-settings-table__tr">
            <td className="advanced-settings-table__td">
              <Link to="/roster/manageTeacherLicenses">Manage Teacher Licenses</Link>
            </td>
          </tr>
          {renderRowForLinkToExternalSAMApp(
            'Import',
            AdvancedSettingsConstants.IMPORT_URL_PATH,
            importParams
          )}
          {renderRowForLinkToExternalSAMApp(
            'Import Teachers',
            AdvancedSettingsConstants.IMPORT_URL_PATH,
            importTeacherParams
          )}
          {renderRowForLinkToExternalSAMApp(
            'Import Admins',
            AdvancedSettingsConstants.IMPORT_URL_PATH,
            importAdminParams
          )}
          {renderRowForLinkToExternalSAMApp(
            'Export',
            AdvancedSettingsConstants.EXPORT_URL_PATH,
            exportParams
          )}
          <tr className="advanced-settings-table__tr">
            <td className="advanced-settings-table__td">
              <Link to="/roster/manageInactiveAccounts">Manage Inactive Accounts</Link>
            </td>
          </tr>
          {renderRowForLinkToExternalSAMApp(
            'Manage Student Promotions',
            AdvancedSettingsConstants.STUDENT_PROMOTIONS_URL_PATH,
            manageStudentPromotionsParams
          )}
          {renderRowForLinkToExternalSAMApp(
            'View Output Files',
            AdvancedSettingsConstants.VIEW_OUTPUT_FILES_URL_PATH,
            viewOutputFilesParams
          )}
          <tr className="advanced-settings-table__tr">
            <td className="advanced-settings-table__td">
              {/* TODO: Use the currently selected school ID as a parameter to this
                  Maintenance Log link, most likely from the Smart bar data slice? */}
              <a href="" target="_blank">
                Maintenance Log (PDF)
              </a>
            </td>
          </tr>
          <tr className="advanced-settings-table__tr">
            <td className="advanced-settings-table__td">
              <Link to="/roster/manageAdminAccounts">Manage Admin Accounts</Link>
            </td>
          </tr>
          <tr className="advanced-settings-table__tr">
            <td className="advanced-settings-table__td">
              {props.profileOrgType === USER_ORG.District &&
                isUserTypeAdminOrTech(props.profileUserType) && (
                  <Link to="/roster/manageSMA">Manage SMA</Link>
                )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

AdvancedSettings.propTypes = {
  profileUserId: PropTypes.string.isRequired,
  profileDistrictId: PropTypes.string.isRequired,
  profileSessionId: PropTypes.string.isRequired,
  profileOrgType: PropTypes.string,
  profileUserType: PropTypes.string,
};

export default AdvancedSettings;
