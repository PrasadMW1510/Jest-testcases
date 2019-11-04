/**
 *
 * SettingsNoEnrollmentsMessage
 *
 */

import PropTypes from 'prop-types';
import React from 'react';

import SettingsMessage from 'components/SettingsMessage';
import { COHORT_TYPE } from 'containers/App/constants';

function SettingsNoEnrollmentsMessage({ cohort, productName }) {
  const createMessage = () => {
    if (cohort === COHORT_TYPE.Student) {
      return `This student is not enrolled in ${productName}.`;
    }

    return `This ${cohort.toLowerCase()} does not have any students enrolled in ${productName}.`;
  };

  return <SettingsMessage message1={createMessage()} />;
}

SettingsNoEnrollmentsMessage.propTypes = {
  cohort: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
};

export default SettingsNoEnrollmentsMessage;
