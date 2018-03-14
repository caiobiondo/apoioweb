import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { FlatButton, Dialog } from 'natura-ui';
import propTypes from 'prop-types';

import IndicatorData from '../../molecules/IndicatorData/IndicatorData';
import conceptMock from './IndicatorConceptMock';

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
  IndicatorConceptList,
  IndicatorConceptListItem,
} from './Indicator.styles';

export class Indicator extends Component {
  constructor({ indicator }) {
    super();
    this.state = {
      cycles: this.parseCycles(indicator.cycles),
      concepts: conceptMock,
      informationModalOpened: false,
    };
  }

  parseCycles = cycles => {
    return cycles.map(item => ({
      ...item,
      directSale: item.directSale || '',
      naturaNetwork: item.naturaNetwork || '',
      preLoaded: this.isFilled(item),
    }));
  };

  getVisibleCycles = ({ from, to }) => {
    const { cycles } = this.state;
    const start = from === 0 ? 0 : from - 1;
    return cycles.slice(start, to);
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
    const { onChange, indicator } = this.props;

    cycles = cycles.map(item => {
      if (item.cycle !== cycle.cycle) {
        return item;
      }

      return { ...item, ...cycle };
    });

    this.setState({ cycles }, () => {
      onChange({
        ...indicator,
        cycles,
      });
    });
  };

  isFilled = cycle => {
    return !cycle || Boolean(cycle.directSale || cycle.naturaNetwork);
  };

  openInformationModal = () => {
    this.setState({ informationModalOpened: true });
  };

  closeInformationModal = () => {
    this.setState({ informationModalOpened: false });
  };

  renderConfirmationDialog = () => {
    const title = 'Volume de Pontos';
    const { informationModalOpened, concepts } = this.state;
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
        paperProps={{ style: CareerPlanModal.paper }}
      >
        <IndicatorConceptList>
          {concepts.map(item => {
            let conceptRange = null;

            if (item && !item.rangeStart && item.rangeEnd) {
              conceptRange = (
                <span>
                  <FormattedMessage
                    id="careerPlanBelowRange"
                    values={{ rangeEnd: item.rangeEnd }}
                  />
                </span>
              );
            }

            if (item && item.rangeStart && !item.rangeEnd) {
              conceptRange = (
                <span>
                  <FormattedMessage
                    id="careerPlanAboveRange"
                    values={{ rangeStart: item.rangeStart }}
                  />
                </span>
              );
            }

            if (item && item.rangeStart && item.rangeEnd) {
              conceptRange = (
                <span>
                  <FormattedMessage
                    id="careerPlanBetweenRange"
                    values={{ rangeStart: item.rangeStart, rangeEnd: item.rangeEnd }}
                  />
                </span>
              );
            }

            return (
              <IndicatorConceptListItem key={item.value} concept={item}>
                <span>{item.value}</span>
                {conceptRange}
              </IndicatorConceptListItem>
            );
          })}
        </IndicatorConceptList>
      </Dialog>
    );
  };

  renderCycles = (cycle, index) => {
    const { cycles } = this.state;
    const { indicator } = this.props;

    return (
      <IndicatorData
        indicatorData={cycle}
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
    const { indicator, range } = this.props;
    const visibleCycles = this.getVisibleCycles(range);

    return (
      <IndicatorWrapper indicatorType={indicator.indicatorType}>
        <IndicatorWeightWrapper>
          <IndicatorWeightLabel>
            <FormattedMessage id="weight" />
          </IndicatorWeightLabel>
          <IndicatorWeightValue>{indicator.significance}</IndicatorWeightValue>
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
            <IndicatorTableContent>{visibleCycles.map(this.renderCycles)}</IndicatorTableContent>
          </IndicatorTableContentWapper>
        </IndicatorContentWrapper>

        {this.renderConfirmationDialog()}
      </IndicatorWrapper>
    );
  }
}

Indicator.propTypes = {
  indicators: propTypes.array.isRequired,
  range: propTypes.shape({
    from: propTypes.number,
    to: propTypes.number,
  }),
};

Indicator.defaultProps = {
  range: {
    from: 0,
    to: 10,
  },
};

export const IndicatorWithIntl = injectIntl(Indicator);

export default IndicatorWithIntl;
