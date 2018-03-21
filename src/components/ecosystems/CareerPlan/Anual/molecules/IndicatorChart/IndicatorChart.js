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

  updateChartData = ({ indicator, pastIndicator }) => {
    if (!indicator || !pastIndicator) {
      return;
    }

    const currentPeriod = indicator.cycles.map((cycle, index) => ({
      x: cycle.objective,
      y: index + 1,
    }));

    const pastPeriod = pastIndicator.cycles.map((cycle, index) => ({
      x: cycle.objective,
      y: index + 1,
    }));

    return { currentPeriod, pastPeriod };
  };

  updateChartDimensions = (props = {}) => {
    const { cycleNode } = props;
    const { currentPeriod } = this.state.cycles;
    const cycleWidth = cycleNode ? cycleNode.offsetWidth : 0;

    if (!this.chartNode) {
      return;
    }

    this.setState({
      chartHeight: this.chartNode.offsetHeight,
      chartWidth: cycleWidth * currentPeriod.length,
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
            style={chartStyles.CurrentPeriod}
            data={cycles.currentPeriod}
            {...IndicatorChartConfig.CurrentPeriod}
          />
          <VictoryLine
            style={chartStyles.PastPeriod}
            data={cycles.pastPeriod}
            {...IndicatorChartConfig.PastPeriod}
          />
        </VictoryGroup>
      </IndicatorChartWrapper>
    );
  }
}

export const IndicatorWithIntl = injectIntl(IndicatorChart);

export default IndicatorWithIntl;
