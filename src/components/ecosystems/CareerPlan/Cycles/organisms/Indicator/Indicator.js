import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import propTypes from 'prop-types';
import { Loading } from 'natura-ui';

import ModalConcept from 'components/ecosystems/CareerPlan/molecules/ModalConcept/';
import IndicatorData from '../../molecules/IndicatorData/';
import Popover from 'components/ecosystems/CareerPlan/molecules/Popover';
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
  IndicatorSaveButtonWrapper,
  IndicatorSaveButton,
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
    const { indicator, onIndicatorChange } = this.props;

    this.setState({
      isEdited: true,
    });

    return onIndicatorChange({ ...indicator, cycles: this._getEditedCycles(cycle) });
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

    return this.props.onIndicatorSave(this.props.indicator, () =>
      this.setState({
        loading: false,
        isEdited: false,
      }),
    );
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

  renderCycles = (cycle, index) => {
    const { cycles } = this.props.indicator;
    const { indicator, isCycleFilled, currentCycle } = this.props;
    const { activeCycle } = this.state;
    const previousCycle = cycles.filter((item, index) => {
      const nextCycle = cycles[index + 1];
      return !nextCycle || nextCycle.cycle === cycle.cycle;
    })[0];

    return (
      <IndicatorData
        indicatorData={cycle}
        key={cycle.cycle}
        canFill={isCycleFilled(previousCycle) || index === 0}
        isFilled={isCycleFilled(cycle)}
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

        <IndicatorSaveButtonWrapper>
          <IndicatorSaveButton onClick={this.onSave} innerRef={this.setSaveButtonRef}>
            <FormattedMessage id="saveInfo" />
          </IndicatorSaveButton>
          {this.renderSavePopover()}
        </IndicatorSaveButtonWrapper>
      </IndicatorWrapper>
    );
  }
}

Indicator.propTypes = {
  indicators: propTypes.array.isRequired,
};

export const IndicatorWithIntl = injectIntl(Indicator);

export default IndicatorWithIntl;
