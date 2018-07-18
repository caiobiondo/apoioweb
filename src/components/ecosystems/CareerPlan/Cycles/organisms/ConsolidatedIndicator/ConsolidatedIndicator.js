import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { translate } from 'locale';
import { FormButton } from 'natura-ui';

import TrophyIcon from 'assets/images/trophy.png';
import ConsolidatedIndicatorData from '../../molecules/ConsolidatedIndicatorData';
import ModalConcept from 'components/ecosystems/CareerPlan/molecules/ModalConcept/';
import Snackbar from 'components/ecosystems/CareerPlan/molecules/Snackbar';

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
  IndicatorSaveButtonContainer,
  IndicatorSaveButtonWrapper,
} from '../Indicator/Indicator.styles';

export class ConsolidatedIndicator extends Component {
  constructor() {
    super();
    this.cyclesNodes = {};
    this.state = {
      informationModalOpened: false,
    };
  }

  isCycleFilled = ({ cycle }) => {
    const { isCycleFilled, indicators } = this.props;
    return (
      indicators.filter(indicator => {
        const cycleToValidate = indicator.cycles.find(c => c.cycle === cycle);
        return cycleToValidate && isCycleFilled(cycleToValidate, indicator.indicatorType);
      }).length === indicators.length
    );
  };

  isConsolidatedCycleSimulated = cycle => {
    return cycle.overcoming.value;
  };

  getVisibleCycles = () => {
    const { consolidatedCycles } = this.props;

    const { from, to } = this.props.range;
    const start = from === 0 ? 0 : from;
    return consolidatedCycles.slice(start, to);
  };

  isActiveCycle = cycle => {
    const { consolidatedCycles } = this.props;
    const firstInvalidCycle = consolidatedCycles.find(c => !this.isConsolidatedCycleSimulated(c));
    return firstInvalidCycle && firstInvalidCycle.cycle === cycle.cycle;
  };

  renderIndicatorData = cycle => {
    return (
      <ConsolidatedIndicatorData
        key={cycle.cycle}
        cycle={cycle}
        isValid={this.isConsolidatedCycleSimulated(cycle)}
        isFilled={this.isCycleFilled(cycle)}
        isActive={this.isActiveCycle(cycle)}
        consolidatedCycles={this.props.consolidatedCycles}
        isCurrentCycle={cycle.cycle === this.props.currentCycle}
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

  onSave = () => {
    return this.props
      .onConsolidatedUpdate()
      .then(() => {
        const message = translate('careerPlanSuccessMessage');
        Snackbar(message);
      })
      .catch(() => {
        const message = translate('careerPlanFailureMessage');
        Snackbar(message);
      });
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

        <IndicatorSaveButtonContainer>
          <IndicatorSaveButtonWrapper innerRef={this.setSaveButtonRef}>
            <FormButton
              primary
              onClick={this.onSave}
              label={<FormattedMessage id="updateConsolidated" />}
            />
          </IndicatorSaveButtonWrapper>
        </IndicatorSaveButtonContainer>
      </IndicatorWrapper>
    );
  }
}

ConsolidatedIndicator.defaultProps = {
  consolidatedCycles: [],
};

export const ConsolidatedIndicatorWithIntl = injectIntl(ConsolidatedIndicator);

export default ConsolidatedIndicatorWithIntl;
