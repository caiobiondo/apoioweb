import React, { Component } from 'react';

import { VictoryLine, VictoryGroup } from 'victory';

import IndicatorChartConfig from './IndicatorChart.config';
import { IndicatorChartWrapper, IndicatorChartStyles } from './IndicatorChart.styles';

export default class IndicatorChart extends Component {
  constructor(props) {
    super();
    this.state = {
      cycles: this.getChartData(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.updateChartDimensions(nextProps);
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.updateChartDimensions(this.props);
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => {
      this.updateChartDimensions(this.props);
    });
  }

  setChartNode = node => {
    this.chartNode = node;
  };

  getChartData = ({ cycles, pastCycles, value }) => {
    const parseData = (cycle, index) => ({
      x: index + 1,
      y: value(cycle),
    });

    const currentPeriod = cycles.map(parseData).filter(item => item.y > 0);
    const pastPeriod = pastCycles.map(parseData).filter(item => item.y > 0);

    return { currentPeriod, pastPeriod };
  };

  updateChartDimensions = (props = {}) => {
    if (!this.chartNode || !props.cycleNode) {
      return;
    }

    const { cycleNode } = props;
    const { pastPeriod } = this.state.cycles;
    const cycleWidth = cycleNode.offsetWidth;

    const chartHeight = this.chartNode.offsetHeight;
    const chartWidth = cycleWidth * (pastPeriod.length - 1);

    this.setState({
      chartHeight,
      chartWidth,
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
