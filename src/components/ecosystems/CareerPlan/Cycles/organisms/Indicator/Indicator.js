import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import propTypes from 'prop-types';

import ModalConcept from 'components/ecosystems/CareerPlan/molecules/ModalConcept/';
import IndicatorData from '../../molecules/IndicatorData/';
import { IndicatorTypesLabels } from 'components/ecosystems/CareerPlan/enums/IndicatorTypes';

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
    const start = from === 0 ? 0 : from - 1;
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

  updateCycle = (cycle, cb) => {
    const { indicator, updateCycle } = this.props;
    return updateCycle({ cycle, indicatorType: indicator.indicatorType }, cb);
  };

  onApply = cycle => {
    this.updateCycle(cycle, () => {
      this.setState({ activeCycle: null });
    });
  };

  renderCycles = (cycle, index) => {
    const { cycles } = this.props.indicator;
    const { indicator, isCycleFilled } = this.props;
    const { activeCycle } = this.state;

    return (
      <IndicatorData
        indicatorData={cycle}
        key={cycle.cycle}
        canFill={isCycleFilled(cycles[index - 1])}
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
            <IndicatorTableHeaderItem>Real.</IndicatorTableHeaderItem>
            <IndicatorTableHeaderItem>Real rede</IndicatorTableHeaderItem>
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
