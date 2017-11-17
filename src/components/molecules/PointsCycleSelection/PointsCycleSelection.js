/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Wrapper, CycleButton } from './PointsCycleSelection.styles';

const renderCycle = (currentCycle, number, onClick) => {
  return <CycleButton onClick={onClick}>number</CycleButton>;
};

const getCycles = (startCycle, endCycle) => {
  const range = [...Array(endCycle).keys()];

  return range.reduce((cycles, cycle) => {
    cycle += 1;

    if (cycle >= startCycle) {
      cycles.push(cycle);
    }

    return cycles;
  }, []);
};

const PointsCycleSelection = props => {
  const { startCycle, endCycle, currentCycle } = props;
  const onClick = props.onCycleClick;
  const cycles = getCycles(startCycle, endCycle);
  return null;
  // return (
  //   <Wrapper>
  //     {cycles.map(number => renderCycle(currentCycle, number, onClick))}
  //   </Wrapper>
  // );
};

export default injectIntl(PointsCycleSelection);
