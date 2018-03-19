import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import propTypes from 'prop-types';

import ModalConcept from '../../molecules/ModalConcept/';

import { IndicatorTypesLabels, IndicatorTypesColors } from '../../IndicatorTypes.enum';

import conceptsMock from '../Indicator/IndicatorConceptMock';

import { VictoryLine, VictoryGroup } from 'victory';

import { ChartIndicatorListWrapper, IndicatorChartWrapper } from './ChartIndicatorList.styles';

import { gray150 } from 'styles/colors';

import {
  IndicatorDataWrapper,
  IndicatorDataSort,
  IndicatorDataContent,
  IndicatorDataRow,
  IndicatorDataConceptValue,
} from '../../molecules/IndicatorData/IndicatorData.styles';

import {
  IndicatorWrapper,
  IndicatorWeightWrapper,
  IndicatorWeightLabel,
  IndicatorWeightValue,
  IndicatorTitle,
  IndicatorInfo,
  IndicatorContentWrapper,
  IndicatorTableHeader,
  IndicatorTableHeaderItemFeatured,
  IndicatorTableContent,
  IndicatorTableContentWrapper,
  IndicatorTableLegend,
  IndicatorTableLegendItem,
} from '../Indicator/Indicator.styles';

export class ChartIndicatorList extends Component {
  constructor() {
    super();
    this.state = {
      concepts: conceptsMock,
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

  componentDidMount() {
    this.updateChartDimensions();
    window.addEventListener('resize', this.updateChartDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateChartDimensions);
  }

  isCycleFilled = cycle => {
    if (!cycle) {
      return true;
    }

    const { naturaNetwork, directSale } = cycle;
    return naturaNetwork !== 0 || directSale || 0;
  };

  setChartNode = node => {
    this.chartNode = node;
  };

  setIndicatorDataNode = node => {
    this.indicatorDataNode = node;
  };

  updateChartDimensions = () => {
    if (!this.chartNode) {
      return;
    }

    this.setState({
      chartHeight: this.chartNode.offsetHeight,
      chartWidth: this.indicatorDataNode.offsetWidth * this.state.currentYear.length,
    });
  };

  renderIndicatorChart = indicator => {
    const { chartWidth, chartHeight } = this.state;

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
  };

  renderIndicatorData = indicatorData => {
    return (
      <IndicatorDataWrapper
        editable={false}
        key={indicatorData.cycle}
        onClick={this.onClick}
        size="5"
        innerRef={this.setIndicatorDataNode}
        bordered
      >
        <IndicatorDataSort index={indicatorData.cycle}>{indicatorData.cycle}</IndicatorDataSort>

        <IndicatorDataContent>
          <IndicatorDataRow>
            <IndicatorDataConceptValue concept={indicatorData.consolidated.value} />
          </IndicatorDataRow>
        </IndicatorDataContent>
      </IndicatorDataWrapper>
    );
  };

  renderIndicator = indicator => {
    const { informationModalOpened, concepts } = this.state;

    return (
      <IndicatorWrapper indicatorType={indicator.indicatorType}>
        <IndicatorWeightWrapper>
          <IndicatorWeightLabel>
            <FormattedMessage id="weight" />
          </IndicatorWeightLabel>
          <IndicatorWeightValue>{indicator.significance}</IndicatorWeightValue>
        </IndicatorWeightWrapper>

        <IndicatorTitle>{IndicatorTypesLabels[indicator.indicatorType]}</IndicatorTitle>
        <IndicatorInfo onClick={this.openInformationModal}>
          <FormattedMessage id="information" />
        </IndicatorInfo>
        <IndicatorContentWrapper>
          <IndicatorTableHeader>
            <IndicatorTableHeaderItemFeatured>Superação acumulada</IndicatorTableHeaderItemFeatured>

            <IndicatorTableLegend indicatorType={indicator.indicatorType}>
              <IndicatorTableLegendItem>2018</IndicatorTableLegendItem>
              <IndicatorTableLegendItem>2017</IndicatorTableLegendItem>
            </IndicatorTableLegend>
          </IndicatorTableHeader>

          <IndicatorTableContentWrapper hasChart>
            <IndicatorTableContent>
              {indicator.cycles.map(this.renderIndicatorData)}
            </IndicatorTableContent>
            {this.renderIndicatorChart(indicator)}
          </IndicatorTableContentWrapper>
        </IndicatorContentWrapper>

        <ModalConcept
          key="informationDialog"
          title={IndicatorTypesLabels[indicator.indicatorType]}
          onClose={this.closeInformationModal}
          open={informationModalOpened}
          concepts={concepts}
        />
      </IndicatorWrapper>
    );
  };

  render() {
    const { indicators } = this.props;

    return (
      <div>
        <ChartIndicatorListWrapper>
          {indicators.map(this.renderIndicator)}
        </ChartIndicatorListWrapper>
      </div>
    );
  }
}

ChartIndicatorList.propTypes = {
  indicators: propTypes.array.isRequired,
};

export const ChartIndicatorListWithIntl = injectIntl(ChartIndicatorList);

export default ChartIndicatorListWithIntl;
