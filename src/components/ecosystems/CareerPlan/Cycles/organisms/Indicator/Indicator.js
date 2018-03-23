import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import propTypes from 'prop-types';

import ModalConcept from 'components/ecosystems/CareerPlan/molecules/ModalConcept/';
import IndicatorData from '../../molecules/IndicatorData/';
import {
  IndicatorFields,
  IndicatorTypesLabels,
} from 'components/ecosystems/CareerPlan/enums/IndicatorTypes';
import { IndicatorFieldsTypesLabels } from 'components/ecosystems/CareerPlan/enums/IndicatorFields';

import {
  IndicatorWrapper,
  IndicatorWeightWrapper,
  IndicatorWeightLabel,
  IndicatorWeightValue,
  IndicatorTitle,
  IndicatorInfo,
  IndicatorContentWrapper,
  IndicatorTableHeader,
  IndicatorTableHeaderItem,
  IndicatorTableHeaderItemFeatured,
  IndicatorTableContent,
  IndicatorTableContentWrapper,
} from './Indicator.styles';

export class Indicator extends Component {
  constructor({ indicator }) {
    super();
    this.state = {
      informationModalOpened: false,
      activeCycle: null,
    };
  }

  getVisibleCycles = ({ from, to }) => {
    const { cycles } = this.props.indicator;
    const start = from === 0 ? 0 : from;
    return cycles.slice(start, to);
  };

  setActiveCycle = cycle => {
    this.setState({ activeCycle: cycle.cycle });
  };

  openInformationModal = () => {
    this.setState({ informationModalOpened: true });
  };

  closeInformationModal = () => {
    this.setState({ informationModalOpened: false });
  };

  fetchOvercoming = (cycle, cb) => {
    const { indicator, fetchOvercoming } = this.props;

    return fetchOvercoming({ cycle, indicatorType: indicator.indicatorType }, cb);
  };

  onApply = cycle => {
    this.fetchOvercoming(cycle, () => {
      this.setState({ activeCycle: null });
    });
  };

  renderCycles = cycle => {
    const { cycles } = this.props.indicator;
    const { indicator, isCycleFilled } = this.props;
    const { activeCycle } = this.state;
    const previousCycle = cycles.filter((item, index) => {
      const nextCycle = cycles[index + 1];
      return !nextCycle || nextCycle.cycle === cycle.cycle;
    })[0];

    return (
      <IndicatorData
        indicatorData={cycle}
        key={cycle.cycle}
        canFill={isCycleFilled(previousCycle)}
        isFilled={isCycleFilled(cycle)}
        onClick={this.setActiveCycle}
        onApply={this.onApply}
        indicator={indicator}
        activeCycle={activeCycle}
        {...this.props}
      />
    );
  };

  render() {
    const { indicator, range, concepts } = this.props;
    const { informationModalOpened } = this.state;
    const visibleCycles = this.getVisibleCycles(range);

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
          <IndicatorTableHeader hasActions>
            <IndicatorTableHeaderItemFeatured>Obj</IndicatorTableHeaderItemFeatured>

            {IndicatorFields[indicator.indicatorType].map(field => (
              <IndicatorTableHeaderItem key={field}>
                {IndicatorFieldsTypesLabels[field]}
              </IndicatorTableHeaderItem>
            ))}

            <IndicatorTableHeaderItemFeatured>Superação acumulada</IndicatorTableHeaderItemFeatured>
          </IndicatorTableHeader>

          <IndicatorTableContentWrapper>
            <IndicatorTableContent>{visibleCycles.map(this.renderCycles)}</IndicatorTableContent>
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
