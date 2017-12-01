/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from 'natura-ui';
import { injectIntl, FormattedMessage } from 'react-intl';
import { WrapperStyles, ActiveButton, Button } from './PeriodToggler.styles';

const changeSelectedPeriod = (props, period) => {
  if (!props.changeSelectedPeriod) {
    return;
  }

  props.changeSelectedPeriod(period);
};

const PeriodToggler = props => {
  let CurrentPeriodButton, LastPeriodButton;
  if (props.activePeriod === 'current') {
    CurrentPeriodButton = ActiveButton;
    LastPeriodButton = Button;
  } else {
    LastPeriodButton = ActiveButton;
    CurrentPeriodButton = Button;
  }

  return (
    <Paper style={WrapperStyles}>
      <CurrentPeriodButton onClick={() => changeSelectedPeriod(props, 'current')}>
        <FormattedMessage id="currentPeriod" />
      </CurrentPeriodButton>

      <LastPeriodButton onClick={() => changeSelectedPeriod(props, 'last')}>
        <FormattedMessage id="lastPeriod" />
      </LastPeriodButton>
    </Paper>
  );
};

export default injectIntl(PeriodToggler);
