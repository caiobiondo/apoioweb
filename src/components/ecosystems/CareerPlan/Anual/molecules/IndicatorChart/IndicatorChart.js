import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import propTypes from 'prop-types';

import { IndicatorTypesColors } from 'components/ecosystems/CareerPlan/enums/IndicatorTypes';

import { VictoryLine, VictoryGroup } from 'victory';

import { gray150 } from 'styles/colors';

import { IndicatorChartWrapper } from './IndicatorChart.styles';

export class IndicatorChart extends Component {
  constructor() {
    super();
    this.state = {
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

  setChartNode = node => {
    this.chartNode = node;
  };

  updateChartDimensions = (props = {}) => {
    const { cycleNode } = props;
    const cycleWidth = cycleNode ? cycleNode.offsetWidth : 0;

    if (!this.chartNode) {
      return;
    }

    this.setState({
      chartHeight: this.chartNode.offsetHeight,
      chartWidth: cycleWidth * this.state.currentYear.length,
    });
  };

  render() {
    const { chartWidth, chartHeight } = this.state;
    const { indicator } = this.props;

    return (
      <IndicatorChartWrapper
        key={indicator.indicatorType}
        innerRef={this.setChartNode}
        width={chartWidth}
      >
        <VictoryGroup
          width={chartWidth}
          height={chartHeight}
          style={{
            data: { strokeWidth: '1' },
          }}
          domainPadding={{ x: 10, y: 20 }}
          padding={0}
        >
          <VictoryLine
            interpolation="natural"
            animate={{
              onLoad: { duration: 800 },
            }}
            style={{ data: { stroke: IndicatorTypesColors[indicator.indicatorType] } }}
            data={this.state.currentYear}
          />
          <VictoryLine
            interpolation="natural"
            animate={{
              onLoad: { duration: 800 },
            }}
            style={{ data: { stroke: gray150 } }}
            data={this.state.pastYear}
          />
        </VictoryGroup>
      </IndicatorChartWrapper>
    );
  }
}

IndicatorChart.propTypes = {
  indicators: propTypes.array.isRequired,
};

export const IndicatorWithIntl = injectIntl(IndicatorChart);

export default IndicatorWithIntl;
