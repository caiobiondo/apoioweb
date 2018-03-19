import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import propTypes from 'prop-types';

import ModalConcept from 'components/ecosystems/CareerPlan/molecules/ModalConcept';

import {
  IndicatorTypesLabels,
  IndicatorTypesColors,
} from 'components/ecosystems/CareerPlan/enums/IndicatorTypes';

import conceptsMock from 'components/ecosystems/CareerPlan/mocks/IndicatorConceptMock';

import IndicatorData from 'components/ecosystems/CareerPlan/Anual/molecules/IndicatorData';

import { VictoryLine, VictoryGroup } from 'victory';

import { gray150 } from 'styles/colors';

import { IndicatorChartWrapper } from './Indicator.styles';

import IndicatorChart from 'components/ecosystems/CareerPlan/Anual/molecules/IndicatorChart';

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
} from 'components/ecosystems/CareerPlan/Cycles/organisms/Indicator/Indicator.styles';

export class Indicator extends Component {
  constructor() {
    super();
    this.state = {};
  }

  setIndicatorDataNode = node => {
    this.setState({
      indicatorCycleNode: node,
    });
  };

  renderIndicatorChart = () => {
    const { indicator } = this.props;
    const { indicatorCycleNode } = this.state;

    return (
      <IndicatorChart
        key={indicator.indicatorType}
        cycleNode={indicatorCycleNode}
        indicator={indicator}
      />
    );
  };

  renderIndicatorData = indicatorData => {
    return (
      <IndicatorData
        indicatorData={indicatorData}
        key={indicatorData.cycle}
        setRef={this.setIndicatorDataNode}
      />
    );
  };

  render() {
    const { informationModalOpened } = this.state;
    const { indicator, concepts } = this.props;

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
            {this.renderIndicatorChart()}
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
  }
}

Indicator.propTypes = {
  indicators: propTypes.array.isRequired,
};

export const IndicatorWithIntl = injectIntl(Indicator);

export default IndicatorWithIntl;
