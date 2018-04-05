import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Icon } from 'natura-ui';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { PercentageFormat, NumberFormat } from 'utils/numberFormat';
import { IndicatorFields } from 'components/ecosystems/CareerPlan/enums/IndicatorTypes';
import { IndicatorFieldsTypesLabels } from 'components/ecosystems/CareerPlan/enums/IndicatorFields';
import CycleConcept from 'components/ecosystems/CareerPlan/atoms/CycleConcept';

import {
  IndicatorDataWrapper,
  IndicatorDataSort,
  IndicatorDataContent,
  IndicatorDataRow,
  IndicatorFloatContent,
  IndicatorFloatContentClose,
  IndicatorDataSortNumber,
  IndicatorDataRowFeatured,
  IndicatorDataValue,
  IndicatorDataSmallLabel,
  IndicatorDataSmallValue,
} from 'components/ecosystems/CareerPlan/Cycles/molecules/IndicatorData/IndicatorData.styles';

export class IndicatorData extends Component {
  onClick = event => {
    const { onClick, indicatorData, isSimulated } = this.props;

    if (isSimulated) {
      return onClick(indicatorData);
    }

    event.preventDefault();
  };

  onClose = event => {
    const { onClose } = this.props;
    event.stopPropagation();

    return onClose();
  };

  renderContent = () => {
    if (!this.props.indicatorType) {
      return this.renderConsolidatedData();
    }

    return this.renderIndicatorData();
  };

  renderConsolidatedData() {
    const { indicatorData } = this.props;
    const { concept, value } = indicatorData;

    return (
      <div>
        <IndicatorDataRowFeatured>
          <IndicatorDataValue>
            <PercentageFormat value={value} isPercentage />
          </IndicatorDataValue>
        </IndicatorDataRowFeatured>
        <IndicatorDataRow>
          <CycleConcept concept={concept} size="large" />
        </IndicatorDataRow>
      </div>
    );
  }

  renderIndicatorData() {
    const { indicatorData, indicatorType } = this.props;
    const { concept, value } = indicatorData.overcoming ? indicatorData.overcoming : {};

    return (
      <div>
        <IndicatorDataRowFeatured>
          <IndicatorDataValue>
            <PercentageFormat value={value} isPercentage />
          </IndicatorDataValue>
        </IndicatorDataRowFeatured>
        <IndicatorDataRow>
          <CycleConcept concept={concept} size="large" />
        </IndicatorDataRow>

        <IndicatorDataRow>
          <IndicatorDataSmallLabel>Objetivo</IndicatorDataSmallLabel>
          <IndicatorDataSmallValue>
            <NumberFormat value={indicatorData.objective} />
          </IndicatorDataSmallValue>
        </IndicatorDataRow>

        {IndicatorFields[indicatorType].map(field => (
          <IndicatorDataRow key={field}>
            <IndicatorDataSmallLabel>{IndicatorFieldsTypesLabels[field]}</IndicatorDataSmallLabel>
            <IndicatorDataSmallValue>
              <NumberFormat value={indicatorData[field]} />
            </IndicatorDataSmallValue>
          </IndicatorDataRow>
        ))}
      </div>
    );
  }

  render() {
    const { indicatorType, indicatorData, setRef, showDetails, isSimulated } = this.props;
    const { concept } = !this.props.indicatorType
      ? indicatorData
      : indicatorData.overcoming ? indicatorData.overcoming : {};

    return (
      <IndicatorDataWrapper
        innerRef={setRef}
        showDetails={showDetails}
        editable={isSimulated}
        onClick={this.onClick}
        size="5"
        bordered
        hasChart
        indicatorType={indicatorType}
      >
        <IndicatorDataSort index={indicatorData.cycle}>
          <NumberFormat value={indicatorData.cycle} showLastDigits={2} />
        </IndicatorDataSort>

        <IndicatorDataContent>
          <IndicatorDataRow>
            <CycleConcept concept={concept} size="large" />
          </IndicatorDataRow>
        </IndicatorDataContent>

        <ReactCSSTransitionGroup
          transitionName="fadeIn"
          transitionAppear
          transitionLeave
          transitionEnter
          transitionEnterTimeout={200}
          transitionAppearTimeout={200}
          transitionLeaveTimeout={200}
        >
          {showDetails && (
            <IndicatorFloatContent>
              <IndicatorFloatContentClose onClick={this.onClose}>
                <Icon file="ico_times" />
              </IndicatorFloatContentClose>

              <IndicatorDataSortNumber>
                <NumberFormat value={indicatorData.cycle} showLastDigits={2} />
              </IndicatorDataSortNumber>
              {this.renderContent()}
            </IndicatorFloatContent>
          )}
        </ReactCSSTransitionGroup>
      </IndicatorDataWrapper>
    );
  }
}

IndicatorData.propTypes = {
  indicatorData: propTypes.object.isRequired,
  setRef: propTypes.func.isRequired,
  showDetails: propTypes.bool.isRequired,
};

export default IndicatorData;
