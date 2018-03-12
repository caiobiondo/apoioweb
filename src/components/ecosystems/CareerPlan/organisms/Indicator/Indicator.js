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
      indicatorDataItems: mock.map(item => ({
        ...item,
        preLoaded: Boolean(item.indicator.directSale && item.indicator.naturaNetwork),
      })),
      informationModalOpened: false,
    };
  }

  setActiveData = indicatorData => {
    let { indicatorDataItems } = this.state;

    indicatorDataItems = indicatorDataItems.map(item => ({
      ...item,
      active: item.cycle === indicatorData.cycle,
    }));

    return this.setState({ indicatorDataItems });
  };

  updateIndicatorData = indicatorData => {
    let { indicatorDataItems } = this.state;
    indicatorDataItems = indicatorDataItems.map(item => {
      if (item.cycle !== indicatorData.cycle) {
        return item;
      }

      return indicatorData;
    });

    this.setState({ indicatorDataItems });
  };

  isFilled = indicatorData => {
    return (
      !indicatorData ||
      (indicatorData.indicator.directSale || indicatorData.indicator.naturaNetwork)
    );
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

  renderIndicatorData = (indicatorData, index) => {
    const { indicatorDataItems } = this.state;

    return (
      <IndicatorData
        indicatorData={indicatorData}
        index={index}
        key={indicatorData.cycle}
        canFill={this.isFilled(indicatorDataItems[index - 1])}
        isFilled={this.isFilled(indicatorData)}
        onClick={this.setActiveData}
        onApply={this.updateIndicatorData}
        indicatorTitle="Volume de pontos"
      />
    );
  };

  render() {
    const { indicatorDataItems } = this.state;

    return (
      <IndicatorWrapper>
        <IndicatorWeightWrapper>
          <IndicatorWeightLabel>
            <FormattedMessage id="weight" />
          </IndicatorWeightLabel>
          <IndicatorWeightValue>50</IndicatorWeightValue>
        </IndicatorWeightWrapper>

        <IndicatorTitle>Volume de Pontos</IndicatorTitle>
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
            <IndicatorTableContent>
              {indicatorDataItems.map(this.renderIndicatorData)}
            </IndicatorTableContent>
          </IndicatorTableContentWapper>
        </IndicatorContentWrapper>

        {this.renderConfirmationDialog()}
      </IndicatorWrapper>
    );
  }
}

export const IndicatorWithIntl = injectIntl(Indicator);

export default IndicatorWithIntl;
