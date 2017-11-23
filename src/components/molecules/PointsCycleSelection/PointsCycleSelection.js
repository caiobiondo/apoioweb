/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from 'natura-ui';
import { injectIntl, FormattedMessage } from 'react-intl';
import {
  CenterWrapper,
  WrapperStyles,
  LabelsBlock,
  CycleButton,
  LineBreak,
  CycleNumber,
  CycleText,
} from './PointsCycleSelection.styles';

const getDefaultCycleText = (cycleNumber, currentCycleNumber) => {
  if (cycleNumber === currentCycleNumber) {
    return <FormattedMessage id="current" />;
  }

  if (cycleNumber > currentCycleNumber) {
    return '\u00A0';
  }

  return '';
};

const renderCycle = (currentCycle, cycle, onClick) => {
  return (
    <CycleButton onClick={() => onClick(cycle)} key={cycle.number}>
      <CycleNumber>{cycle.number}</CycleNumber>
      <LineBreak />
      <CycleText>{cycle.text}</CycleText>
    </CycleButton>
  );
};

const getCycles = (startCycle, endCycle, currentCycle, scoreCycles) => {
  const range = [...Array(endCycle).keys()];
  const currentCycleNumber = parseInt(currentCycle.split('/')[0]);
  let cycles = range.reduce((cycles, cycleNumber) => {
    cycleNumber += 1;

    if (cycleNumber >= startCycle) {
      cycles[cycleNumber] = {
        number: cycleNumber,
        text: getDefaultCycleText(cycleNumber, currentCycleNumber),
      };
    }

    return cycles;
  }, []);

  /* eslint-disable camelcase */
  scoreCycles.forEach(cycle => {
    cycles[cycle.nm_cycle] = {
      number: cycle.nm_cycle,
      text: <FormattedMessage id="cyclePoints" values={{ points: cycle.vl_score }} />,
    };
  });
  /* eslint-enable camelcase */

  return cycles;
};

const PointsCycleSelection = props => {
  const { startCycle, endCycle, currentCycle, scoreCycles } = props;
  const onClick = props.onCycleClick;
  const cycles = getCycles(startCycle, endCycle, currentCycle, scoreCycles);

  return (
    <CenterWrapper>
      <Paper style={WrapperStyles}>
        <LabelsBlock>
          <CycleNumber>
            <FormattedMessage id="cycleLabel" />
          </CycleNumber>
          <LineBreak />
          <CycleText>
            <FormattedMessage id="scoreLabel" />
          </CycleText>
        </LabelsBlock>
        {cycles.map(cycle => renderCycle(currentCycle, cycle, onClick))}
      </Paper>
    </CenterWrapper>
  );
};

export default injectIntl(PointsCycleSelection);
