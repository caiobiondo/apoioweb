import React, { Component } from 'react';
import { injectIntl } from 'react-intl';

import { VictoryLine, VictoryGroup } from 'victory';

import IndicatorChartConfig from './IndicatorChart.config';
import { IndicatorChartWrapper, IndicatorChartStyles } from './IndicatorChart.styles';

export class IndicatorChart extends Component {
  constructor(props) {
    super();
    this.state = {
      cycles: this.updateChartData(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.updateChartData(nextProps);
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

  updateChartData = ({ cycles, pastCycles, value }) => {
    if (!cycles || !pastCycles) {
      return;
    }

    const currentPeriod = cycles
      .map((cycle, index) => ({
        x: index + 1,
        y: value(cycle),
      }))
      .filter(item => item.y > 0);

    const pastPeriod = pastCycles
      .map((cycle, index) => ({
        x: index + 1,
        y: value(cycle),
      }))
      .filter(item => item.y > 0);

    return { currentPeriod, pastPeriod };
  };

  updateChartDimensions = (props = {}) => {
    if (!this.chartNode) {
      return;
    }

    const { cycleNode } = props;
    const { pastPeriod } = this.state.cycles;
    const cycleWidth = cycleNode ? cycleNode.offsetWidth : 0;

    this.setState({
      chartHeight: this.chartNode.offsetHeight,
      chartWidth: cycleWidth * pastPeriod.length,
    });
  };

  render() {
    const { chartWidth, chartHeight, cycles } = this.state;
    const { indicatorType } = this.props;
    const chartStyles = IndicatorChartStyles({ indicatorType });
    const { currentPeriod, pastPeriod } = cycles ? cycles : {};

    return (
      <IndicatorChartWrapper key={indicatorType} innerRef={this.setChartNode} width={chartWidth}>
        <VictoryGroup
          width={chartWidth}
          height={chartHeight}
          style={chartStyles.Group}
          {...IndicatorChartConfig.Group}
        >
          <VictoryLine
            style={chartStyles.CurrentPeriod}
            data={currentPeriod}
            {...IndicatorChartConfig.CurrentPeriod}
          />
          <VictoryLine
            style={chartStyles.PastPeriod}
            data={pastPeriod}
            {...IndicatorChartConfig.PastPeriod}
          />
        </VictoryGroup>
      </IndicatorChartWrapper>
    );
  }
}

export const IndicatorWithIntl = injectIntl(IndicatorChart);

export default IndicatorWithIntl;
