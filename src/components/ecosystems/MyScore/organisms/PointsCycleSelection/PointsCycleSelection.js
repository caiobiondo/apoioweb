/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Icon } from 'natura-ui';
import { FormattedMessage } from 'react-intl';
import {
  OuterWrapper,
  InnerWrapper,
  CycleButton,
  CycleNumber,
  CycleText,
  IconWrapper,
  LabelsBlock,
  LineBreak,
  SelectedCyclePointer,
  SelectedCyclePointerWrapper,
  WrapperStyles,
} from './PointsCycleSelection.styles';

const getCycleText = (cycleNumber, currentCycleNumber, points, currentPeriodSelected) => {
  if (cycleNumber === currentCycleNumber && currentPeriodSelected) {
    return <FormattedMessage id="current" />;
  }

  return <FormattedMessage id="cyclePoints" values={{ points }} />;
};

const renderCycle = (cycle, props) => {
  let icon, color, background, selectedCyclePointer;
  const currentPeriodSelected = props.selectedPeriod === 'current';

  if (cycle.points > 0) {
    color = '#66a944';
    icon = (
      <IconWrapper color={color}>
        <Icon file="ico_check" />
      </IconWrapper>
    );
  } else if (cycle.number == props.currentCycleNumber && currentPeriodSelected) {
    color = '#fff';
    background = props.currentLevelColor;
  } else if (cycle.points === 0) {
    color = '#e03726';
    icon = (
      <IconWrapper color={color}>
        <Icon file="ico_times" />
      </IconWrapper>
    );
  }

  if (props.selectedCycleNumber === cycle.number) {
    selectedCyclePointer = (
      <SelectedCyclePointerWrapper>
        <SelectedCyclePointer />
      </SelectedCyclePointerWrapper>
    );

    background = '#FAFAFA';
  }

  return (
    <CycleButton
      onClick={() => props.onCycleClick(cycle.number)}
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
  const currentPeriodSelected = props.selectedPeriod === 'current';
  let cycles = [];
  const range = [...Array(endCycle + 1).keys()];

  if (currentPeriodSelected) {
    cycles = range.map(cycleNumber => {
      return {
        number: cycleNumber,
        text: '\u00A0',
      };
    });
  }

  /* eslint-disable camelcase */
  scoreCycles.forEach(cycle => {
    const points = cycle.vl_score;
    const newCycle = {
      number: cycle.nm_cycle,
      text: getCycleText(cycle.nm_cycle, currentCycleNumber, points, currentPeriodSelected),
      points,
    };

    startCycle === cycle.nm_cycle ? (cycles[0] = newCycle) : (cycles[cycle.nm_cycle] = newCycle);
  });
  /* eslint-enable camelcase */

  return cycles;
};

const PointsCycleSelection = props => {
  const {
    startCycle,
    endCycle,
    currentCycleNumber,
    scoreCycles,
    currentLevelColor,
    selectedCycleNumber,
  } = props;
  const cycles = getCycles(props);

  return (
    <OuterWrapper selected={selectedCycleNumber}>
      <InnerWrapper>
        <Paper style={WrapperStyles}>
          <LabelsBlock>
            <FormattedMessage id="cycleLabel" />
            <LineBreak />
            <FormattedMessage id="scoreLabel" />
          </LabelsBlock>

          {cycles.map(cycle => renderCycle(cycle, props))}
        </Paper>
      </InnerWrapper>
    </OuterWrapper>
  );
};

export default PointsCycleSelection;
