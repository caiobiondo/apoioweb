/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from 'natura-ui';
import { injectIntl, FormattedMessage } from 'react-intl';
import {
  CenterWrapper,
  WrapperStyles,
  PeriodSwitcherStyles,
  PeriodSwitcherActiveButton,
  PeriodSwitcherButton,
  LabelsBlock,
  CycleButton,
  LineBreak,
  CycleNumber,
  CycleText,
} from './PointsCycleSelection.styles';

const getCycleText = (cycleNumber, currentCycleNumber, points) => {
  if (cycleNumber === currentCycleNumber) {
    return <FormattedMessage id="current" />;
  }

  return <FormattedMessage id="cyclePoints" values={{ points }} />;
};

const renderCycle = (currentCycleNumber, cycle, currentLevelColor, onClick) => {
  let icon, color, background;
  if (cycle.points > 0) {
    color = '#66a944';
  } else if (cycle.number == currentCycleNumber) {
    color = '#fff';
    background = currentLevelColor;
  } else if (cycle.points === 0) {
    color = '#e03726';
  }

  return (
    <CycleButton
      onClick={() => onClick(cycle)}
      key={cycle.number}
      color={color}
      background={background}
    >
      <CycleNumber>
        {icon}
        {cycle.number}
      </CycleNumber>
      <LineBreak />
      <CycleText>{cycle.text}</CycleText>
    </CycleButton>
  );
};

const getCycles = (startCycle, endCycle, currentCycleNumber, scoreCycles) => {
  const range = [...Array(endCycle).keys()];
  let cycles = range.reduce((cycles, cycleNumber) => {
    cycleNumber += 1;

    if (cycleNumber >= startCycle) {
      cycles[cycleNumber] = {
        number: cycleNumber,
        text: '\u00A0',
      };
    }

    return cycles;
  }, []);

  /* eslint-disable camelcase */
  scoreCycles.forEach(cycle => {
    const points = cycle.vl_score;
    cycles[cycle.nm_cycle] = {
      number: cycle.nm_cycle,
      text: getCycleText(cycle.nm_cycle, currentCycleNumber, points),
      points,
    };
  });
  /* eslint-enable camelcase */

  return cycles;
};

const PointsCycleSelection = props => {
  const { startCycle, endCycle, currentCycle, scoreCycles, currentLevelColor } = props;
  const onClick = props.onCycleClick;
  const currentCycleNumber = parseInt(currentCycle.split('/')[0]);
  const cycles = getCycles(startCycle, endCycle, currentCycleNumber, scoreCycles);

  return (
    <CenterWrapper>
      <Paper style={PeriodSwitcherStyles}>
        <PeriodSwitcherActiveButton>
          <FormattedMessage id="currentPeriod" />
        </PeriodSwitcherActiveButton>

        <PeriodSwitcherButton>
          <FormattedMessage id="lastPeriod" />
        </PeriodSwitcherButton>
      </Paper>

      <Paper style={WrapperStyles}>
        <LabelsBlock>
          <FormattedMessage id="cycleLabel" />
          <LineBreak />
          <FormattedMessage id="scoreLabel" />
        </LabelsBlock>
        {cycles.map(cycle => renderCycle(currentCycleNumber, cycle, currentLevelColor, onClick))}
      </Paper>
    </CenterWrapper>
  );
};

export default injectIntl(PointsCycleSelection);
