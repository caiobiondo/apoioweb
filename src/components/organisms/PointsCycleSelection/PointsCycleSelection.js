/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Icon } from 'natura-ui';
import { injectIntl, FormattedMessage } from 'react-intl';
import {
  CenterWrapper,
  CycleButton,
  CycleNumber,
  CycleText,
  IconWrapper,
  LabelsBlock,
  LineBreak,
  PeriodSwitcherActiveButton,
  PeriodSwitcherButton,
  PeriodSwitcherStyles,
  SelectedCyclePointer,
  WrapperStyles,
} from './PointsCycleSelection.styles';

const getCycleText = (cycleNumber, currentCycleNumber, points) => {
  if (cycleNumber === currentCycleNumber) {
    return <FormattedMessage id="current" />;
  }

  return <FormattedMessage id="cyclePoints" values={{ points }} />;
};

const renderCycle = (cycle, props) => {
  const { currentCycleNumber, currentLevelColor, onCycleClick, selectedCycleNumber } = props;
  let icon, color, background, selectedCyclePointer;

  if (cycle.points > 0) {
    color = '#66a944';
    icon = (
      <IconWrapper color={color}>
        <Icon file="ico_check" />
      </IconWrapper>
    );
  } else if (cycle.number == currentCycleNumber) {
    color = '#fff';
    background = currentLevelColor;
  } else if (cycle.points === 0) {
    color = '#e03726';
    icon = (
      <IconWrapper color={color}>
        <Icon file="ico_times" />
      </IconWrapper>
    );
  }

  if (selectedCycleNumber === cycle.number) {
    selectedCyclePointer = <SelectedCyclePointer />;
  }

  return (
    <CycleButton
      onClick={() => onCycleClick(cycle)}
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
      {selectedCyclePointer}
    </CycleButton>
  );
};

const getCycles = props => {
  const { startCycle, endCycle, currentCycleNumber, scoreCycles } = props;
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
  const { startCycle, endCycle, currentCycleNumber, scoreCycles, currentLevelColor } = props;
  const onClick = props.onCycleClick;
  const cycles = getCycles(props);

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

        {cycles.map(cycle => renderCycle(cycle, props))}
      </Paper>
    </CenterWrapper>
  );
};

export default injectIntl(PointsCycleSelection);
