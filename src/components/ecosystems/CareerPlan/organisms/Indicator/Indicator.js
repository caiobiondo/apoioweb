import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { FlatButton, Dialog } from 'natura-ui';

import IndicatorData from '../../molecules/IndicatorData/IndicatorData';
import mock from './IndicatorDataMock';

import { CareerPlanModal } from 'components/ecosystems/CareerPlan/index.styles.js';
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
  IndicatorTableContentWapper,
} from './Indicator.styles';

export class Indicator extends Component {
  constructor() {
    super();

    this.state = {
      cycles: this.getParsedCycles(),
      informationModalOpened: false,
    };
  }

  getParsedCycles = () => {
    return mock.map(item => ({
      ...item,
      indicator: {
        ...item.indicator,
        directSale: item.indicator.directSale || '',
        naturaNetwork: item.indicator.naturaNetwork || '',
      },
      preLoaded: this.isFilled(item),
    }));
  };

  setActiveCycle = indicatorData => {
    let { cycles } = this.state;

    cycles = cycles.map(item => ({
      ...item,
      active: item.cycle === indicatorData.cycle,
    }));

    this.setState({ cycles });
  };

  updateCycle = cycle => {
    let { cycles } = this.state;

    cycles = cycles.map(item => {
      if (item.cycle !== cycle.cycle) {
        return item;
      }

      return { ...item, ...cycle };
    });

    this.setState({ cycles });
  };

  isFilled = cycle => {
    const values = cycle && cycle.indicator;
    return !values || Boolean(values.directSale || values.naturaNetwork);
  };

  openInformationModal = () => {
    this.setState({ informationModalOpened: true });
  };

  closeInformationModal = () => {
    this.setState({ informationModalOpened: false });
  };

  renderConfirmationDialog = () => {
    const title = 'Volume de Pontos';
    const { informationModalOpened } = this.state;
    const actions = [
      <FlatButton
        label={<FormattedMessage id="close" />}
        primary={true}
        onClick={this.closeInformationModal}
        labelStyle={CareerPlanModal.label}
      />,
    ];

    return (
      <Dialog
        key="informationDialog"
        title={title}
        actions={actions}
        modal={false}
        open={informationModalOpened}
        onRequestClose={this.onCloseModal}
        contentStyle={CareerPlanModal.content}
        bodyStyle={CareerPlanModal.body}
        titleStyle={CareerPlanModal.title}
        paper={{ style: CareerPlanModal.paper }}
      >
        teste
      </Dialog>
    );
  };

  renderCycles = (cycle, index) => {
    const { cycles } = this.state;
    const { indicator } = this.props;

    return (
      <IndicatorData
        indicatorData={cycle}
        index={index}
        key={cycle.cycle}
        canFill={this.isFilled(cycles[index - 1])}
        isFilled={this.isFilled(cycle)}
        onClick={this.setActiveCycle}
        onApply={this.updateCycle}
        indicator={indicator}
      />
    );
  };

  render() {
    const { cycles } = this.state;
    const { indicator } = this.props;

    return (
      <IndicatorWrapper indicatorId={indicator.id}>
        <IndicatorWeightWrapper>
          <IndicatorWeightLabel>
            <FormattedMessage id="weight" />
          </IndicatorWeightLabel>
          <IndicatorWeightValue>{indicator.weight}</IndicatorWeightValue>
        </IndicatorWeightWrapper>

        <IndicatorTitle>{indicator.title}</IndicatorTitle>
        <IndicatorInfo onClick={this.openInformationModal}>
          <FormattedMessage id="information" />
        </IndicatorInfo>
        <IndicatorContentWrapper>
          <IndicatorTableHeader>
            <IndicatorTableHeaderItemFeatured>Obj</IndicatorTableHeaderItemFeatured>
            <IndicatorTableHeaderItem>Real.</IndicatorTableHeaderItem>
            <IndicatorTableHeaderItem>Real rede</IndicatorTableHeaderItem>
            <IndicatorTableHeaderItemFeatured>Superação acumulada</IndicatorTableHeaderItemFeatured>
          </IndicatorTableHeader>

          <IndicatorTableContentWapper>
            <IndicatorTableContent>{cycles.map(this.renderCycles)}</IndicatorTableContent>
          </IndicatorTableContentWapper>
        </IndicatorContentWrapper>

        {this.renderConfirmationDialog()}
      </IndicatorWrapper>
    );
  }
}

export const IndicatorWithIntl = injectIntl(Indicator);

export default IndicatorWithIntl;
