import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import propTypes from 'prop-types';
import { Loading, FormButton } from 'natura-ui';
import { translate } from 'locale';

import { gray450, orange200 } from 'styles/colors';
import ModalConcept from 'components/ecosystems/CareerPlan/molecules/ModalConcept/';
import IndicatorData from '../../molecules/IndicatorData/';
import Popover from 'components/ecosystems/CareerPlan/molecules/Popover';
import Snackbar from 'components/ecosystems/CareerPlan/molecules/Snackbar';
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
  IndicatorSaveButtonContainer,
  IndicatorSaveButtonWrapper,
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

  onChange = cycle => {
    const { indicator, onIndicatorChange, resetConsolidatedCycle } = this.props;
    const params = { ...indicator, cycles: this._getEditedCycles(cycle) };

    this.setState({
      isEdited: true,
    });

    return onIndicatorChange(params).then(() => resetConsolidatedCycle(cycle));
  };

  _getEditedCycles = cycleToEdit => {
    const { cycles } = this.props.indicator;
    return cycles.map(cycle => {
      if (cycle.cycle !== cycleToEdit.cycle) {
        return cycle;
      }

      return { ...cycle, ...cycleToEdit };
    });
  };

  onSave = () => {
    if (!this.state.isEdited) {
      return this._showPopover();
    }

    this.setState({
      loading: true,
      activeCycle: null,
    });

    return this.props
      .onIndicatorSave(this.props.indicator)
      .then(() => {
        const message = translate('careerPlanSuccessMessage');
        Snackbar(message);
        this.setState({ isEdited: false });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  hidePopover = () => {
    this.setState({ showPopover: false });
  };

  _showPopover = () => {
    this.setState({ showPopover: true });
  };

  setSaveButtonRef = ref => {
    this.saveButtonRef = ref;
  };

  _getPreviousCycle = cycle => {
    const { cycles } = this.props.indicator;

    return cycles.find((item, index) => {
      const nextCycle = cycles[index + 1];
      return nextCycle && nextCycle.cycle === cycle.cycle;
    });
  };

  _getNextCycle = cycle => {
    const { cycles } = this.props.indicator;

    return cycles.find((item, index) => {
      const previousCycle = cycles[index - 1];
      return previousCycle && previousCycle.cycle === cycle.cycle;
    });
  };

  renderSavePopover() {
    const { isEdited, showPopover } = this.state;

    if (isEdited) {
      return;
    }

    return (
      <Popover
        open={showPopover}
        anchorEl={this.saveButtonRef}
        onRequestClose={this.hidePopover}
        anchorOrigin={{ horizontal: 'middle', vertical: 'top' }}
        targetOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
      >
        <FormattedMessage id="careerPlanNotEdited" />
      </Popover>
    );
  }

  renderCycles = (cycle, index, array) => {
    const { indicator, isCycleFilled, currentCycle } = this.props;
    const { activeCycle } = this.state;

    const previousCycle = this._getPreviousCycle(cycle) || {};
    const isPreviousCycleFilled = isCycleFilled(previousCycle);
    const nextCycle = this._getNextCycle(cycle) || {};
    const isNextCycleFilled = isCycleFilled(nextCycle);

    const showCycleLeftBorder =
      isPreviousCycleFilled &&
      !previousCycle.isClosed &&
      this.state.activeCycle !== previousCycle.cycle &&
      index !== 0;

    const showCycleRightBorder =
      isNextCycleFilled &&
      !nextCycle.isClosed &&
      this.state.activeCycle !== nextCycle.cycle &&
      index !== array.length - 1;

    const isFilled = isCycleFilled(cycle);
    const firstCycle = indicator.cycles[0];
    const isFirstCycle = firstCycle && cycle.cycle === firstCycle.cycle;
    const canFill = isCycleFilled(previousCycle) || isFirstCycle;

    return (
      <IndicatorData
        indicatorData={cycle}
        key={cycle.cycle}
        canFill={canFill}
        showCycleLeftBorder={showCycleLeftBorder}
        showCycleRightBorder={showCycleRightBorder}
        isFilled={isFilled}
        onClick={this.setActiveCycle}
        onChange={this.onChange}
        indicator={indicator}
        activeCycle={activeCycle}
        isCurrentCycle={cycle.cycle === currentCycle}
        {...this.props}
      />
    );
  };

  render() {
    const { indicator, range, concepts } = this.props;
    const { informationModalOpened, loading } = this.state;
    const visibleCycles = this.getVisibleCycles(range);

    return (
      <IndicatorWrapper indicatorType={indicator.indicatorType}>
        {loading && <Loading background="rgba(248,248,248,0.8)" />}
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

        <IndicatorSaveButtonContainer>
          <IndicatorSaveButtonWrapper innerRef={this.setSaveButtonRef}>
            <FormButton
              backgroundColor={gray450}
              labelColor={orange200}
              onClick={this.onSave}
              label={<FormattedMessage id="saveInfo" />}
            />
          </IndicatorSaveButtonWrapper>
          {this.renderSavePopover()}
        </IndicatorSaveButtonContainer>
      </IndicatorWrapper>
    );
  }
}

Indicator.propTypes = {
  indicators: propTypes.array.isRequired,
};

export const IndicatorWithIntl = injectIntl(Indicator);

export default IndicatorWithIntl;
