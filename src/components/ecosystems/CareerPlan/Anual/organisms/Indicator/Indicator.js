import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import propTypes from 'prop-types';

import { IndicatorTypesLabels } from 'components/ecosystems/CareerPlan/enums/IndicatorTypes';

import IndicatorData from 'components/ecosystems/CareerPlan/Anual/molecules/IndicatorData';
import IndicatorChart from 'components/ecosystems/CareerPlan/Anual/molecules/IndicatorChart';
import ModalConcept from 'components/ecosystems/CareerPlan/molecules/ModalConcept';

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
    this.state = {
      informationModalOpened: false,
    };
  }

  openInformationModal = () => {
    this.setState({ informationModalOpened: true });
  };

  closeInformationModal = () => {
    this.setState({ informationModalOpened: false });
  };

  setIndicatorDataNode = node => {
    this.setState({
      indicatorCycleNode: node,
    });
  };

  setActiveCycle = cycle => {
    this.setState({ activeCycle: cycle.cycle });
  };

  removeActiveCycle = () => {
    this.setState({ activeCycle: null });
  };

  renderIndicatorChart = () => {
    const { indicator, pastIndicator } = this.props;
    const { indicatorCycleNode } = this.state;

    return (
      <IndicatorChart
        key={indicator.indicatorType}
        cycleNode={indicatorCycleNode}
        indicator={indicator}
        pastIndicator={pastIndicator}
      />
    );
  };

  renderIndicatorData = indicatorData => {
    const { indicator } = this.props;

    return (
      <IndicatorData
        indicator={indicator}
        indicatorData={indicatorData}
        key={indicatorData.cycle}
        setRef={this.setIndicatorDataNode}
        showDetails={this.state.activeCycle === indicatorData.cycle}
        onClick={this.setActiveCycle}
        onClose={this.removeActiveCycle}
      />
    );
  };

  render() {
    const { informationModalOpened } = this.state;
    const { indicator, concepts } = this.props;
    const now = new Date();
    const currentYear = now.getFullYear();
    const lastYear = currentYear - 1;

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
              <IndicatorTableLegendItem>{currentYear}</IndicatorTableLegendItem>
              <IndicatorTableLegendItem>{lastYear}</IndicatorTableLegendItem>
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
  concepts: propTypes.array.isRequired,
  indicator: propTypes.object.isRequired,
};

export const IndicatorWithIntl = injectIntl(Indicator);

export default IndicatorWithIntl;
