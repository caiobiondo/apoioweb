import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { translate } from 'locale';
import { Popover } from 'material-ui';
import { Icon } from 'natura-ui';

import mock from './ConsolidatedDataMock';
import { IndicatorConceptsLabels } from '../../IndicatorConcepts.enum';
import { ConsolidatedWrapper, ConsolidateWarningIcon } from './Consolidated.styles';
import TrophyIcon from 'assets/images/trophy.png';

import {
  IndicatorWrapper,
  IndicatorWeightWrapper,
  IndicatorTitle,
  IndicatorContentWrapper,
  IndicatorTableHeader,
  IndicatorTableHeaderItemFeatured,
  IndicatorTableContent,
  IndicatorTableContentWrapper,
} from '../Indicator/Indicator.styles';

import {
  IndicatorDataWrapper,
  IndicatorDataContent,
  IndicatorDataSort,
  IndicatorDataRowFeatured,
  IndicatorDataValue,
  PopoverStyles,
  PopoverContent,
  IndicatorDataSortCurrent,
} from '../../molecules/IndicatorData/IndicatorData.styles';

import { IndicatorDataRowConcept } from '../../molecules/IndicatorDataForm/IndicatorDataForm.styles';

export class Consolidated extends Component {
  constructor() {
    super();
    this.cyclesNodes = {};
    this.state = {
      consolidatedCycles: mock,
    };
  }

  onClick = (cycle, event) => {
    if (this.isValidCycle(cycle)) {
      return;
    }

    event.preventDefault();
    this.showPopover();
  };

  isValidCycle = cycle => {
    const { indicators, isCycleFilled } = this.props;
    return (
      indicators.filter(indicator => {
        const cycleToValidate = indicator.cycles.filter(c => c.cycle === cycle.cycle)[0];
        return isCycleFilled(cycleToValidate);
      }).length === indicators.length
    );
  };

  getVisibleCycles = () => {
    const { consolidatedCycles } = this.state;
    const { from, to } = this.props.range;
    const start = from === 0 ? 0 : from - 1;
    return consolidatedCycles.slice(start, to);
  };

  isActiveCycle = cycle => {
    const { consolidatedCycles } = this.state;
    const index = consolidatedCycles.indexOf(cycle);

    return (
      (index === 0 || this.isValidCycle(consolidatedCycles[index - 1])) && !this.isValidCycle(cycle)
    );
  };

  setNode = (cycle, node) => {
    this.cyclesNodes[cycle.cycle] = node;
  };

  hidePopover = () => {
    this.setState({ showPopover: false });
  };

  showPopover = () => {
    this.setState({ showPopover: true });
  };

  renderPopover = cycle => {
    if (!this.isActiveCycle(cycle)) {
      return;
    }

    return (
      <Popover
        open={this.state.showPopover}
        anchorEl={this.cyclesNodes[cycle.cycle]}
        className="Popover"
        anchorOrigin={{ horizontal: 'middle', vertical: 'center' }}
        targetOrigin={{ horizontal: 'middle', vertical: 'center' }}
        onRequestClose={this.hidePopover}
        style={PopoverStyles}
      >
        <PopoverContent>
          Simule os indicadores <strong>Cadastro Médio</strong> e{' '}
          <strong>Atingido, Meta e Grupo</strong> no ciclo <strong>5</strong> para obter o
          consolidado
        </PopoverContent>
      </Popover>
    );
  };

  renderIndicatorData = cycle => {
    const isValidCycle = this.isValidCycle(cycle);
    const isActiveCycle = this.isActiveCycle(cycle);
    const warningIcon = isActiveCycle ? (
      <ConsolidateWarningIcon>
        <Icon file="ico_warning_info" />
      </ConsolidateWarningIcon>
    ) : null;

    const currentNode = cycle.current ? (
      <IndicatorDataSortCurrent>Atual</IndicatorDataSortCurrent>
    ) : null;

    const overcomingValue = isActiveCycle ? null : isValidCycle ? cycle.overcoming : '-';
    const conceptValue = isActiveCycle
      ? null
      : isValidCycle ? IndicatorConceptsLabels[cycle.value] : '-';

    return (
      <IndicatorDataWrapper
        key={cycle.cycle}
        isActive={this.isActiveCycle(cycle)}
        onClick={event => {
          this.onClick(cycle, event);
        }}
        innerRef={node => this.setNode(cycle, node)}
      >
        <IndicatorDataSort>
          {cycle.cycle} {currentNode}
        </IndicatorDataSort>
        <IndicatorDataContent>
          <IndicatorDataRowFeatured>
            <IndicatorDataValue>{overcomingValue}</IndicatorDataValue>
          </IndicatorDataRowFeatured>
          <IndicatorDataRowConcept concept={cycle.value}>
            <IndicatorDataValue>{conceptValue}</IndicatorDataValue>
          </IndicatorDataRowConcept>
        </IndicatorDataContent>

        {warningIcon}

        {this.renderPopover(cycle)}
      </IndicatorDataWrapper>
    );
  };

  render() {
    const consolidatedCycles = this.getVisibleCycles();

    return (
      <IndicatorWrapper indicatorId={0}>
        <ConsolidatedWrapper>
          <IndicatorWeightWrapper>
            <img src={TrophyIcon} alt={translate('consolidated')} />
          </IndicatorWeightWrapper>

          <IndicatorTitle>
            <FormattedMessage id="consolidated" />
          </IndicatorTitle>
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
        </ConsolidatedWrapper>
      </IndicatorWrapper>
    );
  }
}

export const ConsolidatedWithIntl = injectIntl(Consolidated);

export default ConsolidatedWithIntl;
