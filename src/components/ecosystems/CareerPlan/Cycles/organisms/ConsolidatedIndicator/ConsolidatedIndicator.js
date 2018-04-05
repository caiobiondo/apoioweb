import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { translate } from 'locale';

import TrophyIcon from 'assets/images/trophy.png';
import ConsolidatedIndicatorData from '../../molecules/ConsolidatedIndicatorData';
import ModalConcept from 'components/ecosystems/CareerPlan/molecules/ModalConcept/';

import { ConsolidatedIndicatorWrapper } from './ConsolidatedIndicator.styles';

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
} from '../Indicator/Indicator.styles';

export class ConsolidatedIndicator extends Component {
  constructor() {
    super();
    this.cyclesNodes = {};
    this.state = {
      informationModalOpened: false,
    };
  }

  isValidCycle = (cycle, indicators = this.props.indicators) => {
    const { isCycleFilled } = this.props;
    return (
      indicators.filter(indicator => {
        const cycleToValidate = indicator.cycles.filter(c => c.cycle === cycle.cycle)[0];
        return isCycleFilled(cycleToValidate, indicator.indicatorType);
      }).length === indicators.length
    );
  };

  getVisibleCycles = () => {
    const { consolidatedCycles } = this.props;

    const { from, to } = this.props.range;
    const start = from === 0 ? 0 : from - 1;
    return consolidatedCycles.slice(start, to);
  };

  isActiveCycle = cycle => {
    const { consolidatedCycles } = this.props;
    const index = consolidatedCycles.indexOf(cycle);

    return (
      (index === 0 || this.isValidCycle(consolidatedCycles[index - 1])) && !this.isValidCycle(cycle)
    );
  };

  renderIndicatorData = cycle => {
    return (
      <ConsolidatedIndicatorData
        key={cycle.cycle}
        cycle={cycle}
        isValid={this.isValidCycle(cycle)}
        isActive={this.isActiveCycle(cycle)}
        consolidatedCycles={this.props.consolidatedCycles}
        {...this.props}
      />
    );
  };

  openInformationModal = () => {
    this.setState({ informationModalOpened: true });
  };

  closeInformationModal = () => {
    this.setState({ informationModalOpened: false });
  };

  render() {
    const consolidatedCycles = this.getVisibleCycles();
    const { concepts } = this.props;
    const { informationModalOpened } = this.state;

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
                <FormattedMessage id="finalResult" />
              </IndicatorTableHeaderItemFeatured>
              <IndicatorTableHeaderItemFeatured>
                <FormattedMessage id="rating" />
              </IndicatorTableHeaderItemFeatured>
            </IndicatorTableHeader>

            <IndicatorTableContentWrapper>
              <IndicatorTableContent>
                {consolidatedCycles.map(this.renderIndicatorData)}
              </IndicatorTableContent>
            </IndicatorTableContentWrapper>
          </IndicatorContentWrapper>
        </ConsolidatedIndicatorWrapper>

        <ModalConcept
          key="informationDialog"
          title={translate('consolidated')}
          onClose={this.closeInformationModal}
          open={informationModalOpened}
          concepts={concepts}
        />
      </IndicatorWrapper>
    );
  }
}

ConsolidatedIndicator.defaultProps = {
  consolidatedCycles: [],
};

export const ConsolidatedIndicatorWithIntl = injectIntl(ConsolidatedIndicator);

export default ConsolidatedIndicatorWithIntl;
