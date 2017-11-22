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

const getCycleText = (cycleNumber, currentCycleNumber) => {
  if (cycleNumber === currentCycleNumber) {
    return <FormattedMessage id="current" />;
  }

  if (cycleNumber > currentCycleNumber) {
    return '\u00A0';
  }

  return `${cycleNumber * 128} pts`;
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

const getCycles = (startCycle, endCycle, currentCycle) => {
  const range = [...Array(endCycle).keys()];
  const currentCycleNumber = parseInt(currentCycle.split('/')[0]);
  return range.reduce((cycles, cycleNumber) => {
    cycleNumber += 1;

    if (cycleNumber >= startCycle) {
      cycles.push({
        number: cycleNumber,
        text: getCycleText(cycleNumber, currentCycleNumber),
      });
    }

    return cycles;
  }, []);
};

const PointsCycleSelection = props => {
  const { startCycle, endCycle, currentCycle } = props;
  const onClick = props.onCycleClick;
  const cycles = getCycles(startCycle, endCycle, currentCycle);

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
