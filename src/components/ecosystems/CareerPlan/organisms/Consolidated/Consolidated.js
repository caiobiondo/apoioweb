import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { translate } from 'locale';

import mock from './ConsolidatedDataMock';
import { ConsolidatedWrapper } from './Consolidated.styles';

import TrophyIcon from 'assets/images/trophy.png';

import {
  IndicatorWrapper,
  IndicatorWeightWrapper,
  IndicatorTitle,
  IndicatorContentWrapper,
  IndicatorTableHeader,
  IndicatorTableHeaderItemFeatured,
  IndicatorTableContent,
  IndicatorTableContentWapper,
} from '../Indicator/Indicator.styles';

import {
  IndicatorDataWrapper,
  IndicatorDataContent,
  IndicatorDataSort,
  IndicatorDataRowFeatured,
  IndicatorDataValue,
} from '../../molecules/IndicatorData/IndicatorData.styles';

export class Consolidated extends Component {
  constructor() {
    super();

    this.state = {
      consolidatedDataItems: mock,
    };
  }

  isValidCycle = cycle => {
    const { indicators, isCycleFilled } = this.props;
    return (
      indicators.filter(indicator => {
        const cycleToValidate = indicator.cycles.filter(c => c.cycle === cycle.cycle)[0];
        return isCycleFilled(cycleToValidate);
      }).length === indicators.length
    );
  };

  renderIndicatorData = (cycle, index) => {
    return (
      <IndicatorDataWrapper key={cycle.cycle}>
        <IndicatorDataSort index={index}>{index + 1}</IndicatorDataSort>
        <IndicatorDataContent>
          <IndicatorDataRowFeatured>
            <IndicatorDataValue>{this.isValidCycle(cycle) && 'Valid Cycle'}</IndicatorDataValue>
          </IndicatorDataRowFeatured>
          <IndicatorDataRowFeatured>
            <IndicatorDataValue>{this.isValidCycle(cycle) && 'Valid Cycle'}</IndicatorDataValue>
          </IndicatorDataRowFeatured>
        </IndicatorDataContent>
      </IndicatorDataWrapper>
    );
  };

  render() {
    const { consolidatedDataItems } = this.state;

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

            <IndicatorTableContentWapper>
              <IndicatorTableContent>
                {consolidatedDataItems.map(this.renderIndicatorData)}
              </IndicatorTableContent>
            </IndicatorTableContentWapper>
          </IndicatorContentWrapper>
        </ConsolidatedWrapper>
      </IndicatorWrapper>
    );
  }
}

export const ConsolidatedWithIntl = injectIntl(Consolidated);

export default ConsolidatedWithIntl;
