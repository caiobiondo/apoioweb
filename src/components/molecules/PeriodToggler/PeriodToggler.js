/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Wrapper, ActiveButton, Button } from './PeriodToggler.styles';

const PeriodToggler = props => {
  return (
    <CenterWrapper>
      <Wrapper>
        <ActiveButton>
          <FormattedMessage id="currentPeriod" />
        </ActiveButton>

        <Button>
          <FormattedMessage id="lastPeriod" />
        </Button>
      </Wrapper>
    </CenterWrapper>
  );
};

export default injectIntl(PeriodToggler);
