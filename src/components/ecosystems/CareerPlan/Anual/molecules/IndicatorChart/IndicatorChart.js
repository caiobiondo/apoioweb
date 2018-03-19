import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import propTypes from 'prop-types';

import { VictoryLine, VictoryGroup } from 'victory';

import IndicatorChartConfig from './IndicatorChart.config';
import { IndicatorChartWrapper, IndicatorChartStyles } from './IndicatorChart.styles';

export class IndicatorChart extends Component {
  constructor({ cycles }) {
    super();
    this.state = {
      cycles: this.parseCycles(cycles),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.updateChartDimensions(nextProps);
  }

  componentDidMount() {
    this.updateChartDimensions();
    window.addEventListener('resize', () => {
      this.updateChartDimensions(this.props);
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => {
      this.updateChartDimensions(this.props);
    });
  }

  parseCycles = cycles => {
    return cycles;
  };

  setChartNode = node => {
    this.chartNode = node;
  };

  updateChartDimensions = (props = {}) => {
    const { cycleNode } = props;
    const { currentYear } = this.state.cycles;
    const cycleWidth = cycleNode ? cycleNode.offsetWidth : 0;

    if (!this.chartNode) {
      return;
    }

    this.setState({
      chartHeight: this.chartNode.offsetHeight,
      chartWidth: cycleWidth * currentYear.length,
    });
  };

  render() {
    const { chartWidth, chartHeight, cycles } = this.state;
    const { indicator } = this.props;
    const chartStyles = IndicatorChartStyles(indicator);

    return (
      <IndicatorChartWrapper
        key={indicator.indicatorType}
        innerRef={this.setChartNode}
        width={chartWidth}
      >
        <VictoryGroup
          width={chartWidth}
          height={chartHeight}
          style={chartStyles.Group}
          {...IndicatorChartConfig.Group}
        >
          <VictoryLine
            style={chartStyles.CurrentYear}
            data={cycles.currentYear}
            {...IndicatorChartConfig.CurrentYear}
          />
          <VictoryLine
            style={chartStyles.PastYear}
            data={cycles.pastYear}
            {...IndicatorChartConfig.PastYear}
          />
        </VictoryGroup>
      </IndicatorChartWrapper>
    );
  }
}

IndicatorChart.propTypes = {
  cycleNode: propTypes.node,
  cycles: propTypes.array,
};

IndicatorChart.defaultProps = {
  cycles: {
    currentYear: [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
      { x: 4, y: 4 },
      { x: 5, y: 5 },
      { x: 6, y: 5 },
      { x: 7, y: 4 },
      { x: 8, y: 3 },
      { x: 9, y: 3 },
      { x: 10, y: 2 },
      { x: 11, y: 1 },
      { x: 12, y: 2 },
      { x: 13, y: 3 },
      { x: 14, y: 4 },
      { x: 15, y: 5 },
      { x: 16, y: 6 },
      { x: 17, y: 4 },
      { x: 18, y: 3 },
      { x: 18, y: 3 },
    ],
    pastYear: [
      { x: 1, y: 5 },
      { x: 2, y: 4 },
      { x: 3, y: 2 },
      { x: 4, y: 1 },
      { x: 5, y: 4 },
      { x: 6, y: 6 },
      { x: 7, y: 8 },
      { x: 8, y: 8 },
      { x: 9, y: 7 },
      { x: 10, y: 1 },
      { x: 11, y: 3 },
      { x: 12, y: 2 },
      { x: 13, y: 5 },
      { x: 14, y: 8 },
      { x: 15, y: 9 },
      { x: 16, y: 2 },
      { x: 17, y: 3 },
      { x: 18, y: 2 },
    ],
  },
};

export const IndicatorWithIntl = injectIntl(IndicatorChart);

export default IndicatorWithIntl;
