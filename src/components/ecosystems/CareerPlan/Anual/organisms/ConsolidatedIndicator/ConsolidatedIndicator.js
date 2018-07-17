import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import propTypes from 'prop-types';
import { translate } from 'locale';

import TrophyIcon from 'assets/images/trophy.png';
import IndicatorData from 'components/ecosystems/CareerPlan/Anual/molecules/IndicatorData';
import IndicatorChart from 'components/ecosystems/CareerPlan/Anual/molecules/IndicatorChart';
import ModalConcept from 'components/ecosystems/CareerPlan/molecules/ModalConcept';

import { ConsolidatedIndicatorWrapper } from 'components/ecosystems/CareerPlan/Cycles/organisms/ConsolidatedIndicator/ConsolidatedIndicator.styles';

import {
  IndicatorWrapper,
  IndicatorWeightWrapper,
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

export class ConsolidatedIndicator extends Component {
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
    const { consolidatedCycles, pastConsolidatedCycles } = this.props;
    const { indicatorCycleNode } = this.state;

    return (
      <IndicatorChart
        cycleNode={indicatorCycleNode}
        cycles={consolidatedCycles}
        pastCycles={pastConsolidatedCycles}
        value={item => {
          return item.overcoming ? item.overcoming.value : 0;
        }}
      />
    );
  };

  isSimulated = cycle => {
    return Boolean(cycle.concept);
  };

  renderIndicatorData = indicatorData => {
    return (
      <IndicatorData
        indicatorData={indicatorData}
        isSimulated={this.isSimulated(indicatorData)}
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
    const { consolidatedCycles, pastConsolidatedCycles, concepts } = this.props;
    const now = new Date();
    const currentYear = now.getFullYear();
    const lastYear = currentYear - 1;

    if (!consolidatedCycles) {
      return null;
    }

    return (
      <IndicatorWrapper>
        <ConsolidatedIndicatorWrapper>
          <IndicatorWeightWrapper>
            <img src={TrophyIcon} alt={translate('consolidated')} />
          </IndicatorWeightWrapper>

          <IndicatorTitle>
            <FormattedMessage id="consolidated" />
          </IndicatorTitle>
          <IndicatorInfo onClick={this.openInformationModal}>
            <FormattedMessage id="information" />
          </IndicatorInfo>
          <IndicatorContentWrapper>
            <IndicatorTableHeader>
              <IndicatorTableHeaderItemFeatured>
                Superação acumulada
              </IndicatorTableHeaderItemFeatured>

              <IndicatorTableLegend>
                <IndicatorTableLegendItem>{currentYear}</IndicatorTableLegendItem>
                {pastConsolidatedCycles &&
                  pastConsolidatedCycles.length > 0 && (
                    <IndicatorTableLegendItem>{lastYear}</IndicatorTableLegendItem>
                  )}
              </IndicatorTableLegend>
            </IndicatorTableHeader>

            <IndicatorTableContentWrapper hasChart>
              <IndicatorTableContent>
                {consolidatedCycles.map(this.renderIndicatorData)}
              </IndicatorTableContent>
              {this.renderIndicatorChart()}
            </IndicatorTableContentWrapper>
          </IndicatorContentWrapper>

          <ModalConcept
            key="informationDialog"
            title={translate('consolidated')}
            onClose={this.closeInformationModal}
            open={informationModalOpened}
            concepts={concepts}
          />
        </ConsolidatedIndicatorWrapper>
      </IndicatorWrapper>
    );
  }
}

ConsolidatedIndicator.propTypes = {
  concepts: propTypes.array.isRequired,
};

export const ConsolidatedIndicatorWithIntl = injectIntl(ConsolidatedIndicator);

export default ConsolidatedIndicatorWithIntl;
