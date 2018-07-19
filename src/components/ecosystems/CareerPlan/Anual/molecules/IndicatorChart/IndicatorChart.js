import React, { Component } from 'react';

import { VictoryLine, VictoryGroup } from 'victory';

import IndicatorChartConfig from './IndicatorChart.config';
import { IndicatorChartWrapper, IndicatorChartStyles } from './IndicatorChart.styles';

export default class IndicatorChart extends Component {
  constructor(props) {
    super();
    this.chartStyles = IndicatorChartStyles({ indicatorType: props.indicatorType });
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
      x: index,
      y: value(cycle),
    });

    const currentPeriod = cycles.map(parseData).filter(item => item.y >= 0);
    const pastPeriod = pastCycles.map(parseData).filter(item => item.y >= 0);

    return { currentPeriod, pastPeriod };
  };

  updateChartDimensions = (props = {}) => {
    if (!this.chartNode || !props.cycleNode) {
      return;
    }

    const { cycleNode } = props;
    const { currentPeriod } = this.state.cycles;
    const cycleWidth = cycleNode.offsetWidth;

    const chartHeight = this.chartNode.offsetHeight;
    const chartWidth = cycleWidth * (currentPeriod.length - 1);

    this.setState({
      chartHeight,
      chartWidth,
    });
  };

  renderChart = () => {
    const { chartWidth, chartHeight, cycles } = this.state;
    const { pastPeriod, currentPeriod } = cycles ? cycles : {};

    if (pastPeriod.length <= 1 && currentPeriod.length <= 1) {
      return;
    }

    return (
      <VictoryGroup
        width={chartWidth}
        height={chartHeight}
        style={this.chartStyles.Group}
        {...IndicatorChartConfig.Group}
      >
        {this.renderCurrentChart(currentPeriod)}
        {this.renderPastChart(pastPeriod)}
      </VictoryGroup>
    );
  };

  renderCurrentChart = currentPeriod => {
    if (!currentPeriod.length > 1) {
      return;
    }

    return (
      <VictoryLine
        style={this.chartStyles.CurrentPeriod}
        data={currentPeriod}
        {...IndicatorChartConfig.CurrentPeriod}
      />
    );
  };

  renderPastChart = pastPeriod => {
    if (!pastPeriod.length > 1) {
      return;
    }

    return (
      <VictoryLine
        style={this.chartStyles.PastPeriod}
        data={pastPeriod}
        {...IndicatorChartConfig.PastPeriod}
      />
    );
  };

  render() {
    const { chartWidth } = this.state;
    const { indicatorType } = this.props;

    return (
      <IndicatorChartWrapper key={indicatorType} innerRef={this.setChartNode} width={chartWidth}>
        {this.renderChart()}
      </IndicatorChartWrapper>
    );
  }
}
