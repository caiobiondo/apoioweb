import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { translate } from 'locale';

import mock from './ConsolidatedDataMock';
import { ConsolidatedWrapper } from './Consolidated.styles';

import TrophyIcon from 'assets/images/trophy.png';

import {
  IndicatorWrapper,
  IndicatorWeightWrapper,
  IndicatorWeightLabel,
  IndicatorWeightValue,
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

  renderIndicatorData = (indicatorData, index) => {
    return (
      <IndicatorDataWrapper key={indicatorData.cycle}>
        <IndicatorDataSort index={index}>{index + 1}</IndicatorDataSort>
        <IndicatorDataContent>
          <IndicatorDataRowFeatured>
            <IndicatorDataValue>{indicatorData.overcoming}</IndicatorDataValue>
          </IndicatorDataRowFeatured>
          <IndicatorDataRowFeatured>
            <IndicatorDataValue>{indicatorData.overcoming}</IndicatorDataValue>
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
